import { Component } from '@angular/core';
import { ProductService } from '../../service/products.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../../interface/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  categories:string[] = []
  products:Product[] = []

  constructor(private productService:ProductService) {}

  
  ngOnInit(): void {
    this.productService.getAllCategories().subscribe({
      next:(response)=>{
        this.categories = response
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }


  getProducts(category:string){
    this.productService.getProductsByCategory(category).subscribe({
      next:(response)=>{
        this.products = response
        console.log(response);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

}
