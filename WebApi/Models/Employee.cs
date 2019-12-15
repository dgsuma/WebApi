using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public class Employee
    {
        public long EmployeID { get; set; }

        public string EmployeName { get; set; }

        public string Department { get; set; }

        public String MailID { get; set; }

        public DateTime? DOJ { get; set; }
    }
}