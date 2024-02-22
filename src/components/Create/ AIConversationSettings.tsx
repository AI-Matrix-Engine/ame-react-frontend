import React, { useState } from "react";
import { Button, Textarea } from "../UI";
import { RightPane } from "../Home/RightPane";
import { JsonDataType } from "../Home/JsonData.";
import { generateUUID } from "@/lib/utils";
import { IntakeForm } from "../Home/IntakeForm";
import { MinusCircle } from "lucide-react";

const userAssistantFields = {
  user: {
    value: "",
    source_params: {
      type: "textarea",
      options: {
        placeholder: "User",
      },
    },
  },
  assistant: {
    value: "",
    source_params: {
      type: "textarea",
      options: {
        placeholder: "Assistant",
      },
    },
  },
};

type UserAssistantFields = {
  user: JsonDataType;
  assistant: JsonDataType;
  UUID: string;
};

export const AIConversationSettings = () => {
  const [customFields, setCustomFields] = useState<JsonDataType[]>([]);
  const [userAssistantFields, setUserAssistantFields] = useState<
    UserAssistantFields[]
  >([]);

  const handleUiElements = (element: JsonDataType) => {
    const updatedCustomField = {
      ...element,
      value: "",
      UUID: generateUUID(),
    };

    setCustomFields([...customFields, updatedCustomField]);
  };

  const handleDeleteCustomFields = (id: string) => {
    const updatedCustomFields = customFields.filter((item) => item.UUID !== id);
    setCustomFields(updatedCustomFields);
  };

  const handleCustomFieldsValueChange = (element: JsonDataType) => {
    const updatedCustomFields = customFields.map((item) => {
      if (item.UUID === element.UUID) {
        return element;
      }
      return item;
    });

    setCustomFields(updatedCustomFields);
  };

  const handleUserAssistantFields = () => {
    const updatedCustomField = {
      ...userAssistantFields,
      UUID: generateUUID(),
    };

    setUserAssistantFields([...userAssistantFields, updatedCustomField]);
  };

  const onDeleteUserAssistantField = (id: string) => {
    const updatedData = userAssistantFields.filter((item) => item.UUID !== id);
    setUserAssistantFields(updatedData);
  };

  console.log(userAssistantFields);

  const formCustomFields = customFields.filter(
    (item) =>
      item.source_params.type !== "table" &&
      item.source_params.type !== "dialog" &&
      item.source_params.type !== "tab"
  );

  return (
    <div className="card mb-4 ">
      <div className="card-header p-4">Step 4: AI Conversation Settings</div>
      <div className="card-body p-4">
        <div className="flex flex-wrap" id="messagesRow">
          <div className="flex-grow w-full md:w-3/4 p-2" id="messageContainer">
            <IntakeForm
              onDelete={handleDeleteCustomFields}
              handleChange={handleCustomFieldsValueChange}
              customFields={formCustomFields}
              isShowSubmit = {false}
            />
            {/* <div className="mb-3" id="message1System1TextSection">
              <Textarea
                placeholder="System Instructions"
                id="message1System1Text"
                name="TextareaSystemMessage"
              />
            </div>

            <div className="mb-3" id="message2User1TextSection">
              <Textarea
                placeholder="User Message 1"
                id="message2User1Text"
                name="TextareaUserMessage1"
              />
            </div>

            <div className="mb-3">
              <div
                className="form-check form-switch"
                id="showMessagePairCheckboxsection"
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="showMessagePairCheckbox"
                  data-exclude="true"
                />
                <label className="form-check-label">
                  Include Additional Assistant &amp; User Message Pair
                </label>
              </div>
            </div>

            <div className="mb-3" id="message3Assistant1TextSection">
              <Textarea
                placeholder="Assistant Message 1"
                id="message3Assistant1Text"
                name="TextareaAssistantMessage1"
              />
            </div>
            <div className="mb-3" id="message4User2TextSection">
              <Textarea
                placeholder="User Message 2"
                id="message4User2Text"
                name="TextareaUserMessage2"
              />
              <label className="text-xs"></label>
            </div> */}

            <div>
              {userAssistantFields.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex gap-3 p-3 mb-4 border rounded">
                    <div className="flex flex-col gap-3 mb-3 w-full">
                      <Textarea
                        placeholder={`User ${index + 1}`}
                        // value={item.user.value}
                      />
                      <Textarea
                        placeholder={`Assistant ${index + 1}`}
                        // value={item.assistant.value}
                      />
                    </div>

                    <MinusCircle
                      className="text-gray-400 cursor-pointer mt-auto md:mt-0"
                      onClick={() => onDeleteUserAssistantField(item.UUID)}
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex flex-row justify-between my-3">
              <Button
                type="button"
                className="btn btn-primary w-full md:w-5/12"
                id="addMessagePair"
                data-exclude="true"
                onClick={handleUserAssistantFields}
              >
                Add Message Pair
              </Button>
            </div>

            <div>
              <Button
                type="button"
                className="btn btn-primary btn-loading"
                id="saveMessagesButton"
                data-exclude="true"
                data-coreui-spinner-type="grow"
              >
                Save Entire Message Sequence
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/4 overflow-auto">
            <RightPane handleUiElements={handleUiElements} />
            {/* <button type="button" className="btn btn-primary w-full mt-4" id="addNewVariable" data-exclude="true">Add New Variable</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
