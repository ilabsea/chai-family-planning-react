import BackgroundJob from "react-native-background-job";
import SurveyService from '../services/survey_service';
import VersionService from '../services/version_service';
import environment from '../environments/environment';

export default class Task {

  static init(){
    BackgroundJob.register({
      jobKey: 'SynSurvey',
      job: () => SurveyService.synOfflineData()
    });

    BackgroundJob.register({
      jobKey: 'SynVersion',
      job: () => VersionService.synOfflineData()
    });
  }

  static synSurvey(){
    BackgroundJob.schedule({
      jobKey: 'SynSurvey',
      period: environment['syn_schedule_in_ms'],
      allowExecutionInForeground: true
    });
  }

  static synVersion(){
    BackgroundJob.schedule({
      jobKey: 'SynVersion',
      period: environment['syn_schedule_in_ms'],
      allowExecutionInForeground: true
    });
  }


}
