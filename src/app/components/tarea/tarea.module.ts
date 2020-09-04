import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TareaRoutingModule } from './tarea-routing.module';
import { TareaComponent } from './tarea.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListTareasComponent } from './list-tareas/list-tareas.component';
import { NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { EditTareaComponent } from './edit-tarea/edit-tarea.component';


@NgModule({
  imports: [
      CommonModule,
      //TranslateModule,
    TareaRoutingModule,
    ReactiveFormsModule,
    NgbModalModule
    
     
  ],
  declarations: [TareaComponent, ListTareasComponent, EditTareaComponent],
 
})
export class TareaModule { }
