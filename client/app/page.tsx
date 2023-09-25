'use client'
import React, {FC,useState} from "react";
import Heading from "./utils/Heading";

interface props{}

const Page: FC<props>= (props)=>{
  return (
    <div>
      <Heading 
        title="ELearning"
        description="ELearning is a platform for studdents to learn and get help from teachers"
        keywords="Programing,MERN,Redux,Machine Learning"
      />
    </div>
  )
};

export default Page;