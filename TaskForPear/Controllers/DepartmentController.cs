using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Dto;
using Services.IServices;

namespace TaskForPear.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentServices _departmentServices;

        public DepartmentController(IDepartmentServices departmentServices)
        {
            _departmentServices = departmentServices;
        }

        [HttpGet("GetAllDepartments")]
        public async Task<IActionResult> GetAllDepartments()
        {
            var departments = await _departmentServices.GetAllDepartmentsAsync();
            return Ok(departments);
        }

        [HttpGet("GetDepartmentById/{id}")]
        public async Task<IActionResult> GetDepartmentById(int id)
        {
            var department = await _departmentServices.GetDepartmentByIdAsync(id);
            return Ok(department);
        }

        [HttpPost("AddDepartment")]
        public async Task<IActionResult> AddDepartment([FromBody] DepartmentDto departmentDto)
        {
            var addedDepartment = await _departmentServices.AddDepartmentAsync(departmentDto);
            return Ok(addedDepartment);
        }

        [HttpPut("UpdateDepartment")]
        public async Task<IActionResult> UpdateDepartment([FromBody] DepartmentDto departmentDto)
        {
            var updatedDepartment = await _departmentServices.UpdateDepartmentAsync(departmentDto);
            return Ok(updatedDepartment);
        }


        [HttpDelete("DeleteDepartment/{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            var result = await _departmentServices.DeleteDepartmentAsync(id);
            return Ok(result);
        }
    }
}
