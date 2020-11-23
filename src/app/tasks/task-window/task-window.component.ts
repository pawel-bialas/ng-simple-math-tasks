import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'task-window',
  templateUrl: './task-window.component.html',
  styleUrls: ['./task-window.component.css']
})
export class TaskWindowComponent implements OnInit {

  completeSolution: any[] = [];
  taskQuantity: number = 4;
  @Output() markStart: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    this.completeSolution = [];
  }

  startChallenge(): void {
    this.markStart.emit(true);
  }

  updateRecord($event: any): void {
    this.completeSolution.push($event);
    console.log(this.completeSolution);
  }

  updateTasksQuantity(number: number) {
    this.taskQuantity = number;
  }
}
