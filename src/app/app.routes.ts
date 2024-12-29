import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { Component } from '@angular/core';
import { HomeComponent } from './componentes/home/home.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { FormularioComponent } from './componentes/formulario/formulario.component';
import { formGuard } from './guards/form.guard';
import { authServiceGuard } from './guards/auth-service.guard';

export const routes: Routes = [

    {path:"",redirectTo:"login",pathMatch:"full"},
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent},
    {path:"home",component:HomeComponent,canActivate:[authServiceGuard]},
    {path:"quien-soy",component:QuienSoyComponent,canActivate:[authServiceGuard]},
    {path:"formulario",component:FormularioComponent,canDeactivate:[formGuard]},
    { //para acceder a un modulo
        path:"juegos",// el import le pasa la ruta relativa y devuelve una promesa y el .then muestra lo que devuelve
        canActivate:[authServiceGuard],
        loadChildren: () => import("./modulos/juegos/juegos.module").then(m => m.JuegosModule)
    },
    {path:"**", component:PageNotFoundComponent},
];
