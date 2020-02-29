import * as React from "react";
import { $Page, $ActionBar, $Label, $GridLayout, $FlexboxLayout } from "react-nativescript";
import { Page } from "@nativescript/core";
import { ItemSpec } from "tns-core-modules/ui/layouts/grid-layout/grid-layout";
import { Color } from "tns-core-modules/color/color";
import { EventData, TextView, ScrollView, ContentView } from "@nativescript/core";

interface Props {
    forwardedRef: React.RefObject<Page>,
}

interface State {
}

export class CanvasPage extends React.Component<Props, State> {
    componentDidMount(){
        const page: Page = this.props.forwardedRef.current;
        if(!page){
            return;
        }
        page.addCssFile("./canvas/CanvasPage.scss"); // Path is relative to the 'app' folder; not relative to this file!
    }

    render(){
        const { forwardedRef } = this.props;

        return (
            <$Page
                ref={forwardedRef}
                className="page"
            >
                <$ActionBar className="action-bar" backgroundColor="black">
                    <$Label className="action-bar-title" text="Canvas" color={new Color("white")}/>
                </$ActionBar>

                <$FlexboxLayout
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="space-around"
                    // height={"100%" as any}
                    // width={"100%" as any}
                    height={{ value: 100, unit: "%" }}
                    width={{ value: 100, unit: "%" }}
                    // flexGrow={1}
                    className="page-content"
                >
                    {/* Glyph from: FontAwesome (free set) */}
                    <$Label row={0} col={0} className="page-icon fas" text="&#xf009;"/>
                    <$Label row={1} col={0} fontSize={18} color={new Color("gray")} className="page-placeholder" text="<!-- Canvas page content goes here -->"/>
                </$FlexboxLayout>
            </$Page>
        );
    }
}