import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'// quiere decir que el servicio va a estar disponible en toda la app(no hace falta ponerlo en un modulo)
})
export class PreguntadosApiService  {

  constructor() { }

  http = inject(HttpClient);

  getPersonajes(){

    return this.http.get<any>('https://rickandmortyapi.com/api/character') // realizamos un metodo http(usamos el get) para extraer los datos y devuelve un observable
    .pipe(map(response =>{ // usamos el pipe para procesar los datos del observable
      //con el map recorremos cada personaje
      return response.results.map((personaje:{name:any;image:any;}) =>({ //de cada personaje solamente extraemos su nombre y imagen

        nombre : personaje.name,//obtenemos el nombre del personaje
        imagen : personaje.image// obtenemos la imagen del personaje

      }));

    }));
    
  }

}
