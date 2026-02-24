using System.Diagnostics.CodeAnalysis;
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
    }
}