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
            let opener = new Array(tabDepth).fill("  ").join('') + "<" + child.typeName;
            // console.log(opener);

            let children = 0;
            let contents = "";

            child.eachChild((subchild) => {
                children++;
                contents += HelperFunctions.printView(subchild, tabDepth + 1);
                return true;
            });

            if(children === 0){
                opener += "/>"
                console.log(opener);
                console.log(contents);
            } else {
                opener += ">"
                console.log(opener);
                console.log(contents);
                const closer = new Array(tabDepth).fill("  ").join('') + "<" + child.typeName + "/>";
                console.log(closer);
            }
            
            return true;
        });

    }
}