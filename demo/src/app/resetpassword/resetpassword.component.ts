import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent {
  email: string = ''
  newpassword: string = ''
  confirmPassword: string = ''
  otp: string = ''
  mobilenumber: string = ''
  name: string = ''
  constructor(private service: ServiceService, private route: ActivatedRoute, private router: Router, private messageService: MessageService) {
    const userData = localStorage.getItem("useremail");
    if (userData) {
      const useremail = JSON.parse(userData)
      this.email = useremail.email
    }

  }


  addUser() {
    let payload = {
      password: this.newpassword,
      email: this.email,


    }

    console.log('reset password payload', payload)
    this.service.resetPassword(payload).subscribe({
      next: (data:any) => {
        console.log(data)
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
      this.messageService.add({ severity: type, summary: 'Reset password', detail: detail });
    }
    else if(type=='error'){
      this.messageService.add({ severity: type, summary: 'Error', detail: detail });
    }


  
  }
}
