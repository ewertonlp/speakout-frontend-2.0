import { Category } from './category'

export type AccountingBusinessSettings = {
    id?: string
    tenantId?: string | null
    businessId?: string | null
    receivableInterestCategoryId?: string | null
    receivableInterestCategoryReference?: Category | null
    expenseInterestCategoryId?: string | null
    expenseInterestCategoryReference?: Category | null
    receivableFineCategoryId?: string | null
    receivableFineCategoryReference?: Category | null
    expenseFineCategoryId?: string | null
    expenseFineCategoryReference?: Category | null
    receivableDiscountCategoryId?: string | null
    receivableDiscountCategoryReference?: Category | null
    expenseDiscountCategoryId?: string | null
    expenseDiscountCategoryReference?: Category | null

    receivableInterestCategory?: any | null | undefined
    expenseInterestCategory?: any | null | undefined
    receivableFineCategory?: any | null | undefined
    expenseFineCategory?: any | null | undefined
    receivableDiscountCategory?: any | null | undefined
    expenseDiscountCategory?: any | null | undefined
}

export type AccountingBusinessSettingsFilter = {
    businessId?: string | null
    receivableInterestCategoryId?: string | null
    expenseInterestCategoryId?: string | null
    receivableFineCategoryId?: string | null
    expenseFineCategoryId?: string | null
    receivableDiscountCategoryId?: string | null
    expenseDiscountCategoryId?: string | null
}
