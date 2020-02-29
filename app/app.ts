import 'react-hot-loader'; // Must be imported before React and ReactNativeScript.
import * as React from "react";
import * as app from "@nativescript/core/application/application";

/* Controls react-nativescript log verbosity. true: all logs; false: only error logs. */
Object.defineProperty(global, '__DEV__', { value: false });
import * as ReactNativeScript from "react-nativescript";
import AppContainer from "./AppContainer";

(global as any).app = app;
(global as any).UINode = function UINode(child) {
	this.child = child;
	this.name = child.typeName;
	this.children = [];

	(child.eachChildView ? child.eachChildView : child.eachChild).bind(child)((subChild) => {
		this.children.push(new UINode(subChild));
		return true;
	});

	this.toString = function(tabDepth){
		if(typeof tabDepth === "undefined") tabDepth = 0;
		const tab = new Array(tabDepth).fill("  ").join('');

		let buffer = tab + "<" + this.name;
		buffer += (this.child.id ? (' id="' + this.child.id + '"') : "");
		
		if(this.children.length === 0){
			buffer += "/>\n"
		} else {
			buffer += ">\n";
			buffer += this.children.map((child) => child.toString(tabDepth + 1)).join("");
			buffer += tab + "</" + this.name + ">\n";
		}
		return buffer;
	}
};
app.on(app.uncaughtErrorEvent, function (args) {
    if (args.android) {
        // For Android applications, args.android is an NativeScriptError.
        console.log(" *** NativeScriptError *** : " + args.android);
        console.log(" *** StackTrace *** : " + args.android.stackTrace);
        console.log(" *** nativeException *** : " + args.android.nativeException);
    } else if (args.ios) {
		// For iOS applications, args.ios is NativeScriptError.
		
		console.log("NativeScriptError: " + args.ios);
		/* Showing an alert dialogue has no effect, as the app unavoidably closes. */
    }
});

export const rootRef: React.RefObject<any> = React.createRef<any>();

ReactNativeScript.start(
    React.createElement(
        AppContainer,
        {
            forwardedRef: rootRef
        },
        null
    ),
    /* This ref MUST match the ref that you pass into the base component of your app container. */
    rootRef
);

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
