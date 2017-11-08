import Bn from 'backbone';

export default Bn.Model.extend({
  defaults: {
    mainItem: {
      name: '',
      link: ''
    },
    navigationItems: []
  }
});
