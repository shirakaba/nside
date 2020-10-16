import * as React from "react";
import { isIOS } from "@nativescript/core";
// import { FramedPage } from "./FramedPage";
import { ConsolePage } from "./console/ConsolePage";
import { CanvasPage } from './canvas/CanvasPage';
import { FramedCorePage } from './FramedCorePage';

interface Props {
}

interface State {

}

export function AppContainer({}){
    return (
        <tabView androidTabsPosition="bottom">
            {/* Icons from: https://icons8.com/ios */}
            <tabViewItem
                title="Console"
                iconSource={isIOS ? "res://tabIcons/create_new" : "res://create_new"}
            >
                <frame>
                    <page>
                        <ConsolePage/>
                    </page>
                </frame>
            </tabViewItem>
    
            <tabViewItem
                title="Canvas"
                iconSource={isIOS ? "res://tabIcons/health_data" : "res://health_data"}
            >
                <frame>
                    <page>
                        <CanvasPage/>
                    </page>
                </frame>
            </tabViewItem>
            
            <tabViewItem
                title="Examples"
                iconSource={isIOS ? "res://tabIcons/list" : "res://list"}
            >
                {/* <FramedCorePage
                    route="examples/examples-items-page"
                /> */}
            </tabViewItem>
    
            <tabViewItem
                title="About"
                iconSource={isIOS ? "res://tabIcons/help" : "res://help"}
            >
                {/* <FramedCorePage
                    route="about/about-page"
                /> */}
            </tabViewItem>
        </tabView>
    );
}

export default AppContainer;