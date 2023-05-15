using System.ComponentModel.DataAnnotations;

namespace BlockbusterApi.Models.DTOs
{
    public class RentInformationDTO
    {
        [Required]
        public int PrestadorId { get; set; }
        [Required]
        public string UserId { get; set; }

    }
}
