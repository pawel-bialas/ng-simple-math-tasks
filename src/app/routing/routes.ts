import {Routes} from "@angular/router";
import {BasicTasksComponent} from "../tasks/basic-add-tasks/basic-tasks.component";
import {LoginComponent} from "../authentication/login/login.component";
import {TaskWindowComponent} from "../tasks/task-window/task-window.component";
import {HomeComponent} from "../home/home.component";


export const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'basic-tasks', component: TaskWindowComponent},
  {path: 'login', component: LoginComponent},
];
