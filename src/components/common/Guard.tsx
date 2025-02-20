import { getPermissions } from "@/hooks/usePermission";
import { PropsWithChildren, useEffect, useState } from "react"

export function Guard({permissions, children}: {permissions: string[]} & PropsWithChildren) {
    const [authorized, setAuthorized] = useState(false)
    useEffect(() => {
        const check = async ()=> {
            const {authorized: auth} = await getPermissions(permissions);
            setAuthorized(auth);
        }
        check()
    }, [permissions])
    return (
        <>
            {authorized && children}
        </>
    )
}