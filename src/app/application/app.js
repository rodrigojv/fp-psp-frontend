import Bn from 'backbone';
import Mn from 'backbone.marionette';
import initRouter from './router';
import LayoutView from './layout-view';

export default Mn.Application.extend({
  region: '#main',

  initialize() {
    this.layoutView = new LayoutView({ app: this });
    this.showView(this.layoutView);
  },

  onStart() {
    this.Router = initRouter({
      app: this
    });
    Bn.history.start();
  },

  showViewOnRoute(view) {
    this.layoutView.showView(view);
  },
  updateSubHeader(model) {
    this.layoutView.updateSubHeader(model);
  },

  emptySubHeader() {
    this.layoutView.updateSubHeader(null);
  }
});
