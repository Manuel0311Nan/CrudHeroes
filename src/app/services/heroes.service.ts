import { HeroeModel } from './../models/heroe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  { map, delay } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://heroesapp-e50a6-default-rtdb.europe-west1.firebasedatabase.app'

  constructor(private http: HttpClient) { }

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      map((resp: any) => {
        heroe.id = resp.name;
        return heroe
      })
    )
  }
  actualizarHeroe(heroe: HeroeModel) {
    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`,heroeTemp)
  }
  borrarHeroe(id: any) {
  return this.http.delete(`${this.url}/heroes/${id}.json`)
}
  getHeroe(id: string | null ) {
    return this.http.get(`${this.url}/heroes/${id}.json`)
  }
  getHeroes() {
    return this.http.get(`${ this.url }/heroes.json`)
            .pipe(
              map( this.crearArreglo ),
              delay(1000)
            );
  }

  private crearArreglo( heroesObj: any ) {

    const heroes: HeroeModel[] = [];

    Object.keys( heroesObj ).forEach( key => {

      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
console.log(heroes)
      heroes.push( heroe );
    });


    return heroes;

  }
}
