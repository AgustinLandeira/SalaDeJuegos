import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-quien-soy',
  standalone: true,
  imports: [NgFor,FormsModule,CommonModule,RouterModule ],
  templateUrl: './quien-soy.component.html',
  styleUrl: './quien-soy.component.css'
})
export class QuienSoyComponent {

  imagen : string = "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/imagen_2024-10-30_152645527.png?alt=media&token=a568bb63-47a2-4c39-92d9-6e71800c6242"
  nombre:string = "Agustin Landeira";
  dni:string = "45580032";
  legajo : string = "114519"
  descripcion : string = "Actualmento soy estudiante en la UTN para tener el titulo de desarrollador de software en un futuro.";
  contacto: string = 'landeira2017@gmail.com';

  constructor(private router:Router){}

  lenguajes : {nombre: string, imagen : string}[] = [
    {nombre: "Python", imagen: "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/Python.svg.png?alt=media&token=a1b208c9-f4cf-4583-b8f9-45d750c0fef4"},
    {nombre: "Php",imagen : "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/PHP.svg.png?alt=media&token=3ed9eaaa-a9ec-4944-95a7-7718956ba4cf"},
    {nombre: "Typescript",imagen :"https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/Typescript.svg.png?alt=media&token=8f34b825-7359-4579-833a-70784e012a5f"},
    {nombre: "C#",imagen : "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/C_Sharp.svg.png?alt=media&token=e1594a89-308d-4657-b8d9-330265ebd498"},
    {nombre: "HTML",imagen : "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/HTML5.svg.png?alt=media&token=c2c6bd49-138f-4dc8-93dc-73a5b40e5cdd"},

  ]

  frameworks : {frkNombre: string,imagen: string}[]= [

    {frkNombre: "Angular",imagen: "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/Angular.svg.png?alt=media&token=dca1e9bb-4126-4aae-893f-efeaf585f608"},
    {frkNombre: "Slim", imagen:"https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/slim.png?alt=media&token=44edc445-be3c-4996-9056-6eb5946984f0"}
  ]

  entornoTrabajo : {entorno : string ,imagen : string}[] = [
    {entorno: "VisualStudioCode",imagen: "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/Visual_Studio_Code.svg.png?alt=media&token=7af515be-8bc3-4564-aadc-3f0577b83e62"},
    {entorno: "VisualStudio",imagen: "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/Visual_Studio.svg.png?alt=media&token=cccf7238-6292-4395-a26e-01c2740f3dfe"}
  ]

  entorno : {nombre: string, imagen: string}[] = [
    {nombre: "NodeJs",imagen: "https://firebasestorage.googleapis.com/v0/b/sala-de-juegos-1c9ea.appspot.com/o/Node.js.svg.png?alt=media&token=fe407132-01aa-4d8f-9171-4eedb35fec3c"}
  ]
  
  
  Volver(){
    this.router.navigate(["home"]);
  }
}
