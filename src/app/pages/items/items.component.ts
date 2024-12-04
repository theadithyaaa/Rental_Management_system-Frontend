import { Component } from '@angular/core';
import { NavbarComponent } from "../../common/navbar/navbar.component";

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {

}
