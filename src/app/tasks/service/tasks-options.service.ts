import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {TasksOptions} from "../model/TasksOptions";

@Injectable({
  providedIn: 'root'
})
export class TasksOptionsService {

  private dataTank = new BehaviorSubject(new TasksOptions(4,10,'right'));
  data$: Observable<TasksOptions> = this.dataTank.asObservable();

  constructor() { }

  updateSetup(tasksOptions: TasksOptions){
    this.dataTank.next(tasksOptions);
  }
}
