import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {
  itemForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.itemForm = this.fb.group({
      itemName: ['', Validators.required],
      itemPrice: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    });
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      const newItem = {
        prodName: this.itemForm.value.itemName,
        price: this.itemForm.value.itemPrice,
      };

      // Send the newItem data to your backend
      this.http.post<any>('http://localhost:8080/itemhome/api', newItem).subscribe(
        (response) => {
          console.log('Item added:', response);
          // Reset the form after successful submission
          this.itemForm.reset();
        },
        (error) => {
          console.error('Error adding item:', error);
        }
      );
    }
  }

}
