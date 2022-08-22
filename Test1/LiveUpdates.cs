using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Test1.Helpers;
using Test1.Entities;

namespace Test1
{
    public class LiveUpdatesHub : Hub
    {
        public class LiveUpdates
        {
        }

        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "Clients");
            await base.OnConnectedAsync();
            Console.WriteLine("New Client Connected");
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "Clients");
            await base.OnDisconnectedAsync(exception);
        }

    }

    public class LiveUpdates
    {
        public LiveUpdates(IHubContext<LiveUpdatesHub> hub)
        {
            Hub = hub;

        }

        private IHubContext<LiveUpdatesHub> Hub
        {
            get;
            set;
        }

        public async void Test()
        {
            Console.WriteLine("Broadcasting Test");
            await Hub.Clients.All.SendAsync("TestUpdate");
        }

        public async void DataUpdate()
        {
            Console.WriteLine("Broadcasting Data Update");
            await Hub.Clients.All.SendAsync("DataUpdate");
        }

        public async void VialDataUpdate()
        {
            Console.WriteLine("Broadcasting Vial Update");
            await Hub.Clients.All.SendAsync("VialUpdate");
        }

        public async void ProductionUpdate()
        {
            Console.WriteLine("Broadcasting Production Update");
            await Hub.Clients.All.SendAsync("ProdViewUpdate");
        }

        public async void PKSUpdate()
        {
            Console.WriteLine("Broadcasting PKS Update");
            await Hub.Clients.All.SendAsync("PKSViewUpdate");
        }

        public async void InvUpdate()
        {
            Console.WriteLine("Broadcasting Inventory Update");
            await Hub.Clients.All.SendAsync("InventoryUpdate");
        }
        public async void CalUpdate()
        {
            Console.WriteLine("Broadcasting Calendar Update");
            await Hub.Clients.All.SendAsync("CalendarUpdate");
        }
        public async void MachUpdate()
        {
            Console.WriteLine("Broadcasting Machine Update");
            await Hub.Clients.All.SendAsync("MachineViewUpdate");
        }

        public async void CShUpdate()
        {
            Console.WriteLine("Broadcasting CS Update");
            await Hub.Clients.All.SendAsync("CustomerServiceUpdate");
        }
    }
}
