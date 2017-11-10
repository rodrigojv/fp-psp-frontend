import Mn from 'backbone.marionette';
import Template from './template.hbs';
import FamiliesTemplate from './families-template.hbs';
import UsersTemplate from './users-template.hbs';
import IndicatorsTemplate from './indicators-template.hbs';
import storage from '../storage';

export default Mn.View.extend({
  template: Template,

  initialize(options) {
    this.app = options.app;
    this.entity = options.entity;
  },

  onRender() {
    this.app.updateSubHeader(storage.getSubHeaderItems(this.model));
  },

  getTemplate() {
    if (this.entity === 'families') {
      return FamiliesTemplate;
    }
    if (this.entity === 'users') {
      return UsersTemplate;
    }
    if (this.entity === 'indicators') {
      return IndicatorsTemplate;
    }
    return Template;
  },

  serializeData() {
    return {
      organization: this.model.attributes
    };
  }
});
