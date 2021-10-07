import { Component, OnInit } from '@angular/core';
import {TutorialService} from "../../services/tutorial.service";
import {Tutorial} from "../../models/tutorial.model";

@Component({
  selector: 'app-tutorial-list',
  templateUrl: './tutorial-list.component.html',
  styleUrls: ['./tutorial-list.component.scss']
})
export class TutorialListComponent implements OnInit {

  tutorials?: Tutorial[];
  currentTutorial: Tutorial = {};
  currentIndex: number = -1;
  title: string = '';

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.tutorialService.getAll()
      .subscribe((data:Tutorial[]) => {
        this.tutorials = data;
        console.log(data);
      }, error => {
        console.log(error);
      });
  }

  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = {};
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  deleteTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.id)
      .subscribe(res => {
        console.log(res);
        this.refreshList();
      }, error => {
        console.log(error);
      });
  }

  removeAllTutorials(): void {
    this.tutorialService.deleteAll()
      .subscribe(res => {
        console.log(res);
        this.refreshList();
      }, error => {
        console.log(error);
      });
  }

  searchTitle(): void {
    this.currentTutorial = {};
    this.currentIndex = -1;

    this.tutorialService.findByTitle(this.title)
      .subscribe((data:Tutorial[]) => {
        this.tutorials = data;
        console.log(data);
      }, error => {
        console.log(error);
      });
  }

}
