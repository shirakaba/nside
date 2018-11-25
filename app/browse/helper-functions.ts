// import { View, ViewBase } from "tns-core-modules/ui/page/page";

// // <Page navigatedTo="onNavigatedTo">
// //   <StackLayout id="myStack">
// //       <Label text="Tap the button" />
// //       <Button text="TAP" tap="" />
// //       <Label id="myLabel" text="" />
// //   </StackLayout>
// // </Page>

// export function printView(view: View|ViewBase, tabDepth?: number) {
//     if(typeof tabDepth === "undefined") tabDepth = 0;
//     let buffer = "";
//     // const fn = ((view as View).eachChildView ? (view as View).eachChildView : view.eachChild);
//     view.eachChild((child) => {
//         const opener = new Array(tabDepth).fill("  ").join('') + "<" + child.typeName;
//         buffer += opener;

//         let children = 0;
//         // const innerFn = ((child as View).eachChildView ? (child as View).eachChildView : child.eachChild);
//         child.eachChild((subchild) => {
//             if(children === 0) buffer += ">\n";
//             children++;
//             buffer += printView(subchild, tabDepth + 1);
//             return true;
//         });
//         if(children === 0){
//             buffer += "/>\n";
//         } else {
//             const closer = new Array(tabDepth).fill("  ").join('') + "<" + child.typeName + "/>";
//             buffer += closer + '\n';
//         }
        
//         return true;
//     });
//     if(tabDepth === 0) console.log(buffer);
//     return buffer;
// }

// function UINode(child) {
// 	this.child = child;
// 	this.name = child.typeName;
// 	this.children = [];

// 	(child.eachChildView ? child.eachChildView : child.eachChild).bind(child)((subChild) => {
// 		this.children.push(new UINode(subChild));
// 		return true;
// 	});

// 	this.toString = function(tabDepth){
// 		if(typeof tabDepth === "undefined") tabDepth = 0;
// 		const tab = new Array(tabDepth).fill("  ").join('');

// 		let buffer = tab + "<" + this.name;
// 		buffer += (this.child.id ? (' id="' + this.child.id + '"') : "");
		
// 		if(this.children.length === 0){
// 			buffer += "/>\n"
// 		} else {
// 			buffer += ">\n";
// 			buffer += this.children.map((child) => child.toString(tabDepth + 1)).join("");
// 			buffer += tab + "</" + this.name + ">\n"
// 		}
// 		return buffer;
// 	}
// }
// new UINode(app.getRootView()).toString();