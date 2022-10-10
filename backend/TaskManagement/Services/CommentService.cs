using Api.Model.ApiResponse;
using AutoMapper;
using CommentManagement.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagement.Dal;
using TaskManagement.Entities;
using TaskManagement.models;

namespace TaskManagement.Services
{
    public class CommentService
    {
        private CommentDal _commentDal; 
        private readonly IMapper _mapper;

        public CommentService(CommentDal commentDal, IMapper mapper)
        {
            _commentDal = commentDal;
            _mapper = mapper;
        }

        public ApiResponse GetComments()
        {
            var list = _mapper.Map<List<CommentModel>>(_commentDal.GetComments());
            return new ApiResponse(list);
        }

        public ApiResponse GetCommentById(int id)
        {
            var commentModel = _mapper.Map<CommentModel>(_commentDal.GetCommentById(id));
            return new ApiResponse(commentModel);
        }

        public async Task<ApiResponse> Create(CommentModel commentModel)
        {
            return new ApiResponse(await _commentDal.Create(_mapper.Map<CommentEntity>(commentModel)));
        }

        public ApiResponse Edit(EditCommentModel commentModel)
        {
            var comment = _commentDal.GetCommentById(commentModel.Id);
            comment.Content = commentModel.Content;

            _commentDal.Save();

            return new ApiResponse(comment);
        }

        public ApiResponse Search(string prefix)
        {
            var comments = _mapper.Map<List<CommentModel>>(_commentDal.Search(prefix));
            return new ApiResponse(comments);
        }
    }
}
