using Api.Model.ApiResponse;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.Dal;
using TaskManagement.Entities;
using TaskManagement.models;

namespace TaskManagement.Services
{
    public class UserService
    {
        private UserDal _userDal; 
        private readonly IMapper _mapper;

        public UserService(UserDal userDal, IMapper mapper)
        {
            _userDal = userDal;
            _mapper = mapper;
        }

        public ApiResponse GetUsers()
        {
            var list = _mapper.Map<List<UserModel>>(_userDal.GetUsers() );
            return new ApiResponse(list);
        }

        public ApiResponse GetUserById(int id)
        {
            var userModel = _mapper.Map<UserModel>(_userDal.GetUserById(id));
            return new ApiResponse(userModel);
        }

        public async Task<ApiResponse> Create(UserModel userModel)
        {
            return new ApiResponse(await _userDal.Create(_mapper.Map<UserEntity>(userModel)));
        }
    }
}
