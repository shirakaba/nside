import * as React from "react";
import { useRef, useEffect } from "react";
import { NSVElement } from "react-nativescript";
import { Page } from "@nativescript/core";

export function CanvasPage({}){
    const pageRef = useRef<NSVElement<Page>>(null);
    
    useEffect(() => {
        (global as any).canvasPage = pageRef.current.nativeView;
        (global as any).canvas = pageRef.current.nativeView.content;
        // pageRef.current.nativeView.addCssFile("./canvas/CanvasPage.scss");
    }, []);

    return (
        <page ref={pageRef} className="page">
            <actionBar className="action-bar" backgroundColor="gray">
                <label className="action-bar-title" text="Canvas" color="white" />
            </actionBar>

            <flexboxLayout
                flexDirection="column"
                alignItems="center"
                justifyContent="space-around"
                height="100%"
                width="100%"
                className="page-content"
            >
                {/* Glyph from: FontAwesome5 (free set) */}
                <label className="page-icon fas" text="&#xf009;" />
                <label fontSize={18} color="gray" className="page-placeholder" text="<!-- Canvas page content goes here -->" />
            </flexboxLayout>
        </page>
    );
}
