import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from './product';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = "https://api.mercadolibre.com/sites/MLM/search?limit=50&offset=100";
const apiUrlItem = "https://api.mercadolibre.com/items";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient ) { 
    
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getProducts (): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl)
      .pipe(
        tap(res => console.log("res",res)),
        catchError(this.handleError('getProducts', []))
      )
  }
  
  getProduct(q: string): Observable<Product> {
    const url = `${apiUrl}&q=${q}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => console.log(`fetched product q=${q}`)),
      catchError(this.handleError<Product>(`getProduct q=${q}`))
    );
  }

  getProductDetail(id: string): Observable<Product> {
    const url = `${apiUrlItem}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => console.log(`fetched product q=${id}`)),
      catchError(this.handleError<Product>(`getProduct q=${id}`))
    );
  }

}
