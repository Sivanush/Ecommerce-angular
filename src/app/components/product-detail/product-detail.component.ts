import { Component, SimpleChanges } from '@angular/core';
import { Product } from '../../../interface/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/products.service';
import { CartService } from '../../service/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {

  product!: Product
  productId: string = ''
  isProductInCart: boolean = false;
  Math = Math
  isLoading:boolean  = false

  constructor(
    private router: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {

  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.isLoading = true
      const newProductId = params.get('productId') as string
      if (newProductId !== this.productId) {
        this.productId = newProductId
        this.fetchProductDetail()
      }
    })
  }


  fetchProductDetail() {
    if (this.productId) {
      this.productService.getProductDetailById(this.productId).subscribe({
        next: (response) => {
          this.product = response
          this.checkIfProductInCart();
          this.isLoading = false
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
