import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { CarsListComponent } from './pages/cars-list/cars-list.component';
import { CarDetailComponent } from './pages/car-detail/car-detail.component';
import { BookingComponent } from './pages/booking/booking.component';
import { QuoteComponent } from './pages/quote/quote.component';
import { QuoteSummaryComponent } from './pages/quote-summary/quote-summary.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'cars', component: CarsListComponent },
  { path: 'cars/:id', component: CarDetailComponent },
  { path: 'booking', component: BookingComponent, canActivate: [authGuard] },
  { path: 'quote', component: QuoteComponent, canActivate: [authGuard] },
  { path: 'quote-summary', component: QuoteSummaryComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
