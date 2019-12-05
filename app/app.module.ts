import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './site/signup/signup.component';
import { LoginComponent } from './site/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuperuserComponent } from './site/superuser/superuser.component';
import { SearchComponent } from './search/search.component';
import { ProductComponent } from './products/product/product.component';
import { StockManagementComponent } from './products/stock-management/stock-management.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { BillingComponent } from './products/billing/billing.component';
import { PurchaseHistoryComponent } from './products/purchase-history/purchase-history.component';

const appRoutes: Routes = [
  { path: 'signup/:type', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'superuser', component: SuperuserComponent },
  { path: 'search-bar', component: SearchComponent },
  { path: 'stock-management/:proCode', component: StockManagementComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'billing', component: BillingComponent },
  { path: 'purchase-history', component: PurchaseHistoryComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    SuperuserComponent,
    SearchComponent,
    ProductComponent,
    StockManagementComponent,
    AddProductComponent,
    BillingComponent,
    PurchaseHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
