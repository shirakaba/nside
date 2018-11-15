import { NavigatedData, Page } from "tns-core-modules/ui/page";
import { BrowseViewModel } from "./browse-view-model";
import { ActionBar } from "tns-core-modules/ui/action-bar/action-bar";
import { Label } from "tns-core-modules/ui/label";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout";
import { FlexboxLayout } from "tns-core-modules/ui/layouts/flexbox-layout/flexbox-layout";

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    page.bindingContext = new BrowseViewModel();
    page.bindingContext.navigatingTo(args);
}

// export function createPage(): Page {
//     const stack = new StackLayout();
//     const label = new Label();
//     label.text = "Hello, world!";
//     stack.addChild(label);

//     const page = new Page();
//     page.className = "page";


//     const actionBar = new ActionBar();
//     actionBar.className = "action-bar";

//     const actionBarLabel = new Label();
//     actionBarLabel.className = "action-bar-title";
//     actionBarLabel.text = "Browse";

//     actionBar.titleView = actionBarLabel;

//     const fb = new FlexboxLayout();
//     fb.flexDirection = "column";
//     const wv = WKWebView.alloc().init();
//     fb.addChild(wv)


//     // const contentView;

//     // Each page can have a single root view set via the content property
//     page.content = label;
//     return page;
// }