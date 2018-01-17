import Bn from 'backbone';
import env from '../env';

export default Bn.Model.extend({
  urlRoot: `${env.API}/users`
  // validate(attrs = {}) {
  //   const errors = [];

  //   if (attrs.user.username === '') {
  //     errors.push('Missing "Username" field');
  //   }

  //   if (attrs.user.email === '') {
  //     errors.push('Missing "Email" field');
  //   }

  //   if (attrs.user.pass === '') {
  //     errors.push('Missing "Password" field');
  //   }

  //   if (attrs.user['password-confirm'] === '') {
  //     errors.push('Missing "Password Confirmation" field');
  //   }

  //   if (attrs.user.pass !== '' &&
  //     attrs.user['password-confirm'] !== '' &&
  //     attrs.user.pass !== attrs.user['password-confirm']) {
  //     errors.push('Password confirmation failed');
  //   }

  //   if (attrs.role === null) {
  //     errors.push('Missing "Role" field');
  //   } else if (attrs.application === undefined && attrs.organization === undefined) {
  //     errors.push('Missing "Organization" field');
  //   }

  //   return errors.length > 0 ? errors : undefined;
  // }
});
