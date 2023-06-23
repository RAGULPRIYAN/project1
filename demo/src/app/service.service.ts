import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  otpurl="http://localhost:3004/sendEmail"
  posturl="http://localhost:3002/insert"
  loginurl="http://localhost:3002/login"
  OTPurl="http://localhost:3002/verify"
  nestpost="http://localhost:3000/user/addUser"
  loginpost="http://localhost:3000/user/login"
  verifyUsers="http://localhost:3000/user/verify"
  emailcheck="http://localhost:3000/user/forgotpassword"
  verifyotp="http://localhost:3000/user/emailverify"
  passwordreset="http://localhost:3000/user/resetpassword"
  resendotp="http://localhost:3000/user/ResendOTP"

  constructor(private http:HttpClient) { }
  getOTP(body:any){
    return this.http.post(this.otpurl,body)

  }
  postSignup(body:any){
    return this.http.post(this.nestpost,body)
  }
  postLogin(body:any){
    
    return this.http.post(this.loginpost,body)
  }
  otpNew(body:any){
    return this.http.post(this.verifyUsers,body)
  }
  emailCheck(body:any){
    return this.http.post(this.emailcheck,body)
  }

  verifyOTP(body:any){
    return this.http.post(this.verifyotp,body)
  }

  resetPassword(body:any){
    return this.http.post(this.passwordreset,body)
  }
  resendOtp(body:any){
    return this.http.post(this.resendotp,body)
  }


}
