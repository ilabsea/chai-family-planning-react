'use strict';

import Realm from 'realm';
import Version from './models/version';
import Question from './models/question';
import QuestionOption from './models/question_option';
import Survey from './models/survey';
import Answer from './models/answer';

export default new Realm({schema: [
  Version,
  Question,
  QuestionOption,
  Survey,
  Answer
]});
