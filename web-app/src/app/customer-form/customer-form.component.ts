import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
})
export class CustomerFormComponent implements OnInit {
  customerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      cpfCnpj: ['', Validators.required],
      phone: ['', Validators.required],
      contractNumber: ['', Validators.required],
      contractDate: ['', Validators.required],
      contractValue: ['', Validators.required],
      status: ['Dentro do Prazo', Validators.required],
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      this.customerService.addCustomer(this.customerForm.value);
      this.customerForm.reset();
    }
  }
}
