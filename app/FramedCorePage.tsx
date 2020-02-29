import * as React from "react";
import { Frame, Page } from "@nativescript/core";
import { $Frame } from "react-nativescript";

interface Props {
    route: string,
}

export class FramedCorePage extends React.Component<Props, {}> {
    private readonly frameRef: React.RefObject<Frame> = React.createRef();

    componentDidMount(){
        const frame: Frame|null = this.frameRef.current;
        if(!frame){
            console.warn(`[FramedCorePage] Frame ref unpopulated!`);
            return;
        }

        console.log(`[FramedCorePage] componentDidMount; shall navigate to page within.`);
        frame.navigate(this.props.route);
    }

    render(){
        return (
            <$Frame ref={this.frameRef}/>
        );
    }
}