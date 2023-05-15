using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlockbusterApi.Models
{


    public class Servico
    {
        [Key()]
        public int Id { get; set; }

        [ForeignKey("Prestador")]
        public int PrestadorId { get; set; }
        public virtual Prestador Prestador { get; set; }

        [ForeignKey("UserIdentity")]
        public string UserId { get; set; }
        public virtual IdentityUser User { get; set; }

        public DateTime SolicitacaoDate { get; set; } = DateTime.UtcNow;

    }

}