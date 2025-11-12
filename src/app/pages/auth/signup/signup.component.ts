import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
      }, { validators: matchPasswords })
    });
  }

  // Cast to any so templates can access controls with dot syntax (f.fullName, f.email)
  get f(): any { return this.form.controls as any; }
  // p is the controls object of the nested passwords group
  get p(): any { return (this.form.get('passwords') as any).controls; }

  onSubmit() {
    if (this.form.invalid) return;
    const { fullName, email, passwords } = this.form.value;
    const payload = { fullName, email, password: passwords?.password };
    // Temporaire : on affichera juste les valeurs (API plus tard)
    console.log('SIGNUP DATA', payload);
  }
}
