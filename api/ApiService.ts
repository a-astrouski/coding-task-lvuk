import { HttpClient } from './HttpClient';
import { UsersApiService } from './UsersApiService';

export class ApiService {
  private readonly httpClient: HttpClient;

  public users: UsersApiService;

  constructor() {
    this.httpClient = new HttpClient('https://jsonplaceholder.typicode.com');

    this.users = new UsersApiService(this.httpClient);
  }
}
