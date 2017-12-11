import FamiliesView from './view';
import FamilyView from './show/view';
import FamiliesStorage from './storage';

const families = props => {
  const { app } = props;
  const routes = {
    appRoutes: {
      'families(/)': 'showFamilies',
      'families/:entity': 'showFamily'
    },
    controller: {
      showFamilies() {
        app.showViewOnRoute(new FamiliesView({
            app
          })
        );
      },
      showFamily(entity) {
        app.showViewOnRoute(
          new FamilyView({
            app,
            entity
          })
        );
      }
    }
  };
  return routes;
};

export default families;
