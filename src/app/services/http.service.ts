import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';

@Injectable()
export class HttpService {
  public baseUrl:string = 'https://jsonplaceholder.typicode.com';
  public AUTH_TOKEN:string = 'auth_token';
  constructor(private httpClient: HttpClient) {}
  get(url: string, params?: any) : Observable<any> {
    const data = { params };
    return this.httpClient
      .get(this.baseUrl + url, data)
      .pipe(catchError(this.errorHandler.bind(this)));
  }
  private errorHandler(response: any) {
    const error = response.error;
    const keys = Object.keys(error);
    const key = keys[0]
    let message = error[key]
    console.log(message);
    if(response.status === 401){
      // auth token delete
      // redirect login page
    }
    if(error[key] instanceof Array){
      message = error[key][0]
    }
    if(key === 'isTrusted'){
      // this will occur when not connected to internet
    } else {
      message = key + ' : ' + message
    }
    // call snackbar and show error with message
    return throwError({messages: message, error})
  }
  private getAuthHeader(): { [header: string]: string | string[] } {
    return {
      Authorization: `Bearer ${localStorage.getItem(this.AUTH_TOKEN)}`,
    };
  }
  // my component are dependent on api service
  // api service -> http service
  // http service -> http client
}
