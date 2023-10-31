interface Dic {
    [key: string]: any
}

const MapperUrlParams = (params: Dic): string => {
    let urlParams = ''

    Object.entries(params).forEach(([key, value]) => {
        urlParams += `${key}=${value}&`
    })

    return urlParams
}

export default MapperUrlParams
