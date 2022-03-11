import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // registrationForm!: FormGroup
  constructor(private serveHttp: AuthService ,private route:Router) { }
  getStudent: any
  getTeacher: any
  ngOnInit(): void {
     //get student 
     this.serveHttp.getData().subscribe((val) => {
      this.getStudent = val
      console.log("student values", this.getStudent);
    })
    //get teacher
    this.serveHttp.getDataTeacher().subscribe((teachValue) => {
      this.getTeacher = teachValue
      console.log("teacher values", this.getTeacher);
    }) 
  }

   registrationForm = new FormGroup({
      userNameR: new FormControl("", [Validators.required]),
      emailIdR: new FormControl("", [Validators.required]),
      passwordR: new FormControl("", [Validators.required]),
      role: new FormControl("",)
    })



  get userNameR() {
    return this.registrationForm.get("userNameR")
  }
  get emailIdR() {
    return this.registrationForm.get("emailIdR")
  }
  get passwordR() {
    return this.registrationForm.get("passwordR")
  }
  get role() {
    return this.registrationForm.get("role")
  }
  rolesStudent = "student"
  rolesTeacher = "teacher"

  submitregistration() {

    console.log(this.registrationForm.value);

    if (this.registrationForm.value.role === this.rolesStudent && this.registrationForm.valid) {
      this.serveHttp.passData(this.registrationForm.value).subscribe(() => {
        this.registrationForm.reset()
        alert("student register  is success")
      })
    } else if (this.registrationForm.value.role === this.rolesTeacher && this.registrationForm.valid) {
      this.serveHttp.passDataTeacher(this.registrationForm.value).subscribe(() => {
        this.registrationForm.reset()
        alert("Teacher register  is success")
        this.route.navigate(['login'])
      })

    }
  }
}

