import { Component, OnInit } from "@angular/core";
import { FhirService } from "@app/services";

@Component({
  selector: "app-launch",
  templateUrl: "./launch.component.html",
  styleUrls: ["./launch.component.scss"],
})
export class LaunchComponent implements OnInit {
  constructor(private fhirService: FhirService) {}

  ngOnInit(): void {
    this.fhirService.getAuthorization();
  }
}
