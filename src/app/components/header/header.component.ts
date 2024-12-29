import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ProductService } from '../../service/products.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounce, debounceTime, Subject } from 'rxjs';
import { Product } from '../../../interface/product';
import { RouterLink } from '@angular/router';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @ViewChild('inputElement') inputElement!: ElementRef;
  filteredSuggestions!:Product[]
  searchText!:string
  products!:Product[]
  searchSubject = new Subject()
  cartCount!:number 

  constructor(
    private productService:ProductService,
    private cartService:CartService
  ) {}

  ngOnInit(): void {
    console.log('waiting...');

    this.cartService.cartCountValue.subscribe(response=>{
      this.cartCount = response
    })

    this.productService.getAllProducts().subscribe({      
      next:(response)=>{        
        this.products = response
      },
      error:(error)=>{
        console.log(error);
      }
    })

    this.searchSubject.pipe(debounceTime(300)).subscribe((searchText)=>{
      this.filterSuggestions(searchText as string)
    })
  }

  filterSuggestions(searchText:string){
    this.filteredSuggestions = this.products.filter((prod)=>{
      return prod.title.toLowerCase().includes(searchText.toLowerCase())
    }).slice(0,5)
  }

  selectSuggestion(suggestion:Product){
    this.searchText = suggestion.title;
    this.filteredSuggestions = [];
  }

  onSearchTextChange(searchText:string){
    this.searchSubject.next(searchText)
  }

  @HostListener('document:click',['$event'])
  handleOutsideClick(event:Event){
    const targetElement = event.target as HTMLElement;

    if (this.inputElement && !this.inputElement.nativeElement.contains(targetElement) && !targetElement.closest('.suggestion-box')) {
      this.searchText = ''
      this.filteredSuggestions = []
    }
  }
}
