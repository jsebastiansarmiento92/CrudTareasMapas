import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio.component';



const routes: Routes = [
  {
      path: '',
      component: InicioComponent,
      children: [
          { path: '', redirectTo: 'inicio', pathMatch: 'prefix' }
          

          
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
