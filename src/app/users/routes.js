import UsersView from './view';

const users = props => {
  const { app } = props;

  const routes = {
    appRoutes: {
      users: 'showUsers'
    },
    controller: {
      showUsers() {
        app.showViewOnRoute(new UsersView());
      }
    }
  };

  return routes;
};

export default users;
