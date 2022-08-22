using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using Test1.Entities;
using static Test1.DBConnection;


namespace Test1.Helpers
{
    public class CalendarContext
    {
        public static Dictionary<string, string> getweekDates()
        {
            DateTime today = DateTime.Now;

            var thisWeekStart = today.AddDays(-(int)today.DayOfWeek);
            var Monday = thisWeekStart.AddDays(1).AddSeconds(-1).ToString("MM'/'dd'/'yyyy");
            var Tuesday = thisWeekStart.AddDays(2).AddSeconds(-1).ToString("MM'/'dd'/'yyyy");
            var Wednesday = thisWeekStart.AddDays(3).AddSeconds(-1).ToString("MM'/'dd'/'yyyy");
            var Thursday = thisWeekStart.AddDays(4).AddSeconds(-1).ToString("MM'/'dd'/'yyyy");
            var Friday = thisWeekStart.AddDays(5).AddSeconds(-1).ToString("MM'/'dd'/'yyyy");
            Dictionary<string, string> myDict =  new Dictionary<string, string>();
            for (int d = 0; d < 5; d++)
            {

                if (d == 0)
                {
                    myDict.Add("Monday", Monday);
                }

                else if (d == 1)
                {
                    myDict.Add("Tuesday", Tuesday);

                }
                else if (d == 2)
                {
                    myDict.Add("Wednesday", Wednesday);

                }
                else if (d == 3)
                {
                    myDict.Add("Thursday", Thursday);

                }
                else
                {
                    myDict.Add("Friday", Friday);

                }
            }

            return myDict;
        }      
        public static List<Weekdays> PullWeekDays()
        {
            DateTime today = DateTime.Now;
            List<Weekdays> items = new List<Weekdays>();
            var thisWeekStart = today.AddDays(-(int)today.DayOfWeek);
            var Monday = thisWeekStart.AddDays(1).AddSeconds(-1).ToString("MM'/'dd'/'yyyy");
            var Tuesday = thisWeekStart.AddDays(2).AddSeconds(-1).ToString("MM'/'dd'/'yyyy");
            var Wednesday = thisWeekStart.AddDays(3).AddSeconds(-1).ToString("MM'/'dd'/'yyyy");
            var Thursday = thisWeekStart.AddDays(4).AddSeconds(-1).ToString("MM'/'dd'/'yyyy");
            var Friday = thisWeekStart.AddDays(5).AddSeconds(-1).ToString("MM'/'dd'/'yyyy");

            //items.Add(Monday, new Weekdays());

            for (int d = 0; d < 5; d++)
            {

                if (d == 0)
                {
                    items.Add(new Weekdays
                    {
                        MonDayDate = Convert.ToDateTime(Monday)

                    });

                }
                else if (d == 1)
                {
                    items.Add(new Weekdays
                    {
                        TuesdayDate = Convert.ToDateTime(Tuesday)

                    });

                }
                else if (d == 2)
                {
                    items.Add(new Weekdays
                    {
                        WednesdayDate = Convert.ToDateTime(Wednesday)

                    });

                }
                else if (d == 3)
                {
                    items.Add(new Weekdays
                    {
                        ThursdayDate = Convert.ToDateTime(Thursday)

                    });

                }
                else
                {
                    items.Add(new Weekdays
                    {
                        FridayDate = Convert.ToDateTime(Friday)

                    }); 
                }

        }

            return items;
        }
        public static Dictionary<string, List<ProductNames>> searchData(string fromdate, string toDate)
        {

            //Dictionary<DateTime, List<ProductNames>> output = new Dictionary<DateTime, List<ProductNames>>();
            List<ProductNames> products = new List<ProductNames>();

            var fDate = Convert.ToDateTime(fromdate).ToString("yyyy'/'MM'/'dd");
            var tdate = Convert.ToDateTime(toDate).ToString("yyyy'/'MM'/'dd");
            using (MySqlConnection conn = Connection)
            {
                MySqlCommand cmd = new MySqlCommand($@"SELECT id, productName, receiveBy, fromLocation, toLocation,  time , receiveDate FROM truckruncalendar.truckrunschedules where Date(receiveDate) between Date('{fDate}') and Date('{tdate}') ORDER BY Date(receiveDate) DESC", conn);
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())

                    { 
                            products.Add(new ProductNames
                            {
                                id = Convert.ToInt32(reader["id"]),
                                productName = Convert.ToString(reader["productName"]),
                                receiveBy = Convert.ToString(reader["receiveBy"]),
                                fromLocation = Convert.ToString(reader["fromLocation"]),
                                toLocation = Convert.ToString(reader["toLocation"]),
                                time = Convert.ToString(reader["time"]),
                                receiveDate = Convert.ToDateTime(reader["receiveDate"]),
                            }); 
                    } 
                }
            }

            Dictionary <string, List<ProductNames>> output = products.GroupBy(b => b.receiveDate.ToString("MM/dd/yyyy")).Distinct()
                   .ToDictionary(b => b.Key, b => b.ToList());

            return output;
        }
        //public static Dictionary<DateTime, List<ProductNames>> searchData(string fromdate, string toDate)
        //{

        //    //Dictionary<DateTime, List<ProductNames>> output = new Dictionary<DateTime, List<ProductNames>>();
        //    List<ProductNames> products = new List<ProductNames>();

        //    var fDate = Convert.ToDateTime(fromdate).ToString("yyyy'/'MM'/'dd");
        //    var tdate = Convert.ToDateTime(toDate).ToString("yyyy'/'MM'/'dd");
        //    using (MySqlConnection conn = Connection)
        //    {
        //        MySqlCommand cmd = new MySqlCommand($@"SELECT id, productName, receiveBy, fromLocation, toLocation,  time , receiveDate FROM truckruncalendar.truckrunschedules where Date(receiveDate) between Date('{fDate}') and Date('{tdate}')", conn);
        //        using (var reader = cmd.ExecuteReader())
        //        {
        //            while (reader.Read())

        //            {
        //                products.Add(new ProductNames
        //                {
        //                    id = Convert.ToInt32(reader["id"]),
        //                    productName = Convert.ToString(reader["productName"]),
        //                    receiveBy = Convert.ToString(reader["receiveBy"]),
        //                    fromLocation = Convert.ToString(reader["fromLocation"]),
        //                    toLocation = Convert.ToString(reader["toLocation"]),
        //                    time = Convert.ToString(reader["time"]),
        //                    receiveDate = Convert.ToDateTime(reader["receiveDate"]),
        //                });
        //            }
        //        }
        //    }

        //    Dictionary<DateTime, List<ProductNames>> output = products.GroupBy(b => b.receiveDate).Distinct()
        //           .ToDictionary(b => b.Key, b => b.ToList());

        //    return output;
        //}

        //public static List<ProductNames> searchData(string fromdate, string toDate)
        //{

        //    //Dictionary<DateTime, List<ProductNames>> output = new Dictionary<DateTime, List<ProductNames>>();
        //    List<ProductNames> products = new List<ProductNames>();

        //    var fDate = Convert.ToDateTime(fromdate).ToString("yyyy'/'MM'/'dd");
        //    var tdate = Convert.ToDateTime(toDate).ToString("yyyy'/'MM'/'dd");
        //    using (MySqlConnection conn = Connection)
        //    {
        //        MySqlCommand cmd = new MySqlCommand($@"SELECT id, productName, receiveBy, fromLocation, toLocation,  time , receiveDate FROM truckruncalendar.truckrunschedules where Date(receiveDate) =  Date({fDate})", conn);
        //        using (var reader = cmd.ExecuteReader())
        //        {
        //            while (reader.Read())

        //            {
        //                products.Add(new ProductNames
        //                {
        //                    id = Convert.ToInt32(reader["id"]),
        //                    productName = Convert.ToString(reader["productName"]),
        //                    receiveBy = Convert.ToString(reader["receiveBy"]),
        //                    fromLocation = Convert.ToString(reader["fromLocation"]),
        //                    toLocation = Convert.ToString(reader["toLocation"]),
        //                    time = Convert.ToString(reader["time"]),
        //                    receiveDate = Convert.ToDateTime(reader["receiveDate"]),
        //                });

        //                //var rcvdate = Convert.ToDateTime(reader["receiveDate"]);
        //                //if (datelist.Contains(rcvdate) == false)
        //                //{
        //                //    datelist.Add(Convert.ToDateTime(reader["receiveDate"]));
        //                //    if (rcvdate== Convert.ToDateTime(reader["receiveDate"]))
        //                //    {
        //                //        products.Add(new ProductNames
        //                //        {
        //                //            id = Convert.ToInt32(reader["id"]),
        //                //            productName = Convert.ToString(reader["productName"]),
        //                //            receiveBy = Convert.ToString(reader["receiveBy"]),
        //                //            fromLocation = Convert.ToString(reader["fromLocation"]),
        //                //            toLocation = Convert.ToString(reader["toLocation"]),
        //                //            time = Convert.ToString(reader["time"]),
        //                //            receiveDate = Convert.ToDateTime(reader["receiveDate"]),
        //                //        });
        //                //    }
        //                //}
        //            }
        //        }
        //    }

        //    //    Dictionary<DateTime, List<ProductNames>> output= products.GroupBy(k => k.receiveDate)
        //    //.OrderByDescending(k => k.Key)
        //    //.ToDictionary(k => k.Key, v => v.OrderByDescending(x => x.receiveDate).ToList());
        //    //Dictionary<DateTime, List<ProductNames>> output= products.GroupBy(b => b.receiveDate).Distinct()
        //    //       .ToDictionary(b => b.Key, b => b.ToList());

        //    return products;
        //}
        public static Dictionary<string, List<ProductNames>> getMondayDataDic()
        {           
            Dictionary<string, List<ProductNames>> myDict = MondayData();
            return myDict;

        }
        public static Dictionary<string, List<ProductNames>> getTuesdayDataDic()
        {
           
            Dictionary<string, List<ProductNames>> myDict = TuesdayData();
            List<ProductNames> products = new List<ProductNames>();
            return myDict;

        }
        public static Dictionary<string, List<ProductNames>> getWednesdayDataDic()
        {
           
            Dictionary<string, List<ProductNames>> myDict = WednesdayData();
            return myDict;

        }
        public static Dictionary<string, List<ProductNames>> getThursdayDataDic()
        {
          
            Dictionary<string, List<ProductNames>> myDict = ThursdayData();
            return myDict;

        }
        public static Dictionary<string, List<ProductNames>> getFridayDataDic()
        {
           
            Dictionary<string, List<ProductNames>> myDict = FridayData();
            return myDict;

        }
        public static Dictionary<string, List<ProductNames>> getMondayNoonDataDic()
        {
            Dictionary<string, List<ProductNames>> myDict = MondayNoonData();
            return myDict;

        }
        public static Dictionary<string, List<ProductNames>> getTuesdayNooDataDic()
        {

            Dictionary<string, List<ProductNames>> myDict = TuesdayNoonData();
            return myDict;

        }
        public static Dictionary<string, List<ProductNames>> getWednesdayNoonDataDic()
        {

            Dictionary<string, List<ProductNames>> myDict = WednesdayNoonData();
            return myDict;

        }
        public static Dictionary<string, List<ProductNames>> getThursdayNoonDataDic()
        {

            Dictionary<string, List<ProductNames>> myDict = ThursdayNoonData();
            return myDict;

        }
        public static Dictionary<string, List<ProductNames>> getFridayNoonDatanDic()
        {

            Dictionary<string, List<ProductNames>> myDict = FridayNoonData();
            return myDict;

        }
        public static Dictionary<string, List<ProductNames>> MondayData()
        {
            Dictionary<string, List<ProductNames>> output = new Dictionary<string, List<ProductNames>>();

            DateTime today = DateTime.Now;
            var thisWeekStart = today.AddDays(-(int)today.DayOfWeek);
            var Monday = thisWeekStart.AddDays(1).AddSeconds(-1);
            var Date = Convert.ToDateTime(Monday).ToString("yyyy'/'MM'/'dd");
             
             List<ProductNames> products = new List<ProductNames>();
                using (MySqlConnection conn = Connection)
                {
                    MySqlCommand cmd = new MySqlCommand($@"SELECT id, productName, receiveBy, fromLocation, toLocation,  time , receiveDate FROM truckruncalendar.truckrunschedules where Date(receiveDate)= DATE('{Date}') and time='10-10:30 AM' ", conn);
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())

                        {
                            products.Add(new ProductNames
                            {
                                id = Convert.ToInt32(reader["id"]), 
                                productName = Convert.ToString(reader["productName"]),
                                receiveBy = Convert.ToString(reader["receiveBy"]),
                                fromLocation= Convert.ToString(reader["fromLocation"]),
                                toLocation = Convert.ToString(reader["toLocation"]),
                                time = Convert.ToString(reader["time"]),
                                receiveDate = Convert.ToDateTime(reader["receiveDate"]),
                            });
                        }
                        output.Add("Monday", products);
                    }


                } 
            return output;
        }
        public static Dictionary<string, List<ProductNames>> TuesdayData()
        {
            Dictionary<string, List<ProductNames>> output = new Dictionary<string, List<ProductNames>>();

            DateTime today = DateTime.Now;
            var thisWeekStart = today.AddDays(-(int)today.DayOfWeek);
            var Tuesday = thisWeekStart.AddDays(2).AddSeconds(-1);
            var Date = Convert.ToDateTime(Tuesday).ToString("yyyy'/'MM'/'dd");

            List<ProductNames> products = new List<ProductNames>();
            using (MySqlConnection conn = Connection)
            {
                MySqlCommand cmd = new MySqlCommand($@"SELECT id, productName, receiveBy, fromLocation, toLocation,  time , receiveDate FROM truckruncalendar.truckrunschedules where Date(receiveDate)= DATE('{Date}') and time='10-10:30 AM' ", conn);
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())

                    {
                        products.Add(new ProductNames
                        {
                            id = Convert.ToInt32(reader["id"]),
                            productName = Convert.ToString(reader["productName"]),
                            receiveBy = Convert.ToString(reader["receiveBy"]),
                            fromLocation = Convert.ToString(reader["fromLocation"]),
                            toLocation = Convert.ToString(reader["toLocation"]),
                            time = Convert.ToString(reader["time"]),
                            receiveDate = Convert.ToDateTime(reader["receiveDate"]),
                        });
                    }
                    output.Add("Tuesday", products);
                }


            }
            return output;
        }
        public static Dictionary<string, List<ProductNames>> WednesdayData()
        {
            Dictionary<string, List<ProductNames>> output = new Dictionary<string, List<ProductNames>>();

            DateTime today = DateTime.Now;
            var thisWeekStart = today.AddDays(-(int)today.DayOfWeek);
            var Wednesday = thisWeekStart.AddDays(3).AddSeconds(-1);
            var Date = Convert.ToDateTime(Wednesday).ToString("yyyy'/'MM'/'dd");

            List<ProductNames> products = new List<ProductNames>();
            using (MySqlConnection conn = Connection)
            {
                MySqlCommand cmd = new MySqlCommand($@"SELECT id, productName, receiveBy, fromLocation, toLocation,  time , receiveDate FROM truckruncalendar.truckrunschedules where Date(receiveDate)= DATE('{Date}') and time='10-10:30 AM' ", conn);
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())

                    {
                        products.Add(new ProductNames
                        {
                            id = Convert.ToInt32(reader["id"]),
                            productName = Convert.ToString(reader["productName"]),
                            receiveBy = Convert.ToString(reader["receiveBy"]),
                            fromLocation = Convert.ToString(reader["fromLocation"]),
                            toLocation = Convert.ToString(reader["toLocation"]),
                            time = Convert.ToString(reader["time"]),
                            receiveDate = Convert.ToDateTime(reader["receiveDate"]),
                        });
                    }
                    output.Add("Wednesday", products);
                }


            }
            return output;
        }
        public static Dictionary<string, List<ProductNames>> ThursdayData()
        {
            Dictionary<string, List<ProductNames>> output = new Dictionary<string, List<ProductNames>>();

            DateTime today = DateTime.Now;
            var thisWeekStart = today.AddDays(-(int)today.DayOfWeek);
            var Thursday = thisWeekStart.AddDays(4).AddSeconds(-1);
            var Date = Convert.ToDateTime(Thursday).ToString("yyyy'/'MM'/'dd");

            List<ProductNames> products = new List<ProductNames>();
            using (MySqlConnection conn = Connection)
            {
                MySqlCommand cmd = new MySqlCommand($@"SELECT id, productName, receiveBy, fromLocation, toLocation,  time , receiveDate FROM truckruncalendar.truckrunschedules where Date(receiveDate)= DATE('{Date}') and time='10-10:30 AM' ", conn);
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())

                    {
                        products.Add(new ProductNames
                        {
                            id = Convert.ToInt32(reader["id"]),
                            productName = Convert.ToString(reader["productName"]),
                            receiveBy = Convert.ToString(reader["receiveBy"]),
                            fromLocation = Convert.ToString(reader["fromLocation"]),
                            toLocation = Convert.ToString(reader["toLocation"]),
                            time = Convert.ToString(reader["time"]),
                            receiveDate = Convert.ToDateTime(reader["receiveDate"]),
                        });
                    }
                    output.Add("Thursday", products);
                }


            }
            return output;
        }
        public static Dictionary<string, List<ProductNames>> FridayData()
        {
            Dictionary<string, List<ProductNames>> output = new Dictionary<string, List<ProductNames>>();

            DateTime today = DateTime.Now;
            var thisWeekStart = today.AddDays(-(int)today.DayOfWeek);
            var Friday = thisWeekStart.AddDays(5).AddSeconds(-1);
            var Date = Convert.ToDateTime(Friday).ToString("yyyy'/'MM'/'dd");

            List<ProductNames> products = new List<ProductNames>();
            using (MySqlConnection conn = Connection)
            {
                MySqlCommand cmd = new MySqlCommand($@"SELECT id, productName, receiveBy, fromLocation, toLocation,  time , receiveDate FROM truckruncalendar.truckrunschedules where Date(receiveDate)= DATE('{Date}') and time='10-10:30 AM' ", conn);
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())

                    {
                        products.Add(new ProductNames
                        {
                            id = Convert.ToInt32(reader["id"]),
                            productName = Convert.ToString(reader["productName"]),
                            receiveBy = Convert.ToString(reader["receiveBy"]),
                            fromLocation = Convert.ToString(reader["fromLocation"]),
                            toLocation = Convert.ToString(reader["toLocation"]),
                            time = Convert.ToString(reader["time"]),
                            receiveDate = Convert.ToDateTime(reader["receiveDate"]),
                        });
                    }
                    output.Add("Friday", products);
                }


            }
            return output;
        }




        public static Dictionary<string, List<ProductNames>> MondayNoonData()
        {
            Dictionary<string, List<ProductNames>> output = new Dictionary<string, List<ProductNames>>();

            DateTime today = DateTime.Now;
            var thisWeekStart = today.AddDays(-(int)today.DayOfWeek);
            var Monday = thisWeekStart.AddDays(1).AddSeconds(-1);
            var Date = Convert.ToDateTime(Monday).ToString("yyyy'/'MM'/'dd");

            List<ProductNames> products = new List<ProductNames>();
            using (MySqlConnection conn = Connection)
            {
                MySqlCommand cmd = new MySqlCommand($@"SELECT id, productName, receiveBy, fromLocation, toLocation,  time , receiveDate FROM truckruncalendar.truckrunschedules where Date(receiveDate)= DATE('{Date}') and time='02-02:30 PM' ", conn);
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())

                    {
                        products.Add(new ProductNames
                        {
                            id = Convert.ToInt32(reader["id"]),
                            productName = Convert.ToString(reader["productName"]),
                            receiveBy = Convert.ToString(reader["receiveBy"]),
                            fromLocation = Convert.ToString(reader["fromLocation"]),
                            toLocation = Convert.ToString(reader["toLocation"]),
                            time = Convert.ToString(reader["time"]),
                            receiveDate = Convert.ToDateTime(reader["receiveDate"]),
                        });
                    }
                    output.Add("Monday", products);
                }


            }
            return output;
        }
        public static Dictionary<string, List<ProductNames>> TuesdayNoonData()
        {
            Dictionary<string, List<ProductNames>> output = new Dictionary<string, List<ProductNames>>();

            DateTime today = DateTime.Now;
            var thisWeekStart = today.AddDays(-(int)today.DayOfWeek);
            var Tuesday = thisWeekStart.AddDays(2).AddSeconds(-1);
            var Date = Convert.ToDateTime(Tuesday).ToString("yyyy'/'MM'/'dd");

            List<ProductNames> products = new List<ProductNames>();
            using (MySqlConnection conn = Connection)
            {
                MySqlCommand cmd = new MySqlCommand($@"SELECT id, productName, receiveBy, fromLocation, toLocation,  time , receiveDate FROM truckruncalendar.truckrunschedules where Date(receiveDate)= DATE('{Date}') and time='02-02:30 PM' ", conn);
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())

                    {
                        products.Add(new ProductNames
                        {
                            id = Convert.ToInt32(reader["id"]),
                            productName = Convert.ToString(reader["productName"]),
                            receiveBy = Convert.ToString(reader["receiveBy"]),
                            fromLocation = Convert.ToString(reader["fromLocation"]),
                            toLocation = Convert.ToString(reader["toLocation"]),
                            time = Convert.ToString(reader["time"]),
                            receiveDate = Convert.ToDateTime(reader["receiveDate"]),
                        });
                    }
                    output.Add("Tuesday", products);
                }


            }
            return output;
        }
        public static Dictionary<string, List<ProductNames>> WednesdayNoonData()
        {
            Dictionary<string, List<ProductNames>> output = new Dictionary<string, List<ProductNames>>();

            DateTime today = DateTime.Now;
            var thisWeekStart = today.AddDays(-(int)today.DayOfWeek);
            var Wednesday = thisWeekStart.AddDays(3).AddSeconds(-1);
            var Date = Convert.ToDateTime(Wednesday).ToString("yyyy'/'MM'/'dd");

            List<ProductNames> products = new List<ProductNames>();
            using (MySqlConnection conn = Connection)
            {
                MySqlCommand cmd = new MySqlCommand($@"SELECT id, productName, receiveBy, fromLocation, toLocation,  time , receiveDate FROM truckruncalendar.truckrunschedules where Date(receiveDate)= DATE('{Date}') and time='02-02:30 PM' ", conn);
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())

                    {
                        products.Add(new ProductNames
                        {
                            id = Convert.ToInt32(reader["id"]),
                            productName = Convert.ToString(reader["productName"]),
                            receiveBy = Convert.ToString(reader["receiveBy"]),
                            fromLocation = Convert.ToString(reader["fromLocation"]),
                            toLocation = Convert.ToString(reader["toLocation"]),
                            time = Convert.ToString(reader["time"]),
                            receiveDate = Convert.ToDateTime(reader["receiveDate"]),
                        });
                    }
                    output.Add("Wednesday", products);
                }


            }
            return output;
        }
        public static Dictionary<string, List<ProductNames>> ThursdayNoonData()
        {
            Dictionary<string, List<ProductNames>> output = new Dictionary<string, List<ProductNames>>();

            DateTime today = DateTime.Now;
            var thisWeekStart = today.AddDays(-(int)today.DayOfWeek);
            var Thursday = thisWeekStart.AddDays(4).AddSeconds(-1);
            var Date = Convert.ToDateTime(Thursday).ToString("yyyy'/'MM'/'dd");

            List<ProductNames> products = new List<ProductNames>();
            using (MySqlConnection conn = Connection)
            {
                MySqlCommand cmd = new MySqlCommand($@"SELECT id, productName, receiveBy, fromLocation, toLocation,  time , receiveDate FROM truckruncalendar.truckrunschedules where Date(receiveDate)= DATE('{Date}') and time='02-02:30 PM' ", conn);
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())

                    {
                        products.Add(new ProductNames
                        {
                            id = Convert.ToInt32(reader["id"]),
                            productName = Convert.ToString(reader["productName"]),
                            receiveBy = Convert.ToString(reader["receiveBy"]),
                            fromLocation = Convert.ToString(reader["fromLocation"]),
                            toLocation = Convert.ToString(reader["toLocation"]),
                            time = Convert.ToString(reader["time"]),
                            receiveDate = Convert.ToDateTime(reader["receiveDate"]),
                        });
                    }
                    output.Add("Thursday", products);
                }


            }
            return output;
        }
        public static Dictionary<string, List<ProductNames>> FridayNoonData()
        {
            Dictionary<string, List<ProductNames>> output = new Dictionary<string, List<ProductNames>>();

            DateTime today = DateTime.Now;
            var thisWeekStart = today.AddDays(-(int)today.DayOfWeek);
            var Friday = thisWeekStart.AddDays(5).AddSeconds(-1);
            var Date = Convert.ToDateTime(Friday).ToString("yyyy'/'MM'/'dd");

            List<ProductNames> products = new List<ProductNames>();
            using (MySqlConnection conn = Connection)
            {
                MySqlCommand cmd = new MySqlCommand($@"SELECT id, productName, receiveBy, fromLocation, toLocation,  time , receiveDate FROM truckruncalendar.truckrunschedules where Date(receiveDate)= DATE('{Date}') and time='02-02:30 PM' ", conn);
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())

                    {
                        products.Add(new ProductNames
                        {
                            id = Convert.ToInt32(reader["id"]),
                            productName = Convert.ToString(reader["productName"]),
                            receiveBy = Convert.ToString(reader["receiveBy"]),
                            fromLocation = Convert.ToString(reader["fromLocation"]),
                            toLocation = Convert.ToString(reader["toLocation"]),
                            time = Convert.ToString(reader["time"]),
                            receiveDate = Convert.ToDateTime(reader["receiveDate"]),
                        });
                    }
                    output.Add("Friday", products);
                }


            }
            return output;
        }
        public static List<CalendarItem> PullCalendarInfo()
        {
            List<CalendarItem> CalendarData = new List<CalendarItem>();
            DateTime baseDate = DateTime.Now;
            var thisWeekStart = baseDate.AddDays(-(int)baseDate.DayOfWeek).ToString("yyyy'/'MM'/'dd"); 
            var thisWeekEnd = baseDate.AddDays(-(int)baseDate.DayOfWeek).AddDays(7).AddSeconds(-1).ToString("yyyy'/'MM'/'dd");

            using (MySqlConnection conn = Connection)
            {
                MySqlCommand cmd = new MySqlCommand($@"SELECT id, productName,receiveBy,fromLocation,toLocation, time, DATE(receiveDate) AS  Date FROM truckruncalendar.truckrunschedules where receiveDate between '{thisWeekStart}' and '{thisWeekEnd}' ", conn);
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        string daysname= Convert.ToDateTime(reader["Date"]).DayOfWeek.ToString();
                        if (daysname == "Monday")
                        {
                            CalendarData.Add(new CalendarItem
                            {
                                id = Convert.ToInt32(reader["id"]),
                                Day = "Monday",
                                productName = Convert.ToString(reader["productName"]),
                                receiveBy = Convert.ToString(reader["receiveBy"]),
                                fromLocation= Convert.ToString(reader["fromLocation"]),
                                toLocation = Convert.ToString(reader["toLocation"]),
                                time = Convert.ToString((reader["time"])),
                                receiveDate = Convert.ToDateTime(reader["Date"]),
                                });
                        }
                        else if (daysname == "Tuesday")
                        {
                            CalendarData.Add(new CalendarItem
                            {
                                id = Convert.ToInt32(reader["id"]),
                                Day = "Tuesday",
                                productName = Convert.ToString(reader["productName"]),
                                receiveBy = Convert.ToString(reader["receiveBy"]),
                                fromLocation = Convert.ToString(reader["fromLocation"]),
                                toLocation = Convert.ToString(reader["toLocation"]),
                                time = Convert.ToString((reader["time"])),
                                receiveDate = Convert.ToDateTime(reader["Date"]),
                            });
                        }
                        else if (daysname == "Wednesday")
                        {
                            CalendarData.Add(new CalendarItem
                            {
                                id = Convert.ToInt32(reader["id"]),
                                Day = "Wednesday",
                                productName = Convert.ToString(reader["productName"]),
                                receiveBy = Convert.ToString(reader["receiveBy"]),
                                fromLocation = Convert.ToString(reader["fromLocation"]),
                                toLocation = Convert.ToString(reader["toLocation"]),
                                time = Convert.ToString((reader["time"])),
                                receiveDate = Convert.ToDateTime(reader["Date"]),
                            });
                        }
                        else if (daysname == "Thursday")
                        {
                            CalendarData.Add(new CalendarItem
                            {
                                id = Convert.ToInt32(reader["id"]),
                                Day = "Thursday",
                                productName = Convert.ToString(reader["productName"]),
                                receiveBy = Convert.ToString(reader["receiveBy"]),
                                fromLocation = Convert.ToString(reader["fromLocation"]),
                                toLocation = Convert.ToString(reader["toLocation"]),
                                time = Convert.ToString((reader["time"])),
                                receiveDate = Convert.ToDateTime(reader["Date"]),
                            });
                        }
                        else {
                            if (daysname == "Friday")
                            {
                                CalendarData.Add(new CalendarItem
                                {
                                    id = Convert.ToInt32(reader["id"]),
                                    Day = "Friday",
                                    productName = Convert.ToString(reader["productName"]),
                                    receiveBy = Convert.ToString(reader["receiveBy"]),
                                    fromLocation = Convert.ToString(reader["fromLocation"]),
                                    toLocation = Convert.ToString(reader["toLocation"]),
                                    time = Convert.ToString((reader["time"])),
                                    receiveDate = Convert.ToDateTime(reader["Date"]),
                                });
                            }                                
                        }

                    } 
                }
            }
            return CalendarData;
        }
        public static void AddCalendarInfo(NewCalendarData data)
        {
            var tDate = data.receiveDate.ToString("yyyy'/'MM'/'dd");
            var podName = "";
            foreach (var i in data.productName)
            {
                if (i == '\\')
                {
                    podName += "\\"+'\\' ;


                }                
                else
                {
                    podName += i;
                }
            }
            var t =podName;

            using (MySqlConnection conn = Connection)
            {
                
                    MySqlCommand cmd = new MySqlCommand($@"INSERT  INTO truckruncalendar.truckrunschedules(productName,receiveBy,fromLocation,toLocation, time, receiveDate)  
                VALUES ('{t}','{data.receiveBy}', '{data.fromLocation}','{data.toLocation} ' ,'{data.time}','{tDate}')", conn);
                    cmd.ExecuteNonQuery();
               
            }
        } 
        public static void UpdateSchedule(int id, ProductNames schedule)
        {
            var Date = Convert.ToDateTime(schedule.receiveDate).ToString("yyyy'/'MM'/'dd");
            var podName = "";
            foreach (var i in schedule.productName)
            {
                if (i == '\\')
                {
                    podName += "\\" + '\\';
                }
                else
                {
                    podName += i;
                }
            }
            var t = podName;
            using (MySqlConnection conn = Connection)
            {
                MySqlCommand cmd = new MySqlCommand($@"UPDATE truckruncalendar.truckrunschedules SET  productName='{t}', receiveBy='{schedule.receiveBy}',fromLocation='{schedule.fromLocation}',toLocation='{schedule.toLocation}',  time='{schedule.time}', receiveDate='{Date}'
                            WHERE id={id}", conn);
                cmd.ExecuteNonQuery();
            }
        }
        public static void DeleteSchedule(int id)
        {
            using (MySqlConnection conn = Connection)
            {
                MySqlCommand cmd = new MySqlCommand($@"Delete From truckruncalendar.truckrunschedules WHERE id={id}", conn);
                cmd.ExecuteNonQuery();
            }
        }
        public static void AddUser(NewUser data)
        {
            using (MySqlConnection conn = Connection)
            {

                MySqlCommand cmd = new MySqlCommand($@"INSERT  INTO truckruncalendar.userinfo(fullName,email,password,role)  
                VALUES ('{data.fullName}', '{data.email}','{data.password} ' ,'{data.role}')", conn);
                cmd.ExecuteNonQuery();

            }
        } 

    public static UserCredential Findloginuser(string email, string password)
    {
        UserCredential user = new UserCredential();
        using (MySqlConnection conn = Connection)
        {
            MySqlCommand cmd = new MySqlCommand($@"Select fullName,email,password,role from  truckruncalendar.userinfo where email='{email}' ", conn);
            using (var reader = cmd.ExecuteReader())
            {
                    while (reader.Read())
                    {
                        user.email = Convert.ToString(reader["email"]);
                        user.password = Convert.ToString(reader["password"]);
                        user.role = Convert.ToString(reader["role"]);
                    }
                   

                    //user.Add(new UserCredential
                    //{
                    //    email = Convert.ToString(reader["email"]),
                    //    password = Convert.ToString(reader["password"]),
                    //    role = Convert.ToString(reader["role"]),

                    //});
                }

            }
        return user;
    }
}
    }
