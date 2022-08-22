using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test1.Entities
{ 
    public class CalendarData
    {
        
        public List<CalendarItem> Items { get; set; }
    }
    public class WeekdayList
    {

        public List<Weekdays> Items { get; set; }
    }
    
    public class Weekdays
    {

        public DateTime MonDayDate { get; set; }
        public DateTime TuesdayDate { get; set; }
        public DateTime WednesdayDate { get; set; }
        public DateTime ThursdayDate { get; set; }
        public DateTime FridayDate { get; set; }
    }
    public class weekdaysDate
    {
        public DateTime date { get; set; }
    }
        public class list1itemByDay
    {

        public int id { get; set; }
        public string productName { get; set; }
        public string receiveBy { get; set; }
        public string fromLocation { get; set; }
        public string toLocation { get; set; }
        public string time { get; set; }
        public DateTime MonDayDate { get; set; }
        public DateTime TuesdayDate { get; set; }
        public DateTime WednesdayDate { get; set; }
        public DateTime ThursdayDate { get; set; }
        public DateTime FridayDate { get; set; }
    }
    

    public class CalendarItem
    {
        public int id { get; set; }
        public string Day { get; set; }
        public string productName { get; set; }
        public string receiveBy { get; set; }
        public string fromLocation { get; set; }
        public string toLocation { get; set; }
        public string time { get; set; }
        public DateTime receiveDate { get; set; }
    }
    public class NewCalendarData
    {
        public int id { get; set; }
        public string productName { get; set; }
        public string receiveBy { get; set; }
        public string fromLocation { get; set; }
        public string toLocation { get; set; }
        public string time { get; set; }
        public DateTime receiveDate { get; set; }

    }
    public class ProductNamesList
    {

        public List<ProductNames> Items { get; set; }
    }
    public class ProductNames
    {
        public int id { get; set; }
        public string productName { get; set; }
        public string receiveBy { get; set; }
        public string fromLocation { get; set; }
        public string toLocation { get; set; }
        public string time { get; set; }
        public DateTime receiveDate { get; set; }

    }
    
    
    public class locationlist
    {
        public int id { get; set; }
        public string location { get; set; }

    }
    public class UserCredential
    {
        public string email { get; set; }
        public string password { get; set; }
        public string role { get; set; }
    }
        public class NewUser
    {
        public int userid { get; set; }
        public string fullName { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string role { get; set; } 

    }


}
