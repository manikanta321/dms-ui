import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealerComponent } from './component/dealer/dealer.component';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { GeographiesComponent } from './component/geographies/geographies.component';
import { LoginComponent } from './component/login/login.component';
import { MaterialsClassificationComponent } from './component/materials-classification/materials-classification.component';
import { MaterialsListComponent } from './component/materials-list/materials-list.component';
import { MaterialsComponent } from './component/materials/materials.component';
import { OrdersComponent } from './component/orders/orders.component';
import { OtherMastersComponent } from './component/other-masters/other-masters.component';
import { TaxTemplateComponent } from './component/other-masters/tax-template/tax-template.component';
import { UnitMeasureComponent } from './component/other-masters/unit-measure/unit-measure.component';
import { SalesBulkUploadComponent } from './component/sales-bulk-upload/sales-bulk-upload.component';
import { SalesListComponent } from './component/sales-list/sales-list.component';
import { ResetPassword } from './component/sign-up/sign-up.component';
import { UsersComponent } from './component/users/users.component';
import { AuthGuard } from './services/auth.guard';
import { DashbordComponent } from './shared-component/dashbord/dashbord.component';

const routes: Routes = [
  { path: '', pathMatch: 'full',component: LoginComponent },
  { path: 'login', pathMatch: 'full',component: LoginComponent },
  { path: 'ResetPassword', pathMatch: 'full',component: ResetPassword  },
  { path: 'ForgotPassword', pathMatch: 'full',component: ForgotPasswordComponent },
  { path: 'maindashbord', pathMatch: 'full',component: DashbordComponent ,canActivate: [AuthGuard]},
  { path: 'dashbord/user', pathMatch: 'full',component: UsersComponent ,canActivate: [AuthGuard] },
  { path: 'dashbord/materials', pathMatch: 'full',component: MaterialsComponent,canActivate: [AuthGuard]  },
  { path: 'dashbord/materials/materials-list', pathMatch: 'full',component:   MaterialsListComponent ,canActivate: [AuthGuard] },
  { path: 'dashbord/materials/materials-classification', pathMatch: 'full',component: MaterialsClassificationComponent ,canActivate: [AuthGuard] },
  { path: 'dashbord/other-masters', pathMatch: 'full',component: OtherMastersComponent ,canActivate: [AuthGuard] },
  { path: 'dashbord/dealer', pathMatch: 'full',component: DealerComponent ,canActivate: [AuthGuard] }
,
{ path: 'dashbord/orders', pathMatch: 'full',component: OrdersComponent ,canActivate: [AuthGuard] }
,
  { path: 'dashbord/geographies', pathMatch: 'full',component: GeographiesComponent ,canActivate: [AuthGuard] },
  { path: 'dashbord/saleslist', pathMatch:'full', component: SalesListComponent,canActivate: [AuthGuard]},
  
  { path: 'dashbord/edit-profile', pathMatch: 'full',component: EditProfileComponent ,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
