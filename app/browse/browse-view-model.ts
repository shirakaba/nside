import { Observable } from "tns-core-modules/data/observable";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Page } from "tns-core-modules/ui/page";
import { TextField } from "tns-core-modules/ui/text-field";
import {WebView, LoadEventData} from "tns-core-modules/ui/web-view";

export class BrowseViewModel extends Observable {
    // Don't append index.html!
    private static NSIDE_SERVER_URL: string = "http://localhost:8888/shirakaba.github.io/NSIDE/";
    // private static NSIDE_SERVER_URL: string = "https://agentcooper.github.io/typescript-play/";
    // private static NSIDE_SERVER_URL: string = "https://shirakaba.github.io/NSIDE/";
    private webview?: WebView;
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
        const wv: WKWebView = WKWebView.alloc()
        .initWithFrameConfiguration(
            // CGRectMake(5, 5, 5, 5),
            CGRectZero,
            WKWebViewConfiguration.alloc().init()
        )

        wv.configuration.userContentController.addUserScript(
            WKUserScript.alloc()
            .initWithSourceInjectionTimeForMainFrameOnly(
                "document.body.style.backgroundColor = 'orange';",
                WKUserScriptInjectionTime.AtDocumentStart,
                false
            )
        );
    }

    navigatingTo(args) {
        console.log("navigatingTo();");
        const page: Page = <Page> args.object;
        page.bindingContext = this;
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
