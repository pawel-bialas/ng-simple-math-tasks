import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import{TasksOptions} from "../model/TasksOptions";
import {TasksOptionsService} from "../service/tasks-options.service";

@Component({
  selector: 'task-window',
  templateUrl: './task-window.component.html',
  styleUrls: ['./task-window.component.css']
})
export class TaskWindowComponent implements OnInit {

  completeSolution: any[] = [];
  isStarted: boolean = false;
  tasksOptions: TasksOptions = new TasksOptions(0, 10, 'right');
  score: number = 0;

  constructor(private tasksOptionsService: TasksOptionsService)  {

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

  updateRange(range: number):void {
    this.tasksOptions.range = range;
    this.tasksOptionsService.updateSetup(this.tasksOptions);
  }

  updateVariant(variant: String):void {
    this.tasksOptions.variant = variant;
    this.tasksOptionsService.updateSetup(this.tasksOptions);
  }


  getResult() {
    let result: number = 0;
    this.completeSolution.forEach(task => {
      if (task.result === true) {
        result = result + 1;
      }
    })
    this.score = result;
  }
}
