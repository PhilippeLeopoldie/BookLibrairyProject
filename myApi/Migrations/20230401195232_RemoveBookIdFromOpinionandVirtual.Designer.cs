﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace myApi.Migrations
{
    [DbContext(typeof(myApiContext))]
    [Migration("20230401195232_RemoveBookIdFromOpinionandVirtual")]
    partial class RemoveBookIdFromOpinionandVirtual
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("myApi.Models.Book", b =>
                {
                    b.Property<int>("BookId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BookId"));

                    b.Property<string>("Author")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("BookId");

                    b.HasIndex("UserId");

                    b.ToTable("Books");
                });

            modelBuilder.Entity("myApi.Models.Opinion", b =>
                {
                    b.Property<int>("OpinionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("OpinionId"));

                    b.Property<int?>("BookId")
                        .HasColumnType("int");

                    b.Property<bool?>("Like")
                        .HasColumnType("bit");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.Property<string>("View")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("userName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("OpinionId");

                    b.HasIndex("BookId");

                    b.HasIndex("UserId");

                    b.ToTable("Opinions");
                });

            modelBuilder.Entity("myApi.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("myApi.Models.Book", b =>
                {
                    b.HasOne("myApi.Models.User", null)
                        .WithMany("Books")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("myApi.Models.Opinion", b =>
                {
                    b.HasOne("myApi.Models.Book", "Book")
                        .WithMany("Opinions")
                        .HasForeignKey("BookId");

                    b.HasOne("myApi.Models.User", null)
                        .WithMany("Opinions")
                        .HasForeignKey("UserId");

                    b.Navigation("Book");
                });

            modelBuilder.Entity("myApi.Models.Book", b =>
                {
                    b.Navigation("Opinions");
                });

            modelBuilder.Entity("myApi.Models.User", b =>
                {
                    b.Navigation("Books");

                    b.Navigation("Opinions");
                });
#pragma warning restore 612, 618
        }
    }
}
