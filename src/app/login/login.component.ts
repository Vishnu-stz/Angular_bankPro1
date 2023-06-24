import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
  
    // data = "happy banking with Us" - String Interpollation
    // Pdata = "Account_Num" - Property Binding

    serviceData : any

    
    constructor(private router:Router , private ds : DataService , private fb : FormBuilder) { }

      ngOnInit(): void {
        
        // this.serviceData = this.ds.sdata
        // this.ds.smethod()
        // console.log(this.serviceData);

      }


      // Model
      loginForm = this.fb.group({
    	acno : ['' , [Validators.required , Validators.pattern('[0-9]+')]] ,
		psw : ['', [Validators.required , Validators.pattern('[a-zA-Z0-9]+')]] 
      })



      login() {    

		var path = this.loginForm.value 

      var acno = path.acno
      var psw = path.psw

	  if (this.loginForm.valid) {
		
			this.ds.login(acno , psw).subscribe((result : any) => {
				
				localStorage.setItem('currentUser' , result.currentUser)
				localStorage.setItem('currentAcno' , result.currentAcno)
        localStorage.setItem('token' , JSON.stringify(result.token))

				alert(result.message)
					this.router.navigateByUrl('home')     
			} ,
				result => {
				alert(result.error.message)     
				} 
			)

	  }
       	else {
			alert('Invalid Form')
	   	}
      
    // - Event Binding
    //   alert ('Login Clicked') 
    //   this.rout.navigateByUrl('home')     
    // console.log(this.acno);
    // console.log(this.psw);
    }

    // Account_NoChange(event:any) {
    //     console.log(event.target.value);   - Dolor $ Event Binding 
    // }
    // title = 'login';

}
