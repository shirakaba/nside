// eachChild = ScrollView, which is a View
// eachChildView = TextView, which is a ViewBase
function printView(view, tabDepth) {
    if(typeof tabDepth === "undefined") tabDepth = 0;
    let buffer = "";

    // buffer += "[" + (typeof view.eachChildView !== "undefined") + "]";

    view.eachChild((child) => {
    // view.eachChild((child) => {
        const opener = new Array(tabDepth).fill("  ").join('') + "<" + child.typeName;
        buffer += opener;

        // buffer += "[" + (typeof child.eachChildView !== "undefined") + "]";

        let children = 0;
        child.eachChild((subchild) => {
            if(children === 0) buffer += ">\n";
            children++;
            // isView check
            // buffer += "[" + (typeof subchild.eachChildView !== "undefined") + "]";
            buffer += printView(subchild, tabDepth + 1);
            return true;
        });

        if(children === 0){
            if(child.eachChildView){
                child.eachChildView((subchild) => {
                    if(children === 0) buffer += ">\n";
                    children++;
                    buffer += printView(subchild, tabDepth + 2);
                    return true;
                });
            }
        }

        if(children === 0){
            buffer += "/>\n";
        } else {
            const closer = new Array(tabDepth).fill("  ").join('') + "<" + child.typeName + "/>";
            buffer += closer + '\n';
        }
        
        return true;
    });

    // if(view.eachChildView){
    //     buffer += "[ECV]";
    // } else {
    //     buffer += "[EC]";
    // }

    if(view.eachChildView) view.eachChildView((child) => {
    // view.eachChild((child) => {
        const opener = new Array(tabDepth).fill("  ").join('') + "<" + child.typeName;
        buffer += opener;

        // buffer += "[" + (typeof child.eachChildView !== "undefined") + "]";

        let children = 0;
        child.eachChild((subchild) => {
            if(children === 0) buffer += ">\n";
            children++;
            // isView check
            // buffer += "[" + (typeof subchild.eachChildView !== "undefined") + "]";
            buffer += printView(subchild, tabDepth + 1);
            return true;
        });

        if(children === 0){
            if(child.eachChildView){
                child.eachChildView((subchild) => {
                    if(children === 0) buffer += ">\n";
                    children++;
                    buffer += printView(subchild, tabDepth + 2);
                    return true;
                });
            }
        }

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
global.printView = printView;
printView(app.getRootView());