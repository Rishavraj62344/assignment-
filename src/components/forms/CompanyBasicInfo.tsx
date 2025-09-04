'use client';

import { useFormContext } from 'react-hook-form';
import { CompanyFormData } from '@/lib/validation';

export default function CompanyBasicInfo() {
    const {
        register,
        formState: { errors },
    } = useFormContext<CompanyFormData>();

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium text-gray-900">Company Basic Information</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Enter the basic details for the company.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                        Company Name *
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            id="companyName"
                            {...register('companyName')}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Enter company name"
                        />
                        {errors.companyName && (
                            <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
                        )}
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Address
                    </label>
                    <div className="mt-1">
                        <textarea
                            id="address"
                            rows={3}
                            {...register('address')}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Enter company address"
                        />
                        {errors.address && (
                            <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email *
                    </label>
                    <div className="mt-1">
                        <input
                            type="email"
                            id="email"
                            {...register('email')}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Enter email address"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                        Phone Number *
                    </label>
                    <div className="mt-1">
                        <input
                            type="tel"
                            id="phoneNumber"
                            {...register('phoneNumber')}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Enter phone number"
                        />
                        {errors.phoneNumber && (
                            <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
