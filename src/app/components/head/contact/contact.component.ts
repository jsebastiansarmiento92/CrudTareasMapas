import { Component, OnInit } from '@angular/core';
import { ContactoServiceService } from 'src/app/servicios/contacto-service.service';
import { Contacto } from 'src/app/models/contacto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private contactoService:ContactoServiceService,
    private ngModal:NgbModal) { }

  contacto:Contacto=new Contacto(); //otra forma de agregar con binding ngModel
  ngOnInit(): void {
  }

  agregarContacto(){

    this.contactoService.addContacto(this.contacto);
    alert("formulario enviado")
    this.contacto=new Contacto();
    this.ngModal.dismissAll();
  }
}
