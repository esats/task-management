import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { apiResponseModel } from '../models/apiResponse.model';
@Injectable({
  providedIn: 'root',
})
export class restApiService {
  // Define API
  apiURL = 'http://localhost:27626/api';
  constructor(private http: HttpClient) {}
  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  // HttpClient API get() method => Fetch employees list
  getUsers() {
    return this.http.get<apiResponseModel>(this.apiURL + '/users/list');
  }

  addUser(model: any) {
    return this.http.post<apiResponseModel>(this.apiURL + '/users/create', JSON.stringify(model), this.httpOptions);
  }

  getUser(id: number) {
    return this.http.get<apiResponseModel>(this.apiURL + '/users/getById/' + id);
  }

  getComments() {
    return this.http.get<apiResponseModel>(this.apiURL + '/comment/list');
  }

  makeComment(model: any) {
    return this.http.post<apiResponseModel>(this.apiURL + '/comment/make', JSON.stringify(model), this.httpOptions);
  }

  editComment(model: any) {
    return this.http.post<apiResponseModel>(this.apiURL + '/comment/edit', JSON.stringify(model), this.httpOptions);
  }

  searchComments(prefix: string) {
    return this.http.get<apiResponseModel>(this.apiURL + '/comment/search/' + prefix);
  }

  getTasks() {
    return this.http.get<apiResponseModel>(this.apiURL + '/task/list');
  }

  addTask(model: any) {
    return this.http.post<apiResponseModel>(this.apiURL + '/task/create', JSON.stringify(model), this.httpOptions);
  }

  getTask(id: number) {
    return this.http.get<apiResponseModel>(this.apiURL + '/task/getById/' + id);
  }

  editTask(model: any) {
    return this.http.post<apiResponseModel>(this.apiURL + '/task/edit', JSON.stringify(model), this.httpOptions);
  }

  assignTask(model: any) {
    return this.http.post<apiResponseModel>(this.apiURL + '/task/assign', JSON.stringify(model), this.httpOptions);
  }

  deleteTask(id: number) {
    return this.http.get<apiResponseModel>(this.apiURL + '/task/delete/' + id);
  }
 
  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}