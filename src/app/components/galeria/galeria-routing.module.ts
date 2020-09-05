import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GaleriaComponent } from './galeria.component';

/**
 * modulo de rutas del componente galeria donde pueden agregarse rutas de subcomponentes preferiblemente a partir de este modulo agregados en galeria.module.ts
 */
const routes: Routes = [
  {
      path: '',
      component: GaleriaComponent, //componente el cual hace parte estas rutas
      children: [
          { path: '', redirectTo: 'inicio', pathMatch: 'prefix' } //las rutas que no cumplan con el identificador o no sean exactas son redirigidas al inicio
      ]
  }
];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GaleriaRoutingModule { }
