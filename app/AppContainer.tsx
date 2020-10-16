import * as React from "react";
import { useState } from "react";
import { isIOS, PropertyChangeData, SelectedIndexChangedEventData } from "@nativescript/core";
// import { FramedPage } from "./FramedPage";
import { ConsolePage } from "./console/ConsolePage";
import { CanvasPage } from './canvas/CanvasPage';
import { FramedCorePage } from './FramedCorePage';

interface Props {
}

interface State {

}

export function AppContainer({}){
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <tabView
            androidTabsPosition="bottom"
            selectedIndex={selectedIndex}
            onSelectedIndexChange={(args: PropertyChangeData) => {
                const { oldIndex, newIndex } = args as unknown as SelectedIndexChangedEventData;
                setSelectedIndex(newIndex);
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
                <label text="TODO" />
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