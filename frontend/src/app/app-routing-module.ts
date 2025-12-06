import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { ContactComponent } from './contact-component/contact-component';
import { NewContactComponent } from './new-contact-component/new-contact-component';
import { GroupsComponent } from './groups-component/groups-component';
import { NewGroupsComponent } from './new-groups-component/new-groups-component';

const routes: Routes = [
  {path : '', redirectTo: 'home', pathMatch: 'full'},
  {path : 'home', component: HomeComponent},
  {path: 'new-contact', component: NewContactComponent },
  {path : 'edit-contact/:id', component: NewContactComponent},
  {path : 'contacts', component: ContactComponent},
  {path : 'groups', component: GroupsComponent},
  {path: 'new-group', component: NewGroupsComponent },
  {path : 'edit-groups/:id', component: NewGroupsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
