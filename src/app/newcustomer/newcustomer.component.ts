import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { CustomerServiceService } from '../customerse.service';

@Component({
  selector: 'app-newcustomer',
  templateUrl: './newcustomer.component.html',
  styleUrls: ['./newcustomer.component.css']
  
})
export class NewCustomerComponent  {
  customer: Customer = {
    name: '',
    email: '',
    password: '',
    id: 0
  };

  constructor(private customerService: CustomerServiceService) {}


  onSubmit(): void {
    this.customerService.addCustomer(this.customer).subscribe(
      (response: any) => {
        // Handle success
        console.log('Customer added successfully:', response);
      },
      (error: any) => {
        // Handle error
        console.error('Error adding customer:', error);
      }
    );location.reload();
  } 

 

}
