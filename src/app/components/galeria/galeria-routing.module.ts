import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GaleriaComponent } from './galeria.component';

const routes: Routes = [
  {
      path: '',
      component: GaleriaComponent,
      children: [
          { path: '', redirectTo: 'inicio', pathMatch: 'prefix' }
          
 
          
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GaleriaRoutingModule { }
