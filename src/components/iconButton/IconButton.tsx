import React from "react";

import If from "../If"
import { Button } from "../styles";

interface IconButtonProps{

    hide?: boolean;
    style:string;
    onClick:()=>void;
    icon:string;
}

const IconButton =({hide,style,onClick,icon}:IconButtonProps)=>{
    return (
        <If test={!hide} >
        <Button 
        className={'btn btn-'+style} 
        onClick={onClick}>
            <i className={'fa fa-'+icon}></i>

        </Button>

    </If>
    )
}

export default IconButton