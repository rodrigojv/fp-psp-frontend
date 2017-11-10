import BaseRouter from './baserouter';
import organizations from '../organizations/routes';
import surveys from '../surveys/routes';
import snapshots from '../snapshots/routes';
import users from '../users/routes';

import _ from 'lodash';

const initRouter = props => {
  const { app } = props;

  const { appRoutes, controller } = _.merge(
    organizations(props),
    surveys(props),
    snapshots(props),
    users(props)
  );

  return new BaseRouter({
    appRoutes,
    controller,
    before: () => {
      app.emptySubHeader();
    }
  });
};

// BaseRouter.extend({
//   initialize(options) {
//     this.before = options.before || function() {};
//     this.after = options.after || function() {};
//   },
//   appRoutes: {},
//   selectActiveMenu(path) {
//     const menuPath = path.split('/').length > 0 ? path.split('/')[0] : path;
//     const elem = $('.nav').find(`a[href="#${menuPath}"]`);
//     if (elem.length === 0) {
//       return;
//     }
//     $('.nav')
//       .find('.active')
//       .removeClass('active');
//     elem.parent().addClass('active');
//   },
//   onRoute: function(name, path, args) {
//     // this.selectActiveMenu(path);
//   }
// });

export default initRouter;
