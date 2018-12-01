import { NavigatedData, Page } from "tns-core-modules/ui/page";
import { CanvasViewModel } from "./canvas-view-model";

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const svm = new CanvasViewModel();
    page.bindingContext = svm;
    svm.onNavigatingTo(args);
}
