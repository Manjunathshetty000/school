import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-tdashboard',
  templateUrl: './tdashboard.component.html',
  styleUrls: ['./tdashboard.component.css']
})
export class TdashboardComponent implements OnInit {
  show: boolean = false
  selected= false;

  obje:any
  showTable() {
    this.show = !this.show
  }
  constructor(private http: HttpClient,private services:AuthService,private route :Router ) { }
  showa: any
  getStudentDetails: any
  data:any
  ngOnInit(): void {
    this.getTableData();
  }

  getTableData(){
    this.http.get('http://localhost:3000/posts').subscribe((res) => { 
      this.data = res
      console.log(this.data);
    })
    this.http.get("http://localhost:3000/timeTable").subscribe((val) => {
      this.obje = val
    });

  }
  //edidForm validation
  edidForm = new FormGroup({
    userNameR: new FormControl(""),
    emailIdR: new FormControl(""),
    role: new FormControl(""),

  })
  viewStudent(std:any) {
    // console.log( std);
    // this.obje=Object.assign({},std)
    this.obje = std
  }
  cliks(val: any) {
    this.obje = val
  }

  updateProduct() {
    // close function
    let closeAuto = document.getElementById("close")
    closeAuto?.click()
    console.log(this.edidForm.value);
    this.services.editUpdate(this.obje).subscribe((val) => {
      console.log(val);
    })

  }


  submitTimetable = new FormGroup({
    firstrow1: new FormControl("", [Validators.required]),
    firstrow2: new FormControl("", [Validators.required]),
    firstrow3: new FormControl("", [Validators.required]),
    firstrow4: new FormControl("", [Validators.required]),

    secondRow1: new FormControl("", [Validators.required]),
    secondRow2: new FormControl("", [Validators.required]),
    secondRow3: new FormControl("", [Validators.required]),
    secondRow4: new FormControl("", [Validators.required]),

    thirdRow1: new FormControl("", [Validators.required]),
    thirdRow2: new FormControl("", [Validators.required]),
    thirdRow3: new FormControl("", [Validators.required]),
    thirdRow4: new FormControl("", [Validators.required]),

    fourthRow1: new FormControl("", [Validators.required]),
    fourthRow2: new FormControl("", [Validators.required]),
    fourthRow3: new FormControl("", [Validators.required]),
    fourthRow4: new FormControl("", [Validators.required])
  })
  
  // submit time table
  submit() { 
    this.services.postTimeTable(this.submitTimetable.value).subscribe((sub: any) => {
      console.log(sub);
    })
  }
  obj: any = { }
  logout(){
    this.route.navigate(["login"])
  }
  update(submitTimetable: any) {
    this.services.editTable(this.submitTimetable.value).subscribe((val:any) => {
      console.log(val);
      this.obj = val
    })
  }

  deleteDetail(id: any){
    console.log(id);
this.services.delete(id).subscribe((res)=>{
  console.log(res);
   
})
  }

  editDetail(){
    
  }
  selectedStudent(id:any){
    this.selected=!this.selected
    this.http.get(id).subscribe((res) => {
      console.log(res);
    });

   
    
  }

}