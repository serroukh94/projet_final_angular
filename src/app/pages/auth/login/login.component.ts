import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // Cast to any so templates can access controls with dot syntax (f.email, f.password)
  get f(): any { return this.form.controls as any; }


  onSubmit() {
    if (this.form.invalid) return;
    // Temporaire : on affichera juste les valeurs (on branchera l’API plus tard)
    console.log('LOGIN DATA', this.form.value);
  }
}
