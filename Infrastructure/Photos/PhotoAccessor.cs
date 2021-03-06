﻿using System;
using Application.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photos
{
    public class PhotoAccessor : IPhotoAccessor
    {
        private readonly Cloudinary _cloudinary;

        public PhotoAccessor(IOptions<CloudinarySettings> config)
        {
            var account = new Account(config.Value.CloudName, config.Value.ApiKey, config.Value.ApiSecret);
            _cloudinary = new Cloudinary(account);
        }

        public (string, string) AddPhoto(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation()
                        .Height(500)
                        .Width(500)
                        .Crop("fill")
                        .Gravity("face")
                };
                uploadResult = _cloudinary.Upload(uploadParams);
            }

            if (uploadResult.Error != null) throw new Exception(uploadResult.Error.Message);

            return (uploadResult.PublicId, uploadResult.SecureUri.AbsoluteUri);
        }

        public string DeletePhoto(string publicId) =>
            _cloudinary
                .Destroy(new DeletionParams(publicId)).Result == "ok"
                ? "ok"
                : null;
    }
}