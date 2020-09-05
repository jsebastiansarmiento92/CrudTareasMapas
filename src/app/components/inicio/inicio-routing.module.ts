import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio.component';


/**
 * modulo de rutas del componente inicio donde pueden agregarse rutas de subcomponentes preferiblemente a partir de este modulo agregados en inicio.module.ts
 */
const routes: Routes = [
  {
      path: '',
      component: InicioComponent,//componente el cual hace parte estas rutas
      children: [
          { path: '', redirectTo: 'inicio', pathMatch: 'prefix' }//las rutas que no cumplan con el identificador o no sean exactas son redirigidas al inicio
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
