import { companySchema, employeeSchema, skillSchema, educationSchema } from '../validation';

describe('Validation Schemas', () => {
    describe('companySchema', () => {
        it('should validate a valid company', () => {
            const validCompany = {
                companyName: 'Test Company',
                address: '123 Test St',
                email: 'test@company.com',
                phoneNumber: '+1234567890',
                empInfo: [],
            };

            const result = companySchema.safeParse(validCompany);
            expect(result.success).toBe(true);
        });

        it('should reject company with invalid email', () => {
            const invalidCompany = {
                companyName: 'Test Company',
                email: 'invalid-email',
                phoneNumber: '+1234567890',
                empInfo: [],
            };

            const result = companySchema.safeParse(invalidCompany);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('Invalid email');
            }
        });

        it('should reject company with name too long', () => {
            const invalidCompany = {
                companyName: 'A'.repeat(51), // 51 characters
                email: 'test@company.com',
                phoneNumber: '+1234567890',
                empInfo: [],
            };

            const result = companySchema.safeParse(invalidCompany);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('at most 50 characters');
            }
        });
    });

    describe('employeeSchema', () => {
        it('should validate a valid employee', () => {
            const validEmployee = {
                empName: 'John Doe',
                designation: '1',
                joinDate: '01/01/2020',
                email: 'john@company.com',
                phoneNumber: '+1234567890',
                skillInfo: [],
                educationInfo: [],
            };

            const result = employeeSchema.safeParse(validEmployee);
            expect(result.success).toBe(true);
        });

        it('should reject employee with name too long', () => {
            const invalidEmployee = {
                empName: 'A'.repeat(26), // 26 characters
                designation: '1',
                joinDate: '01/01/2020',
                email: 'john@company.com',
                phoneNumber: '+1234567890',
                skillInfo: [],
                educationInfo: [],
            };

            const result = employeeSchema.safeParse(invalidEmployee);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('at most 25 characters');
            }
        });
    });

    describe('skillSchema', () => {
        it('should validate a valid skill', () => {
            const validSkill = {
                skillName: 'JavaScript',
                skillRating: '4',
            };

            const result = skillSchema.safeParse(validSkill);
            expect(result.success).toBe(true);
        });

        it('should reject skill with invalid rating', () => {
            const invalidSkill = {
                skillName: 'JavaScript',
                skillRating: '6', // Invalid rating
            };

            const result = skillSchema.safeParse(invalidSkill);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('between 1 and 5');
            }
        });
    });

    describe('educationSchema', () => {
        it('should validate a valid education', () => {
            const validEducation = {
                instituteName: 'Test University',
                courseName: 'Computer Science',
                completedYear: 'Mar 2021',
            };

            const result = educationSchema.safeParse(validEducation);
            expect(result.success).toBe(true);
        });

        it('should reject education with invalid year format', () => {
            const invalidEducation = {
                instituteName: 'Test University',
                courseName: 'Computer Science',
                completedYear: '2021-03', // Invalid format
            };

            const result = educationSchema.safeParse(invalidEducation);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('format \'Mon YYYY\'');
            }
        });

        it('should reject education with institute name too long', () => {
            const invalidEducation = {
                instituteName: 'A'.repeat(51), // 51 characters
                courseName: 'Computer Science',
                completedYear: 'Mar 2021',
            };

            const result = educationSchema.safeParse(invalidEducation);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toContain('at most 50 characters');
            }
        });
    });
});
