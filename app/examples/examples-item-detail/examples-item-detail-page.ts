import { EventData, View, NavigatedData, Page } from "@nativescript/core";
import { Item } from "../shared/item";

export function onNavigatingTo(args: NavigatedData) {
    const page = args.object as Page;
    const item = args.context as Item;
    page.bindingContext = item;
}

export function onBackButtonTap(args: EventData) {
    const view = args.object as View;
    const page = view.page as Page;

    page.frame.goBack();
}

export function onPageLoaded(args) {
    const page: Page = args.object;
    // console.log("ON PAGE LOADED. page.bindingContext:", page.bindingContext);
}
