import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
// import { StudentService } from '../student.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private serveHttp: AuthService, private route: Router) { }
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


  // login form
  loginForm = new FormGroup({
    emailId: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    teacher: new FormControl("", [Validators.required]),
    role: new FormControl("")
  })
  get emailId() {
    return this.loginForm.get("emailId")
  }
  get password() {
    return this.loginForm.get("password")
  }
  //login function 
  submitLogin() {
    // student part  
    let loginValue = this.loginForm.value
    let isLoginValid = this.getStudent.find((user:any) => {
      return user.emailId === loginValue.emailIdR  && user.password === loginValue.passwordR 
    })
    // console.log(" getting valid teacher", isLoginValid);

    // teacher part 
    let isvalids = this.getTeacher.find((usersTeacher:any) => {
      return usersTeacher.emailId === loginValue.emailIdR && usersTeacher.password === loginValue.passwordR 
    })
    console.log("getting teacher", isvalids);

console.log(this.loginForm.value.role );
    //comparing login 
    if(isvalids && this.loginForm.value.role == "teacher"){
      this.route.navigate(["tdashboard"]) 
      alert("valid teacher"+this.emailIdR?.value)
      
      
    }
    else if (isLoginValid &&  loginValue.role == "student") {
      this.route.navigate(["sdashboard"])
      alert("valid student")
    }
    else {
      alert(" Enter valid EmailId and password") 
    }  
  }



  // registration form
  registrationForm = new FormGroup({
    userNameR: new FormControl("",[Validators.required]),
    emailIdR: new FormControl("",[Validators.required]),
    passwordR: new FormControl("",[Validators.required]),
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
  

// registration function 
  submitregistration() {
    
      if (this.registrationForm.value.role === this.rolesStudent&&this.registrationForm.valid) {
      this.serveHttp.passData(this.registrationForm.value).subscribe(() => {
        this.registrationForm.reset()
        alert("Student Registered sucessfully")
      })
    } else if (this.registrationForm.value.role === this.rolesTeacher&&this.registrationForm.valid) {
      this.serveHttp.passDataTeacher(this.registrationForm.value).subscribe(() => {
        this.registrationForm.reset()
        alert(" Teacher Registered sucessfully")
      })
    }
  //   else  if(this.registrationForm.value.role === this.rolesStudent && this.registrationForm.value.role === this.rolesTeacher &&this.registrationForm.invalid){
  //     alert("please fill the required ")
  //  } 
    else if(this.registrationForm.invalid) {
      alert("only student and teachers please fill the required")
    } else   {
      alert("only student and teachers")
    }
  }

}
