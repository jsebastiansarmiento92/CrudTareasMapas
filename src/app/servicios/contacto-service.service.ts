import { Injectable } from '@angular/core';
import { Contacto } from '../models/contacto';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ContactoServiceService {
  contactoRef: AngularFireList<any>;
  contactosRef: AngularFireObject<any>;   


  constructor(private db: AngularFireDatabase) { }

  getContactoList() {
    this.contactoRef = this.db.list('contacto-list');
    return this.contactoRef;
  }  

  addContacto(contacto: Contacto) {
    this.getContactoList();
    this.contactoRef.push({
      nombre: contacto.nombre,
      email: contacto.email,
      telefono: contacto.telefono,
      mensaje: contacto.mensaje
    })
  }



}