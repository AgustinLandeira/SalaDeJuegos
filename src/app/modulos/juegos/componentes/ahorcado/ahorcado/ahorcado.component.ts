import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent implements OnInit {

  imagenActual : string = "";
  imagenes : any[] = [
    "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/ahorcado1.png?alt=media&token=30a27629-d018-4ce4-8489-b7956a11cc9c",
    "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/Captura%20de%20pantalla%202024-12-16%20203957.png?alt=media&token=429beb06-0e45-4278-b427-e818eafaa715",
    "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/ahorcado3.png?alt=media&token=da34103c-fe28-47c6-9480-ff5364d8ff92",
    "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/ahorcado4.png?alt=media&token=a060ea46-8ff9-45b2-8de4-d74eb741fd31",
    "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/ahorcado5.png?alt=media&token=437470bf-c54f-4204-930f-c4aa97402d62",
    "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/ahorcado6.png?alt=media&token=ddd7a86b-906d-45e3-adc1-71864d353c4a"
  ];
  palabras : string[] = [
    "angular",
    "typescript",
    "independiente",
    "programador",
    "computadora",
    "teclado",
    "mouse"
  ];
  palabra : string = "";
  palabraElegida : string = "";
  letrasUsadas :string[] = [];
  letras :string[] = "abcdefghijklmnopqrstuvwxyz".split("");
  errores : number = 0;
  juegoTerminado: boolean = false;
  resultado : string = "";


  public constructor(public route: Router){

  }

  public ngOnInit(): void {
      this.iniciarJuego();
  }

  public iniciarJuego(): void {

    this.palabraElegida = this.elegirPalabra(this.palabras);
    this.imagenActual = this.imagenes[this.errores];

  }
  

  public elegirPalabra(palabras: string[]):string{

      const inidiceAleatorio = Math.floor(Math.random() * palabras.length);
      let palabraElegida = palabras[inidiceAleatorio];

      for(let i = 0; i < palabraElegida.length; i++) {

        this.palabra += "_ ";

      }

      

    
      return palabraElegida;
  }

  public compararletra(letra: string):void{
    
    this.letrasUsadas.push(letra);
    let palabraElegida = this.palabraElegida.split("");//lo convierto en lista,separo las letras

    const indices :number[] = [];
    if(palabraElegida.includes(letra)){// si la letra coincide con un elemento entra al if
      
      let posicion = this.palabraElegida.indexOf(letra);//busca la primera aparicion de la letra buscada
      
      
      //hasta que aparezcan coincidencias la posicion no va a ser -1
      while (posicion !== -1) {

        indices.push(posicion);
        posicion = this.palabraElegida.indexOf(letra, posicion + 1);
        console.log(indices);

      }

      
      this.palabra = this.palabra.replace(/\s/g,""); // el /s nos saca las tabulaciones,saltos de linea y espacios y /g que sea todas las ocurrencias
      let arrayPalabra = this.palabra.split("");
      for(let i = 0; i < indices.length; i++){

        arrayPalabra[indices[i]] = letra;
      }

      //convertimos el array en un string
      this.palabra = arrayPalabra.join(" ");

      console.log(this.palabra);
      console.log(this.palabraElegida);

      if(this.palabra.replace(/\s+/g,"") == this.palabraElegida){
        this.terminarJuego();
      }


    }else{

        this.errores += 1;

        this.imagenActual = this.imagenes[this.errores];

        if(this.errores == 6){

          this.terminarJuego();

        }

      }

  }

  public volverHome(): void {

    this.route.navigate(["home"]);
  }

  public reiniciarJuego(){

    this.errores = 0;
    this.imagenActual = this.imagenes[this.errores];
    this.juegoTerminado = false;
    this.palabra = "";
    this.palabraElegida = "";
    this.letrasUsadas = [];
    this.ngOnInit();
  }

  public terminarJuego(){

    if(this.errores == 5){

      this.resultado = "Perdiste..... la palabra era: " + this.palabraElegida;

    }else{
      this.resultado = "Ganaste !!!, la palabra era: " + this.palabraElegida;
    }

    this.juegoTerminado = true;

  }

}
