import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showlogin: boolean = true;
  email: string = '';
  password: string = '';
  constructor(private service:ServiceService,private router:Router,private messageService: MessageService) { }
  userLogin() {
    let payload={
      email:this.email,
      password:this.password
    }
    console.log('login payload',payload)
    this.service.postLogin(payload).subscribe({
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
