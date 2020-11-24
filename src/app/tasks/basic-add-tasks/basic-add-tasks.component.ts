import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {UUID} from "angular2-uuid";
import {TasksOptions} from "../model/TasksOptions";


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
  toggleButton: boolean = true;
  @Output() solution: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.uuid = UUID.UUID();
    this.givenNum = Math.floor((Math.random() * 5) + 1);
    this.whenNum = Math.floor((Math.random() *  5) + 1 + this.givenNum);
    this.resultNum = 0
  }

  ngOnInit(): void {
  }

  addAnswer(): void {
    this.solution.emit(
      {
        task: [this.givenNum, this.whenNum, this.resultNum],
        uuid: this.uuid,
        result: this.checkAnswer()
      }
    )
    this.toggleButton = !this.toggleButton;
  }

  checkAnswer(): boolean {
    return this.givenNum + this.whenNum === this.resultNum;
  }

  ngOnDestroy(): void {

  }
}
