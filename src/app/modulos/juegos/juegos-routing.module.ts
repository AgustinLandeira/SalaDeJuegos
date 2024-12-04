import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';

const routes: Routes = [
  {
    path: "preguntados",
    component: PreguntadosComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
