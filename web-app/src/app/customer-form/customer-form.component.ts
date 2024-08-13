import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
})
export class CustomerFormComponent implements OnInit {
  customerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      nome: ['', Validators.required],
      cnpj: ['', Validators.required],
      dataContrato: ['', Validators.required],
      valorContrato: ['', Validators.required],
      situacaoContrato: ['Dentro do Prazo', Validators.required],
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      this.customerService.addCustomer(this.customerForm.value).subscribe(() => {
        this.router.navigate(['/']); // Navigate back to the customer list
      });
      this.customerForm.reset();
    }
  }
}
