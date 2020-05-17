using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Contacts
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Name { get; set; }
            public string LastName { get; set; }
            public string Email { get; set; }
            public string PhoneNumber { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var contact = await _context.Contacts.FindAsync(request.Id);

                if (contact == null)
                    throw new Exception("Could not find contact");

                contact.Name = request.Name ?? contact.Name;
                contact.LastName = request.LastName ?? contact.LastName;
                contact.Email = request.Email ?? contact.Email;
                contact.PhoneNumber = request.PhoneNumber ?? contact.PhoneNumber;

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}