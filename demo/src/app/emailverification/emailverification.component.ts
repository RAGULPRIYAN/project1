import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-emailverification',
  templateUrl: './emailverification.component.html',
  styleUrls: ['./emailverification.component.scss']
})
export class EmailverificationComponent {
  email:any
  constructor( private service:ServiceService,private route:ActivatedRoute,private router:Router,private messageService: MessageService) { }
  verifyEmail(val:any){
    console.log("value check",val)
    localStorage.setItem('useremail',JSON.stringify(val))

    let payload={
      email:this.email
    }
    console.log('verify email payload',payload)
    this.service.emailCheck(payload).subscribe( {
      next: (data :any)=> {
        this.showError('sucess',data.message)
      console.log("verify email check", data)

      this.router.navigate(['/forgototp'])
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
      this.messageService.add({ severity: type, summary: 'Login successfull', detail: detail });
    }
    else if(type=='error'){
      this.messageService.add({ severity: type, summary: 'Error', detail: detail });
    }
}
}
