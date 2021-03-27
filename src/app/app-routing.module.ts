import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AskAQuestionComponent } from "@app/components/ask-a-question/ask-a-question.component";
import { CareTeamComponent } from "@app/components/care-team/care-team.component";
import { ContactInformationComponent } from "@app/components/contact-information/contact-information.component";
import { HomeComponent } from "@app/components/home/home.component";
import { LabResultsComponent } from "@app/components/lab-results/lab-results.component";
import { PageNotFoundComponent } from "@app/components/page-not-found/page-not-found.component";
import { PatientEducationComponent } from "@app/components/patient-education/patient-education.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full",
  },
  {
    path: "ask-a-question",
    component: AskAQuestionComponent,
    pathMatch: "full",
  },
  {
    path: "care-team",
    component: CareTeamComponent,
    pathMatch: "full",
  },
  {
    path: "contact-information",
    component: ContactInformationComponent,
    pathMatch: "full",
  },
  {
    path: "lab-results",
    component: LabResultsComponent,
    pathMatch: "full",
  },
  {
    path: "patient-education",
    component: PatientEducationComponent,
    pathMatch: "full",
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
