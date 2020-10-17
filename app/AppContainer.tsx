import * as React from "react";
import { useState } from "react";
import { isIOS, EventData, TabView } from "@nativescript/core";
import { ConsolePage } from "./console/ConsolePage";
import { CanvasPage } from './canvas/CanvasPage';
import { FramedCorePage } from './FramedCorePage';

export function AppContainer({}){
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <tabView
            androidTabsPosition="bottom"
            selectedIndex={selectedIndex}
            onSelectedIndexChange={(args: EventData) => {
                setSelectedIndex((args.object as TabView).selectedIndex);
            }}
        >
            {/* Icons from: https://icons8.com/ios */}
            <tabViewItem
                nodeRole="items"
                title="Console"
                iconSource={isIOS ? "res://tabIcons/create_new" : "res://create_new"}
            >
                <frame nodeRole="view">
                    <ConsolePage/>
                </frame>
            </tabViewItem>
    
            <tabViewItem
                nodeRole="items"
                title="Canvas"
                iconSource={isIOS ? "res://tabIcons/health_data" : "res://health_data"}
            >
                <frame nodeRole="view">
                    <CanvasPage/>
                </frame>
            </tabViewItem>
            
            {/* <tabViewItem
                nodeRole="items"
                title="Examples"
                iconSource={isIOS ? "res://tabIcons/list" : "res://list"}
            >
                <FramedCorePage
                    route="examples/examples-items-page"
                />
            </tabViewItem>
    
            <tabViewItem
                nodeRole="items"
                title="About"
                iconSource={isIOS ? "res://tabIcons/help" : "res://help"}
            >
                <FramedCorePage
                    route="about/about-page"
                />
            </tabViewItem> */}
        </tabView>
    );
}

export default AppContainer;