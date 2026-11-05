import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { PropertyList } from './features/properties/property-list/property-list';
import { PropertyForm } from './features/properties/property-form/property-form';
import { PropertyDetails } from './features/properties/property-details/property-details';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'properties', component: PropertyList },
  { path: 'properties/add', component: PropertyForm },
  { path: 'properties/edit/:id', component: PropertyForm },
  { path: 'properties/:id', component: PropertyDetails },
  { path: '**', redirectTo: '' }
];
