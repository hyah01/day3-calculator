import { Component } from '@angular/core';
import { RegexService } from './regex.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'day3-calculator';
  formula:string = '';
  result:string = '0';
  srv;

  constructor(srv: RegexService){
    this.srv = srv;
  }

  reset(){
    this.result = '0';
    this.formula = '';
  }

  add(number:string){
    if (this.result != '0'){
      if(number.match(this.srv.getAll())){
        this.formula = this.result + " ";
      } 
      this.result = '0';
    }
    this.formula += number;
  }

  opperator(opp:string){
    if (this.result != '0'){
      if(opp.match(this.srv.getAll())){
        this.formula = this.result + opp;
      } 
      this.result = '0';
    } else {
      if(!this.formula.charAt(this.formula.length-1).match(this.srv.getAll())){
        this.formula += opp;
      } else {
        if (this.srv.endWithSubtract().test(this.formula)){
          this.formula = this.formula.slice(0,-2) + opp;
        }
        else if (this.srv.endWithAll().test(this.formula) && opp == "-" ){
          this.formula += opp;
        }
        else {
          this.formula = this.formula.slice(0,-1) + opp;
        }
      }
    }

  }

  evaluate(){
    if (/--/.test(this.formula)){
      this.formula = this.formula.replace(/--/g," - - ");
    }
    console.log(this.formula)
    this.result = eval(this.formula).toString();
    this.formula = "";
  }
}
