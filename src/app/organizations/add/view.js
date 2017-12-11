import Mn from 'backbone.marionette';
import Template from './template.hbs';
import Model from '../model';
import storage from '../storage';
import { history } from 'backbone';
import utils from '../../utils';

export default Mn.View.extend({
  template: Template,
  events: {
    'click #submit': 'handleSubmit'
  },
  initialize(options) {
    this.props = Object.assign({}, options);
    this.model = this.props.model || new Model();
  },
  serializeData() {
    return {
      organization: this.model.attributes
    };
  },
  handleSubmit(event) {
    event.preventDefault();
    const button = utils.getLoadingButton(this.$el.find('#submit'));

    // We manually add form values to model,
    // the form -> model binding should ideally
    // be done automatically.
    this.$el
      .find('#form')
      .serializeArray()
      .forEach(element => {
        this.model.set(element.name, element.value);
      });
    button.loading();
    storage
      .save(this.model)
      .then(model => {
        button.reset();
        history.navigate('organizations', { trigger: true });
      })
      .always(() => {
        button.reset();
      });
  }
});
