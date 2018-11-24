import { ViewBase } from "tns-core-modules/ui/page/page";

// <Page navigatedTo="onNavigatedTo">
//   <StackLayout id="myStack">
//       <Label text="Tap the button" />
//       <Button text="TAP" tap="" />
//       <Label id="myLabel" text="" />
//   </StackLayout>
// </Page>

export class HelperFunctions {
    static printView(view: ViewBase, tabDepth: number = 0) {
        let buffer: string = "";
        view.eachChild((child) => {
            const opener = new Array(tabDepth).fill("  ").join('') + "<" + child.typeName + ">";
            buffer += opener + '\n';

            child.eachChild((subchild) => {
                buffer += HelperFunctions.printView(subchild, tabDepth + 1);
                return true;
            });

            const closer = new Array(tabDepth).fill("  ").join('') + "<" + child.typeName + "/>";
            buffer += closer + '\n';
            
            return true;
        });
        if(tabDepth === 0) console.log(buffer);
        return buffer;
    }
}