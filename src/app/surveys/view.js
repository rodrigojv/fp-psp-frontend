import Mn from 'backbone.marionette';
import Template from './template.hbs';
import ListView from './list/view';
import AddView from './add/view';

export default Mn.View.extend({
  template: Template,
  regions: {
    surveysContent: '#surveys-content'
  },
  initialize() {},
  onRender() {
    this.list();
  },
  list() {
    const listView = new ListView({
      add: this.add.bind(this)
    });
    this.getRegion('surveysContent').show(listView);
  },
  add(model) {
    const addView = new AddView({
      model: model,
      listSurveys: this.list.bind(this)
    });
    this.getRegion('surveysContent').show(addView);
  }
});
