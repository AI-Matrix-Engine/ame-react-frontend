export const parseJson = (incomingString: string) => {
    const jsonStartIndex = incomingString.indexOf("{");
    const jsonEndIndex = incomingString.lastIndexOf("}");
    // const jsonRegex = /({[\s\S]*})/;
    // const match = incomingString.match(jsonRegex);
    if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
        const textBeforeJson = incomingString.substring(0, jsonStartIndex);
        const jsonString = incomingString.substring(jsonStartIndex, jsonEndIndex + 1);
        const textAfterJson = incomingString.substring(jsonEndIndex + 1);

        try {
            const parsedJson = JSON.parse(jsonString);
            return {
                textBeforeJson,
                parsedJson,
                textAfterJson,
            };
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return null;
        }
    }

}