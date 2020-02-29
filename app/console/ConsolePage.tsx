import * as React from "react";
import { $Page, $Label, $FlexboxLayout, $ContentView, $ScrollView, $TextView, $StackLayout, $GridLayout, $Button } from "react-nativescript";
import { Page } from "@nativescript/core";
import { ItemSpec } from "tns-core-modules/ui/layouts/grid-layout/grid-layout";
import { Color } from "tns-core-modules/color/color";

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

    private readonly onDesignButtonLoaded = () => {

    };

    private readonly onRunCodeButtonPress = () => {

    };

    private readonly onClearCodeButtonPress = () => {

    };

    private readonly onDesignButtonPress = () => {

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
                        <$TextView
                            height={{ value: 100, unit: "%"}}
                            width={{ value: 100, unit: "%"}}
                            padding={0}
                            margin={0}
                        />
                    </$StackLayout>
                    <$ScrollView
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
                            className="input input-border"
                            backgroundColor="rgb(220,240,240)"
                            padding={0}
                            margin={0}
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
                        <$Button id="designButton" onLoaded={this.onDesignButtonLoaded} text="Design" onTap={this.onDesignButtonPress} className="btn btn-primary btn-active" backgroundColor="rgb(171, 130, 1)" color={new Color("rgb(255, 255, 255)")}/>
                    </$FlexboxLayout>
                </$GridLayout>
            </$Page>
        );
    }
}