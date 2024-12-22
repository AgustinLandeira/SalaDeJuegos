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
  personajes :any[] = [];//una lista para guardar los personajes
  personajeActual:any | null ;
  personajeAleatorio:any;
  personajesUsados : any[] = [];
  listaOpciones :any[] = [];
  personajesRestantes!: number;
  siguientePersonaje: any;
  preguntasCorrectas : number = 0;
  preguntasIncorrectas : number = 0; 
  terminado: boolean = false;
  resultado:string = "";
  mostrarDescripcion :boolean = false;
  ngOnInit(): void { //es un hook en el cual angular lo llama al momento de crear el componente
      
    this.sub = this.preguntadosApi.getPersonajes()
    .subscribe(data =>{//le asignmos la suscripcion al observable para poder emitir los datos que este representando

      this.personajes = data;//le asigno a mi propiedad los personajes
      this.iniciarJuego();


    });

  }

  ngOnDestroy(): void { //borramos la inscripcion para que no anda dando vueltas a pesar de que se elimine el componente
      this.sub.unsubscribe();
  }

  iniciarJuego(): void {

    this.personajes = this.mezclarPersonajes(this.personajes);
    this.personajeActual = this.elegirPersonaje(this.personajes);
    this.personajesUsados.push(this.personajeActual);
    this.siguientePersonaje = this.personajes.pop() || null;
    this.listaOpciones = this.elegirOpciones(4);
    this.personajesRestantes = this.personajes.length+1;

  }

  elegirPersonaje(lista_personajes: any[]): void {

    const indiceAleatorio = Math.floor(Math.random() * lista_personajes.length);
    this.personajeAleatorio = lista_personajes[indiceAleatorio];

    return this.personajeAleatorio

  }

  mezclarPersonajes(personajes: any[]){

    for (let i = personajes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Índice aleatorio
      [personajes[i], personajes[j]] = [personajes[j], personajes[i]]; // Intercambia elementos
    }

    return personajes;
  }

  elegirOpciones(cantidadPersonajes: number){

    let opcionesAleatorias: string[] = [];
    let listaOpcionesAleatorias: any[] = [];
    listaOpcionesAleatorias = this.personajes.concat(this.personajesUsados);
    const cantidadReal = Math.min(cantidadPersonajes, listaOpcionesAleatorias.length);
    
    if(this.personajeActual != null){// cambio

      while (opcionesAleatorias.length < cantidadReal){

        const randomIndex = Math.floor(Math.random() * listaOpcionesAleatorias.length);
        const personaje = listaOpcionesAleatorias[randomIndex];

        if(!opcionesAleatorias.includes(this.personajeActual.nombre)){
          opcionesAleatorias.push(this.personajeActual.nombre);
        }
          // Agrega el héroe solo si no está ya en las opciones
          if (!opcionesAleatorias.includes(personaje.nombre)) {
          opcionesAleatorias.push(personaje.nombre);
        }

      }

      
      opcionesAleatorias = this.mezclarPersonajes(opcionesAleatorias)
  
      return opcionesAleatorias;

    }else{
      this.mostrarResultado();
    }

    return []


  }

  public compararOpcion(opcion: any){

    if(opcion == this.personajeActual.nombre){
      this.preguntasCorrectas += 1;

    }else{
      this.preguntasIncorrectas += 1;
    }

    this.personajeActual = this.siguientePersonaje
    console.log(this.personajeActual);
    this.personajesUsados.push(this.personajeActual);

    this.listaOpciones = this.elegirOpciones(4);

    if (this.personajes.length > 0) {
      this.siguientePersonaje = this.personajes.pop() || null;
      this.personajesRestantes = this.personajes.length+1;
    }else {
      this.siguientePersonaje = null; // Termina el juego
      this.personajesRestantes = 0; // Deshabilita el botón de adivinar carta al final del juego
      
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
