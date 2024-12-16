import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {

  url : string = "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/ahorcado1.png?alt=media&token=30a27629-d018-4ce4-8489-b7956a11cc9c";
  public constructor(public route: Router){

  }

  public volverHome(): void {

    this.route.navigate(["home"]);
  }

  public reiniciarJuego(){

    console.log("hola");
  }

}
