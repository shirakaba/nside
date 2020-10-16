import * as React from "react";
import { Color } from "@nativescript/core";
import { EventData, TextView, ContentView } from "@nativescript/core";
import { onSyntaxViewTextChange } from "./onConsoleTextChange";

interface Props {
}

interface State {
    consoleText: string,
    outputColour: string|Color,
    ownPropsText: string,
    inheritedPropsText: string,
    outputText: string,
    suggestedText: string,
    ownProps: string[],
    inheritedProps: string[],
    designing: boolean,
}

export class ConsolePage extends React.Component<Props, State> {
    public readonly evalContext: any = {};
    
    private evalClosure(str: string): any {
        return eval(str);
    }

    private evalInContext(str: string): any {
        return this.evalClosure.call(this.evalContext, str);
    }

    constructor(props: Props){
        super(props);

        this.state = {
            consoleText: "",
            outputColour: "green",
            ownPropsText: "",
            inheritedPropsText: "",
            outputText: "",
            suggestedText: "",
            ownProps: [],
            inheritedProps: [],
            designing: false,
        };
    }

    static customStringify(v: any): string {
        const cache = new Set();
            const stringified: string = JSON.stringify(v, (key, value) => {
                if(typeof value === 'object' && value !== null){
                    if(cache.has(value)) return; // Circular reference found, discard key
                    // Store value in our set
                    cache.add(value);
                }
                return value;
            },
            2
        );
        return stringified === "{}" ? v.toString() : stringified;
    };

    private readonly onSyntaxViewTextChange = (args: EventData) => {
        const { text } = args.object as TextView;
        // console.log(`[onSyntaxViewTextChange] ${text}`);

        const payload = onSyntaxViewTextChange({
            text,
            ownProps: this.state.ownProps,
            inheritedProps: this.state.inheritedProps,
            suggestedText: this.state.suggestedText,
            ownPropsText: this.state.ownPropsText,
            inheritedPropsText: this.state.inheritedPropsText,
            evalInContext: (str: string) => this.evalInContext(str),
        });

        this.setState({
            consoleText: text,
            ownProps: payload.ownProps,
            inheritedProps: payload.inheritedProps,
            suggestedText: payload.suggestedText,
            ownPropsText: payload.ownPropsText,
            inheritedPropsText: payload.inheritedPropsText,
        });
    };

    private readonly onOutputLoaded = (args: EventData) => {
        const textView = args.object as TextView;
        /* Hacky workaround to resolve inexplicable bug of text getting clipped off until relayout. */
        textView.lineHeight += 1;
        setTimeout(() => {
            textView.lineHeight -= 1;
        }, 15);
    };

    private readonly onDesignLoaded = (args: EventData) => {
        const design = args.object as ContentView;
        (design.ios as UIView).clipsToBounds = true;
        (global as any).design = design;
    };

    private readonly onDesignButtonLoaded = () => {

    };

    private readonly onRunCodeButtonPress = () => {
        const text: string = this.state.consoleText;
        console.log(`[onRunCodeButtonPress]`);

        try {
            const value: any = this.evalInContext(
                text
                .replace(new RegExp('\u201c|\u201d', "g"), '"')
                .replace(new RegExp('\u2018|\u2019', "g"), "'")
            );

            let outputValue: string = "";
            if(typeof value === "undefined"){
                outputValue = "undefined";
            } else if(typeof value === "function"){
                outputValue = value.toString();
            } else if(typeof value === "object"){
                // outputValue = value.toString() === "[object Object]" ? JSON.stringify(value, null, 2) : value;
                outputValue = ConsolePage.customStringify(value);
                // outputValue = this.customStringify2(value);
            } else if(value === ""){
                outputValue = '""';
            } else {
                outputValue = value;
            }

            this.setState({
                outputColour: "green",
                outputText: outputValue,
            });
        } catch(e){
            this.setState({
                outputColour: "red",
                outputText: e,
            });
            console.error(e);
        }
    };

    private readonly onClearCodeButtonPress = () => {
        this.setState({
            consoleText: "",
            outputText: "",
        });
    };

    private readonly onDesignButtonPress = () => {
        this.setState((prevState) => ({ designing: !prevState.designing }));
    };

    render(){
        const { ownPropsText, inheritedPropsText, outputText } = this.state;

        return (
            <page
                backgroundSpanUnderStatusBar={true}
                backgroundColor="rgb(25,25,25)"
            >
                <gridLayout
                    columns="*"
                    rows="65*, 5*, 5*, 20*, auto"
                    height="100%"
                    width="100%"
                >
                    {/* <syntaxHighlighterTextView
                        row={0}
                        col={0}
                        iosOverflowSafeArea={false}
                        height="100%"
                        width="100%"
                        autocorrect={false}
                        autocapitalizationType={"none"}
                        backgroundColor={"rgb(25,25,25)"}
                        color={"rgba(255,204,204,0.8)"}
                        returnDismissesKeyboard={false}
                        suggestedTextToFillOnTabPress={this.state.suggestedText}
                        onTextChange={this.onSyntaxViewTextChange}
                        text={this.state.consoleText}
                        style={{
                            fontSize: 22,
                        }}
                        padding={8}
                        margin={0}
                    /> */}
                    <textView
                        id="ownProps"
                        row={1}
                        col={0}
                        height="100%"
                        width="100%"
                        style={{
                            fontFamily: "Courier New",
                            fontSize: 16,
                        }}
                        editable={false}
                        hint="(Own properties)"
                        text={ownPropsText}
                        backgroundColor="rgb(220,240,240)"
                        padding={0}
                        margin={0}
                    />
                    <textView
                        id="inheritedProps"
                        row={2}
                        col={0}
                        height="100%"
                        width="100%"
                        style={{
                            fontFamily: "Courier New",
                            fontSize: 16,
                        }}
                        editable={false}
                        hint="(Inherited properties)"
                        text={inheritedPropsText}
                        backgroundColor="rgb(220,220,240)"
                    />
                    <textView
                        id="output"
                        row={3}
                        col={0}
                        visibility={this.state.designing ? "collapse" : "visible"}
                        height="100%"
                        width="100%"
                        editable={false}
                        onLoaded={this.onOutputLoaded}
                        hint="(Console output)"
                        text={outputText}
                        style={{
                            fontFamily: "Courier New",
                            fontSize: 16,
                            color: this.state.outputColour,
                        }}
                        backgroundColor="rgb(240,240,240)"
                    />
                    <contentView
                        id="design"
                        visibility={this.state.designing ? "visible" : "collapse"}
                        row={3}
                        col={0}
                        onLoaded={this.onDesignLoaded}
                        backgroundColor="rgb(240,240,200)"
                    >
                    </contentView>
                    <flexboxLayout
                        row={4}
                        col={0}
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-around"
                        backgroundColor="rgb(25,25,25)"
                        padding={8}
                    >
                        {/* <Button text="View output" tap="{{ output }}" class="btn btn-primary btn-active"/> */}
                        <button text="Run code" onTap={this.onRunCodeButtonPress} padding={7} backgroundColor="rgb(171, 130, 1)" color="white"/>
                        <button text="Clear" onTap={this.onClearCodeButtonPress} padding={7} backgroundColor="rgb(171, 130, 1)" color="white"/>
                        <button id="designButton" onLoaded={this.onDesignButtonLoaded} text={this.state.designing ? "Debug" : "Design"} onTap={this.onDesignButtonPress} padding={7} backgroundColor="rgb(171, 130, 1)" color="rgb(255, 255, 255)"/>
                    </flexboxLayout>
                </gridLayout>
            </page>
        );
    }
}