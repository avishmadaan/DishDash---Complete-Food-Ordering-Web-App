import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './Components/navigation/navigation.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { SearchComponent } from './Components/search/search.component';
import { CategoryComponent } from './Components/category/category.component';
import { CategorycardComponent } from './Components/categorycard/categorycard.component';
import { RestaurantComponent } from './Components/restaurant/restaurant.component';
import { RestaurantviewComponent } from './Components/restaurantview/restaurantview.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { PagenotfoundComponent } from './Components/pagenotfound/pagenotfound.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatIconModule} from '@angular/material/icon';
import { RestaurantcardComponent } from './Components/restaurantcard/restaurantcard.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { CutomerfavouriteComponent } from './Components/cutomerfavourite/cutomerfavourite.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { LoadingbarComponent } from './Components/loadingbar/loadingbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NavbarComponent,
    SearchComponent,
    CategoryComponent,
    CategorycardComponent,
    RestaurantComponent,
    RestaurantviewComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    PagenotfoundComponent,
    RestaurantcardComponent,
    HomepageComponent,
    CutomerfavouriteComponent,
    LoadingbarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }