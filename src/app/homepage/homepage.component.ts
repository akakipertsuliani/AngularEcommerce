import { Observable, map } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { AuthService } from '../servise/auth.service';
import { Router } from '@angular/router';
import { Product } from '../interface/interface';

@Component({
    selector: 'app-homepage',
    standalone: true,
    imports: [CommonModule, HeaderComponent],
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
    product$: Observable<Product[]>;

    constructor(private firestore: Firestore, private auth: AuthService, private route: Router) {
        const productCollection = collection(this.firestore, 'clothesdata');
        this.product$ = collectionData(productCollection).pipe(
            map((documents: any[]) => documents.map(doc => doc as Product)),
            map((products: Product[]) => products.filter(product => product.best === true))
        ) as Observable<Product[]>;

        this.auth.isUserAuth().subscribe(data => {
            if (data) {
                this.route.navigate(["/product"]);   
            } else {
                this.route.navigate(["/"]);  
            }
        })
    }
}