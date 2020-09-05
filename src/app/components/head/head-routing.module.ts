import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HeadComponent } from './head.component';
/**
 * modulo de rutas del componente head donde pueden agregarse rutas de subcomponentes preferiblemente a partir de este modulo agregados en head.module.ts
 */
const routes: Routes = [
  { 
    path: '', component: HeadComponent, 
    children: [
    ]
  }
];

//en este caso head no desprende rutas hijas, esta funcion la hace el "app-routing.module" y en este estan las importaciones generales para los componentes hijos 
//en su amyoria usan formularios, modales, el uso de firebase y formularios reactivos.
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeadRoutingModule { }
