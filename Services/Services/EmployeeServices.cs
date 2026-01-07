using AutoMapper;
using Data.Models;
using Data.Repository;
using Services.Dto;
using Services.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class EmployeeServices : IEmployeeServices
    {
        private readonly IGenericRepository<Employee> _genericRepository;
        private readonly IMapper _mapper;

        public EmployeeServices(IGenericRepository<Employee> genericRepository,IMapper mapper)
        {
            _genericRepository = genericRepository;
            _mapper = mapper;
        }
        public async Task<EmployeeDto> AddEmployeeAsync(EmployeeDto employeeDto)
        {
            var employeeToAdd = await _genericRepository.AddAsync(_mapper.Map<Employee>(employeeDto));
            return _mapper.Map<EmployeeDto>(employeeToAdd);
        }

        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            return await _genericRepository.DeleteAsync(id);           
        }

        public async Task<List<EmployeeDto>> GetAllEmployeesAsync()
        {
            var employees = await _genericRepository.GetAllAsync();
            return _mapper.Map<List<EmployeeDto>>(employees);
        }

        public async Task<EmployeeDto> GetEmployeeByIdAsync(int id)
        {
            var employee = await _genericRepository.GetByIdAsync(id);
            return _mapper.Map<EmployeeDto>(employee);
        }

        public async Task<EmployeeDto> UpdateEmployeeAsync(EmployeeDto employeeDto)
        {
            var employeeToUpdate = await _genericRepository.UpdateAsync(_mapper.Map<Employee>(employeeDto));
            return _mapper.Map<EmployeeDto>(employeeToUpdate);
        }
    }
}
