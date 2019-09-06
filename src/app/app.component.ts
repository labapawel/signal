import { Component } from '@angular/core';
import { ServiceClickService } from './service-click.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'signal';
  constructor(private conn: ServiceClickService){
    conn.startConnection();
    conn.connectionListen();
  }
}
