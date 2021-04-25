import { Component } from "@angular/core";
import { PatientService } from "@app/services/patient.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-patient-education",
  templateUrl: "./patient-education.component.html",
  styleUrls: ["./patient-education.component.scss"],
})
export class PatientEducationComponent {
  constructor(
    private patientService: PatientService,
    private sanitizer: DomSanitizer
  ) {}
  public patientEducation = this.patientService.getAcuteData().patientEducation;
  public safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    this.patientEducation.website
  );
}
