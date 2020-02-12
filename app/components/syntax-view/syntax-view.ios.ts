import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";
import { CodeAttributedStringWrapper } from "nativescript-syntax-highlighter/code-attributed-string-wrapper.ios";
import { SyntaxViewBase, languageProperty } from "./syntax-view.common";

// /* 
// https://docs.nativescript.org/plugins/ui-plugin-custom 
// https://moduscreate.com/blog/custom-components-in-nativescript/
// https://docs.nativescript.org/core-concepts/navigation
// https://docs.nativescript.org/ui/ns-ui-widgets/placeholder
// */
// export function createView(args): UITextView {
//     const container: StackLayout = args.object;
//     console.log("container", container);
//     const uiView: UIView = container.ios.view;
//     console.log("uiView", uiView);

//     const codeAttributedStringWrapper: CodeAttributedStringWrapper = new CodeAttributedStringWrapper();

//     codeAttributedStringWrapper.setThemeTo("Pojoaque"); // Will get shifted to lowercase on native side anyway.

//     const textStorage = codeAttributedStringWrapper._codeAttributedString;
//     textStorage.language = "javascript".toLowerCase();
//     const layoutManager: NSLayoutManager = NSLayoutManager.alloc().init();
//     textStorage.addLayoutManager(layoutManager);

//     const textContainer = NSTextContainer.alloc().initWithSize(uiView.frame.size);
//     layoutManager.addTextContainer(textContainer);

//     const textView: UITextView = UITextView.alloc().initWithFrameTextContainer(uiView.bounds, textContainer);
    
//     textView.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
//     textView.autocorrectionType = UITextAutocorrectionType.No;
//     textView.autocapitalizationType = UITextAutocapitalizationType.None;
//     textView.textColor = UIColor.alloc().initWithWhiteAlpha(0.8, 1.0);

//     /* https://docs.nativescript.org/ui/ns-ui-widgets/placeholder */
//     // uiView.addSubview(textView);
//     // args.view = textView;

//     return textView;
// }

export class SyntaxView extends SyntaxViewBase {
    nativeView: UITextView;
    textStorage: CodeAttributedString;

    public createNativeView(): Object {
        console.log(`createNativeView() called without any args`);

        const codeAttributedStringWrapper: CodeAttributedStringWrapper = new CodeAttributedStringWrapper();


        codeAttributedStringWrapper.setThemeTo("Pojoaque"); // Will get shifted to lowercase on native side anyway.
    
        const textStorage = codeAttributedStringWrapper._codeAttributedString;
        textStorage.language = "javascript".toLowerCase();
        const layoutManager: NSLayoutManager = NSLayoutManager.alloc().init();
        textStorage.addLayoutManager(layoutManager);
        this.textStorage = textStorage;
    
        // const textContainer = NSTextContainer.alloc().initWithSize(uiView.frame.size);
        const textContainer = NSTextContainer.alloc().initWithSize(CGRectMake(0, 0, 300, 300).size);
        layoutManager.addTextContainer(textContainer);
    
        // const textView: UITextView = UITextView.alloc().initWithFrameTextContainer(uiView.bounds, textContainer);
        const textView: UITextView = UITextView.alloc().initWithFrameTextContainer(CGRectMake(0, 0, 300, 300), textContainer);
        
        textView.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
        textView.autocorrectionType = UITextAutocorrectionType.No;
        textView.autocapitalizationType = UITextAutocapitalizationType.None;
        textView.textColor = UIColor.alloc().initWithWhiteAlpha(0.8, 1.0);

        this.nativeView = textView;

        return textView;
    }

    /**
     * Initializes properties/listeners of the native view.
     */
    initNativeView(): void {
        // Attach the owner to nativeView.
        // When nativeView is tapped we get the owning JS object through this field.
        (<any>this.nativeView).owner = this;
        super.initNativeView();
    }

    /**
     * Clean up references to the native view and resets nativeView to its original state.
     * If you have changed nativeView in some other way except through setNative callbacks
     * you have a chance here to revert it back to its original state 
     * so that it could be reused later.
     */
    disposeNativeView(): void {
        // Remove reference from native view to this instance.
        (<any>this.nativeView).owner = null;

        // If you want to recycle nativeView and have modified the nativeView 
        // without using Property or CssProperty (e.g. outside our property system - 'setNative' callbacks)
        // you have to reset it to its initial state here.
        super.disposeNativeView();
    }

    [languageProperty.setNative](value: string) {
        this.textStorage.language = value.toLowerCase();
    }

    // [myOpacityProperty.getDefault](): number {
    //     return this.nativeView.getAlpha()
    // }

    // // set opacity to the native view.
    // [myOpacityProperty.setNative](value: number) {
    //     return this.nativeView.setAlpha(value);
    // }
}