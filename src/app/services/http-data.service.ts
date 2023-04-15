import { Injectable, Input } from '@angular/core';
/* Los API tienen cabecera */
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Student } from '../models/student.model';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
 base_url = "http://localhost:3000/students";
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      /* es OBLIGATORIO el content type */
    })
  }

  handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      //Default
      console.log(`An error occured ${error.status}, body wa: ${error.error}`);
    }else{
      //Unsuccessful response from Backend
      console.log(`An error occured ${error.status}, body wa: ${error.error}`);
    }
    return throwError('Something happened with request, try again later.');
  }
  /* post */
  createItem(item: any): Observable<Student>{
    return this.http
      .post<Student>(this.base_url, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  /* GET */
  getList(): Observable<Student>{
    return this.http
      .get<Student>(this.base_url)
      .pipe(retry(2), catchError(this.handleError))
  }

  /* specific GET */ 
  /* observer: los que esperan los paquetes, rxjs filtra? y transporta? */
  getItem(id: string): Observable<Student>{
    return this.http
      .get<Student>(this.base_url + '/' + id)
      .pipe(retry(2), catchError(this.handleError))
  }

  /* update. usa el put: actualiza datos*/
  updateItem(id: string, item: any): Observable<Student>{
    return this.http /* se actualiza el item en formato JSON en la url dada */
      .put<Student>(this.base_url + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  /* delete */
  deleteItem(id: string): Observable<Student>{
    return this.http
      .delete<Student>(`${this.base_url}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }
}
