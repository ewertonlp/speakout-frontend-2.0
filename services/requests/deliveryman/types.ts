export interface DeliverymanCreationProps{
    name: string;
    cpf: string;
    hourStart: string;
    hourFinal: string;
    days: string[],
    phone: string;
    tenant: number;
    business: number;
};

export interface DeliverymanGetProps extends DeliverymanCreationProps{
    id?: string;
};