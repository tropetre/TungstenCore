using System;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace TungstenCore
{
    using DataAccess;
    using Models;
    using Models.JoinModels;

    internal static class DataSeeder
    {
        internal static void seedData(IServiceScope serviceScope)
        {
            var context = serviceScope.ServiceProvider.GetService<ApplicationDbContext>();

            if (!context.Users.Any())
            {
                var userStore = serviceScope.ServiceProvider.GetService<UserStore<ApplicationUser>>();
                var userManager = serviceScope.ServiceProvider.GetService<UserManager<ApplicationUser>>();
                var roleManager = serviceScope.ServiceProvider.GetService<RoleManager<IdentityRole>>();

                var group1 = new Group { Name = "9B", Description = "Konstig klass" };
                var group2 = new Group { Name = "9A", Description = "Bra klass" };
                var group3 = new Group { Name = "9C", Description = "Medioker klass" };


                context.Groups.AddRange(
                    group1,
                    group2,
                    group3
                );

                // Group 1
                var student0 = new ApplicationUser { SSN = "010622-4256", PhoneNumber = "+46702312467", UserName = "kurt3", Name = "Kurt Janson", Email = "kurt.jannssson@fakemail.com", Address = "V?stra G?gatan 33, 93791 Burtr?sk" };
                var student1 = new ApplicationUser { SSN = "010322-8634", PhoneNumber = "+46701234567", UserName = "haxxxor33", Name = "Victor Jonsson", Email = "haxxxor33@fakemail.com", Address = "S?dra G?gatan 33, 93791 Burtr?sk" };
                var student2 = new ApplicationUser { SSN = "010421-3124", PhoneNumber = "+46701852567", UserName = "elite120", Name = "Johan Andersson", Email = "elite120@fakemail.com", Address = "Norra G?gatan 12, 93791 Burtr?sk" };
                var student3 = new ApplicationUser { SSN = "010415-3752", PhoneNumber = "+46701212367", UserName = "l33t32", Name = "Philip Pettersson", Email = "l33t32@fakemail.com", Address = "S?dra E4an 24, 93791 Burtr?sk" };
                var student4 = new ApplicationUser { SSN = "011205-7921", PhoneNumber = "+46701233217", UserName = "tommy", Name = "Tommy Lundqvist", Email = "tommy@fakemail.com", Address = "Gulgatan 15, 93791 Burtr?sk" };
                var student5 = new ApplicationUser { SSN = "011222-6475", PhoneNumber = "+46731233567", UserName = "kittenlover1", Name = "Erik Lindqvist", Email = "kittenlover1@fakemail.com", Address = "Gr?ngatan 55, 93791 Burtr?sk" };
                var student6 = new ApplicationUser { SSN = "010324-3217", PhoneNumber = "+46701276547", UserName = "engulsparris", Name = "Wiktor T", Email = "engulsparris@fakemail.com", Address = "Cykelv?gen 38, 93791 Burtr?sk" };
                var student7 = new ApplicationUser { SSN = "010727-8212", PhoneNumber = "+46701235468", UserName = "martinpettersson", Name = "Martin Pettersson", Email = "martinpettersson@fakemail.com", Address = "Bakgatan 34, 93791 Burtr?sk" };
                var student8 = new ApplicationUser { SSN = "011124-3578", PhoneNumber = "+46701315648", UserName = "petterisbest", Name = "Niclas Jonsson", Email = "petterisbest@fakemail.com", Address = "S?dragatan  11, 93791 Burtr?sk" };
                var student9 = new ApplicationUser { SSN = "010625-9545", PhoneNumber = "+46701275321", UserName = "trekkzer", Name = "Jon P?rsson", Email = "trekkzer@fakemail.com", Address = "Patrikgr?nd 1, 93791 Burtr?sk" };

                var teacher1 = new ApplicationUser { SSN = "531124-4375", PhoneNumber = "+46703334567", UserName = "lena.lundmark", Name = "Lena Lundmark", Email = "lena.lundmark@skola.com", Address = "Tv?rs?vergatan 39, 93793 Burtr?sk" };


                // Group 2
                var student10 = new ApplicationUser { SSN = "010730-3458", PhoneNumber = "+46701235422", UserName = "kurt6", Name = "Kurt Bred", Email = "kurt.bred@fakemail.com", Address = "V?stra G?gatan 33, 93791 Burtr?sk" };
                var student11 = new ApplicationUser { SSN = "010201-8214", PhoneNumber = "+46701253212", UserName = "trek5", Name = "Victor Jonsson", Email = "trek5@fakemail.com", Address = "S?dra G?gatan 33, 93791 Burtr?sk" };
                var student12 = new ApplicationUser { SSN = "010302-3212", PhoneNumber = "+46701545667", UserName = "pratbubblan", Name = "Johan Andersson", Email = "pratbubblan@fakemail.com", Address = "Norra G?gatan 12, 93791 Burtr?sk" };
                var student13 = new ApplicationUser { SSN = "010517-4356", PhoneNumber = "+46701245427", UserName = "klasgoran", Name = "Philip Pettersson", Email = "klasgoran@fakemail.com", Address = "S?dra E4an 24, 93791 Burtr?sk" };
                var student14 = new ApplicationUser { SSN = "011231-7328", PhoneNumber = "+46701256456", UserName = "tony", Name = "Tommy Lundqvist", Email = "tony@fakemail.com", Address = "Gulgatan 15, 93791 Burtr?sk" };
                var student15 = new ApplicationUser { SSN = "011214-6458", PhoneNumber = "+46731232317", UserName = "gortbort", Name = "Erik Lindqvist", Email = "gortbort@fakemail.com", Address = "Gr?ngatan 55, 93791 Burtr?sk" };
                var student16 = new ApplicationUser { SSN = "010312-3214", PhoneNumber = "+46701212107", UserName = "hjulgris", Name = "Wiktor T", Email = "hjulgris@fakemail.com", Address = "Cykelv?gen 38, 93791 Burtr?sk" };
                var student17 = new ApplicationUser { SSN = "010724-8322", PhoneNumber = "+46701123468", UserName = "stolpiller", Name = "Martin Pettersson", Email = "stolpiller@fakemail.com", Address = "Bakgatan 34, 93791 Burtr?sk" };
                var student18 = new ApplicationUser { SSN = "011025-3677", PhoneNumber = "+46701312128", UserName = "mejja", Name = "Niclas Jonsson", Email = "mejja@fakemail.com", Address = "S?dragatan  11, 93791 Burtr?sk" };
                var student19 = new ApplicationUser { SSN = "010907-9678", PhoneNumber = "+46701234877", UserName = "patricia", Name = "Jon P?rsson", Email = "patricia@fakemail.com", Address = "Patrikgr?nd 1, 93791 Burtr?sk" };

                var teacher2 = new ApplicationUser { SSN = "550203-4645", PhoneNumber = "+46703334652", UserName = "kurt.wiklund", Name = "Kurt Wiklund", Email = "kurt.wiklund@skola.com", Address = "Norrb?le 39, 93793 Burtr?sk" };


                // Group 1
                var student20 = new ApplicationUser { SSN = "010622-3456", PhoneNumber = "+46701235467", UserName = "patte", Name = "Kurt Janson", Email = "patte@fakemail.com", Address = "V?stra G?gatan 33, 93791 Burtr?sk" };
                var student21 = new ApplicationUser { SSN = "010322-4568", PhoneNumber = "+46701223127", UserName = "nisse43", Name = "Victor Jonsson", Email = "nisse43@fakemail.com", Address = "S?dra G?gatan 33, 93791 Burtr?sk" };
                var student22 = new ApplicationUser { SSN = "010421-4562", PhoneNumber = "+46701812127", UserName = "trakis", Name = "Johan Andersson", Email = "trakis@fakemail.com", Address = "Norra G?gatan 12, 93791 Burtr?sk" };
                var student23 = new ApplicationUser { SSN = "010415-3215", PhoneNumber = "+46701321327", UserName = "gurkmajjo", Name = "Philip Pettersson", Email = "l33t32@fakemail.com", Address = "S?dra E4an 24, 93791 Burtr?sk" };
                var student24 = new ApplicationUser { SSN = "011205-3754", PhoneNumber = "+46701239717", UserName = "ikaros", Name = "Tommy Lundqvist", Email = "ikaros@fakemail.com", Address = "Gulgatan 15, 93791 Burtr?sk" };
                var student25 = new ApplicationUser { SSN = "011222-5456", PhoneNumber = "+46731253758", UserName = "patrik", Name = "Erik Lindqvist", Email = "patrik@fakemail.com", Address = "Gr?ngatan 55, 93791 Burtr?sk" };
                var student26 = new ApplicationUser { SSN = "010324-1285", PhoneNumber = "+46701278654", UserName = "freidrich", Name = "Wiktor T", Email = "freidrich@fakemail.com", Address = "Cykelv?gen 38, 93791 Burtr?sk" };
                var student27 = new ApplicationUser { SSN = "010727-4520", PhoneNumber = "+46701238878", UserName = "qwerty", Name = "Martin Pettersson", Email = "qwerty@fakemail.com", Address = "Bakgatan 34, 93791 Burtr?sk" };
                var student28 = new ApplicationUser { SSN = "011124-0258", PhoneNumber = "+46701313254", UserName = "thebest01", Name = "Niclas Jonsson", Email = "thebest01@fakemail.com", Address = "S?dragatan  11, 93791 Burtr?sk" };
                var student29 = new ApplicationUser { SSN = "010625-5046", PhoneNumber = "+46701275654", UserName = "xX_crazy_russin_Xx", Name = "Jon P?rsson", Email = "crazyrussin@fakemail.com", Address = "Patrikgr?nd 1, 93791 Burtr?sk" };

                var teacher3 = new ApplicationUser { SSN = "531124-4375", PhoneNumber = "+46703399867", UserName = "petter.blank", Name = "Petter Blank", Email = "petter.blank@skola.com", Address = "Fingatan 39, 93793 Burtr?sk" };

                userManager.CreateAsync(student0, "Default123#");
                userManager.CreateAsync(student1, "Default123#");
                userManager.CreateAsync(student2, "Default123#");
                userManager.CreateAsync(student3, "Default123#");
                userManager.CreateAsync(student4, "Default123#");
                userManager.CreateAsync(student5, "Default123#");
                userManager.CreateAsync(student6, "Default123#");
                userManager.CreateAsync(student7, "Default123#");
                userManager.CreateAsync(student8, "Default123#");
                userManager.CreateAsync(student9, "Default123#");
                userManager.CreateAsync(student10, "Default123#");
                userManager.CreateAsync(student11, "Default123#");
                userManager.CreateAsync(student12, "Default123#");
                userManager.CreateAsync(student13, "Default123#");
                userManager.CreateAsync(student14, "Default123#");
                userManager.CreateAsync(student15, "Default123#");
                userManager.CreateAsync(student16, "Default123#");
                userManager.CreateAsync(student17, "Default123#");
                userManager.CreateAsync(student18, "Default123#");
                userManager.CreateAsync(student19, "Default123#");
                userManager.CreateAsync(student20, "Default123#");
                userManager.CreateAsync(student21, "Default123#");
                userManager.CreateAsync(student22, "Default123#");
                userManager.CreateAsync(student23, "Default123#");
                userManager.CreateAsync(student24, "Default123#");
                userManager.CreateAsync(student25, "Default123#");
                userManager.CreateAsync(student26, "Default123#");
                userManager.CreateAsync(student27, "Default123#");
                userManager.CreateAsync(student28, "Default123#");
                userManager.CreateAsync(student29, "Default123#");

                userManager.CreateAsync(teacher1, "TeacherPwd123#");
                userManager.CreateAsync(teacher2, "TeacherPwd123#");
                userManager.CreateAsync(teacher3, "TeacherPwd123#");


                roleManager.CreateAsync(new IdentityRole("Teacher"));
                userManager.AddToRoleAsync(teacher1, "Teacher");
                userManager.AddToRoleAsync(teacher2, "Teacher");
                userManager.AddToRoleAsync(teacher3, "Teacher");


                group1.Participants.Add(new ApplicationUserGroup { ApplicationUser = student0, Group = group1 });
                group1.Participants.Add(new ApplicationUserGroup { ApplicationUser = student1, Group = group1 });
                group1.Participants.Add(new ApplicationUserGroup { ApplicationUser = student2, Group = group1 });
                group1.Participants.Add(new ApplicationUserGroup { ApplicationUser = student3, Group = group1 });
                group1.Participants.Add(new ApplicationUserGroup { ApplicationUser = student4, Group = group1 });
                group1.Participants.Add(new ApplicationUserGroup { ApplicationUser = student5, Group = group1 });
                group1.Participants.Add(new ApplicationUserGroup { ApplicationUser = student6, Group = group1 });
                group1.Participants.Add(new ApplicationUserGroup { ApplicationUser = student7, Group = group1 });
                group1.Participants.Add(new ApplicationUserGroup { ApplicationUser = student8, Group = group1 });
                group1.Participants.Add(new ApplicationUserGroup { ApplicationUser = student9, Group = group1 });

                group1.Participants.Add(new ApplicationUserGroup { ApplicationUser = teacher1, Group = group1 });

                group1.Participants.Add(new ApplicationUserGroup { ApplicationUser = student10, Group = group2 });
                group2.Participants.Add(new ApplicationUserGroup { ApplicationUser = student11, Group = group2 });
                group2.Participants.Add(new ApplicationUserGroup { ApplicationUser = student12, Group = group2 });
                group2.Participants.Add(new ApplicationUserGroup { ApplicationUser = student13, Group = group2 });
                group2.Participants.Add(new ApplicationUserGroup { ApplicationUser = student14, Group = group2 });
                group2.Participants.Add(new ApplicationUserGroup { ApplicationUser = student15, Group = group2 });
                group2.Participants.Add(new ApplicationUserGroup { ApplicationUser = student16, Group = group2 });
                group2.Participants.Add(new ApplicationUserGroup { ApplicationUser = student17, Group = group2 });
                group2.Participants.Add(new ApplicationUserGroup { ApplicationUser = student18, Group = group2 });
                group2.Participants.Add(new ApplicationUserGroup { ApplicationUser = student19, Group = group2 });

                group2.Participants.Add(new ApplicationUserGroup { ApplicationUser = teacher2, Group = group1 });

                group1.Participants.Add(new ApplicationUserGroup { ApplicationUser = student20, Group = group3 });
                group3.Participants.Add(new ApplicationUserGroup { ApplicationUser = student21, Group = group3 });
                group3.Participants.Add(new ApplicationUserGroup { ApplicationUser = student22, Group = group3 });
                group3.Participants.Add(new ApplicationUserGroup { ApplicationUser = student23, Group = group3 });
                group3.Participants.Add(new ApplicationUserGroup { ApplicationUser = student24, Group = group3 });
                group3.Participants.Add(new ApplicationUserGroup { ApplicationUser = student25, Group = group3 });
                group3.Participants.Add(new ApplicationUserGroup { ApplicationUser = student26, Group = group3 });
                group3.Participants.Add(new ApplicationUserGroup { ApplicationUser = student27, Group = group3 });
                group3.Participants.Add(new ApplicationUserGroup { ApplicationUser = student28, Group = group3 });
                group3.Participants.Add(new ApplicationUserGroup { ApplicationUser = student29, Group = group3 });

                group3.Participants.Add(new ApplicationUserGroup { ApplicationUser = teacher3, Group = group1 });


                var course1 = new Course { Level = "6", GroupId = group1.Id, Subject = "English", Description = "Advanced English" };
                var course2 = new Course { Level = "6", GroupId = group1.Id, Subject = "Mathematics", Description = "High-school math" };
                var course3 = new Course { Level = "6", GroupId = group1.Id, Subject = "History", Description = "High-school history" };
                var course4 = new Course { Level = "6", GroupId = group1.Id, Subject = "Sexual Education", Description = "High-school prom" };
                var course5 = new Course { Level = "6", GroupId = group1.Id, Subject = "Chemistry", Description = "High-school nap" };
                var course6 = new Course { Level = "7", GroupId = group2.Id, Subject = "English", Description = "Advanced English" };
                var course7 = new Course { Level = "7", GroupId = group2.Id, Subject = "Mathematics", Description = "High-school math" };
                var course8 = new Course { Level = "7", GroupId = group2.Id, Subject = "History", Description = "High-school history" };
                var course9 = new Course { Level = "7", GroupId = group2.Id, Subject = "Sexual Education", Description = "High-school prom" };
                var course10 = new Course { Level = "4", GroupId = group2.Id, Subject = "Chemistry", Description = "High-school nap" };
                var course11 = new Course { Level = "4", GroupId = group3.Id, Subject = "English", Description = "Advanced English" };
                var course12 = new Course { Level = "4", GroupId = group3.Id, Subject = "Mathematics", Description = "High-school math" };
                var course13 = new Course { Level = "3", GroupId = group3.Id, Subject = "History", Description = "High-school history" };
                var course14 = new Course { Level = "3", GroupId = group3.Id, Subject = "Sexual Education", Description = "High-school prom" };
                var course15 = new Course { Level = "3", GroupId = group3.Id, Subject = "Chemistry", Description = "High-school nap" };


                context.Courses.AddRange(
                    course1,
                    course2,
                    course3,
                    course4,
                    course5,
                    course6,
                    course7,
                    course8,
                    course9,
                    course10,
                    course11,
                    course12,
                    course13,
                    course14,
                    course15
                );


                var lesson0 = new Lesson() { CourseId = course1.Id, StartTime = DateTime.Parse("Mon, 26 Dec 2016 09:10:00"), EndTime = DateTime.Parse("Tue, 27 Dec 2016 09:40:00"), Classroom = "Stora salen" };
                var lesson1 = new Lesson() { CourseId = course2.Id, StartTime = DateTime.Parse("Mon, 26 Dec 2016 13:10:00"), EndTime = DateTime.Parse("Tue, 27 Dec 2016 09:40:00"), Classroom = "Stora salen" };
                var lesson2 = new Lesson() { CourseId = course3.Id, StartTime = DateTime.Parse("Tue, 27 Dec 2016 09:50:00"), EndTime = DateTime.Parse("Tue, 27 Dec 2016 10:50:00"), Classroom = "Lilla salen" };
                var lesson3 = new Lesson() { CourseId = course4.Id, StartTime = DateTime.Parse("Wed, 28 Dec 2016 10:10:00"), EndTime = DateTime.Parse("Wed, 28 Dec 2016 11:30:00"), Classroom = "Mellansalen" };
                var lesson4 = new Lesson() { CourseId = course5.Id, StartTime = DateTime.Parse("Thu, 29 Dec 2016 12:30:00"), EndTime = DateTime.Parse("Thu, 29 Dec 2016 14:00:00"), Classroom = "Microsalen" };
                var lesson5 = new Lesson() { CourseId = course6.Id, StartTime = DateTime.Parse("Fri, 30 Dec 2016 09:00:00"), EndTime = DateTime.Parse("Fri, 30 Dec 2016 10:20:00"), Classroom = "MEGASALEN" };
                var lesson6 = new Lesson() { CourseId = course7.Id, StartTime = DateTime.Parse("Tue, 27 Dec 2016 09:10:00"), EndTime = DateTime.Parse("Tue, 27 Dec 2016 09:40:00"), Classroom = "Stora salen" };
                var lesson7 = new Lesson() { CourseId = course8.Id, StartTime = DateTime.Parse("Tue, 27 Dec 2016 09:50:00"), EndTime = DateTime.Parse("Tue, 27 Dec 2016 10:50:00"), Classroom = "Lilla salen" };
                var lesson8 = new Lesson() { CourseId = course9.Id, StartTime = DateTime.Parse("Wed, 28 Dec 2016 10:10:00"), EndTime = DateTime.Parse("Wed, 28 Dec 2016 11:30:00"), Classroom = "Mellansalen" };
                var lesson9 = new Lesson() { CourseId = course10.Id, StartTime = DateTime.Parse("Thu, 29 Dec 2016 12:30:00"), EndTime = DateTime.Parse("Thu, 29 Dec 2016 14:00:00"), Classroom = "Microsalen" };
                var lesson10 = new Lesson() { CourseId = course11.Id, StartTime = DateTime.Parse("Tue, 27 Dec 2016 09:10:00"), EndTime = DateTime.Parse("Tue, 27 Dec 2016 09:40:00"), Classroom = "Stora salen" };
                var lesson11 = new Lesson() { CourseId = course12.Id, StartTime = DateTime.Parse("Tue, 27 Dec 2016 09:10:00"), EndTime = DateTime.Parse("Tue, 27 Dec 2016 09:40:00"), Classroom = "Stora salen" };
                var lesson12 = new Lesson() { CourseId = course13.Id, StartTime = DateTime.Parse("Tue, 27 Dec 2016 09:50:00"), EndTime = DateTime.Parse("Tue, 27 Dec 2016 10:50:00"), Classroom = "Lilla salen" };
                var lesson13 = new Lesson() { CourseId = course14.Id, StartTime = DateTime.Parse("Wed, 28 Dec 2016 10:10:00"), EndTime = DateTime.Parse("Wed, 28 Dec 2016 11:30:00"), Classroom = "Mellansalen" };
                var lesson14 = new Lesson() { CourseId = course15.Id, StartTime = DateTime.Parse("Thu, 29 Dec 2016 12:30:00"), EndTime = DateTime.Parse("Thu, 29 Dec 2016 14:00:00"), Classroom = "Microsalen" };
                var lesson15 = new Lesson() { CourseId = course1.Id, StartTime = DateTime.Parse("Fri, 30 Dec 2016 09:00:00"), EndTime = DateTime.Parse("Fri, 30 Dec 2016 10:20:00"), Classroom = "MEGASALEN" };
                var lesson16 = new Lesson() { CourseId = course2.Id, StartTime = DateTime.Parse("Tue, 27 Dec 2016 09:10:00"), EndTime = DateTime.Parse("Tue, 27 Dec 2016 09:40:00"), Classroom = "Stora salen" };
                var lesson17 = new Lesson() { CourseId = course3.Id, StartTime = DateTime.Parse("Tue, 27 Dec 2016 09:50:00"), EndTime = DateTime.Parse("Tue, 27 Dec 2016 10:50:00"), Classroom = "Lilla salen" };
                var lesson18 = new Lesson() { CourseId = course4.Id, StartTime = DateTime.Parse("Wed, 28 Dec 2016 10:10:00"), EndTime = DateTime.Parse("Wed, 28 Dec 2016 11:30:00"), Classroom = "Mellansalen" };
                var lesson19 = new Lesson() { CourseId = course5.Id, StartTime = DateTime.Parse("Thu, 29 Dec 2016 12:30:00"), EndTime = DateTime.Parse("Thu, 29 Dec 2016 14:00:00"), Classroom = "Microsalen" };


                context.Lessons.AddRange(
                    lesson1,
                    lesson2,
                    lesson3,
                    lesson4,
                    lesson5,
                    lesson6,
                    lesson7,
                    lesson8,
                    lesson9,
                    lesson10,
                    lesson11,
                    lesson12,
                    lesson13,
                    lesson14,
                    lesson15,
                    lesson16,
                    lesson17,
                    lesson18,
                    lesson19
                );

                ApplicationUser tommy = context.Users.FirstOrDefault(u => u.Email == "tommy@fakemail.com");
                if (tommy != null)
                {
                    userManager.AddToRoleAsync(tommy, "Teacher");
                }

                context.SaveChanges();
            }
        }
    }
}