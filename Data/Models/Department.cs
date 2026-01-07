using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
    public class Department
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [ForeignKey("Employee")]
        public int? ManagerId { get; set; }
        public Employee Manager { get; set; }
        //public ICollection<EmployeeDepartment> EmployeeDepratments { get; set; } = new List<EmployeeDepartment>();
    }
}
