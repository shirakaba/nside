import { hot } from 'react-hot-loader/root';
import * as React from "react";
import { $Frame, $TabView, $TabViewItem, $Page } from "react-nativescript";
import { isIOS, TabView } from "@nativescript/core";
import { FramedPage } from "./FramedPage";
import { ConsolePage } from "./console/ConsolePage";
import { CanvasPage } from './canvas/CanvasPage';

interface Props {
    forwardedRef: React.RefObject<TabView>,
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
                    <FramedPage
                        pageFactory={({ ref }) => <ConsolePage forwardedRef={ref}/>}
                        // defaultPage="console/console-page"
                    />
                </$TabViewItem>

                <$TabViewItem
                    title="Canvas"
                    iconSource={isIOS ? "res://tabIcons/health_data" : "res://health_data"}
                >
                    <FramedPage
                        pageFactory={({ ref }) => <CanvasPage forwardedRef={ref}/>}
                        // defaultPage="canvas/canvas-page"
                    />
                </$TabViewItem>
                
                <$TabViewItem
                    title="Examples"
                    iconSource={isIOS ? "res://tabIcons/list" : "res://list"}
                >
                    <FramedPage
                        pageFactory={() => null}
                        // defaultPage="examples/examples-items-page"
                    />
                </$TabViewItem>

                <$TabViewItem
                    title="About"
                    iconSource={isIOS ? "res://tabIcons/help" : "res://help"}
                >
                    <FramedPage
                        pageFactory={() => null}
                        // defaultPage="about/about-page"
                    />
                </$TabViewItem>
            </$TabView>
        );
    }
}

export default AppContainer;
// export default hot(AppContainer); // Replace this line with the above line if you want to remove hot loading.