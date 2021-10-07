import { Component, OnInit } from '@angular/core';
import {TutorialService} from "../../services/tutorial.service";
import {Tutorial} from "../../models/tutorial.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.scss']
})
export class AddTutorialComponent implements OnInit {

  tutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };
  submitted: boolean = false;

  constructor(
    private tutorialService: TutorialService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  saveTutorial(): void {
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description
    };
    this.tutorialService.create(data)
      .subscribe(res => {
        console.log(res);
        this.submitted = true;
        setTimeout(() => {
          this.router.navigate([`/tutorials/${res.id}`]);
        }, 500);
      }, error => {
        console.log(error);
      });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      title: '',
      description: '',
      published: false
    };
  }

}
