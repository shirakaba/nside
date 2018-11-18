import { Observable } from "tns-core-modules/data/observable";
import { Page, NavigatedData } from "tns-core-modules/ui/page/page";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout/grid-layout";

export class SearchViewModel extends Observable {
    constructor() {
        super();
    }

    onNavigatingTo(args: NavigatedData) {
        console.log("onNavigatingTo();");
        const page: Page = <Page> args.object;
        page.bindingContext = this;
        console.log(`page.content:`, page.content);
        const gl: GridLayout = page.content as GridLayout;

        (global as any).uiPage = page;
    }
}
