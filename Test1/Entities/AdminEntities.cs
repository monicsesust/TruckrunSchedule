using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test1.Entities
{
    public class AdminEntities
    {
    }

    public class LoginItems
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class PageDataAdmin
    {
        public List<Machine_Item_Admin> Machines { get; set; }
    }

    public class Machine_Item_Admin
    {
        public string MachineName { get; set; }
        public List<Task_Item_Admin> TaskList { get; set; }
        
    }

    public class Task_Item_Admin
    {
        public int TaskID { get; set; }
        public int TaskOrder { get; set; }
        public string TaskName { get; set; }
        public int TaskYeild { get; set; }
        public bool TaskCompleted { get; set; }
    }

    public class New_Task
    {
        public string MachineName { get; set; }
        public int TaskDate { get; set; }
        public int TaskOrder { get; set; }
        public string TaskName { get; set; }
        public string LotNumber { get; set; }
        public string RollStart { get; set; }
        public string RollEnd { get; set; }
        public bool Highlight { get; set; }

    }

    public class CompleteTask
    {
        public int TaskID;
    }

    public class GreenSheet
    {
        public string MachineName { get; set; }
        public string LotNumber { get; set; }
        public int RollNumber { get; set; }
        public int YeildQuantity { get; set; }
    }

    public class PullTask
    {
        public string FullTaskName { get; set; }
        public string LotNumber { get; set; }
        public int RollStart { get; set; }
        public int RollEnd { get; set; }
    }

    public class CovidText
    {
        public string FullName { get; set; }

        public string BadgeNumber { get; set; }
        public string PhoneNumber { get; set; }
        public string Language { get; set; }
    }
}
