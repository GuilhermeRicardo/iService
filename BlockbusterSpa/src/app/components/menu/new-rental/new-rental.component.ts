import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { authResult } from './../../../Models/DTO/authResult';
import { RentalDTO } from '../../../Models/DTO/rentalDTO';
import { prestador } from '../../../Models/prestador';
import { NewRentalService } from './new-rental.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-rental',
  templateUrl: './new-rental.component.html',
  styleUrls: ['./new-rental.component.scss'],
  providers: [NewRentalComponent]
})
export class NewRentalComponent implements OnInit {
  dataSource!: prestador[]
  value!: prestador
  movieAvailable!: boolean
  availability!: number
  holder!: string

  constructor (
    @Inject (MAT_DIALOG_DATA)
    public dummy: authResult,
    public NewRentalService: NewRentalService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.NewRentalService.getPrestador().subscribe((data:prestador[]) =>{
      console.log(data);
      this.dataSource = data
    })

    throw new Error('Method not implemented.');
  }

  // checkMovieAvailability () {

  //   console.log(this.value.id);
    
  //   this.NewRentalService.getAvailability(this.value.id).subscribe(data => {
  //     this.availability = data
  //     if (this.availability == 0) {
  //       console.log('nok');
  //       this.holder = 'Filme indisponível em estoque.'
  //       this.movieAvailable = false
  //     }

  //     if (this.availability >= 1) {
  //       console.log('ok');
  //       this.holder = 'Há unidades '+ this.availability +' disponiveis em estoque!'
  //       this.movieAvailable = true
  //     }

  //     console.log(this.availability);
  //   })
  // }

  createNewRent () {

    console.log(this.value.id);
    

    let rent: RentalDTO = {
      prestadorId: this.value.id,
      userId: this.dummy.userId
    }

    console.log(rent);

    this.NewRentalService.postRent(rent, this.dummy.token).subscribe(result => {
      this.dataSource.push(result)
      console.log(result);
    });
    this.snackBar.open('Filme alugado com sucesso!', 'fechar',{
      duration: 3000
    })
  }
}
