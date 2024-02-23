import React, {useState, useEffect} from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger, Textarea, Progress, Label } from "../UI";

const tabData = [
  { value: "ResultTab1", label: "Text" },
  { value: "ResultTab2", label: "List" },
  { value: "ResultTab3", label: "Table" },
  { value: "ResultTab4", label: "Outline" },
  { value: "ResultTab5", label: "JSON" },
  { value: "ResultTab6", label: "Code" },
  { value: "ResultTab7", label: "SMS" },
  { value: "ResultTab8", label: "Visuals" },
];

export const MatrixResults = () => {
    const [progress, setProgress] = useState(13)
 
  useEffect(() => {
    const timer = setTimeout(() => setProgress(86), 1000)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="w-full">
       <p id="initialText" className="text-gray-500 mt-10 mb-4">
        Enter Custom Values
        </p> 
      <p className="mb-4" id="recipeDescription">
        You'll see your results here...
      </p>
      <div className="flex flex-wrap w-full" id="allResultsRow">
        <Tabs defaultValue={tabData[0].value} className="w-full">
          <TabsList aria-label="Your tabs list">
            {tabData.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="your-custom-class"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mt-4 w-6/12">
            <Label>Progress bar</Label>
          <Progress value={progress} className="w-[60%]" />
          </div>
          {tabData.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="your-custom-content-class"
            >
              Content for {tab.label}
            </TabsContent>
          ))}
           
        </Tabs>
         <div className="w-full mt-8">
          <Textarea />
        </div>

      </div>
    </div>
  );
};
