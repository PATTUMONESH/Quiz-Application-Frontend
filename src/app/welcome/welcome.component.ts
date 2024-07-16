import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {



// @ViewChild('name') nameKey!:ElementRef;


  ngOnInit(): void {

  }

//   onStartQuiz(){
// localStorage.setItem("name",this.nameKey.nativeElement.value);
//   }




}
