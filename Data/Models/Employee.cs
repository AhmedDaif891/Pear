using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string MobileNumber { get; set; }

        [ForeignKey("Department")]
        public int DefaultDepartment { get; set; }

        public Department Department { get; set; }
        //public ICollection<EmployeeDepartment> EmployeeDepratments { get; set; } = new List<EmployeeDepartment>();
    }
}
