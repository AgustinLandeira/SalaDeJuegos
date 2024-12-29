import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink,RouterLinkActive } from '@angular/router';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public mail :string ="";
  public clave : string = "";
  public registrado! : boolean;
  public msjError : string = "";

  constructor(public router:Router,public auth:Auth){}

  Registrar(){

    createUserWithEmailAndPassword(this.auth,this.mail,this.clave).then((res) =>{

      if(res.user.email != null){
        
        this.showSuccessAlert("Te logeamos automaticamente");
        this.router.navigate(["home"]);
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
  private showSuccessAlert(message: string) {
    return Swal.fire({
      title: 'Registro exitoso',
      text: message,
      icon: 'success',
      confirmButtonText: 'OK',
      background : "black",
      color: "green",
      confirmButtonColor: "green"
    });
  }
}
