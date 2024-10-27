import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { PageNotFoundComponent } from './componentes/page-not-found/page-not-found.component';

export const routes: Routes = [

    {path:"",redirectTo:"/home",pathMatch:"full"},
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent},
    {path:"**", component:PageNotFoundComponent},
];
