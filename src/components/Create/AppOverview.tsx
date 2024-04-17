import React, { useEffect, useState } from "react";
import { Dropdown, Label, Textarea } from "../UI";
import { ComboBox } from "../UI/combobox";

const apiProviders = [
  { label: "Choose the AI API to use...", value: "0" },
  { label: "OpenAI", value: "openai" },
  { label: "Google", value: "google" },
  { label: "Hugging Face", value: "hugging-face" },
  { label: "AI Matrix", value: "ai-matrix" },
  { label: "BLOOM", value: "bloom" },
  { label: "Claude", value: "claude" },
  { label: "Cohere", value: "cohere" },
  { label: "Falcon", value: "falcon" },
  { label: "LLaMa", value: "llama" },
  { label: "Microsoft", value: "microsoft" },
  { label: "Tesla", value: "tesla" },
  { label: "BERT", value: "bert" },
  { label: "Tensorflow", value: "tensorflow" },
  { label: "PyTorch", value: "pytorch" },
  { label: "Custom AI Integration", value: "custom-ai-integration" },
];

const apiEndpoints = [
  { label: "Choose the AI Endpoint...", value: "0" },
  { label: "OpenAI Chat Completions", value: "openai-chat-completions" },
  { label: "OpenAI Audio Speech", value: "openai-audio-speech" },
  { label: "OpenAI Audio Transcription", value: "openai-audio-transcription" },
  { label: "OpenAI Audio Translation", value: "openai-audio-translation" },
];

const aiModels = [
  { label: "Choose the AI Model...", value: "0" },
  { label: "gpt-3.5-turbo-1106", value: "2" },
  { label: "gpt-4-1106-preview", value: "1" },
  { label: "ft:gpt-3.5-turbo-0613:titanium::8bxZrvqi", value: "3" },
  { label: "Gemini Pro Vision", value: "4" },
  { label: "gemini-pro", value: "5" },
  { label: "Add New AI Model", value: "add_new_model" },
];

const configurations = [
  { label: "Choose Configuration Options...", value: "0", disabled: false },
  {
    label: "Use Default Configurations",
    value: "defaultConfigs",
    disabled: false,
  },
  {
    label: "Enter Individual Values",
    value: "individualConfigs",
    disabled: false,
  },
  // For disabled options, you might want to indicate their disabled status in the objects.
  { label: "Paste or Edit JSON File", value: "jsonConfigs", disabled: true },
  { label: "Upload Json", value: "jsonUpload", disabled: true },
  { label: "Copy From Another App", value: "copyFromRecipe", disabled: true },
];

type Props = {
  handleAppOverViewChange: (item: any) => void;
};

export const AppOverview = ({ handleAppOverViewChange }: Props) => {
  const [apiProviderSelectedValue, setApiProviderSelectedValue] = useState("");
  const [apiEndpointSelectedValue, setApiEndpointSelectedValue] = useState("");
  const [aiModelSelectedValue, setAiModelSelectedValue] = useState("");
  const [configurationSelectedValue, setConfigurationSelectedValue] =
    useState("");
  const [aiDescription, setAiDescription] = useState("");

  useEffect(() => {
    handleAppOverViewChange({
      aiDescription,
      apiProviderSelectedValue,
      apiEndpointSelectedValue,
      aiModelSelectedValue,
      configurationSelectedValue,
    });
  }, [
    aiDescription,
    apiProviderSelectedValue,
    apiEndpointSelectedValue,
    aiModelSelectedValue,
    configurationSelectedValue,
  ]);

  return (
    <div id="recipeOverviewContainer" className="mt-2 mb-4">
      <div className="w-full">
        <div>
          <Textarea
            placeholder="Describe your app..."
            id="recipeDescriptionText"
            name="textareaRecipeDescription"
            value={aiDescription}
            handleChange={(value: string) => {
              setAiDescription(value);
            }}
          />
        </div>
      </div>
      <div>
        <div className="mt-2">
          <ComboBox
            placeHolder="API Provider"
            options={apiProviders || []}
            onClick={(value: string) => setApiProviderSelectedValue(value)}
            value={apiProviderSelectedValue}
          />
        </div>
        <div className="mt-2">
          <ComboBox
            placeHolder="API Endpoint"
            options={apiEndpoints || []}
            onClick={(value: string) => setApiEndpointSelectedValue(value)}
            value={apiEndpointSelectedValue}
          />
        </div>
        <div className="mt-2">
          <ComboBox
            placeHolder="AI Model"
            options={aiModels || []}
            onClick={(value: string) => setAiModelSelectedValue(value)}
            value={aiModelSelectedValue}
          />
        </div>
        <div>
          <ComboBox
              placeHolder="Configuration"
              onClick={(value: string) => setConfigurationSelectedValue(value)}
              options={configurations || []}
              value={configurationSelectedValue}
          />
          {/* <Dropdown
            placeHolder="Configuration"
            value={configurationSelectedValue}
            onClick={setConfigurationSelectedValue}
            options={configurations}
          /> */}
        </div>
      </div>
    </div>
  );
};
