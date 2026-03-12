using System.Diagnostics.CodeAnalysis;
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        [field: AllowNull, MaybeNull]
        protected IMediator Mediator => field ??= HttpContext.RequestServices.GetService<IMediator>()
                                                  ?? throw new InvalidOperationException("IMediator Service not found");

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (!result.IsSuccess && result.Code == 404) return NotFound("Activity not found");
            if (result.IsSuccess && result.Value != null) return Ok(result.Value);
            return BadRequest(result.Error);
        }
    }
}