import { Component } from "@angular/core";
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: "app-ask-a-question",
  templateUrl: "./ask-a-question.component.html",
  styleUrls: ["./ask-a-question.component.scss"],
})
export class AskAQuestionComponent {
  isValidFormSubmitted = false;
  topics = ['Care', 'Doctor', 'Facility', 'Other'];
  questionForm = this.formBuilder.group({
     topic: ['', Validators.required],
     email: ['', Validators.email],
     question: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
    if (this.questionForm.valid) {
      // API Request to Company Database
      this.isValidFormSubmitted = true;
    }
 }
}
