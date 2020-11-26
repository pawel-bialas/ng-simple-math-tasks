import {Routes} from "@angular/router";
import {BasicTasksComponent} from "../tasks/basic-add-tasks/basic-tasks.component";
import {LoginComponent} from "../authentication/login/login.component";


export const ROUTES: Routes = [
  {path: '/basic-add-tasks', component: BasicTasksComponent},
  {path: '/login', component: LoginComponent},
];
