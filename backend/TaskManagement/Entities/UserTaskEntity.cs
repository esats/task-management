using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagement.Entities
{
    public class UserTaskEntity : BaseEntity
    {
        public int TaskId { get; set; }
        public int UserId { get; set; }
    }
}
