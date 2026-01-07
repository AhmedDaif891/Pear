using Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IEmployeeServices
    {
        public Task<List<EmployeeDto>> GetAllEmployeesAsync();
        public Task<EmployeeDto> GetEmployeeByIdAsync(int id);
        public Task<EmployeeDto> AddEmployeeAsync(EmployeeDto employeeDto);
        public Task<EmployeeDto> UpdateEmployeeAsync(EmployeeDto employeeDto);
        public Task<bool> DeleteEmployeeAsync(int id);
    }
}
