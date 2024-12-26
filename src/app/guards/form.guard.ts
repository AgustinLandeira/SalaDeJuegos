import { Form } from '@angular/forms';
import { CanDeactivateFn } from '@angular/router';
import { FormularioComponent } from '../componentes/formulario/formulario.component';
import { Component } from '@angular/core';

//canDeactiveGuard se usa para formularios,no me deja salir de una ruta con datos al rededor
export const formGuard: CanDeactivateFn<FormularioComponent> = (component, currentRoute, currentState, nextState) => {
  
  let formularioModificado = component.form.value

  for(let control in formularioModificado){

    let valor = component.form.get(control)?.value;

    if(valor != ""){

      alert("Advertencia!!.Hay campos con datos.");
      return false;

  }
  }
  

  return true;

};

