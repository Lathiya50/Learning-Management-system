 import React, {FC} from "react"; 

 interface HeadProps{
    title:string;
    description:string;
    keywords:string
 }

 const Heading:FC <HeadProps>=({title,description,keywords})=>{
    return(
        <>
            <title>{title}</title>
        </>
    )
 }