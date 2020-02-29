import * as React from "react";
import { $Page, $Label, $FlexboxLayout, $ContentView, $ScrollView, $TextView, $StackLayout, $GridLayout, $Button } from "react-nativescript";
import { Page } from "@nativescript/core";
import { ItemSpec } from "tns-core-modules/ui/layouts/grid-layout/grid-layout";
import { Color } from "tns-core-modules/color/color";
import { SyntaxHighlighterTextView } from "nativescript-syntax-highlighter/react/SyntaxHighlighterTextView.ios";
import { EventData, TextView, ScrollView, ContentView } from "@nativescript/core";
import { onSyntaxViewTextChange } from "./onConsoleTextChange";

interface Props {
    forwardedRef: React.RefObject<Page>,
}

interface State {
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

    private readonly ownPropsRef: React.RefObject<ScrollView> = React.createRef();
    private readonly inheritedPropsRef: React.RefObject<ScrollView> = React.createRef();

    constructor(props: Props){
        super(props);

        this.state = {
            ownPropsText: "",
            inheritedPropsText: "",
            outputText: "",
            suggestedText: "",
            ownProps: [],
            inheritedProps: [],
            designing: false,
        };
    }

    private readonly onSyntaxViewLoaded = () => {

    };

    private readonly onSyntaxViewTextChange = (args: EventData) => {
        const { text } = args.object as TextView;

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
    };

    private readonly onDesignButtonLoaded = () => {

    };

    private readonly onRunCodeButtonPress = () => {

    };

    private readonly onClearCodeButtonPress = () => {

    };

    private readonly onDesignButtonPress = () => {
        this.setState({ designing: false });
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
                        new ItemSpec(10, "star"),
                    ]}

                    height={{ value: 100, unit: "%"}}
                    width={{ value: 100, unit: "%"}}
                >
                    <$StackLayout
                        id="SyntaxView"
                        row={0}
                        col={0}
                        onLoaded={this.onSyntaxViewLoaded}
                        iosOverflowSafeArea={false}
                        flexGrow={0}
                    >
                        {/* <$TextView
                            height={{ value: 100, unit: "%"}}
                            width={{ value: 100, unit: "%"}}
                            autocorrect={false}
                            autocapitalizationType={"none"}
                            backgroundColor={new Color("rgb(25,25,25)")}
                            color={new Color(0xffcccccc)}
                            padding={0}
                            margin={0}
                        /> */}
                        <SyntaxHighlighterTextView
                            height={{ value: 100, unit: "%"}}
                            width={{ value: 100, unit: "%"}}
                            autocorrect={false}
                            autocapitalizationType={"none"}
                            backgroundColor={new Color("rgb(25,25,25)")}
                            color={new Color(0xffcccccc)}
                            returnDismissesKeyboard={false}
                            suggestedTextToFillOnTabPress={this.state.suggestedText}
                            onTextChange={this.onSyntaxViewTextChange}
                            padding={0}
                            margin={0}
                        />
                    </$StackLayout>
                    <$ScrollView
                        ref={this.ownPropsRef}
                        row={1}
                        col={0}
                    >
                        <$TextView
                            id="ownProps"
                            height={{ value: 100, unit: "%"}}
                            width={{ value: 100, unit: "%"}}
                            editable={false}
                            onLoaded={this.onOwnPropsLoaded}
                            hint="(Own properties)"
                            text={ownPropsText}
                            className="input"
                            backgroundColor="rgb(220,240,240)"
                            padding={0}
                            margin={0}
                        />
                    </$ScrollView>
                    <$ScrollView
                        ref={this.inheritedPropsRef}
                        row={2}
                        col={0}
                    >
                        <$TextView
                            id="inheritedProps"
                            height={{ value: 100, unit: "%"}}
                            width={{ value: 100, unit: "%"}}
                            editable={false}
                            onLoaded={this.onInheritedPropsLoaded}
                            hint="(Inherited properties)"
                            text={inheritedPropsText}
                            className="input"
                            backgroundColor="rgb(220,220,240)"
                            
                        />
                    </$ScrollView>
                    <$ScrollView
                        row={3}
                        col={0}
                    >
                        <$TextView
                            id="output"
                            visibility={this.state.designing ? "collapse" : "visible"}
                            height={{ value: 100, unit: "%"}}
                            width={{ value: 100, unit: "%"}}
                            editable={false}
                            onLoaded={this.onOutputLoaded}
                            hint="(Console output)"
                            text={outputText}
                            fontSize={16}
                            style={{
                                fontFamily: "Courier New",
                            }}
                            className="input"
                            backgroundColor="rgb(240,240,240)"
                        />
                    </$ScrollView>
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
                    >
                        {/* <Button text="View output" tap="{{ output }}" class="btn btn-primary btn-active"/> */}
                        <$Button text="Run code" onTap={this.onRunCodeButtonPress} className="btn btn-primary btn-active" backgroundColor="rgb(171, 130, 1)" color={new Color("rgb(255, 255, 255)")}/>
                        <$Button text="Clear" onTap={this.onClearCodeButtonPress} className="btn btn-primary btn-active" backgroundColor="rgb(171, 130, 1)" color={new Color("rgb(255, 255, 255)")}/>
                        <$Button id="designButton" onLoaded={this.onDesignButtonLoaded} text={this.state.designing ? "Debug" : "Design"} onTap={this.onDesignButtonPress} className="btn btn-primary btn-active" backgroundColor="rgb(171, 130, 1)" color={new Color("rgb(255, 255, 255)")}/>
                    </$FlexboxLayout>
                </$GridLayout>
            </$Page>
        );
    }
}