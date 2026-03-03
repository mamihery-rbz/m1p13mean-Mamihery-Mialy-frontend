import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-shopper',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-shopper.component.html',
  styleUrl: './login-shopper.component.css'
})
export class LoginShopperComponent {
  name: string = 'toto';
  password: string = '1234';
  role: string = 'USER';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  onLogin() {
    this.authService.login(this.name, this.password, this.role)
      .subscribe({
        next: (response) => {
          const token = response.result.token;
          const user = response.result.user;
          const shop = response.result.shop;
          const message = response.success;

          this.authService.saveToken(token);
          this.authService.saveUser(user);
          this.authService.saveShop(shop);
          this.router.navigate(['/home-page-shopper']);
        },
        error: (err) => {
          console.log(err);

          if (err.error && err.error.error) {
            this.errorMessage = err.error.error;  // ← ton message backend
          } else {
            alert("Une erreur est survenue");
          }
        }
      });
  }
}
