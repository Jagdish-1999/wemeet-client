export interface UserListTypes {
    status: number;
    message: string;
    data: UserTypes[];
}

export interface UserTypes {
    _id: string;
    name: string;
    createdAt: string;
}
