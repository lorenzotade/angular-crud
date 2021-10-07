import { Component, OnInit } from '@angular/core';
import {TutorialService} from "../../services/tutorial.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Tutorial} from "../../models/tutorial.model";

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.scss']
})
export class TutorialDetailsComponent implements OnInit {

  currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  }
  message: string = '';

  constructor(
    private tutorialService: TutorialService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.message = '';
    this.getTutorial(this.route.snapshot.params.id);
  }

  getTutorial(id: string): void {
    this.tutorialService.get(id)
      .subscribe((data:Tutorial) => {
        this.currentTutorial = data;
        console.log(data);
      }, error => {
        console.log(error);
      });
  }

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status
    };
    this.message = '';

    this.tutorialService.update(this.currentTutorial.id, data)
      .subscribe(res => {
        this.currentTutorial.published = status;
        console.log(res);
        this.message = 'The status was updated succesfully!';
      }, error => {
        console.log(error);
      });
  }

  updateTutorial(): void {
    this.message = '';

    this.tutorialService.update(this.currentTutorial.id, this.currentTutorial)
      .subscribe(res => {
        console.log(res);
        this.message = res.message ? res.message : 'This tutorial was update successfully!';
      }, error => {
        console.log(error);
      });
  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/tutorials']);
      }, error => {
        console.log(error);
      });
  }

}
