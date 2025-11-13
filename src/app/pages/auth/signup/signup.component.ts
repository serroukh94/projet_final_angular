import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import {
  FormBuilder, Validators, ReactiveFormsModule,
  AbstractControl, ValidationErrors, FormGroup
} from '@angular/forms';
import { AuthService, User } from '../../../services/auth.service';

function matchPasswords(group: AbstractControl): ValidationErrors | null {
  const pwd = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return pwd && confirm && pwd !== confirm ? { passwordMismatch: true } : null;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      }, { validators: matchPasswords })
    });
  }

  // accès simple dans le template : f.fullName, f.email
  get f(): any { return this.form.controls as any; }
  // accès aux contrôles du sous-groupe : p.password, p.confirmPassword
  get p(): any { return (this.form.get('passwords') as any).controls; }

  onSubmit() {
    console.log('Signup onSubmit invoked, valid=', this.form.valid);
    // show validation errors if any
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      console.warn('Form invalid on submit', this.form);
      return;
    }

    const { fullName, email, passwords } = this.form.value as any;
    const payload: User = { fullName, email, password: passwords.password };

    this.auth.signup(payload).subscribe({
      next: created => {
        console.log('Signup success response', created);
        alert('Compte créé avec succès ! Vous pouvez vous connecter.');
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error('Signup error', err);
        alert('Erreur lors de la création du compte. Vérifiez la connexion au serveur.');
      }
    });
  }
}
