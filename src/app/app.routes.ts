import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';
import { Component } from '@angular/core';
import { HomeComponent } from './componentes/home/home.component';

export const routes: Routes = [

    {path:"",redirectTo:"login",pathMatch:"full"},
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent},
    {path:"home",component:HomeComponent},
    {path:"**", component:PageNotFoundComponent},
];
