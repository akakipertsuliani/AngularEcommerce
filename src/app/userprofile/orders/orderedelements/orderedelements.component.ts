import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-orderedelements',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './orderedelements.component.html',
    styleUrl: './orderedelements.component.scss',
})
export class OrderedelementsComponent {
    product$: Observable<Product[]>;
    userEmail: string = localStorage.getItem('email')!;

    constructor(private firestore: Firestore) {
        const productCollection = collection(this.firestore, 'userShopList');
        this.product$ = collectionData(productCollection).pipe(
            map((documents: any[]) => documents.map(doc => doc as Product)),
            map((products: Product[]) => products.filter(product => product.email === this.userEmail))
        ) as Observable<Product[]>;
    }
}

export interface Product {
    email: string;
    orderDate: string;
    orderState: string;
    productImage: string;
    productName: string;
    productPrice: string;
}
