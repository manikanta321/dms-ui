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
import { AddUserPopupComponent } from './component/users/userPopups/add-user-popup/add-user-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditPopupComponent } from './component/users/userPopups/edit-popup/edit-popup.component';
import { UomPopupComponent } from './component/users/userPopups/uom-popup/uom-popup.component';
import { EditUomPopupComponent } from './component/users/userPopups/edit-uom-popup/edit-uom-popup.component';
import { AddTaxTemplateComponent } from './component/users/userPopups/add-tax-template/add-tax-template.component';
import { EditTaxTemplateComponent } from './component/users/userPopups/edit-tax-template/edit-tax-template.component';
import { AddcurrencyComponent } from './component/users/userPopups/addcurrency/addcurrency.component';
import {MatSelectModule} from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import { MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
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
    AddUserPopupComponent,
    EditPopupComponent,
    UomPopupComponent,
    EditUomPopupComponent,
    AddTaxTemplateComponent,
    EditTaxTemplateComponent,
    AddcurrencyComponent,

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
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
