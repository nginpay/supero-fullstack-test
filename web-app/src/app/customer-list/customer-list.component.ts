import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  filter = new FormControl('');

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.customers$.subscribe(customers => {
      this.customers = customers;
    });

    this.filter.valueChanges.subscribe(filterValue => {
      if (filterValue !== null) {
        this.applyFilter(filterValue);
      }
    });
  }

  applyFilter(filterValue: string) {
    this.customers = this.customers.filter(customer =>
      customer.status.includes(filterValue)
    );
  }

  cancelContract(id: number) {
    this.customerService.cancelContract(id);
  }
}
