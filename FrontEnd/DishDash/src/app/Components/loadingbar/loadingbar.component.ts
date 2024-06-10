import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loadingbar',
  templateUrl: './loadingbar.component.html',
  styleUrl: './loadingbar.component.css'
})
export class LoadingbarComponent implements OnInit {

  progress:number =0;
  isLoading:boolean = false;

  constructor(private loadingService:LoadingService) {}

  ngOnInit(): void { 

    this.loadingService.loading$.subscribe({
      next:progress => {
        this.progress = progress;
        this.isLoading = progress >0 && progress<100;
      }
    })

    this.loadingService.loadingSubject_1.subscribe({
      next:data => {
        this.progress = data;
        this.isLoading = this.progress>0 && this.progress<100;
      }
    })
   }

}
