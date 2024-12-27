import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, addDoc, collection,collectionData } from '@angular/fire/firestore';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  
  form!:FormGroup;
  seguir = false;
  usuarioLogeado!: any;
  sub!: Subscription;
  listaUsers:any[] = [];


  public constructor(private fb: FormBuilder,public auth:Auth,public router: Router,private fireStore: Firestore){}

  public ngOnInit(): void{

    this.form = this.fb.group(
      {
      //aca,cada uno de mis controles(usuario,nombre etc)
      //cada control recibe un array en donde el primer elemento es valor por defecto y un array de validadores
      nombreCompleto : ["",[Validators.pattern('^[a-zA-Z ]+$'),Validators.required]],
      telefono: ["",[Validators.required,Validators.pattern(/^\d{10}$/),Validators.pattern(/^\d+$/)]],
      edad: ["",[Validators.min(18),Validators.required,Validators.pattern(/^\d+$/)]],//validator.min(18) es decir que la edad minima sea 18
      comentarios: ["",[Validators.required]],
      recomendar: ["",Validators.required]


      //validator es un metodo que evalua el valor el valor del contro y me dice si es correcto o no
      //validator.pattern(para usar rgex),validator.requiered(para que el campo sea requerido)
      //IMPORTNTE: se tienen que cumplir todos los validadores para q el control sea valido
      //validator.minlenght(4) un minimo de caracteres
    });

    const col = collection(this.fireStore,"encuesta");

    this.sub = collectionData(col).subscribe((respuesta:any) => {

      this.listaUsers = respuesta.map((item: { id: any; }) =>({
      idUsuario: item.id
      }));
    });

  }

  public enviar():void{
    
    let col = collection(this.fireStore,"encuesta");//obtenemos la coleccion de firebase
    let obj = this.form.value;//la info que vamos agregar

    obj["id"] = this.form.get("nombreCompleto")?.value;
    addDoc(col,obj);//lo subimos a firebase

    this.showSuccessAlert("Puedes completarla otra vez");
    this.form.reset();//reiniciamos el formulario

    this.ngOnInit();

    // for(let control in this.form.value){

    //   this.form.setValue(control)
    // }
  }

  private showSuccessAlert(message: string) { // nos muestra el mensaje de exito
    return Swal.fire({
      title: 'Encuesta enviada',
      text: message,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  public volver(): void {

    this.router.navigate(["home"]);

  }

}
