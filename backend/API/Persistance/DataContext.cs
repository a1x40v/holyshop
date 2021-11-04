
using Microsoft.EntityFrameworkCore;
using API.Core.Domain;

namespace API.Persistance
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
    }
}