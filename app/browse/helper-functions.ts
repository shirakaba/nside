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
        view.eachChild((child) => {
            const opener = new Array(tabDepth).fill("  ").join('') + "<" + child.typeName + ">";
            console.log(opener);

            child.eachChild((subchild) => {
                HelperFunctions.printView(subchild, tabDepth + 1);
                return true;
            });

            const closer = new Array(tabDepth).fill("  ").join('') + "<" + child.typeName + "/>";
            console.log(closer);
            
            return true;
        });
    }
}