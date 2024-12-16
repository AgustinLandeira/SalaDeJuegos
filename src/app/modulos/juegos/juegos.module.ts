import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';
import { MayorMenorrComponent } from './componentes/mayor-menor/mayor-menorr/mayor-menorr.component';
import { AhorcadoComponent } from './componentes/ahorcado/ahorcado/ahorcado.component';


@NgModule({
  declarations: [PreguntadosComponent,MayorMenorrComponent,AhorcadoComponent],
  exports: [PreguntadosComponent,MayorMenorrComponent,AhorcadoComponent],
  imports: [
    CommonModule,
    JuegosRoutingModule
  ]
})
export class JuegosModule { }
