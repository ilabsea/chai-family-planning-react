import {NetInfo, Alert} from 'react-native';
import BackgroundJob from 'react-native-background-job';

import realm from '../data/schema';
import VersionService from './version_service';
import Task from '../utils/task';
import api from '../utils/api';
import environment from '../environments/environment';


export default class SurveyService {
  static get() {
    return realm.objects('Survey');
  }

  static count(){
    return this.get().length;
  }
  static save(survey, isOnline){
    survey.end_entried_at = new Date();
    survey.version = VersionService.version();

    if(isOnline){
      api.post('/surveys', {survey: {0: survey}});
    }else{
      realm.write(() => {
        realm.create('Survey', survey);
        Task.process();
      });
    }
  }

  static synOfflineData(){
    let survey = this.get();
    api.post('/surveys', {survey: survey}).then((response) => {
      if(response['ok']){
        this.clear(survey);
        BackgroundJob.cancelAll();
        console.log('*** Completed ***');
      }
    });
  }

  static clear(data){
    realm.write(() => {
      realm.delete(data);
    })
  }

};
