import * as React from "react";
import { useEffect, useRef } from "react";
import { EventData, Frame, ItemEventData, Page, View } from "@nativescript/core";
import { ListView, NSVElement, NativeScriptProps, FrameAttributes } from "react-nativescript";
import { Item, exampleItems } from "./items";
import { SyntaxHighlighterTextView } from "nativescript-syntax-highlighter/react/SyntaxHighlighterTextView.ios";

const cellFactory = (item: Item) => {
    return (
        <stackLayout orientation="horizontal" className="list-group-item">
            <label text="{{ name }}" fontSize="20" padding="7" textWrap="true"></label>
        </stackLayout>
    );
};


export function ExamplesItemsFrame(){
    const pageRef = useRef<NSVElement<Page>>(null);

    function onItemTap(args: ItemEventData){
        const tappedItem = args.view.bindingContext;

        pageRef.current?.nativeView.frame.navigate({
            moduleName: "examples/examples-item-detail/examples-item-detail-page",
            context: tappedItem,
            animated: true,
            transition: {
                name: "slide",
                duration: 200,
                curve: "ease"
            }
        });
    }

    return (
        <frame>
            <page ref={pageRef} className="page" >
                <actionBar className="action-bar" backgroundColor="gray">
                    <label className="action-bar-title" text="Home" color="white"/>
                </actionBar>

                <ListView items={exampleItems} cellFactory={cellFactory} onItemTap={onItemTap} className="list-group"/>
            </page>
            {/* <ExamplesItemDetailPage /> */}
        </frame>
    );
}

interface ExamplesItemDetailPageProps {
    name: string,
    description: string,
}

export function ExamplesItemDetailPage(props: ExamplesItemDetailPageProps){
    const pageRef = useRef<NSVElement<Page>>(null);

    function onBackButtonTap(args: EventData): void {
        pageRef.current?.nativeView.frame.goBack();
    }

    <page className="page" >
        <actionBar className="action-bar" backgroundColor="gray">
            <navigationButton onTap={onBackButtonTap} android={{ systemIcon: "ic_menu_back", position: "actionBar" as const }}/>
            <label className="action-bar-title" color="white" text={props.name}></label>
        </actionBar>

        <SyntaxHighlighterTextView
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
            text={props.description}
            style={{
                fontSize: 22,
            }}
            padding={8}
            margin={0}
        />
    </page>
}