import { getCustomers } from '@/app/actions/customers';
import CustomersClient from './CustomersClient';

export default async function CustomersPage() {
    const customers = await getCustomers();

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <CustomersClient initialData={customers} />
        </div>
    );
}
