import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { Firestore, provideFirestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterLinkActive ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  mail : string ="";
  clave : string ="";

  constructor(router:Router,firestore :Firestore,auth: Auth){}


  

}
