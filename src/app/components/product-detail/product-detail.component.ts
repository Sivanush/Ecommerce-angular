import { Component } from '@angular/core';
import { Product } from '../../../interface/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/products.service';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {

  product!: Product
  productId: string = ''
  isProductInCart: boolean = false;
  Math = Math

  constructor(
    private router: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {

  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.productId = params.get('productId') as string
    })

    if (this.productId) {
      this.productService.getProductDetailById(this.productId).subscribe({
        next: (response) => {
          this.product = response
          this.checkIfProductInCart();
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }


  checkIfProductInCart() {
    const existCart = this.cartService.getCart();
    this.isProductInCart = existCart.some(item => item.id === this.product.id);
  }

  addToCart() {
    const productAdded = this.cartService.addProductToCart(this.product);
    if (productAdded) {
      this.isProductInCart = true;
    }
  }
}
