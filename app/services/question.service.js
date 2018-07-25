import { environment } from '../environments/environment';

export default {
  getAll() {
    return fetch('${environment.apiUrl}/repositories/55873922/commits');
  }
}
