import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.API_PORT || 3001;

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

const skillSchema = z.object({
    skillName: z.string(),
    skillRating: z.string().transform(val => parseInt(val)).refine(val => val >= 1 && val <= 5, {
        message: "Skill rating must be between 1 and 5"
    })
});

const educationSchema = z.object({
    instituteName: z.string().max(50, "Institute name must be at most 50 characters"),
    courseName: z.string().max(25, "Course name must be at most 25 characters"),
    completedYear: z.string().regex(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/, {
        message: "Completed year must be in format 'Mon YYYY'"
    })
});

const employeeSchema = z.object({
    empName: z.string().max(25, "Employee name must be at most 25 characters"),
    designation: z.string(),
    joinDate: z.string(),
    email: z.string().email("Invalid email format").max(100, "Email must be at most 100 characters"),
    phoneNumber: z.string().max(15, "Phone number must be at most 15 characters"),
    skillInfo: z.array(skillSchema).optional().default([]),
    educationInfo: z.array(educationSchema).optional().default([])
});

const companySchema = z.object({
    companyName: z.string().max(50, "Company name must be at most 50 characters"),
    address: z.string().optional(),
    email: z.string().email("Invalid email format").max(100, "Email must be at most 100 characters"),
    phoneNumber: z.string().max(15, "Phone number must be at most 15 characters"),
    empInfo: z.array(employeeSchema).optional().default([])
});

function parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

function formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

app.get('/api/companies', async (req, res) => {
    try {
        const { search = '', page = '1', limit = '10' } = req.query;
        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const skip = (pageNum - 1) * limitNum;

        const where = search ? {
            OR: [
                { companyName: { contains: search as string, mode: 'insensitive' } },
                { email: { contains: search as string, mode: 'insensitive' } }
            ]
        } : {};

        const [companies, total] = await Promise.all([
            prisma.company.findMany({
                where,
                include: {
                    empInfo: {
                        include: {
                            skillInfo: true,
                            educationInfo: true
                        }
                    }
                },
                skip,
                take: limitNum,
                orderBy: { createdAt: 'desc' }
            }),
            prisma.company.count({ where })
        ]);

        res.json({
            companies: companies.map(company => ({
                ...company,
                empInfo: company.empInfo.map(emp => ({
                    ...emp,
                    joinDate: formatDate(emp.joinDate)
                }))
            })),
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                pages: Math.ceil(total / limitNum)
            }
        });
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/companies/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const company = await prisma.company.findUnique({
            where: { id },
            include: {
                empInfo: {
                    include: {
                        skillInfo: true,
                        educationInfo: true
                    }
                }
            }
        });

        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        res.json({
            ...company,
            empInfo: company.empInfo.map(emp => ({
                ...emp,
                joinDate: formatDate(emp.joinDate)
            }))
        });
    } catch (error) {
        console.error('Error fetching company:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/companies', async (req, res) => {
    try {
        const validatedData = companySchema.parse(req.body);


        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (const emp of validatedData.empInfo) {
            const joinDate = parseDate(emp.joinDate);
            if (joinDate >= today) {
                return res.status(400).json({
                    error: 'Join date must be in the past',
                    field: 'joinDate'
                });
            }
        }

        const company = await prisma.company.create({
            data: {
                companyName: validatedData.companyName,
                address: validatedData.address,
                email: validatedData.email,
                phoneNumber: validatedData.phoneNumber,
                empInfo: {
                    create: validatedData.empInfo.map(emp => ({
                        empName: emp.empName,
                        designation: emp.designation as any,
                        joinDate: parseDate(emp.joinDate),
                        email: emp.email,
                        phoneNumber: emp.phoneNumber,
                        skillInfo: {
                            create: emp.skillInfo.map(skill => ({
                                skillName: skill.skillName as any,
                                skillRating: skill.skillRating
                            }))
                        },
                        educationInfo: {
                            create: emp.educationInfo.map(edu => ({
                                instituteName: edu.instituteName,
                                courseName: edu.courseName,
                                completedYear: edu.completedYear
                            }))
                        }
                    }))
                }
            },
            include: {
                empInfo: {
                    include: {
                        skillInfo: true,
                        educationInfo: true
                    }
                }
            }
        });

        res.status(201).json({
            ...company,
            empInfo: company.empInfo.map(emp => ({
                ...emp,
                joinDate: formatDate(emp.joinDate)
            }))
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: 'Validation error',
                details: error.errors
            });
        }
        console.error('Error creating company:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/companies/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const validatedData = companySchema.parse(req.body);


        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (const emp of validatedData.empInfo) {
            const joinDate = parseDate(emp.joinDate);
            if (joinDate >= today) {
                return res.status(400).json({
                    error: 'Join date must be in the past',
                    field: 'joinDate'
                });
            }
        }

        await prisma.employee.deleteMany({
            where: { companyId: id }
        });

        const company = await prisma.company.update({
            where: { id },
            data: {
                companyName: validatedData.companyName,
                address: validatedData.address,
                email: validatedData.email,
                phoneNumber: validatedData.phoneNumber,
                empInfo: {
                    create: validatedData.empInfo.map(emp => ({
                        empName: emp.empName,
                        designation: emp.designation as any,
                        joinDate: parseDate(emp.joinDate),
                        email: emp.email,
                        phoneNumber: emp.phoneNumber,
                        skillInfo: {
                            create: emp.skillInfo.map(skill => ({
                                skillName: skill.skillName as any,
                                skillRating: skill.skillRating
                            }))
                        },
                        educationInfo: {
                            create: emp.educationInfo.map(edu => ({
                                instituteName: edu.instituteName,
                                courseName: edu.courseName,
                                completedYear: edu.completedYear
                            }))
                        }
                    }))
                }
            },
            include: {
                empInfo: {
                    include: {
                        skillInfo: true,
                        educationInfo: true
                    }
                }
            }
        });

        res.json({
            ...company,
            empInfo: company.empInfo.map(emp => ({
                ...emp,
                joinDate: formatDate(emp.joinDate)
            }))
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: 'Validation error',
                details: error.errors
            });
        }
        console.error('Error updating company:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/companies/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const company = await prisma.company.findUnique({
            where: { id }
        });

        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        await prisma.company.delete({
            where: { id }
        });

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting company:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await prisma.$disconnect();
    process.exit(0);
});
