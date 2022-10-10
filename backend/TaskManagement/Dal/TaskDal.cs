using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.Entities;

namespace TaskManagement.Dal
{
    public class TaskDal
    {
        private readonly TaskManagementContext _context;

        public TaskDal(TaskManagementContext context)
        {
            _context = context;
        }

        public List<TaskEntity> GetTasks()
        {
            return _context.Tasks.ToList();
        }

        public async Task<bool> Create(TaskEntity task)
        {
            var res = await _context.Tasks.AddAsync(task);
            await _context.SaveChangesAsync();
            return res.Entity.Id > 0;
        }

        public TaskEntity GetTaskById(int id)
        {
            return _context.Tasks.FirstOrDefault(x=>x.Id == id);
        }

        public async Task<bool> AssignTask(UserTaskEntity userTaskEntity)
        {
            var res = await _context.UserTasks.AddAsync(userTaskEntity);
            await _context.SaveChangesAsync();
            return res.Entity.Id > 0;
        }

        public UserTaskEntity GetUserTask(int taskId)
        {
            return _context.UserTasks.FirstOrDefault(x=>x.TaskId == taskId && x.IsActive);
        }

        public void Save()
        {
           _context.SaveChangesAsync();
        }
    }
}
