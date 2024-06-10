import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loadingbar',
  templateUrl: './loadingbar.component.html',
  styleUrl: './loadingbar.component.css'
})
export class LoadingbarComponent implements OnInit {

  progress:number =0;
  isLoading:boolean = false;

  constructor(private loadingService:LoadingService, private cdr:ChangeDetectorRef) {}

  ngOnInit(): void { 
    this.loadingService.loadingSubject_1.subscribe({
      next:data => {
        console.log("MY progress: "+data)
        this.progress = data;
        this.cdr.detectChanges();
          this.isLoading = this.progress>0 && this.progress<100;
      }
    })
   }


}
