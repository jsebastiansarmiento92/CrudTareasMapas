import { Component, OnInit, ViewChild } from '@angular/core';





@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  

  /**
  * Shows or hide the search elements
  * @var {boolean} searching
  */
  public searching: boolean = false;

  isLoaded: boolean = false;
  isCustomSocketOpened = false;
  private stompClient;



  searchText = "";

  constructor(  ) { }

  ngOnInit() {
  
  }

  
}
