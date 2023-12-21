import React from "react";


const {
    Provider: CategoryServiceProvider , 
    Consumer: CategoryServiceConsumer
}= React.createContext(); // Два компонента создаются при помощи createContext()

export {
    CategoryServiceProvider , 
    CategoryServiceConsumer
}