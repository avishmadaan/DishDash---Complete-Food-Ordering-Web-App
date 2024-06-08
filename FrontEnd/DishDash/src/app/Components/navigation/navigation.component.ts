import { Component, OnInit } from '@angular/core';
import { IpLocationService } from '../../services/ip-location.service';
import { LoadingService } from '../../services/loading.service';
import { NavigationStart, Route, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {

  location:any;
  city:String = 'Hyderabad';
  constructor(private ipLocationService:IpLocationService, private loadingService:LoadingService, private router:Router) {}

  ngOnInit(): void {

    this.ipLocationService.getIpLocation().subscribe({
      next:data => {
        this.location = data
        console.log(data)
        this.city = this.location.city
      },
      error:e => {
        console.log("This is a error :" +e)
      }
    })


    //Router Check

    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        this.simulateLoading();
      }
    })
 
  }

  private simulateLoading() {
    let progress = 0;
    this.loadingService.setLoading(progress);
    const interval = setInterval(() => {
      progress += 10;
      this.loadingService.setLoading(progress);

      if(progress >=100) {
        clearInterval(interval);
      }
 
    }, 100);
  }

}
