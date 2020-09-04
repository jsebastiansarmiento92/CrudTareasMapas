import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TareaServiceService } from 'src/app/servicios/tarea-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-tarea',
  templateUrl: './edit-tarea.component.html',
  styleUrls: ['./edit-tarea.component.css']
})
export class EditTareaComponent implements OnInit {

  tareaForm: FormGroup;  // Define FormGroup to student's edit form
  
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

  get coordenadas() {
    return this.tareaForm.get('coordenadas');
  }



  updateTareaData() {
    this.tareaForm = this.fb.group({
      nombreTarea: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: [''],
      coordenadas: ['']
    })
  }


  goBack() {
    this.location.back();
  }


  updateForm(){
    this.tareaService.updateTarea(this.tareaForm.value);    
    alert(this.tareaForm.controls['nombreTarea'].value +' ha sido modificado');
   
    this.router.navigate(['/list-tarea']);      
    this.ngmodal.dismissAll();
    window.localStorage.removeItem('idEdit')
  }

}
