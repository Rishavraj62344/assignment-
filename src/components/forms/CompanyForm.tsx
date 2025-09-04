'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companySchema, CompanyFormData } from '@/lib/validation';
import { useCreateCompany, useUpdateCompany } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { BuildingOfficeIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import CompanyBasicInfo from './CompanyBasicInfo';
import EmployeeInfo from './EmployeeInfo';

interface CompanyFormProps {
    initialData?: CompanyFormData;
    companyId?: string;
    isEdit?: boolean;
}

export default function CompanyForm({ initialData, companyId, isEdit = false }: CompanyFormProps) {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState(0);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        setError,
        watch,
    } = useForm<CompanyFormData>({
        resolver: zodResolver(companySchema),
        defaultValues: initialData || {
            companyName: '',
            address: '',
            email: '',
            phoneNumber: '',
            empInfo: [],
        },
    });

    const createCompany = useCreateCompany();
    const updateCompany = useUpdateCompany();

    const onSubmit = async (data: CompanyFormData) => {
        try {

            const formattedData = {
                ...data,
                empInfo: data.empInfo.map(emp => ({
                    ...emp,
                    joinDate: emp.joinDate ? new Date(emp.joinDate).toLocaleDateString('en-GB') : '',
                })),
            };

            if (isEdit && companyId) {
                await updateCompany.mutateAsync({ id: companyId, data: formattedData });
            } else {
                await createCompany.mutateAsync(formattedData);
                router.push('/companies');
            }
        } catch (error: any) {
            if (error.message && error.message.includes('Validation error')) {

                const errorData = JSON.parse(error.message);
                if (errorData.details) {
                    errorData.details.forEach((detail: any) => {
                        setError(detail.path.join('.'), { message: detail.message });
                    });
                }
            } else {
                console.error('Form submission error:', error);
            }
        }
    };

    const tabs = [
        {
            name: 'Company Basic Info',
            icon: BuildingOfficeIcon,
            component: <CompanyBasicInfo />,
        },
        {
            name: 'Employee Info',
            icon: UserGroupIcon,
            component: <EmployeeInfo />,
        },
    ];

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                    {isEdit ? 'Edit Company' : 'Create New Company'}
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                    {isEdit
                        ? 'Update company information and employee details.'
                        : 'Fill in the company details and add employee information.'
                    }
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
                    <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                        {tabs.map((tab, index) => (
                            <Tab
                                key={tab.name}
                                className={({ selected }) =>
                                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 ${selected
                                        ? 'bg-white shadow'
                                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                    }`
                                }
                            >
                                <div className="flex items-center justify-center space-x-2">
                                    <tab.icon className="h-5 w-5" />
                                    <span>{tab.name}</span>
                                </div>
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels className="mt-6">
                        {tabs.map((tab, index) => (
                            <Tab.Panel key={index} className="rounded-xl bg-white p-6 shadow">
                                {tab.component}
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                </Tab.Group>


                {Object.keys(errors).length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                        <div className="flex">
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">
                                    Please fix the following errors:
                                </h3>
                                <div className="mt-2 text-sm text-red-700">
                                    <ul className="list-disc list-inside space-y-1">
                                        {Object.entries(errors).map(([field, error]) => (
                                            <li key={field}>
                                                {field}: {error?.message}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Saving...' : isEdit ? 'Update Company' : 'Create Company'}
                    </button>
                </div>
            </form>
        </div>
    );
}
