import realm from '../data/schema';

export default class SurveyService {
  static get() {
    return realm.objects('Survey').sorted('start_entried_at', true);
  }
  static save(survey, callback){
    // if (repository.objects('Survey').filtered("title = '" + todo.title + "'").length) return;

    repository.write(() => {
      survey.end_entried_at = new Date();
      realm.create('Survey', survey);
      callback;
    })
  }
};
