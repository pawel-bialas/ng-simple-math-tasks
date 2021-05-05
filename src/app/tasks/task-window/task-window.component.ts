import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {TasksOptions} from '../model/TasksOptions';
import {TasksOptionsService} from '../service/tasks-options.service';
import {QMarkPosition} from '../model/QMarkPosition';
import {MathOperator} from '../model/MathOperator';
import {SolutionService} from '../service/solution.service';
import {UUID} from 'angular2-uuid';

@Component({
  selector: 'task-window',
  templateUrl: './task-window.component.html',
  styleUrls: ['./task-window.component.css']
})
export class TaskWindowComponent implements OnInit, OnDestroy {

  completeSolution: any[] = [];
  @Output() uid = UUID.UUID();
  isStarted = false;
  public isCompleted = false;
  tasksOptions: TasksOptions = new TasksOptions(0, 10, QMarkPosition.right, MathOperator.add);
  qMarkPosition = QMarkPosition;
  mathOperator = MathOperator;
  score = 0;

  constructor(private tasksOptionsService: TasksOptionsService, private solutionService: SolutionService) {
  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.completeSolution = [];
  }

  startChallenge(): void {
    this.tasksOptionsService.updateSetup(this.tasksOptions);
    this.isStarted = !this.isStarted;
  }

  updateRecord($event: any): void {
    this.completeSolution.push($event);
    console.log(this.completeSolution);
  }

  updateQuantity(quantity: number): void {
    this.tasksOptions.quantity = quantity;
    this.tasksOptionsService.updateSetup(this.tasksOptions);
  }

  updateRange(range: number): void {
    this.tasksOptions.range = range;
    this.tasksOptionsService.updateSetup(this.tasksOptions);
  }

  updateVariant(variant: QMarkPosition): void {
    this.tasksOptions.qMarkPosition = variant;
    this.tasksOptionsService.updateSetup(this.tasksOptions);
  }

  updateOperator(operator: MathOperator): void {
    this.tasksOptions.mathOperator = operator;
    this.tasksOptionsService.updateSetup(this.tasksOptions);
  }


  getResult(): void {
    let result = 0;
    this.completeSolution.forEach(task => {
      if (task.result === true) {
        result = result + 1;
      }
    });
    this.score = result;
    this.isCompleted = true;
    this.saveResult();
  }

  saveResult(): void {
    this.completeSolution.push({
      uid: this.uid,
      score: this.score,
      taskOptions: this.tasksOptions
    });
    console.log('end result: ' + JSON.stringify(this.completeSolution));
    this.solutionService.saveSolution(this.completeSolution);
  }
}
