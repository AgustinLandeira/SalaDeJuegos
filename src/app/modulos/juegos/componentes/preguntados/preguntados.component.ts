import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PreguntadosApiService } from '../../../../servicios/preguntados-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent implements OnInit,OnDestroy {

  //injectamos la independencia
  constructor(private preguntadosApi:PreguntadosApiService,private router:Router){}

  sub! : Subscription
  paises :any[] = [];//una lista para guardar los personajes
  paisActual:any | null ;
  paisAleatorio:any;
  paisesUsados : any[] = [];
  listaOpciones :any[] = [];
  paisesRestantes!: number;
  siguientePais: any;
  preguntasCorrectas : number = 0;
  preguntasIncorrectas : number = 0; 
  terminado: boolean = false;
  resultado:string = "";
  mostrarDescripcion :boolean = false;
  ngOnInit(): void { //es un hook en el cual angular lo llama al momento de crear el componente
      
    this.sub = this.preguntadosApi.getPaises()
    .subscribe(data =>{//le asignmos la suscripcion al observable para poder emitir los datos que este representando

      const listaAleatoria = this.mezclarPaises(data);//le asigno a mi propiedad los personajes
      this.paises = listaAleatoria.slice(0, 21);//elegimos los primeros 15
      this.iniciarJuego();


    });

  }

  ngOnDestroy(): void { //borramos la inscripcion para que no anda dando vueltas a pesar de que se elimine el componente
      this.sub.unsubscribe();
  }

  iniciarJuego(): void {

    this.paises = this.mezclarPaises(this.paises);
    this.paisActual = this.elegirPais(this.paises);
    this.paisesUsados.push(this.paisActual);
    this.siguientePais = this.paises.pop() || null;
    this.listaOpciones = this.elegirOpciones(4);
    this.paisesRestantes = this.paises.length+1;

  }

  elegirPais(lista_personajes: any[]): void {

    const indiceAleatorio = Math.floor(Math.random() * lista_personajes.length);
    this.paisAleatorio = lista_personajes[indiceAleatorio];

    return this.paisAleatorio

  }

  mezclarPaises(personajes: any[]){

    for (let i = personajes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Índice aleatorio
      [personajes[i], personajes[j]] = [personajes[j], personajes[i]]; // Intercambia elementos
    }

    return personajes;
  }

  elegirOpciones(cantidadPersonajes: number){

    let opcionesAleatorias: string[] = [];
    let listaOpcionesAleatorias: any[] = [];
    listaOpcionesAleatorias = this.paises.concat(this.paisesUsados);
    const cantidadReal = Math.min(cantidadPersonajes, listaOpcionesAleatorias.length);
    
    if(this.paisActual != null){// cambio

      while (opcionesAleatorias.length < cantidadReal){

        const randomIndex = Math.floor(Math.random() * listaOpcionesAleatorias.length);
        const personaje = listaOpcionesAleatorias[randomIndex];

        if(!opcionesAleatorias.includes(this.paisActual.nombre)){
          opcionesAleatorias.push(this.paisActual.nombre);
        }
          // Agrega el héroe solo si no está ya en las opciones
          if (!opcionesAleatorias.includes(personaje.nombre)) {
          opcionesAleatorias.push(personaje.nombre);
        }

      }

      
      opcionesAleatorias = this.mezclarPaises(opcionesAleatorias)
  
      return opcionesAleatorias;

    }else{
      this.mostrarResultado();
    }

    return []


  }

  public compararOpcion(opcion: any){

    if(opcion == this.paisActual.nombre){
      this.preguntasCorrectas += 1;
      console.log(this.preguntasCorrectas);

    }else{
      this.preguntasIncorrectas += 1;
      console.log(this.preguntasIncorrectas);
    }

    this.paisActual = this.siguientePais
    console.log(this.paisActual);
    this.paisesUsados.push(this.paisActual);

    this.listaOpciones = this.elegirOpciones(4);

    if (this.paises.length > 0) {
      this.siguientePais = this.paises.pop() || null;
      this.paisesRestantes = this.paises.length+1;
    }else {
      this.siguientePais = null; // Termina el juego
      this.paisesRestantes = 0; // Deshabilita el botón de adivinar carta al final del juego
      
    }
  }

  public volverHome(): void { //vuelvo al home

    this.router.navigate(["home"]);

  }

  public reiniciarJuego(){

    this.preguntasCorrectas = 0;
    this.preguntasIncorrectas = 0;
    this.terminado = false;

    this.ngOnInit();
  }

  public mostrarResultado(){
    this.terminado = true;

    if(this.preguntasCorrectas > this.preguntasIncorrectas){
      this.resultado = "Ganaste!!!!!!";
    }else{
      this.resultado = "Perdiste....";
    }
    

  }

  public verDescripcion(){
    this.mostrarDescripcion = true;
  }

  public sacarDescripcion(){
    this.mostrarDescripcion = false;
  }

}
