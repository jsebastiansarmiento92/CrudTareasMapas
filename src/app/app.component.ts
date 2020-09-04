import { Component } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import 'firebase/firestore';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud';
  tareas:Observable<any[]>;
  constructor(firestore:AngularFirestore){
    this.tareas=firestore.collection('tareas').valueChanges();
  }
}
