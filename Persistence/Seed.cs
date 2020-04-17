using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
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