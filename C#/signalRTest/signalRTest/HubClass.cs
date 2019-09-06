using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace signalRTest
{
  public class HubClass: Hub
  {
    public static HashSet<string> ConnectedIds = new HashSet<string>();

    public override async Task OnConnectedAsync()
    {
      ConnectedIds.Add(Context.ConnectionId);
      await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
      ConnectedIds.Remove(Context.ConnectionId);
      await base.OnDisconnectedAsync(exception);
    }

    public async Task Send(string name, string message)
    {
      await this.Clients.All.SendAsync("Send", name, message);
    }

    public async Task sendGroup(string name, string message)
    {
      await this.Clients.Group(name).SendAsync("SendX", name, message);
    }

    public async Task userList(string name)
    {
      await this.Clients.Client(Context.ConnectionId).SendAsync("userList", ConnectedIds);
    }

    public async Task JoinGroup(string roomName)
    {
      await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
    }

    public async Task RemoveGroup(string roomName)
    {
      await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
    }

  }
}
