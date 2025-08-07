import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { RouterLink, RouterOutlet } from "@angular/router";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, RouterOutlet, FooterComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
