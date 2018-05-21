import TermCondPolView from './view';
import TermCondPolModel from './model';

const termcondpol = props => {
  const { app } = props;
  const routes = {
    appRoutes: {
        'survey/:id/termcondpol/:type/:language': 'showTermCondPol'
    },
    controller: {

      showTermCondPol(hashSurvey, hashType, hashLanguage) {
        const model = new TermCondPolModel();
        const surveyId = parseInt(hashSurvey, 10);
        const formData = app.getSession().get('formData');
        const reAnswer = app.getSession().get('reAnswer');
        model
          .fetch({
            data: {
              type: hashType,
              language: hashLanguage
            }
          })
          .then(() => {
            app.showViewOnRoute(new TermCondPolView({
               model, app, surveyId, reAnswer, formData
             }));
          });
      }
    }
  };
  return routes;
};

export default termcondpol;
