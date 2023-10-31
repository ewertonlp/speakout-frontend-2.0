export const getInitialValues = (defaultValues: any, initialValues: any) => {
    if (!initialValues) return defaultValues

    const newObject = Object.keys(defaultValues).reduce(function (
        accumulator: any,
        key,
    ) {
        let item = initialValues[key] || defaultValues[key]
        if (typeof item == 'number') {
            item = item.toString().replace('.', ',')
        }
        accumulator[key] = item
        return accumulator
    },
    {})

    return newObject
}
