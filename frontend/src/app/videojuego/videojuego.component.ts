import { Component, OnInit } from '@angular/core';
import { VideojuegoService } from '../videojuego.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-videojuego',
  templateUrl: './videojuego.component.html',
  styleUrls: ['./videojuego.component.css']
})
export class VideojuegoComponent implements OnInit {
  videojuegos: any[] = [];
  currentItem: any = {};
  videojuegoForm!: FormGroup;
  constructor(private videojuegoService: VideojuegoService) { }

  ngOnInit(): void {
    this.getItems();
    this.initializeForm();
  }

  getItems(): void {
    this.videojuegoService.getItems()
      .subscribe((items) => {
        this.videojuegos = items;
      });
  }

  getItemById(id: string): void {
    this.videojuegoService.getItemById(id)
      .subscribe((item) => {
        this.currentItem = item;
      });
  }

  createItem(item: any): void {
    this.videojuegoService.createItem(item)
      .subscribe(() => {
        this.getItems();
        this.currentItem = {};
        Swal.fire('Success', 'Registro agregado correctamente', 'success');
      });
  }

  updateItem(id: string, item: any): void {
    this.videojuegoService.updateItem(id, item)
      .subscribe(() => {
        this.getItems();
        this.currentItem = {};
        Swal.fire('Success', 'Registro actualizado correctamente', 'success');
      });
  }

  deleteItem(id: string): void {
    Swal.fire({
      title: 'Confirmar Eliminación',
      text: '¿Estás seguro de que deseas eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.videojuegoService.deleteItem(id)
          .subscribe(() => {
            this.getItems();
            Swal.fire('Success', 'Registro eliminado correctamente', 'success');
          });
      }
    });
  }
  

  editItem(id: string): void {
    this.getItemById(id);
    this.videojuegoForm.patchValue(this.currentItem);
  }

  initializeForm(): void {
    this.videojuegoForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      valoracion: new FormControl('', Validators.required),
      genero: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')])
    });
  }
}
