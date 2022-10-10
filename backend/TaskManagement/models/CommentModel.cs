using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagement.models
{
    public class CommentModel
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int UserId { get; set; }
        public int TaskId { get; set; }
    }
}
