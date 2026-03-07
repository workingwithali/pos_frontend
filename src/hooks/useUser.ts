import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { UserProfile, UserProfileSchema } from "@/types/user";

export const useUserProfile = () => {
    return useQuery<UserProfile>({
        queryKey: ["user-profile"],
        queryFn: async () => {
            const { data } = await api.get("/users/profile");
            return UserProfileSchema.parse(data);
        },
    });
};

export const useUpdateUserProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: Partial<UserProfile>) => {
            const { data } = await api.patch("/users/profile", payload);
            return UserProfileSchema.parse(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-profile"] });
            queryClient.invalidateQueries({ queryKey: ["me"] });
        },
    });
};
