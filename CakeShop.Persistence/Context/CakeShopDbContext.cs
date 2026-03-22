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
    public virtual DbSet<Order> Orders { get; set; }

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

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Email).HasMaxLength(200);
            entity.Property(e => e.Phone).HasMaxLength(20);
            entity.Property(e => e.CakeType).HasMaxLength(50);
            entity.Property(e => e.CakeSize).HasMaxLength(50);
            entity.Property(e => e.CakeFlavor).HasMaxLength(50);
            entity.Property(e => e.FrostingFlavor).HasMaxLength(50);
            entity.Property(e => e.DateNeeded).HasMaxLength(50);
            entity.Property(e => e.SpecialInstructions).HasMaxLength(500);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
