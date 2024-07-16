import { QuestionService } from './../service/question.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',

})
export class LoginComponent implements OnInit {

  constructor(private route:Router,private formBuilder:FormBuilder,private questionService:QuestionService) {

}

loginForm =this.formBuilder.group({

  email:[''],
  password:['']
})




onLogin() {

  const loginData={
    "email":this.loginForm.value.email,
    "password":this.loginForm.value.password
  }

 this.questionService.loginUserData(loginData).subscribe((val:any)=>{
  console.log(val);

  localStorage.setItem("userIdFromBackEnd",val.id);



  localStorage.setItem("userfNameFromBackend",val.firstName);
  localStorage.setItem("userlNameFromBackend",val.lastName)

 this.route.navigate(['/welcome'])
     console.log(this.loginForm.value);

},
 error => {
   console.error('Error:', error);
   console.log(error.status);

}
)

}

  // loginForm=this.formBuilder.group({
  //   email:[''],
  //   password:['']

  // })


  @ViewChild('name') nameKey!:ElementRef;
  ngOnInit(): void {

  }



  // signIn(){
  //   this.route.navigate(['/welcome']);


  // }


  onStartQuiz(){
    localStorage.setItem("name",this.nameKey.nativeElement.value);
      }





}
