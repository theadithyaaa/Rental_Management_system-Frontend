import { Component, NgModule, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FormsModule,CommonModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomersComponent implements OnInit {

  customers: any[] = [];
  customer = {
    customerId: '',
    name: '',
    contact: '',
    city: ''
  };

  customerInfo = {
    customerId: '',
    name: '',
    contact: '',
    city: ''
  };

  updatedCustomerInfo = {
    name: '',
    contact: '',
    city: ''
  };

  id: string = ''; 
  loading: boolean = false; 

  

  async addCustomer() {
    try {
      let response = await fetch("http://localhost:8080/customer/add-customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "customerId": this.customer.customerId,
          "name": this.customer.name,
          "contact": this.customer.contact,
          "city": this.customer.city
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to add customer');
      }
  
      alert('Customer added successfully');
      this.clearFields();
      let body = await response.json();
      alert(JSON.stringify(body));
      return body;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async searchCustomerById(id: string) {
    try {
      this.loading = true;
      const response = await fetch(`http://localhost:8080/customer/search-by-id/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch customer');
      }

      const customer = await response.json();
      console.log(customer); 
      this.customerInfo = customer;

      this.updatedCustomerInfo = {
        name: customer.name,
        contact: customer.contact,
        city: customer.city
      };

    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching the customer.');
    } finally {
      this.loading = false;
    }
  }

  async updateCustomer() {
    try {
      const response = await fetch('http://localhost:8080/customer/update-customer', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: this.customerInfo.customerId,
          name: this.updatedCustomerInfo.name,
          contact: this.updatedCustomerInfo.contact,
          city: this.updatedCustomerInfo.city
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update customer');
      }

      alert('Customer updated successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating the customer.');
    }
  }

  async deleteCustomer() {
    try {
      const response = await fetch(`http://localhost:8080/customer/delete-by-id/${this.customerInfo.customerId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to delete customer');
      }

      alert('Customer deleted successfully');
      this.clearFields();
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while deleting the customer.');
    }
  }
  
  clearFields() {
    this.customer = {
      customerId: "",
      name: "",
      contact: "",
      city: ""
    };

    this.customerInfo = {
      customerId: '',
      name: '',
      contact: '',
      city: ''
    };

    this.updatedCustomerInfo = {
      name: '',
      contact: '',
      city: ''
    };

    this.id = '';
  }

  ngOnInit() {
    this.getAllCustomers();
  }

  async getAllCustomers() {
    try {
      this.loading = true;
      const response = await fetch('http://localhost:8080/customer/get-all', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }

      const customers = await response.json();
      console.log(customers); 
      this.customers = customers;
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching customers.');
    } finally {
      this.loading = false;
    }
  }
  }

 
  

