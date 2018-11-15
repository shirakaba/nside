import { Observable } from "tns-core-modules/data/observable";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Page, View } from "tns-core-modules/ui/page";
import { TextField } from "tns-core-modules/ui/text-field";
import {WebView, LoadEventData} from "tns-core-modules/ui/web-view";
import { FlexboxLayout } from "tns-core-modules/ui/layouts/flexbox-layout/flexbox-layout";

export class BrowseViewModel extends Observable {
    // Don't append index.html!
    private static NSIDE_SERVER_URL: string = "http://localhost:8888/shirakaba.github.io/NSIDE/";
    // private static NSIDE_SERVER_URL: string = "https://agentcooper.github.io/typescript-play/";
    // private static NSIDE_SERVER_URL: string = "https://shirakaba.github.io/NSIDE/";
    private webview?: WKWebView;
    private _webViewSrc: string = BrowseViewModel.NSIDE_SERVER_URL;

    get webViewSrc(): string { return this._webViewSrc; }
    set webViewSrc(value: string) {
        if (this._webViewSrc === value) return;
        this._webViewSrc = value;
        this.notifyPropertyChange('webViewSrc', value);
    }

    constructor() {
        super();

        /* As we're just using a blank WKWebViewConfiguration
        * may not even need initWithFrameConfiguration() */
        // const wv: WKWebView = WKWebView.alloc()
        // .initWithFrameConfiguration(
        //     // CGRectMake(5, 5, 5, 5),
        //     CGRectZero,
        //     WKWebViewConfiguration.alloc().init()
        // )

        // wv.configuration.userContentController.addUserScript(
        //     WKUserScript.alloc()
        //     .initWithSourceInjectionTimeForMainFrameOnly(
        //         "document.body.style.backgroundColor = 'orange';",
        //         WKUserScriptInjectionTime.AtDocumentStart,
        //         false
        //     )
        // );
    }

    refresh() {
        if(this.webview) this.webview.reload();
    }

    navigatingTo(args) {
        console.log("navigatingTo();");
        const page: Page = <Page> args.object;
        page.bindingContext = this;
        console.log(`page.content:`, page.content);
        const flexbox: FlexboxLayout = page.content as FlexboxLayout;
        flexbox.eachChildView

        let i: number = 0;
        flexbox.eachChildView((view: View) => {
            console.log(`flexbox.eachChildView[${i++}]`, view);
            if(view.id === "wv"){
                this.webview = view as WebView;
                return true;
            }
            return false;
        });
        /* 0: WebView; 1: Button; 2: Button */
        console.log("WKConfiguration coming up...");
        console.log("WKConfiguration:", ((this.webview! as any) as WKWebView).configuration);

        // let i: number = 0;
        // page.eachChildView((view: View) => {
        //     console.log(`page.eachChildView[${i++}]`, view);
        //     return true;
        // })
        /* 0: FlexboxLayout; 1: ActionBar */
    }

    // handling WebView load finish event
    onWebViewLoaded(webargs) {
        console.log("onWebViewLoaded();");
        const page: Page = <Page> webargs.object.page;
        this.webview = <WebView> webargs.object;
        this.set("result", "WebView is still loading...");
        this.set("enabled", false);

        this.webview.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
            let message = "";
            if (!args.error) {
                message = `WebView finished loading of ${args.url}`;
            } else {
                message = `Error loading ${args.url} : ${args.error}`;
            }

            this.set("result", message);
            console.log(`WebView message - ${message}`);
        });
    }
}
