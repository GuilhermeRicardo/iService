using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlockbusterApi.Models
{


    public class Prestador
    {
        public int Id { get; set; }

        public string Name { get; set; }    

        public string Servico { get; set; }

    }

}