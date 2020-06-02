using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Crux.Endpoint.Api.Base;
using Microsoft.IdentityModel.Tokens;

namespace Crux.Endpoint.Api.External.Logic
{
    public class WriteToken : LogicCommand
    {
        public string UserId { get; set; }
        public string Verification { get; set; }
        public string JwtKey { get; set; }
        public bool Result { get; set; }

        public override async Task Execute()
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, UserId, "string"),
                new Claim(JwtRegisteredClaimNames.Nbf, new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds().ToString()),
                new Claim(JwtRegisteredClaimNames.Exp,
                    new DateTimeOffset(DateTime.Now.AddDays(1)).ToUnixTimeSeconds().ToString())
            };

            Verification = new JwtSecurityTokenHandler().WriteToken(new JwtSecurityToken(
                new JwtHeader(new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtKey)),
                    SecurityAlgorithms.HmacSha256)), new JwtPayload(claims)));
            Result = true;
            await Task.CompletedTask;
        }
    }
}