using BlockbusterApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using System.Diagnostics.Metrics;

namespace BlockbusterApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PrestadorController : ControllerBase
    {
        // GET

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetPrestadoresAsync(
            [FromServices] AppDataContext context)
        {

            var prestadores = await context
                .Prestador
                .AsNoTracking()
                .ToListAsync();
            return prestadores == null
                ? NotFound() 
                : Ok(prestadores);
        }

        // GET - Search

        //[HttpGet]
        //[Route("search/{keyword}")]
        //public async Task<IActionResult> GetSearch(
        //    [FromServices] AppDataContext context,
        //    [FromRoute] string keyword)
        //{
        //    var search = await context
        //        .Movies
        //        .Where(x => x.titulo.Contains(keyword))
        //        .AsNoTracking()
        //        .ToListAsync();
        //    return search == null
        //        ? NotFound()
        //        : Ok(search);
        //}

        //[HttpGet]
        //[Route("availability/{id}")]
        //public async Task<IActionResult> GetAvailability(
        //[FromServices] AppDataContext context,
        //[FromRoute] int id)
        //{
        //    var availability = await context
        //        .Movies
        //        .Where(x => x.Id == id)
        //        .FirstOrDefaultAsync();

        //    var count = await context
        //        .Rental
        //        .Where(x => x.MovieId == id)
        //        .CountAsync();

        //    return availability == null
        //        ? NotFound()
        //        : Ok(availability.estoque - count);
        //}

    }
}
