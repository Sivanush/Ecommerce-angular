import { Component } from '@angular/core';
import { ProductService } from '../../service/products.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../../interface/product';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  categories:string[] = []
  products:Product[] = []
  isLoading:boolean = false

  constructor(private productService:ProductService) {}

  
  ngOnInit(): void {
    this.isLoading = true
    this.productService.getAllCategories().subscribe({
      next:(response)=>{
        this.categories = response
        this.getProducts(this.categories[0])
      },
      error:(error)=>{
        console.log(error);
      }
    })

  }


  getProducts(category:string){
    this.isLoading = true
    this.productService.getProductsByCategory(category).subscribe({
      next:(response)=>{
        this.products = response
        this.isLoading = false
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

}
