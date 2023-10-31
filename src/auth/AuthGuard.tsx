import { useEffect, useState } from 'react'
// next
import { useRouter } from 'next/router'
// components
//
import AuthController from 'controllers/authController'
import { UserInfo } from 'services/requests/user/types'
import LoadingScreen from 'src/components/loading-screen'

// ----------------------------------------------------------------------

type AuthGuardProps = {
    children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const { pathname, push } = useRouter()

    const [user, setUser] = useState<UserInfo>()

    useEffect(() => {
        const authController = new AuthController()
        const user = authController.getUser()
        setUser(user)
    }, [pathname, push])

    if (!user) {
        return <LoadingScreen />
    }

    return <>{children}</>
}
