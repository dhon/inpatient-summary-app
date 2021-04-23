import { Component } from "@angular/core";
import { FhirService } from "@app/services";

@Component({
  selector: "app-not-registered",
  templateUrl: "./not-registered.component.html",
  styleUrls: ["./not-registered.component.scss"],
})
export class NotRegisteredComponent {
  constructor(private fhirService: FhirService) {}
  public isLocal = this.fhirService.local;
}
