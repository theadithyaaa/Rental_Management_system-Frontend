import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FormsModule, CommonModule],
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: any[] = [];
  item = {
    itemId: '',
    name: '',
    availability: false,
    rental_perday: 0,
    fine_perday: 0
  };

  itemInfo = {
    itemId: '',
    name: '',
    availability: false,
    rental_perday: 0,
    fine_perday: 0
  };

  updatedItemInfo = {
    name: '',
    availability: false,
    rental_perday: 0,
    fine_perday: 0
  };

  id: string = ''; 
  loading: boolean = false;

  async addItem() {
    try {
      let response = await fetch("http://localhost:8080/item/add-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "itemId": this.item.itemId,
          "name": this.item.name,
          "availability": this.item.availability,
          "rental_perday": this.item.rental_perday,
          "fine_perday": this.item.fine_perday
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add item');
      }

      alert('Item added successfully');
      this.clearFields();
      let body = await response.json();
      alert(JSON.stringify(body));
      return body;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async searchItemById(id: string) {
    try {
      this.loading = true;
      const response = await fetch(`http://localhost:8080/item/search-by-id/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch item');
      }

      const item = await response.json();
      console.log(item); 
      this.itemInfo = item;

      this.updatedItemInfo = {
        name: item.name,
        availability: item.availability,
        rental_perday: item.rental_perday,
        fine_perday: item.fine_perday
      };

    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching the item.');
    } finally {
      this.loading = false;
    }
  }

  async updateItem() {
    try {
      const response = await fetch('http://localhost:8080/item/update-item', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId: this.itemInfo.itemId,
          name: this.updatedItemInfo.name,
          availability: this.updatedItemInfo.availability,
          rental_perday: this.updatedItemInfo.rental_perday,
          fine_perday: this.updatedItemInfo.fine_perday
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update item');
      }

      alert('Item updated successfully');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating the item.');
    }
  }

  async deleteItem() {
    try {
      const response = await fetch(`http://localhost:8080/item/delete-by-id/${this.itemInfo.itemId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      alert('Item deleted successfully');
      this.clearFields();
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while deleting the item.');
    }
  }

  clearFields() {
    this.item = {
      itemId: "",
      name: "",
      availability: false,
      rental_perday: 0,
      fine_perday: 0
    };

    this.itemInfo = {
      itemId: '',
      name: '',
      availability: false,
      rental_perday: 0,
      fine_perday: 0
    };

    this.updatedItemInfo = {
      name: '',
      availability: false,
      rental_perday: 0,
      fine_perday: 0
    };

    this.id = '';
  }

  ngOnInit() {
    this.getAllItems();
  }

  async getAllItems() {
    try {
      this.loading = true;
      const response = await fetch('http://localhost:8080/item/get-all', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }

      const items = await response.json();
      console.log(items); 
      this.items = items;
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching items.');
    } finally {
      this.loading = false;
    }
  }
}
