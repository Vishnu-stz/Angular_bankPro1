import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


// For Header Overloading
const options = {
	headers : new HttpHeaders()
}


@Injectable({
  providedIn: 'root'
})


export class  DataService {

	// sdata = "hello hai"

	constructor(private http : HttpClient) { }


	//For Header used for Security
	getHeader() {

		// for creating Header
		let headers = new HttpHeaders()

		// add token using append
		let token = JSON.parse(localStorage.getItem("token") || "")

		// store the header in option as header value( to achive overloading )
		options.headers = headers.append("access_token" , token)

		// return
		// 1st return headers
		return options

	}



  
	// Creating a New ApiCall to Register
	register(acno : any , uname : any , psw : any){
	  
		const bodyData = {
			acno ,
		 	uname ,
		 	psw
		}

		return this.http.post('http://localhost:3000/register',bodyData)

	}

	// Api to Login
	login(acno : any , psw : any) {
	  
		const bodyData1 = {
		  acno , 
		  psw  
		}

		return this.http.post('http://localhost:3000/login',bodyData1)  

	}

	// Api to Single User Data
	getUser(acno : any) {
	  return this.http.get('http://localhost:3000/getuser/'+acno , this.getHeader())
	}


	// Api to Get Balance
	getBalance(acno : any) {
	  return this.http.get('http://localhost:3000/balance/'+acno , this.getHeader())
	}


	// Api to money transfer
	TransferMoney(ToAcno : any , FromAcno : any , Amount : any , Psw : any , Date : any) {

	  const bodyData2 = {
		
		ToAcno   ,
		FromAcno ,
		Amount   ,
		Psw      ,
		Date     
		
	  }

	  return this.http.post('http://localhost:3000/transfer' , bodyData2 , this.getHeader())

	}  


	
	// api to get Transaction array 
	getTransaction(acno : any) {

		return this.http.get('http://localhost:3000/history/'+acno , this.getHeader())

	}




	// api to delete Acc
	deleteAcc(acno:any) {
		return this.http.delete('http://localhost:3000/deleteAc/'+acno , this.getHeader())
	} 
	




  // smethod() {
  //   alert ('service Method')
  // }
  
}
