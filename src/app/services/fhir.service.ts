import { Injectable } from "@angular/core";
import { charitaAdams, geoffreyAbbott, omarAbernathy } from "@assets/index";
import * as FHIR from "fhirclient";

@Injectable({
  providedIn: "root",
})
export class FhirService {
  private patient = null;
  private observation = null;
  private medicationRequest = null;

  constructor() {
    // Launch Page
    FHIR.oauth2.authorize({
      client_id: "my_web_app",
      scope: "patient/*.read",
    });

    // Index Page
    FHIR.oauth2
      .ready()
      .then((client) => client.request("Patient"))
      .then((data) => (this.patient = data))
      .then((data) => console.log("patient", this.patient))
      .catch(console.error);

    // Index Page
    FHIR.oauth2
      .ready()
      .then((client) => client.request("Observation"))
      .then((data) => (this.observation = data))
      .then((data) => console.log("observation", this.observation))
      .catch(console.error);

    // Index Page
    FHIR.oauth2
      .ready()
      .then((client) => client.request("MedicationRequest"))
      .then((data) => (this.medicationRequest = data))
      .then((data) => console.log("medicationRequest", this.medicationRequest))
      .catch(console.error);
  }

  getData() {
    return charitaAdams;
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
