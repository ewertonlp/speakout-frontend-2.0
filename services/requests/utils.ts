export interface FiltersProps{
    sort?: string;
    pagination_with_count?: boolean;
    pagination_page_number?: number;
    pagination_page_size?: number;
    pagination_start?: number;
    pagination_limit?: number;
    fields?: string;
    populate?: string;
    filters?: Record<string, unknown>;
    locale?: string;
}

export function getParamsObj({sort, pagination_with_count, pagination_limit, pagination_page_number, pagination_page_size, pagination_start, fields, populate, filters, locale} : FiltersProps){

    let params = {};

    if(sort){
        const param = {sort: sort};
        params = Object.assign(param, params);
    }

    if(pagination_limit){
        const param = {'pagination[limit]': pagination_limit};
        params = Object.assign(params, param);
    }

    if(pagination_page_number){
        const param = {'pagination[page]': pagination_page_number};
        params = Object.assign(params, param);
    }

    if(pagination_page_size){
        const param = {'pagination[pageSize]': pagination_page_size};
        params = Object.assign(params, param);
    }
    
    if(pagination_with_count){
        const param = {'pagination[withCount]': pagination_with_count};
        params = Object.assign(params, param);
    }

    if(pagination_start){
        const param = {'pagination[start]': pagination_start};
        params = Object.assign(params, param);
    }

    if(fields){
        const param = {fields: fields};
        params = Object.assign(params, param);
    }

    if(populate){
        const param = {populate: populate};
        params = Object.assign(params, param);
    }

    if(filters){
        const param = {filters: filters};
        params = Object.assign(params, param);
    }

    if(locale){
        const param = {locale: locale};
        params = Object.assign(params, param);
    }

    return params;
}
