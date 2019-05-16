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
};
