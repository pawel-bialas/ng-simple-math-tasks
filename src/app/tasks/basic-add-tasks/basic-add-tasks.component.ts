import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {UUID} from "angular2-uuid";

@Component({
  selector: 'basic-add-tasks',
  templateUrl: './basic-add-tasks.component.html',
  styleUrls: ['./basic-add-tasks.component.css']
})
export class BasicAddTasksComponent implements OnInit, OnDestroy {

  givenNum: number;
  public whenNum: number;
  resultNum: number;
  uuid: String;
  @Output() solution: EventEmitter<any> = new EventEmitter<any>();



  constructor() {
    this.uuid = UUID.UUID();
    this.givenNum = Math.floor((Math.random() * 10) + 1);
    this.whenNum = 0;
    this.resultNum = Math.floor((Math.random() * 10) + 1 + this.givenNum);
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.solution.emit(
      {
        task: [this.givenNum, this.whenNum, this.resultNum],
        uuid: this.uuid,
        result: this.checkAnswer()
      }
    )
  }

  checkAnswer(): boolean {
    return this.givenNum + this.whenNum === this.resultNum;
  }

  ngOnDestroy(): void {

  }
}
