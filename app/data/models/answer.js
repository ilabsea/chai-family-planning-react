'use strict';

import Realm from 'realm';

export default class Answer extends Realm.Object {}

Answer.schema = {
  name: 'Answer',
  properties: {
    code: 'string',
    value: 'string'
  }

}
