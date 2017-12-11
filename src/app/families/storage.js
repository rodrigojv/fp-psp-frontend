import Storage from 'backbone.storage';
import Model from './model';

var FamiliesStorage = Storage.extend({
  model: Model,
  getSubHeaderItems(model) {
    return {
      mainItem: {
        name: 'Families',
        link: `/#families`
      },
      navigationItems: [

        {
          name: 'Intervenciones',
          link: `/#families/interventions`
        },
        {
          name: 'Snapshots',
          link: `/#families/snapshots`
        }
      ]
    };
  }
});

export default new FamiliesStorage();
