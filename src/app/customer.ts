export interface Customer {
    id: number;
    name: string;
    email: string;
    password: string;
  }

  export interface Item {
    quantity: any;
    id: number;
    prodName: string;
    
    price: number;
    
  }
  export interface InvoiceItemEntity {
    id: number;
    itemName: string;
    quantity: number;
    unitPrice: number;
    tax: number;
    totalPrice: number;
    totalTax: number; 
    netPayable: number;
  }

  export interface InvoiceEntity {
    id: number;
    invoiceDate: string;
    invoiceTime: string;
    invoiceNumber: string;
    customer: string;
    items: InvoiceItemEntity[];
  }
  
    
