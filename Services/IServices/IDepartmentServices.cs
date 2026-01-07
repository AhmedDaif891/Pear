using Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.IServices
{
    public interface IDepartmentServices
    {
        public Task<List<DepartmentDto>> GetAllDepartmentsAsync();
        public Task<DepartmentDto> GetDepartmentByIdAsync(int id);
        public Task<DepartmentDto> AddDepartmentAsync(DepartmentDto departmentDto);
        public Task<DepartmentDto> UpdateDepartmentAsync(DepartmentDto departmentDto);
        public Task<bool> DeleteDepartmentAsync(int id);
    }
}
