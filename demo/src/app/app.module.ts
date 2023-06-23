import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { OtpComponent } from './otp/otp.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceService } from './service.service';
import { EmailverificationComponent } from './emailverification/emailverification.component';
import { ForgototpComponent } from './forgototp/forgototp.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    OtpComponent,
    EmailverificationComponent,
    ForgototpComponent,
    ResetpasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,ToastModule,BrowserAnimationsModule
  ],
  providers: [ServiceService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
