import Mn from 'backbone.marionette';
import Template from './template.hbs';
import Model from './model';
import CodeMirror from 'codemirror';
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
  onRender() {
    this.startCodeMirror();
  },
  startCodeMirror() {
    this.schema = CodeMirror.fromTextArea(this.$el.find('#schema-editor')[0], {
      mode: 'text/html',
      tabMode: 'indent',
      lineNumbers: true
    });
    this.schemaUI = CodeMirror.fromTextArea(
      this.$el.find('#schema-ui-editor')[0],
      {
        mode: 'text/html',
        tabMode: 'indent',
        lineNumbers: true
      }
    );
    this.schema.refresh();
    this.schemaUI.refresh();
  },
  serializeData() {
    return {
      survey: this.model.attributes
    };
  },
  handleSubmit(event) {
    const button = utils.getLoadingButton(this.$el.find('#submit'));
    event.preventDefault();
    button.loading();

    // We manually add form values to model,
    // the form -> model binding should ideally
    // be done automatically.
    this.$el
      .find('#form')
      .serializeArray()
      .forEach(element => {
        this.model.set(element.name, element.value);
      });

    this.model.set('survey_schema', JSON.parse(this.schema.getValue()));
    this.model.set('survey_ui_schema', JSON.parse(this.schemaUI.getValue()));

    this.model
      .save()
      .then(result => {
        this.props.listSurveys();
      })
      .always(() => button.reset());
  }
});
