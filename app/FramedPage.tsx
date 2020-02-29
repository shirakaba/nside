import * as React from "react";
import { Frame, Page } from "@nativescript/core";
import { $Frame } from "react-nativescript";
import { PageComponentProps } from "react-nativescript/dist/components/Page";
import { RefObject } from "react";

type PageFactoryProps = PageComponentProps & { ref?: RefObject<Page> };

interface Props {
    pageFactory: (props: PageFactoryProps) => React.ReactNode,
}

export class FramedPage extends React.Component<Props, {}> {
    private readonly frameRef: React.RefObject<Frame> = React.createRef();
    private readonly pageRef: React.RefObject<Page> = React.createRef();

    componentDidMount(){
        const frame: Frame|null = this.frameRef.current;
        if(!frame){
            console.warn(`Frame ref unpopulated!`);
            return;
        }

        const page: Page|null = this.pageRef.current
        if(!page){
            console.warn(`Page ref unpopulated!`);
            return;
        }

        console.log(`[FramedPage] componentDidMount; shall navigate to page within.`);
        frame.navigate({
            create: () => {
                return page;
            }
        });
    }

    render(){
        const { pageFactory } = this.props;

        return (
            <$Frame ref={this.frameRef}>
                {pageFactory({ ref: this.pageRef })}
            </$Frame>
        );
    }
}