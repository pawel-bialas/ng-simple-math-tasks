import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {UUID} from "angular2-uuid";
import {TasksOptions} from "../model/TasksOptions";
import {TasksOptionsService} from "../service/tasks-options.service";
import {Observable} from "rxjs";


@Component({
  selector: 'basic-add-tasks',
  templateUrl: './basic-tasks.component.html',
  styleUrls: ['./basic-tasks.component.css']
})
export class BasicTasksComponent implements OnInit, OnDestroy {

  givenNum: number = 0;
  whenNum: number = 0;
  resultNum: number = 0;
  userNumber: number = 0;
  uuid: String;
  toggleButton: boolean = true;
  @Output() solution: EventEmitter<any> = new EventEmitter<any>();
  tasksOptions$: Observable<TasksOptions> = this.tasksOptionsService.data$;
  tasksOptions!: TasksOptions;

  constructor(private tasksOptionsService: TasksOptionsService) {
    this.tasksOptions$.subscribe(value => {
      this.tasksOptions = new TasksOptions(value.quantity, value.range, value.variant, value.operator);
    });
    this.uuid = UUID.UUID();
    if (this.tasksOptions.variant === 'right'){
      this.givenNum = Math.floor((Math.random() * this.tasksOptions.range / 2) + 1);
      this.whenNum = Math.floor((Math.random() *  this.tasksOptions.range / 2) + 1 + this.givenNum);
      this.resultNum = 0
    }
    if (this.tasksOptions.variant === 'center') {
      this.givenNum = Math.floor((Math.random() * this.tasksOptions.range / 2) + 1);
      this.whenNum = 0;
      this.resultNum = Math.floor((Math.random() *  this.tasksOptions.range / 2) + 1 + this.givenNum);

    }
    if (this.tasksOptions.variant === 'left') {
      this.givenNum = 0;
      this.whenNum = Math.floor((Math.random() * this.tasksOptions.range / 2) + 1);
      this.resultNum = Math.floor((Math.random() *  this.tasksOptions.range / 2) + 1 + this.whenNum);
    }

  }

  ngOnInit(): void {

  }

  addAnswer(): void {
    if (this.tasksOptions.variant === 'right') {
     this.resultNum = this.userNumber;
    }
    if (this.tasksOptions.variant === 'center') {
     this.whenNum = this.userNumber;
    }
    if (this.tasksOptions.variant === 'left') {
      this.givenNum = this.userNumber;
    }
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
    if (this.tasksOptions.operator === '+'){
      return this.givenNum + this.whenNum === this.resultNum;
    } else if (this.tasksOptions.operator === '-'){
      return this.givenNum - this.whenNum === this.resultNum;
    } else if (this.tasksOptions.operator === '*'){
      return this.givenNum * this.whenNum === this.resultNum;
    } else if (this.tasksOptions.operator === '/'){
      return this.givenNum / this.whenNum === this.resultNum;
    } else return false;

  }

  ngOnDestroy(): void {

  }
}
