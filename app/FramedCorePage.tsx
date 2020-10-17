import * as React from "react";
import { useEffect, useRef } from "react";
import { Frame } from "@nativescript/core";
import { NSVElement, NativeScriptProps, FrameAttributes } from "react-nativescript";

interface Props extends NativeScriptProps<FrameAttributes, Frame> {
    /**
     * "nodeRole" is a special prop, like "key" or "ref", which applies to the component
     * immediately (in this case FramedCorePage) and can't be passed down to children.
     * 
     * So, to pass it on to the frame element within, we use "_nodeRole".
     */
    _nodeRole: string,
    route: string,
}

export function FramedCorePage(props: Props){
    const { route, _nodeRole, ...rest } = props;

    const frameRef = useRef<NSVElement<Frame>>(null);

    useEffect(() => {
        frameRef.current?.nativeView.navigate(route);
    }, []);

    return (
        <frame {...rest} nodeRole={_nodeRole} ref={frameRef}/>
    );
}
