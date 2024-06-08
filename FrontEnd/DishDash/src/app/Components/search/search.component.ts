import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  Search:string= '';

  constructor() {}
  ngOnInit(): void {
   
  }

  onSearch(){
    
  }

}
