import Bb from 'backbone';
import { LocalStorage } from 'backbone.localstorage';
import env from './env';
import _includes from 'lodash/includes';

/**
 * Saves user session info in browser localStorage,
 * so that we can access that info when the user
 * refresh the page or is redirected from the login page.
 *
 */
var SessionModel = Bb.Model.extend({
  localStorage: new LocalStorage('SessionModel'),
  defaults: {
    access_token: '',
    refresh_token: '',
    user: {},
    returnFragment: ''
  },
  isAuthenticationEnabled: function() {
    return env.authenticationEnabled;
  },
  isAuthenticated: function() {
    if (!env.authenticationEnabled) {
      return true;
    }
    return this.get('access_token') && this.get('access_token').length > 0;
  },
  getLoggedUserHomeRoute: function() {
    // Se if there are any previously stored
    // route.
    let route = this.get('returnFragment') || 'home';

    if (this.userHasRole('ROLE_APP_ADMIN') || this.userHasRole('ROLE_USER')) {
      const orgId = this.get('user').organization.id;
      route = `organizations/${orgId}`;
    }
    return route;
  },
  userHasRole(roleName) {
    if (!this.get('user').authorities) {
      return false;
    }
    const auths = this.get('user').authorities.map(auth => auth.authority);
    return _includes(auths, roleName);
  },
  userIsOrganizationAdmin() {
    if (!this.isAuthenticationEnabled()) {
      return true;
    }
    return (
      this.userHasRole('ROLE_ROOT') ||
      this.userHasRole('ROLE_APP_ADMIN') ||
      this.userHasRole('ROLE_HUB_ADMIN')
    );
  }
});

/**
* Singleton Pattern
*/
var instance = null;
SessionModel.getInstance = function() {
  if (instance === null) {
    instance = new SessionModel({ id: 1 });
  }
  return instance;
};

export default SessionModel.getInstance();
