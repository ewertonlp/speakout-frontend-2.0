export type Template = {
    id: string;
    description: string;
    age: string;
};

export type TemplateFilter = {
    description?: string;
    age?: string;
}