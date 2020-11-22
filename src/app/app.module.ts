import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";

import {environment} from '../environments/environment';

import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { BasicAddTasksComponent } from './tasks/basic-add-tasks/basic-add-tasks.component';
import { LoginComponent } from './authentication/login/login.component';
import { TaskWindowComponent } from './tasks/task-window/task-window.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFireDatabaseModule} from "@angular/fire/database";


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    BasicAddTasksComponent,
    TaskWindowComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
