import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TareaServiceService } from 'src/app/servicios/tarea-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Coordenada } from 'src/app/models/coordenada';
import * as Mapboxgl from 'mapbox-gl'
import { Tarea } from 'src/app/models/tarea';


/**componente el cual se encarga de validar formulario, guardar en base de datos tareas y cargar mapa
 */
@Component({
  selector: 'app-edit-tarea',
  templateUrl: './edit-tarea.component.html',
  styleUrls: ['./edit-tarea.component.css']
})
export class EditTareaComponent implements OnInit {

  tareaForm: FormGroup; //formulario binding "formGroup"
  coordenadas:Coordenada= new Coordenada();// clase o modelo coordenada  el cual guarda la coordenada de marcador
  marker:Mapboxgl.Marker; //marcador donde viene en formato Json latitud y longitud 
  map :Mapboxgl.Map; // mapa mostrado en modal
  tarea:Tarea; // clase o modal donde guarda la tarea del formulario 

  constructor(
    private tareaService: TareaServiceService,//servicio donde hace posible la interaccion crud de nuestras tareas       
    private fb: FormBuilder,//clase donde donde agrupa datos del formulario y hace posible la validacion de los datos 
    private router: Router, //  instanciacion de clase router el cual se encarga de trasladarse de un componente a otro
    private ngmodal:NgbModal    //isntanciacion de clase modal para abrir ventana emergente de componente contact     
        
  ){ }
  //metodo de inicializacion el cual extrae del localstorage el id de la tarea seleccionada anteriormente en la lista de tareas para su cargar y mostrarla
  //en los campos del fomrulario
  ngOnInit() {
    const id= window.localStorage.getItem('idEdit');
    this.tareaService.getTarea(id).valueChanges().subscribe(data => {
      this.tarea= data as Tarea;
      this.tareaForm.setValue(data)  
    })
    this.updateTareaData();   //validador de campos

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


  //metodo que realiza una validacion al formualio 
  updateTareaData() {
    this.tareaForm = this.fb.group({
      nombreTarea: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: [''],
      coordenada: [''],
      status: ['']
    })
  }


 
  //metodo para modificar la tarea
  updateForm(){
    this.tareaService.updateTarea(this.tareaForm.value);    
    alert(this.tareaForm.controls['nombreTarea'].value +' ha sido modificado');
    this.router.navigate(['/list-tarea']); //una ves modificada redirige a la lsita de tarea     
    this.ngmodal.dismissAll();//cierra todos los modales abiertos
    window.localStorage.removeItem('idEdit')//vacia el local storage
  }
  //metodo el cual guarda la coordenada en la variable coordenadas y cierral el modal del mapa 
  guardarCoordenada(){
    alert(this.marker.getLngLat());
    let lngLat = this.marker.getLngLat();
    this.coordenadas.lat=lngLat.lat;
    this.coordenadas.long=lngLat.lng;
    this.tarea.coordenada=this.coordenadas;
    this.tareaService.updateTarea(this.tarea);
    alert("coordenada cambiada");
    this.ngmodal.dismissAll();
  }
  //metodo el cual entra por parametro un modal en este caso para abrir el mapa
  mapModal(modal){
    this.ngmodal.open(modal);
    this.iniMap();
    this.marcador(this.tarea.coordenada.long,this.tarea.coordenada.lat); 
   }
   //metodo inicializador del mapa donde vamos a trabajar
   iniMap() {
    Mapboxgl.accessToken = 'pk.eyJ1IjoianVhbnNlciIsImEiOiJja2VubTdoZ24wdjhwMzBxbXg5aXRpcXE4In0.OCMogAb-ZzugDZZrXP3ewQ'; //en este caso se puede tomar directamente llamando constante environments 
    this.map = new Mapboxgl.Map({
      container: 'map', //contenedor o id de la etiqueta del mapa
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.tarea.coordenada.long ,this.tarea.coordenada.lat ], // long   //lat position
      zoom: 16 //zoom del mapa
    });

    
    this.map.addControl(new Mapboxgl.NavigationControl());
  }
  //metodo que grafica con un marcador la posicion en latitud y longitud
  marcador(long:string,lat:string){
    this.marker = new Mapboxgl.Marker({
      draggable: true
      })
      .setLngLat([long, lat])
      .addTo(this.map);

      this.marker.on('drag',()=>{
       
      })

  }
}
