import Mn from 'backbone.marionette';
import Template from './template.hbs';

export default Mn.View.extend({
  template: Template,
  triggers: {
    'click #delete': 'delete:item'
  },
  serializeData() {
    return {
      organization: this.model.attributes
    };
  },
  handleDelete() {
    event.preventDefault();
    this.trigger('delete:model', this.model);
  }
});
