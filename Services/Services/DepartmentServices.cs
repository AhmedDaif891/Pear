using AutoMapper;
using Data.Models;
using Data.Repository;
using Microsoft.EntityFrameworkCore.Metadata;
using Services.Dto;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class DepartmentServices : IDepartmentServices
    {
        private readonly IGenericRepository<Department> _genericRepository;
        private readonly IMapper _mapper;

        public DepartmentServices(IGenericRepository<Department> genericRepository,IMapper mapper)
        {
            _genericRepository = genericRepository;
            _mapper = mapper;
        }
        public async Task<DepartmentDto> AddDepartmentAsync(DepartmentDto departmentDto)
        {
            var departmentToAdd = await _genericRepository.AddAsync(_mapper.Map<Department>(departmentDto));
            return _mapper.Map<DepartmentDto>(departmentToAdd);
        }

        public async Task<bool> DeleteDepartmentAsync(int id)
        {
            return await _genericRepository.DeleteAsync(id);
        }

        public async Task<List<DepartmentDto>> GetAllDepartmentsAsync()
        {
            var departments = await _genericRepository.GetAllAsync();
            return  _mapper.Map<List<DepartmentDto>>(departments);           
        }

        public async Task<DepartmentDto> GetDepartmentByIdAsync(int id)
        {
            var department = await  _genericRepository.GetByIdAsync(id);
            return _mapper.Map<DepartmentDto>(department);
        }

        public async Task<DepartmentDto> UpdateDepartmentAsync(DepartmentDto departmentDto)
        {
            var departmentToUpdate = await _genericRepository.UpdateAsync(_mapper.Map<Department>(departmentDto));
            return _mapper.Map<DepartmentDto>(departmentToUpdate);
        }
    }
}
