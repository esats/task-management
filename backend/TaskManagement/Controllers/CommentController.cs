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
    [Route("api/comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private CommentService _commentService;

        public CommentController(CommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet]
        [Route("list")]
        public ApiResponse Comments()
        {
            try
            {
                return _commentService.GetComments();
            }
            catch (Exception ex)
            {
                return new ApiResponse((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("make")]
        public async Task<ApiResponse> MakeComment(CommentModel commentModel)
        {
            try
            {
                return await _commentService.Create(commentModel);
            }
            catch (Exception ex)
            {
                return new ApiResponse((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("edit")]
        public ApiResponse EditComment(EditCommentModel commentModel)
        {
            try
            {
                return  _commentService.Edit(commentModel);
            }
            catch (Exception ex)
            {
                return new ApiResponse((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("search/{prefix}")]
        public ApiResponse SearchComment(string prefix)
        {
            try
            {
                return _commentService.Search(prefix);
            }
            catch (Exception ex)
            {
                return new ApiResponse((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
