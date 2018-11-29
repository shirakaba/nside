import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";
import { SyntaxHighlighter, CodeAttributedStringWrapper } from "nativescript-syntax-highlighter";

export function onLoad(args) {
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

    uiView.addSubview(textView);
}