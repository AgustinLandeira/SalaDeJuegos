import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { Firestore, provideFirestore } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import Swal from 'sweetalert2';
import { HomeComponent } from '../home/home.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterLinkActive,HomeComponent,CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public mail : string ="";
  public clave : string ="";
  public logeado! : boolean;
  public error : string = "";
  

  constructor(private router:Router,firestore :Firestore,private auth: Auth){}


  Login(){

    signInWithEmailAndPassword(this.auth,this.mail,this.clave).then((result) =>{

      this.showSuccessAlert("Acceso a juegos")
      this.router.navigate(["home"]);
    }).catch((e)=>{

      this.logeado = false;

      console.log(e.code);

      switch(e.code){

        case "auth/invalid-email":
          this.error = "cuenta invalida"
          break;
        
        case "auth/invalid-credential":
          this.error = "la cuenta/contraseña no existe"
          break;
        
        default :
          this.error = "error desconocido"
          break;
        
        
      }

    });
  }

  private showSuccessAlert(message: string) {
    return Swal.fire({
      title: 'Ingreso exitoso',
      text: message,
      icon: 'success',
      confirmButtonText: 'OK',
      background : "black",
      color: "green",
      confirmButtonColor: "green"
    });
  }
  

}
