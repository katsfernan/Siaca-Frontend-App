import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.scss']
})
export class AnunciosComponent implements OnInit {


  public data = sessionStorage.getItem('rol');

  constructor() { }

  ngOnInit(): void {
  }

}
