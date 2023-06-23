import { Component ,OnInit} from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent {
  mobilenumber:string=''
  email:string=''
  otp:string=''
  userData:any=''
  constructor(private service:ServiceService,private router:Router,private route:ActivatedRoute,private messageService: MessageService) {
    const userData =localStorage.getItem("useremail");
    if(userData){
      const useremail = JSON.parse(userData)
      this.email=useremail.email
    }
   }
 
 
  
  verifyUser(){
   let payload={
    email:this.email,
   otp: this.otp

   }
   console.log("payload",payload) 
   this.service.otpNew(payload).subscribe( {
    next: (data:any) => {

    console.log("otpcheck", data)
    this.showError('sucess',data.message)
    this.router.navigate(['/login'])
    },
    error: (error:any) => {
      console.log('There was an error!', error);
      this.showError('error',error.error.message)
    }
    
  })

    }
    showError(type:string,detail:string) {
      if(type=='sucess')
      {
        this.messageService.add({ severity: type, summary: 'Account created', detail: detail });
      }
      else if(type=='error'){
        this.messageService.add({ severity: type, summary: 'Error', detail: detail });
      }


    
    }
    resendOtp(){
      let payload={
        email:this.email
      }
      console.log('otp payload',payload)
      this.service.resendOtp(payload).subscribe({
        next: (data:any) => {
          console.log(data)
          this.showError('sucess',data.message)
  
          
        console.log("logincheck", data)
        // this.router.navigate(['/signup'])
        },
        error: (error:any) => {
          console.log('There was an error!', error);
          this.showError('error',error.error.message)
        }
  
        
      })
    }

    

  }
 

