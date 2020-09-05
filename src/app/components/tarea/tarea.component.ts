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

  public tareaForm: FormGroup;  
  map :Mapboxgl.Map;
  marker:Mapboxgl.Marker;
  coordenadas:Coordenada= new Coordenada();
  constructor( public tareaService: TareaServiceService,  
    public fb: FormBuilder,private router:Router,
    private ngModal:NgbModal      
    ) { }

  
    ngOnInit() {
      
      this.tareaService.getTareaList();  
      this.tareaTForm();     
      
    }
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
    iniMap() {
      Mapboxgl.accessToken = 'pk.eyJ1IjoianVhbnNlciIsImEiOiJja2VubTdoZ24wdjhwMzBxbXg5aXRpcXE4In0.OCMogAb-ZzugDZZrXP3ewQ';
      this.map = new Mapboxgl.Map({
        container: 'map', 
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.08005221644875 ,4.624016228049641 ], // long 73.356226  //lat 5.5415653 position
        zoom: 16 
      });
  
 
      this.map.addControl(new Mapboxgl.NavigationControl());
    }
  
    tareaTForm() {
      this.tareaForm = this.fb.group({
        nombreTarea: ['', [Validators.required, Validators.minLength(2)]],
        descripcion: [''],
        coordenada: [''],
        status: [''],
      })  
    }
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
  
   
  
 
    ResetForm() {
      this.tareaForm.reset();
    }  
   
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

     mapModal(modal){
      
      this.ngModal.open(modal);
      this.iniMap();
      this.marcador('-74.08005221644875','4.624016228049641'); 
     }
}
