import { Component } from '@angular/core';
import { OrderedelementsComponent } from './orderedelements/orderedelements.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [OrderedelementsComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

}
