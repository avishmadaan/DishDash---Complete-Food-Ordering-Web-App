import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './Components/navigation/navigation.component';
import { PagenotfoundComponent } from './Components/pagenotfound/pagenotfound.component';
import { RestaurantviewComponent } from './Components/restaurantview/restaurantview.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { CutomerfavouriteComponent } from './Components/cutomerfavourite/cutomerfavourite.component';

const routes: Routes = [
{path:'', component: HomepageComponent},
{path:'home', component: HomepageComponent},
{path:'login', component: LoginComponent},
{path:'register', component: RegisterComponent},
{path:'customer/favourites', component: CutomerfavouriteComponent},
{path:'restaurants/:resid', component: RestaurantviewComponent},
{path:'**', component: PagenotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
