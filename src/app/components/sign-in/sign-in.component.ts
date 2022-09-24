import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  addUser() {

    // Validamos que el usuario ingrese valores
    if(this.username == '' || this.password == '' || this.confirmPassword == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    } 

    // Validamos que las password sean iguales
    if(this.password != this.confirmPassword) {
      this.toastr.error('Las passwords ingresadas son distintas', 'Error');
      return;
    }

    // Creamos el objeto
    const user: User = {
      username: this.username,
      password: this.password
    }

    this._userService.signIn(user).subscribe(data => {
      this.toastr.success(`El usuario ${this.username} fue registrado con exito`, 'Usuario registrado');
      this.router.navigate(['/login']);
    })

    
  }

}
