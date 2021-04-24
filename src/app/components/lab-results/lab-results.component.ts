import { Component } from "@angular/core";
import { PatientService } from "@app/services/patient.service";

@Component({
  selector: "app-lab-results",
  templateUrl: "./lab-results.component.html",
  styleUrls: ["./lab-results.component.scss"],
})
export class LabResultsComponent {
  constructor(private patientService: PatientService) {}
  public labResults = this.patientService.getAcuteData().labResults;
}
