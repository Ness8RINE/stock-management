import { getInventory, getCategories, getUnits } from '@/app/actions/inventory';
import InventoryClient from './InventoryClient';

export default async function InventoryPage() {
    const [inventoryData, categories, units] = await Promise.all([
        getInventory(),
        getCategories(),
        getUnits()
    ]);

    return <InventoryClient initialData={inventoryData} categories={categories} units={units} />;
}
