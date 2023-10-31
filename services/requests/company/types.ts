import { AddressCreationProps, AddressGetProps } from "../address/types";

export interface CompanyCreationProps{  
    id?: string
    fantasyName: string;
    reasonName: string;
    cnpj: string;
    status: boolean;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    address: AddressCreationProps;
}

export interface CompanyFormData{
    fantasyName: string;
    reasonName: string;
    cnpj: string;
    status: boolean;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    street: string;
    number: string;
    complement: string;
    district: string;
    city: string;
    uf: string;
    cep: string;
};

// export interface CompanyCreationProps extends Company{
    // opening_hours: string;
    // end_working_hours: string;
    // work_days: string[];
    // tenant: number;
    // address: number;
    // couriers: number[];
// };

export interface CompanyGetProps extends CompanyCreationProps{
// export interface CompanyGetProps extends Company{
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    address: AddressGetProps;
};

export interface CompanyFiltersProps{
    reasonName: string;
    cnpj: string;
    status: boolean;
};