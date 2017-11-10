import Mn from 'backbone.marionette';
import Template from './template.hbs';
import faker from 'faker';

export default Mn.View.extend({
  template: Template,
  triggers: {
    'click #delete': 'delete:item'
  },
  serializeData() {
    return {
      organization: this.model.attributes,
      imageUrl: this.getImage()
    };
  },
  getImage() {
    return faker.image.imageUrl(100, 100, 'people');
  },
  handleDelete() {
    event.preventDefault();
    console.log('child delete');
    this.trigger('delete:model', this.model);
  }
});
