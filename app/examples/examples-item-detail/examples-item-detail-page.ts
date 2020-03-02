import { EventData, View } from "tns-core-modules/ui/core/view";
import { NavigatedData, Page, ContentView } from "tns-core-modules/ui/page";
import { Item } from "../shared/item";
import { MyTextView, MyUITextViewDelegateImpl } from "../../MyUITextViewDelegateImpl.ios";

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
}
