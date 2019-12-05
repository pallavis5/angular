import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { product } from './product';
import { AuthServiceService } from '../auth-service.service';
import { bill } from './purchase-history';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  filteredList: product[]
  types: string[]
  isDelete: boolean = false
  productApiUrl = environment.proUrl
  private subject = new Subject<product[]>();

  constructor(private httpClient: HttpClient, private authService: AuthServiceService) { }

  productList(type: string): Observable<product[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.httpClient.get<product[]>(this.productApiUrl + 'product/' + type, { headers });
  }

  productAll(): Observable<product[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.httpClient.get<product[]>(this.productApiUrl + 'product', { headers });
  }


  productTypeList(): Observable<string[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.httpClient.get<string[]>(this.productApiUrl + 'product/typelist', { headers });
  }
  productEditList(code: string): Observable<product> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.httpClient.get<product>(this.productApiUrl + 'product/edit/' + code, { headers });
  }
  productModify(products: product): Observable<product> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.httpClient.put<product>(this.productApiUrl + 'product', products, { headers });
  }
  productAddition(products: product): Observable<product> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.httpClient.post<product>(this.productApiUrl + 'product', products, { headers });
  }
  productDelete(code: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.httpClient.delete(this.productApiUrl + 'product/' + code, { headers });
  }
  postBill(contact: string, code: string, quants: number): Observable<bill> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.httpClient.post<bill>(this.productApiUrl + 'product/bill/' + contact + '/' + code + '/' + quants, { headers });
  }
  getBill(userid: string): Observable<bill[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.httpClient.get<bill[]>(this.productApiUrl + 'product/bill/' + userid, { headers });
  }
}


