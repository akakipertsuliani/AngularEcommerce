import { Observable } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-homepage',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
    product$: Observable<Product[]>;

    constructor(private firestore: Firestore) {
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
