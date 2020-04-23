using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{

    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (!context.Contacts.Any())
            {
                var contacts = new List<Contact>
                {
                    new Contact
                    {
                        Name = "Jimmy",
                        LastName = "Colacio",
                        Email = "contact@example.com",
                        PhoneNumber = "577-00-11-22",
                    },
                    new Contact
                    {
                        Name = "Michael",
                        LastName = "Page",
                        Email = "contact@example.com",
                        PhoneNumber = "577-00-11-22",
                    },
                    new Contact
                    {
                        Name = "Nicolo",
                        LastName = "Gilmour",
                        Email = "contact@example.com",
                        PhoneNumber = "577-00-11-22",
                    },
                    new Contact
                    {
                        Name = "Gian",
                        LastName = "Page",
                        Email = "contact@example.com",
                        PhoneNumber = "577-00-11-22",
                    },
                    new Contact
                    {
                        Name = "Tian",
                        LastName = "Zend",
                        Email = "contact@example.com",
                        PhoneNumber = "577-00-11-22",
                    },
                    new Contact
                    {
                        Name = "Hel",
                        LastName = "Ganrdaedo",
                        Email = "contact@example.com",
                        PhoneNumber = "577-00-11-22",
                    },
                    new Contact
                    {
                        Name = "Thor",
                        LastName = "Odinson",
                        Email = "contact@example.com",
                        PhoneNumber = "577-00-11-22",
                    },
                    new Contact
                    {
                        Name = "Zinedine",
                        LastName = "Zidane",
                        Email = "contact@example.com",
                        PhoneNumber = "555-55-55-55",
                    },
                    new Contact
                    {
                        Name = "Roberto",
                        LastName = "Carlos",
                        Email = "contact@example.com",
                        PhoneNumber = "577-00-11-22",
                    },
                    new Contact
                    {
                        Name = "Paolo",
                        LastName = "Maldini",
                        Email = "contact@example.com",
                        PhoneNumber = "577-33-33-33",
                    },
                    new Contact
                    {
                        Name = "Gian",
                        LastName = "Burrd",
                        Email = "contact@example.com",
                        PhoneNumber = "577-00-11-15",
                    },
                    new Contact
                    {
                        Name = "Mario",
                        LastName = "Larinni",
                        Email = "contact@example.com",
                        PhoneNumber = "577-00-11-45",
                    }
                };

                context.Contacts.AddRange(contacts);
                context.SaveChanges();
            }
        }
    }
}