'use strict';

import Realm from 'realm';

export default class Version extends Realm.Object {}

Version.schema = {
  name: 'Version',
  properties: {
    uuid: 'string',
    version: 'int',
    from_date: 'date',
    to_date: {type: 'date', optional: true}
  }
}
