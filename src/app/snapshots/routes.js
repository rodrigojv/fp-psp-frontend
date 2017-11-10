import SnapshotsView from './view';

const snapshots = props => {
  const { app } = props;

  const routes = {
    appRoutes: {
      'snapshots/:id': 'showSnapshots'
    },
    controller: {
      showSnapshots(hash) {
        const surveyId = parseInt(hash, 10);
        app.showViewOnRoute(new SnapshotsView({ surveyId }));
      }
    }
  };

  return routes;
};

export default snapshots;
