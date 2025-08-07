import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent   {

   role=localStorage.getItem("role")

  constructor(private router:Router){}
   
  logout(){
    console.log("logout clicked")
    localStorage.clear()
    this.router.navigate(["/login"])
  }
  home(){
    this.router.navigate(['/home']);
  }
}
