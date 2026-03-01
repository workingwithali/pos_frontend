import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export const dashboardKeys = {
    all: ["dashboard"] as const,
    metrics: () => [...dashboardKeys.all, "metrics"] as const,
    topSelling: () => [...dashboardKeys.all, "topSelling"] as const,
    lowStock: () => [...dashboardKeys.all, "lowStock"] as const,
};

export interface DashboardMetrics {
    todaySales: number;
    totalRevenue: number;
    totalProducts: number;
}

export interface TopSellingProduct {
    productId: string;
    name: string;
    price: number;
    totalSold: number;
}

export interface LowStockProduct {
    id: string;
    name: string;
    sku: string | null;
    stock: number;
    lowStockThreshold: number;
}


// --- GET Metrics ---
export const useGetMetrics = () => {
    return useQuery({
        queryKey: dashboardKeys.metrics(),
        queryFn: async (): Promise<DashboardMetrics> => {
            const { data } = await api.get("/dashboard/metrics");
            return data;
        },
    });
};


// --- GET Top Selling ---
export const useGetTopSelling = () => {
    return useQuery({
        queryKey: dashboardKeys.topSelling(),
        queryFn: async (): Promise<TopSellingProduct[]> => {
            const { data } = await api.get("/dashboard/top-selling");
            return data;
        },
    });
};


// --- GET Low Stock ---
export const useGetLowStock = () => {
    return useQuery({
        queryKey: dashboardKeys.lowStock(),
        queryFn: async (): Promise<LowStockProduct[]> => {
            const { data } = await api.get("/dashboard/low-stock");
            return data;
        },
    });
};
