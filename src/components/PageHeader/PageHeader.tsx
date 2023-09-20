import React from "react";

interface PageHeaderProps{
    name: string;
    small: string
}

const PageHeader = ({name, small}:PageHeaderProps)=>{
   return(
    <header className='page-header'>
    <h2>{name} <small>{small}</small></h2>
</header>
   )
}

export default PageHeader;