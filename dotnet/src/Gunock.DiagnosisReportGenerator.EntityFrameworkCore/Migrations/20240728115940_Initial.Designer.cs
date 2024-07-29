﻿// <auto-generated />
using System;
using Gunock.DiagnosisReportGenerator.EntityFrameworkCore.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Volo.Abp.EntityFrameworkCore;

#nullable disable

namespace Gunock.DiagnosisReportGenerator.EntityFrameworkCore.Entities
{
    [DbContext(typeof(DiagnosisReportGeneratorDbContext))]
    [Migration("20240728115940_Initial")]
    partial class Initial
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("_Abp_DatabaseProvider", EfCoreDatabaseProvider.Sqlite)
                .HasAnnotation("ProductVersion", "8.0.7");

            modelBuilder.Entity("GeneMutation", b =>
                {
                    b.Property<Guid>("GenesId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("MutationsId")
                        .HasColumnType("TEXT");

                    b.HasKey("GenesId", "MutationsId");

                    b.HasIndex("MutationsId");

                    b.ToTable("GeneMutation");
                });

            modelBuilder.Entity("GeneTestMethod", b =>
                {
                    b.Property<Guid>("GenesId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("TestMethodsId")
                        .HasColumnType("TEXT");

                    b.HasKey("GenesId", "TestMethodsId");

                    b.HasIndex("TestMethodsId");

                    b.ToTable("GeneTestMethod");
                });

            modelBuilder.Entity("Gunock.DiagnosisReportGenerator.Domain.Diagnoses.Diagnosis", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(128)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Diagnoses");
                });

            modelBuilder.Entity("Gunock.DiagnosisReportGenerator.Domain.Genes.Gene", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(128)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Genes");
                });

            modelBuilder.Entity("Gunock.DiagnosisReportGenerator.Domain.Illnesses.Illness", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(128)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Illnesses");
                });

            modelBuilder.Entity("Gunock.DiagnosisReportGenerator.Domain.Mutations.Mutation", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(128)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Mutations");
                });

            modelBuilder.Entity("Gunock.DiagnosisReportGenerator.Domain.Recommendations.Recommendation", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<int?>("AgeFrom")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("AgeTo")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Level")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(128)
                        .HasColumnType("TEXT");

                    b.Property<int>("Priority")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Recommendations");
                });

            modelBuilder.Entity("Gunock.DiagnosisReportGenerator.Domain.Staff.StaffMember", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(128)
                        .HasColumnType("TEXT");

                    b.Property<int>("Role")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(128)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("StaffMember");
                });

            modelBuilder.Entity("Gunock.DiagnosisReportGenerator.Domain.TestMethods.TestMethod", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(128)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("TestMethods");
                });

            modelBuilder.Entity("IllnessRecommendation", b =>
                {
                    b.Property<Guid>("IllnessesId")
                        .HasColumnType("TEXT");

                    b.Property<Guid>("RecommendationsId")
                        .HasColumnType("TEXT");

                    b.HasKey("IllnessesId", "RecommendationsId");

                    b.HasIndex("RecommendationsId");

                    b.ToTable("IllnessRecommendation");
                });

            modelBuilder.Entity("GeneMutation", b =>
                {
                    b.HasOne("Gunock.DiagnosisReportGenerator.Domain.Genes.Gene", null)
                        .WithMany()
                        .HasForeignKey("GenesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Gunock.DiagnosisReportGenerator.Domain.Mutations.Mutation", null)
                        .WithMany()
                        .HasForeignKey("MutationsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("GeneTestMethod", b =>
                {
                    b.HasOne("Gunock.DiagnosisReportGenerator.Domain.Genes.Gene", null)
                        .WithMany()
                        .HasForeignKey("GenesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Gunock.DiagnosisReportGenerator.Domain.TestMethods.TestMethod", null)
                        .WithMany()
                        .HasForeignKey("TestMethodsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("IllnessRecommendation", b =>
                {
                    b.HasOne("Gunock.DiagnosisReportGenerator.Domain.Illnesses.Illness", null)
                        .WithMany()
                        .HasForeignKey("IllnessesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Gunock.DiagnosisReportGenerator.Domain.Recommendations.Recommendation", null)
                        .WithMany()
                        .HasForeignKey("RecommendationsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
