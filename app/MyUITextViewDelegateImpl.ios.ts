
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

export class MyUITextViewDelegateImpl extends NSObject implements UITextViewDelegate {
    public static ObjCProtocols = [UITextViewDelegate];

    private _owner: WeakRef<TextView>;
    // https://github.com/NativeScript/NativeScript/issues/1404#issuecomment-182402358
    private _originalDelegate: UITextViewDelegate;

    // public static initWithOwner(owner: WeakRef<TextView>): MyUITextViewDelegateImpl {
    public static initWithOwner(owner: WeakRef<TextView>): MyUITextViewDelegateImpl {
        const impl = <MyUITextViewDelegateImpl>MyUITextViewDelegateImpl.new();
        impl._owner = owner;
        impl._originalDelegate = <UITextViewDelegate>(<UITextView>owner.get().ios).delegate;
        return impl;
    }

    // public textViewShouldBeginEditing(textView: UITextView): boolean {
    //     const owner = this._owner.get();
    //     if (owner) {
    //         owner.showText();
    //     }

    //     return true;
    // }

    // public textViewDidBeginEditing(textView: UITextView): void {
    //     const owner = this._owner.get();
    //     if (owner) {
    //         owner._isEditing = true;
    //         owner.notify({ eventName: TextView.focusEvent, object: owner });
    //     }
    // }

    // public textViewDidEndEditing(textView: UITextView) {
    //     const owner = this._owner.get();
    //     if (owner) {
    //         if (owner.updateTextTrigger === "focusLost") {
    //             textProperty.nativeValueChange(owner, textView.text);
    //         }

    //         owner._isEditing = false;
    //         owner.dismissSoftInput();
    //         owner._refreshHintState(owner.hint, textView.text);
    //     }
    // }

    public textViewDidChange = (textView: UITextView) => {
        console.log(`textViewDidChange!`);
        const owner = this._owner.get();
        if (owner) {
            if (owner.updateTextTrigger === "textChanged") {
                textProperty.nativeValueChange(owner, textView.text);
            }
            owner.requestLayout();
        }
    }

    // public textViewShouldChangeTextInRangeReplacementText(textView: UITextView, range: NSRange, replacementString: string): boolean {
    //     const owner = this._owner.get();
    //     if (owner) {
    //         const delta = replacementString.length - range.length;
    //         if (delta > 0) {
    //             if (textView.text.length + delta > owner.maxLength) {
    //                 return false;
    //             }
    //         }

    //         if (owner.formattedText) {
    //             _updateCharactersInRangeReplacementString(owner.formattedText, range.location, range.length, replacementString);
    //         }
    //     }

    //     return true;
    // }

    // public scrollViewDidScroll(sv: UIScrollView): void {
    //     const owner = this._owner.get();
    //     if (owner) {
    //         const contentOffset = owner.nativeViewProtected.contentOffset;
    //         owner.notify(<ScrollEventData>{
    //             object: owner,
    //             eventName: "scroll",
    //             scrollX: contentOffset.x,
    //             scrollY: contentOffset.y
    //         });
    //     }
    // }
}