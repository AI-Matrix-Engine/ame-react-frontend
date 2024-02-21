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

export const variables = [
  {
    id: 10,
    name: "PRIMARY_KEYWORD_1001",
    source: "user_input",
    label: "Input",
    order: 1,
    elementOptions: {
      variant: ["form-input", "input-bordered"],
    },
    unifiedOptions: {
      label: {
        description: "Element label",
        classes: "label-text",
      },
      placeholder: {
        description: "Placeholder text for input elements",
        classes: "placeholder",
      },
      color: {
        description: "Text and element coloring",
        classes: "text-color bg-color",
      },
      size: {
        description: "Size of the elements",
        classes: "text-size w-auto h-auto",
      },
      icon: {
        description: "Icons used within or alongside elements",
        classes: "icon",
      },
    },
    additionalEventHandlers: {
      events: ["onBlur", "onFocus", "onMouseOver", "onMouseOut"],
    },
    responsiveDesign: {
      size: ["sm", "md", "lg", "xl", "2xl"],
    },
    defaultValue: "",
    source_params: {
      accessbilityAttributes: {},
      classes: "",
      events: {
        onChange: "handle_PRIMARY_KEYWORD_1001_Change",
      },
      id: "PRIMARY_KEYWORD_1001",
      state: {
        disabled: false,
        readOnly: false,
      },
      type: "input",
      validation: {
        maxLength: 100,
        minLength: 2,
        pattern: "",
        required: true,
      },
    },
  },
  {
    id: 16,
    name: "KEYWORD_TYPE_OPTIONS_1001",
    source: "user_input",
    label: "Standard DropDown",
    order: 2,
    elementOptions: {
      variant: ["dropdown", "dropDown_with_other_option", "multiSelect"],
    },
    unifiedOptions: {
      label: {
        description: "Element label",
        classes: "label-text",
      },
    },
    additionalEventHandlers: {
      events: ["onBlur", "onFocus", "onMouseOver", "onMouseOut"],
    },
    responsiveDesign: {
      size: ["sm", "md", "lg", "xl", "2xl"],
    },
    defaultValue: "",
    source_params: {
      classes: "",
      default: "Select Primary Keyword Type (Optional)",
      events: {
        click: {
          description: "Click event for elements",
          eventHandler: "onClick",
        },
        change: {
          description: "Change event for input elements",
          eventHandler: "onChange",
        },
        hover: {
          description: "Hover event for elements",
          eventHandler: "onMouseEnter/onMouseLeave",
        },
        focus: {
          description: "Focus event for input elements",
          eventHandler: "onFocus",
        },
        blur: {
          description: "Blur event for input elements",
          eventHandler: "onBlur",
        },
      },
      id: "KEYWORD_TYPE_OPTIONS_1001",
      options: {
        "aria-describedby": "KEYWORD_TYPE_1002_Desc",
        ariaLabel: "Keyword Type Input",
        options: [
          {
            label: "Service Keyword",
            value: "1",
          },
          {
            label: "Product Keyword",
            value: "2",
          },
          {
            label: "Educational Keyword About a Service",
            value: "3",
          },
          {
            label: "Educcational Keyword About a Product",
            value: "4",
          },
          {
            label: "Businesss Keyword",
            value: "5",
          },
          {
            label: "Non-Business Keyword",
            value: "6",
          },
        ],
        placeholder: "",
      },
      state: {
        disabled: false,
      },
      type: "dropdown",
      validation: {
        pattern: "",
        required: true,
      },
    },
  },
  {
    id: 33,
    name: "IDEAL_CLIENT_1001",
    source: "user_input",
    label: "Text Input",
    order: 3,
    elementOptions: {
      variant: ["form-input", "input-bordered"],
    },
    unifiedOptions: {
      label: {
        description: "Element label",
        classes: "label-text",
      },
      placeholder: {
        description: "Placeholder text for input elements",
        classes: "placeholder",
      },
      color: {
        description: "Text and element coloring",
        classes: "text-color bg-color",
      },
      size: {
        description: "Size of the elements",
        classes: "text-size w-auto h-auto",
      },
      icon: {
        description: "Icons used within or alongside elements",
        classes: "icon",
      },
    },
    additionalEventHandlers: {
      events: ["onBlur", "onFocus", "onMouseOver", "onMouseOut"],
    },
    responsiveDesign: {
      size: ["sm", "md", "lg", "xl", "2xl"],
    },
    defaultValue: "",
    source_params: {
      accessbilityAttributes: {},
      classes: "",
      events: {
        click: {
          description: "Click event for elements",
          eventHandler: "onClick",
        },
        change: {
          description: "Change event for input elements",
          eventHandler: "onChange",
        },
        hover: {
          description: "Hover event for elements",
          eventHandler: "onMouseEnter/onMouseLeave",
        },
        focus: {
          description: "Focus event for input elements",
          eventHandler: "onFocus",
        },
        blur: {
          description: "Blur event for input elements",
          eventHandler: "onBlur",
        },
      },
      id: "IDEAL_CLIENT_1001",
      state: {
        disabled: false,
        readOnly: false,
      },
      type: "input",
      validation: {
        maxLength: 255,
        minLength: 2,
        pattern: "",
        required: true,
      },
    },
  },
  {
    id: 21,
    name: "INDUSTRY_NAME_1002",
    source: "user_input",
    label: "DropDown with Other Option",
    source_params: {
      classes: "",
      default: "Select Your Industry (Optional)",
      events: {
        onChange: "",
      },
      id: "INDUSTRY_NAME_1002",
      options: {
        "aria-describedby": "INDUSTRY_NAME_1002_Desc",
        ariaLabel: "Industry Name Input",
        defaultOption: {
          label: "Select Your Industry (Optional)",
          value: "",
        },
        inputField: {
          value: "",
          id: "otherTextInputId",
          placeholder: "Enter Text",
        },
        options: [
          {
            label: "Medical",
            value: "1",
          },
          {
            label: "Medical Aesthetics",
            value: "2",
          },
          {
            label: "Fashion",
            value: "3",
          },
          {
            label: "Sustainability",
            value: "4",
          },
          {
            label: "Recycling",
            value: "5",
          },
          {
            label: "Data Security",
            value: "6",
          },
          {
            label: "Marketing",
            value: "7",
          },
          {
            label: "Legal",
            value: "8",
          },
          {
            label: "AI & ML",
            value: "9",
          },
          {
            label: "Programming & Software",
            value: "10",
          },
          {
            label: "IT",
            value: "11",
          },
          {
            label: "Other (Enter Below)",
            value: "Other",
          },
        ],
        placeholder: "",
        secondaryLabel: "Other Input Label",
      },
      state: {
        otherInputId: "otherTextInputId",
      },
      type: "dropdown_with_other_option",
      validation: {
        pattern: "",
        required: true,
      },
    },
  },
  {
    id: 22,
    name: "CUSTOM_INSTRUCTIONS_1001",
    label: "Text Area",
    order: 4,
    elementOptions: {
      variant: ["form-input", "input-bordered"],
    },
    unifiedOptions: {
      label: {
        description: "Element label",
        classes: "label-text",
      },
      placeholder: {
        description: "Placeholder text for input elements",
        classes: "placeholder",
      },
      color: {
        description: "Text and element coloring",
        classes: "text-color bg-color",
      },
      size: {
        description: "Size of the elements",
        classes: "text-size  w-auto h-auto",
      },
      icon: {
        description: "Icons used within or alongside elements",
        classes: "icon",
      },
    },
    additionalEventHandlers: {
      events: ["onBlur", "onFocus", "onMouseOver", "onMouseOut"],
    },
    responsiveDesign: {
      size: ["sm", "md", "lg", "xl", "2xl"],
    },
    defaultValue: "",
    source: "user_input",
    source_params: {
      accessbilityAttributes: {},
      classes: "",
      events: {
        click: {
          description: "Click event for elements",
          eventHandler: "onClick",
        },
        change: {
          description: "Change event for input elements",
          eventHandler: "onChange",
        },
        hover: {
          description: "Hover event for elements",
          eventHandler: "onMouseEnter/onMouseLeave",
        },
        focus: {
          description: "Focus event for input elements",
          eventHandler: "onFocus",
        },
        blur: {
          description: "Blur event for input elements",
          eventHandler: "onBlur",
        },
      },
      id: "CUSTOM_INSTRUCTIONS_1001",
      state: {
        disabled: false,
        readOnly: false,
      },
      type: "textarea",
      validation: {
        maxLength: 200,
        minLength: 2,
        pattern: "",
        required: true,
      },
    },
  },
  // for radio button
  {
    id: 24,
    name: "CUSTOM_RADIO_1001",
    label: "Radio",
    source: "user_input",
    order: 5,
    value: "",
    elementOptions: {
      variant: [""],
    },
    unifiedOptions: {
      label: {
        description: "Element label",
        classes: "label-text",
      },
      placeholder: {
        description: "Placeholder text for input elements",
        classes: "placeholder",
      },
      color: {
        description: "Text and element coloring",
        classes: "text-color bg-color",
      },
      size: {
        description: "Size of the elements",
        classes: "text-size w-auto h-auto",
      },
      icon: {
        description: "Icons used within or alongside elements",
        classes: "icon",
      },
    },
    additionalEventHandlers: {
      events: ["onBlur", "onFocus", "onMouseOver", "onMouseOut"],
    },
    responsiveDesign: {
      size: ["sm", "md", "lg", "xl", "2xl"],
    },
    defaultValue: "",
    source_params: {
      accessbilityAttributes: {},
      classes: 'flex-col',
      events: {
        change: {
          description: "Change event for input elements",
          eventHandler: "onChange",
        },
        hover: {
          description: "Hover event for elements",
          eventHandler: "onMouseEnter/onMouseLeave",
        },
        focus: {
          description: "Focus event for input elements",
          eventHandler: "onFocus",
        },
        blur: {
          description: "Blur event for input elements",
          eventHandler: "onBlur",
        },
      },
      id: "CUSTOM_RADIO_1001",
      options: {
        "aria-describedby": "CUSTOM_RADIO_1001_Desc",
        ariaLabel: "Custom Instructions Input",
        label:
          "It's best to leave this blank, but you can choose to include custom instructions.",
        placeholder: "",
        value: "",
        options: [
          {
            label: "Option 1",
            value: "option_1",
            id: "option1",
          },
          {
            label: "Option 2",
            value: "option_2",
            id: "option2",
          },
        ],
      },
      state: {
        disabled: false,
        readOnly: false,
      },
      type: "radio",
      validation: {
        maxLength: 200,
        pattern: "",
        required: true,
      },
    },
  },
  // // for checkbox
  {
    id: 23,
    name: "CUSTOM_CHECKBOX_1001",
    label: "Checkbox",
    source: "user_input",
    order: 6,
    elementOptions: {
      variant: [""],
    },
    unifiedOptions: {
      label: {
        description: "Element label",
        classes: "label-text",
      },
      placeholder: {
        description: "Placeholder text for input elements",
        classes: "placeholder",
      },
      color: {
        description: "Text and element coloring",
        classes: "text-color bg-color",
      },
      size: {
        description: "Size of the elements",
        classes: "text-size w-auto h-auto",
      },
      icon: {
        description: "Icons used within or alongside elements",
        classes: "icon",
      },
    },
    additionalEventHandlers: {
      events: ["onBlur", "onFocus", "onMouseOver", "onMouseOut"],
    },
    responsiveDesign: {
      size: ["sm", "md", "lg", "xl", "2xl"],
    },
    defaultValue: "",
    source_params: {
      attributes: {},
      classes: 'flex-col',
      events: {
        change: {
          description: "Change event for input elements",
          eventHandler: "onChange",
        },
        hover: {
          description: "Hover event for elements",
          eventHandler: "onMouseEnter/onMouseLeave",
        },
        focus: {
          description: "Focus event for input elements",
          eventHandler: "onFocus",
        },
        blur: {
          description: "Blur event for input elements",
          eventHandler: "onBlur",
        },
      },
      id: "CUSTOM_CHECKBOX_1001",
      options: [
        {
          label: "CheckBox 1",
          value: "option_1",
          id: "option1",
        },
        {
          label: "CheckBox 2",
          value: "option_2",
          id: "option2",
        },
      ],
      state: {
        disabled: false,
        readOnly: false,
      },
      type: "checkbox",
      validation: {
        maxLength: 200,
        pattern: "",
        required: true,
      },
    },
  },
  // for switch
  {
    id: 25,
    name: "CUSTOM_SWITCH_1001",
    label: "Switch",
    source: "user_input",
    order: 7,
    elementOptions: {
      variant: [""],
    },
    unifiedOptions: {
      label: {
        description: "Element label",
        classes: "label-text",
      },
      placeholder: {
        description: "Placeholder text for input elements",
        classes: "placeholder",
      },
      color: {
        description: "Text and element coloring",
        classes: "text-color bg-color",
      },
      size: {
        description: "Size of the elements",
        classes: "text-size w-auto h-auto",
      },
      icon: {
        description: "Icons used within or alongside elements",
        classes: "icon",
      },
    },
    additionalEventHandlers: {
      events: ["onBlur", "onFocus", "onMouseOver", "onMouseOut"],
    },
    responsiveDesign: {
      size: ["sm", "md", "lg", "xl", "2xl"],
    },
    defaultValue: "",
    source_params: {
      attributes: {},
      classes: "",
      events: {
        change: {
          description: "Change event for input elements",
          eventHandler: "onChange",
        },
        hover: {
          description: "Hover event for elements",
          eventHandler: "onMouseEnter/onMouseLeave",
        },
        focus: {
          description: "Focus event for input elements",
          eventHandler: "onFocus",
        },
        blur: {
          description: "Blur event for input elements",
          eventHandler: "onBlur",
        },
      },
      id: "CUSTOM_SWITCH_1001",
      options: {
        "aria-describedby": "CUSTOM_SWITCH_1001_Desc",
        ariaLabel: "Custom Instructions Input",
        label:
          "It's best to leave this blank, but you can choose to include custom instructions.",
        placeholder: "",
        value: "",
      },
      state: {
        disabled: false,
        readOnly: false,
      },
      type: "switch",
      validation: {
        maxLength: 200,
        pattern: "",
        required: true,
      },
    },
  },
  {
    id: 25,
    name: "CUSTOM_DIALOG_1001",
    label: "Dialog",
    source: "user_input",
    order: 8,
    source_params: {
      attributes: {},
      classes: "",
      events: {
        onBlur: "handleTextareaBlur",
        onChange: "handle_CUSTOM_INSTRUCTIONS_1001_Change",
      },
      id: "CUSTOM_DIALOG_1001",
      options: {
        "aria-describedby": "CUSTOM_DIALOG_1001_Desc",
        ariaLabel: "Custom Instructions Input",
        label:
          "It's best to leave this blank, but you can choose to include custom instructions.",
        placeholder: "",
        value: "",
      },
      state: {
        disabled: false,
        readOnly: false,
      },
      type: "dialog",
      validation: {
        maxLength: 200,
        pattern: "",
        required: true,
      },
    },
  },

  // for table data
  {
    id: 25,
    name: "CUSTOM_TABLE_1001",
    label: "Table",
    source: "user_input",
    order: 9,
    source_params: {
      attributes: {},
      data: {
        tableData: [
          { id: 1, name: "John", email: "john@exmple.com", group: "Developer" },
          { id: 2, name: "Jane", email: "jane@exmple.com", group: "Admin" },
          { id: 3, name: "Doe", email: "doe@exmple.com", group: "Hr" },
        ],
        tableColumns: [
          { header: "Name", key: "name" },
          { header: "Email", key: "email" },
          { header: "Group", key: "group" },
        ],
      },
      classes: "",
      events: {
        onBlur: "handleTextareaBlur",
        onChange: "handle_CUSTOM_INSTRUCTIONS_1001_Change",
      },
      id: "CUSTOM_TABLE_1001",
      options: {
        "aria-describedby": "CUSTOM_TABLE_1001_Desc",
        ariaLabel: "Custom Instructions Input",
        label:
          "It's best to leave this blank, but you can choose to include custom instructions.",
        placeholder: "",
        value: "",
      },
      state: {
        disabled: false,
        readOnly: false,
      },
      type: "table",
      validation: {
        maxLength: 200,
        pattern: "",
        required: true,
      },
    },
  },
  // for tab data
  {
    id: 25,
    name: "CUSTOM_TAB_1001",
    label: "Tab",
    source: "user_input",
    source_params: {
      data: [
        {
          id: 1,
          label: "Tab 1",
          fields: [
            {
              id: "field1",
              label: "Field 1",
              type: "text",
              value: "",
            },
          ],
        },
        {
          id: 2,
          label: "Tab 2",
          fields: [
            {
              id: "field2",
              label: "Field 2",
              type: "checkbox",
              checked: false,
            },
          ],
        },
      ],
      attributes: {},
      classes: "",
      events: {
        onBlur: "handleTextareaBlur",
        onChange: "handle_CUSTOM_INSTRUCTIONS_1001_Change",
      },
      id: "CUSTOM_TAB_1001",
      options: {
        "aria-describedby": "CUSTOM_TAB_1001_Desc",
        ariaLabel: "Custom Instructions Input",
        label:
          "It's best to leave this blank, but you can choose to include custom instructions.",
        placeholder: "",
        value: "",
      },
      state: {
        disabled: false,
        readOnly: false,
      },
      type: "tab",
      validation: {
        maxLength: 200,
        pattern: "",
        required: true,
      },
    },
  },
];
