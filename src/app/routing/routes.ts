import {Routes} from "@angular/router";
import {BasicAddTasksComponent} from "../tasks/basic-add-tasks/basic-add-tasks.component";
import {LoginComponent} from "../authentication/login/login.component";


export const ROUTES: Routes = [
  {path: '/basic-add-tasks', component: BasicAddTasksComponent},
  {path: '/login', component: LoginComponent},
];
