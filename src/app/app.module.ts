import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeadComponent } from './components/head/head.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
//fire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
