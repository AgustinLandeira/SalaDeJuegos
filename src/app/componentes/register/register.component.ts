import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink,RouterLinkActive } from '@angular/router';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public mail :string ="";
  public clave : string = "";
  public registrado! : boolean;
  public msjError : string = "";

  constructor(router:Router,public auth:Auth){}

  Registrar(){

    createUserWithEmailAndPassword(this.auth,this.mail,this.clave).then((res) =>{

      if(res.user.email != null){
        this.registrado = true;
        console.log(this.registrado);
      }
      
    }).catch((e) =>{
      this.registrado = false;

      console.log(e);

      switch(e.code){

        case "auth/invalid-email":
          this.msjError = " Email invalido";
          break;

        case  "auth/missing-password":
          this.msjError = "escriba una contraseña";
          break;

        case "auth/weak-password":
        this.msjError = "contraseña debil";
          break;
        
        case "auth/email-already-in-use":
          this.msjError = "mail ya en uso"
          break;


      }
    });//
  }
}
