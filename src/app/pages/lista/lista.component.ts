/*import { ClassGetter } from '@angular/compiler/src/output/output_ast';*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { ListaModel } from 'src/app/models/lista.model';
import { ListasService } from 'src/app/services/listas.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  lista:ListaModel = new ListaModel();

  constructor( private listasService: ListasService,
              private route: ActivatedRoute ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if ( id!== 'nuevo' ) {
      this.listasService.getLista(id)
      .subscribe( (resp : ListaModel) =>{
        this.lista = resp;
        this.lista.id = id; 
      } );
    }

  }

  guardar( form: NgForm ) {
    if(form.invalid){
      console.log("formulario no valido");
      return;
    }

    Swal.fire({
      title: 'Esperes',
      text: 'Guardando Información',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion : Observable<any>;

    if( this.lista.id ) {
      peticion = this.listasService.actualizarLista( this.lista );

    } else {
      peticion = this.listasService.crearLista( this.lista );
    }
    peticion.subscribe ( resp => {
      Swal.fire({
        title: this.lista.numeral,
        text: 'Se actualizó correctamente!'
      });
    } )
  }

}
