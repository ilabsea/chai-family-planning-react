import realm from '../data/schema';
import api from '../utils/api';
import BackgroundJob from 'react-native-background-job';

import VersionService from './version_service';
import QuestionService from './question_service';

export default class DataService {

  static synOfflineData(){
    versions = VersionService.get();

    api.post('/versions', {version: versions}).then((response) => {
      if(response['ok']){
        questions = QuestionService.get();
        version = VersionService.version();
        api.post('/questions', {version: version, questions: questions}).then((response) => {
          if(response['ok']){
            BackgroundJob.cancel({jobKey: 'SynCoreData'});
          }
        });
      }
    });
  }
};
