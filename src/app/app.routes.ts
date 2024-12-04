import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { ItemsComponent } from './pages/items/items.component';
import { RentalComponent } from './pages/rental/rental.component';
import { CustomerDashboardComponent } from './pages/customer-dashboard/customer-dashboard.component';
import { BillComponent } from './pages/bill/bill.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'adminDashboard',
        component: AdminDashboardComponent
    },
    {
        path: 'customers',
        component: CustomersComponent
    },
    {
        path: 'items',
        component: ItemsComponent
    },
    {
        path: 'rental',
        component: RentalComponent
    },
    {
        path: 'customerDashboard',
        component: CustomerDashboardComponent
    },
    {
        path: 'bill',
        component: BillComponent
    }
];
