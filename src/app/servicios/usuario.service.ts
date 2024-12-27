import { inject, Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, collection, addDoc, getDocs, CollectionReference } from 'firebase/firestore';
import { getAuth,onAuthStateChanged, User, Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { enviroment } from '../../enviromentConfig';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private app: FirebaseApp;//instancia de firebase
  public firestore: Firestore;  // Es el servicio de base de datos de Firebase(cloud fire) q permite interactuar con los documentos y collecciones
  public auth: Auth; //es el servicion de autenticacion con firebase
  currentUser: User | null = null; //es el estado del usuario autenticado

  constructor() { 

    this.app = initializeApp(enviroment); //inicializa una instancia de mi aplicacion de firebase a traves de la configuracion del archivo enviroment
    this.firestore = getFirestore(this.app);//Se inicializa el servicio de Firestore para interactuar con la base de datos asociada a esta instancia de Firebase.
    this.auth = getAuth(this.app);//se inicializa la autenticacion para login,registros etc
    this.initializeAuthListener();//escucha los cambios de autenticacion
  }

  private initializeAuthListener(): void {
    //Este es un listener proporcionado por Firebase Authentication.
    //se activa cada vez que el usuario cambia de estado
    //funcion caalback que recibe el parametro user(representa el usuario autenticado)
    onAuthStateChanged(this.auth, (user: User | null) => {
      this.currentUser = user;
      if (user) {
        console.log("Usuario actual:", user);
      } else {
        console.log("No hay usuario autenticado.");
      }
    });
  }
  public getCurrentUser(): User | null {
    return this.currentUser;
  }
}
