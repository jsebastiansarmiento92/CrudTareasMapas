import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { TareaServiceService } from 'src/app/servicios/tarea-service.service';
import { Router } from '@angular/router';
import { Tarea } from 'src/app/models/tarea';
import { Coordenada } from 'src/app/models/coordenada';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as Mapboxgl from 'mapbox-gl'



@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {

  public tareaForm: FormGroup;  //formulario binding "formGroup"
  map :Mapboxgl.Map;// mapa mostrado en modal
  marker:Mapboxgl.Marker;//marcador donde viene en formato Json latitud y longitud 
  coordenadas:Coordenada= new Coordenada();// clase o modelo coordenada  el cual guarda la coordenada de marcador


  constructor( public tareaService: TareaServiceService,  //servicio donde hace posible la interaccion crud de nuestras tareas   
    public fb: FormBuilder,private router:Router,//instanciacion de clase router el cual se encarga de trasladarse de un componente a otro
    private ngModal:NgbModal      //isntanciacion de clase modal para abrir ventana emergente de componente contact
    ) { }

    //metodo que inicializa la conexion o referencia de la crud
    ngOnInit() {
      this.tareaService.getTareaList();  //inicializador de referencia
      this.tareaTForm();     //valdiador de campos en los input
    }
    //metodo que grafica con un marcador la posicion en latitud y longitud
    marcador(long:string,lat:string){
      this.marker = new Mapboxgl.Marker({
        draggable: true
        })
        .setLngLat([long, lat])
        .addTo(this.map);

        this.marker.on('drag',()=>{
          console.log(this.marker.getLngLat()) ;
        })

    }
      //metodo inicializador del mapa donde vamos a trabajar
    iniMap() {
      Mapboxgl.accessToken = 'pk.eyJ1IjoianVhbnNlciIsImEiOiJja2VubTdoZ24wdjhwMzBxbXg5aXRpcXE4In0.OCMogAb-ZzugDZZrXP3ewQ';
      this.map = new Mapboxgl.Map({
        container: 'map', //contenedor o id de la etiqueta del mapa
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.08005221644875 ,4.624016228049641 ], // long 73.356226  //lat 5.5415653 position
        zoom: 16 //zoom del mapa
      });
  
 
      this.map.addControl(new Mapboxgl.NavigationControl());
    }
  //metodo que realiza una validacion al formualio 
    tareaTForm() {
      this.tareaForm = this.fb.group({
        nombreTarea: ['', [Validators.required, Validators.minLength(2)]],
        descripcion: [''],
        coordenada: [''],
        status: [''],
      })  
    }
    //metodo el cual guarda la coordenada en la variable coordenadas y cierral el modal del mapa 
    guardarCoordenada(){
      alert(this.marker.getLngLat());
      let lngLat = this.marker.getLngLat();
      console.log("lo que sale "+lngLat);
     
      this.coordenadas.lat=lngLat.lat;
      this.coordenadas.long=lngLat.lng;
      console.log("lo que se guarda en this.coordenadas");
      console.log(this.coordenadas);
      this.ngModal.dismissAll();
    }
     
   
    get nombreTarea() {
      return this.tareaForm.get('nombreTarea');
    }
  
    get descripcion() {
      return this.tareaForm.get('descripcion');
    }  
  
    get coordenada() {
      return this.tareaForm.get('coordenada');
    }
  
   
  
    //resetea o pone en blanco los campos del formulario
    ResetForm() {
      this.tareaForm.reset();
    }  
    //metodo el cual guarda la tarea 
    submitTareaData() {
      let tarea=new Tarea();
      let coordenada= new Coordenada();
      tarea.descripcion=this.tareaForm.value.descripcion;
      tarea.nombreTarea=this.tareaForm.value.nombreTarea;
      tarea.coordenada=this.coordenadas;
      tarea.status=false;
      console.log(tarea);
      
      this.tareaService.addTarea(tarea); 
      alert(this.tareaForm.controls['nombreTarea'].value + ' tarea ha sido agregada!')
      this.router.navigate(["tarea/list-tarea"]);
    
      this.ResetForm();  
     };
//metodo el cual entra por parametro un modal en este caso para abrir el mapa
     mapModal(modal){
      this.ngModal.open(modal);
      this.iniMap();
      this.marcador('-74.08005221644875','4.624016228049641'); 
     }
}
