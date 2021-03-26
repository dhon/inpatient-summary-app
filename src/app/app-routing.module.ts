import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "@app/components/home/home.component";
import { LoginComponent } from "@app/components/login/login.component";
import { PageNotFoundComponent } from "@app/components/page-not-found/page-not-found.component";
import { TeamComponent } from "@app/components/team/team.component";
import { AuthGuard } from "@app/helpers";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
    pathMatch: "full",
  },
  {
    path: "team",
    component: TeamComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
  {
    path: "404",
    component: PageNotFoundComponent,
  },
  {
    path: "**",
    redirectTo: "/404",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
