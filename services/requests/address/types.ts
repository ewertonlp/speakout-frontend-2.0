export interface AddressCreationProps{
    id?: string;
    street: string;
    number: string;
    complement: string;
    district: string;
    city: string;
    uf: string;
    cep: string;
};

export interface AddressGetProps extends AddressCreationProps{
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    latitude: string;
    longitude: string;
};
