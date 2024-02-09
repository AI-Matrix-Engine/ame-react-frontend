 export type JsonDataType = {
  id:number;
  name:string;
  source:"user_input" 
  source_params: {
    classes: string[] ;
    cssStyle:React.CSSProperties,
    events:Event,
    id:string,
    options: {
      "aria-describedby" : string,
      ariaLabel:string,
      label:string,
      placeholder:string,
      value:string,
      options?:Array<{label:string,value:string}>
    },
    state:{
      disabled: boolean,
      readOnly?: boolean,
      required?: boolean,
    },
    type: "standard_text_input" |  "standard_dropdown" | "dropdown_with_other_option" | "textarea",
    validation: {
      maxLength: number,
      minLength: number,
      pattern: string
    },
  }
 }
export const variables = [
    {
      id: 10,
      name: "PRIMARY_KEYWORD_1001",
      source: "user_input",
      source_params: {
        attributes: {},
        classes: ["default", "default"],
        cssStyles: {
          color: "default",
          width: "default",
        },
        events: {
          onChange: "handle_PRIMARY_KEYWORD_1001_Change",
        },
        id: "PRIMARY_KEYWORD_1001",
        options: {
          "aria-describedby": "PRIMARY_KEYWORD_1001_Desc",
          ariaLabel: "Primary Keyword Input",
          label: "Primary Keyword",
          placeholder: "Enter Primary Keyword...",
          value: "",
        },
        state: {
          disabled: false,
          readOnly: false,
          required: false,
        },
        type: "standard_text_input",
        validation: {
          maxLength: 100,
          minLength: 0,
          pattern: "",
        },
      },
    },
    {
      id: 16,
      name: "KEYWORD_TYPE_OPTIONS_1001",
      source: "user_input",
      source_params: {
        classes: [],
        cssStyles: {
          width: "defaultWidth",
        },
        default: "Select Primary Keyword Type (Optional)",
        events: {
          onChange: "handle_KEYWORD_TYPE_OPTIONS_1001_Change",
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
            {
              label: "Other (Enter Below)",
              value: "other",
            },
          ],
          placeholder: "Enter Keyword Type...",
        },
        state: {
          disabled: false,
        },
        type: "standard_dropdown",
        validation: {
          pattern: "",
        },
      },
    },
    {
        id: 33,
        name: "IDEAL_CLIENT_1001",
        source: "user_input",
        source_params: {
          attributes: {},
          classes: [],
          cssStyles: {
            color: "default",
            width: "default",
          },
          events: {
            onChange: "",
          },
          id: "IDEAL_CLIENT_1001",
          options: {
            "aria-describedby": "IDEAL_CLIENT_1001_Desc",
            ariaLabel: "Ideal Client Input",
            label: "Ideal Client",
            placeholder:
              "Enter your absolutely ideal client... (Example: 'Enterprise-Level Corporate IT Departments')",
            value: "",
          },
          state: {
            disabled: false,
            readOnly: false,
            required: false,
          },
          type: "standard_text_input",
          validation: {
            maxLength: 255,
            minLength: 0,
            pattern: "",
          },
        },
      },
    {
      id: 21,
      name: "INDUSTRY_NAME_1002",
      source: "user_input",
      source_params: {
        classes: [
          {
            divClass: "",
          },
          {
            selectClass: "form-select mb-3",
          },
          {
            textAreaClass: "form-control mb-3",
          },
        ],
        cssStyles: {
          width: "defaultWidth",
        },
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
          placeholder: "Enter Industry Name...",
          secondaryLabel: "Other Input Label",
        },
        state: {
          otherInputId: "otherTextInputId",
        },
        type: "dropdown_with_other_option",
        validation: {
          pattern: "",
        },
      },
    },
    {
      id: 22,
      name: "CUSTOM_INSTRUCTIONS_1001",
      source: "user_input",
      source_params: {
        attributes: {},
        classes: [],
        cssStyles: {
          height: "defaultHeight",
          width: "defaultWidth",
        },
        events: {
          onBlur: "handleTextareaBlur",
          onChange: "handle_CUSTOM_INSTRUCTIONS_1001_Change",
        },
        id: "CUSTOM_INSTRUCTIONS_1001",
        options: {
          "aria-describedby": "CUSTOM_INSTRUCTIONS_1001_Desc",
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
        type: "textarea",
        validation: {
          maxLength: 200,
          pattern: "",
        },
      },
    },
  ];