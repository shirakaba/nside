import { ViewBase } from "tns-core-modules/ui/page/page";

// <Page navigatedTo="onNavigatedTo">
//   <StackLayout id="myStack">
//       <Label text="Tap the button" />
//       <Button text="TAP" tap="" />
//       <Label id="myLabel" text="" />
//   </StackLayout>
// </Page>

export function printView(view: ViewBase, tabDepth?: number) {
    if(typeof tabDepth === "undefined") tabDepth = 0;
    let buffer = "";
    view.eachChild((child) => {
        const opener = new Array(tabDepth).fill("  ").join('') + "<" + child.typeName;
        buffer += opener;

        let children = 0;
        child.eachChild((subchild) => {
            if(children === 0) buffer += ">\n";
            children++;
            buffer += printView(subchild, tabDepth + 1);
            return true;
        });
        if(children === 0){
            buffer += "/>\n";
        } else {
            const closer = new Array(tabDepth).fill("  ").join('') + "<" + child.typeName + "/>";
            buffer += closer + '\n';
        }
        
        return true;
    });
    if(tabDepth === 0) console.log(buffer);
    return buffer;
}