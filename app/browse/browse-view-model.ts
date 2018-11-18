import { Observable } from "tns-core-modules/data/observable";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Page, View } from "tns-core-modules/ui/page";
import { TextView } from "tns-core-modules/ui/text-view";
import { FlexboxLayout } from "tns-core-modules/ui/layouts/flexbox-layout/flexbox-layout";
import * as Clipboard from "nativescript-clipboard";

export class BrowseViewModel extends Observable {
    private textView?: TextView;

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
            const value: any = eval(this.inputValue);

            // const value = Function(this.textViewValue)();
            // const value = Function('"use strict";return (' + this.textViewValue + ')')();

            this.outputValue = value;
            console.log(value);
        } catch(e){
            console.error(e);
        }
    }

    onTextViewLoaded(args){
        const textView: TextView = <TextView>args.object;
        textView.style.fontFamily = "Courier New";
        textView.style.fontSize = 16;

        // switch(textView.id){
        //     case "input":
        //         textView.on("textChange", (argstv) => {
        //             console.dir(argstv);
        //             // this.outputValue = "";
        //         });
        //         break;
        //     case "output":
        //         textView.on("textChange", (argstv) => {
        //             console.dir(argstv);
        //         });
        //         break;
        // }
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
        //     textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
        // }, 100);
    }
    
    onFocus(args) {
        // focus event will be triggered when the users enters the TextField
        console.log("onFocus event");
    }
    
    onBlur(args) {
        // blur event will be triggered when the user leaves the TextField
        const textView: TextView = <TextView>args.object;
        // textField.dismissSoftInput();
        console.log("onBlur event");
    }
}
