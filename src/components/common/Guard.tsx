import { usePermissions } from "@/hooks/usePermission";
import { PropsWithChildren } from "react"

export function Guard({permissions, children}: {permissions: string[]} & PropsWithChildren) {
    const {authorized} = usePermissions(permissions);
    return (
        <>
            {authorized && children}
        </>
    )
}