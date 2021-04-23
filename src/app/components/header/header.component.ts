import { Component } from "@angular/core";
import { FhirService } from "@app/services";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  constructor(private fhirService: FhirService) {}
  public isLoggedIn$ = this.fhirService.patientIdSubject.asObservable();
  public isLocal = this.fhirService.local;
}
