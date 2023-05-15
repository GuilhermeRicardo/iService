using BlockbusterApi.Configurations;
using BlockbusterApi.Models;
using BlockbusterApi.Models.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using System.Text;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace BlockbusterApi.Controllers
{

    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly JwtConfig _jwtConfig;

        public AuthenticationController(
            UserManager<IdentityUser> userManager,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("register")]

        public async Task<IActionResult> Register([FromBody] UserRegistrationRequestDto requestDto)
        {
            if (ModelState.IsValid)
            {
                var user_exist = await _userManager.FindByEmailAsync(requestDto.Email); ;
                if (user_exist != null)
                {
                    return BadRequest(error: new AuthResult()
                    {
                        Result = false,
                        Errors = new List<string>()
                        {
                            "Email já existe no banco de dados"
                        }
                    });
                }

                var new_user = new IdentityUser()
                {
                    Email = requestDto.Email,
                    UserName = requestDto.Name
                };

                var is_created = await _userManager.CreateAsync(new_user, requestDto.Password);

                if(is_created.Succeeded) 
                {
                    // Gerar token

                    var token = GenerateJwtToken(new_user);

                    return Ok(new AuthResult()
                    {   
                        Result = true,
                        Token = token
                    });
                }

                return BadRequest(error: new AuthResult
                {
                    Errors= new List<string>()
                    {
                        "Server error"
                    },
                    Result = false

                });

            }

            return BadRequest();
        }

        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserLoginRequestDTO loginRequest)
        {
            if(ModelState.IsValid)
            {
                var existing_user = await _userManager.FindByEmailAsync(loginRequest.Email);

                if(existing_user == null)
                {
                    return BadRequest(new AuthResult()
                    {
                        Result = false,
                        Errors = new List<string>()
                        {
                            "Carga Invalida"
                        }
                    });
                }

                var isCorrect = await _userManager.CheckPasswordAsync(existing_user, loginRequest.Password);

                if (!isCorrect)
                    return BadRequest(new AuthResult()
                    {
                        Result = false,
                        Errors = new List<string>()
                    {
                        "Login Invalido"
                    }
                    });

                var jwtToken = GenerateJwtToken(existing_user);

                return Ok(new AuthResult()
                {
                    UserId = existing_user.Id,
                    UserName = existing_user.UserName,
                    Result = true,
                    Token = jwtToken
                });

            }

            return BadRequest(new AuthResult
            {
                Result = false,
                Errors = new List<string>()
                {
                    "Carga Invalido"
                }
            });
        }

        private string GenerateJwtToken(IdentityUser user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.UTF8.GetBytes(_configuration.GetSection("JwtConfig:Secret").Value);

            var tokenDescriptor = new SecurityTokenDescriptor()

            {
                Subject = new ClaimsIdentity(new []
                {
                    new Claim(type: "Id", value: user.Id),
                    new Claim(type: JwtRegisteredClaimNames.Name, user.UserName),
                    new Claim(type: JwtRegisteredClaimNames.Email, value: user.Email),
                    new Claim(type: JwtRegisteredClaimNames.Jti, value: Guid.NewGuid().ToString()),
                    new Claim(type: JwtRegisteredClaimNames.Iat, value: DateTime.Now.ToUniversalTime().ToString()),
                }),

                Expires= DateTime.Now.AddHours(4),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256)
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);

            var jwtToken= jwtTokenHandler.WriteToken(token);

            return jwtToken;

        }




    }
}
