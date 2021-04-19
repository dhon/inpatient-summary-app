import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { FhirService } from "@app/services";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private fhirService: FhirService) {}

  canActivate() {
    const isLoggedIn = this.fhirService.patientIdSubject.value;
    if (isLoggedIn) {
      return true;
    }

    this.router.navigate(["/not-registered"]);
    return false;
  }
}
