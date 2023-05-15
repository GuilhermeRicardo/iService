import { userDTO } from './../../../Models/DTO/userDTO';
import { LoginService } from './login.service';
import { users } from './../../../Models/users';
import { MenuComponent } from './../menu.component';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit{
  createLogin!: boolean
  loginForm!: FormGroup
  invalidUser!: boolean

constructor (
  @Inject (MAT_DIALOG_DATA)
  public data: boolean,
  public LoginService: LoginService,
  public dialogRef: MatDialogRef<MenuComponent>,
  public FormBuilder:FormBuilder,
  public snackBar: MatSnackBar
) {}

  ngOnInit(): void {

    this.invalidUser = false

    this.loginForm = this.FormBuilder.group({
      name: [''],
      email: [''],
      senha: [''],
    });
    
    throw new Error('Method not implemented.');
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  tryLogin () {
    let emailLogin = this.loginForm.controls['email'].value
    let senhaLogin = this.loginForm.controls['senha'].value
    let form: users =  {
      email: emailLogin,
      password: senhaLogin
    }

    console.log(form);

    this.LoginService.postLogin(form).subscribe((result) =>
    { 
      localStorage.setItem("Authentication", result.token)
      this.dialogRef.close(result)
    },
    (error) => {
      console.log(error);
      this.invalidUser=true
    }
    );
  }
  
  
  tryNewUser () {

    let nomeLogin = this.loginForm.controls['name'].value
    let emailLogin = this.loginForm.controls['email'].value
    let senhaLogin = this.loginForm.controls['senha'].value
    let form: userDTO = {
      name: nomeLogin,
      email: emailLogin,
      password: senhaLogin
    }

    console.log(form);

    this.LoginService.postNewUser(form).subscribe((result) =>
    { 
      this.snackBar.open('Usuário criado com sucesso! Favor realizar o login.', '',{
        duration: 3000
      })
      this.dialogRef.close(result)
    },
    (error) => {
      console.log(error);
      this.invalidUser=true
    }
    );
  }

}
