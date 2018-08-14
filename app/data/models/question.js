'use strict';

import Realm from 'realm';

export default class Question extends Realm.Object {}

Question.schema = {
  name: 'Question',
  properties: {
    uuid: { type: 'string', optional: true },
    name: 'string',
    label: 'string',
    type: 'string',
    order: 'int',
    required: { type: 'bool', default: false },
    relevant: { type: 'string', optional: true },
    options: { type: 'list', objectType: 'QuestionOption' },
  }

}
