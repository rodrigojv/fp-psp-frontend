import Bb from 'backbone';
import Mn from 'backbone.marionette';
import template from './template.hbs';
import LoginView from './login/view';
import ResetView from './login/reset/view';

export default Mn.View.extend({
  template,

  regions: {
    content: '#login-content'
  },

  initialize(options) {
    this.localeConfiguration = options.localeConfiguration;
  },

  onRender() {
    if (Bb.history.location.href.indexOf('?token=') > 0) {
      this.showReset();
    } else {
      this.showLogin();
    }
  },

  showLogin() {
    this.getRegion('content').show(
      new LoginView({ localeConfiguration: this.localeConfiguration })
    );
  },

  showReset() {
    this.getRegion('content').show(new ResetView());
  }
});
