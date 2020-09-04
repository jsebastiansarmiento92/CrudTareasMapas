import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioRoutingModule } from './inicio-routing.module';
import {FormsModule}from '@angular/forms';
import { InicioComponent } from './inicio.component';

import { PipeSearchPipe } from './pipe/pipe-search.pipe';





@NgModule({
  imports: [
      CommonModule,
      //TranslateModule,
    InicioRoutingModule,
     FormsModule
     
  ],
  declarations: [InicioComponent, PipeSearchPipe],
 
})
export class InicioModule { }