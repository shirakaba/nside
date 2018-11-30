
import { ScrollEventData } from "tns-core-modules/ui/scroll-view";
import { TextView as TextViewDefinition } from "tns-core-modules/ui/text-view";
import {
    EditableTextBase, editableProperty, hintProperty, textProperty, colorProperty, placeholderColorProperty,
    borderTopWidthProperty, borderRightWidthProperty, borderBottomWidthProperty, borderLeftWidthProperty,
    paddingTopProperty, paddingRightProperty, paddingBottomProperty, paddingLeftProperty,
    Length, Color, layout, CSSType, // _updateCharactersInRangeReplacementString
} from "tns-core-modules/ui/editable-text-base";

import { profile } from "tns-core-modules/profiling";
import { TextView } from "tns-core-modules/ui/text-view";

export class MyTextView extends TextView {
    constructor(private textView: UITextView){
        super();
        this.nativeView = this.textView;
    }

    createNativeView(){
        console.log(`createNativeView() called! this.textView:`, this.textView);
        console.log(`createNativeView() called! this.nativeTextViewProtected:`, this.nativeTextViewProtected);
        console.log(`createNativeView() called! this.nativeView:`, this.nativeView);
        return this.textView;
    }
}

export class MyUITextViewDelegateImpl extends NSObject implements UITextViewDelegate {
    public static ObjCProtocols = [UITextViewDelegate];

    private _owner: WeakRef<TextView>;
    // https://github.com/NativeScript/NativeScript/issues/1404#issuecomment-182402358
    private _originalDelegate: UITextViewDelegate;

    // public static initWithOwner(owner: WeakRef<TextView>): MyUITextViewDelegateImpl {
    public static initWithOwner(owner: WeakRef<TextView>): MyUITextViewDelegateImpl {
        console.log('INITED');
        const impl = <MyUITextViewDelegateImpl>MyUITextViewDelegateImpl.new();
        impl._owner = owner;
        impl._originalDelegate = <UITextViewDelegate>(<UITextView>owner.get().ios).delegate;
        return impl;
    }

    public textViewShouldBeginEditing(textView: UITextView): boolean {
        console.log(`textViewShouldBeginEditing`);
        return this._originalDelegate.textViewShouldBeginEditing(textView);
    }

    public textViewDidBeginEditing(textView: UITextView) {
        console.log(`textViewDidBeginEditing`);
        this._originalDelegate.textViewDidBeginEditing(textView);
    }

    public textViewDidEndEditing(textView: UITextView) {
        console.log(`textViewDidEndEditing`);
        this._originalDelegate.textViewDidEndEditing(textView);
    }

    public textViewDidChange(textView: UITextView) {
        console.log(`textViewDidChange`);
        this._originalDelegate.textViewDidChange(textView);
    }

    public textViewShouldChangeTextInRangeReplacementText(textView: UITextView, range: NSRange, text: string): boolean {
        console.log(`MyUITextViewDelegateImpl.textViewShouldChangeTextInRangeReplacementText(${text})`);
        if (text === "\n") {
            console.log(`textView.resignFirstResponder();`);
            textView.resignFirstResponder();
            return false;
        }
        return true;
    }
}