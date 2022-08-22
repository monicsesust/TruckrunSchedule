using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using Test1.Entities;
using static Test1.DBConnection;

namespace Test1.Helpers
{
    public class AdminContext
    {
        public static PageDataAdmin PullAdminData()
        {
            PageDataAdmin package = new PageDataAdmin();
            package.Machines = new List<Machine_Item_Admin>();
            string last_machine_name = "";            
            List<Task_Item_Admin> last_machine_tasks = new List<Task_Item_Admin>();
            using (MySqlConnection conn = Connection)
            {
                MySqlCommand cmd = new MySqlCommand($@"SELECT Tasks.MachineName, Machines.MachineColor, TaskID, TaskOrder, TaskName, YeildQuantity, TaskCompleted, TaskCompletionDate 
                            FROM ProductionSchedule.Tasks JOIN ProductionSchedule.Machines on Tasks.MachineName = Machines.machineName WHERE
                            TaskCompleted=0 OR (TaskCompleted=1 AND from_unixtime(TaskCompletionDate, '%Y-%m-%d') = current_date()) ORDER BY MachineName, TaskID ASC", conn);

                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        if (last_machine_name == "" || last_machine_name == Convert.ToString(reader["MachineName"]))
                        {
                            last_machine_name = Convert.ToString(reader["MachineName"]);
                            last_machine_tasks.Add(new Task_Item_Admin
                            {
                                TaskID = Convert.ToInt32(reader["TaskID"]),
                                TaskOrder = Convert.ToInt32(reader["TaskOrder"]),
                                TaskName = Convert.ToString(reader["TaskName"]),
                                TaskYeild = Convert.ToInt32(reader["YeildQuantity"]),
                                TaskCompleted = Convert.ToInt32(reader["TaskCompleted"]) == 1 ? true : false
                            });                            
                        }
                        else if (last_machine_name != Convert.ToString(reader["MachineName"]))
                        {
                            Machine_Item_Admin last_machine = new Machine_Item_Admin()
                            {
                                MachineName = last_machine_name,
                                TaskList = last_machine_tasks.ToList(),
                            };
                            package.Machines.Add(last_machine);
                            
                            last_machine_tasks.Clear();
                            last_machine_name = Convert.ToString(reader["MachineName"]);
                            last_machine_tasks.Add(new Task_Item_Admin
                            {
                                TaskID = Convert.ToInt32(reader["TaskID"]),
                                TaskOrder = Convert.ToInt32(reader["TaskOrder"]),
                                TaskName = Convert.ToString(reader["TaskName"]),
                                TaskYeild = Convert.ToInt32(reader["YeildQuantity"]),
                                TaskCompleted = Convert.ToInt32(reader["TaskCompleted"]) == 1 ? true : false
                            });

                        }
                    }
                    Machine_Item_Admin last_machine_last = new Machine_Item_Admin()
                    {
                        MachineName = last_machine_name,
                        TaskList = last_machine_tasks.ToList(),
                    };
                    package.Machines.Add(last_machine_last);
                }
            }


            return package;
        }

        public static void AddNewTask(New_Task task)
        {
            var highlight_num = task.Highlight == true ? 1 : 0;
            using (MySqlConnection conn = Connection)
            {
                MySqlCommand cmd = new MySqlCommand($@"INSERT INTO ProductionSchedule.Tasks (TaskStartDate, MachineName, TaskOrder, TaskName, LotNumber, RollStart, RollEnd, Highlight) 
                VALUES ({task.TaskDate}, '{task.MachineName}',{task.TaskOrder} , '{task.TaskName}', '{task.LotNumber}', '{task.RollStart}', '{task.RollEnd}', {highlight_num})", conn);
                cmd.ExecuteNonQuery();
            }
        }

        public static void CompleteTask(int task, int yeild=0)
        {
            TimeSpan t = DateTime.UtcNow - new DateTime(1970, 1, 1);
            int completionDate = (int)t.TotalSeconds;
            using (MySqlConnection conn = Connection)
            {
                MySqlCommand cmd = new MySqlCommand($@"UPDATE ProductionSchedule.Tasks SET TaskCompleted=1, TaskCompletionDate={completionDate}, YeildQuantity= YeildQuantity+{yeild} WHERE TaskID={task}", conn);
                cmd.ExecuteNonQuery();
            }
        }

        public static void UpdateYeild(int task, int yeild = 0)
        {
            using (MySqlConnection conn = Connection)
            {
                MySqlCommand cmd = new MySqlCommand($@"UPDATE ProductionSchedule.Tasks SET YeildQuantity= YeildQuantity+{yeild} WHERE TaskID={task}", conn);
                cmd.ExecuteNonQuery();
            }
        }

        public static void SubmitGreenSheet(GreenSheet info)
        {
            int roll_start, roll_end, taskID;
            using (MySqlConnection conn = Connection)
            {
                MySqlCommand cmd = new MySqlCommand($@"SELECT TaskID, RollStart, RollEnd FROM ProductionSchedule.Tasks WHERE MachineName='{info.MachineName}' 
                    AND TaskCompleted=0 AND LotNumber='{info.LotNumber}'", conn);
                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    taskID = Convert.ToInt32(reader["TaskID"]);
                    roll_start = Convert.ToInt32(reader["RollStart"]);
                    roll_end = Convert.ToInt32(reader["RollEnd"]);
                }
                if (info.RollNumber >= roll_start && info.RollNumber < roll_end)
                {
                    UpdateYeild(taskID, info.YeildQuantity);
                }
                else if (info.RollNumber == roll_end)
                {
                    CompleteTask(taskID, info.YeildQuantity); 
                }
            }
        }

        public static PullTask PullEditTask (int taskid)
        {
            PullTask task = new PullTask();
            using (MySqlConnection conn = Connection)
            {
                MySqlCommand cmd = new MySqlCommand($@"SELECT TaskName, LotNumber, RollStart, RollEnd FROM ProductionSchedule.Tasks WHERE TaskID={taskid}", conn);
                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    task.FullTaskName = Convert.ToString(reader["TaskName"]);
                    task.LotNumber = Convert.ToString(reader["LotNumber"]);
                    task.RollStart = Convert.ToInt32(reader["RollStart"]);
                    task.RollEnd = Convert.ToInt32(reader["RollEnd"]);
                }
               
            }
            return task;
        }

        public static void UpdateTask (int taskid, PullTask task)
        {
            using (MySqlConnection conn = Connection)
            {
                MySqlCommand cmd = new MySqlCommand($@"UPDATE ProductionSchedule.Tasks SET TaskName='{task.FullTaskName}', LotNumber='{task.LotNumber}', 
                        RollStart={task.RollStart}, RollEnd={task.RollEnd} WHERE TaskID={taskid}", conn);
                cmd.ExecuteNonQuery();

            }
        }
    }
}
