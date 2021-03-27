import { Component, OnInit } from "@angular/core";
import { FhirService } from "@app/services";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public name = this.fhirService.getName();
  public language = this.fhirService.getLanguage();
  public address = this.fhirService.getAddress();
  public phoneNumber = this.fhirService.getPhoneNumber();
  public dateOfBirth = this.fhirService.getDateOfBirth();
  public gender = this.fhirService.getGender();
  public height = this.fhirService.getHeight();
  public weight = this.fhirService.getWeight();
  public medicationRequests = this.fhirService.getMedicationRequests();

  constructor(private fhirService: FhirService) {}

  ngOnInit(): void {}
}
