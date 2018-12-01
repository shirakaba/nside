import { EventData, View } from "tns-core-modules/ui/core/view";
import { NavigatedData, Page, ContentView } from "tns-core-modules/ui/page";
import { Item } from "../shared/item";
import { CodeAttributedStringWrapper } from "nativescript-syntax-highlighter";
import { MyTextView, MyUITextViewDelegateImpl } from "~/MyUITextViewDelegateImpl.ios";

export function onNavigatingTo(args: NavigatedData) {
    const page = args.object as Page;
    const item = args.context as Item;
    page.bindingContext = item;
}

export function onBackButtonTap(args: EventData) {
    const view = args.object as View;
    const page = view.page as Page;

    page.frame.goBack();
}

export function onPageLoaded(args) {
    const page: Page = args.object;
    console.log("ON PAGE LOADED. page.bindingContext:", page.bindingContext);
    // console.log("ON PAGE LOADED. page._context:", page._context);

    const cv: ContentView = page.getViewById<ContentView>("SyntaxView");
    insertSyntaxView(cv);
    textView!.text = page.bindingContext.description as string;
}

let textView: UITextView | undefined;
let myTextView: MyTextView | undefined;
let _myUITextViewDelegate: MyUITextViewDelegateImpl | undefined;

export function insertSyntaxView(container: ContentView){
    console.log("INSERT SYNTAX VIEW");
    const uiView: UIView = container.ios as UIView;
    const codeAttributedStringWrapper: CodeAttributedStringWrapper = new CodeAttributedStringWrapper();

    const textStorage = codeAttributedStringWrapper._codeAttributedString;
    textStorage.language = "javascript".toLowerCase();
    const layoutManager: NSLayoutManager = NSLayoutManager.alloc().init();
    textStorage.addLayoutManager(layoutManager);

    const textContainer = NSTextContainer.alloc().initWithSize(uiView.frame.size);
    layoutManager.addTextContainer(textContainer);

    textView = UITextView.alloc().initWithFrameTextContainer(uiView.bounds, textContainer);
    // textView.text = 
    
    textView.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
    textView.autocorrectionType = UITextAutocorrectionType.No;
    textView.autocapitalizationType = UITextAutocapitalizationType.None;
    textView.textColor = UIColor.alloc().initWithWhiteAlpha(0.8, 1.0);
    
    codeAttributedStringWrapper.setThemeTo("Pojoaque"); // Will get shifted to lowercase on native side anyway.
    textView.backgroundColor = UIColor.alloc().initWithRedGreenBlueAlpha(25/255, 25/255, 25/255, 1.0);

    myTextView = new MyTextView(textView);

    _myUITextViewDelegate = MyUITextViewDelegateImpl.initWithOwner(new WeakRef(myTextView!));
    // _myUITextViewDelegate.onTextViewDidChange = (textView: UITextView) => {
    //     this.onInputTextChange(textView.text);
    // }
    myTextView!.ios.delegate = _myUITextViewDelegate;

    container.ios.addSubview(textView);
}