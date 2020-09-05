import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


/**
 * componente el cual maneja el menu responsive de las diferentes funciones de la app 
 */
@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent{
  


  
  constructor(private router:Router,//instanciacion de clase router el cual se encarga de trasladarse de un componente a otro
    private ngModal:NgbModal) { }//isntanciacion de clase modal para abrir ventana emergente de componente contact



  //metodo para dirigirse al inicio
  inicio() {
    this.router.navigate(["/inicio"]);//navigate recibe por parametro un id o identificador de rutas para hacer posible la navegacion
  }
//metodo para dirigirse a la galeria
  galeria(){
   
    this.router.navigate(['/galeria']);//navigate recibe por parametro un id o identificador de rutas para hacer posible la navegacion
  }
  //metodo para dirigirse a agregar una tarea
  tarea(){
    
    this.router.navigate(['/tarea']);//navigate recibe por parametro un id o identificador de rutas para hacer posible la navegacion
  }
  //metodo para dirigirse a listar tareas
  listarTareas(){
    
    this.router.navigate(['/list-tarea']);//navigate recibe por parametro un id o identificador de rutas para hacer posible la navegacion
  }
  //metodo para abrir modal de contacto ingresa por parametro un modal definido en el .html 
  contacto(modal){
    this.ngModal.open(modal);//metodo open para abrir el modal ingresado por parametro
  }
}
