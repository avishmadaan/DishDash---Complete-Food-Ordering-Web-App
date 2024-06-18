import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './Components/navigation/navigation.component';
import { PagenotfoundComponent } from './Components/pagenotfound/pagenotfound.component';
import { RestaurantviewComponent } from './Components/restaurantview/restaurantview.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { CutomerfavouriteComponent } from './Components/cutomerfavourite/cutomerfavourite.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { OrderhistoryComponent } from './Components/orderhistory/orderhistory.component';
import { MyaddressesComponent } from './Components/myaddresses/myaddresses.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { OrderSuccessComponent } from './Components/order-success/order-success.component';
import { AdminViewComponent } from './Components/admin-view/admin-view.component';
import { AdminLoginComponent } from './Components/admin-login/admin-login.component';

const routes: Routes = [
{path:'', component: HomepageComponent},
{path:'home', component: HomepageComponent},
{path:'customer/profile', component:ProfileComponent, children: [
  {path:'', component: CutomerfavouriteComponent},
  {path:'favorites', component: CutomerfavouriteComponent},
  {path:'edit-profile', component: EditProfileComponent},
  {path:'order-history', component: OrderhistoryComponent},
  {path:'my-addresses', component: MyaddressesComponent},
]},
{path:'customer/favourites', component: CutomerfavouriteComponent},
{path:'customer/checkout', component: CheckoutComponent},
{path:'customer/order-complete/:orderId', component: OrderSuccessComponent},
{path:':city/restaurants/:resid', component: RestaurantviewComponent},
{path:'admin/view', component: AdminViewComponent},
{path:'admin/login', component: AdminLoginComponent},
{path:'**', component: PagenotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
