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
  private intervalId: any;
  private routerEventsSubscription: Subscription = new Subscription(); // Initialize the subscription
  isLoading = false; // Add this property
  progress = 0; // Add this property

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
    // Unsubscribe from router events to avoid memory leaks
    if (this.routerEventsSubscription) {
      console.log("ngonDestory")
      this.routerEventsSubscription.unsubscribe();
    }
     // Clear the interval if the component is destroyed
     if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }


  private completeLoading() {
    console.log("Loading Completed")
    this.loadingService.setLoading(100);
    setTimeout(() => {
      this.loadingService.setLoading(0);
    }, 1000);
    this.routerEventsSubscription.unsubscribe();


  }

  private simulateLoadingProgress() {
    console.log("Simulate Loading Progress")
    let progress = 0;
    this.loadingService.setLoading(progress);
    this.intervalId = setInterval(() => {
      progress += 10;
      this.loadingService.setLoading(progress);
      console.log('Loading progress:', progress);

      if (progress >= 90) {
        clearInterval(this.intervalId);
        console.log("90 crosses", this.intervalId)
        this.intervalId = null;
      }
    }, 100);
    console.log("OutSide internval")
  }

 
}
