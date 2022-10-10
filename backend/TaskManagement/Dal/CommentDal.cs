using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.Dal;
using TaskManagement.Entities;

namespace CommentManagement.Dal
{
    public class CommentDal
    {
        private readonly TaskManagementContext _context;

        public CommentDal(TaskManagementContext context)
        {
            _context = context;
        }

        public List<CommentEntity> GetComments(int taskId=0)
        {
            return taskId != 0 ? _context.Comments.Where(x=> x.TaskId == taskId).ToList()
                               : _context.Comments.ToList();
        }

        public async Task<bool> Create(CommentEntity Comment)
        {
            var res = await _context.Comments.AddAsync(Comment);
            await _context.SaveChangesAsync();
            return res.Entity.Id > 0;
        }

        public CommentEntity GetCommentById(int id)
        {
            return _context.Comments.FirstOrDefault(x => x.Id == id);
        }

        public void Save()
        {
            _context.SaveChangesAsync();
        }

        public List<CommentEntity> Search(string prefix)
        {
            return _context.Comments.Where(x => x.Content.Contains(prefix)).ToList();
        }
    }
}
