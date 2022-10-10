using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.Entities;
using TaskManagement.models;

namespace TaskManagement.Helpers
{
    public class AutoMapperHelper : Profile
    {
        public AutoMapperHelper()
        {
            CreateMap<UserEntity, UserModel>();
            CreateMap<UserModel, UserEntity>();

            CreateMap<TaskEntity, TaskModel>();
            CreateMap<TaskModel, TaskEntity>();

            CreateMap<UserTaskEntity, AssignModel>();
            CreateMap<AssignModel, UserTaskEntity>();

            CreateMap<CommentModel, CommentEntity>();
            CreateMap<CommentEntity, CommentModel>();

            CreateMap<TaskRequestModel, TaskEntity>();
            CreateMap<TaskEntity, TaskRequestModel>();

            CreateMap<TaskResponseModel, TaskEntity>();
            CreateMap<TaskEntity, TaskResponseModel>();
        }
    }
}