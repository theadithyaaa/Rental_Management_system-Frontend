import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rentals',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FormsModule, CommonModule],
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentals: any[] = [];
  rental = {
    rentId: '',
    rentalDate: '',
    returnDate: '',
    dueDate: '',
    fine: 0,
    totalcost: 0
  };

  rentalInfo = {
    rentId: '',
    rentalDate: '',
    returnDate: '',
    dueDate: '',
    fine: 0,
    totalcost: 0
  };

  updatedRentalInfo = {
    rentalDate: '',
    returnDate: '',
    dueDate: '',
    fine: 0,
    totalcost: 0
  };

  id: string = ''; 
  loading: boolean = false;

  async addRental() {
    try {
      let response = await fetch("http://localhost:8080/rental/add-rental", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.rental)
      });

      if (!response.ok) {
        throw new Error('Failed to add rental');
      }

      alert('Rental added successfully');
      this.clearFields();
      let body = await response.json();
      alert(JSON.stringify(body));
      return body;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async searchRentalById(id: string) {
    try {
      this.loading = true;
      const response = await fetch(`http://localhost:8080/rental/search-by-id/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch rental');
      }

      const rental = await response.json();
      this.rentalInfo = rental;

      this.updatedRentalInfo = {
        rentalDate: rental.rentalDate,
        returnDate: rental.returnDate,
        dueDate: rental.dueDate,
        fine: rental.fine,
        totalcost: rental.totalcost
      };

    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching the rental.');
    } finally {
      this.loading = false;
    }
  }

  async updateRental() {
    try {
      const response = await fetch('http://localhost:8080/rental/update-rental', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rentId: this.rentalInfo.rentId,
          ...this.updatedRentalInfo
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update rental');
      }

      alert('Rental updated successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating the rental.');
    }
  }

  async deleteRental() {
    try {
      const response = await fetch(`http://localhost:8080/rental/delete-by-id/${this.rentalInfo.rentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to delete rental');
      }

      alert('Rental deleted successfully');
      this.clearFields();
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while deleting the rental.');
    }
  }

  clearFields() {
    this.rental = {
      rentId: "",
      rentalDate: "",
      returnDate: "",
      dueDate: "",
      fine: 0,
      totalcost: 0
    };

    this.rentalInfo = { ...this.rental };
    this.updatedRentalInfo = { ...this.rental };
    this.id = '';
  }

  ngOnInit() {
    this.getAllRentals();
  }

  async getAllRentals() {
    try {
      this.loading = true;
      const response = await fetch('http://localhost:8080/rental/get-all', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch rentals');
      }

      const rentals = await response.json();
      this.rentals = rentals;
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching rentals.');
    } finally {
      this.loading = false;
    }
  }
}
