import Mn from 'backbone.marionette';
import Template from './layout-template.hbs';
import CollectionView from './collection-view';
import storage from '../storage';
import utils from '../../utils';
import { debounce, includes } from 'lodash';

export default Mn.View.extend({
  template: Template,
  regions: {
    list: '#organization-list'
  },
  events: {
    'keyup #search': 'handleSearch'
  },
  initialize() {
    this.collection.on('remove', this.render);
    this.search = debounce(this.search, 300);
  },
  onRender() {
    setTimeout(() => {
      this.$el.find('#search').focus();
    }, 0);
    this.showList();
  },
  showList() {
    this.getRegion('list').show(
      new CollectionView({ collection: this.collection })
    );
  },
  handleSearch(event) {
    let term = event.target.value;
    let container = this.$el.find('.list-container').eq(0);
    const section = utils.getLoadingSection(container);
    section.loading();
    this.getRegion('list').empty();
    setTimeout(() => {
      storage.findAll().then(collection => {
        this.collection = collection;
        this.showList();
        section.reset();
      });
    }, 1000);
  },
  search(term) {
    if (!term) {
      return null;
    }
    let filtered = this.collection.filterByValue(term);

    if (filtered && filtered.length > 0) {
      return filtered;
    }

    return null;
  }
});
