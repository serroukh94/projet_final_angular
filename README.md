# 🚗 Location de Voiture - Projet Final Angular

## 📋 Description du Projet

Application web de **location de voitures courte durée** en région parisienne, développée avec **Angular 19** et **JSON Server**. L'application permet aux utilisateurs de consulter une flotte de véhicules (manuels et automatiques), créer un compte, réserver une voiture et demander des devis personnalisés.

### ✨ Fonctionnalités Principales

- **Catalogue de véhicules** : Consultation de la flotte avec filtrage par type de transmission
- **Authentification complète** : Inscription et connexion des utilisateurs
- **Réservation en ligne** : Formulaire de réservation avec calcul automatique du prix
- **Demande de devis** : Formulaire détaillé avec options kilométriques et page de résumé imprimable
- **Gestion de session** : Persistance de la connexion avec localStorage
- **Design responsive** : Interface moderne et adaptée mobile

---

## 🎯 Consignes du Projet

### Exigences Techniques Respectées

#### ✅ **Authentification**
- Inscription avec validation de mot de passe (validator custom `matchPasswords`)
- Connexion avec gestion de session via `AuthService`
- Affichage conditionnel du header selon l'état de connexion

#### ✅ **Routing (7 routes)**
1. `/` - Page d'accueil
2. `/login` - Connexion
3. `/signup` - Inscription
4. `/cars` - Liste des voitures
5. `/cars/:id` - Détail d'une voiture **(route avec paramètre)**
6. `/booking` - Réservation
7. `/quote` - Demande de devis
8. `/quote-summary` - Résumé du devis

#### ✅ **Composants**
- **CarCardComponent** : Composant réutilisable avec `@Input` (car) et `@Output` (reserve)
  - Utilisé dans `HomeComponent` (section manuelles + automatiques)
  - Utilisé dans `CarsListComponent` (liste complète)
- Composants par page : Home, Login, Signup, CarsList, CarDetail, Booking, Quote, QuoteSummary

#### ✅ **Services (3)**
1. **AuthService** : Authentification et gestion de session (localStorage)
2. **CarsService** : Gestion des voitures (GET all, GET by id)
3. **BookingsService** : Gestion des réservations (POST booking)

#### ✅ **HTTP & Backend**
- **JSON Server** sur port 3000
- **Proxy Angular** configuré (`/api` → `http://localhost:3000`)
- **3 tables** :
  - `users` - Utilisateurs inscrits
  - `cars` - Catalogue de véhicules (10 voitures)
  - `bookings` - Réservations effectuées

#### ✅ **Reactive Forms**
- **LoginComponent** : FormGroup avec email + password
- **SignupComponent** : FormGroup avec email + password + confirmPassword
- **BookingComponent** : FormGroup avec 6 FormControls (fullName, email, carModel, startDate, endDate, message)
- **QuoteComponent** : FormGroup avec 8 FormControls (fullName, email, phone, carModel, startDate, endDate, kmOption, message)

#### ✅ **Validator Custom**
- `matchPasswords` dans `SignupComponent` : Vérifie que password === confirmPassword

#### ✅ **Pipe Custom**
- `CurrencyEurPipe` : Formate les prix en euros (ex: `50 | currencyEur` → `50,00 €`)
- Utilise `Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'})`

#### ✅ **Directive Custom**
- `HighlightDirective` : Effet de survol sur les cartes de voiture
- Ajoute/retire la classe `.is-highlighted` sur `mouseenter`/`mouseleave`
- Styling CSS : élévation, ombre, translation verticale

---

## 🚀 Installation et Lancement

### Prérequis
- Node.js (v18+)
- npm ou yarn

### Installation

```bash
# Cloner le projet
git clone <url-du-repo>
cd final_angular

# Installer les dépendances
npm install
```

### Lancement

**Terminal 1 - Backend (JSON Server)**
```bash
npx json-server --watch db.json --port 3000
```

**Terminal 2 - Frontend (Angular)**
```bash
npm start
```

L'application sera accessible sur **http://localhost:4200/**

---

## 📁 Structure du Projet

```
src/app/
├── components/
│   └── car-card/              # Composant carte voiture (réutilisable)
├── directives/
│   └── highlight.directive.ts # Directive de survol
├── pipes/
│   └── currency-eur.pipe.ts   # Pipe formatage EUR
├── services/
│   ├── auth.service.ts        # Service authentification
│   ├── cars.service.ts        # Service voitures
│   └── bookings.service.ts    # Service réservations
├── pages/
│   ├── auth/
│   │   ├── login/             # Page connexion
│   │   └── signup/            # Page inscription
│   ├── home/                  # Page d'accueil
│   ├── cars-list/             # Liste des voitures
│   ├── car-detail/            # Détail d'une voiture
│   ├── booking/               # Formulaire de réservation
│   ├── quote/                 # Formulaire de devis
│   └── quote-summary/         # Résumé du devis
├── app.component.ts           # Composant racine
├── app.routes.ts              # Configuration routing
└── app.config.ts              # Configuration Angular
```

---

## 🎨 Fonctionnalités Détaillées

### 1. Catalogue de Voitures
- Affichage de 10 véhicules (Peugeot, Renault, Citroën, BMW, Mercedes...)
- Filtrage automatique : Manuelles vs Automatiques
- Prix affichés avec le pipe custom `currencyEur`
- Effet hover avec la directive `highlight`

### 2. Système d'Authentification
- **Inscription** : Validation email + correspondance des mots de passe
- **Connexion** : Stockage du user dans localStorage
- **Session persistante** : L'utilisateur reste connecté même après rafraîchissement
- **Header dynamique** : Affiche nom + email + bouton déconnexion si connecté

### 3. Réservation de Voiture
- **Pré-remplissage automatique** : Email et nom si utilisateur connecté
- **Sélection de voiture** : Dropdown avec toutes les voitures disponibles
- **Calcul de prix automatique** : Prix = (Nb jours × Prix/jour)
- **Validation des dates** : Date de fin >= Date de début
- **Enregistrement en base** : Stockage dans la table `bookings` via `BookingsService`

### 4. Demande de Devis
- **Formulaire complet** : Nom, email, téléphone, voiture, dates, options km
- **Options kilométriques** :
  - Standard : 200 km/jour (inclus)
  - Illimité : +15€/jour
- **Page de résumé élégante** :
  - Numéro de référence unique
  - Récapitulatif client + voiture + dates
  - Calcul tarifaire détaillé
  - Boutons : Imprimer / Réserver / Retour
  - Design print-friendly

---

## 🛠️ Technologies Utilisées

- **Angular 19.2.0** (Standalone Components)
- **TypeScript**
- **RxJS** (Observables)
- **JSON Server** (Mock backend)
- **CSS3** (Animations & Responsive)

---

## 👥 Équipe

Groupe de 3 personnes

---

## 📝 Notes Importantes

### Conditions d'Assurance
- Assurance incluse dans le prix
- Franchise 250€ pour dégâts simples (<2000€)
- Franchise 1000€ pour dégâts importants (>2000€)

### Limites Kilométriques
- **Standard** : 200 km/jour inclus
- **Illimité** : Option disponible avec supplément

### Contact
- **WhatsApp** : +33 6 12 19 30 50
- **Zone** : Région parisienne

---

## 🎓 Consignes Académiques

Faire un projet from scratch avec sujet libre
Groupe de 3 personnes
Les features Angular nécessaires :
Une authentification
Inscription / Connexion
Routing
Au minimum 3 routes
Dont au minimum une qui transmet une donnée à travers la route
Composant
Au minimum un par page
Au minimum un composant utilisé 2 fois
Au minimum 1 Input
Au minimum 1 Output
Service
Au minimum 2
HTTP
Communication avec un backend (json-server ou autre)
Minimum 3 tables
Reactive Forms
Minimum 3 FormControl
Attention ce form est en plus des 2 pour l'authentifications
Validator Custom
Minimum 1
Pipe Custom
Minimum 1
Directive Custom
Minimum 1