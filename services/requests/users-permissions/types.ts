export interface RoleCreateProps{
    name: string;
    description: string;
}
export interface RoleGetProps extends RoleCreateProps{
    id?: string;
    type: string;
    createdAt?: string;
    updatedAt?: string;
};