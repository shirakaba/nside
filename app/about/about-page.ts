import { NavigatedData, Page } from "@nativescript/core";
import { AboutViewModel } from "./about-view-model";

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const avm = new AboutViewModel();
    page.bindingContext = avm;
    avm.onNavigatingTo(args);
}
