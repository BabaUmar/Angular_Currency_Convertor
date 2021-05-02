import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyConvertor } from './currency-convertor';

import { FormBuilder } from '@angular/forms';

import { Rate } from './rate';
@Component({
  selector: 'app-c-convertoe',
  templateUrl: './c-convertoe.component.html',
  styleUrls: ['./c-convertoe.component.css']
})
export class CConvertoeComponent implements OnInit {
  selectedCurrencyFrom:string = "";
  selectedCurrencyTo:string = "";
  convertedCurrency:any;
  convertedSymbol:any;

  convertForm = this.formBuilder.group({
    value:0,
    currencyFrom:"",
    currencyTo:""
  })

  currencies: CurrencyConvertor[] = [];

  

  constructor(private httpClient:HttpClient, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getCurrencies();
  }

 getConversionRates(currencyFrom:string, currencyTo:string){
  this.httpClient.get<any>(`https://free.currconv.com/api/v7/convert?q=${this.convertForm.value.currencyFrom.slice(0,3)}_${this.convertForm.value.currencyTo.slice(0,3)}&compact=ultra&apiKey=f0278d6730125acbf8b4`).subscribe(
    response => {
      this.convertedCurrency = this.convertForm.value.value * response[this.convertForm.value.currencyFrom.slice(0,3)+'_'+this.convertForm.value.currencyTo.slice(0,3)];
      for(let currency of this.currencies){
        if(this.convertForm.value.currencyTo.slice(0,3) === currency.id){
          this.convertedSymbol = currency.currencySymbol;
          if(this.convertedSymbol === undefined){
            this.convertedSymbol = currency.id;
          }
        }
      }
    }
  )
}


  getCurrencies(){
    this.httpClient.get<any>('https://free.currconv.com/api/v7/currencies?apiKey=f0278d6730125acbf8b4').subscribe(
      response => {
        for(let key in response['results']){
          this.currencies.push(new CurrencyConvertor(response['results'][key]['currencyName'],
          response['results'][key]['currencySymbol'],
          response['results'][key]['id']));
        }
      }
    )

 }
  getSymbol(){
    console.log(this.selectedCurrencyTo.slice(0,3));
  }

  onConvert():void{
    let rate:any = this.getConversionRates(this.convertForm.value.currencyFrom.slice(0,3),this.convertForm.value.currencyTo.slice(0,3));
    this.convertedCurrency = this.convertForm.value.value*rate;
    for(let currency of this.currencies){
      if(this.convertForm.value.currencyTo.slice(0,3) === currency.id){
        this.convertedSymbol = currency.currencySymbol;
      }
    }
  }

}
