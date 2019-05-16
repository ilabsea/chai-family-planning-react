import realm from '../data/schema';
import api from '../utils/api';
import VersionService from './version_service';
import BackgroundJob from 'react-native-background-job';

export default class QuestionService {
  static get() {
    return realm.objects('Question').sorted('order');
  }

};
