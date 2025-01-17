import ModuleComponent from "@/components/shared/ModuleComponent";
import React from "react";

const HomePage = () => {
    return (
        <div className="max-w-screen-xl mx-auto h-full flex flex-col gap-4 p-8 pt-6">
            <div className="flex flex-col gap-2.5 py-5">
                <h1 className="font-geist font-semibold text-2xl text-card-foreground">Bienvenue au SteerLinX</h1>
                <p className="font-geist font-normal text-sm text-muted-foreground">
                    Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam imperdiet quam fringilla libero rutrum lobortis...
                </p>
            </div>

            <div className="grow grid grid-cols-3 gap-4 ">
                <div className="col-span-1 ">
                    <ModuleComponent 
                        title="Market steering" 
                        description="Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam imperdiet quam fringilla libero rutrum lobortis..." />
                </div>
                <div className="col-span-1">
                    <ModuleComponent
                        title="Tactical planning (business steering)" 
                        description="Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam imperdiet quam fringilla libero rutrum lobortis..." /> 
                </div>
                <div className="col-span-1">
                    <ModuleComponent
                        title="Market steering" 
                        description="Description Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam imperdiet quam fringilla libero rutrum lobortis..." />
                </div>
            </div>

            <div>
                footer
            </div>
        </div>  
    )
}

export default HomePage;