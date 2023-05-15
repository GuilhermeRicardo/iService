using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlockbusterApi.Models
{
    public class AuthResult
    {
        public string Token { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public bool Result { get; set; }
        public List<string> Errors  { get; set; }

    }
}
