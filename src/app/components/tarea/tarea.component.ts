import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { TareaServiceService } from 'src/app/servicios/tarea-service.service';
import { Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr


@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {

  public tareaForm: FormGroup;  // Define FormGroup to student's form

  constructor( public tareaService: TareaServiceService,  // CRUD API services
    public fb: FormBuilder,private router:Router       // Form Builder service for Reactive forms
    ) { }

  
    ngOnInit() {
      this.tareaService.getTareaList();  // Call GetStudentsList() before main form is being called
      this.tareaTForm();              // Call student form when component is ready
    }
  
    // Reactive student form
    tareaTForm() {
      this.tareaForm = this.fb.group({
        nombreTarea: ['', [Validators.required, Validators.minLength(2)]],
        descripcion: [''],
        coordenadas: [''],
       
      })  
    }
  
    // Accessing form control using getters
    get nombreTarea() {
      return this.tareaForm.get('nombreTarea');
    }
  
    get descripcion() {
      return this.tareaForm.get('descripcion');
    }  
  
    get coordenadas() {
      return this.tareaForm.get('coordenadas');
    }
  
   
  
    // Reset student form's values
    ResetForm() {
      this.tareaForm.reset();
    }  
   
    submitTareaData() {
      console.log(this.tareaForm.value);
      this.tareaService.addTarea(this.tareaForm.value); // Submit student data using CRUD API
      alert(this.tareaForm.controls['nombreTarea'].value + ' tarea ha sido agregada!')
      this.router.navigate(["tarea/list-tarea"]);
      //this.toastr.success(this.tareaForm.controls['nombreTarea'].value + ' tarea ha sido agregada!'); // Show success message when data is successfully submited
      this.ResetForm();  // Reset form when clicked on reset button
     };
}
