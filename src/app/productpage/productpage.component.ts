import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckbox } from '@angular/material/checkbox';
import { Product } from '../interface/interface';

@Component({
  selector: 'app-productpage',
  standalone: true,
  imports: [CommonModule, MatSliderModule, MatCheckbox],
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.scss']
})
export class ProductpageComponent {
  product$!: Observable<Product[]>;
  productMaxCost!: number;
  productCollection: any;
  categories: string[] = ["Perfume", "Trousers", "Shoe", "Handbag", "T-shirt", "Thermos"];
  selectedCategories: string[] = [];
  range: number[] = [0, 1000, 1000];
  pages: number[] = [1];

  constructor(private firestore: Firestore) {
    this.productCollection = collection(this.firestore, 'clothesdata');
    this.loadProducts();
  }

  private loadProducts(): void {
    this.product$ = collectionData(this.productCollection).pipe(
      map((documents: any[]) => documents.map(doc => doc as Product)),
      map((products: Product[]) => {
        this.productMaxCost = products.reduce((max, product) => product.price > max ? product.price : max, 0);
        this.range[2] = this.productMaxCost;
        return products;
      })
    );
  }

  private filterProducts(): void {
    this.product$ = collectionData(this.productCollection).pipe(
      map((documents: any[]) => documents.map(doc => doc as Product)),
      map((products: Product[]) => {
        const storedCategories = localStorage.getItem('categories');
        const selectedCategories = storedCategories ? JSON.parse(storedCategories) : [];

        return products.filter(product => {
          const matchesCategory = selectedCategories.length > 0 ? selectedCategories.includes(product.categories) : true;
          const matchesPrice = product.price >= this.range[0] && product.price <= this.range[1];
          return matchesCategory && matchesPrice;
        });
      })
    );
  }

  getCategories(event: any): void {
    const category = event.source.value;
    if (event.checked) {
      this.selectedCategories.push(category);
    } else {
      const index = this.selectedCategories.indexOf(category);
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
    localStorage.setItem('categories', JSON.stringify(this.selectedCategories));
    this.filterProducts();
  }

  goToPage(page: number): void {}

  minValue(event: any): void {
    this.range[0] = event.target.value;
    this.filterProducts();
  }

  maxValue(event: any): void {
    this.range[1] = event.target.value;
    this.filterProducts();
  }

  formatLabel(value: number): string {
    return value >= 0 ? Math.round(value) + '$' : `${value}`;
  }
}
