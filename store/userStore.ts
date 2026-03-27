import { api } from "@/lib/api";
import { LoginResponse, UserStore } from "@/types/rbac";
import { create } from "zustand";

type ExtendedUserStore = UserStore & {
  hasFetchedUser: boolean;
};

export const useUserStore = create<ExtendedUserStore>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  isLoggingOut: false,
  hasFetchedUser: false,

  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),

  fetchUser: async () => {
    const state = get();

    if (state.isLoading || state.hasFetchedUser) return;

    set({ isLoading: true, error: null });

    try {
      const res = await api.get("/auth/me");

      set({
        user: res.data.user,
        hasFetchedUser: true,
        error: null,
      });
    } catch (err: any) {
      const status = err?.response?.status;

      if (status === 401) {
        console.log("[UserStore] No active session");

        set({
          user: null,
          hasFetchedUser: true,
          error: null,
        });
        return;
      }

      set({
        user: null,
        hasFetchedUser: true,
        error:
          err?.response?.data?.error ||
          err?.response?.data?.message ||
          err.message,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (values) => {
    set({ isLoading: true, error: null });

    try {
      const res = await api.post<LoginResponse>("/auth/login", values);

      if (!res.data.success) {
        set({ error: res.data.message });
        return res.data;
      }

      const me = await api.get("/auth/me");

      set({
        user: me.data.user,
        hasFetchedUser: true,
        error: null,
      });

      return res.data;
    } catch (err: any) {
      set({
        error:
          err?.response?.data?.error ||
          err?.response?.data?.message ||
          err.message,
        hasFetchedUser: true,
      });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });

    try {
      await api.post("/auth/logout");

      set({
        user: null,
        error: null,
        hasFetchedUser: true,
      });
    } catch (error: any) {
      set({ error: error?.response?.data?.message || error.message });
      throw error;
    } finally {
      set({ isLoggingOut: false });
    }
  },
}));
