import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListTareasComponent } from './list-tareas.component';



const routes: Routes = [
  {path: '',component: ListTareasComponent,
  children: [
    {path: '', redirectTo: 'inicio', pathMatch: 'prefix'},
  { path: 'list-tarea', loadChildren: () => import('./list-tareas.module').then(m => m.ListTareasModule)},
  {path: '**', redirectTo: 'inicio', pathMatch: 'full'}
]
  }
];


@NgModule({
  declarations: [],
  imports:  [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ListTareasRoutingModule { }
