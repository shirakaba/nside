import { Observable } from "tns-core-modules/data/observable";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Page, View, Color, ContentView } from "tns-core-modules/ui/page";
import { ScrollView } from "tns-core-modules/ui/scroll-view";
import { Button } from "tns-core-modules/ui/button";
import { TextField } from "tns-core-modules/ui/text-field";
import { TextView } from "tns-core-modules/ui/text-view";
import { FlexboxLayout } from "tns-core-modules/ui/layouts/flexbox-layout/flexbox-layout";
import * as Clipboard from "nativescript-clipboard";
// const SyntaxHighlighter = require("nativescript-syntax-highlighter").SyntaxHighlighter;
import { SyntaxHighlighter, CodeAttributedStringWrapper } from "nativescript-syntax-highlighter";
import { MyUITextViewDelegateImpl, MyTextView } from "~/MyUITextViewDelegateImpl.ios";
// import { creatingView as transpileSyntaxViewHack } from "../components/syntax-view/SyntaxView";
// console.log("transpileSyntaxViewHack:", typeof transpileSyntaxViewHack);

interface State {
    lastText: string,
    ownProps: string[],
    inheritedProps: string[],
    designing: boolean,
}

export class BrowseViewModel extends Observable {
    private state: any = {
        lastText: "",
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
            const value: any = BrowseViewModel.evalInContext(
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
                this.outputValue = BrowseViewModel.customStringify(value);
                // this.outputValue = BrowseViewModel.customStringify2(value);
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
        return BrowseViewModel.evalClosure.call(BrowseViewModel.evalContext, str);
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
            console.log();
        }
        this.myTextView!.ios.delegate = this._myUITextViewDelegate;

        // uiView.addSubview(textView);
        // container._addView(myTextView);
        container.ios.addSubview(textView);
    }

    onPageLoaded(args){
        console.log("ON PAGE LOADED");
        const cv: ContentView = (<Page>args.object).getViewById<ContentView>("SyntaxView");
        this.insertSyntaxView(cv);
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
                this.design.style.visibility = this.state.designing ? "visible" : "collapse";
                (this.design.ios as UIView).clipsToBounds = true;
                console.log("this.design assigned!", this.design);
                (global as any).design = this.design;
                // BrowseViewModel.evalContext.design = this.design;
                break;
            case "designButton":
                this.designButton = view as Button;
                this.designButton.text = this.state.designing ? "Debug" : "Design";
                console.log("this.designButton assigned!", this.designButton);
                break;
            case "output":
                view.style.fontFamily = "Courier New";
                view.style.fontSize = 16;
                this.output = view as TextView;
                this.output.parent.style.visibility = this.state.designing ? "collapse" : "visible";
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

    onInputTextChange(value: string): void {
        this.state.lastText = value;
        const ownPropsScroller: ScrollView = this.output.parent as ScrollView;
        const inheritedPropsScroller: ScrollView = this.inheritedProps.parent as ScrollView;
        ownPropsScroller.scrollToVerticalOffset(0, false);
        inheritedPropsScroller.scrollToVerticalOffset(0, false);

        const splitOnLines: string[] = value.split('\n');
            let finalLine: string = splitOnLines.length > 1 ? splitOnLines.slice(-1)[0] : splitOnLines[0];
            const splitOnWhitespace: string[] = value.split(' ');
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
                        const keyed: boolean = BrowseViewModel.evalInContext(`typeof ${token} === "object" && ${token} !== null;`);
                        let value: {
                            own: string[];
                            inherited: string[];
                        };
                        const instantiateOwnInherited: string = `let own = []; let inherited = [];`;
                        const returnAnswer: string = `let answer = { own: own, inherited: inherited }; answer`;

                        if (keyed) {
                            if (incomplete === "") {
                                value = BrowseViewModel.evalInContext(
                                    [
                                        instantiateOwnInherited,
                                        `for(let key in ${token}){`,
                                            `${token}.hasOwnProperty(key) ? own.push(key) : inherited.push(key);`,
                                        `}`,
                                        returnAnswer
                                    ].join('\n')
                                );
                            }
                            else {
                                // TODO: check on global, and auto-complete constructor names
                                value = BrowseViewModel.evalInContext(
                                    [
                                        instantiateOwnInherited,
                                        `for(let key in ${token}){`,
                                        `if(key.indexOf('${incomplete}') !== 0) continue;`,
                                            `${token}.hasOwnProperty(key) ? own.push(key) : inherited.push(key);`,
                                        `}`,
                                        returnAnswer
                                    ].join('\n')
                                );
                            }
                            this.state.ownProps = value.own;
                            this.ownPropsValue = this.state.ownProps.join(', ');
                            this.state.inheritedProps = value.inherited;
                            this.inheritedPropsValue = this.state.inheritedProps.join(', ');
                        }
                        else {
                            if(lastIndex === -1){
                                value = BrowseViewModel.evalInContext(
                                    [
                                        instantiateOwnInherited,
                                        `for(let key in global){`,
                                            `if(key.indexOf('${token}') !== 0) continue;`,
                                            `global.hasOwnProperty(key) ? own.push(key) : inherited.push(key);`,
                                        `}`,
                                        returnAnswer
                                    ].join('\n')
                                );

                                this.state.ownProps = value.own;
                                this.ownPropsValue = this.state.ownProps.join(', ');
                                this.state.inheritedProps = value.inherited;
                                this.inheritedPropsValue = this.state.inheritedProps.join(', ');
                            } else {
                                this.state.ownProps = [];
                                this.ownPropsValue = this.state.ownProps.join(', ');
                                this.state.inheritedProps = [];
                                this.inheritedPropsValue = this.state.inheritedProps.join(', ');
                            }
                        }
                    }
                    catch (e) {
                        this.state.ownProps = [];
                        this.ownPropsValue = this.state.ownProps.join(', ');
                        this.state.inheritedProps = [];
                        this.inheritedPropsValue = this.state.inheritedProps.join(', ');
                    }
                }
                else {
                    this.state.ownProps = [];
                    this.ownPropsValue = this.state.ownProps.join(', ');
                    this.state.inheritedProps = [];
                    this.inheritedPropsValue = this.state.inheritedProps.join(', ');
                }
            }
            else {
                console.log("NO MATCH");
                this.state.ownProps = [];
                this.ownPropsValue = this.state.ownProps.join(', ');
                this.state.inheritedProps = [];
                this.inheritedPropsValue = this.state.inheritedProps.join(', ');
            }

    }

    // private setUpInputTextView(textView: TextView | TextField) {
    //     textView.on("textChange", (argstv) => {
    //         this.onInputTextChange((argstv as any).value as string);
    //     });
    // }

}