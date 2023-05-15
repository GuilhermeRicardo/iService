import { servico } from '../../../Models/servico';
import { Component, Inject, OnInit } from '@angular/core';
import { RentTableService } from './rent-table.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { authResult } from '../../../Models/DTO/authResult';

@Component({
  selector: 'app-rent-table',
  templateUrl: './rent-table.component.html',
  styleUrls: ['./rent-table.component.scss'],
  providers: [RentTableComponent],
  
})
export class RentTableComponent implements OnInit {
  value!: string
  displayedColumns: string[] = ['prestador', 'servico', 'email', 'userName','date','devolucao'];
  dataSource!: servico[]; 

  constructor (
    @Inject (MAT_DIALOG_DATA)
    public dummy: authResult,
    public rentTableService: RentTableService,
    public snackBar: MatSnackBar

  ) {

      this.rentTableService.getAll().subscribe((data:servico[]) =>{
        console.log(data);
        this.dataSource = data
      })
  }

ngOnInit(): void {

}

removeRental (id: number) {
  this.rentTableService.deleteRental(id).subscribe(() => {
    this.dataSource = this.dataSource.filter(x => x.id !== id)
  }, () => {
    this.snackBar.open('Falha ao remover locação de filme.', 'fechar',{
      duration: 3000
    })
  }, () => {
    this.snackBar.open('Locação removida com sucesso!', 'fechar',{
      duration: 3000
    })
  }
);

}

}
