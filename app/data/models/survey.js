'use strict';

import Realm from 'realm';

export default class Survey extends Realm.Object {}

Survey.schema = {
  name: 'Survey',
  properties: {
    value: 'string',
    version: 'string',
    start_entried_at: 'date',
    end_entried_at: 'date'
  }

}
