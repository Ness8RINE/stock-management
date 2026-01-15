import { getSuppliers } from '@/app/actions/suppliers';
import SuppliersClient from './SuppliersClient';

export default async function SuppliersPage() {
    const suppliers = await getSuppliers();

    return <SuppliersClient initialData={suppliers} />;
}
