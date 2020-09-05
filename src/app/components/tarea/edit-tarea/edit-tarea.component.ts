import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TareaServiceService } from 'src/app/servicios/tarea-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Coordenada } from 'src/app/models/coordenada';
import * as Mapboxgl from 'mapbox-gl'
import { Tarea } from 'src/app/models/tarea';



@Component({
  selector: 'app-edit-tarea',
  templateUrl: './edit-tarea.component.html',
  styleUrls: ['./edit-tarea.component.css']
})
export class EditTareaComponent implements OnInit {

  tareaForm: FormGroup; 
  coordenadas:Coordenada= new Coordenada();
  marker:Mapboxgl.Marker;
  map :Mapboxgl.Map;
  tarea:Tarea;

  constructor(
    private tareaService: TareaServiceService,       
    private fb: FormBuilder,            
    private location: Location,         
    private actRoute: ActivatedRoute,  
    private router: Router, 
    private ngmodal:NgbModal         
        
  ){ }

  ngOnInit() {
    console.log("ingreso a lo init de editar");
    const id= window.localStorage.getItem('idEdit');
    console.log("id es "+ id)
    this.tareaService.getTarea(id).valueChanges().subscribe(data => {
      console.log(data);
      this.tarea= data as Tarea;
      console.log("tarea es:")
      console.log(this.tarea);
      this.tareaForm.setValue(data)  
    })
    this.updateTareaData();   
    
  
    
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
  get status() {
    return this.tareaForm.get('status');
  }



  updateTareaData() {
    this.tareaForm = this.fb.group({
      nombreTarea: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: [''],
      coordenada: [''],
      status: ['']
    })
  }


  goBack() {
    this.location.back();
  }


  updateForm(){
    console.log(this.tareaForm.value);
    this.tareaService.updateTarea(this.tareaForm.value);    
    alert(this.tareaForm.controls['nombreTarea'].value +' ha sido modificado');
    this.router.navigate(['/list-tarea']);      
    this.ngmodal.dismissAll();
    window.localStorage.removeItem('idEdit')
  }
  guardarCoordenada(){
    alert(this.marker.getLngLat());
    let lngLat = this.marker.getLngLat();
    console.log("lo que sale "+lngLat);
    this.coordenadas.lat=lngLat.lat;
    this.coordenadas.long=lngLat.lng;
    console.log("lo que se guarda en this.coordenadas");
    console.log(this.coordenadas);
    this.tarea.coordenada=this.coordenadas;
    this.tareaService.updateTarea(this.tarea);
    alert("coordenada cambiada");
    this.ngmodal.dismissAll();
  }
  
  mapModal(modal){
      
    this.ngmodal.open(modal);
    this.iniMap();
    this.marcador(this.tarea.coordenada.long,this.tarea.coordenada.lat); 
   }
   iniMap() {
    Mapboxgl.accessToken = 'pk.eyJ1IjoianVhbnNlciIsImEiOiJja2VubTdoZ24wdjhwMzBxbXg5aXRpcXE4In0.OCMogAb-ZzugDZZrXP3ewQ';
    this.map = new Mapboxgl.Map({
      container: 'map', 
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.tarea.coordenada.long ,this.tarea.coordenada.lat ], // long 73.356226  //lat 5.5415653 position
      zoom: 16 
    });


    this.map.addControl(new Mapboxgl.NavigationControl());
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
}
