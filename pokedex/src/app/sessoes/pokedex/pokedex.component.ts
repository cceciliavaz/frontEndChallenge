import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ArrayDataSource } from '@angular/cdk/collections';
import { environment } from 'src/environments/environment';
environment

// import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {
  displayedColumns = ['name'];
  listAllPokemon: any = [];
  listFilterPokemon: any = [];

  loadPokemons: any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  dataSource: any;
  erroLoad: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.loadPokemons = true;
    this.erroLoad = false;
    this.getPokemons();
  }

  generatorTemplate(){
      
    var $carousel = $('#carouselMobille');
    var $carouselInner = $carousel.find('.carousel-inner');
    $carouselInner.html("");

    this.listFilterPokemon.forEach((item: any, i: 0) => {
      var template = '';

      if(i === 0) {
        template = '<div class="carousel-item active">';
      } else {
        template = '<div class="carousel-item">';
      }

      template += '<img class="d-block w-80" src="' + item.images.small + '" alt="Second slide">';        
      template += '<div>';
      template += '<h5 class="card-title mt-2 mb-0 primary">' + item.name + '</h5>';
      template += '<p>' + item.id + '</p>';
      item.types.forEach((element: any) => {
        template += ' <a class="btn btn-primary">'+element+'</a>' 
      });
      template += '</div>';
      template += '</div>';
      

      $carouselInner.append(template);
    })

  }

  searchPokemon(palavra: any) {
    palavra = palavra.target.value || null;
    if (palavra)
      this.listFilterPokemon = this.listAllPokemon.data.filter((pokemon: any) =>
        pokemon.name.toLocaleLowerCase().includes(palavra.toLocaleLowerCase())
      );
    else this.listFilterPokemon = this.listAllPokemon.data;

    this.generatorTemplate();
  }


  // #region REQUEST
  getPokemons() {
    this.http.get(`${environment.url}/cards`).subscribe(
      (dados) => {
        this.listAllPokemon = dados;
        this.listFilterPokemon = this.listAllPokemon.data.sort(
          (a: any, b: any) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          }
          
        );
        this.generatorTemplate();
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
  //#endregion
}
