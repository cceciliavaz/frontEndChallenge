import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as $ from "jquery";
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})

export class PokedexComponent implements OnInit {
  apiURL: any;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  listaPokemon: any = [];
  constructor(
    private http: HttpClient) {
    
    this.apiURL = " https://api.pokemontcg.io/v2/";
   }

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons() {
    this.http.get(`${this.apiURL}/cards`).subscribe(
      (dados) => {
        this.listaPokemon = dados;
        this.listaPokemon = this.listaPokemon.data
        console.log(this.listaPokemon)
      },
      (erro) => {
        if (erro.status == 404) {
          console.log("Informação não localizada.");
        }
      }
    );
  }

  
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];