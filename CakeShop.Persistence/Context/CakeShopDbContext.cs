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
    public virtual DbSet<ItemType> ItemTypes { get; set; }
    public virtual DbSet<CakeSize> CakeSizes { get; set; }
    public virtual DbSet<FrostingOption> FrostingOptions { get; set; }
    public virtual DbSet<Order> Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Item>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Item__3214EC071CB85E4C");

            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.Price).HasColumnType("money");
            entity.Property(e => e.Title).HasMaxLength(50);

            entity.HasOne(e => e.ItemType)
                .WithMany(e => e.Items)
                .HasForeignKey(e => e.ItemTypeId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<ItemType>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.DisplayOrder);

            entity.HasData(
                new ItemType { Id = 1, Name = "Celebration Cakes", DisplayOrder = 1, IsActive = true },
                new ItemType { Id = 2, Name = "Cupcakes", DisplayOrder = 2, IsActive = true },
                new ItemType { Id = 3, Name = "Cheesecakes", DisplayOrder = 3, IsActive = true },
                new ItemType { Id = 4, Name = "Pastries", DisplayOrder = 4, IsActive = true }
            );
        });

        modelBuilder.Entity<CakeSize>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).HasMaxLength(50);

            entity.HasData(
                new CakeSize { Id = 1, Name = "7\" Round", DisplayOrder = 1, IsActive = true },
                new CakeSize { Id = 2, Name = "9\" Round", DisplayOrder = 2, IsActive = true },
                new CakeSize { Id = 3, Name = "9x13\" Sheet", DisplayOrder = 3, IsActive = true }
            );
        });

        modelBuilder.Entity<FrostingOption>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).HasMaxLength(50);

            entity.HasData(
                new FrostingOption { Id = 1, Name = "Vanilla Buttercream", DisplayOrder = 1, IsActive = true },
                new FrostingOption { Id = 2, Name = "Chocolate Buttercream", DisplayOrder = 2, IsActive = true },
                new FrostingOption { Id = 3, Name = "Cream Cheese", DisplayOrder = 3, IsActive = true },
                new FrostingOption { Id = 4, Name = "Swiss Meringue", DisplayOrder = 4, IsActive = true },
                new FrostingOption { Id = 5, Name = "Chocolate Ganache", DisplayOrder = 5, IsActive = true }
            );
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
