using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using System.Data.SqlClient;

namespace Test1
{
    public class DBConnection
    {
        public static string ConnectionString { get; set; }
        //static MySqlConnection Conn;

        public static MySqlConnection Connection
        {
            get
            {
                MySqlConnection conn = CreateConnection();
                conn.Open();
                return conn;
            }
        }

        static MySqlConnection CreateConnection()
        {
            return new MySqlConnection(ConnectionString);
        }
    }
    

}
