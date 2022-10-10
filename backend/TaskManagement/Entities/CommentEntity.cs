using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagement.Entities
{
    public class CommentEntity : BaseEntity
    {
        public string Content { get; set; }
        public int UserId { get; set; }
        public int TaskId { get; set; }
    }
}
