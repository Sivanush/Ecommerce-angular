import { Injectable } from '@angular/core';
import { Product } from '../../interface/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {
    this.updateCartCount()
  }

  private cartCount = new BehaviorSubject<number>(10)
  cartCountValue = this.cartCount.asObservable()

  addProductToCart(product: Product) {
    let existCart = this.getCart()

    let isProductInCart = existCart.some(item => item.id === product.id)

    if (isProductInCart) {
      console.log('Product is already in the cart');
      return false
    }


    existCart.push(product)
    localStorage.setItem('products', JSON.stringify(existCart))
    this.updateCartCount();
    return true
  }

  getCart(): Product[] {
    let cart = localStorage.getItem('products')
    return cart ? JSON.parse(cart) : []
  }

  getCartLength(): number {
    return this.getCart().length
  }

  private updateCartCount() {
    this.cartCount.next(this.getCartLength());
  }

  removeProductFromCart(index: number) {

    let existCart = this.getCart()
    console.log(existCart);

    existCart.splice(index, 1)

    localStorage.setItem('products', JSON.stringify(existCart))
    this.updateCartCount();
    return true
  }

  clearCart() {
    localStorage.removeItem('products')
  }
}
