import Mn from 'backbone.marionette';
import template from './template.hbs';
import UsersView from '../users/view';

import SubMenuView from '../subheader/view';
import SubMenuModel from '../subheader/model';

import HeaderView from '../header/view';

export default Mn.View.extend({
  template,

  regions: {
    header: '#header',
    content: '#content',
    subheader: '#sub-header'
  },
  initialize(options) {
    this.showHeader();
    this.app = options.app;
  },
  showHeader() {
    this.getRegion('header').show(new HeaderView());
  },
  updateSubHeader(data) {
    this.getRegion('subheader').empty();

    if (!data) {
      return;
    }

    this.getRegion('subheader').show(
      new SubMenuView({ model: new SubMenuModel(data) })
    );
  },
  showView(view) {
    this.getRegion('content').show(view);
  }
});
