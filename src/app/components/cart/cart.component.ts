import { Component } from '@angular/core';
import { Product } from '../../../interface/product';
import { CommonModule } from '@angular/common';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  cartItems!: Product[]
  subtotal: number = 0
  shipping: number = 0

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartItem()
  }


  getCartItem(){
    this.subtotal = 0
    this.shipping = 0
    this.cartItems = this.cartService.getCart()
    this.cartItems.forEach((val) => {
      this.subtotal += val.price
      this.shipping += 10
    })
  }

  removeFromCart(index: number) {
    this.cartService.removeProductFromCart(index)
    this.getCartItem()
  }


  clearCart(): void {
    this.cartService.clearCart();
    this.getCartItem();
  }

  proceedToCheckout() {
    console.log('proceeding...');
    
  }

}
