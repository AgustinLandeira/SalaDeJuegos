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
  //''
  //'https://rickandmortyapi.com/api/character'
  getPaises(){

    return this.http.get<any>("https://restcountries.com/v3.1/all") // realizamos un metodo http(usamos el get) para extraer los datos y devuelve un observable
    .pipe(map(response =>{ // usamos el pipe para procesar los datos del observable
      //con el map recorremos cada personaje
      return response.map((personaje:{name:any;flags:any;}) =>({ //de cada personaje solamente extraemos su nombre y imagen

        nombre : personaje.name.common,//obtenemos el nombre del personaje
        imagen : personaje.flags.png//personaje.image// obtenemos la imagen del personaje

      }));

    }));
    
  }

}
