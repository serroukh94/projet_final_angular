import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService, User } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'final_angular';

  constructor(public auth: AuthService) {}

  get currentUser(): User | null {
    return this.auth.getCurrentUser();
  }

  logout(): void {
    this.auth.logout();
    window.location.reload();
  }
}
