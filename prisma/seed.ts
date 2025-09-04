import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    await prisma.education.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.employee.deleteMany();
    await prisma.company.deleteMany();


    const google = await prisma.company.create({
        data: {
            companyName: 'Google',
            address: '1600 Amphitheatre Parkway, Mountain View, CA 94043',
            email: 'contact@google.com',
            phoneNumber: '+1-650-253-0000',
            empInfo: {
                create: [
                    {
                        empName: 'June',
                        designation: 'Developer',
                        joinDate: new Date('2021-01-01'),
                        email: 'june@gmail.com',
                        phoneNumber: '+1111111111111',
                        skillInfo: {
                            create: [
                                { skillName: 'Angular', skillRating: 4 },
                                { skillName: 'HTML', skillRating: 5 },
                                { skillName: 'CSS', skillRating: 5 },
                                { skillName: 'JavaScript', skillRating: 5 }
                            ]
                        },
                        educationInfo: {
                            create: [
                                { instituteName: 'Test institute', courseName: 'BE CSE', completedYear: 'Mar 2021' },
                                { instituteName: 'ABC institute', courseName: 'BE ECE', completedYear: 'Jan 2020' }
                            ]
                        }
                    },
                    {
                        empName: 'July',
                        designation: 'Developer',
                        joinDate: new Date('2020-01-01'),
                        email: 'july@gmail.com',
                        phoneNumber: '+1111111111111',
                        skillInfo: {
                            create: [
                                { skillName: 'Java', skillRating: 4 },
                                { skillName: 'SQL', skillRating: 5 },
                                { skillName: 'UI', skillRating: 5 },
                                { skillName: 'JavaScript', skillRating: 5 }
                            ]
                        },
                        educationInfo: {
                            create: [
                                { instituteName: 'Test institute', courseName: 'BE CSE', completedYear: 'Mar 2021' },
                                { instituteName: 'ABC institute', courseName: 'BE ECE', completedYear: 'Jan 2020' }
                            ]
                        }
                    }
                ]
            }
        }
    });

    const microsoft = await prisma.company.create({
        data: {
            companyName: 'Microsoft',
            address: 'One Microsoft Way, Redmond, WA 98052',
            email: 'contact@microsoft.com',
            phoneNumber: '+1-425-882-8080',
            empInfo: {
                create: [
                    {
                        empName: 'John Doe',
                        designation: 'Manager',
                        joinDate: new Date('2019-06-15'),
                        email: 'john.doe@microsoft.com',
                        phoneNumber: '+1-425-123-4567',
                        skillInfo: {
                            create: [
                                { skillName: 'CSharp', skillRating: 5 },
                                { skillName: 'SQL', skillRating: 4 },
                                { skillName: 'AWS', skillRating: 3 }
                            ]
                        },
                        educationInfo: {
                            create: [
                                { instituteName: 'University of Washington', courseName: 'MS Computer Science', completedYear: 'Jun 2019' }
                            ]
                        }
                    },
                    {
                        empName: 'Jane Smith',
                        designation: 'TeamLead',
                        joinDate: new Date('2020-03-10'),
                        email: 'jane.smith@microsoft.com',
                        phoneNumber: '+1-425-987-6543',
                        skillInfo: {
                            create: [
                                { skillName: 'React', skillRating: 5 },
                                { skillName: 'NodeJS', skillRating: 4 },
                                { skillName: 'Python', skillRating: 3 },
                                { skillName: 'Django', skillRating: 3 }
                            ]
                        },
                        educationInfo: {
                            create: [
                                { instituteName: 'Stanford University', courseName: 'BS Computer Science', completedYear: 'May 2020' },
                                { instituteName: 'MIT', courseName: 'MS Software Engineering', completedYear: 'Dec 2021' }
                            ]
                        }
                    }
                ]
            }
        }
    });

    console.log('Seed data created successfully!');
    console.log('Created companies:', { google: google.id, microsoft: microsoft.id });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
