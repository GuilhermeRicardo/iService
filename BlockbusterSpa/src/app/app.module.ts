import { LoginInterceptor } from './components/menu/login/login.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './Views/home/home.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './components/menu/login/login.component';
import { RentTableComponent } from './components/menu/rent-table/rent-table.component';
import { NewRentalComponent } from './components/menu/new-rental/new-rental.component';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [	
    AppComponent, 
    HomeComponent,
    MenuComponent,
    LoginComponent,
    RentTableComponent,
    NewRentalComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatListModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
