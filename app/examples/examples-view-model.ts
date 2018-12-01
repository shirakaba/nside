import { Observable } from "tns-core-modules/data/observable";
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
`
            },
            {
                name: "Print view hierarchy",
                description:
`/*
UINode is a class I've injected for this purpose. It builds a tree of Views and ViewBases, and stringifies as XML.
    
You can inspect the implementation using:
    
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
                description: `design.ios.backgroundColor = UIColor.alloc().initWithRedGreenBlueAlpha(1,1,1,1);`
            },
            {
                name: "Item 4",
                description: "Description for Item 4"
            },
            {
                name: "Item 5",
                description: "Description for Item 5"
            },
            {
                name: "Item 6",
                description: "Description for Item 6"
            },
            {
                name: "Item 7",
                description: "Description for Item 7"
            },
            {
                name: "Item 8",
                description: "Description for Item 8"
            },
            {
                name: "Item 9",
                description: "Description for Item 9"
            },
            {
                name: "Item 10",
                description: "Description for Item 10"
            },
            {
                name: "Item 11",
                description: "Description for Item 11"
            },
            {
                name: "Item 12",
                description: "Description for Item 12"
            },
            {
                name: "Item 13",
                description: "Description for Item 13"
            },
            {
                name: "Item 14",
                description: "Description for Item 14"
            },
            {
                name: "Item 15",
                description: "Description for Item 15"
            },
            {
                name: "Item 16",
                description: "Description for Item 16"
            }
        );
    }
}
