import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';


//modulo el cual llama a las rutas del inicio en dado caso se requiera que este inico tenga rutas hijos
@NgModule({
  imports: [
      CommonModule,
    InicioRoutingModule
  ],
  declarations: [InicioComponent],//el inicio se declara independiente en su propio modulo quiere decir que el modulo padre no llama este componente
 
})
export class InicioModule { }
