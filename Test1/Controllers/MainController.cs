using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Test1.Entities;
using Test1.Helpers;


namespace Test1.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MainController : Controller
    {
        private readonly LiveUpdates _liveUpdates;
        public MainController(LiveUpdates liveUpdates)
        {
            _liveUpdates = liveUpdates;
        }

        //[HttpGet]
        //public JsonResult PullData()
        //{
        //    var Data = DisplayContext.PullPageData();
        //    return Json(Data);
        //}

        [HttpGet]
        public JsonResult PullAdminData()
        {
            var Data = AdminContext.PullAdminData();
            return Json(Data);
        }

        [HttpGet]
        public JsonResult TestLive()
        {
            _liveUpdates.DataUpdate();
            return Json(new { });
        }

        

        [HttpPost]
        public JsonResult AdminLogin([FromBody] LoginItems credentials)
        {
            string code;
            if (credentials.Username == "dave" && credentials.Password == "hello")
            {
                code = "Success";

            }
            else
            {
               code = "Fail";
            }

            return Json(new { code });
        }

        [HttpPost]
        public JsonResult NewTask ([FromBody] New_Task task)
        {
            Console.WriteLine($@"{task.MachineName}, {task.TaskName}, {task.TaskDate}");
            AdminContext.AddNewTask(task);
            _liveUpdates.DataUpdate();
            return Json(new { });
        }

        [HttpGet("{taskid}")]
        public JsonResult CompletedTask (int taskid)
        {
            AdminContext.CompleteTask(taskid);
            _liveUpdates.DataUpdate();
            return Json(new { });
        }

        [HttpPost]
        public JsonResult GreenSheet ([FromBody] GreenSheet info)
        {
            AdminContext.SubmitGreenSheet(info);
            _liveUpdates.DataUpdate(); 
            return Json(new { });
        }

        [HttpGet("{taskid}")]
        public JsonResult PullTask(int taskid)
        {
            var Task = AdminContext.PullEditTask(taskid);
            Console.WriteLine(taskid);
            return Json(Task);
        }

        [HttpPost("{taskid}")]
        public JsonResult EditTask([FromBody] PullTask task, int taskid)
        {
            AdminContext.UpdateTask(taskid, task);
            _liveUpdates.DataUpdate();
            return Json(new { });
        }


         
       
        
    }
}