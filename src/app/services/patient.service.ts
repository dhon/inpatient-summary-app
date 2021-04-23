import { Injectable } from "@angular/core";
import { FhirService } from "@app/services";
import {
  charitaAdamsAcute,
  geoffreyAbbottAcute,
  omarAbernathyAcute,
} from "@assets/index";

@Injectable({
  providedIn: "root",
})
export class PatientService {
  constructor(private fhirService: FhirService) {}

  // API Request to Company Database
  getAcuteData() {
    if (
      this.fhirService.patientIdSubject.value ===
      "bc6c8e2a-63de-4790-94af-fcab57874c21"
    ) {
      return charitaAdamsAcute;
    } else if (
      this.fhirService.patientIdSubject.value ===
      "2cda5aad-e409-4070-9a15-e1c35c46ed5a"
    ) {
      return geoffreyAbbottAcute;
    } else if (
      this.fhirService.patientIdSubject.value ===
      "80a75b5a-fd30-4f38-895d-d8098fe7206e"
    ) {
      return omarAbernathyAcute;
    }
    return null;
  }
}
