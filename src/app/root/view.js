import Mn from 'backbone.marionette';
import template from './template.hbs';
import UsersView from '../users/view';
import OrganizationsView from '../organizations/view';
import SnapshotsView from '../snapshots/view';
import SurveysView from '../surveys/view';
import SubMenuView from './submenu/view';
import { APP_MESSAGE_CHANNEL } from '../utils';

export default Mn.View.extend({
  template,

  regions: {
    content: '#content',
    submenu: '#sub-menu'
  },
  initialize() {
    this.bindEvents();
  },
  updateSubMenu(model) {
    this.getRegion('submenu').show(new SubMenuView({ model }));
  },
  bindEvents() {
    this.listenTo(
      APP_MESSAGE_CHANNEL,
      'update:submenu',
      this.updateSubMenu.bind(this)
    );
  },
  showUsers() {
    this.getRegion('content').show(new UsersView());
  },
  showOrganizations(organizationId) {
    this.getRegion('content').show(new OrganizationsView({ organizationId }));
  },
  foo(id) {
    console.log(id);
  },
  showSnapshots(hash) {
    const surveyId = parseInt(hash, 10);
    this.getRegion('content').show(new SnapshotsView({ surveyId }));
  },
  showSurveys() {
    this.getRegion('content').show(new SurveysView());
  }
});
