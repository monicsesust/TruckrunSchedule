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
    [Route("api/MainCal/[action]")]
    [ApiController]
    public class CalendarController : Controller
    {
        private readonly LiveUpdates _liveUpdates;
        public CalendarController(LiveUpdates liveUpdates)
        {
            _liveUpdates = liveUpdates;
        }

        [HttpGet]
        public JsonResult PullCalendarInfo()
        {
            CalendarData DataPack = new CalendarData();
            List<CalendarItem>  Items = CalendarContext.PullCalendarInfo();

            DataPack.Items = Items;
            return Json(DataPack);
        }
        [HttpGet]
        public Dictionary<string, List<ProductNames>> getMondayDataDic()
        {

            Dictionary<string, List<ProductNames>> Items = CalendarContext.getMondayDataDic();
            return Items;
        }
        [HttpGet]
        public Dictionary<string, List<ProductNames>> getTuesdayDataDic()
        {

            Dictionary<string, List<ProductNames>> Items = CalendarContext.getTuesdayDataDic();
            return Items;
        }
        [HttpGet]
        public Dictionary<string, List<ProductNames>> getWednesdayDataDic()
        {

            Dictionary<string, List<ProductNames>> Items = CalendarContext.getWednesdayDataDic();
            return Items;
        }
        [HttpGet]
        public Dictionary<string, List<ProductNames>> getThursdayDataDic()
        {

            Dictionary<string, List<ProductNames>> Items = CalendarContext.getThursdayDataDic();
            return Items;
        }
        [HttpGet]
        public Dictionary<string, List<ProductNames>> getFridayDataDic()
        {

            Dictionary<string, List<ProductNames>> Items = CalendarContext.getFridayDataDic();
            return Items;
        }
        [HttpGet]
        public Dictionary<string, List<ProductNames>> getMondayNoonDataDic()
        {

            Dictionary<string, List<ProductNames>> Items = CalendarContext.getMondayNoonDataDic();
            return Items;
        }
        [HttpGet]
        public Dictionary<string, List<ProductNames>> getTuesdayNooDataDic()
        {

            Dictionary<string, List<ProductNames>> Items = CalendarContext.getTuesdayNooDataDic();
            return Items;
        }
        [HttpGet]
        public Dictionary<string, List<ProductNames>> getWednesdayNoonDataDic()
        {

            Dictionary<string, List<ProductNames>> Items = CalendarContext.getWednesdayNoonDataDic();
            return Items;
        }
        [HttpGet]
        public Dictionary<string, List<ProductNames>> getThursdayNoonDataDic()
        {

            Dictionary<string, List<ProductNames>> Items = CalendarContext.getThursdayNoonDataDic();
            return Items;
        }
        [HttpGet]
        public Dictionary<string, List<ProductNames>> getFridayNoonDatanDic()
        {

            Dictionary<string, List<ProductNames>> Items = CalendarContext.getFridayNoonDatanDic();
            return Items;
        }
        [HttpGet]
        public Dictionary<string, string> getDictionary()
        {
          
            Dictionary<string, string> Items = CalendarContext.getweekDates();
            return Items;
        }
        [HttpGet("{fromDate}/{toDate}")]

        public Dictionary<string, List<ProductNames>> searchData(string fromdate, string toDate)
        {

            Dictionary<string, List<ProductNames>> Items = CalendarContext.searchData(fromdate, toDate);
            return Items;
        }

        //[HttpGet]
        //public JsonResult searchData()
        //{

        //    ProductNamesList DataPack = new ProductNamesList();
        //    List<ProductNames> Items = CalendarContext.searchData();
        //    DataPack.Items = Items;
        //    return Json(DataPack);
        //}
        //[HttpGet("{fromDate}/{toDate}")]
        //public JsonResult searchData(string fromdate, string toDate)
        //{
        //    ProductNamesList DataPack = new ProductNamesList();
        //    List<ProductNames> Items = CalendarContext.searchData(fromdate, toDate);

        //    DataPack.Items = Items;
        //    return Json(DataPack);
        //}
        [HttpGet]
        public JsonResult WeekdayList()
        {
            WeekdayList DataPack = new WeekdayList();
            List<Weekdays> Items = CalendarContext.PullWeekDays();
             
            DataPack.Items = Items;
            return Json(DataPack); 
        }
        [HttpPost]
        public JsonResult AddCalendarInfo([FromBody] NewCalendarData data)
        {
            CalendarContext.AddCalendarInfo(data);
            _liveUpdates.CalUpdate();
            return Json(new { });
        }
        //[HttpGet("{location}/{receiveDate}/{time}")]
        //public JsonResult GetDataByLocationDateTimeType(String location, String receiveDate, String time)
        //{
        //    listBytLocdateTimeTypList DataPack = new listBytLocdateTimeTypList();
        //    List<listDataBtLocationdateTimeType> Items = CalendarContext.GetDataByLocationDateTimeType(location, receiveDate, time);

        //    DataPack.Items = Items;
        //    return Json(DataPack);
        //}
        [HttpPost("{id}")]
        public JsonResult EditSchedule( int id, [FromBody] ProductNames schedule)
        {
            CalendarContext.UpdateSchedule(id, schedule);
            _liveUpdates.DataUpdate();
            return Json(new { });
        }
        [HttpPost("{id}")]
        public JsonResult DeleteSchedule(int id)
        {
            CalendarContext.DeleteSchedule(id);
            _liveUpdates.DataUpdate();
            return Json(new { });
        }
        [HttpPost]
        public JsonResult AddUser([FromBody] NewUser data)
        {
            CalendarContext.AddUser(data);
            _liveUpdates.CalUpdate();
            return Json(new { });
        }


        [HttpGet("{email}/{password}")] 
        public JsonResult Findloginuser(string email,string password)
        {
            var user = CalendarContext.Findloginuser(email, password);
            Console.WriteLine(email,password);
            return Json(user);
        }

    }
}

 