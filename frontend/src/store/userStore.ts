import { create } from "zustand";
import { Types } from "mongoose";

// Define user interface
interface User {
    _id: Types.ObjectId;
    name: string;
    email: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Define user store using Zustand

interface IUserStore {
    user: User | null;
    setUser: (user: User) => void;
    logout: () => void;
}


const userStore = create<IUserStore>((set) => ({
    user: null,
    setUser: (user) => set(() => ({ user })),
    logout: () => set(() => ({ user: null }))
}))

export default userStore;