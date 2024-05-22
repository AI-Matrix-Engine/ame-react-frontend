import React, { ReactNode } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { DayPicker } from "react-day-picker";
import { FieldPath, FieldValues } from "react-hook-form";

// src/components/LeftNavbar.tsx
export type navItem = {
  name: string;
  path: string;
};

export type styleType = {
  width: string;
};

export type iLeftSideBarType = {
  id: any;
  navItems: navItem[];
  expandedStyles: styleType;
  collapsedStyles: styleType;
  toggle: boolean;
  title: string;
  hover: any;
};

export type iLeftNavbarProps = {
  details: iLeftSideBarType;
  onHandle: (id: string) => void;
  onExpand: (id: number) => void;
  opacity: boolean;
};

interface MenuItem {
  itemCategory: string;
  icon: ReactNode;
  route?: string;
  itemSubMenu?: MenuItemSubMenu[];
}

interface MenuItemSubMenu {
  name: string;
  icon: ReactNode;
  route: string;
}

export type MenuCategory = {
  category: string;
  items: MenuItem[];
};

export type iSecondNavbarProps = {
  navItems: MenuCategory[];
};

// src/components/Create/AIConversationSettings.tsx
export type JsonDataType = {
  id: number;
  name: string;
  source: "user_input";
  label: string;
  value: string;
  UUID: string;
  source_params: {
    classes: string;
    events: Event;
    id: string;
    inputField?: {
      value: string;
      id: string;
      placeholder: string;
    };
    options: {
      "aria-describedby": string;
      ariaLabel: string;
      label: string;
      placeholder: string;
      value: string;
      options?: Array<{ label: string; value: string }>;
    };
    state: {
      disabled: boolean;
      readOnly?: boolean;
    };
    type:
    | "input"
    | "dropdown"
    | "dropdown_with_other_option"
    | "textarea"
    | "radio"
    | "checkbox"
    | "switch"
    | "dialog"
    | "table"
    | "tab"
    | "calendar";
    validation: {
      maxLength: number;
      minLength: number;
      pattern: string;
      required?: boolean;
    };
  };
};

export type UserAssistantFields = {
  user: JsonDataType;
  assistant: JsonDataType;
  UUID: string;
};

// src/components/Create/AddCategory.tsx
export type iAddCategoryProps = {
  title: string;
  inputLabel: string;
  handleNewCategory: (category: { label: string; description: string }) => void;
  onCancel: () => void;
};

// src/components/Create/AppOverView.tsx
export type iAppOverviewProps = {
  handleAppOverViewChange: (item: any) => void;
};

// src/components/Create/Columns.tsx
export type iPayment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};
export type iColumn = {
  accessorKey: string;
  header: string;
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

// src/components/Create/Create.tsx
export interface iSelectType {
  label: string;
  value: string;
  subCategories?: iSelectType[]; // Optional to handle cases where there might be no subcategories
}

export type iCategoriesType = {
  label: string;
  value: string;
  subCategories: iSelectType[];
};

// src/components/Home/Header.tsx
export type iHeader = {
  darkMode: Boolean;
  setMode: Function;
};

// src/cpomponents/Home/intakeForm-DESKTOP-9HE9A6L.tsx
export type iIntakeFormDesktopProps = {
  customFields: JsonDataType[];
  onDelete: (id: string) => void;
  handleChange: (element: JsonDataType) => void;
  className?: string;
  isShowSubmit?: boolean;
};

// src/components/Home/Intakeform.tsx
export type iIntakeProps = {
  customFields: JsonDataType[];
  onDelete: (id: string) => void;
  handleChange: (element: JsonDataType) => void;
  className?: string;
  isShowSubmit?: boolean;
};

// src/components/Home/Navigationbar.tsx
export type iNavigationBar = {
  navItems: MenuCategory[];
  textColor?: string;
  hoverColor?: string;
  text?: null | string;
  className?: string;
  opacity?: null | string;
};

// src/components/Home/PrimarySidebarCollapsedContent.tsx
export type iPrimarySidebarCollapsedContentProps = {
  id: number;
  onExpand: (id: number) => void;
};

// src/components/Home/RightPane.tsx
export type iRightPaneProps = {
  handleUiElements: (item: JsonDataType) => void;
};

// src/components/Home/SecondSidebarToggleButton.tsx
export type iSecondSidebarToggleButtonProps = {
  handleMouseEvent: (toggle: boolean) => void;
  onHandle: (value: number) => void;
  sideBarId: number;
  setOpacity: (value: boolean) => void;
  opacity: boolean;
};

// src/components/Home/SidebarExpandedView.tsx
export type iSidebarExpandedViewProp = {
  id: number;
  title: string;
  toggle: boolean;
  onExpand: (id: number) => void;
  opacity: boolean;
};

// src/components/Home/UIFactory.tsx
export type UIFactoryState = JsonDataType & { value: string };

// src/components/_shared/accordion.tsx
export type iAccordionTriggerProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Trigger
> & {
  iconStyle?: null | string | boolean; // Define the type for iconStyle prop
};

// src/components/_shared/calendar.tsx
export type iCalendarProps = React.ComponentProps<typeof DayPicker>;

// src/components/_shared/Combobox.tsx
export type iComboboxTypes = {
  options: { label: string; value: string }[];
  onClick: (value: string) => void;
  value: string;
  placeHolder: string;
};

// src/components/_shared/Dropddown.tsx
export type iDropDownProps = {
  onClick?: (value: string) => void;
  options: iSelectType[];
  placeHolder?: string;
  value?: any | null;
  defaultValue?: any;
  className?: string;
  disabled?: boolean;
  label?: string;
  isLabel?: boolean;
};

// src/components/_shared/input.tsx
export interface iInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  element?: string | JsonDataType;
  onChange?: any;
}

// src/components/_shared/form.tsx
export type iFormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

export type iFormItemContextValue = {
  id: string;
};

// src/components/_shared/Main.tsx
export type iLeftSidebarExpand = {
  command: boolean;
  app: boolean;
};

export type childrenProp = {
  navItems: MenuCategory[];
  children: ReactNode;
};

// Api Service Types

export enum eApiPurpose {
  BROAD_AI_TASKS = "broad_ai_tasks",
  SPECIFIC_AI_TASK = "specific_ai_task",
  AI_MANAGEMENT_TASKS = "ai_management_tasks",
  PRE_AI_REQUEST_TASKS = "pre_ai_request_tasks",
  POST_AI_REQUEST_TASKS = "post_ai_request_tasks",
  NON_AI_RELATED_TASKS = "non_ai_related_tasks",
  RESPONSE_PROCESSING = "response_processing",
  DATA_PROCESSING = "data_processing",
  OTHER_TASK = "other_task",
}

export enum eApiProvider {
  OPENAI = "openai",
  GOOGLE = "google",
  CODEBERT = "codebert",
}

export interface iApiType {
  value: string,
  name: string,
  provider: eApiProvider,
  purpose: eApiPurpose,
  version: string,
  is_active: boolean,
  link_to_documentation: string,
  chat_completion_requests: number[],
  image_task_Requests: number[],
  audio_speech_requests: number[],
  audio_transcription_requests: number[],
  audio_translation_requests: number[],
  endpoints: number[],
  response: number[],
  api_costs: number[],
  errors: number[]
}

// apiCallHistory Service Type

export interface iApiCallHistoryType {
  id: number,
  full_request: object,
  full_response: object,
  additional_details: object,
  created_at: string,
  response_quality: number,
  response_quality_feedback: string,
  use_for_training: boolean,
  api: number | null,
  ai_model: number | null,
  recipe_category: number | null,
  prompt_recipe: number | null
}

export interface iApiCallHistoryInputType {
  full_request: object,
  full_response: object,
  additional_details: object,
  response_quality: number,
  response_quality_feedback: string,
  use_for_training: boolean,
  api: number | null,
  ai_model: number | null,
  recipe_category: number | null,
  prompt_recipe: number | null
}

//chatbot interfaces

export enum eRoleType {
  USER = 'user',
  ASSISTANT = 'assistant'
}

export interface iMessage {
  role: eRoleType,
  content: string
}

export interface iChat {
  title: string,
  msgArr: iMessage[]
}

export interface respondQuestions {
  type?: "multiple_choice" | "checkboxes" | "yes_no" | "text_area" | "range_selector" | "input" | string;
  question: string;
  options?: string[];
  range?: {
    min: number;
    max: number;
    value: number;
    step?: number;
  };
  allow_custom_input?: boolean;
}

export interface respondForm {
  questions: respondQuestions[];
}

export interface UpdatedRespondForm extends respondForm {
  questions: UpdatedRespondQuestion[];
}

export interface UpdatedRespondQuestion extends respondQuestions {
  answer: string;
}

export enum iModalType {
  CLEAR = "Are you sure you want to delete content of this version?",
  SAVE = "Are you overwriting the previous version?"
}
