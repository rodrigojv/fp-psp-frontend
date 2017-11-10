import Mn from 'backbone.marionette';
import Template from './layout-template.hbs';
import CollectionView from './collection-view';

export default Mn.View.extend({
  template: Template,
  regions: {
    list: '#organization-list'
  },
  initialize() {
    this.collection.on('remove', this.render);
  },
  onRender() {
    this.getRegion('list').show(
      new CollectionView({ collection: this.collection })
    );
  }
});
