import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  name: any = '';
  email: any = ''
  password: any = '';
  subject: string = ''
  mobilenumber: any = ''
  otp: string = ''
  verificationCode: string = ''
  getOTPs: any = ''
  id: any = ''
  constructor(private service: ServiceService, private router: Router,private messageService: MessageService) { }
  userLogin() { }
  addUser(val:any) {
  
    console.log("value chaeck",val)
    localStorage.setItem('useremail',JSON.stringify(val))

    let payload = {
      email: this.email,
      name: this.name,
      password: this.password,
      mobilenumber: this.mobilenumber,


    }
    console.log('signup payload', payload)
   
    this.service.postSignup(payload).subscribe({
      next: (data:any) => {
      
      this.getOTPs = data
      console.log("otps", this.getOTPs)
      this.showError('sucess',data.message)
      //navigate to otp page and also sent email and otp to otp page do not use query params
     
       this.router.navigate(['/otp'])
     

    },
    error: (error:any) => {
      console.log('There was an error!', error);
      this.showError('error',error.error.message)
    }
    
    // const queryParams = {
    //   email:this.getOTPs.email,


    //  }
  })
 

  }
  // showError(type:string,detail:string) {
  //   this.messageService.add({ severity: type, summary: 'Error', detail: detail });
  // }
  showError(type:string,detail:string) {
    if(type=='sucess')
    {
      this.messageService.add({ severity: type, summary: 'Account successfull', detail: detail });
    }
    else if(type=='error'){
      this.messageService.add({ severity: type, summary: 'Error', detail: detail });
    }
}
  
}
