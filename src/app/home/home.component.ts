import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  uname : any  = ""
  acno  : any

  UserData : any = {}
  balance : any

  alertMessage : any = ""
  alertColor : boolean = true

acno1 : any 

  constructor(private ds : DataService , private router : Router , private fb : FormBuilder , private datepipe: DatePipe) { }

  ngOnInit(): void {

	if (!localStorage.getItem('currentAcno')) {
		
		alert('please Login !!')
		this.router.navigateByUrl("")
		
	}

    if (localStorage.getItem('currentUser')) {
    	this.uname = localStorage.getItem('currentUser')
    	// console.log(this.uname);
      
	}

  }


	AccessUser() {

		if (localStorage.getItem('currentAcno')) {
			this.acno = localStorage.getItem('currentAcno')
			// console.log(this.acno);
			
		}	

		this.ds.getUser(this.acno).subscribe((result : any) => {
			this.UserData = result.message
			// console.log(this.UserData);
		})

	}



	AccessBalance() {

		if (localStorage.getItem('currentAcno')) {
			this.acno = localStorage.getItem('currentAcno')
			// console.log(this.acno);
			
		}

			this.ds.getBalance(this.acno).subscribe((result : any) => {
				//  console.log(result.message);
				this.balance = result.message			 
			})

	}



	logOut() {

		localStorage.removeItem('currentAcno')
		localStorage.removeItem('currentUser')
		localStorage.removeItem('token')


		this.router.navigateByUrl("")

	}




	// model Form for transactions From
	transaction = this.fb.group({
		
		Acno	:	['' , [Validators.required , Validators.pattern('[0-9]+')]] ,
		Amt 	:	['' , [Validators.required , Validators.pattern('[0-9]+')]] ,
		Psw	    :	['' , [Validators.required , Validators.pattern('[0-9a-zA-Z]+')]]	

	}) 


	TransferMoney() {

		if (this.transaction.valid) {
			this.alertMessage = ""

			const DaTe = new Date()
			let latest_date = this.datepipe.transform(DaTe, 'EEEE , MMMM d , y ');
			// console.log(latest_date);

			if (localStorage.getItem("currentAcno")) {
				this.acno = localStorage.getItem("currentAcno")
			}

			if (this.acno == this.transaction.value.Acno) {
				this.alertMessage = "Failed due to Same Account !!"
				this.alertColor = false
			}
			else {
				this.ds.TransferMoney(
					this.transaction.value.Acno , 
					this.acno , 
					this.transaction.value.Amt , 
					this.transaction.value.Psw , 
					latest_date).subscribe((result : any) => {
						this.alertMessage = result.message
						this.alertColor = true
				} , 
				result => {
					this.alertMessage = result.error.message
					this.alertColor = false
				})
	
			}
			
		}
		else {
			this.alertMessage = 'invalid Form !!'
			this.alertColor = false
		}
	}




	deleteAc() {

		if (localStorage.getItem("currentAcno")) {
			this.acno1 = localStorage.getItem("currentAcno")
			// console.log(this.acno1);
			
		}

	}



	cancelChild() {
		this.acno1 = ""
	}



	deleteAccount(event : any) {
		// console.log(event);
		this.ds.deleteAcc(event).subscribe((result : any) => {

			this.logOut()
			// alert("Your account is Deleted :( ")

			alert(result.message)
			


		})
		
	}







}


