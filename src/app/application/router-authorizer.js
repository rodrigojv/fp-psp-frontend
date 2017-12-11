import _isRegExp from 'lodash/fp/isRegExp';
import _includes from 'lodash/includes';
import _keys from 'lodash/fp/keys';

const anonymousRoutes = ['', 'home', 'logout'];

const adminCrudRoutes = {
  organizations: ['organizations(/)', 'organizations'],
  users: ['users(/)', 'users'],
  families: ['families(/)', 'families'],
  surveys: ['surveys(/)', 'surveys'],
  reports: ['reports(/)', 'reports']
};

// Cached regular expressions for matching named param parts and splatted
// parts of route strings.
var optionalParam = /\((.*?)\)/g;
var namedParam = /(\(\?)?:\w+/g;
var splatParam = /\*\w+/g;
var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;

// Convert a route string into a regular expression, suitable for matching
// against the current location hash.
var _routeToRegExp = function(route) {
  route = route
    .replace(escapeRegExp, '\\$&')
    .replace(optionalParam, '(?:$1)?')
    .replace(namedParam, function(match, optional) {
      return optional ? match : '([^/?]+)';
    })
    .replace(splatParam, '([^?]*?)');
  return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
};

class Authorizer {
  constructor({ onAccessDenied, session, appRoutes }) {
    this.session = session;
    this.appRoutes = appRoutes;
    this.onAccessDenied = onAccessDenied;
  }
  getAuthorizedRoutes() {
    const routesKeys = _keys(this.appRoutes);
    if (this.session.userHasRole('ROLE_ROOT')) {
      return routesKeys;
    }

    if (this.session.userHasRole('ROLE_HUB_ADMIN')) {
      return routesKeys;
    }

    // APP_ADMIN is a member and admin
    // of an organization, so cannot CRUD
    // other organizations.
    if (this.session.userHasRole('ROLE_APP_ADMIN')) {
      return routesKeys
        .filter(route => !_includes(adminCrudRoutes.organizations, route))
        .filter(route => !_includes(adminCrudRoutes.users, route))
        .filter(route => !_includes(adminCrudRoutes.families, route));
    }

    // regular user
    return routesKeys
      .filter(route => !_includes(adminCrudRoutes.organizations, route))
      .filter(route => !_includes(adminCrudRoutes.users, route))
      .filter(route => !_includes(adminCrudRoutes.families, route));
  }

  isAuthorizedRoute(routeParam) {
    if (!this.session.isAuthenticationEnabled()) {
      return true;
    }
    const baseRoute = routeParam.split('/')[0];

    const authorizedRoutes = this.getAuthorizedRoutes()
      .map(route => {
        if (!_isRegExp(route)) return _routeToRegExp(route);
        else return route;
      })
      .filter(route => route === routeParam || route.test(routeParam));

    return _includes(anonymousRoutes, baseRoute) || authorizedRoutes.length > 0;
  }
  canAccess(route) {
    if (!this.isAuthorizedRoute(route)) {
      this.onAccessDenied.apply();
    }
  }
}
const initRouterAuthorizer = props => {
  return new Authorizer(props);
};

export default initRouterAuthorizer;
