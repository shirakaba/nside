import { Observable } from "@nativescript/core";
import { Item } from "./shared/item";

export class ExamplesViewModel extends Observable {
    items: Array<Item>;

    constructor() {
        super();

        this.items = new Array<Item>(
            {
                name: "Get references to app components",
                description:
`/*
The below examples work in global scope.
*/


/*
A reference to the App object.
*/
app


/*
A reference to the root view.
*/
app.getRootView()


/*
A plain UIView on the coding tab, which overlaps the same area as the console. You must click the 'Design' button to reveal it, and the 'Debug' button to dismiss it.
*/
design

/*
References to the 'canvas' tab. These variables will be undefined until you visit the canvas tab to allow them to initialise.
*/
// The whole NativeScript Page instance: includes the ActionBar.
canvasPage

// The 'content' property of the NativeScript Page instance (the GridLayout).
canvas

// The native UIView managed by that GridLayout.
canvas.ios
`
            },
            {
                name: "Print view hierarchy",
                description:
`/*
UINode is a class I've injected for this purpose. It builds a tree of Views and ViewBases, and stringifies as XML. Note that the order of siblings is non-determinate (sorry) so don't rely on it too literally. I have a few complaints about NativeScript's view iterators...
    
You can inspect the implementation, and build a better version, using:
    
  UINode.toString();
 */

/**
@param treetop <View|ViewBase>: the top of the node tree to be built.

@returns: An object representing the hierarchy of Views/ViewBases.
 */
new UINode(app.getRootView());


/**
@param startingTabDepth <number?>:
       Should be 0 (Is incremented during recursion).
       Defaults to 0.
@param includingId <boolean?>:
       Display 'id' values.
       Defaults to false.
@returns: An XML-formatted tag hierarchy.
*/
new UINode(app.getRootView()).toXML();
new UINode(app.getRootView()).toXML(0, true);
`
            },
            {
                name: "Change UIView backgroundColor",
                description:
`/*
Apply any of these UIColors to a native view, such as 'design', like so:
*/
let colour = UIColor.alloc().initWithRedGreenBlueAlpha(0,1,0,1);
design.nativeView.backgroundColor = colour;

/* OPAQUE */

// White
let colour = UIColor.alloc().initWithRedGreenBlueAlpha(1,1,1,1);

// Black
let colour = UIColor.alloc().initWithRedGreenBlueAlpha(0,0,0,1);

// Red
let colour = UIColor.alloc().initWithRedGreenBlueAlpha(1,0,0,1);

// Yellow
let colour = UIColor.alloc().initWithRedGreenBlueAlpha(1,1,0,1);

// Green
let colour = UIColor.alloc().initWithRedGreenBlueAlpha(0,1,0,1);

// Cyan
let colour = UIColor.alloc().initWithRedGreenBlueAlpha(0,1,1,1);

// Blue
let colour = UIColor.alloc().initWithRedGreenBlueAlpha(0,0,1,1);

// Magenta
let colour = UIColor.alloc().initWithRedGreenBlueAlpha(1,0,1,1);

// Grey
let colour = UIColor.alloc().initWithRedGreenBlueAlpha(128/255,128/255,128/255,1);


/* TRANSPARENT */

// White
let colour = UIColor.alloc().initWithRedGreenBlueAlpha(1,1,1,0);

// Black
let colour = UIColor.alloc().initWithRedGreenBlueAlpha(0,0,0,0);

// Red
let colour = UIColor.alloc().initWithRedGreenBlueAlpha(1,0,0,0);

// Yellow
let colour = UIColor.alloc().initWithRedGreenBlueAlpha(1,1,0,0);

// Green
let colour = UIColor.alloc().initWithRedGreenBlueAlpha(0,1,0,0);

// Cyan
let colour = UIColor.alloc().initWithRedGreenBlueAlpha(0,1,1,0);

// Blue
let colour = UIColor.alloc().initWithRedGreenBlueAlpha(0,0,1,0);

// Magenta
let colour = UIColor.alloc().initWithRedGreenBlueAlpha(1,0,1,0);

// Grey
let colour = UIColor.alloc().initWithRedGreenBlueAlpha(128/255,128/255,128/255,0);
`
            },
            {
                name: "Remove subviews",
                description: 
`
/* Removing children from NativeScript views */
// 1st method (for convenience)
canvas.removeChildren();

// 2nd method (allows filtering)
while(canvas.getChildrenCount() > 0){
    canvas.removeChild(canvas._subViews[0]);
}


/* Removing children from native views */
// 1st method (C-style iteration)
while(canvas.ios.subviews.count > 0){
    canvas.ios.subviews[0].removeFromSuperview();
}

// 2nd method ('subviews' has a 'firstObject' convenience accessor)
let first;
while(first = canvas.ios.subviews.firstObject){
    first.removeFromSuperview();
}
`
            },
            {
                name: "Add native views",
                description:
`/*
Fill the 'design' UIView with one UIView:
*/
const uv = UIView.alloc().initWithFrame(design.ios.bounds);
uv.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
uv.translatesAutoresizingMaskIntoConstraints = true;
uv.backgroundColor = UIColor.alloc().initWithRedGreenBlueAlpha(0,0,1,1);
design.ios.addSubview(uv);


/*
Fill the 'design' UIView with a UIStackView:
*/
const sv = UIStackView.alloc().initWithFrame(design.ios.bounds);
sv.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
sv.translatesAutoresizingMaskIntoConstraints = true;
sv.axis = UILayoutConstraintAxis.Vertical;
sv.alignment = UIStackViewAlignment.Center;
sv.distribution = UIStackViewDistribution.FillProportionally;
sv.spacing = 8.0;
sv.layoutMargins = UIEdgeInsetsMake(8, 8, 8, 8);
sv.isLayoutMarginsRelativeArrangement = true;

for(let i = 0, x = 0, y = 0, w = 50, h = 50; i < 4; i++){
    w += 10;
    h += 10;

    const frame = CGRectMake(x, y, w, h);
    const uv = UIView.alloc().initWithFrame(frame);

    /* Here we set up the intrinsicContentSize to support UIStackViewDistribution.FillProportionally */
    uv.heightAnchor.constraintEqualToConstant(h).active = true;
    uv.widthAnchor.constraintEqualToConstant(w).active = true;

    uv.backgroundColor = UIColor.alloc().initWithRedGreenBlueAlpha(0,1/(i+1),0,1);
    sv.addArrangedSubview(uv);
}
design.ios.addSubview(sv);


/*
Populate the 'design' UIView with four UIViews:
*/
for(let i = 0, x = 10, y = 10, w = 50, h = 50; i < 4; i++){
    x += (i * 60);
    const uv = UIView.alloc().initWithFrame(CGRectMake(x, y, w, h));
    uv.backgroundColor = UIColor.alloc().initWithRedGreenBlueAlpha(0,1/(i+1),0,1);
    design.ios.addSubview(uv);
}

`
            },
            {
                name: "Scope/context",
                description: 
`/*
Regrettably, NS:IDE doesn't work exactly like familiar web browser consoles. Every command that you run is passed into eval() and the scope is not re-usable (despite my best efforts). This means that the following: 
*/
let x = 5;

/* ... Will only be available within the snippet of code that you run. */

/* If you DO want variables to persist between code runs, you'll have to assign them to global, unfortunately! */
global.x = 5;
`
            },
            {
                name: "Auto-completion",
                description:
`/*
My auto-completion implementation is very makeshift (incomplete and buggy, but better than nothing). It works by actually evaluating the script while you are writing it, then presenting the keys on that object to you. This means that you may be instantiating a native object and throwing it away whilst writing... So be careful of memory leaks.

Incidentally, if you have a keyboard connected, you can press tab to fill in the first auto-complete suggestion.

KNOWN BUGS
- that memory leak thing
- it operates even during comments
- it only works on the last line that you've typed
- it may not work if you have comments above the line that you're typing.
*/
`
            },
            // {
            //     name: "Item 7",
            //     description: "Description for Item 7"
            // },
            // {
            //     name: "Item 8",
            //     description: "Description for Item 8"
            // },
            // {
            //     name: "Item 9",
            //     description: "Description for Item 9"
            // },
            // {
            //     name: "Item 10",
            //     description: "Description for Item 10"
            // },
            // {
            //     name: "Item 11",
            //     description: "Description for Item 11"
            // },
            // {
            //     name: "Item 12",
            //     description: "Description for Item 12"
            // },
            // {
            //     name: "Item 13",
            //     description: "Description for Item 13"
            // },
            // {
            //     name: "Item 14",
            //     description: "Description for Item 14"
            // },
            // {
            //     name: "Item 15",
            //     description: "Description for Item 15"
            // },
            // {
            //     name: "Item 16",
            //     description: "Description for Item 16"
            // }
        );
    }
}
