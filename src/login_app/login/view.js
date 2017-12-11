import Mn from 'backbone.marionette';
import Template from './template.hbs';
import env from '../env';
import $ from 'jquery';
import session from '../../common/session';
import utils from '../../common/utils';

export default Mn.View.extend({
  template: Template,

  events: {
    'click #btn-login': 'doLogin'
  },

  initialize(options) {
    this.app = options.app;
    session.fetch();
  },
  doLogin(event) {
    let loginBtn = this.$el.find('#btn-login');
    let button = utils.getLoadingButton(loginBtn);
    event.preventDefault();
    var url = `${env.API_AUTH}/token`;

    var username = $('#login-username').val();
    var password = $('#login-password').val();

    url =
      url +
      '?username=' +
      username +
      '&password=' +
      password +
      '&grant_type=password';

    var clientid = 'barClientIdPassword';
    var clientsecret = 'secret';
    button.loading();
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      headers: {
        Authorization: 'Basic ' + btoa(clientid + ':' + clientsecret)
      },

      success: data => {
        if (data.error) {
          // If there is an error, show the error messages
          $('.alert-error')
            .text(data.error.text)
            .show();
        } else {
          // If not, send them back to the home page
          const { access_token, refresh_token, user } = data;
          session.save({ access_token, refresh_token, user });

          const fragment = session.getLoggedUserHomeRoute();
          window.location.replace(`/#${fragment}`);
        }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        if (textStatus === 'Unauthorized') {
          window.alert('No autorizado');
        } else {
          window.alert('Credenciales inválidos.. Intente de nuevo');
          $('#login-username').val('');
          $('#login-password').val('');
          $('#login-username').focus();
        }
      },
      complete: () => {
        button.reset();
      }
    });
  }
});
