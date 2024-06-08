import { Component, OnInit } from '@angular/core';
import { IpLocationService } from '../../services/ip-location.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {

  location:any;
  city:String = 'Hyderabad';
  constructor(private ipLocationService:IpLocationService) {}

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
 
  }

}
