import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
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
import { MaterialAddEditpopupComponent } from './component/materials-list/material-add-editpopup/material-add-editpopup.component';
import { OtherMastersComponent } from './component/other-masters/other-masters.component';
import { DealerComponent } from './component/dealer/dealer.component';
import { DealersComponent } from './dealers/dealers.component';
import { AssociationComponent } from './association/association.component';
import { ReportsComponent } from './reports/reports.component';
import { GeographiesComponent } from './component/geographies/geographies.component';
import {MatChipsModule} from '@angular/material/chips';
// import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ImpactedAssociationComponent } from './component/materials-list/impacted-association/impacted-association.component';
import { AddDealerPopupComponent } from './component/Dealer-Popup/add-dealer-popup/add-dealer-popup.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AssociationTargetPopupComponent } from './association/association-target-popup/association-target-popup.component';
import { PromotionsComponent } from './component/promotions/promotions.component';
import { AddPromotionsComponent } from './component/add-promotions/add-promotions.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatSortModule} from '@angular/material/sort';
import { GuiGridModule } from '@generic-ui/ngx-grid';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UnitMeasureComponent } from './component/other-masters/unit-measure/unit-measure.component';
import { TaxTemplateComponent } from './component/other-masters/tax-template/tax-template.component';
import { CurrencyConversationComponent } from './component/other-masters/currency-conversation/currency-conversation.component';
import { OrdersComponent } from './component/orders/orders.component';
import { OrderTableComponent } from './component/orders/order-table/order-table.component';
import { AuthInterceptor } from './component/AuthInterceptor';
import { MatStepperModule } from '@angular/material/stepper';
import { DeactivateUserpopupComponent } from './component/users/userPopups/deactivate-userpopup/deactivate-userpopup.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PopupCellRendererComponent } from './component/popup-cell-renderer/popup-cell-renderer.component';
import {MatCardModule} from '@angular/material/card';
import { RestPwsdUserPopupComponent } from './component/users/userPopups/rest-pwsd-user-popup/rest-pwsd-user-popup.component';
import { PswResetPopupComponent } from './component/users/userPopups/psw-reset-popup/psw-reset-popup.component';
import { ActivatepopUpComponent } from './component/users/userPopups/activatepop-up/activatepop-up.component';
import { ActiveSuccessPopComponent } from './component/users/userPopups/active-success-pop/active-success-pop.component';
import { DeactiveSuccessPopComponent } from './component/users/userPopups/deactive-success-pop/deactive-success-pop.component';
import { GeographicListComponent } from './component/geographic-list/geographic-list.component';
import { GeoClassificationComponent } from './component/geo-classification/geo-classification.component';
import {MatRadioModule} from '@angular/material/radio';
import { AddGeolistPopupComponent } from './component/add-geolist-popup/add-geolist-popup.component';
import { AddIdentifierComponent } from './component/materials-list/add-identifier/add-identifier.component';
import { SelectProductComponent } from './component/materials-list/select-product/select-product.component';
import { AddProductGroupComponent } from './component/materials-list/add-product-group/add-product-group.component';
import { AddProductSubGroupComponent } from './component/materials-list/add-product-sub-group/add-product-sub-group.component';

import{UseractionComponent} from './component/useraction/useraction.component'

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
    MaterialAddEditpopupComponent,
    OtherMastersComponent,
    DealerComponent,
    DealersComponent,
    AssociationComponent,
    ReportsComponent,
    GeographiesComponent,
    AddDealerPopupComponent,
    ImpactedAssociationComponent,
    AssociationTargetPopupComponent,
    PromotionsComponent,
    AddPromotionsComponent,
    UnitMeasureComponent,
    TaxTemplateComponent,
    CurrencyConversationComponent,
    OrdersComponent,
    OrderTableComponent,
    DeactivateUserpopupComponent,
    PopupCellRendererComponent,
    RestPwsdUserPopupComponent,
    PswResetPopupComponent,
    ActivatepopUpComponent,
    ActiveSuccessPopComponent,
    DeactiveSuccessPopComponent,
    GeographicListComponent,
    GeoClassificationComponent,
    AddGeolistPopupComponent,
    AddIdentifierComponent,
    SelectProductComponent,
    AddProductGroupComponent,
    AddProductSubGroupComponent,
    
    UseractionComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
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
    MatRadioModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTabsModule,
    MatCheckboxModule,
    NgSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatSortModule,
    GuiGridModule,
    AgGridModule,
    HttpClientModule,
    NgMultiSelectDropDownModule,
    MatCardModule,
    MatStepperModule,
    MatChipsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],  bootstrap: [AppComponent]
})
export class AppModule { }
