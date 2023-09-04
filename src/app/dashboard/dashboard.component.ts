import { Component, Input, OnInit  } from '@angular/core';
import { CustomerServiceService } from '../customerse.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // customerService: any;
  constructor(private service :CustomerServiceService) {}
  
  @Input()
  invoices: any[] = []; 
  customers: any[] = [];
  ngOnInit(): void {
    this.loadCustomers();
    this.loadInvoices();
  }
  loadInvoices(): void {
    this.service.getInvoices().subscribe(
      (invoices: any[]) => {
        this.invoices = invoices;
      },
      (error: any) => {
        console.error('Error loading invoices:', error);
      }
    );
  }
  loadCustomers() {
    this.service.getCustomers().subscribe(
      (      customers: any[]) => {
        this.customers = customers;
      },
      (      error: any) => {
        console.error('Error fetching customers:', error);
      }
    );
  }  

  editInvoice(invoice: any): void {
    // Handle edit logic
  }

  deleteInvoice(invoices: any[], invoiceIndex: number): void {
    if (invoices && invoices.length > invoiceIndex) {
      invoices.splice(invoiceIndex, 1);
    }
  }
  
  
}
