import { NavigatedData, Page } from "tns-core-modules/ui/page";
import { SearchViewModel } from "./search-view-model";

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const svm = new SearchViewModel();
    page.bindingContext = svm;
    svm.onNavigatingTo(args);
}
