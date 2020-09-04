import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { AppComponent } from './app.component';


const routes: Routes = [
    { path: '', loadChildren: () => import('./components/inicio/inicio.module').then(m => m.InicioModule)},
    { path: 'inicio', loadChildren: () => import('./components/inicio/inicio.module').then(m => m.InicioModule) },
    { path: 'head', loadChildren: () => import('./components/head/head.module').then(m => m.HeadModule)},
    { path: 'galeria', loadChildren: () => import('./components/galeria/galeria.module').then(m => m.GaleriaModule)},
    { path: 'tarea', loadChildren: () => import('./components/tarea/tarea.module').then(m => m.TareaModule)},
    { path: 'list-tarea', loadChildren: () => import('./components/tarea/list-tareas/list-tareas.module').then(m => m.ListTareasModule)},
   // { path: 'access-denied', loadChildren: () => import('./access-denied/access-denied.module').then(m => m.AccessDeniedModule) },
   // { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule) },
    { path: '**', redirectTo: 'inicio' }
];

@NgModule({
    //imports: [RouterModule.forRoot(routes,  { enableTracing: true })],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}