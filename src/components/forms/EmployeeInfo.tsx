'use client';

import { useFormContext, useFieldArray } from 'react-hook-form';
import { CompanyFormData } from '@/lib/validation';
import { DESIGNATION_OPTIONS, SKILL_OPTIONS, MONTHS, YEARS } from '@/lib/constants';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function EmployeeInfo() {
    const {
        register,
        control,
        formState: { errors },
        watch,
    } = useFormContext<CompanyFormData>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'empInfo',
    });

    const addEmployee = () => {
        append({
            empName: '',
            designation: '',
            joinDate: '',
            email: '',
            phoneNumber: '',
            skillInfo: [],
            educationInfo: [],
        });
    };

    const removeEmployee = (index: number) => {
        remove(index);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium text-gray-900">Employee Information</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Add employee details including skills and education.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={addEmployee}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add Employee
                </button>
            </div>

            {fields.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-sm text-gray-500">No employees added yet.</p>
                    <button
                        type="button"
                        onClick={addEmployee}
                        className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                    >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add First Employee
                    </button>
                </div>
            )}

            {fields.map((field, employeeIndex) => (
                <div key={field.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-md font-medium text-gray-900">
                            Employee {employeeIndex + 1}
                        </h4>
                        <button
                            type="button"
                            onClick={() => removeEmployee(employeeIndex)}
                            className="text-red-600 hover:text-red-800"
                        >
                            <TrashIcon className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Employee Name *
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    {...register(`empInfo.${employeeIndex}.empName`)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    placeholder="Enter employee name"
                                />
                                {errors.empInfo?.[employeeIndex]?.empName && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.empInfo[employeeIndex]?.empName?.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Designation *
                            </label>
                            <div className="mt-1">
                                <select
                                    {...register(`empInfo.${employeeIndex}.designation`)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                >
                                    <option value="">Select designation</option>
                                    {DESIGNATION_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.empInfo?.[employeeIndex]?.designation && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.empInfo[employeeIndex]?.designation?.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Join Date *
                            </label>
                            <div className="mt-1">
                                <input
                                    type="date"
                                    {...register(`empInfo.${employeeIndex}.joinDate`)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                                {errors.empInfo?.[employeeIndex]?.joinDate && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.empInfo[employeeIndex]?.joinDate?.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email *
                            </label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    {...register(`empInfo.${employeeIndex}.email`)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    placeholder="Enter email address"
                                />
                                {errors.empInfo?.[employeeIndex]?.email && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.empInfo[employeeIndex]?.email?.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Phone Number *
                            </label>
                            <div className="mt-1">
                                <input
                                    type="tel"
                                    {...register(`empInfo.${employeeIndex}.phoneNumber`)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    placeholder="Enter phone number"
                                />
                                {errors.empInfo?.[employeeIndex]?.phoneNumber && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.empInfo[employeeIndex]?.phoneNumber?.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <SkillsSection employeeIndex={employeeIndex} />
                    <EducationSection employeeIndex={employeeIndex} />
                </div>
            ))}
        </div>
    );
}

function SkillsSection({ employeeIndex }: { employeeIndex: number }) {
    const { control, register, formState: { errors } } = useFormContext<CompanyFormData>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: `empInfo.${employeeIndex}.skillInfo`,
    });

    const addSkill = () => {
        append({
            skillName: '',
            skillRating: '1',
        });
    };

    return (
        <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-sm font-medium text-gray-900">Skills</h5>
                <button
                    type="button"
                    onClick={addSkill}
                    className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200"
                >
                    <PlusIcon className="h-3 w-3 mr-1" />
                    Add Skill
                </button>
            </div>

            {fields.map((field, skillIndex) => (
                <div key={field.id} className="flex items-end space-x-4 mb-3">
                    <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-700">Skill Name</label>
                        <select
                            {...register(`empInfo.${employeeIndex}.skillInfo.${skillIndex}.skillName`)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                        >
                            <option value="">Select skill</option>
                            {SKILL_OPTIONS.map((skill) => (
                                <option key={skill} value={skill}>
                                    {skill}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="w-20">
                        <label className="block text-xs font-medium text-gray-700">Rating</label>
                        <select
                            {...register(`empInfo.${employeeIndex}.skillInfo.${skillIndex}.skillRating`)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                        >
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <option key={rating} value={rating.toString()}>
                                    {rating}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="button"
                        onClick={() => remove(skillIndex)}
                        className="text-red-600 hover:text-red-800 pb-1"
                    >
                        <TrashIcon className="h-4 w-4" />
                    </button>
                </div>
            ))}
        </div>
    );
}

function EducationSection({ employeeIndex }: { employeeIndex: number }) {
    const { control, register, formState: { errors } } = useFormContext<CompanyFormData>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: `empInfo.${employeeIndex}.educationInfo`,
    });

    const addEducation = () => {
        append({
            instituteName: '',
            courseName: '',
            completedYear: '',
        });
    };

    return (
        <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-sm font-medium text-gray-900">Education</h5>
                <button
                    type="button"
                    onClick={addEducation}
                    className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200"
                >
                    <PlusIcon className="h-3 w-3 mr-1" />
                    Add Education
                </button>
            </div>

            {fields.map((field, educationIndex) => (
                <div key={field.id} className="grid grid-cols-1 gap-4 mb-3 sm:grid-cols-3">
                    <div>
                        <label className="block text-xs font-medium text-gray-700">Institute Name</label>
                        <input
                            type="text"
                            {...register(`empInfo.${employeeIndex}.educationInfo.${educationIndex}.instituteName`)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                            placeholder="Institute name"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700">Course Name</label>
                        <input
                            type="text"
                            {...register(`empInfo.${employeeIndex}.educationInfo.${educationIndex}.courseName`)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                            placeholder="Course name"
                        />
                    </div>
                    <div className="flex items-end space-x-2">
                        <div className="flex-1">
                            <label className="block text-xs font-medium text-gray-700">Completed Year</label>
                            <div className="mt-1 flex space-x-1">
                                <select
                                    {...register(`empInfo.${employeeIndex}.educationInfo.${educationIndex}.completedYear`)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                                >
                                    <option value="">Select month</option>
                                    {MONTHS.map((month) => (
                                        <option key={month} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </select>
                                <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm">
                                    <option value="">Select year</option>
                                    {YEARS.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => remove(educationIndex)}
                            className="text-red-600 hover:text-red-800 pb-1"
                        >
                            <TrashIcon className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
