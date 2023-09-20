import React from "react";

interface GridProps {
    cols: string;
    children: JSX.Element
}


const Grid = ({cols, children}:GridProps)=>{
    
    const defineCols = (numbers:string)=>{
        const col = numbers ? numbers.split(" "):[]
        let classes = ''
        if(col[0]) classes += `col-xs-${col[0]}`
        if(col[1]) classes += `col-sm-${col[1]}`
        if(col[2]) classes += `col-md-${col[2]}`
        if(col[3]) classes += `col-lg-${col[3]}`

        return classes
    }

    return (
        <div className={defineCols(cols)}>
            {children}
        </div>
    )
}

export default Grid