import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { ListaModel } from '../models/lista.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListasService {

  private url = 'https://cheque-bfb70.firebaseio.com'

  constructor( private http: HttpClient ) { }

  crearLista( lista: ListaModel ){

      return this.http.post(`${ this.url }/listas.json`, lista)
          .pipe(
            map( (resp : any) => {
              lista.id = resp.name;
              return lista;
            } )
          );

  }
  actualizarLista ( lista: ListaModel ) {

    const listaTemp = {
      ...lista
    };

    delete listaTemp.id

    return this.http.put(`${ this.url }/listas/${ lista.id }.json`, listaTemp);

  }

  borrarLista ( id: string ) {

    return this.http.delete(`${ this.url }/listas/${ id }.json`)

  }



  getLista ( id: string ) {

    return this.http.get(`${ this.url }/listas/${ id }.json`);

  }

  getListas () {
    return this.http.get(`${ this.url }/listas.json`)
          .pipe(
            map( this.crearArreglo ),
            delay(200)
          );
  }

  private crearArreglo ( listaObj: object ) {

    const listas: ListaModel[] = [];

    Object.keys( listaObj ).forEach( key => {
      const lista: ListaModel = listaObj[key];
      lista.id = key;

      listas.push(lista);
    }); 
     return listas;
  }

}
