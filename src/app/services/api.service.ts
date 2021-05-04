import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../models/user';
import { HttpService } from './http.service';

@Injectable()
export class ApiService {
  constructor(private httpService: HttpService) {}
 getAllPost(): Observable<IUser[]>{
   return this.httpService.get('/users')
   .pipe(map(data => data as IUser[]))
 }
}
