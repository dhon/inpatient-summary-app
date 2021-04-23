import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  charitaAdamsFhir,
  geoffreyAbbottFhir,
  omarAbernathyFhir,
} from "@assets/index";
import { oauth2 } from "fhirclient";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FhirService {
  public local = window.location.href.includes('localhost');
  public patientIdSubject = new BehaviorSubject<string>(null);
  private smart = oauth2;
  private registeredPatientIds = [
    "bc6c8e2a-63de-4790-94af-fcab57874c21",
    "2cda5aad-e409-4070-9a15-e1c35c46ed5a",
    "80a75b5a-fd30-4f38-895d-d8098fe7206e",
  ];
  private patientSubject = new BehaviorSubject<any>(null);
  private observationSubject = new BehaviorSubject<any>(null);
  private medicationRequestSubject = new BehaviorSubject<any>(null);
  private patient$ = this.patientSubject.asObservable();
  private observation$ = this.observationSubject.asObservable();
  private medicationRequest$ = this.medicationRequestSubject.asObservable();

  constructor(private router: Router) {}

  getAuthorization() {
    // Init Auth
    if (this.local) {
      this.router.navigate(["/login"]);
    } else {
      this.smart.authorize({
        client_id: "my_web_app",
        scope: "patient/*.read",
        redirectUri: "/inpatient-summary-app/login",
      });
    }
  }

  setPatientId() {
    if (!this.patientIdSubject.value) {
      if (this.local) {
        this.patientIdSubject.next(this.registeredPatientIds[0]);
        this.router.navigate(["/"]);
      } else {
        this.smart.ready().then((client) => {
          if (this.registeredPatientIds.includes(client.patient.id)) {
            this.patientIdSubject.next(client.patient.id);
            this.router.navigate(["/"]);
          } else {
            this.router.navigate(["/not-registered"]);
          }
        });
      }
    }
  }

  callAPIs() {
    // Call Patient
    this.smart
      .ready()
      .then((client) => client.request(`Patient/${client.patient.id}`))
      .then((response) => this.patientSubject.next(response))
      .catch(console.error);

    // Call Observation
    this.smart
      .ready()
      .then((client) => {
        let observationQuery = new URLSearchParams();
        observationQuery.set("patient", client.patient.id);
        observationQuery.set("_count", "100");
        observationQuery.set("_sort", "-date");
        observationQuery.set(
          "code",
          [
            "http://loinc.org|8462-4",
            "http://loinc.org|8480-6",
            "http://loinc.org|2085-9",
            "http://loinc.org|2089-1",
            "http://loinc.org|55284-4",
            "http://loinc.org|3141-9",
            "http://loinc.org|8302-2",
            "http://loinc.org|29463-7",
          ].join(",")
        );
        return client
          .request("Observation?" + observationQuery, {
            pageLimit: 0,
            flat: true,
          })
          .then((response) => this.observationSubject.next(response));
      })
      .catch(console.error);

    // Call MedicationRequest
    this.smart
      .ready()
      .then((client) => {
        let medicationRequestQuery = new URLSearchParams();
        medicationRequestQuery.set("patient", client.patient.id);
        return client.request("MedicationRequest?" + medicationRequestQuery, {
          pageLimit: 0,
          flat: true,
        });
      })
      .then((response) => this.medicationRequestSubject.next(response))
      .catch(console.error);
  }

  getName() {
    return this.patient$.pipe(
      map((patient) => {
        const data = this.local ? charitaAdamsFhir.patient : patient;
        return data?.name?.[0]?.given?.[0] + " " + data?.name?.[0]?.family;
      })
    );
  }

  getLanguage() {
    return this.patient$.pipe(
      map((patient) => {
        const data = this.local ? charitaAdamsFhir.patient : patient;
        return data?.communication?.[0]?.language?.text;
      })
    );
  }

  getAddress() {
    return this.patient$.pipe(
      map((patient) => {
        const data = this.local ? charitaAdamsFhir.patient : patient;
        return data?.address?.[0];
      })
    );
  }

  getPhoneNumber() {
    return this.patient$.pipe(
      map((patient) => {
        const data = this.local ? charitaAdamsFhir.patient : patient;
        return data?.telecom?.[0]?.value;
      })
    );
  }

  getDateOfBirth() {
    return this.patient$.pipe(
      map((patient) => {
        const data = this.local ? charitaAdamsFhir.patient : patient;
        return data?.birthDate;
      })
    );
  }

  getGender() {
    return this.patient$.pipe(
      map((patient) => {
        const data = this.local ? charitaAdamsFhir.patient : patient;
        return data?.gender;
      })
    );
  }

  getHeight() {
    return this.observation$.pipe(
      map((observation) => {
        console.log(observation);
        const data = this.local
          ? charitaAdamsFhir.observation?.entry
          : observation;
        const data2 = data?.find((entry) => {
          const data3 = this.local ? entry?.resource : entry;
          return data3?.code?.text === "Body Height";
        });
        const data4 = this.local ? data2?.resource : data2;
        return (
          data4?.valueQuantity?.value?.toFixed(2) +
          " " +
          data4?.valueQuantity?.code
        );
      })
    );
  }

  getWeight() {
    return this.observation$.pipe(
      map((observation) => {
        console.log(observation);
        const data = this.local
          ? charitaAdamsFhir.observation?.entry
          : observation;
        const data2 = data?.find((entry) => {
          const data3 = this.local ? entry?.resource : entry;
          return data3?.code?.text === "Body Weight";
        });
        const data4 = this.local ? data2?.resource : data2;
        return (
          data4?.valueQuantity?.value?.toFixed(2) +
          " " +
          data4?.valueQuantity?.code
        );
      })
    );
  }

  getMedicationRequests() {
    return this.medicationRequest$.pipe(
      map((medicationRequest) => {
        const data = this.local
          ? charitaAdamsFhir.medicationRequest?.entry
          : medicationRequest;
        return data?.map((entry) => {
          const data2 = this.local ? entry?.resource : entry;
          return data2?.medicationCodeableConcept?.text;
        });
      })
    );
  }
}
