import { Company, CompaniesResponse, CompanyFormData } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class ApiClient {
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${API_BASE_URL}${endpoint}`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: 'Network error' }));
            throw new Error(error.error || 'Request failed');
        }

        if (response.status === 204) {
            return {} as T;
        }

        return response.json();
    }

    async getCompanies(search = '', page = 1, limit = 10): Promise<CompaniesResponse> {
        const params = new URLSearchParams({
            search,
            page: page.toString(),
            limit: limit.toString(),
        });
        return this.request<CompaniesResponse>(`/api/companies?${params}`);
    }

    async getCompany(id: string): Promise<Company> {
        return this.request<Company>(`/api/companies/${id}`);
    }

    async createCompany(data: CompanyFormData): Promise<Company> {
        return this.request<Company>('/api/companies', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateCompany(id: string, data: CompanyFormData): Promise<Company> {
        return this.request<Company>(`/api/companies/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deleteCompany(id: string): Promise<void> {
        return this.request<void>(`/api/companies/${id}`, {
            method: 'DELETE',
        });
    }
}

export const apiClient = new ApiClient();
