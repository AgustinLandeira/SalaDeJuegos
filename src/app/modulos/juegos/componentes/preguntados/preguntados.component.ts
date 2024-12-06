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
  ngOnInit(): void { //es un hook en el cual angular lo llama al momento de crear el componente
      
    this.sub = this.preguntadosApi.getPersonajes()
    .subscribe(data =>{//le asignmos la suscripcion al observable para poder emitir los datos que este representando

      this.personajes = data;//le asigno a mi propiedad los personajes

    });

  }

  ngOnDestroy(): void { //borramos la inscripcion para que no anda dando vueltas a pesar de que se elimine el componente
      this.sub.unsubscribe();
  }





  public volverHome(): void { //vuelvo al home

    this.router.navigate(["home"]);

  }

}
