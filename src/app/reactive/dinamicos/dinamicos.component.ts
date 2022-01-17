import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  miFormulario: FormGroup = this._fb.group({
    nombre: [ , [Validators.required, Validators.minLength(3)] ],
    favoritos: this._fb.array( [
      [ 'Metal Gear', Validators.required ],
      [ 'Death Stranding', Validators.required ]
    ], Validators.required )
  });

  nuevoFavorito: FormControl = this._fb.control( '', Validators.required );

  get favoritosArr() {
    return this.miFormulario.get('favoritos') as FormArray;
  }

  constructor( private _fb: FormBuilder ) { }

  campoEsValido( campo: string ) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  borrar( i: number ) {
    this.favoritosArr.removeAt(i);
  }

  agregarFavorito() {
    if ( this.nuevoFavorito.invalid ) { return; }

    //this.favoritosArr.push( new FormControl( this.nuevoFavorito.value, Validators.required ) );
    this.favoritosArr.push( this._fb.control( this.nuevoFavorito.value, Validators.required ) );

    this.nuevoFavorito.reset();

  }

  guardar() {
    if ( this.miFormulario.invalid ) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);
    //this.miFormulario.reset();
  }

}
