import { CSSProperties, ReactNode } from 'react'

import { FormProvider as Form, UseFormReturn } from 'react-hook-form'

type Props = {
    children: ReactNode | any
    methods: UseFormReturn<any>
    onSubmit?: VoidFunction
    style?: CSSProperties
}

export default function FormProvider({
    children,
    onSubmit,
    style,
    methods,
}: Props) {
    return (
        <Form {...methods}>
            <form onSubmit={onSubmit} style={style}>
                {children}
            </form>
        </Form>
    )
}
