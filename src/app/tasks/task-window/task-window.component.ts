import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'task-window',
  templateUrl: './task-window.component.html',
  styleUrls: ['./task-window.component.css']
})
export class TaskWindowComponent implements OnInit {

  completeSolution: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.completeSolution = [];
  }

  updateRecord($event: any): void {
    this.completeSolution.push($event);
    console.log(this.completeSolution);
  }

}
