import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {TasksOptions} from '../model/TasksOptions';
import {QMarkPosition} from '../model/QMarkPosition';
import {MathOperator} from '../model/MathOperator';

@Injectable({
  providedIn: 'root'
})
export class TasksOptionsService {

  private dataTank = new BehaviorSubject(new TasksOptions(4, 10, QMarkPosition.right, MathOperator.add));
  data$: Observable<TasksOptions> = this.dataTank.asObservable();

  constructor() { }

  updateSetup(tasksOptions: TasksOptions): void{
    this.dataTank.next(tasksOptions);
  }

  resetSetup(): void {
  this.dataTank = new BehaviorSubject(new TasksOptions(4, 10, QMarkPosition.right, MathOperator.add));
  }
}
