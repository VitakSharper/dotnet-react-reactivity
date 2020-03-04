using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
    public class ActivityConfiguration : IEntityTypeConfiguration<Activity>
    {
        public void Configure(EntityTypeBuilder<Activity> builder)
        {
            builder.Property(p => p.Title)
                .HasMaxLength(50);
            builder.Property(p => p.Description)
                .HasMaxLength(255);
            builder.Property(p => p.Category)
                .HasMaxLength(50);
            builder.Property(p => p.City)
                .HasMaxLength(50);
            builder.Property(p => p.Venue)
                .HasMaxLength(50);
        }
    }
}