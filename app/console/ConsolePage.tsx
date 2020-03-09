import * as React from "react";
import { $Page, $Label, $FlexboxLayout, $ContentView, $ScrollView, $TextView, $StackLayout, $GridLayout, $Button } from "react-nativescript";
import { Page } from "@nativescript/core";
import { ItemSpec } from "tns-core-modules/ui/layouts/grid-layout/grid-layout";
import { Color } from "tns-core-modules/color/color";
import { $SyntaxHighlighterTextView } from "nativescript-syntax-highlighter/react/SyntaxHighlighterTextView.ios";
import { SyntaxHighlighterTextView } from "nativescript-syntax-highlighter/syntax-highlighter-text-view.ios";
import { EventData, TextView, ScrollView, ContentView } from "@nativescript/core";
import { onSyntaxViewTextChange } from "./onConsoleTextChange";

interface Props {
    forwardedRef: React.RefObject<Page>,
}

interface State {
    consoleText: string,
    outputColour: Color,
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

    private readonly consoleRef: React.RefObject<SyntaxHighlighterTextView> = React.createRef();
    private readonly ownPropsRef: React.RefObject<ScrollView> = React.createRef();
    private readonly inheritedPropsRef: React.RefObject<ScrollView> = React.createRef();

    constructor(props: Props){
        super(props);

        this.state = {
            consoleText: "",
            outputColour: new Color("green"),
            ownPropsText: "",
            inheritedPropsText: "",
            outputText: "",
            suggestedText: "",
            ownProps: [],
            inheritedProps: [],
            designing: false,
        };
    }

    static customStringify(v): string {
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

    private readonly onSyntaxViewLoaded = () => {

    };

    private readonly onSyntaxViewTextChange = (args: EventData) => {
        const { text } = args.object as TextView;
        // console.log(`[onSyntaxViewTextChange] ${text}`);

        const ownProps = this.ownPropsRef.current;
        if(ownProps){
            ownProps.scrollToVerticalOffset(0, false);
        }
        const inheritedProps = this.inheritedPropsRef.current;
        if(inheritedProps){
            inheritedProps.scrollToVerticalOffset(0, false);
        }

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

    private readonly onOwnPropsLoaded = () => {

    };

    private readonly onInheritedPropsLoaded = () => {

    };

    private readonly onOutputLoaded = () => {

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
                outputColour: new Color("green"),
                outputText: outputValue,
            });
        } catch(e){
            this.setState({
                outputColour: new Color("red"),
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
        const { forwardedRef } = this.props;
        const { ownPropsText, inheritedPropsText, outputText } = this.state;

        return (
            <$Page
                ref={forwardedRef}
                backgroundSpanUnderStatusBar={true}
                backgroundColor="black"
            >
                <$GridLayout
                    columns={[new ItemSpec(1, "star")]}
                    rows={[
                        new ItemSpec(45, "star"),
                        new ItemSpec(5, "star"),
                        new ItemSpec(5, "star"),
                        new ItemSpec(35, "star"),
                        new ItemSpec(1, "auto"),
                    ]}

                    height={{ value: 100, unit: "%"}}
                    width={{ value: 100, unit: "%"}}
                >
                    <$SyntaxHighlighterTextView
                        ref={this.consoleRef}
                        row={0}
                        col={0}
                        onLoaded={this.onSyntaxViewLoaded}
                        iosOverflowSafeArea={false}
                        height={{ value: 100, unit: "%"}}
                        width={{ value: 100, unit: "%"}}
                        autocorrect={false}
                        autocapitalizationType={"none"}
                        backgroundColor={new Color("rgb(25,25,25)")}
                        color={new Color(0xffcccccc)}
                        returnDismissesKeyboard={false}
                        suggestedTextToFillOnTabPress={this.state.suggestedText}
                        onTextChange={this.onSyntaxViewTextChange}
                        text={this.state.consoleText}
                        padding={0}
                        margin={0}
                    />
                    <$TextView
                        id="ownProps"
                        // ref={this.ownPropsRef}
                        row={1}
                        col={0}
                        height={{ value: 100, unit: "%"}}
                        width={{ value: 100, unit: "%"}}
                        style={{
                            fontFamily: "Courier New",
                            fontSize: 16,
                        }}
                        editable={false}
                        onLoaded={this.onOwnPropsLoaded}
                        hint="(Own properties)"
                        text={ownPropsText}
                        backgroundColor="rgb(220,240,240)"
                        padding={0}
                        margin={0}
                    />
                    <$TextView
                        id="inheritedProps"
                        row={2}
                        col={0}
                        height={{ value: 100, unit: "%"}}
                        width={{ value: 100, unit: "%"}}
                        style={{
                            fontFamily: "Courier New",
                            fontSize: 16,
                        }}
                        editable={false}
                        onLoaded={this.onInheritedPropsLoaded}
                        hint="(Inherited properties)"
                        text={inheritedPropsText}
                        backgroundColor="rgb(220,220,240)"
                        
                    />
                    <$TextView
                        id="output"
                        row={3}
                        col={0}
                        visibility={this.state.designing ? "collapse" : "visible"}
                        height={{ value: 100, unit: "%"}}
                        width={{ value: 100, unit: "%"}}
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
                    <$ContentView
                        id="design"
                        visibility={this.state.designing ? "visible" : "collapse"}
                        row={3}
                        col={0}
                        onLoaded={this.onDesignLoaded}
                        backgroundColor="rgb(240,240,200)"
                    >
                    </$ContentView>
                    <$FlexboxLayout
                        row={4}
                        col={0}
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-around"
                        backgroundColor="rgb(25,25,25)"
                        padding={8}
                    >
                        {/* <Button text="View output" tap="{{ output }}" class="btn btn-primary btn-active"/> */}
                        <$Button text="Run code" onTap={this.onRunCodeButtonPress} padding={7} backgroundColor="rgb(171, 130, 1)" color={new Color("rgb(255, 255, 255)")}/>
                        <$Button text="Clear" onTap={this.onClearCodeButtonPress} padding={7} backgroundColor="rgb(171, 130, 1)" color={new Color("rgb(255, 255, 255)")}/>
                        <$Button id="designButton" onLoaded={this.onDesignButtonLoaded} text={this.state.designing ? "Debug" : "Design"} onTap={this.onDesignButtonPress} padding={7} backgroundColor="rgb(171, 130, 1)" color={new Color("rgb(255, 255, 255)")}/>
                    </$FlexboxLayout>
                </$GridLayout>
            </$Page>
        );
    }
}