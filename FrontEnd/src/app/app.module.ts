import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './pagecomponents/header/header.component';
import { BodyComponent } from './pagecomponents/body/body.component';
import { FooterComponent } from './pagecomponents/footer/footer.component';
import { LoginComponent } from './pagecomponents/login/login.component';
import { AuthService } from './pagecomponents/auth/auth.service'
import { AuthGuard } from './pagecomponents/auth/auth.guard';
import { RegisterComponent } from './pagecomponents/register/register.component';

const appRoutes: Routes = [
  { path: '', component: BodyComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'search', canActivate: [AuthGuard], component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
