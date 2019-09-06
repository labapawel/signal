import { Component, OnInit } from '@angular/core';
import { ServiceClickService } from '../service-click.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.sass']
})
export class ConnectComponent implements OnInit {

  userName: string;
  message: string;


  groupName: string = "";

  constructor(private conn:ServiceClickService) { }

  ngOnInit() {
  }

  addGroup = () => {
    this.conn.addGroup(this.groupName);
  }

  delGroup = () => {
    this.conn.removeGroup(this.groupName);
  }


  send = () => {
    if(this.groupName == "")
    this.conn.sendMessage(this.userName, this.message);
    else
    this.conn.sendGroup(this.groupName, this.message);
  }
  userList = () => {
    this.conn.userList(this.userName);
  }

}
