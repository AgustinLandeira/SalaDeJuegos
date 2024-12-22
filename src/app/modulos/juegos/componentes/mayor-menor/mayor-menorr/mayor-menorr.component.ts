import { Component, OnInit , NgModule } from '@angular/core';
import {Router} from '@angular/router';
import { range } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mayor-menorr',
  templateUrl: './mayor-menorr.component.html',
  styleUrl: './mayor-menorr.component.css'
})

export class MayorMenorrComponent implements OnInit {

  cartas : any[] = [];
  cartaActual : any = "";
  siguienteCarta : any = "";
  aciertos : number = 0;
  errados : number = 0;
  listaCartas: string[] = [
    "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/uno-espada.jpg?alt=media&token=ebae934e-ad24-4a27-97d4-59fa62d14f27",
    "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/2-espada.jpg?alt=media&token=d1224873-2cd2-4997-b58a-7249f2edc20d",
    "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/3-espada.jpg?alt=media&token=c850a634-4517-4a54-bf34-ac28dd1a4ae4",
    "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/cuatro-espada.jpg?alt=media&token=7fd76f61-ee9d-4dc9-b2bb-931c3c7c1ec7",
    "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/5-espada.jpg?alt=media&token=517ccd0a-60df-4bbd-8f81-41e3173b96b4",
    "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/6-espada.jpg?alt=media&token=964f8e4e-6d29-4bad-92f1-9e8341fa19d6",
    "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/7-espada.jpg?alt=media&token=dfa1ab5a-5c4c-4a8e-861d-25f26271dc53",
    "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/8-espada.jpg?alt=media&token=32339ec2-968f-4227-877d-e96f385094c9",
    "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/9-espada.png?alt=media&token=74193448-3517-4be2-bfc8-ff0407f44276",
    "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/10-espada.jpg?alt=media&token=a6a39a9a-9a96-4147-a8dd-e9bf7aaa1b45",
    "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/11-espada.jpg?alt=media&token=af5c51b6-9bd0-4d63-9684-c3164c71fbc3",
    "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/12-espada.jpg?alt=media&token=0b43b017-bf91-46a8-b5b6-4e6ffc817253",

  ];
  listaMezclada : string[] = [];

  listaCartaValor: any[] = [];
  vueltas :number = 0;
  juegoTerminado : boolean = false;
  resultado : string = "";

  public constructor(public router: Router) {

  }

  public ngOnInit(): void {
      this.iniciarJuego();
  }

  public iniciarJuego():void{

    this.listaCartaValor = this.generarMazo(this.listaCartas);
    this.listaMezclada = this.mezclar(this.listaCartaValor);
    this.cartaActual = this.elegirCarta(this.listaMezclada);
    this.siguienteCarta = this.elegirSiguienteCarta(this.listaMezclada);

  }

  public volver(){

    this.router.navigate(["home"]);


  }

  public mezclar(lista_cartas: string[]){

    for (let i = lista_cartas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Índice aleatorio
      [lista_cartas[i], lista_cartas[j]] = [lista_cartas[j], lista_cartas[i]]; // Intercambia elementos
    }

    return lista_cartas;

  }

  public generarMazo(lista_cartas: string[]){

    let contador = 1;
    const lista : any[] = [];

    while (contador <= 12){

      lista.push({valor:contador,url:lista_cartas[(contador -1)]})
      contador += 1;

    }
    console.log(lista);
    return lista;
  }

  public elegirCarta(lista: string[]){

    
    if(this.vueltas < 10){
  
      const inidiceAleatorio = Math.floor(Math.random() * lista.length);
      let cartaElegida = lista[inidiceAleatorio];
      
  
      return cartaElegida;

    }else{
      return null;
    }
    
    

  }

  public elegirSiguienteCarta(lista: string[]){

    if(this.vueltas < 10){

      if(this.cartaActual != ""){
        lista.filter(item => item !== this.cartaActual); // saco la carta ya elegida asi no se repite en la siguiente vuelta
      }
  
      const inidiceAleatorio = Math.floor(Math.random() * lista.length);
      let cartaElegida = lista[inidiceAleatorio];

      this.vueltas += 1;

      lista.push(cartaElegida);//la agrego devuelta la carta que elimine para que toque en otra ronda
  
      return cartaElegida;


    }else{
      return null;
    }

  }

  public comparar(opcion : string):void{

   

    if(this.vueltas < 10){

      console.log(opcion);
      console.log(this.siguienteCarta.valor);

      if(this.siguienteCarta.valor < this.cartaActual.valor){

        if(opcion == "menor"){
          console.log("estas en lo correcto, es menor");
          this.aciertos += 1;
        }else{
          this.errados += 1;
          console.log("estas en lo incorrecto, es menor");
        }
      }
  
      if(this.siguienteCarta.valor > this.cartaActual.valor){
  
        if(opcion == "mayor"){
          console.log("estas en lo correcto, es mayor");
          this.aciertos += 1;
        }else{
          this.errados += 1;
          console.log("estas en lo incorrecto, es mayor");
        }
      }
  
      this.cartaActual = this.siguienteCarta;
      this.siguienteCarta = this.elegirSiguienteCarta(this.listaMezclada);

    }else{

      this.terminarJuego();

    }
    
  }

  public terminarJuego(){

    this.juegoTerminado = true;

    if(this.aciertos > this.errados){

      this.resultado = "Ganaste!!!!!!";
    }else{
      this.resultado = "Perdiste........";
    }


  }

  public reiniciarJuego():void{

    this.resultado = "";
    this.juegoTerminado = false;
    this.aciertos = 0;
    this.errados = 0;
    this.vueltas = 0;

    this.ngOnInit();
  }

}
