import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Customer, Item, InvoiceItemEntity, InvoiceEntity } from './customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  private customersUrl = "http://localhost:8080/api/invoices";
  getInvoices() : Observable<any[]>{
    return this.http.get<any[]>(`${this.customersUrl}/fetch`);
  }


  private apiUrl = 'http://localhost:8080/home';
  private baseUrl = 'http://localhost:8080/itemhome';
  

  constructor(private http: HttpClient) { }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/api`, customer);
  }
  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/customers`);
  }
  getItemsNames(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/items`);

  }

  
saveInvoice(invoiceData: any): Observable<any> {
  const url = 'http://localhost:8080/api/invoices/save-invoice';
  return this.http.post(url, invoiceData, { withCredentials: true })
    .pipe(
      catchError(error => {
        console.error('Error saving invoice:', error);
        throw error; // Rethrow the error to be caught by the calling code
      })
    );
}


}
