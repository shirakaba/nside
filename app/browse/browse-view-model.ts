import { Observable } from "tns-core-modules/data/observable";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Page, View } from "tns-core-modules/ui/page";
import { TextField } from "tns-core-modules/ui/text-field";
import {WebView, LoadEventData} from "tns-core-modules/ui/web-view";
import { FlexboxLayout } from "tns-core-modules/ui/layouts/flexbox-layout/flexbox-layout";
import * as Clipboard from "nativescript-clipboard";

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

        // const wv: WKWebView = WKWebView.alloc()
        // .initWithFrameConfiguration(
        //     CGRectZero,
        //     // CGRectMake(5, 5, 5, 5),
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

        // const wv = new WebView();
        // console.log(`new WebView:`, wv);
        // const wk: WKWebView = wv.createNativeView() as WKWebView;
        // console.log(`nativeView:`, wk);
        // wv.src = BrowseViewModel.NSIDE_SERVER_URL;
        // wv.height = 100;

        // flexbox.addChild(wv);
        // flexbox.addChild(wk as any);

        
        // const flexbox = page.content as FlexboxLayout;
        // flexbox.addChild(new WebView().createNativeView() as View);

        // flexbox.eachChildView((view) => {
        //     if(view.id === "wv"){
        //         // this.webview = (view as WebView).ios as WKWebView;
        //         console.log(`view:`, (view as WebView));


        

        //         // console.log(`view.canGoBack:`, (view as WebView).canGoBack);
        //         // const native = (view as WebView).createNativeView();
        //         // console.log(`view.ios:`, (view as WebView).ios as WKWebView);
        //         // console.log(`view._ios:`, (view as any)._ios as WKWebView);

        //         // console.log(`view.ios.configuration:`, ((view as WebView).ios as WKWebView).configuration);
        //         return true;
        //     }
        //     return false;
        // })

        // console.log(`config:`, this.webview!.configuration);
        

        // flexbox.addChild(<any>wv as View); // We'll need a solution for Android...
        // this.webview = wv;
    }

    firstTfLoaded(args) {
        const firstTextfield: TextField = <TextField>args.object;
        // setTimeout(() => {
        //     firstTextfield.focus(); // Shows the soft input method, ususally a soft keyboard.
        // }, 100);
    }

    run(){
        Clipboard.getText()
        .then((script: string) => {
            eval(script);
        })
        .catch((e) => {
            console.error(e);
        });
    }
    
    onReturnPress(args) {
        // returnPress event will be triggered when user submits a value
        const textField: TextField = <TextField>args.object;
        // Gets or sets the placeholder text.
        console.log(textField.hint);
        // Gets or sets the input text.
        console.log(textField.text);
        // Gets or sets the secure option (e.g. for passwords).
        console.log(textField.secure);
    
        // Gets or sets the soft keyboard type. Options: "datetime" | "phone" | "number" | "url" | "email"
        console.log(textField.keyboardType);
        // Gets or sets the soft keyboard return key flavor. Options: "done" | "next" | "go" | "search" | "send"
        console.log(textField.returnKeyType);
        // Gets or sets the autocapitalization type. Options: "none" | "words" | "sentences" | "allcharacters"
        console.log(textField.autocapitalizationType);
    
        // Gets or sets a value indicating when the text property will be updated.
        console.log(textField.updateTextTrigger);
        // Gets or sets whether the instance is editable.
        console.log(textField.editable);
        // Enables or disables autocorrection.
        console.log(textField.autocorrect);
        // Limits input to a certain number of characters.
        console.log(textField.maxLength);
    
        // setTimeout(() => {
        //     textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
        // }, 100);
    }
    
    onFocus(args) {
        // focus event will be triggered when the users enters the TextField
        console.log("onFocus event");
    }
    
    onBlur(args) {
        // blur event will be triggered when the user leaves the TextField
        const textField: TextField = <TextField>args.object;
        // textField.dismissSoftInput();
        console.log("onBlur event");
    }

    // handling WebView load finish event
    onWebViewLoaded(webargs) {
        console.log("onWebViewLoaded();");
        const page: Page = <Page> webargs.object.page;
        this.webview = <WebView> webargs.object;
        this.set("result", "WebView is still loading...");
        this.set("enabled", false);

        (<any>this.webview as WebView).on(WebView.loadFinishedEvent, (args: LoadEventData) => {
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
