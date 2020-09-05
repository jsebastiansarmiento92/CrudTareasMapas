import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/models/tarea';
import { TareaServiceService } from 'src/app/servicios/tarea-service.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import * as Mapboxgl from 'mapbox-gl'



@Component({
  selector: 'app-list-tareas',
  templateUrl: './list-tareas.component.html',
  styleUrls: ['./list-tareas.component.css']
})
export class ListTareasComponent implements OnInit {

  p: number = 1;                      // Fix for AOT compilation error for NGX pagination
  tareas: Tarea[];                 // Save students data in Student's array.
  ocultar: boolean = false; // Hide students data table when no student.
  noData: boolean = false;            // Showing No Student Message, when no student in database.
  preLoader: boolean = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)
  tarea: Tarea;
  map :Mapboxgl.Map;

  public tareaForm: FormGroup;




  constructor(
    public tareaService: TareaServiceService,
    private router: Router,
    private ngModal: NgbModal // Toastr service for alert message
  ) { }


  ngOnInit() {
    this.iniMap();
    this.dataState(); // Initialize student's list, when component is ready
    let s = this.tareaService.getTareaList();
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.tareas = [];
     
      let contador=0;
      data.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        let tareaTemporal:Tarea=a as Tarea;
        this.iniMarker(tareaTemporal);
        this.tareas.push(tareaTemporal);
        
      })
    });
    this.iniMap();
    
  }
  iniMarker(tarea:Tarea){
    
      this.marcador(tarea.coordenada.long,tarea.coordenada.lat);
    
  }
  iniMap() {
    Mapboxgl.accessToken = 'pk.eyJ1IjoianVhbnNlciIsImEiOiJja2VubTdoZ24wdjhwMzBxbXg5aXRpcXE4In0.OCMogAb-ZzugDZZrXP3ewQ';
    this.map = new Mapboxgl.Map({
      container: 'mapa-mapbox', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.08005221644875,4.624016228049641 ], // long 73.356226  //lat 5.5415653 position
      zoom: 16 // starting zoom
    });

    // Add zoom and rotation controls to the map.
    this.map.addControl(new Mapboxgl.NavigationControl());
  }
  // Using valueChanges() method to fetch simple list of students data. It updates the state of hideWhenNoStudent, noData & preLoader variables when any changes occurs in student data list in real-time.
  dataState() {
    this.tareaService.getTareaList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if (data.length <= 0) {
        this.ocultar = false;
        this.noData = true;
      } else {
        this.ocultar = true;
        this.noData = false;
      }
    })
  }

  // Method to delete student object
  deleteTarea(tarea) {
    if (window.confirm('Seguro desea eleiminar tarea?')) { 
      this.tareaService.deleteTarea(tarea.$key) 
      alert(tarea.nombreTarea + ' tarea eliminada!');

    }
  }
  agregartarea() {
    this.router.navigate(['/tarea']);
  }
  editar(tarea, modal) {
   
    window.localStorage.setItem('idEdit', tarea.$key);
    this.ngModal.open(modal);

  }
  marcador(long:string,lat:string){
    
    const marker = new Mapboxgl.Marker({
      draggable: true
      })
      .setLngLat([long, lat])
      .addTo(this.map);
  }


  completar(tarea){
    tarea.status=!tarea.status;
     this.tareaService.updateTareaStatus(tarea);
     if(tarea.status)alert("tarea ha sido finalizada")
     else alert("tarea ha sido reactivada");
  }
}