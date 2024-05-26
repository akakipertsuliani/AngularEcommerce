import { Observable } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Component, inject } from '@angular/core';
import { CommonModule,  } from '@angular/common';

@Component({
    selector: 'app-homepage',
    standalone: true,
    imports: [
        CommonModule
    ],
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
    private firestore: Firestore = inject(Firestore);
    product$: Observable<Product[]>;

    constructor() {
        const productCollection = collection(this.firestore, 'clothesdata');

        this.product$ = collectionData(productCollection) as Observable<Product[]>;
    }

}

export interface Product {
    id: string;
    name: string;
    inStock: number;
    path: string;
    price: string;
}