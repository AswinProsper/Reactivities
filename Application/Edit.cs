using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            private readonly IMapper _mapper;

            public Handler(IMapper mapper,DataContext context)
            {
                _mapper = mapper;
                this.context = context;
            }

           

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(request.Activity.ID);
                //activity.Title = request.Activity.Title ?? activity.Title;
                _mapper.Map(request.Activity,activity);
                await context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}