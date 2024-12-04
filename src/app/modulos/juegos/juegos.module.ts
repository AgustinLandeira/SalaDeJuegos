import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';


@NgModule({
  declarations: [PreguntadosComponent],
  exports: [PreguntadosComponent],
  imports: [
    CommonModule,
    JuegosRoutingModule
  ]
})
export class JuegosModule { }
