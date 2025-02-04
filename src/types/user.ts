import { RefSbu, Timestamps } from "./refExercise/config";

export type User = Timestamps & {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    lastLogin: Date;
    sbu: RefSbu;
    profile: Profile;
}

export type Profile = Timestamps & {
    id: string;
    name: string;
    permissions: Permission[];
}

export type Permission = Timestamps & {
    id: string;
    name: string;
    description: string;
}