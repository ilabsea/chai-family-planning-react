import realm from '../data/schema';

export default class QuestionService {
  static get() {
    return realm.objects('Question').sorted('order');
  }
};
