import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AyudaLineaRoutingModule } from './ayuda-linea-routing.module';
import { AyudaLineaComponent } from './ayuda-linea.component';

@NgModule({
  declarations: [AyudaLineaComponent],
  imports: [
    CommonModule,
    AyudaLineaRoutingModule
  ]
})
export class AyudaLineaModule { }
