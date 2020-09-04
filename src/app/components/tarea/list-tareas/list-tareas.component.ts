import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/models/tarea';
import { TareaServiceService } from 'src/app/servicios/tarea-service.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';

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
  tarea:Tarea;

  
  public tareaForm: FormGroup; 




  constructor(
    public tareaServive: TareaServiceService,
    private router:Router,
    private ngModal:NgbModal // Toastr service for alert message
    ){ }


  ngOnInit() {
    this.dataState(); // Initialize student's list, when component is ready
    let s = this.tareaServive.getTareaList();
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.tareas = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.tareas.push(a as Tarea);
      })
    })
  }

  // Using valueChanges() method to fetch simple list of students data. It updates the state of hideWhenNoStudent, noData & preLoader variables when any changes occurs in student data list in real-time.
  dataState() {     
    this.tareaServive.getTareaList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
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
    if (window.confirm('Seguro desea eleiminar tarea?')) { // Asking from user before Deleting student data.
      this.tareaServive.deleteTarea(tarea.$key) // Using Delete student API to delete student.
      alert(tarea.nombreTarea + ' tarea eliminada!');
     // this.toastr.success(); // Alert message will show up when student successfully deleted.
    }
  }
  agregartarea(){
    this.router.navigate(['/tarea']);
  }
  editar(tarea,modal){
    console.log(tarea);
    window.localStorage.setItem('idEdit',tarea.$key);
    this.ngModal.open(modal);

  }

}