import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home-component/home-component';
import { NavBarComponent } from './nav-bar-component/nav-bar-component';
import { FooterComponent } from './footer-component/footer-component';
import { NewContactComponent } from './new-contact-component/new-contact-component';
import { GroupsComponent } from './groups-component/groups-component';
import { NewGroupsComponent } from './new-groups-component/new-groups-component';
import { ContactComponent } from './contact-component/contact-component';

@NgModule({
  declarations: [
    App,
    HomeComponent,
    NavBarComponent,
    FooterComponent,
    NewContactComponent,
    GroupsComponent,
    NewGroupsComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
