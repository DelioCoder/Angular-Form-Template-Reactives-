import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Persona {
  nombre: string;
  favoritos: Favorito[];
}

interface Favorito {
  id      : number;
  nombre  : string;
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  juegoNuevo: string = '';

  persona: Persona = {
    nombre: 'Fernando',
    favoritos: [
      {
        id: 1, nombre: 'Metal Gear'
      },
      {
        id: 2, nombre: 'DeathStranding'
      }
    ]
  }

  @ViewChild('miFormulario') miFormulario!: NgForm;

  nombreValido(): boolean {
    return this.miFormulario?.controls['nombre']?.invalid &&
    this.miFormulario?.form.controls['nombre']?.touched
  }

  agregarJuego() {
    const nuevoFavorito: Favorito = {
      id: this.persona.favoritos.length + 1,
      nombre: this.juegoNuevo
    }
    this.persona.favoritos.push({ ...nuevoFavorito });
    this.juegoNuevo = '';
  }

  guardar() {
    console.log('Formulario posteado')
  }

  eliminar( index: number ) {
    this.persona.favoritos.splice(index, 1);
  }

}
