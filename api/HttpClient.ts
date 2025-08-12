import { FetchRequestInit } from 'expo/fetch';

export interface RequestParams
  extends Omit<FetchRequestInit, 'integrity' | 'keepalive' | 'mode' | 'referrer' | 'window'> {
  path: string;
}

export class HttpClient {
  public baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public request = async <T = any>({ path, body, ...rest }: RequestParams): Promise<T> => {
    return fetch(this.baseUrl + path).then(res => res.json() as T);
  };
}
