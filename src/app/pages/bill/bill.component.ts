import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bill',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent {
  customerId: string = ''; 
  customerRentals: any[] = []; 
  customerBill: any = null; 
  calculateBill(rentals: any[]): number {
    let totalBill = 0;

    rentals.forEach(rental => {
      const rentalPeriod = (new Date(rental.endDate).getTime() - new Date(rental.startDate).getTime()) / (1000 * 3600 * 24); // Calculate rental period in days
      const rentalCharge = rentalPeriod * rental.dailyRate; 
      totalBill += rentalCharge;
    });

    return totalBill;
  }

  async getCustomerBill(customerId: string) {
    try {
      if (!customerId.trim()) {
        alert('Customer ID is required');
        return;
      }

      const response = await fetch(`http://localhost:8080/rentals/customer/${customerId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch rental data');
      }

      const rentals = await response.json();
      this.customerRentals = rentals; 

      const totalBill = this.calculateBill(rentals);

      
      const discount = 0.1;
      const totalAfterDiscount = totalBill * (1 - discount);

      this.customerBill = {
        rentals: rentals,
        totalBill: totalBill,
        discount: discount,
        totalAfterDiscount: totalAfterDiscount
      };

    } catch (error) {
      console.error('Error fetching rentals or generating bill:', error);
      alert('An error occurred while fetching rentals or generating the bill.');
    }
  }
}
