import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TareaComponent } from './tarea.component';


/**
 * modulo de rutas del componente tarea donde pueden agregarse rutas de subcomponentes preferiblemente a partir de este modulo agregados en tarea.module.ts
 */

const routes: Routes = [
  {
      path: '',
      component: TareaComponent,
      children: [
          { path: '', redirectTo: 'inicio', pathMatch: 'prefix' },
          { path: 'list-tarea', loadChildren: () => import('./list-tareas/list-tareas.module').then(m => m.ListTareasModule)},
          {path: '**', redirectTo: 'inicio', pathMatch: 'full'}

          
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TareaRoutingModule { }
