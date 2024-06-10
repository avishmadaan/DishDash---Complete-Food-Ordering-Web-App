import { Component, OnDestroy, OnInit } from '@angular/core';
import { IpLocationService } from '../../services/ip-location.service';
import { LoadingService } from '../../services/loading.service';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {

  location: any;
  city: string = '';

  isLoading = false; // Add this property
  progress = 0; // Add this property

  private intervalId: any;
  private routerEventsSubscription: Subscription = new Subscription(); // Initialize the subscription


  constructor(
    private ipLocationService: IpLocationService, 
    private loadingService: LoadingService, 
    private resService:RestaurantService,
    private router: Router
  ) {}

  ngOnInit(): void {

 
    // Router events subscription
    this.routerEventsSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        console.log("Naviation Start")
        this.loadingService.setLoading(0);
        this.simulateLoadingProgress();
      } else if (
        event instanceof NavigationEnd || 
        event instanceof NavigationCancel || 
        event instanceof NavigationError
      ) {
        console.log('Navigation event completed:', event);
        this.completeLoading();
      }
    });
  }

  ngOnDestroy(): void {

  }


  private completeLoading() {
    console.log("Loading Completed")
    this.loadingService.setLoading(100);
 
    setTimeout(() => {
      this.loadingService.setLoading(0);
    }, 2000);
  }

  private simulateLoadingProgress() {
    console.log("Simulate Loading Progress")
    this.loadingService.setLoading(10);
   
  }

 
}
