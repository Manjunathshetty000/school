import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sdashboard',
  templateUrl: './sdashboard.component.html',
  styleUrls: ['./sdashboard.component.css']
})
export class SdashboardComponent implements OnInit {

  data:any

  constructor(private route :Router,private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>(`http://localhost:3000/profile`).subscribe((val:any)=>{
      this.data=val
      console.log(this.data);
      console.log("----------------------");
      
    })
   
  

  }
  
  logOut(){
    this.route.navigate(["login"])
  }
  

}
