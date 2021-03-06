import Mn from 'backbone.marionette';
import Template from './template.hbs';

export default Mn.View.extend({
  template: Template,
  events: {
    'click #delete': 'handleDelete',
  },
  initialize(options) {
    this.app = options.app;
    this.model = options.model;
  },


  serializeData() {
    return {
      snapshotDraft: this.model.attributes
    };
  },

  handleDelete(event) {
    event.preventDefault();
  },

});
