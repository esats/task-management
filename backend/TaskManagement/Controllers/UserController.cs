using Api.Model.ApiResponse;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using TaskManagement.models;
using TaskManagement.Services;

namespace TaskManagement.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route("list")]
        public ApiResponse List()
        {
            try
            {
                return _userService.GetUsers();
            }
            catch (Exception ex)
            {
                return new ApiResponse((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("getById/{id}")]
        public ApiResponse GetById(int id)
        {
            try
            {
                return _userService.GetUserById(id);
            }
            catch (Exception ex)
            {
                return new ApiResponse((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("create")]
        public async Task<ApiResponse> Create(UserModel userModel)
        {
            try
            {
                return await _userService.Create(userModel);
            }
            catch (Exception ex)
            {
                return new ApiResponse((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
