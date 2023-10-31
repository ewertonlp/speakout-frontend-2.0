export interface OrderCreationProps{
    order: string;
};

export interface OrderGetProps extends OrderCreationProps{
    id?: string;
    createdAt?: string;
    updatedAt?: string;
};