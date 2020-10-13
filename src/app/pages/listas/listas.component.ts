import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { clearScreenDown } from 'readline';
import { ListaModel } from 'src/app/models/lista.model';
import { ListasService } from 'src/app/services/listas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.css']
})
export class ListasComponent implements OnInit {

  listas: ListaModel [] = [];

  cargando = false;


  constructor( private listasService : ListasService ) { }

  ngOnInit(): void {

    this.cargando = true ;

    this.listasService.getListas()
      .subscribe( resp=> {
        this.listas = resp,
        this.cargando = false;
      });
  }

  borrarLista ( lista: ListaModel, i: number ) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ lista.numeral }`,
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp =>{

      if ( resp.value ) {
        this.listas.splice(i, 1);
        this.listasService.borrarLista( lista.id ).subscribe();
      }

    });
    
    

  }

}
