import Bn from 'backbone';
import env from '../env';
import { includes } from 'lodash';
var Collection = Bn.Collection.extend({
  url: `${env.API}/organizations`,
  filterByValue: function(term) {
    let filtered = this.filter(m => this.includesAny(term, m));

    return new Collection(filtered);
  },
  includesAny: function(term, model) {
    return (
      includes(model.get('name'), term) ||
      includes(model.get('code'), term) ||
      includes(model.get('decription'), term)
    );
  }
});

export default Collection;
