import { Component, OnInit } from '@angular/core';
import { ContactoServiceService } from 'src/app/servicios/contacto-service.service';
import { Contacto } from 'src/app/models/contacto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

//en este caso no se tiene modulo ya que este es el ultimo hijo que se pueda usar en este caso ademas que el formulario y modal
//son importados desde la modulo padre de este componente en este caso el padre de todos en app.module
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
/**
 * componente contacto el cual se encarga de guardar en la base de datos un formulario de contacto de un cliente puede ser 
 */
export class ContactComponent  {
  /** inciacializacion de por parametro de servicio de contacto el cual se encarga de enviar o hacer push a un formulario y usar modulo de modal */
  constructor(private contactoService:ContactoServiceService,//instancia de 
    private ngModal:NgbModal) { }//instancia o inicializacion de clase modal el cual hace posible que salga una ventana emergente dentro de un componente

  contacto:Contacto=new Contacto(); //otra forma de agregar con binding "ngModel"

  //metodo para enviar formulario a la base de datos gracias al servicio de contactoService
  agregarContacto(){
    this.contactoService.addContacto(this.contacto);
    alert("formulario enviado")
    this.contacto=new Contacto();//se pone en blanco el formulario reinstanciando clase contacto (se hace de esta forma ya que no se tiene ningun dato por defecto la clase o modelo)
    this.ngModal.dismissAll();//se cierran todos los modales activos
  }
}
