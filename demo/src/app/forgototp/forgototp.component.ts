import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-forgototp',
  templateUrl: './forgototp.component.html',
  styleUrls: ['./forgototp.component.scss']
})
export class ForgototpComponent {
  otp:any
  email:any
 
  
  constructor(private service:ServiceService,private route:ActivatedRoute,private router:Router,private messageService: MessageService) { 
    const userData =localStorage.getItem("useremail");
    if(userData){
      const useremail = JSON.parse(userData)
      this.email=useremail.email
    }
  }
  
   
 
 
  verifyOTP(){
   
    let payload={
      otp:this.otp,
      email:this.email
  }
  this.service.verifyOTP(payload).subscribe( {
    next: (data:any) => {
     
      this.showError('sucess',data.message)

    console.log("verify otp check", data)
    this.router.navigate(['/resetpassword'])


  },
  error: (error:HttpErrorResponse) => {
    console.error('There was an error!', error);
    this.showError('error',error.error.message)
    
  }
})
  }
  showError(type:string,detail:string) {
    if(type=='sucess')
    {
      this.messageService.add({ severity: type, summary: 'OTP ', detail: detail });
    }
    else if(type=='error'){
      this.messageService.add({ severity: type, summary: 'Error', detail: detail });
    }
}

}