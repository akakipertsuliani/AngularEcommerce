import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-wishlistelement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlistelement.component.html',
  styleUrl: './wishlistelement.component.scss'
})
export class WishlistelementComponent {
  product$: Observable<Product[]>;
  userEmail: string = localStorage.getItem('email')!;

  constructor(private firestore: Firestore) {
    const productCollection = collection(this.firestore, 'userWishList');
    this.product$ = collectionData(productCollection).pipe(
        map((documents: any[]) => documents.map(doc => doc as Product)),
        map((products: Product[]) => products.filter(product => product.email === this.userEmail))
    ) as Observable<Product[]>;
}
}

export interface Product {
  email: string;
  addDate: string;
  productImage: string;
  productName: string;
  productPrice: string;
}
