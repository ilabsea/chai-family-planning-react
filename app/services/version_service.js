import realm from '../data/schema';
import api from '../utils/api';
import BackgroundJob from 'react-native-background-job';

export default class VersionService {
  static get() {
    return realm.objects('Version');
  }

  static last(){
    return this.get().sorted('from_date', true)[0];
  }

  static version(){
    var result = this.last();
    return `${result.uuid}_${result.version}`;
  }

  static synOfflineData(){
    versions = this.get();
    api.post('/versions', {version: versions}).then((response) => {
      if(response['ok']){
        BackgroundJob.cancel({jobKey: 'SynVersion'});
      }
    });
  }
};
