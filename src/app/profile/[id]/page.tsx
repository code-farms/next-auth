import React from "react";

export default function page({ params }: any) {
  console.log(params);
  return (
    <div>
      <h1>Profile Data</h1>
      <p>User: {params.id}</p>
    </div>
  );
}
