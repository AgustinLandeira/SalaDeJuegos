import { Component, Input } from '@angular/core';
import { QuienSoyComponent } from '../quien-soy/quien-soy.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [QuienSoyComponent,FormsModule,CommonModule],
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

  JugarPreguntados(){
    this.router.navigate(["juegos/preguntados"]);
  }

  JugarMayorMenor(){
    this.router.navigate(["juegos/mayor-menorr"]);
  }

}
