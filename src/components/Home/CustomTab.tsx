import React from "react";
import { Tabs,TabsList, TabsTrigger, TabsContent } from "../UI";
import { Input } from "../UI";

export const CustomTab = ({ data }) => {
  return (
    <Tabs defaultValue={data[0].id}>
      {" "}
      {/* Set the default tab value */}
      <TabsList>
        {data.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {data.map((tab) =>
        tab.fields.map((field) => {
          return (
            <TabsContent key={field.id} value={tab.id}>
              <Input id={field.id} name={field.id} label={field.label} />
            </TabsContent>
          );
        })
      )}
    </Tabs>
  );
};
