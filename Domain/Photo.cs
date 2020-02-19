﻿using System.Security.Principal;

namespace Domain
{
    public class Photo
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public bool Status { get; set; }
    }
}