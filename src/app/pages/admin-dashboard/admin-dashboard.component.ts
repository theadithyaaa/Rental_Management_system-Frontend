import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomersComponent } from '../customers/customers.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}