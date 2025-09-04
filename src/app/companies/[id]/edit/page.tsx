'use client';

import { useParams } from 'next/navigation';
import { useCompany } from '@/lib/hooks';
import CompanyForm from '@/components/forms/CompanyForm';
import { CompanyFormData } from '@/lib/validation';
import { format } from 'date-fns';

export default function EditCompanyPage() {
    const params = useParams();
    const companyId = params.id as string;

    const { data: company, isLoading, error } = useCompany(companyId);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="ml-3 text-sm text-gray-500">Loading company details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Error loading company</h3>
                        <div className="mt-2 text-sm text-red-700">
                            {error.message || 'Company not found'}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!company) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">Company not found</h3>
                <p className="mt-2 text-sm text-gray-500">
                    The company you're looking for doesn't exist or has been deleted.
                </p>
            </div>
        );
    }


    const formData: CompanyFormData = {
        companyName: company.companyName,
        address: company.address || '',
        email: company.email,
        phoneNumber: company.phoneNumber,
        empInfo: company.empInfo.map(emp => ({
            empName: emp.empName,
            designation: emp.designation,
            joinDate: emp.joinDate ? format(new Date(emp.joinDate), 'yyyy-MM-dd') : '',
            email: emp.email,
            phoneNumber: emp.phoneNumber,
            skillInfo: emp.skillInfo.map(skill => ({
                skillName: skill.skillName,
                skillRating: skill.skillRating.toString(),
            })),
            educationInfo: emp.educationInfo.map(edu => ({
                instituteName: edu.instituteName,
                courseName: edu.courseName,
                completedYear: edu.completedYear,
            })),
        })),
    };

    return <CompanyForm initialData={formData} companyId={companyId} isEdit={true} />;
}
