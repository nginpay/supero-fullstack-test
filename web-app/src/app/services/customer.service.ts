import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:3000/clients';
  private customersSubject = new BehaviorSubject<Customer[]>([]);

  customers$ = this.customersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCustomers();
  }

  private loadCustomers() {
    this.http.get<Customer[]>(this.apiUrl+'/find-all').subscribe(customers => {
      this.customersSubject.next(customers);
    });
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer).pipe(
      tap(newCustomer => {
        const updatedCustomers = [...this.customersSubject.value, newCustomer];
        this.customersSubject.next(updatedCustomers);
      })
    );
  }

  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Customer>(url, customer).pipe(
      tap(updatedCustomer => {
        const updatedCustomers = this.customersSubject.value.map(c =>
          c.id === id ? updatedCustomer : c
        );
        this.customersSubject.next(updatedCustomers);
      })
    );
  }

  removeCustomer(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      tap(() => {
        const updatedCustomers = this.customersSubject.value.filter(c => c.id !== id);
        this.customersSubject.next(updatedCustomers);
      })
    );
  }

  cancelContract(id: number): Observable<Customer> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Customer>(url, { status: 'Cancelado' }).pipe(
      tap(updatedCustomer => {
        const updatedCustomers = this.customersSubject.value.map(c =>
          c.id === id ? updatedCustomer : c
        );
        this.customersSubject.next(updatedCustomers);
      })
    );
  }
}
