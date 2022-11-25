import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPassword } from './component/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { DashbordComponent } from './shared-component/dashbord/dashbord.component';
import { SidenavBarComponent } from './shared-component/sidenav-bar/sidenav-bar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeadComponent } from './shared-component/head/head.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialAddEditpopupComponent } from './component/materials-list/material-add-editpopup/material-add-editpopup.component';
import { OtherMastersComponent } from './component/other-masters/other-masters.component';
import { DealerComponent } from './component/dealer/dealer.component';
import { DealersComponent } from './dealers/dealers.component';
import { AssociationComponent } from './association/association.component';
import { ReportsComponent } from './reports/reports.component';
import { GeographiesComponent } from './component/geographies/geographies.component';
import { MatChipsModule } from '@angular/material/chips';
// import {MatTabsModule} from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ImpactedAssociationComponent } from './component/materials-list/impacted-association/impacted-association.component';
import { AddDealerPopupComponent } from './add-dealer-popup/add-dealer-popup.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AssociationTargetPopupComponent } from './association/association-target-popup/association-target-popup.component';
import { PromotionsComponent } from './component/promotions/promotions.component';
import { AddPromotionsComponent } from './component/add-promotions/add-promotions.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
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
import { MatCardModule } from '@angular/material/card';
import { RestPwsdUserPopupComponent } from './component/users/userPopups/rest-pwsd-user-popup/rest-pwsd-user-popup.component';
import { PswResetPopupComponent } from './component/users/userPopups/psw-reset-popup/psw-reset-popup.component';
import { ActivatepopUpComponent } from './component/users/userPopups/activatepop-up/activatepop-up.component';
import { ActiveSuccessPopComponent } from './component/users/userPopups/active-success-pop/active-success-pop.component';
import { DeactiveSuccessPopComponent } from './component/users/userPopups/deactive-success-pop/deactive-success-pop.component';
import { GeographicListComponent } from './component/geographic-list/geographic-list.component';
import { GeoClassificationComponent } from './component/geo-classification/geo-classification.component';
import { MatRadioModule } from '@angular/material/radio';
import { AddGeolistPopupComponent } from './component/add-geolist-popup/add-geolist-popup.component';
import { AddIdentifierComponent } from './component/materials-list/add-identifier/add-identifier.component';
import { SelectProductComponent } from './component/materials-list/select-product/select-product.component';
import { AddProductGroupComponent } from './component/materials-list/add-product-group/add-product-group.component';
import { AddProductSubGroupComponent } from './component/materials-list/add-product-sub-group/add-product-sub-group.component';

import { UseractionComponent } from './component/useraction/useraction.component';
import { OrderListComponent } from './component/order-list/order-list.component';
import { DateRangePickerModule } from '@uiowa/date-range-picker';
import { AddItemsPromotionComponent } from './component/promotions/add-items-promotion/add-items-promotion.component';
import { UomActionComponent } from './component/uom-action/uom-action.component';
import { DeleteUomPopupComponent } from './component/delete-uom-popup/delete-uom-popup.component';
import { DeleteUomSuccessfullPopupComponent } from './component/delete-uom-successfull-popup/delete-uom-successfull-popup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AddorderpromotionsComponent } from './component/orders/addorderpromotions/addorderpromotions.component';
import { AddOrderPromotionlistComponent } from './component/orders/add-order-promotionlist/add-order-promotionlist.component';
import { DeleteUomNewComponent } from './component/delete-uom-new/delete-uom-new.component';
import { TaxTempleateActionComponent } from './component/tax-templeate-action/tax-templeate-action.component';
import { ProductGroupAddItemComponent } from './component/promotions/product-group-add-item/product-group-add-item.component';
import { ProductSubGroupComponent } from './component/promotions/product-sub-group/product-sub-group.component';
import { ProductShortCodeComponent } from './component/promotions/product-short-code/product-short-code.component';
import { OrderNonpromotionlistComponent } from './component/orders/order-nonpromotionlist/order-nonpromotionlist.component';
import { PopupGridTableComponent } from './component/promotions/product-group-add-item/popup-grid-table/popup-grid-table.component';
import { ReactiveCurrencyComponent } from './component/other-masters/currency-conversation/reactive-currency/reactive-currency.component';
import { DeactiveCurrencyComponent } from './component/other-masters/currency-conversation/deactive-currency/deactive-currency.component';
import { MakeDefaultComponent } from './component/other-masters/currency-conversation/make-default/make-default.component';
import { CurrencyDonePopupComponent } from './component/other-masters/currency-conversation/currency-done-popup/currency-done-popup.component';
import { CurrencyActionComponent } from './component/other-masters/currency-conversation/currency-action/currency-action.component';
import { CurrencyReactivatedComponent } from './component/other-masters/currency-conversation/currency-reactivated/currency-reactivated.component';
import { CurrencyDefaultComponent } from './component/other-masters/currency-conversation/currency-default/currency-default.component';
import { RemovePromotionItemComponent } from './component/add-promotions/remove-promotion-item/remove-promotion-item.component';
import { RemovePromotionSucessComponent } from './component/add-promotions/remove-promotion-sucess/remove-promotion-sucess.component';
import { DeactiveTaxCoponentComponent } from './component/deactive-tax-coponent/deactive-tax-coponent.component';
import { ReactiveTaxCoponentComponent } from './component/reactive-tax-coponent/reactive-tax-coponent.component';
import { ActiveSuccessTaxTemplateComponent } from './component/active-success-tax-template/active-success-tax-template.component';
import { DeactiveSuccessTaxTemplateComponent } from './component/deactive-success-tax-template/deactive-success-tax-template.component';
import { DeactivateTaxCoponentComponent } from './component/deactivate-tax-coponent/deactivate-tax-coponent.component';
import { SuccessDeactivateTaxComponentComponent } from './component/success-deactivate-tax-component/success-deactivate-tax-component.component';
import { EditdealersComponent } from './component/users/userPopups/editdealers/editdealers.component';
import { PopupPscGridTableComponent } from './component/promotions/product-group-add-item/popup-psc-grid-table/popup-psc-grid-table.component';
import { PopupPsubgGridTableComponent } from './component/promotions/product-group-add-item/popup-psubg-grid-table/popup-psubg-grid-table.component';
import { MaterialListActionComponent } from './component/material-list-action/material-list-action.component';
import { OrderlistActionPopupComponent } from './component/order-list/orderlist-action-popup/orderlist-action-popup.component';
import { OrderlistEditPopupComponent } from './component/order-list/orderlist-edit-popup/orderlist-edit-popup.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DateRangeSelectionComponent } from './component/promotions/date-range-selection/date-range-selection.component';
import { SalesListComponent } from './component/sales-list/sales-list.component';
import { SalesInventoryComponent } from './component/sales-list/sales-inventory/sales-inventory.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SalesUploadsComponent } from './component/sales-list/sales-uploads/sales-uploads.component';
import { SalesReportsComponent } from './component/sales-list/sales-reports/sales-reports.component';
import { AddDealerAssociationsComponent } from './component/add-dealer-associations/add-dealer-associations.component';
import { PramotionActionComponent } from './component/pramotion-action/pramotion-action.component';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';
import { AddSalesPopupComponent } from './component/sales-list/sales-inventory/add-sales-popup/add-sales-popup.component';
import { SalesBulkDownloadComponent } from './component/sales-list/sales-inventory/sales-bulk-download/sales-bulk-download.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceActionComponent } from './invoice-action/invoice-action.component';
import { ViewInvoiceComponentComponent } from './view-invoice-component/view-invoice-component.component';
import { DownloadInvoiceComponentComponent } from './download-invoice-component/download-invoice-component.component';
import { OrdersShipmentComponent } from './component/orders/orders-shipment/orders-shipment.component';
import { ShipOrderBulkDownloadComponent } from './component/orders/ship-order-bulk-download/ship-order-bulk-download.component';
import { CustomDatePopupComponent } from './component/orders/custom-date-popup/custom-date-popup.component';
import { CustomdatepickerComponent } from './shared-component/customdatepicker/customdatepicker.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { AssosiationActionComponent } from './component/assosiation-action/assosiation-action.component';
import { BulkEditAssosiationComponent } from './component/bulk-edit-assosiation/bulk-edit-assosiation.component';
import { SalesBulkUploadComponent } from './component/sales-bulk-upload/sales-bulk-upload.component';
import { AddPromotionGeographiesComponent } from './component/add-promotions/add-promotion-geographies/add-promotion-geographies.component';
import { DealerTargetComponent } from './component/dealer-target/dealer-target.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { AddCatComponent } from './component/add-cat/add-cat.component';
import { AddSubCatComponent } from './component/add-sub-cat/add-sub-cat.component';
import { AddTypesPopupComponent } from './component/add-types-popup/add-types-popup.component';
import { DeactivateClassificationPopUpComponent } from './component/deactivate-classification-pop-up/deactivate-classification-pop-up.component';
import { AddeditgeoComponent } from './component/geo-classification/addeditgeo/addeditgeo.component';
import { GeoActivateDeactivateComponent } from './component/geo-classification/geo-activate-deactivate/geo-activate-deactivate.component';
import { GeoStatusPopComponent } from './component/geo-classification/geo-status-pop/geo-status-pop.component';
import { DeactiveSubcategoryCompoComponent } from './component/deactive-subcategory-compo/deactive-subcategory-compo.component';
import { DeactiveTypeCompoComponent } from './component/deactive-type-compo/deactive-type-compo.component';
import { DeactiveReactivePopupComponent } from './component/users/userPopups/editdealers/deactive-reactive-popup/deactive-reactive-popup.component';
import { DealerDeactiveComponent } from './component/users/userPopups/editdealers/dealer-deactive/dealer-deactive.component';
import { DealerReactivePopupComponent } from './component/users/userPopups/editdealers/dealer-reactive-popup/dealer-reactive-popup.component';
import { DealerReactvSuccessComponent } from './component/users/userPopups/editdealers/dealer-reactv-success/dealer-reactv-success.component';
import { TargetGroupsComponent } from './component/target-groups/target-groups.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPassword,
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
    OrderListComponent,
    AddItemsPromotionComponent,
    OrderListComponent,
    UomActionComponent,
    DeleteUomPopupComponent,
    DeleteUomSuccessfullPopupComponent,
    AddorderpromotionsComponent,
    AddOrderPromotionlistComponent,
    DeleteUomNewComponent,
    TaxTempleateActionComponent,
    ProductGroupAddItemComponent,
    ProductSubGroupComponent,
    ProductShortCodeComponent,
    OrderNonpromotionlistComponent,
    PopupGridTableComponent,
    ReactiveCurrencyComponent,
    DeactiveCurrencyComponent,
    MakeDefaultComponent,
    CurrencyDonePopupComponent,
    CurrencyActionComponent,
    CurrencyReactivatedComponent,
    CurrencyDefaultComponent,
    RemovePromotionItemComponent,
    RemovePromotionSucessComponent,
    DeactiveTaxCoponentComponent,
    ReactiveTaxCoponentComponent,
    ActiveSuccessTaxTemplateComponent,
    DeactiveSuccessTaxTemplateComponent,
    DeactivateTaxCoponentComponent,
    SuccessDeactivateTaxComponentComponent,
    EditdealersComponent,
    PopupPscGridTableComponent,
    PopupPsubgGridTableComponent,
    MaterialListActionComponent,
    OrderlistActionPopupComponent,
    OrderlistEditPopupComponent,
    DateRangeSelectionComponent,
    SalesListComponent,
    SalesInventoryComponent,
    SalesUploadsComponent,
    SalesReportsComponent,
    AddDealerAssociationsComponent,
    PramotionActionComponent,
    EditProfileComponent,
    AddSalesPopupComponent,
    SalesBulkDownloadComponent,
    InvoiceComponent,
    InvoiceActionComponent,
    ViewInvoiceComponentComponent,
    DownloadInvoiceComponentComponent,
    OrdersShipmentComponent,
    ShipOrderBulkDownloadComponent,
    CustomDatePopupComponent,
    CustomdatepickerComponent,
    AssosiationActionComponent,
    BulkEditAssosiationComponent,
    SalesBulkUploadComponent,
    AddPromotionGeographiesComponent,
    DealerTargetComponent,
    AddCatComponent,
    AddSubCatComponent,
    AddTypesPopupComponent,
    DeactivateClassificationPopUpComponent,
    AddeditgeoComponent,
    GeoActivateDeactivateComponent,
    GeoStatusPopComponent,
    DeactiveSubcategoryCompoComponent,
    DeactiveTypeCompoComponent,
          AddorderpromotionsComponent,
          AddOrderPromotionlistComponent,
          DeleteUomNewComponent,
          TaxTempleateActionComponent,
          ProductGroupAddItemComponent,
          ProductSubGroupComponent,
          ProductShortCodeComponent,
          OrderNonpromotionlistComponent,
          PopupGridTableComponent,
          ReactiveCurrencyComponent,
          DeactiveCurrencyComponent,
          MakeDefaultComponent,
          CurrencyDonePopupComponent,
          CurrencyActionComponent,
          CurrencyReactivatedComponent,
          CurrencyDefaultComponent,
          RemovePromotionItemComponent,
          RemovePromotionSucessComponent,
          DeactiveTaxCoponentComponent,
          ReactiveTaxCoponentComponent,
          ActiveSuccessTaxTemplateComponent,
          DeactiveSuccessTaxTemplateComponent,
          DeactivateTaxCoponentComponent,
          SuccessDeactivateTaxComponentComponent,
          EditdealersComponent,
          PopupPscGridTableComponent,
          PopupPsubgGridTableComponent,
          MaterialListActionComponent,
          OrderlistActionPopupComponent,
          OrderlistEditPopupComponent,
          DateRangeSelectionComponent,
          SalesListComponent,
          SalesInventoryComponent,
          SalesUploadsComponent,
          SalesReportsComponent,
          AddDealerAssociationsComponent,
          PramotionActionComponent,
          EditProfileComponent,
          AddSalesPopupComponent,
          SalesBulkDownloadComponent,
          InvoiceComponent,
          InvoiceActionComponent,
          ViewInvoiceComponentComponent,
          DownloadInvoiceComponentComponent,
          OrdersShipmentComponent,
          ShipOrderBulkDownloadComponent,
          CustomDatePopupComponent,
          CustomdatepickerComponent,
          AssosiationActionComponent,
          BulkEditAssosiationComponent,
          SalesBulkUploadComponent,
          AddPromotionGeographiesComponent,
          DealerTargetComponent,
          AddCatComponent,
          AddSubCatComponent,
          AddTypesPopupComponent,
          DeactivateClassificationPopUpComponent,
          DeactiveReactivePopupComponent,
          DealerDeactiveComponent,
          DealerReactivePopupComponent,
          DealerReactvSuccessComponent,
          DeactiveSubcategoryCompoComponent,
          DeactiveTypeCompoComponent,
          TargetGroupsComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatInputModule,
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
    MatChipsModule,
    DateRangePickerModule,
    NgbModule,
    NgbDatepickerModule,
    MatAutocompleteModule,
    NgxDaterangepickerMd.forRoot(),
    NgxSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ], bootstrap: [AppComponent]
})
export class AppModule { }
