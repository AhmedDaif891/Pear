using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.IServices;

namespace TaskForPear.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeServices _employeeServices;

        public EmployeeController(IEmployeeServices employeeServices)
        {
            _employeeServices = employeeServices;
        }

        [HttpGet("GetAllEmployee")]
        public async Task<IActionResult> GetAllEmployee()
        {
            var employees = await _employeeServices.GetAllEmployeesAsync();
            return Ok (employees);
        }

        [HttpGet("GetEmployeeById/{id}")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            var employee =await _employeeServices.GetEmployeeByIdAsync(id);
            return Ok (employee);
        }

        [HttpPost("AddEmployee")]
        public async Task<IActionResult> AddEmployee([FromBody] EmployeeDto employee)
        {
            var Addedemployee = await _employeeServices.AddEmployeeAsync(employee);
            return Ok(Addedemployee);
        }


        [HttpPut("UpdateEmployee")]
        public async Task<IActionResult> UpdateEmployee([FromBody] EmployeeDto employee)
        {
            var UpdatedEmployee = await _employeeServices.UpdateEmployeeAsync(employee);
            return Ok(UpdatedEmployee);
        }


        [HttpDelete("DeleteEmployee/{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var deletedEmployee = await _employeeServices.DeleteEmployeeAsync(id);
            return Ok(deletedEmployee);
        }
    }
}
