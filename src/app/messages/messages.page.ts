import { Message } from './../../models/message';
import { User } from 'src/models/user';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
  user: User = new User();
  @ViewChild('myTextarea', null) myTextarea: ElementRef;
  message = '';
  messages: Message[] = [];

  constructor(public camera: Camera, private route: ActivatedRoute, public actionSheetController: ActionSheetController) {
    this.route.queryParams.subscribe(params => {
      this.user = JSON.parse(params.user);
      console.log(this.user);
    });
  }


  ngOnInit() {
  }

  resize() {
    this.myTextarea.nativeElement.style.height = 'auto';
    this.myTextarea.nativeElement.style.height = this.myTextarea.nativeElement.scrollHeight + 'px';
  }

  sendText() {
    const now = new Date();
    const t = now.getHours() + ':' + now.getMinutes();
    if (this.message) {
      this.messages.push({
        id: this.messages.length + 1,
        type: 'text',
        message: this.message,
        url: '',
        time: t
      });
      this.message = '';
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Álbuns ',
      buttons: [
      {
        text: 'Câmera',
        icon: 'camera',
        cssClass: 'camera',
        handler: () => {
          this.fromCamera('camera');
        }
      }, {
        text: 'Galeria',
        icon: 'images',
        cssClass: 'images',
        handler: () => {
          this.fromCamera('galeria');
        }
      },
      {
        text: 'Cancelar',
        icon: 'close',
        cssClass: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  fromCamera(op) {
    let options: CameraOptions;
    let type;

    if (op === 'camera') {
      type = this.camera.PictureSourceType.CAMERA;
    } else if (op === 'galeria') {
      type = this.camera.PictureSourceType.PHOTOLIBRARY;
    }

    options = {
      quality: 100,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: type,
      allowEdit: true,
      targetWidth: 1000,
      targetHeight: 1000,
    };

    this.camera.getPicture(options).then((imageData) => {

      const now = new Date();
      const t = now.getHours() + ':' + now.getMinutes();
      this.messages.push({
        id: this.messages.length + 1,
        type: 'image',
        message: '',
        url: imageData,
        time: t
      });
    }, (err) => {
      // Handle error
    });

  }

}
