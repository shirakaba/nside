import * as React from "react";
import { $Frame, $TabView, $TabViewItem } from "react-nativescript";
import { TabView } from "tns-core-modules/ui/tab-view/tab-view";
import { isIOS } from "tns-core-modules/ui/page/page";

interface Props {
    forwardedRef: React.RefObject<TabView>
}

interface State {

}

export class AppContainer extends React.Component<Props, State> {
    render(){
        const { forwardedRef } = this.props;

        return (
            <$TabView ref={forwardedRef} androidTabsPosition="bottom">
                {/* Icons from: https://icons8.com/ios */}
                <$TabViewItem
                    title="Console"
                    iconSource={isIOS ? "res://tabIcons/create_new" : "res://create_new"}
                >
                    <$Frame
                        // defaultPage="console/console-page"
                    ></$Frame>
                </$TabViewItem>

                <$TabViewItem
                    title="Canvas"
                    iconSource={isIOS ? "res://tabIcons/health_data" : "res://health_data"}
                >
                    <$Frame
                        // defaultPage="canvas/canvas-page"
                    ></$Frame>
                </$TabViewItem>
                
                <$TabViewItem
                    title="Examples"
                    iconSource={isIOS ? "res://tabIcons/list" : "res://list"}
                >
                    <$Frame
                        // defaultPage="examples/examples-items-page"
                    ></$Frame>
                </$TabViewItem>

                <$TabViewItem
                    title="About"
                    iconSource={isIOS ? "res://tabIcons/help" : "res://help"}
                >
                    <$Frame
                        // defaultPage="about/about-page"
                    ></$Frame>
                </$TabViewItem>
            </$TabView>
        );
    }
}