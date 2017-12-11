import Bb from 'backbone';
import Mn from 'backbone.marionette';
import initRouter from './router';
import LayoutView from './layout-view';
import sessionMgr from './session-manager';
import FlashesService from '../flashes/service';
import ModalService from '../modal/service';
import $ from 'jquery';
import nprogress from 'nprogress';

export default Mn.Application.extend({
  region: '#main',

  initialize() {
    this.sessionMgr = sessionMgr;
    this.layoutView = new LayoutView({ app: this });
  },

  onStart() {
    if (!this.sessionMgr.isAuthenticated()) {
      this.sessionMgr.toLoginPage();
      return;
    }
    nprogress.configure({
      showSpinner: false
    });

    ModalService.setup({
      container: this.layoutView.getRegion('overlay')
    });

    FlashesService.setup({
      container: this.layoutView.getRegion('flashes')
    });

    this.setupAjax();

    this.router = initRouter({
      app: this,
      before: this.beforeRoute.bind(this),
      onAccessDenied: () => {
        this.sessionMgr.redirectToDeniedPage(new Error('Access denied error'));
      }
    });

    Bb.history.start();
    this.showView(this.layoutView);
  },
  getSession() {
    return this.sessionMgr.getSession();
  },
  showViewOnRoute(view) {
    this.layoutView.showView(view);
  },
  showHomeForUser(dashboardView) {
    const homeRoute = this.getSession().getLoggedUserHomeRoute();
    if (homeRoute.indexOf('organizations') >= 0) {
      Bb.history.navigate(homeRoute, { trigger: true });
      return;
    }
    this.showViewOnRoute(dashboardView);
  },
  updateSubHeader(headerItems) {
    this.layoutView.updateSubHeader(headerItems);
  },
  beforeRoute() {
    this.emptySubHeader();
  },
  emptySubHeader() {
    this.layoutView.updateSubHeader(null);
  },
  logout() {
    this.sessionMgr.logout().toLoginPage();
  },
  setupAjax() {
    const accessToken = this.sessionMgr.getAccessToken();
    $.ajaxSetup({
      beforeSend: xhr => {
        if (accessToken) {
          xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
        }
      },
      statusCode: {
        401: () => {
          this.sessionMgr.redirectToLoginAfterError();
        },
        403: () => {
          this.sessionMgr.redirectToDeniedPage();
        },
        500: () => {
          FlashesService.request('add', {
            type: 'danger',
            title: 'Server Error'
          });
        }
      }
    });

    $(document).on({
      ajaxStart: () => {
        nprogress.start();
      },
      ajaxComplete: () => {
        nprogress.done();
      }
    });
  }
});
