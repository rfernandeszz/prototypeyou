import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { User } from 'src/models/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  users: User[] = [
    { name: 'Vitor Hugo', img: '', lastmessagetime: '20:31' },
    { name: 'Ana Paula', img: '', lastmessagetime: '19:20'},
    { name: 'Rodrigo Silva', img: '', lastmessagetime: '18:45' },
    { name: 'Paulo Souza', img: '', lastmessagetime: '08:45' }
  ];
  constructor(public navCtrl: NavController) {}

  goMessages(user) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(user),
      }
    };

    this.navCtrl.navigateForward('messages', navigationExtras);
  }

}
