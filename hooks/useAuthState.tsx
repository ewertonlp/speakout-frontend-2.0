import AuthController from 'controllers/authController'
import { useState } from 'react'

export default function useAuthState() {
    const [business, setBusiness] = useState(0)
    const [currentBusiness, setCurrentBusiness] = useState(0)

    function getUser() {
        const authController = new AuthController()
        return authController.getUser()
    }

    return { user: getUser(), currentBusiness, business }
}
