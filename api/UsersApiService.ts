import { HttpClient } from './HttpClient';
import { UserDto } from '@/api/DataTransferObjects';

export class UsersApiService {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getUsers = () => this.httpClient.request<UserDto[]>({ path: '/users' });
}
