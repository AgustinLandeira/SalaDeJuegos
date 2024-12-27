import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../servicios/usuario.service';

export const authServiceGuard: CanActivateFn = (route, state) => {
  
  let auth = inject(UsuarioService);
  let router = inject(Router);

  if(auth.getCurrentUser()){
    return true
  }else{
    router.navigate(["login"]);
    return false
  }
};
