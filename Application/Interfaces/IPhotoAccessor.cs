using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IPhotoAccessor
    {
        (string PublicId, string Url) AddPhoto(IFormFile file);
        string DeletePhoto(string publicId);
    }
}