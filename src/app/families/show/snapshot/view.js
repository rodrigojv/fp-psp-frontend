import Mn from 'backbone.marionette';
import Template from './template.hbs';
import InterventionsTemplate from '../interventions-template.hbs';
import SnapshotsTemplate from '../snapshots-template.hbs';
import storage from '../../storage';

export default Mn.View.extend({
  template: Template,

  initialize(options) {
    this.app = options.app;
    this.snapshotId = options.snapshotId;
  },

  onRender() {
    const headerItems = storage.getSubHeaderItems(this.model);
    this.app.updateSubHeader(headerItems);
  }

});
