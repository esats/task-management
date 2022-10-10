using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagement.Entities
{
    public class UserEntity: BaseEntity
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Title { get; set; }
    }
}
