import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { DashbordComponent } from './shared-component/dashbord/dashbord.component';
import { SidenavBarComponent } from './shared-component/sidenav-bar/sidenav-bar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeadComponent } from './shared-component/head/head.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'
import {MatExpansionModule} from '@angular/material/expansion';
import {BrowserAnimationsModule} from    '@angular/platform-browser/animations';
import { UsersComponent } from './component/users/users.component';
import { MaterialsComponent } from './component/materials/materials.component';
import { MaterialsListComponent } from './component/materials-list/materials-list.component';
import { MaterialsClassificationComponent } from './component/materials-classification/materials-classification.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    DashbordComponent,
    SidenavBarComponent,
    HeadComponent,
    UsersComponent,
    MaterialsComponent,
    MaterialsListComponent,
    MaterialsClassificationComponent,

  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatInputModule ,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    BrowserAnimationsModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
