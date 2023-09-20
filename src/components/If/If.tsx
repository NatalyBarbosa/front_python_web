import React from "react";

interface IfProps{
    test:boolean;
    children:any;
}

const If=({test, children}:IfProps) => {
    if(test){
        return children
    }else{
        return false
    }
}

export default If