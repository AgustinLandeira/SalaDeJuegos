import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MyApp';

  constructor(router: Router) {

  }
}
