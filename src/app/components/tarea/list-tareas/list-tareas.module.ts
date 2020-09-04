import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTareasRoutingModule } from './list-tareas-routing.module';
import { ListTareasComponent } from './list-tareas.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
   
    ListTareasRoutingModule,
    NgxPaginationModule,
    
 
  ]
})
export class ListTareasModule { }
