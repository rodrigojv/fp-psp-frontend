import Mn from 'backbone.marionette';
import ItemView from './item/view';

export default Mn.CollectionView.extend({
  childView: ItemView,
  className: 'list-container',
  childEvents: {
    'delete:model': 'handleDelete'
  },
  onChildviewDeleteItem(childView) {
    this.collection.remove(childView.model);
  }
});
