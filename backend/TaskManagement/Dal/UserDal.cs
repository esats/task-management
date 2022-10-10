using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.Entities;

namespace TaskManagement.Dal
{
    public class UserDal
    {
        private readonly TaskManagementContext _context;

        public UserDal(TaskManagementContext context)
        {
            _context = context;
        }

        public List<UserEntity> GetUsers()
        {
            return _context.Users.ToList();
        }

        public async Task<bool> Create(UserEntity user)
        {
            var res = await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return res.Entity.Id > 0;
        }

        public UserEntity GetUserById(int id)
        {
            return _context.Users.FirstOrDefault(x=>x.Id == id);
        }
    }
}
