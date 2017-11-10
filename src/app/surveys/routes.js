import SurveysView from './view';

const surveys = props => {
  const { app } = props;
  const routes = {
    appRoutes: {
      surveys: 'showSurveys'
    },
    controller: {
      showSurveys() {
        app.showViewOnRoute(new SurveysView());
      }
    }
  };
  return routes;
};

export default surveys;
