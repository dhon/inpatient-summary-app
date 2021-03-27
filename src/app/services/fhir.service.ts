import { Injectable } from "@angular/core";
import { charitaAdams, geoffreyAbbott, omarAbernathy } from "@assets/index";
import { AuthenticationService } from "@app/services";

@Injectable({
  providedIn: "root",
})
export class FhirService {
  constructor(private authenticationService: AuthenticationService) {}

  getData() {
    if (this.authenticationService.currentUserValue.id === 1) {
      return charitaAdams;
    } else if (this.authenticationService.currentUserValue.id === 2) {
      return geoffreyAbbott;
    } else if (this.authenticationService.currentUserValue.id === 3) {
      return omarAbernathy;
    }
    return null;
  }

  getName() {
    return (
      this.getData().patient?.name?.[0]?.given?.[0] +
      " " +
      this.getData().patient?.name?.[0]?.family
    );
  }

  getLanguage() {
    return this.getData().patient?.communication?.[0]?.language?.text;
  }

  getAddress() {
    return this.getData().patient?.address?.[0];
  }

  getPhoneNumber() {
    return this.getData().patient?.telecom?.[0]?.value;
  }

  getDateOfBirth() {
    return this.getData().patient?.birthDate;
  }

  getGender() {
    return this.getData().patient?.gender;
  }

  getHeight() {
    const data = this.getData().observation?.entry?.find((entry) => {
      return entry?.resource?.code?.text === "Body Height";
    });
    return (
      data?.resource?.valueQuantity?.value?.toFixed(2) +
      " " +
      data?.resource?.valueQuantity?.code
    );
  }

  getWeight() {
    const data = this.getData().observation?.entry?.find((entry) => {
      return entry?.resource?.code?.text === "Body Weight";
    });
    return (
      data?.resource?.valueQuantity?.value?.toFixed(2) +
      " " +
      data?.resource?.valueQuantity?.code
    );
  }

  getMedicationRequests() {
    return this.getData().medicationRequest?.entry?.map((entry) => {
      return entry?.resource?.medicationCodeableConcept?.text;
    });
  }
}
