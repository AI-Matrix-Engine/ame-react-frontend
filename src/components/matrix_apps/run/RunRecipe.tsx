import React from 'react'
import { Button, Switch, Label } from '../../_shared'

export const RunRecipe = () => {
    return (
        <div className='mt-10 '>
            <p id="initialText" className="text-gray-500 mb-4">
                Run Your Recipe
            </p>
            <div className="flex flex-wrap items-center gap-2" id="runRecipeSettings">

                <div className="flex-none">
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="RunRecipe">Run Recipe</Button>
                </div>
                <div className="flex-none">
                    <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded" id="resetButton">Reset</Button>
                </div>
                <div className="flex-none">
                    <div className="flex items-center">
                        <Switch />
                        <Label>Display Custom Options</Label>
                    </div>
                </div>
                <div className="flex-none" id="containerAddCustomInstructions" >
                    <div className="flex items-center">
                        <Switch />
                        <Label >Add Custom Instructions</Label>
                    </div>
                </div>
                <div className="flex-none" id="containerQuickAnswer" >
                    <div className="flex items-center">
                        <Switch />
                        <Label>Answer quickly please!</Label>
                    </div>
                </div>
                <div className="flex-none" id="containerMakeSmallTalk" >
                    <div className="flex items-center">
                        <Switch />
                        <Label>Make Small Talk</Label>
                    </div>
                </div>
                <div className="flex-none" id="containerSpeakResponse">
                    <div className="flex items-center">
                        <Switch />
                        <Label>Speak Response</Label>
                    </div>
                </div>
            </div>
        </div>

    )
}
