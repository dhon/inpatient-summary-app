import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "@app/app.component";
import { AppRoutingModule } from "@app/app-routing.module";
import { AskAQuestionComponent } from "@app/components/ask-a-question/ask-a-question.component";
import { CareTeamComponent } from "@app/components/care-team/care-team.component";
import { ContactInformationComponent } from "@app/components/contact-information/contact-information.component";
import { FooterComponent } from "@app/components/footer/footer.component";
import { HeaderComponent } from "@app/components/header/header.component";
import { HomeComponent } from "@app/components/home/home.component";
import { LabResultsComponent } from "@app/components/lab-results/lab-results.component";
import { PageNotFoundComponent } from "@app/components/page-not-found/page-not-found.component";
import { PatientEducationComponent } from "@app/components/patient-education/patient-education.component";

@NgModule({
  declarations: [
    AppComponent,
    AskAQuestionComponent,
    CareTeamComponent,
    ContactInformationComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LabResultsComponent,
    PageNotFoundComponent,
    PatientEducationComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
