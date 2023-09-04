import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../customerse.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer, Item } from '../customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {
  items: Item[] = [];
  invoiceDate!: string;
  invoiceTime!: string;
  invoiceNumber!: string;
  selectedCustomer: number | null = null;
  invoiceRows: any[] = [];
  customers: any[] = [];
 selectedItemName: string = '';


  constructor(
    private inswr: CustomerServiceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    const currentDate = new Date();
    this.invoiceDate = currentDate.toISOString().substr(0, 10);
    this.invoiceTime = currentDate.toTimeString().substr(0, 5);
    this.loadCustomers();
    this.loadItemNames();
    this.generateInvoiceNumber();
  }


  updatePrice(selectedItemName: string, index: number) {
    const selectedItem = this.items.find(item => item.prodName === selectedItemName);

    if (selectedItem) {
      this.invoiceRows[index].unitPrice = selectedItem.price;
      this.calculateRowTotal(index);
    }
  }






  calculateRowTotal(index: number) {
    const row = this.invoiceRows[index];
    row.totalPrice = row.unit * row.unitPrice; // This line is causing the error
    row.totalTax = this.calculateTotalTax(row);
    row.totalAmount = row.totalPrice + row.totalTax;
  }

  calculateTotalTax(selectedItem: any): number {
    const totalTax = (selectedItem.unit * selectedItem.unitPrice) * (selectedItem.tax / 100);
    return +totalTax.toFixed(3);
  }


  calculateNetPayable(selectedItem: any): number {
    const totalTax = this.calculateTotalTax(selectedItem);
    const netPayable = (selectedItem.unit * selectedItem.unitPrice) + totalTax;
    return +netPayable.toFixed(3);
  }

  onQuantityChange(index: number) {
    this.calculateRowTotal(index);
  }

  onTaxChange(index: number) {
    this.calculateRowTotal(index);
  }


  loadItemNames() {
    this.inswr.getItemsNames().subscribe(
      (items) => {
        this.items = items;
      },
      (error) => {
        console.error('Error fetching item details:', error);
      }
    );
  }

  loadCustomers() {
    this.inswr.getCustomers().subscribe(
      (customers) => {
        this.customers = customers;
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );
  }

  generateInvoiceNumber() {
    const timestamp = Date.now();
    const uniqueIdentifier = Math.random().toString(36).substr(2, 8);
    this.invoiceNumber = `${timestamp}-${uniqueIdentifier}`;
  }

  // addRow(selectedItemId: number) {
  //   const selectedItem = this.items.find(item => item.id === selectedItemId);

  //   if (selectedItem) {
  //     const newRow = {
  //       itemName: selectedItem.prodName,
  //       quantity: 0,
  //       unitPrice: selectedItem.price,
  //       tax: 0,
  //       totalPrice: 0,
  //       totalTax: 0,
  //       netPayable: 0,
  //     };

  //     this.invoiceRows.push(newRow);
  //   }
  // }

  // invoiceRows :any[]=[];

  addRow() {


    const newRow = { id: this.invoiceRows.length + 1, name: this.selectedItemName };

    this.invoiceRows.push(newRow);
    // this.invoiceRows.push(newRow);
  }



  // addItemRow() {
  //   if (this.selectedItems) {
  //     const selectedItem = this.items.find(item => item.prodName === this.selectedItem);

  //     if (selectedItem) {
  //       const newRow = {
  //         item: selectedItem.prodName,
  //         unit: 0, // Initialize to 0 or the desired value
  //         unitPrice: selectedItem.price, // Initialize based on the selected item's price
  //         totalPrice: 0,
  //         tax: 0,
  //         totalTax: 0,
  //         netPayable: 0,
  //       };

  //       this.invoiceRows.push(newRow);
  //       this.selectedItems.push(newRow);
  //       this.calculateRowTotal(this.invoiceRows.length - 1);
  //     } else {
  //       console.error('Selected item not found.');
  //     }
  //   }
  // }

  removeRow(index: number) {
    this.invoiceRows.splice(index, 1);
  }



  saveInvoice() {
    const invoiceData = {
      invoiceDate: this.invoiceDate,
      invoiceTime: this.invoiceTime,
      invoiceNumber: this.invoiceNumber,
      customer: this.selectedCustomer,
      items: this.invoiceRows.map(row => {
        return {
          itemName: row.item,
          quantity: row.quantity,
          unitPrice: row.unitPrice,
          tax: row.tax,
          totalPrice: row.totalPrice,
          totalTax: this.calculateTotalTax(row),
          netPayable: this.calculateNetPayable(row)
        };
      })
    };

    console.log('Invoice Data before API call:', invoiceData);

    this.inswr.saveInvoice(invoiceData).subscribe(
      response => {
        console.log('Invoice saved successfully:', response);
        // Reset fields and arrays after successful submission
        this.selectedCustomer = null;
        this.invoiceRows = [];
        this.generateInvoiceNumber();
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Error saving invoice:', error);
      }
    );

    console.log('Invoice Data after API call:', invoiceData);
  }
  onItemChange(index: number) {
    const selectedItemId = this.invoiceRows[index].selectedItemId;
    const selectedItem = this.items.find(item => item.id === selectedItemId);

    if (selectedItem) {
      this.invoiceRows[index].item = selectedItem;
      this.invoiceRows[index].unitPrice = selectedItem.price;
      this.calculateRowTotal(index);
    }
  }



}





