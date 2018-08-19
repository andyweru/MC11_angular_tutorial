import { Component, OnInit } from '@angular/core';
import {Goal} from '../goal';
import {Goals} from '../goals';

import {HttpClient} from '@angular/common/http';

import {Quote} from '../quote-class/quote'

import {GoalService} from '../goals/goal.service';
import {AlertsService} from '../alert-service/alerts.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css'],
  providers: [GoalService]
})
export class GoalComponent implements OnInit {

  goals:Goal[];
  quote:Quote;
  alertService:AlertsService;

  deleteGoal(isComplete, index){
    if(isComplete){
      let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}`)

      if(toDelete){
        this.goals.splice(index, 1)
        this.alertService.alertMe("Goal has been deleted");
      }
    }
  }

  completeGoal(isComplete, index){
    if(isComplete){
      this.goals.splice(index, 1);
    }
  }

  toogleDetails(index){
    this.goals[index].showDescription = !this.goals[index].showDescription;
  }

  addNewGoal(goal){
    let goalLength = this.goals.length;
    goal.id = goalLength + 1;
    goal.completeDate = new Date(goal.completeDate);
    this.goals.push(goal);
  }

  constructor(goalService:GoalService, alertService:AlertsService, private http:HttpClient) { 
    this.goals = goalService.getGoals()
    this.alertService = alertService;
  }

  ngOnInit() {

    interface ApiResponse{
      quote:string;
      author: string
    }

    this.http.get<ApiResponse>("https://talakis.com/api/quotes/random").subscribe(data=>{
      this.quote = new Quote(data.quote,data.author)
    })
  }

}
