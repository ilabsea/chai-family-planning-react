import BackgroundJob from "react-native-background-job";
import SurveyService from '../services/survey_service';
import environment from '../environments/environment';

export default class Task {

  static process(){
    BackgroundJob.schedule({
      jobKey: 'PushData',
      period: environment['syn_schedule_in_ms'],
      allowExecutionInForeground: true
    });

  }


}
