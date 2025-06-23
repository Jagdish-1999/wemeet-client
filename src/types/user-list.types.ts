export interface UserListTypes {
    status: number;
    message: string;
    data: UserType[];
}

export interface UserType {
    _id: string;
    name: string;
    createdAt: string;
}
