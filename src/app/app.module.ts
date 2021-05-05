import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {environment} from '../environments/environment';

import {MaterialModule} from './material/material.module';

import {AppComponent} from './app.component';
import {MainNavComponent} from './main-nav/main-nav.component';
import {BasicTasksComponent} from './tasks/basic-tasks/basic-tasks.component';
import {LoginComponent} from './authentication/login/login.component';
import {TaskWindowComponent} from './tasks/task-window/task-window.component';

import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {RouterModule} from '@angular/router';
import {ROUTES} from './routing/routes';
import {HomeComponent} from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    BasicTasksComponent,
    TaskWindowComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(ROUTES, {onSameUrlNavigation: 'reload'}),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,

  ],
  exports: [
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
