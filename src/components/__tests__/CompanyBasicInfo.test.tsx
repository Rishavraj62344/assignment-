import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companySchema, CompanyFormData } from '@/lib/validation';
import CompanyBasicInfo from '../forms/CompanyBasicInfo';


function TestWrapper({ children }: { children: React.ReactNode }) {
    const methods = useForm<CompanyFormData>({
        resolver: zodResolver(companySchema),
        defaultValues: {
            companyName: '',
            address: '',
            email: '',
            phoneNumber: '',
            empInfo: [],
        },
    });

    return (
        <form>
            {children}
        </form>
    );
}

describe('CompanyBasicInfo', () => {
    it('renders all form fields', () => {
        render(
            <TestWrapper>
                <CompanyBasicInfo />
            </TestWrapper>
        );

        expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    });

    it('shows required field indicators', () => {
        render(
            <TestWrapper>
                <CompanyBasicInfo />
            </TestWrapper>
        );

        expect(screen.getByText(/company name \*/)).toBeInTheDocument();
        expect(screen.getByText(/email \*/)).toBeInTheDocument();
        expect(screen.getByText(/phone number \*/)).toBeInTheDocument();
    });

    it('has correct input types', () => {
        render(
            <TestWrapper>
                <CompanyBasicInfo />
            </TestWrapper>
        );

        expect(screen.getByLabelText(/company name/i)).toHaveAttribute('type', 'text');
        expect(screen.getByLabelText(/email/i)).toHaveAttribute('type', 'email');
        expect(screen.getByLabelText(/phone number/i)).toHaveAttribute('type', 'tel');
    });
});
