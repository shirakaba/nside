import { Observable } from "tns-core-modules/data/observable";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Page, View, Color, ContentView } from "tns-core-modules/ui/page";
import { Button } from "tns-core-modules/ui/button";
import { TextField } from "tns-core-modules/ui/text-field";
import { TextView } from "tns-core-modules/ui/text-view";
import { FlexboxLayout } from "tns-core-modules/ui/layouts/flexbox-layout/flexbox-layout";
import * as Clipboard from "nativescript-clipboard";

export class BrowseViewModel extends Observable {
    public static readonly evalContext: any = {};
    private input?: TextView;
    private ownProps?: TextField;
    private inheritedProps?: TextField;
    private output?: TextView;
    private design: ContentView = new ContentView();
    private designButton?: Button;
    private designing: boolean = false;

    private _inputValue: string = "";
    get inputValue(): string { return this._inputValue; }
    set inputValue(value: string) {
        if (this._inputValue === value) return;
        this._inputValue = value;
        this.notifyPropertyChange('inputValue', value);
    }

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
        this.inputValue = "";
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


        if(this.designing){
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

        this.designing = !this.designing;
    }

    run(){
        try {
            const value: any = BrowseViewModel.evalInContext(
                this.inputValue
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
        }, 2);
        return stringified === "{}" ? v.toString() : stringified;
      };

    private static evalClosure(str: string): any {
        return eval(str);
    }

    private static evalInContext(str: string): any {
        return BrowseViewModel.evalClosure.call(BrowseViewModel.evalContext, str);
    }

    onComponentLoaded(args){
        const view: TextView|TextField|ContentView|Button = <TextView|TextField|ContentView|Button>args.object;
        console.log("onComponentLoaded");

        switch(view.id){
            case "input":
                view.style.fontFamily = "Courier New";
                view.style.fontSize = 16;
                this.input = view as TextView;
                this.setUpInputTextView(this.input);
                console.log("this.input assigned!", this.input);
                break;
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
                this.design.style.visibility = "collapse";
                console.log("this.design assigned!", this.design);
                (global as any).design = this.design;
                // BrowseViewModel.evalContext.design = this.design;
                break;
            case "designButton":
                this.designButton = view as Button;
                this.designButton.text = "Design";
                console.log("this.designButton assigned!", this.designButton);
                break;
            case "output":
                view.style.fontFamily = "Courier New";
                view.style.fontSize = 16;
                this.output = view as TextView;
                console.log("this.output assigned!", this.output);
                // textView.on("textChange", (argstv) => {
                //     console.dir(argstv);
                // });
                break;
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
    
    // TODO: remove 'nativescript-keyboardshowing' plugin.
    onInputBlur(args) {
        // blur event will be triggered when the user leaves the TextField
        const textView: TextView = <TextView>args.object;
        console.log("onBlur event for: " + textView.id);

        /* Looks like dismissSoftInput() was never needed on this callback after all, because it's run implicitly?
         * Just that the 'show soft keyboard' option is a bit confusing in the Simulator.
         */
    }

    private setUpInputTextView(textView: TextView | TextField) {
        textView.on("textChange", (argstv) => {
            const value: string = (argstv as any).value as string;
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
                        if (keyed) {
                            if (incomplete === "") {
                                value = BrowseViewModel.evalInContext(
                                    `let own = []; let inherited = [];\n` +
                                    `for(let key in ${token}){\n` +
                                        `${token}.hasOwnProperty(key) ? own.push(key) : inherited.push(key);\n` +
                                    `}\n` +
                                    `let answer = { own: own, inherited: inherited }; answer`
                                );
                            }
                            else {
                                // TODO: check on global, and auto-complete constructor names
                                value = BrowseViewModel.evalInContext(
                                    `let own = []; let inherited = [];\n` +
                                    `for(let key in ${token}){\n` +
                                    `if(key.indexOf('${incomplete}') !== 0) continue;\n` +
                                        `${token}.hasOwnProperty(key) ? own.push(key) : inherited.push(key);\n` +
                                    `}\n` +
                                    `let answer = { own: own, inherited: inherited }; answer`
                                );
                            }
                            this.ownPropsValue = value.own.join(', ');
                            this.inheritedPropsValue = value.inherited.join(', ');
                        }
                        else {
                            if(lastIndex === -1){
                                value = BrowseViewModel.evalInContext(
                                    `let own = []; let inherited = [];\n` +
                                    `for(let key in global){\n` +
                                        `if(key.indexOf('${token}') !== 0) continue;\n` +
                                        `global.hasOwnProperty(key) ? own.push(key) : inherited.push(key);\n` +
                                    `}\n` +
                                    `let answer = { own: own, inherited: inherited }; answer`
                                );

                                this.ownPropsValue = value.own.join(', ');
                                this.inheritedPropsValue = value.inherited.join(', ');
                            } else {
                                this.ownPropsValue = "";
                                this.inheritedPropsValue = "";
                            }
                        }
                    }
                    catch (e) {
                        this.ownPropsValue = "";
                        this.inheritedPropsValue = "";
                    }
                }
                else {
                    this.ownPropsValue = "";
                    this.inheritedPropsValue = "";
                }
            }
            else {
                console.log("NO MATCH");
                this.ownPropsValue = "";
                this.inheritedPropsValue = "";
            }
        });
    }

}