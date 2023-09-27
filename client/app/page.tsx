'use client'
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";

interface props { }

const Page: FC<props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  return (
    <div>
      <Heading
        title="ELearning"
        description="ELearning is a platform for studdents to learn and get help from teachers"
        keywords="Programing,MERN,Redux,Machine Learning"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
      />
    </div>
  )
};

export default Page;