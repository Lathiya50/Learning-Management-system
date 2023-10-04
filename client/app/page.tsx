"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Link from "next/link";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
interface props {}
const Page: FC<props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  if (typeof window != "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }
  return (
    <div>
      <Heading
        title="ELearning"
        description="ELearning is a platform for studdents to learn and get help from teachers"
        keywords="Programing,MERN,Redux,Machine Learning"
      />
      <Header open={open} setOpen={setOpen} activeItem={activeItem} />
      <Hero />
    </div>
  );
};

export default Page;
