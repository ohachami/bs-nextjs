import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DashboardWrapperItem {
    code: string;
    name: string;
    content: React.ReactElement;
}

interface Props {
    items: DashboardWrapperItem[];
}

function DashboardWrapper({ items }: Props) {
    const defaultItem = items[0];
    return (
        <Tabs defaultValue={defaultItem.code} className="rounded">
            <TabsList variant="link">
                {items.map(({ code, name }) =>
                    <TabsTrigger key={code} variant="link" value={code}>{name}</TabsTrigger>
                )}
            </TabsList>
            {items.map(({ content, code }) =>
                <TabsContent key={code} value={code}>{content}</TabsContent>
            )}
        </Tabs>
    )
}

export default DashboardWrapper;