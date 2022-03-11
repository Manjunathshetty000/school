import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  postTimeTable: any;
  // editTable: any;

  constructor(private http :HttpClient,private route :Router) { }
// pass student 
  passData(val: any){
    return this.http.post('http://localhost:3000/posts',val)
  }
  // get student
  getData(){
    return this.http.get('http://localhost:3000/posts')
  }

  
// pass Teacher
  passDataTeacher(val: any){
    return this.http.post('http://localhost:3000/comments',val)
  }
  //get Teacher
  getDataTeacher(){
  return this.http.get(`http://localhost:3000/comments`)
  }

  editUpdate(std:any){
    return this.http.put('http://localhost:3000/posts/',std.id )
  }

  editTable(value:any){
    return this.http.post('http://localhost:3000/profile',value)
  }



  //delete student  data
  
  delete(id: any){
    return this.http.delete(`http://localhost:3000/posts/${id}`)
  }
 
}
