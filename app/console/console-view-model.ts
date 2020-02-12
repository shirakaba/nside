import { Observable } from "tns-core-modules/data/observable";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Page, View, Color, ContentView, PercentLength } from "tns-core-modules/ui/page";
import { ScrollView } from "tns-core-modules/ui/scroll-view";
import { Button } from "tns-core-modules/ui/button";
import { TextField } from "tns-core-modules/ui/text-field";
import { TextView } from "tns-core-modules/ui/text-view";
import { device } from "tns-core-modules/platform/platform";
import { FlexboxLayout } from "tns-core-modules/ui/layouts/flexbox-layout/flexbox-layout";
import * as Clipboard from "nativescript-clipboard";
// const SyntaxHighlighter = require("nativescript-syntax-highlighter").SyntaxHighlighter;
import { SyntaxHighlighter, CodeAttributedStringWrapper } from "nativescript-syntax-highlighter";
import { MyUITextViewDelegateImpl, MyTextView } from "../MyUITextViewDelegateImpl.ios";
// import { creatingView as transpileSyntaxViewHack } from "../components/syntax-view/SyntaxView";
// console.log("transpileSyntaxViewHack:", typeof transpileSyntaxViewHack);

const isTablet: boolean = device.deviceType === "Tablet";

interface State {
    lastText: string,
    suggestedText: string,
    ownProps: string[],
    inheritedProps: string[],
    designing: boolean,
}

export class ConsoleViewModel extends Observable {
    private state: State = {
        lastText: "",
        suggestedText: "",
        ownProps: [],
        inheritedProps: [],
        designing: false
    };
    public static readonly evalContext: any = {};
    // private input?: TextView;
    private ownProps?: TextField;
    private inheritedProps?: TextField;
    private output?: TextView;
    private design: ContentView = new ContentView();
    private designButton?: Button;
    private readonly syntaxHighlighter: any = new SyntaxHighlighter();

    // private _inputValue: string = "";
    // get inputValue(): string { return this._inputValue; }
    // set inputValue(value: string) {
    //     if (this._inputValue === value) return;
    //     this._inputValue = value;
    //     this.notifyPropertyChange('inputValue', value);
    // }

    private _ownPropsValue: string = "";
    get ownPropsValue(): string { return this._ownPropsValue; }
    set ownPropsValue(value: string) {
        if (this._ownPropsValue === value) return;
        this._ownPropsValue = value;
        this.notifyPropertyChange('ownPropsValue', value);
    }

    private _inheritedPropsValue: string = "";
    get inheritedPropsValue(): string { return this._inheritedPropsValue; }
    set inheritedPropsValue(value: string) {
        if (this._inheritedPropsValue === value) return;
        this._inheritedPropsValue = value;
        this.notifyPropertyChange('inheritedPropsValue', value);
    }

    private _outputValue: string = "";
    get outputValue(): string { return this._outputValue; }
    set outputValue(value: string) {
        if (this._outputValue === value) return;
        this._outputValue = value;
        this.notifyPropertyChange('outputValue', value);
    }

    constructor() {
        super();

        // this.design.style.width = 100;
        // this.design.style.height = 100;
        // this.design.id = "design";
        // // this.design.backgroundColor = new Color(255, 240, 240, 200);
        // // this.design.backgroundColor = new Color("orange");
        // this.design.backgroundColor = "orange";
    }

    clear() {
        if(this.textView) this.textView.text = "";
        this.state.lastText = "";
        this.outputValue = "";
    }

    navigatingTo(args) {
        console.log("navigatingTo();");
        const page: Page = <Page> args.object;
        page.bindingContext = this;
        console.log(`page.content:`, page.content);
        const flexbox: FlexboxLayout = page.content as FlexboxLayout;
    }

    firstTfLoaded(args) {
        const firstTextfield: TextView = <TextView>args.object;
        // setTimeout(() => {
        //     firstTextfield.focus(); // Shows the soft input method, ususally a soft keyboard.
        // }, 100);
    }

    toggleDesign(){
        console.log("toggleDesign!");


        if(this.state.designing){
            // const flexboxLayout = this.design.parent;
            // flexboxLayout._removeView(this.design);
            // flexboxLayout._addView(this.output);

            this.design.visibility = "collapse";
            this.output.parent.style.visibility = "visible";

            this.designButton.text = "Design";
        } else {
            // console.log('design:', this.design);
            

            // const scrollView = this.output.parent;
            // scrollView._removeView(this.output);
            // scrollView._addView(this.design);
            this.output.parent.style.visibility = "collapse";
            this.design.visibility = "visible";
            
            this.designButton.text = "Debug";
        }

        this.state.designing = !this.state.designing;
    }

    run(){
        if(!this.textView) return;
        const text = this.textView!.text;
        try {
            const value: any = ConsoleViewModel.evalInContext(
                // this.inputValue
                this.textView.text
                .replace(new RegExp('\u201c|\u201d', "g"), '"')
                .replace(new RegExp('\u2018|\u2019', "g"), "'")
            );

            if(typeof value === "undefined"){
                this.outputValue = "undefined";
            } else if(typeof value === "function"){
                this.outputValue = value.toString();
            } else if(typeof value === "object"){
                // this.outputValue = value.toString() === "[object Object]" ? JSON.stringify(value, null, 2) : value;
                this.outputValue = ConsoleViewModel.customStringify(value);
                // this.outputValue = ConsoleViewModel.customStringify2(value);
            } else if(value === ""){
                this.outputValue = '""';
            } else {
                this.outputValue = value;
            }
            this.output.style.color = new Color("green");
        } catch(e){
            this.output.style.color = new Color("red");
            this.outputValue = e;
            console.error(e);
        }
    }

    static customStringify(v): string {
        const cache = new Set();
            const stringified: string = JSON.stringify(v, (key, value) => {
                if(typeof value === 'object' && value !== null){
                    if(cache.has(value)) return; // Circular reference found, discard key
                    // Store value in our set
                    cache.add(value);
                }
                return value;
            },
            2
        );
        return stringified === "{}" ? v.toString() : stringified;
    };

    private static evalClosure(str: string): any {
        return eval(str);
    }

    private static evalInContext(str: string): any {
        return ConsoleViewModel.evalClosure.call(ConsoleViewModel.evalContext, str);
    }

    private myTextView?: MyTextView;
    private textView?: UITextView;
    private _myUITextViewDelegate?: MyUITextViewDelegateImpl;

    insertSyntaxView(container: ContentView){
        const uiView: UIView = container.ios as UIView;
        const codeAttributedStringWrapper: CodeAttributedStringWrapper = new CodeAttributedStringWrapper();
    
        const textStorage = codeAttributedStringWrapper._codeAttributedString;
        textStorage.language = "javascript".toLowerCase();
        const layoutManager: NSLayoutManager = NSLayoutManager.alloc().init();
        textStorage.addLayoutManager(layoutManager);
    
        // const textContainer = NSTextContainer.alloc().initWithSize(uiView.frame.size);
        const textContainer = NSTextContainer.alloc().initWithSize(CGRectZero.size);
        layoutManager.addTextContainer(textContainer);
    
        const textView: UITextView = UITextView.alloc().initWithFrameTextContainer(uiView.bounds, textContainer);
        
        // const textView: UITextView = UITextView.alloc().initWithFrameTextContainer(CGRectMake(0, 0, 300, 300), textContainer);
        
        textView.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
        textView.autocorrectionType = UITextAutocorrectionType.No;
        textView.autocapitalizationType = UITextAutocapitalizationType.None;
        textView.textColor = UIColor.alloc().initWithWhiteAlpha(0.8, 1.0);
        // console.log("SANITY CHECK 1");
        // console.log("highlightr:", codeAttributedStringWrapper._codeAttributedString.highlightr);

        /* This crashses it, too..! */
        // codeAttributedStringWrapper._codeAttributedString.highlightr.associatedTextView = textView;
        // console.log("SANITY CHECK 2");
        codeAttributedStringWrapper.setThemeTo("Pojoaque"); // Will get shifted to lowercase on native side anyway.


        /* These two accessors aren't working, so maybe expose a property on Highlightr/CodeAttributedString to associate
         * it with a TextView and get it to keep the theme colour up-to-date itself upon setThemeTo(). */
        // console.log("theme:", codeAttributedStringWrapper._codeAttributedString.highlightr.theme);
        // console.log("BG COLOR:", codeAttributedStringWrapper._codeAttributedString.highlightr.getThemeBackgroundColour());
        // textView.backgroundColor = codeAttributedStringWrapper._codeAttributedString.highlightr.getThemeBackgroundColour();

        textView.backgroundColor = UIColor.alloc().initWithRedGreenBlueAlpha(25/255, 25/255, 25/255, 1.0);
        textView.text = this.state.lastText;


        this.textView = textView;
        this.myTextView = new MyTextView(textView);
        // myTextView.createNativeView();

        

        // this._myUITextViewDelegate = MyUITextViewDelegateImpl.initWithOwner(new WeakRef(container));
        // container.ios.delegate = this._myUITextViewDelegate;

        this._myUITextViewDelegate = MyUITextViewDelegateImpl.initWithOwner(new WeakRef(this.myTextView!));
        this._myUITextViewDelegate.onTextViewDidChange = (textView: UITextView) => {
            this.onInputTextChange(textView.text);
        }
        this._myUITextViewDelegate.onTab = (textView: UITextView) => {
            if(this.state.suggestedText === "" || this.state.suggestedText === textView.text) return true;

            // const selectedRange: UITextRange|null = textView.selectedTextRange;
            // if(selectedRange === null) return true;
            // console.log(`selected range: start [${selectedRange.start}] empty: [${selectedRange.empty}]`)
            // let cursorPosition: number = textView.offsetFromPositionToPosition(textView.beginningOfDocument, selectedRange.start);
            // const charBeforePosition: string = textView.text[cursorPosition - 1];
            // console.log(`Suggestion was: [${suggestion}] for full text: [${textView.text}]; cursorPosition: [${cursorPosition}]; charBeforePosition: [${charBeforePosition}]`);
            // // textView.text += suggestion;

            textView.text = this.state.suggestedText;
            this.state.lastText = textView.text;
            return false;
        }
        this.myTextView!.ios.delegate = this._myUITextViewDelegate;

        // uiView.addSubview(textView);
        // container._addView(myTextView);
        container.ios.addSubview(textView);
    }

    launchHttpServer(port: number){
        /** iOS-only for now. */
        const ws = (global as any).GCDWebServer.alloc().init();
        ws.addGETHandlerForBasePathDirectoryPathIndexFilenameCacheAgeAllowRangeRequests(
            "/",
            NSURL.alloc().initWithString(
                NSBundle.mainBundle.pathForResourceOfTypeInDirectory(
                    "index", "html", "tsserver"
                )
            ).URLByDeletingLastPathComponent.absoluteString,
            null,
            3600,
            true
        );
        ws.startWithPortBonjourName(port, null);
    }

    private tsserver: WKWebView = WKWebView.alloc().initWithFrameConfiguration(CGRectMake(0,0,0,0), WKWebViewConfiguration.alloc().init());
    launchTsServer(port: number){
        this.tsserver.loadRequest(
            NSURLRequest.alloc().initWithURL(
                NSURL.alloc().initWithString(`http://localhost:${port}/index.html`)
            )
        );
    }
    askTsServer(text: string){
        const safeString: string = unescape(encodeURIComponent(text));
        console.log("safeString:", safeString);
        // const base64: string = NSString.alloc().initWithUTF8String(safeString).dataUsingEncoding(NSUnicodeStringEncoding)
        const base64: string = NSString.alloc().initWithUTF8String(safeString).dataUsingEncoding(NSUTF8StringEncoding)
        .base64EncodedStringWithOptions(NSDataBase64EncodingOptions.Encoding64CharacterLineLength);
        console.log("base64:", base64);
        // console.log("base64 sliced:", base64.slice("//".length));

        // return;

        this.tsserver.evaluateJavaScriptCompletionHandler(
            // We use an IIFE, as otherwise 'const source' is initialised straight onto the window context.
            // We escape the speech marks as we're using those to enclose the string.
            // We escape the line breaks because otherwise they're interpreted literally.
            // We trim so as to avoid "unexpected EOF".

            // const base64 = "${(global as any).Buffer.from(unescape(encodeURIComponent(text))).toString('base64')}";
            // 
`
(() => {
    const base64 = "${base64}";

    const result = window.ts.transpileModule(
        window.atou(base64),
        {
            compilerOptions: {
                module: window.ts.ModuleKind.CommonJS
            }
        }
    );
    
    return JSON.stringify(result);
})();
`
            ,
            (value: any, error: NSError|null) => {
                if(error !== null) return console.log("[tsserver] ERROR: " + error.localizedDescription);
                console.log("[tsserver] ANSWER: ", value);
            }
        )
    }

    onPageLoaded(args){
        console.log("ON PAGE LOADED");
        const cv: ContentView = (<Page>args.object).getViewById<ContentView>("SyntaxView");
        this.insertSyntaxView(cv);

        const port: number = 8080;
        this.launchHttpServer(8080);
        this.tsserver.evaluateJavaScriptCompletionHandler(
            [
                "function utoa(str){return window.btoa(unescape(encodeURIComponent(str)));}",
                "function atou(str){return decodeURIComponent(escape(window.atob(str)));}",
            ].join('\n'),
            (value: any, error: NSError|null) => {
                if(error !== null) return console.log("[tsserver] ERROR: " + error.localizedDescription);
                console.log("[tsserver] ANSWER: ", value);
            }
        )
        this.launchTsServer(8080);
    }

    onComponentLoaded(args){
        const view: TextView|TextField|ContentView|Button = <TextView|TextField|ContentView|Button>args.object;
        console.log("onComponentLoaded");

        switch(view.id){
            /* This is too late in the lifecycle to set up SyntaxView's delegate (it seems). */
            // case "SyntaxView":
            //     console.log("Will insert SyntaxView...");
            //     this.insertSyntaxView(view as TextView);
            //     break;
            // case "input":
            //     view.style.fontFamily = "Courier New";
            //     view.style.fontSize = 16;
            //     this.input = view as TextView;
            //     this.setUpInputTextView(this.input);
            //     console.log("this.input assigned!", this.input);
            //     break;
            case "ownProps":
                view.style.fontFamily = "Courier New";
                view.style.fontSize = 16;
                this.ownProps = view as TextField;
                console.log("this.ownProps assigned!", this.ownProps);
                break;
            case "inheritedProps":
                view.style.fontFamily = "Courier New";
                view.style.fontSize = 16;
                this.inheritedProps = view as TextField;
                console.log("this.inheritedProps assigned!", this.inheritedProps);
                break;
            case "design":
                this.design = view as ContentView;
                if(isTablet){
                    view.height = { unit: "%", value: 0.175 };
                    // view.width = { unit: "%", value: 50 };
                    view.style.visibility = "visible";
                } else {
                    this.design.style.visibility = this.state.designing ? "visible" : "collapse";
                }
                (this.design.ios as UIView).clipsToBounds = true;
                console.log("this.design assigned!", this.design);
                (global as any).design = this.design;
                // ConsoleViewModel.evalContext.design = this.design;
                break;
            case "designButton":
                this.designButton = view as Button;
                if(isTablet){
                    this.designButton!.style.visibility = "collapse";
                } else {
                    this.designButton!.text = this.state.designing ? "Debug" : "Design";
                }
                console.log("this.designButton assigned!", this.designButton);
                break;
            case "output":
                view.style.fontFamily = "Courier New";
                view.style.fontSize = 16;
                this.output = view as TextView;
                if(isTablet){
                    (view.parent as ScrollView).height = { unit: "%", value: 0.175 };
                    // view.width = { unit: "%", value: 50 };
                    view.style.visibility = "visible";
                } else {
                    this.output.parent.style.visibility = this.state.designing ? "collapse" : "visible";
                }
                console.log("this.output assigned!", this.output);
                // textView.on("textChange", (argstv) => {
                //     console.dir(argstv);
                // });
                break;
            default:
                console.log("Loaded unspecified view", view);
        }
    }
    
    onReturnPress(args) {
        // returnPress event will be triggered when user submits a value
        const textView: TextView = <TextView>args.object;
    }
    
    onInputFocus(args) {
        // focus event will be triggered when the users enters the TextField
        const textView: TextView = <TextView>args.object;
        console.log("onFocus event for: " + textView.id);
    }
    
    onInputBlur(args) {
        // blur event will be triggered when the user leaves the TextField
        const textView: TextView = <TextView>args.object;
        console.log("onBlur event for: " + textView.id);

        /* Looks like dismissSoftInput() was never needed on this callback after all, because it's run implicitly?
         * Just that the 'show soft keyboard' option is a bit confusing in the Simulator.
         */
    }

    bestSuggestion(): string {
        const firstOwnProp = this.state.ownProps.length ? this.state.ownProps[0] : "";
        const firstInheritedProp = this.state.inheritedProps.length ? this.state.inheritedProps[0] : "";
        return firstOwnProp || firstInheritedProp;
    }

    textChangeHandler(text: string, incompleteOrToSlice: string, incomplete: boolean, own: string[], inherited: string[]){
        this.state.ownProps = own.sort();
        this.state.inheritedProps = inherited.sort();
        const bestSuggestion: string = this.bestSuggestion();
        const diff: string = bestSuggestion.slice(incompleteOrToSlice.length);
        console.log(`bestSuggestion ${incomplete ? 1 : 2}: ${bestSuggestion}; diff: ${diff}`);
        this.state.suggestedText = text + diff;
    }

    onInputTextChange(text: string): void {
        this.askTsServer(text);
        this.state.lastText = text;
        const ownPropsScroller: ScrollView = this.output.parent as ScrollView;
        const inheritedPropsScroller: ScrollView = this.inheritedProps.parent as ScrollView;
        console.log(`inheritedPropsScroller vert:`, inheritedPropsScroller.verticalOffset);
        ownPropsScroller.scrollToVerticalOffset(0, false);
        inheritedPropsScroller.scrollToVerticalOffset(0, false);

        const splitOnLines: string[] = text.split('\n');
            let finalLine: string = splitOnLines.length > 1 ? splitOnLines.slice(-1)[0] : splitOnLines[0];
            const splitOnWhitespace: string[] = text.split(' ');
            finalLine = splitOnWhitespace.length > 1 ? splitOnWhitespace.slice(-1)[0] : splitOnWhitespace[0];
            // console.log("splitOnLines: " + splitOnLines);
            // console.log("finalLine: " + finalLine);
            if (typeof finalLine !== "undefined" && finalLine !== "") {
                const lastIndex: number = finalLine.lastIndexOf(".");
                const token: string = lastIndex > -1 ? finalLine.slice(0, lastIndex) : finalLine;
                const incomplete: string = lastIndex > -1 ? finalLine.slice(lastIndex + ".".length) : "";
                console.log("lastIndex: " + lastIndex + "; token: " + token + "; incomplete: " + incomplete);
                // Object.keys(global).forEach((key) => console.log(key));
                // for(let key in global){ console.log(key); }
                if (token !== "") {
                    try {
                        const keyed: boolean = ConsoleViewModel.evalInContext(`typeof ${token} === "object" && ${token} !== null;`);
                        let value: {
                            own: string[];
                            inherited: string[];
                        };
                        const instantiateOwnInherited: string = `let own = []; let inherited = [];`;
                        const returnAnswer: string = `let answer = { own: own, inherited: inherited }; answer`;

                        if (keyed) {
                            // console.log("KEYED");
                            if (incomplete === "") {
                                // Takes a long time
                                // console.log("WAIT AHEAD");
                                value = ConsoleViewModel.evalInContext(
                                    [
                                        instantiateOwnInherited,
                                        `let __NSIDE_instance__ = ${token};`,
                                        `for(let key in __NSIDE_instance__){`,
                                            `__NSIDE_instance__.hasOwnProperty(key) ? own.push(key) : inherited.push(key);`,
                                        `}`,
                                        returnAnswer
                                    ].join('\n')
                                );
                            } else {
                                // TODO: check on global, and auto-complete constructor names
                                value = ConsoleViewModel.evalInContext(
                                    [
                                        instantiateOwnInherited,
                                        `let __NSIDE_instance__ = ${token};`,
                                        `for(let key in __NSIDE_instance__){`,
                                            `if(key.indexOf('${incomplete}') !== 0) continue;`,
                                            `__NSIDE_instance__.hasOwnProperty(key) ? own.push(key) : inherited.push(key);`,
                                        `}`,
                                        returnAnswer
                                    ].join('\n')
                                );
                            }
                            this.textChangeHandler(text, incomplete, true, value.own, value.inherited);
                        } else {
                            let parent: string;
                            let toSlice: string;
                            // console.log("UNKEYED");
                            if(lastIndex === -1){
                                parent = "global";
                                toSlice = token;
                            } else {
                                parent = token;
                                toSlice = incomplete;
                            }
                            /*
                                let own = []; let inherited = [];

                                for(let key in UITextView){
                                    if(key.indexOf(‘all’) !== 0) continue;
                                    // both 'this' and 'global' work.
                                    global.hasOwnProperty(key) ? own.push(key) : inherited.push(key);
                                }

                                let answer = { own: own, inherited: inherited }; answer;
                            */
                            value = ConsoleViewModel.evalInContext(
                                [
                                    instantiateOwnInherited,
                                    `let __NSIDE_instance__ = ${parent};`,
                                    `for(let key in __NSIDE_instance__){`,
                                        `if(key.indexOf('${toSlice}') !== 0) continue;`,
                                        // both 'this' and 'global' work.
                                        `global.hasOwnProperty(key) ? own.push(key) : inherited.push(key);`,
                                    `}`,
                                    returnAnswer
                                ].join('\n')
                            );
                            this.textChangeHandler(text, toSlice, false, value.own, value.inherited);
                        }
                    } catch (e) {
                        this.state.ownProps = [];
                        this.state.inheritedProps = [];
                        this.state.suggestedText = text;
                    }
                } else {
                    this.state.ownProps = [];
                    this.state.inheritedProps = [];
                    this.state.suggestedText = text;
                }
            } else {
                console.log("NO MATCH");
                this.state.ownProps = [];
                this.state.inheritedProps = [];
                this.state.suggestedText = text;
            }
            this.ownPropsValue = this.state.ownProps.join(', ');
            this.inheritedPropsValue = this.state.inheritedProps.join(', ');
    }

    // private setUpInputTextView(textView: TextView | TextField) {
    //     textView.on("textChange", (argstv) => {
    //         this.onInputTextChange((argstv as any).value as string);
    //     });
    // }

}