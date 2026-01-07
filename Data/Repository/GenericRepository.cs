using Data.Configuration;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly AppDbContext _context;
        private readonly DbSet<T> _dbset;

        public GenericRepository(AppDbContext context)
        {
            _context = context;
            _dbset = context.Set<T>();
        }
        public async Task<T> AddAsync(T entity)
        {
            await _dbset.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entityToDelete = await _dbset.FindAsync(id);
            _dbset.Remove(entityToDelete);
            await _context.SaveChangesAsync();
            return true;
        }

        public Task<List<T>> GetAllAsync()
        {
            var entities =  _dbset.ToListAsync();
            return entities;
        }

        public async Task<T> GetByIdAsync(int id)
        {
            var entity = await _dbset.FindAsync(id);
            return entity;
        }

        public async Task<T> UpdateAsync(T entity)
        {
            _dbset.Update(entity);
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}
