// next
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthContext } from 'src/auth/useAuthContext'
import DashboardLayout from 'src/layouts/dashboard'

// ----------------------------------------------------------------------

Index.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>

// ----------------------------------------------------------------------

export default function Index() {
    const { push } = useRouter()

    const { user } = useAuthContext()

    useEffect(() => {
        if (user?.role.type === 'Administrador') push('/home')
        else push('/relatos')
        // push('/home')
    }, [])

    return <></>
}
