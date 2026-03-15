using System;
using System.Collections.Generic;
using CakeShop.Persistence.Entities;
using Microsoft.EntityFrameworkCore;

namespace CakeShop.Persistence.Context;

public partial class CakeShopDbContext : DbContext
{
    public CakeShopDbContext()
    {
    }

    public CakeShopDbContext(DbContextOptions<CakeShopDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Item> Items { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Item>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Item__3214EC071CB85E4C");

            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.Price).HasColumnType("money");
            entity.Property(e => e.Title).HasMaxLength(50);
            entity.Property(e => e.Category).HasMaxLength(50);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
