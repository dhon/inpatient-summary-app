import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AskAQuestionComponent } from "@app/components/ask-a-question/ask-a-question.component";
import { CareTeamComponent } from "@app/components/care-team/care-team.component";
import { ContactInformationComponent } from "@app/components/contact-information/contact-information.component";
import { HomeComponent } from "@app/components/home/home.component";
import { LabResultsComponent } from "@app/components/lab-results/lab-results.component";
import { LaunchComponent } from "@app/components/launch/launch.component";
import { LoginComponent } from "@app/components/login/login.component";
import { NotRegisteredComponent } from "@app/components/not-registered/not-registered.component";
import { PageNotFoundComponent } from "@app/components/page-not-found/page-not-found.component";
import { PatientEducationComponent } from "@app/components/patient-education/patient-education.component";
import { AuthGuard } from "@app/helpers/auth.guard";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
  {
    path: "ask-a-question",
    component: AskAQuestionComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
  {
    path: "care-team",
    component: CareTeamComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
  {
    path: "contact-information",
    component: ContactInformationComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
  {
    path: "lab-results",
    component: LabResultsComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
  {
    path: "launch",
    component: LaunchComponent,
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
    pathMatch: "full",
  },
  {
    path: "not-registered",
    component: NotRegisteredComponent,
    pathMatch: "full",
  },
  {
    path: "patient-education",
    component: PatientEducationComponent,
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
