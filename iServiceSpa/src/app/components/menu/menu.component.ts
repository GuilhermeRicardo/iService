import { authResult } from './../../Models/DTO/authResult';
import { NewRentalComponent } from './new-rental/new-rental.component';
import { RentTableComponent } from './rent-table/rent-table.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent { 
  verifiedUser!: boolean;
  user!: authResult;

  constructor (    
    public dialog:MatDialog,
    public snackBar: MatSnackBar
  ) { }

  loginDialog() {

    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {

      this.user = result;

      if (this.user.result = true){
        this.verifiedUser = true;
        this.snackBar.open('Realizado login como usuário '+ this.user.userName + '!', '',{
          duration: 3000
        })
      }

      console.log(this.user)

    });

  }

  newUserDialog() {

    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',
      disableClose: true,
      data: {
        newUser: true
      }

    });

    dialogRef.afterClosed().subscribe(result => {

      console.log(this.user)

    });

  }


  logout () {

    this.user = {
      token: '',
      userId: '',
      userEmail: '',
      userName: '',
      result: false
    }

    this.verifiedUser = false

    console.log(this.user);

    console.log(this.verifiedUser);
    

    }
  
  openRentTable() {
    this.dialog.open(RentTableComponent, {
      autoFocus: false,
      restoreFocus: false,
      width: 'auto',
      data: {
        token: this.user.token,
        userId: this.user.userId,
        userEmail: this.user.userEmail,
        userName: this.user.userName,
        result: this.user.result,
      }

    });
  }

  openNewRental () {
    this.dialog.open(NewRentalComponent,{
      width: 'auto',
      data: {
        token: this.user.token,
        userId: this.user.userId,
        userEmail: this.user.userEmail,
        userName: this.user.userName,
        result: this.user.result,
      }
    })
  }



}
