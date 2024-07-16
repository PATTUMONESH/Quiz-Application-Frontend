import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {


private baseURL="http://localhost:8080";
  constructor(private httpClient:HttpClient) { }



getQuestionJson(){
  return this.httpClient.get<any>("assets/questions.json")

}

createUser(dataFromRegisterForm:any){
  console.log(dataFromRegisterForm);
 const headers = new HttpHeaders({
    'Content-Type':'application/json'
  })
  const options={headers:headers}
  return this.httpClient.post("http://localhost:8080/RegisterUsers",dataFromRegisterForm,options)
}



loginUserData(dataFromLoginForm:any){
  console.log(dataFromLoginForm);

const headers = new HttpHeaders({
    'Content-Type':'application/json'
  })
  const options2={headers:headers}

return this.httpClient.post("http://localhost:8080/Login",dataFromLoginForm,options2)

}



submitUserScore(scoreData:any){

const userId=localStorage.getItem('userIdFromBackEnd');


// const userFirstName=localStorage.getItem('userfNameFromBackend');
// const userLastName=localStorage.getItem('userlNameFromBackend');

console.log(userId);
// console.log(userFirstName);
// console.log(userLastName);

const body={
"score":scoreData,


    // "firstName":userFirstName,
    // "lastName":userLastName
}

  console.log(scoreData);


  const headers = new HttpHeaders({
    'Content-Type':'application/json'
  })


  const options3={headers:headers}
  return this.httpClient.post(`http://localhost:8080/userscore/${userId}`,body,options3);



}





}
