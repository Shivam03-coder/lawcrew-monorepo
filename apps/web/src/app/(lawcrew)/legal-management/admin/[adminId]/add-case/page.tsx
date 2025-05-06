"use client";
import AddClientForm from "@/components/forms/case-details-form";
import AddClientFormNavs from "@/components/shared/add-client-form-nav";
import AddCleintPoster from "@/components/shared/add-client-poster";
import React, { useState } from "react";

const AddCasePage = () => {
  const [active, setActive] = useState("Case Details");
  return (
    <main className="flex p-4">
      <div className="flex w-[350px] flex-col gap-y-5">
        <AddClientFormNavs active={active} setActive={setActive} />
        <AddCleintPoster />
      </div>
      <div className="center h-full w-full p-5">
        <AddClientForm />
      </div>
    </main>
  );
};

export default AddCasePage;
