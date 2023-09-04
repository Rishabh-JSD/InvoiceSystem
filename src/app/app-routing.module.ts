import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewCustomerComponent } from './newcustomer/newcustomer.component';
import { AddItemComponent } from './add-item/add-item.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'new-customer', component: NewCustomerComponent },
  { path: 'add-item', component: AddItemComponent },
  { path: 'create-invoice', component: CreateInvoiceComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
