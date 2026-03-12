using Application.Activities.Commands;
using Application.Activities.DTOs;
using Application.Activities.Queries;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        return await Mediator.Send(new GetActivityList.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityDetail(string id)
    {
        // throw new Exception("Exception test");
        return HandleResult(await Mediator.Send(new GetActivityDetail.Query { Id = id }));
    }

    [HttpPost]
    public async Task<ActionResult<string>> CreateActivity(CreateActivityDto createActivityDto)
    {
        return HandleResult(await Mediator.Send(new CreateActivity.Command { CreateActivityDto = createActivityDto }));
    }

    [HttpPut]
    public async Task<ActionResult> EditActivity(EditActivityDto editActivityDto)
    {
        return HandleResult(await Mediator.Send(new EditActivity.Command { EditActivityDto = editActivityDto }));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));
    }
}