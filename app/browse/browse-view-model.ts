import { Observable } from "tns-core-modules/data/observable";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Page, View } from "tns-core-modules/ui/page";
import { TextField } from "tns-core-modules/ui/text-field";
import { FlexboxLayout } from "tns-core-modules/ui/layouts/flexbox-layout/flexbox-layout";
import * as Clipboard from "nativescript-clipboard";

export class BrowseViewModel extends Observable {
    private textField?: TextField;
    private _textFieldValue: string = "";

    get textFieldValue(): string { return this._textFieldValue; }
    set textFieldValue(value: string) {
        if (this._textFieldValue === value) return;
        this._textFieldValue = value;
        this.notifyPropertyChange('textFieldValue', value);
    }

    constructor() {
        super();
    }

    clear() {
        this.textFieldValue = "";
    }

    navigatingTo(args) {
        console.log("navigatingTo();");
        const page: Page = <Page> args.object;
        page.bindingContext = this;
        console.log(`page.content:`, page.content);
        const flexbox: FlexboxLayout = page.content as FlexboxLayout;
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
            console.log(`[CLIPBOARD] ` + script);
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
}
