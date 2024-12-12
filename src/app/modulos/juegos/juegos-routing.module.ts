import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';
import { MayorMenorrComponent } from './componentes/mayor-menor/mayor-menorr/mayor-menorr.component';

const routes: Routes = [
  {
    path: "preguntados",
    component: PreguntadosComponent
  },

  {
    path: "mayor-menorr",
    component: MayorMenorrComponent

  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
