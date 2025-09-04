export interface Company {
    id: string;
    companyName: string;
    address?: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    empInfo: Employee[];
}

export interface Employee {
    id: string;
    companyId: string;
    empName: string;
    designation: string;
    joinDate: string;
    email: string;
    phoneNumber: string;
    skillInfo: Skill[];
    educationInfo: Education[];
}

export interface Skill {
    id: string;
    employeeId: string;
    skillName: string;
    skillRating: number;
}

export interface Education {
    id: string;
    employeeId: string;
    instituteName: string;
    courseName: string;
    completedYear: string;
}

export interface CompaniesResponse {
    companies: Company[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export interface ApiError {
    error: string;
    details?: any;
    field?: string;
}
