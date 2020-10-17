import * as React from "react";
import { useEffect, useRef } from "react";
import { EventData, Frame, ItemEventData, Page, View } from "@nativescript/core";
import { ListView, NSVElement, NativeScriptProps, FrameAttributes, createPortal, NSVRoot } from "react-nativescript";
import { Item, exampleItems } from "./items";
import { SyntaxHighlighterTextView } from "nativescript-syntax-highlighter/react/SyntaxHighlighterTextView.ios";

const cellFactory = (item: Item) => {
    return (
        <stackLayout orientation="horizontal" className="list-group-item">
            <label text={item.name} fontSize="20" padding="7" textWrap="true"></label>
        </stackLayout>
    );
};

interface Props extends NativeScriptProps<FrameAttributes, Frame> {
    _nodeRole: string,
}

/**
 * Don't actually navigate using this hacky imperative method (RNS -> NativeScript Core). Use RNS Navigation's TabNavigator instead.
 * I'm only doing it like this for now because the Tabs component is crashing (in the NativeScript Core domain) for some reason.
 */
export function ExamplesItemsFrame(props: Props){
    const { _nodeRole, ...frameProps } = props;

    const frameRef = useRef<NSVElement<Frame>>(null);
    const mainPageRef = useRef<NSVElement<Page>>(null);

    function onItemTap(args: ItemEventData){
        const tappedItem = args.view.bindingContext; // Same as exampleItems[args.index]

        mainPageRef.current?.nativeView.frame.navigate({
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
        <frame ref={frameRef} {...frameProps} nodeRole={_nodeRole}>
            <page ref={mainPageRef} className="page" >
                <actionBar className="action-bar" backgroundColor="gray">
                    <label className="action-bar-title" text="Home" color="white"/>
                </actionBar>

                <ListView items={exampleItems} cellFactory={cellFactory} onItemTap={onItemTap} className="list-group"/>
            </page>
        </frame>
    );
}

interface ExamplesItemDetailPageProps {
    name: string,
    description: string,
}

/**
 * Here's what ExamplesItemDetailPage would look like. I'd introduce it (via RNS Navigation) if only Tabs weren't crashing for unknown reasons.
 */
const ExamplesItemDetailPage = React.forwardRef<NSVElement<Page>, ExamplesItemDetailPageProps>((props, ref) => {
    function onBackButtonTap(args: EventData): void {
        (ref as React.MutableRefObject<NSVElement<Page>>).current?.nativeView.frame.goBack();
    }
    
    return (
        <page ref={ref} className="page">
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
    );
});