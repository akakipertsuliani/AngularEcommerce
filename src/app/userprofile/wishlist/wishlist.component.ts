import { Component } from '@angular/core';
import { UserprofileComponent } from '../userprofile.component';
import { WishlistelementComponent } from './wishlistelement/wishlistelement.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [WishlistelementComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {

}
