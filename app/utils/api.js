import {create} from 'apisauce';
import {decode as atob, encode as btoa} from 'base-64';
import environment from '../environments/environment';

const api = create({
  baseURL: environment['apiUrl'],
  headers: {
    'Authorization': 'Basic ' + btoa(`${environment['http_basic_user']}:${environment['http_basic_password']}`)
  }
});

export default api;
