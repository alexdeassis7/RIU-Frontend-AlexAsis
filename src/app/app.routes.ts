import { Routes } from '@angular/router';
import { SuperheroListComponent } from './components/superhero-list/superhero-list.component';
import { SuperheroFormComponent } from './components/superhero-form/superhero-form.component';
import { SuperheroListResolver } from './resolvers/superhero-list.resolver';
import { MissingHeroComponent } from './components/missing-hero/missing-hero.component'; // 👈

export const routes: Routes = [
  {
    path: '',
    component: SuperheroListComponent,
    resolve: { heroes: SuperheroListResolver }
  },
  { path: 'add', component: SuperheroFormComponent },
  { path: 'edit/:id', component: SuperheroFormComponent },
  { path: 'edit', component: MissingHeroComponent },
  { path: '**', redirectTo: '/' }
];
