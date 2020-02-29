import * as React from "react";
import { $Page, $Label, $FlexboxLayout, $ContentView, $ScrollView, $TextView, $StackLayout, $GridLayout } from "react-nativescript";
import { Page } from "@nativescript/core";
import { ItemSpec } from "tns-core-modules/ui/layouts/grid-layout/grid-layout";

interface Props {
    forwardedRef: React.RefObject<Page>,
}

interface State {
    ownPropsText: string,
    inheritedPropsText: string,
    outputText: string,
}

export class ConsolePage extends React.Component<Props, State> {
    constructor(props: Props){
        super(props);

        this.state = {
            ownPropsText: "",
            inheritedPropsText: "",
            outputText: "",
        };
    }

    private readonly onSyntaxViewLoaded = () => {

    };

    private readonly onOwnPropsLoaded = () => {

    };

    private readonly onInheritedPropsLoaded = () => {

    };

    private readonly onOutputLoaded = () => {

    };

    private readonly onDesignLoaded = () => {

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
                        backgroundColor="orange"
                        flexGrow={0}
                    >
                        <$TextView
                            height={{ value: 100, unit: "%"}}
                            width={{ value: 100, unit: "%"}}
                            padding={0}
                            margin={0}
                            backgroundColor="blue"
                        />
                    </$StackLayout>
                    <$ScrollView
                        row={1}
                        col={0}
                        backgroundColor="purple"
                    >
                        <$TextView
                            id="ownProps"
                            height={{ value: 100, unit: "%"}}
                            width={{ value: 100, unit: "%"}}
                            editable={false}
                            onLoaded={this.onOwnPropsLoaded}
                            hint="(Own properties)"
                            text={ownPropsText}
                            className="input input-border"
                            backgroundColor="rgb(220,240,240)"
                            
                        />
                    </$ScrollView>
                    <$ScrollView
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
                            className="input input-border"
                            backgroundColor="rgb(220,220,240)"
                            
                        />
                    </$ScrollView>
                    <$ScrollView
                        row={3}
                        col={0}
                    >
                        <$TextView
                            id="output"
                            height={{ value: 100, unit: "%"}}
                            width={{ value: 100, unit: "%"}}
                            editable={false}
                            onLoaded={this.onOutputLoaded}
                            hint="(Console output)"
                            text={outputText}
                            className="input input-border"
                            backgroundColor="rgb(240,240,240)"
                        />
                    </$ScrollView>
                    <$ContentView
                        id="design"
                        row={3}
                        col={0}
                        onLoaded={this.onDesignLoaded}
                        backgroundColor="rgb(240,240,200)"
                    >
                    </$ContentView>
                </$GridLayout>
            </$Page>
        );
    }
}