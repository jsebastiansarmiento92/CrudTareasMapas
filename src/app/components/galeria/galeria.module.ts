import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GaleriaRoutingModule } from './galeria-routing.module';
import { GaleriaComponent } from './galeria.component';

//modulo galeria donde se importan modulos para uso de funcionalidades o declara componentes en su mayor hijos 
//importante a tener en cuenta es que solo se permite una declaracion de modulo ejemplo si galeria component esta declarada en este modulo
//al llamarlo en otro genera error de redundancia (es muy comun), galeria  ya que es un compoennte el cual muestra imagenes se declara directamente en este modulo
//ya que no ocupa ningun otro modulo de funcion ejemplo de formularios, rutas, alertas ngx etc..
@NgModule({
  imports: [
    CommonModule,
    GaleriaRoutingModule
  ],
  declarations: [GaleriaComponent],

})
export class GaleriaModule { }
