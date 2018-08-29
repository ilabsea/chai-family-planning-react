import realm from '../data/schema';

export default class VersionService {
  static get() {
    return realm.objects('Version').sorted('from_date', true);
  }
  static version(){
    var result = this.get()[0];
    return `${result.id}_${result.version}`;
  }
};
