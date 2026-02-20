import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../../services/shop/products-management/products-management.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-product',
  imports: [FormsModule],
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.css'
})
export class FormProductComponent {
  @Input() product!: Product;
  @Input() categories: any[] = [];
  @Input() edit: any;
  @Output() editSubmit = new EventEmitter<Product>();
  @Output() addSubmit = new EventEmitter<Product>();

  constructor(){
    console.log("Edition : "+this.edit);
  }

  formData: Product = {
    name: '',
    price: 0,
    category_product: ''
  };

  ngOnInit(): void {
    if (this.product) {
      this.formData = { ...this.product };

      if (typeof this.product.category_product === 'object') {
        this.formData.category_product = this.product.category_product?._id;
      }
    }
  }

  submit() {
    if(this.edit){
      this.editSubmit.emit(this.formData);
    }else{
      this.addSubmit.emit(this.formData);
    }
  }
}
