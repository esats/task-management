using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagement.Entities
{
    public class BaseEntity
    {
        public BaseEntity()
        {
            this.CreatedDate = DateTime.Now;
            this.IsActive = true;
        }

        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsActive { get; set; }
    }
}
