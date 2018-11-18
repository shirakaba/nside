import { Observable } from "tns-core-modules/data/observable";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Page, View, Color } from "tns-core-modules/ui/page";
import { TextView } from "tns-core-modules/ui/text-view";
import { FlexboxLayout } from "tns-core-modules/ui/layouts/flexbox-layout/flexbox-layout";
import * as Clipboard from "nativescript-clipboard";

export class BrowseViewModel extends Observable {
    private input?: TextView;
    private output?: TextView;

    private _inputValue: string = "";
    get inputValue(): string { return this._inputValue; }
    set inputValue(value: string) {
        if (this._inputValue === value) return;
        this._inputValue = value;
        this.notifyPropertyChange('inputValue', value);
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

    run(){
        try {
            const value: any = eval(
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
            this.output!.style.color = new Color("green");
        } catch(e){
            this.output!.style.color = new Color("red");
            this.outputValue = e;
            console.error(e);
        }
    }

    static customStringify(v): string {
        const cache = new Set();
        return JSON.stringify(v, (key, value) => {
          if(typeof value === 'object' && value !== null){
            if(cache.has(value)) return; // Circular reference found, discard key
            // Store value in our set
            cache.add(value);
          }
          return value;
        }, 2);
      };

    // static customStringify2(v): string {
    //     try {
    //         return JSON.stringify(v, null, 2);
    //     } catch(e){
    //         return v + " [contains circular references]";
    //     }
    // };

    onTextViewLoaded(args){
        const textView: TextView = <TextView>args.object;
        textView.style.fontFamily = "Courier New";
        textView.style.fontSize = 16;

        switch(textView.id){
            case "input":
                this.input = textView;
                // textView.on("textChange", (argstv) => {
                //     console.dir(argstv);
                //     // this.outputValue = "";
                // });
                break;
            case "output":
                this.output = textView;
                // textView.on("textChange", (argstv) => {
                //     console.dir(argstv);
                // });
                break;
        }
    }
    
    onReturnPress(args) {
        // returnPress event will be triggered when user submits a value
        const textView: TextView = <TextView>args.object;
        // Gets or sets the placeholder text.
        console.log(textView.hint);
        // Gets or sets the input text.
        console.log(textView.text);
    
        // Gets or sets the soft keyboard type. Options: "datetime" | "phone" | "number" | "url" | "email"
        console.log(textView.keyboardType);
        // Gets or sets the soft keyboard return key flavor. Options: "done" | "next" | "go" | "search" | "send"
        console.log(textView.returnKeyType);
        // Gets or sets the autocapitalization type. Options: "none" | "words" | "sentences" | "allcharacters"
        console.log(textView.autocapitalizationType);
    
        // Gets or sets a value indicating when the text property will be updated.
        console.log(textView.updateTextTrigger);
        // Gets or sets whether the instance is editable.
        console.log(textView.editable);
        // Enables or disables autocorrection.
        console.log(textView.autocorrect);
        // Limits input to a certain number of characters.
        console.log(textView.maxLength);
    
        // setTimeout(() => {
        //     textView.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
        // }, 100);
        // textView.dismissSoftInput();
    }
    
    onInputFocus(args) {
        // focus event will be triggered when the users enters the TextField
        console.log("onFocus event");
    }
    
    onInputBlur(args) {
        // blur event will be triggered when the user leaves the TextField
        const textView: TextView = <TextView>args.object;
        // textView.dismissSoftInput();
        console.log("onBlur event");
    }
}
