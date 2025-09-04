import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './api';
import { CompanyFormData } from './types';
import toast from 'react-hot-toast';

export const useCompanies = (search = '', page = 1, limit = 10) => {
    return useQuery({
        queryKey: ['companies', search, page, limit],
        queryFn: () => apiClient.getCompanies(search, page, limit),
    });
};

export const useCompany = (id: string) => {
    return useQuery({
        queryKey: ['company', id],
        queryFn: () => apiClient.getCompany(id),
        enabled: !!id,
    });
};

export const useCreateCompany = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CompanyFormData) => apiClient.createCompany(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['companies'] });
            toast.success('Company details saved successfully.');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to create company');
        },
    });
};

export const useUpdateCompany = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: CompanyFormData }) =>
            apiClient.updateCompany(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['companies'] });
            queryClient.invalidateQueries({ queryKey: ['company', id] });
            toast.success('Company details saved successfully.');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to update company');
        },
    });
};

export const useDeleteCompany = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => apiClient.deleteCompany(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['companies'] });
            toast.success('Company deleted successfully');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to delete company');
        },
    });
};
