import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import{TasksOptions} from "../model/TasksOptions";

@Component({
  selector: 'task-window',
  templateUrl: './task-window.component.html',
  styleUrls: ['./task-window.component.css']
})
export class TaskWindowComponent implements OnInit {

  completeSolution: any[] = [];
  tasksOptions: TasksOptions = new TasksOptions(4, 10, 'right');

  constructor() {

  }
  ngOnInit(): void {
    this.completeSolution = [];

  }

  startChallenge(): void {

  }

  updateRecord($event: any): void {
    this.completeSolution.push($event);
    console.log(this.completeSolution);
  }

  updateQuantity(quantity: number): void {
    this.tasksOptions.quantity = quantity;
  }

  updateRange(range: number):void {
    this.tasksOptions.range = range;
  }

  updateVariant(variant: String):void {
    this.tasksOptions.variant = variant;
  }

}
