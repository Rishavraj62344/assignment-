import { z } from 'zod';

export const skillSchema = z.object({
    skillName: z.string().min(1, 'Skill name is required'),
    skillRating: z.string().transform(val => parseInt(val)).refine(val => val >= 1 && val <= 5, {
        message: "Skill rating must be between 1 and 5"
    })
});

export const educationSchema = z.object({
    instituteName: z.string().min(1, 'Institute name is required').max(50, 'Institute name must be at most 50 characters'),
    courseName: z.string().min(1, 'Course name is required').max(25, 'Course name must be at most 25 characters'),
    completedYear: z.string().regex(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4}$/, {
        message: "Completed year must be in format 'Mon YYYY'"
    })
});

export const employeeSchema = z.object({
    empName: z.string().min(1, 'Employee name is required').max(25, 'Employee name must be at most 25 characters'),
    designation: z.string().min(1, 'Designation is required'),
    joinDate: z.string().min(1, 'Join date is required'),
    email: z.string().email('Invalid email format').max(100, 'Email must be at most 100 characters'),
    phoneNumber: z.string().min(1, 'Phone number is required').max(15, 'Phone number must be at most 15 characters'),
    skillInfo: z.array(skillSchema).optional().default([]),
    educationInfo: z.array(educationSchema).optional().default([])
});

export const companySchema = z.object({
    companyName: z.string().min(1, 'Company name is required').max(50, 'Company name must be at most 50 characters'),
    address: z.string().optional(),
    email: z.string().email('Invalid email format').max(100, 'Email must be at most 100 characters'),
    phoneNumber: z.string().min(1, 'Phone number is required').max(15, 'Phone number must be at most 15 characters'),
    empInfo: z.array(employeeSchema).optional().default([])
});

export type CompanyFormData = z.infer<typeof companySchema>;
export type EmployeeFormData = z.infer<typeof employeeSchema>;
export type SkillFormData = z.infer<typeof skillSchema>;
export type EducationFormData = z.infer<typeof educationSchema>;
