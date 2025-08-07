import { Component, OnInit } from '@angular/core';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
interface Data{
  email:string,
  role:string,
  name:string
}

@Component({
  selector: 'app-profile',
  imports: [UserDetailsComponent,HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  constructor(private http:HttpClient){}
  name=""
  email=""
  role=""
  ngOnInit()  {
    console.log("kiii")
      this.http.get<Data>(`/api/auth/profile/${localStorage.getItem("id")}`)
      .subscribe({
        next:(data)=>{
          console.log(data.email);
          this.name= data.name,
          this.email=data.email,
          this.role=data.role
        }
      })
   }
    

  

}
