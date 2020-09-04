import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  
  mensajeTramitando="";
  //@ViewChild('guardarTelefonoModal', { static: false }) guardarTelefonoModal;
  //@ViewChild('tramitandoModal', { static: false }) tramitandoModal;
  //@ViewChild('mostrarPedidosModal', { static: false }) mostrarPedidosModal;
  
  constructor(private router:Router) { }

  ngOnInit() {
    
  }

  galeria(){
    console.log("ruta de galeria")
    this.router.navigate(['/galeria']);
  }
  tarea(){
    console.log("ruta de galeria")
    this.router.navigate(['/tarea']);
  }
  listarTareas(){
    console.log("ruta de listar tarea")
    this.router.navigate(['/list-tarea']);
  }
}
