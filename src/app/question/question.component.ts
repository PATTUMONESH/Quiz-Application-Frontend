import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../service/question.service';
import { data } from '../../assets/questions';
import { data2 } from '../../assets/questions2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
onLogout() {



 localStorage.clear();

this.route.navigate(['/login']);


}
  public userName: string = '';
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  unAttemptedQuestion: number = 0;
  AttemptedQuestions:number=0;
  interval$: any;
  progress: string = '0';
  isQuizCompleted: boolean = false;
  isOptionSelected: boolean = false;


  constructor(private questionService: QuestionService,private route:Router) {}

  ngOnInit(): void {
    const listArr = [data.questions, data2.questions];
    const randomNumber = Math.floor(Math.random() * listArr.length);
    console.log(randomNumber);

    this.userName = localStorage.getItem('name')!;
    // this.getAllQuestions();
    this.startCounter();
    this.questionList = listArr[randomNumber];
    // if(randomNumber===0){
    // this.questionList = data.questions;
    // }else if(randomNumber===1){
    //   this.questionList = data2.questions;
    // }
  }
  // getAllQuestions() {
  //   this.questionService.getQuestionJson()
  //     .subscribe(res => {
  //       this.questionList = res.questions;
  //     })
  // }

  nextQuestion() {
    this.isOptionSelected = false;
    this.currentQuestion++;
    this.resetCounter();
    this.getProgressPercent();
  }

  previousQuestion() {
    this.currentQuestion--;
  }
  answer(currentQno: number, option: any) {
    // this.onSelectedOption();
    // if (!this.isOptionSelected) {
    //   this.unAttemptedQuestion++;
    // }

    this.isOptionSelected = true;

    if (currentQno === this.questionList.length) {
      // this.isQuizCompleted = true;
      // this.stopCounter();
    }

    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;

      // setTimeout(() => {
      //   this.currentQuestion++;
      //   this.resetCounter();
      //   this.getProgressPercent();
      // }, 1000);
    } else {
      // setTimeout(() => {
      //   this.currentQuestion++;
      this.inCorrectAnswer++;
      //   this.resetCounter();
      //   this.getProgressPercent();
      // }, 1000);

      this.points -= 10;
    }
  }

  startCounter() {
    this.interval$ = interval(1000).subscribe((val) => {
      // if(this.currentQuestion!=9){
      this.counter--;
      // }

      if (this.currentQuestion == 8) {
        setTimeout(() => {
          this.interval$.unsubscribe();
          // this.onSubmitQuiz();
        }, 60000);
      }
      if (this.counter === 0 && this.currentQuestion != 8) {
        this.currentQuestion++;
        this.counter = 60;
        this.points -= 10;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }

  // resetQuiz() {
  //   this.resetCounter();
  //   // this.getAllQuestions();
  //   this.points = 0;
  //   this.counter = 60;
  //   this.currentQuestion = 0;
  //   this.progress = "0";

  // }
  getProgressPercent() {
    this.progress = (
      (this.currentQuestion / this.questionList.length) * 100
    ).toString();
    return this.progress;
  }

  onSubmitQuiz() {
    this.unAttemptedQuestion =
      this.questionList.length - (this.correctAnswer + this.inCorrectAnswer);
      this.AttemptedQuestions=this.questionList.length-this.unAttemptedQuestion;

    this.questionService.submitUserScore(this.points,this.correctAnswer,this.inCorrectAnswer,this.unAttemptedQuestion,this.questionList.length).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error: Error) => {
        console.error(error);
      },
    });

    this.isQuizCompleted = true;
    this.stopCounter();
  }
}
