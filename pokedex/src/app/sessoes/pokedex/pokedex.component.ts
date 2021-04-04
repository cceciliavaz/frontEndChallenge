import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ArrayDataSource } from '@angular/cdk/collections';

// import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {
  apiURL: any;
  displayedColumns = ['name'];
  listAllPokemon: any = [];
  listFilterPokemon: any = [];

  loadPokemons: any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  dataSource: any;
  erroLoad: any;

  constructor(private http: HttpClient) {
    this.apiURL = ' https://api.pokemontcg.io/v2/';
  }

  ngOnInit() {
    this.loadPokemons = true;
    this.erroLoad = false;
    this.getPokemons();
  }

  searchPokemon(palavra: any) {
    palavra = palavra.target.value || null;
    if (palavra)
      this.listFilterPokemon = this.listAllPokemon.data.filter((pokemon: any) =>
        pokemon.name.toLocaleLowerCase().includes(palavra.toLocaleLowerCase())
      );
    else this.listFilterPokemon = this.listAllPokemon.data;
  }

  getPokemons() {
    this.http.get(`${this.apiURL}/cards`).subscribe(
      (dados) => {
        this.listAllPokemon = dados;
        this.listFilterPokemon = this.listAllPokemon.data.sort(
          (a: any, b: any) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          }
        );
        this.loadPokemons = false;
      },
      (erro) => {
        setTimeout(() => {
          this.loadPokemons = false;
          this.erroLoad = true;
        }, 100);
      }
    );
  }
}
