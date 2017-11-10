import OrganizationsView from './index/layout-view';
import OrganizationView from './show/view';
import NewOrganizationView from './add/view';
import organizationsStorage from './storage';

const organizations = props => {
  const { app } = props;
  const routes = {
    appRoutes: {
      'organizations(/)': 'showOrganizations',
      'organizations/new': 'newOrganization',
      'organizations/:id(/:entity)': 'showOrganization'
    },
    controller: {
      showOrganizations() {
        organizationsStorage.findAll().then(collection => {
          app.showViewOnRoute(new OrganizationsView({ collection }));
        });
      },
      showOrganization(organizationId, entity) {
        organizationsStorage.find(organizationId).then(model => {
          app.showViewOnRoute(
            new OrganizationView({
              model,
              app,
              entity
            })
          );
        });
      },
      newOrganization() {
        app.showViewOnRoute(new NewOrganizationView());
      }
    }
  };
  return routes;
};

export default organizations;
