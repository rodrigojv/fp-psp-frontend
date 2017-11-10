import Mn from 'backbone.marionette';
import template from './template.hbs';

export default Mn.View.extend({
  template,

  serializeData() {
    return {
      mainItem: this.model.get('mainItem'),
      navigationItems: this.model.get('navigationItems')
    };
  }
});
