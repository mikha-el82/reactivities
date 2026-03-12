using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validators;

public class BaseActivityValidator<T, TDto> : AbstractValidator<T> where TDto : BaseActivityDto
{
    public BaseActivityValidator(Func<T, TDto> selector)
    {
        RuleFor(x => selector(x).Title)
            .NotEmpty().WithMessage("Title is required.")
            .MaximumLength(120).WithMessage("Title cannot exceed 120 characters.");
        RuleFor(x => selector(x).Date)
            .NotEmpty().WithMessage("Date is required.")
            .GreaterThan(DateTime.Now).WithMessage("Date cannot be in the past.");
        RuleFor(x => selector(x).Description)
            .NotEmpty().WithMessage("Description is required.");
        RuleFor(x => selector(x).Category)
            .NotEmpty().WithMessage("Category is required.");
        RuleFor(x => selector(x).City)
            .NotEmpty().WithMessage("City is required.");
        RuleFor(x => selector(x).Venue)
            .NotEmpty().WithMessage("Venue is required.");
        RuleFor(x => selector(x).Latitude)
            .NotEmpty().WithMessage("Latitude is required.")
            .InclusiveBetween(-90, 90).WithMessage("Latitude must be between -90 and 90.");
        RuleFor(x => selector(x).Longitude)
            .NotEmpty().WithMessage("Longitude is required.")
            .InclusiveBetween(-180, 180).WithMessage("Longitude must be between -180 and 180.");
    }
}