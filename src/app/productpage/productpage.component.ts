import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckbox } from '@angular/material/checkbox';
import { Product } from '../interface/interface'
import { AuthService } from '../servise/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productpage',
  standalone: true,
  imports: [CommonModule, MatSliderModule, MatCheckbox],
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.scss']
})

export class ProductpageComponent {
  product$: Observable<Product[]>;
  productMaxCost!: number;
  productCollection: any;
  range: number[] = [0, 1000, 1000];
  
  constructor(private firestore: Firestore, private auth: AuthService, private route: Router) {
    this.auth.isUserAuth().subscribe(data => {
      if (data) {
          this.route.navigate(["/product"]);   
      } else {
          this.route.navigate(["/"]);  
      }
    })

    this.productCollection = collection(this.firestore, 'clothesdata');
    this.product$ = collectionData(this.productCollection).pipe(
      map((documents: any[]) => documents.map(doc => doc as Product)),
      map((products: Product[]) => products.filter(product => product.id > 0)),
      map((products: Product[]) => {
        this.productMaxCost = products.reduce((max, product) => product.price > max ? product.price : max, 0);
        this.range[2] = this.productMaxCost;
        return products;
      }),
    );
  }

  pages: number[] = [1];

  goToPage(page: number): void {}

  minValue(event: any): void {
    this.range[0] = event.target.value;
    this.product$ = collectionData(this.productCollection).pipe(
      map((documents: any[]) => documents.map(doc => doc as Product)),
      map((products: Product[]) => products.filter(product => product.price >= this.range[0] && product.price <= this.range[1])),
    )
  }

  maxValue(event: any): void {
    this.range[1] = event.target.value;
    this.product$ = collectionData(this.productCollection).pipe(
      map((documents: any[]) => documents.map(doc => doc as Product)),
      map((products: Product[]) => products.filter(product => product.price >= this.range[0] && product.price <= this.range[1])),
    )
  }

  formatLabel(value: number): string {
    if (value >= 0) {
      return Math.round(value) + '$';
    }
    return `${value}`;
  }
}
