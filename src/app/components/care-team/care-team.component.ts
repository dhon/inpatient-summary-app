import { Component } from "@angular/core";
import { PatientService } from "@app/services/patient.service";

@Component({
  selector: "app-care-team",
  templateUrl: "./care-team.component.html",
  styleUrls: ["./care-team.component.scss"],
})
export class CareTeamComponent{
  constructor(private patientService: PatientService) {}
  public careTeam = this.patientService.getAcuteData().careTeam;
}
