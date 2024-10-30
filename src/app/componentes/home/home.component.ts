import { Component } from '@angular/core';
import { QuienSoyComponent } from '../quien-soy/quien-soy.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [QuienSoyComponent,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(public router: Router){}

  Mostrarme(){

    this.router.navigate(['quien-soy']);

  }

  Logout(){
    this.router.navigate(["login"]);
  }

}
