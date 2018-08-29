import realm from '../data/schema';
import VersionService from './version_service';

export default class SurveyService {
  static get() {
    return realm.objects('Survey').sorted('start_entried_at', true);
  }

  static count(){
    return this.get().length;
  }
  static save(survey, callback){
    realm.write(() => {
      survey.end_entried_at = new Date();
      survey.version = VersionService.version();
      realm.create('Survey', survey);
      callback;
    })
  }

};
