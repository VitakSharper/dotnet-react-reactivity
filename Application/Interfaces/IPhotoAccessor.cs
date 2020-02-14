using System;
using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IPhotoAccessor
    {
       (string,string) AddPhoto(IFormFile file);
        string DeletePhoto(string publicId);
    }
}