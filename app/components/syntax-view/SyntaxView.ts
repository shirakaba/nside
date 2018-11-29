import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";
import { SyntaxHighlighter, CodeAttributedStringWrapper } from "nativescript-syntax-highlighter";

/* 
https://docs.nativescript.org/plugins/ui-plugin-custom 
https://moduscreate.com/blog/custom-components-in-nativescript/
https://docs.nativescript.org/core-concepts/navigation
https://docs.nativescript.org/ui/ns-ui-widgets/placeholder
*/
export function creatingView(args) {
    const container: StackLayout = args.object;
    console.log("container", container);
    const uiView: UIView = container.ios.view;
    console.log("uiView", uiView);

    const codeAttributedStringWrapper: CodeAttributedStringWrapper = new CodeAttributedStringWrapper();

    codeAttributedStringWrapper.setThemeTo("Pojoaque"); // Will get shifted to lowercase on native side anyway.

    const textStorage = codeAttributedStringWrapper._codeAttributedString;
    textStorage.language = "javascript".toLowerCase();
    const layoutManager: NSLayoutManager = NSLayoutManager.alloc().init();
    textStorage.addLayoutManager(layoutManager);

    const textContainer = NSTextContainer.alloc().initWithSize(uiView.frame.size);
    layoutManager.addTextContainer(textContainer);

    const textView: UITextView = UITextView.alloc().initWithFrameTextContainer(uiView.bounds, textContainer);
    
    textView.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
    textView.autocorrectionType = UITextAutocorrectionType.No;
    textView.autocapitalizationType = UITextAutocapitalizationType.None;
    textView.textColor = UIColor.alloc().initWithWhiteAlpha(0.8, 1.0);

    /* https://docs.nativescript.org/ui/ns-ui-widgets/placeholder */
    // uiView.addSubview(textView);
    args.view = textView;
}