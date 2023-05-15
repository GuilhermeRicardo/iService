using BlockbusterApi.Data;
using BlockbusterApi.Models;
using BlockbusterApi.Models.DTOs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;

namespace BlockbusterApi.Controllers
{

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("api/[controller]")]
    public class ServicoController : ControllerBase
    {
        // GET

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetAsync(
            [FromServices] AppDataContext context)
        {
            var rental = await (from sr in context.Servico
                                join us in context.Users on sr.UserId equals us.Id
                                join pr in context.Prestador on sr.PrestadorId equals pr.Id
                                where sr.UserId == us.Id
                                select new
                                {
                                    Id = sr.Id,
                                    Prestador = pr.Name,
                                    Servico = pr.Servico,
                                    Email = us.Email,
                                    UserName = us.UserName,
                                    Date = sr.SolicitacaoDate
                                }) 
                .AsNoTracking()
                .ToListAsync();

            return rental == null
                ? NotFound() 
                : Ok(rental);
        }

        // POST

        [HttpPost]
        [Route("servico")]
        public async Task<IActionResult> PostAsync(
            [FromServices] AppDataContext context,
            [FromBody] RentInformationDTO Model)
        {
            if (!ModelState.IsValid)
                return BadRequest(new AuthResult()
                {
                    Errors = new List<string>()
                    {
                        "Modelo Invalido"
                    }
                });

            var rent = new Servico
            {
                PrestadorId = Model.PrestadorId,
                UserId = Model.UserId,
            };


            //var availability = await context
            //    .Prestador
            //    .Where(x => x.Id == rent.PrestadorId)
            //    .FirstOrDefaultAsync();


            //var count = await context
            //    .Servico
            //    .Where(x => x.PrestadorId == rent.PrestadorId)
            //    .CountAsync();


            //if (count >= availability.estoque)
            //{
            //    return Forbid();

            //}

            try
            {
                await context.Servico.AddAsync(rent);
                await context.SaveChangesAsync();
                return Created("[controller]/rent", rent);

            }
            catch (System.Exception)
            {
                return BadRequest(new AuthResult()
                {
                    Errors = new List<string>()
                    {
                        "Catch BadRequest"
                    }
                });
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteAsync(
            [FromServices] AppDataContext context,
            [FromRoute] int id)
        {
            var rent = await context
                .Servico
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();

            try
            {
                context.Servico.Remove(rent);
                await context.SaveChangesAsync();
                return Ok();
            }

            catch (System.Exception)
            {
                return BadRequest();
            }
        }
    }
}
