import Bn from 'backbone';
import Mn from 'backbone.marionette';
import $ from 'jquery';
import _ from 'lodash';
import { APP_MESSAGE_CHANNEL } from './utils';

const mainMenuPaths = ['', 'users', 'organizations', 'surveys'];

export default Mn.AppRouter.extend({
  initialize() {
    // $('a[data-route]').on('click', function(e) {
    //   e.preventDefault();
    //   const route = $(this).attr('href');
    //   Bn.history.navigate(route, true);
    // });
    APP_MESSAGE_CHANNEL.reply('navigate', this.navigate, this);
  },

  appRoutes: {
    users: 'showUsers',
    organizations: 'showOrganizations',
    'organizations/:id': 'foo',
    surveys: 'showSurveys',
    'snapshots/:id': 'showSnapshots',
    '': 'showUsers'
  },
  foo(id) {
    console.log(id);
  },
  onRoute(name, path, args) {
    console.log('onroute');
    var query = {};
    var search = this.getSearch();
    if (search) {
      args.pop();
      _.each(search.split('&'), val => {
        val = val.split('=');
        query[val[0]] = val[1];
      });
    }
    // On navigation the active menu did not change,
    // so we do this manually.
    this.selectActiveMenu(path);
    APP_MESSAGE_CHANNEL.trigger('route', name, path, args, query);
  },
  getSearch() {
    var match = Bn.history.location.href.replace(/#[^?]*/, '').match(/\?(.+)/);
    return match ? match[1] : '';
  },
  selectActiveMenu(activePath) {
    if (!_.includes(mainMenuPaths, activePath)) {
      return;
    }
    $('.nav')
      .find('.active')
      .removeClass('active');
    $('.nav')
      .find(`a[href="/${activePath}"]`)
      .parent()
      .addClass('active');
  }
});
