import { Observable } from "tns-core-modules/data/observable";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Page, View } from "tns-core-modules/ui/page";
import { TextView } from "tns-core-modules/ui/text-view";
import { FlexboxLayout } from "tns-core-modules/ui/layouts/flexbox-layout/flexbox-layout";
import * as Clipboard from "nativescript-clipboard";

export class BrowseViewModel extends Observable {
    private textView?: TextView;

    private _textViewValue: string = "";
    get textViewValue(): string { return this._textViewValue; }
    set textViewValue(value: string) {
        if (this._textViewValue === value) return;
        this._textViewValue = value;
        this.notifyPropertyChange('textViewValue', value);
    }

    constructor() {
        super();
    }

    clear() {
        this.textViewValue = "";
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
        Clipboard.getText()
        .then((script: string) => {
            console.log(`[CLIPBOARD] ` + script);
            eval(script);
        })
        .catch((e) => {
            console.error(e);
        });
    }

    onTextViewLoaded(args){
        const textView: TextView = <TextView>args.object;
        textView.style.fontFamily = "Courier New";
        textView.style.fontSize = 16;

        textView.on("textChange", (argstv) => {
            console.dir(argstv);
        });
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
