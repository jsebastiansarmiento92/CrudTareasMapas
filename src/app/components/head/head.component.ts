import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  
  mensajeTramitando="";

  
  constructor(private router:Router,private ngModal:NgbModal) { }

  ngOnInit() {
    
  }

  galeria(){
   
    this.router.navigate(['/galeria']);
  }
  tarea(){
    
    this.router.navigate(['/tarea']);
  }
  listarTareas(){
    
    this.router.navigate(['/list-tarea']);
  }
  contacto(modal){
    this.ngModal.open(modal);
  }
}
