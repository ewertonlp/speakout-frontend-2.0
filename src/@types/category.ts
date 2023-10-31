export enum CategoryNatureEnum {
    Income = 1,
    Expense = 2,
}

export enum CategoryTypeEnum {
    Synthetic = 1,
    Analytical = 2,
}

export type Category = {

    id: string | null,
    tenantId: string | null,
    parentCategoryId: string | null,
    categoryReference: Category | null,
    glAccountId:  any | null,
    code: string,
    description: string,
    parentCode: number,
    level: number,
    type: CategoryNatureEnum,
    class: CategoryTypeEnum,
    createDate?: Date | null
};

export type CategoryFilter = {
    parentCategoryId?: string | null,
    code?: string | null,
    description?: string | null,
    parentCode?: number | null,
    type?: CategoryNatureEnum | null,
    class?: CategoryTypeEnum | null,
    level?: number | null,
}