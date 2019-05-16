import BackgroundJob from "react-native-background-job";
import SurveyService from '../services/survey_service';
import VersionService from '../services/version_service';
import QuestionService from '../services/question_service';
import DataService from '../services/data_service';
import environment from '../environments/environment';

export default class Task {

  static init(){
    BackgroundJob.register({
      jobKey: 'SynSurvey',
      job: () => SurveyService.synOfflineData()
    });

    BackgroundJob.register({
      jobKey: 'SynCoreData',
      job: () => DataService.synOfflineData()
    });
  }

  static synSurvey(){
    BackgroundJob.schedule({
      jobKey: 'SynSurvey',
      period: environment['syn_schedule_in_ms'],
      allowExecutionInForeground: true
    });
  }

  static synCoreData(){
    BackgroundJob.schedule({
      jobKey: 'SynCoreData',
      period: environment['syn_schedule_in_ms'],
      allowExecutionInForeground: true
    });
  }


}
