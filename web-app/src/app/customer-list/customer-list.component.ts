import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  allCustomers: Customer[] = []; // Keep the original list here
  filter = new FormControl('');

  constructor(private customerService: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.customerService.customers$.subscribe(customers => {
      this.customers = customers;
      this.allCustomers = customers; // Store the original list of customers
    });

    this.filter.valueChanges.subscribe(filterValue => {
      this.applyFilter(filterValue ?? '');
    });
  }

  applyFilter(filterValue: string) {
    if (!filterValue) {
      // If no filter, reset to the original list
      this.customers = [...this.allCustomers];
    } else {
      // Filter based on the original list
      this.customers = this.allCustomers.filter((customer: Customer) =>
        customer.situacaoContrato.includes(filterValue)
      );
    }
  }

  cancelContract(id: string) {
    this.customerService.cancelContract(id).subscribe();
  }

  deleteCustomer(id: string) {
    this.customerService.removeCustomer(id).subscribe();
  }

  navigateToNewCustomer() {
    this.router.navigate(['/new-customer']); // Navigate to the customer form
  }
}
