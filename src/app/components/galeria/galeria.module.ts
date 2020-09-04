import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GaleriaRoutingModule } from './galeria-routing.module';
import { FormsModule } from '@angular/forms';
import { GaleriaComponent } from './galeria.component';


@NgModule({
  imports: [
      CommonModule,
      //TranslateModule,
    GaleriaRoutingModule
  ],
  declarations: [GaleriaComponent],
 
})
export class GaleriaModule { }
