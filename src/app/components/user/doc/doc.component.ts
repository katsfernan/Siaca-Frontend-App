import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';




@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss']
})


export class DocComponent implements OnInit {
 
  public data = sessionStorage.getItem('rol');
  
  constructor() { }

  ngOnInit(): void {
  }

}