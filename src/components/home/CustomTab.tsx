import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../_shared";
import { Input } from "../_shared";

export const CustomTab = ({ data }: any) => {
  return (
    <Tabs defaultValue={data[0].id}>
      {" "}
      {/* Set the default tab value */}
      <TabsList>
        {data.map((tab: any) => (
          <TabsTrigger key={tab.id} value={tab.id}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {data.map((tab: any) =>
        tab.fields.map((field: any) => {
          return (
            <TabsContent key={field.id} value={tab.id}>
              <Input id={field.id} name={field.id} placeholder={field.label} />
            </TabsContent>
          );
        })
      )}
    </Tabs>
  );
};
