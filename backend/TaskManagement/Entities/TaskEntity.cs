using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagement.Entities
{
    public class TaskEntity: BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
