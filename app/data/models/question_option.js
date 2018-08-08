'use strict';

import Realm from 'realm';

export default class QuestionOption extends Realm.Object {}

QuestionOption.schema = {
  name: 'QuestionOption',
  properties: {
    question_uuid: 'string',
    name: 'string',
    label: 'string',
    media: {type: 'string', optional: true}
  }
}
