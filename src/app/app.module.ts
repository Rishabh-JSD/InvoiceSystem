import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerServiceService } from '../app/customerse.service'; 

import { AddItemComponent } from './add-item/add-item.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { HttpClientModule } from '@angular/common/http';
import { NewCustomerComponent } from './newcustomer/newcustomer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  
    AddItemComponent,
    CreateInvoiceComponent,
    NewCustomerComponent,
    HeaderComponent,
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    CustomerServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
