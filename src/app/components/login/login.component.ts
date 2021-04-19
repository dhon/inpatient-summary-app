import { Component, OnInit } from "@angular/core";
import { FhirService } from "@app/services";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(private fhirService: FhirService) {}

  ngOnInit(): void {
    this.fhirService.setPatientId();
  }
}
