import { Injectable } from "@angular/core";
import * as signalR from "@aspnet/signalr";
import { BehaviorSubject } from "rxjs";
import { CompileInjectableMetadata } from "@angular/compiler";

interface clickClient {
  name: string;
  countClic: number;
}

@Injectable({
  providedIn: "root"
})
export class ServiceClickService {
  private clickClients = new BehaviorSubject<Array<clickClient>>([]);
  private ClientList: Array<clickClient>;
  private count = 0;
  private connect: signalR.HubConnection;
  constructor() {
    this.connect = new signalR.HubConnectionBuilder()
      //                  .withUrl("http://localhost:55393/server")
      .withUrl("http://localhost:55393/click")
      .build();
    setInterval(() => {
      this.startConnection();
    }, 10000);
  }

  startConnection = () => {
    if (this.connect.state == 0) {
      this.connect
        .start()
        .then(() => {
          console.log("connect");
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  sendMessage = (userName, message) => {
    this.connect.invoke("send", userName, message);
  };

  sendGroup = (groupName, message) => {
    this.connect.invoke("sendGroup", groupName, message);
  };

  clickCount = () => {
    this.connect.invoke("clickCount", this.count);
  };

  userList = userName => {
    this.connect.invoke("userList", userName);
  };

  addGroup = groupName => {
    this.connect.invoke("JoinGroup", groupName);
  };

  removeGroup = groupName => {
    this.connect.invoke("RemoveGroup", groupName);
  };

  connectionListen = () => {
    this.connect.on("send", (name, message) => {
      console.log("user:" + name + " mess:" + message);
    });

    this.connect.on("sendx", (name, message) => {
      console.log("grupa:" + name + " mess:" + message);
    });

    this.connect.on("userList", userList => {
      console.log(userList);
    });

    this.connect.on("clickClients", items => {
      console.log(items);
    });

    this.connect.on("group", groupName => {
      console.log("group:" + groupName);
    });
  };
}
