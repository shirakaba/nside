interface OnSyntaxViewTextChangeArgs {
    text: string,
    ownProps: string[],
    inheritedProps: string[],
    suggestedText: string,
    ownPropsText: string,
    inheritedPropsText: string,
    evalInContext: (str: string) => any,
}

function makeBestSuggestion(
    ownProps: string[],
    inheritedProps: string[],
): string
{
    const firstOwnProp = ownProps.length ? ownProps[0] : "";
    const firstInheritedProp = inheritedProps.length ? inheritedProps[0] : "";
    return firstOwnProp || firstInheritedProp;
}

export function onSyntaxViewTextChange({
    text,
    ownProps,
    inheritedProps,
    suggestedText,
    ownPropsText,
    inheritedPropsText,
    evalInContext,
}: OnSyntaxViewTextChangeArgs) {
    // this.state.lastText = text;

    const payload = {
        ownProps,
        inheritedProps,
        suggestedText,
        ownPropsText,
        inheritedPropsText,
    };

    const splitOnLines: string[] = text.split('\n');
    let finalLine: string = splitOnLines.length > 1 ? splitOnLines.slice(-1)[0] : splitOnLines[0];
    const splitOnWhitespace: string[] = text.split(' ');
    finalLine = splitOnWhitespace.length > 1 ? splitOnWhitespace.slice(-1)[0] : splitOnWhitespace[0];
    // console.log("splitOnLines: " + splitOnLines);
    // console.log("finalLine: " + finalLine);
    if (typeof finalLine !== "undefined" && finalLine !== "") {
        const lastIndex: number = finalLine.lastIndexOf(".");
        const token: string = lastIndex > -1 ? finalLine.slice(0, lastIndex) : finalLine;
        const incomplete: string = lastIndex > -1 ? finalLine.slice(lastIndex + ".".length) : "";
        // console.log("lastIndex: " + lastIndex + "; token: " + token + "; incomplete: " + incomplete);
        // Object.keys(global).forEach((key) => console.log(key));
        // for(let key in global){ console.log(key); }
        if (token !== "") {
            try {
                const keyed: boolean = evalInContext(`typeof ${token} === "object" && ${token} !== null;`);
                let value: {
                    own: string[];
                    inherited: string[];
                };
                const instantiateOwnInherited: string = `let own = []; let inherited = [];`;
                const returnAnswer: string = `let answer = { own: own, inherited: inherited }; answer`;

                if (keyed) {
                    // console.log("KEYED");
                    if (incomplete === "") {
                        // Takes a long time
                        // console.log("WAIT AHEAD");
                        value = evalInContext(
                            [
                                instantiateOwnInherited,
                                `let __NSIDE_instance__ = ${token};`,
                                `for(let key in __NSIDE_instance__){`,
                                    `__NSIDE_instance__.hasOwnProperty(key) ? own.push(key) : inherited.push(key);`,
                                `}`,
                                returnAnswer
                            ].join('\n')
                        );
                    } else {
                        // TODO: check on global, and auto-complete constructor names
                        value = evalInContext(
                            [
                                instantiateOwnInherited,
                                `let __NSIDE_instance__ = ${token};`,
                                `for(let key in __NSIDE_instance__){`,
                                    `if(key.indexOf('${incomplete}') !== 0) continue;`,
                                    `__NSIDE_instance__.hasOwnProperty(key) ? own.push(key) : inherited.push(key);`,
                                `}`,
                                returnAnswer
                            ].join('\n')
                        );
                    }
                    payload.ownProps = value.own.sort();
                    payload.inheritedProps = value.inherited.sort();
                    const bestSuggestion: string = makeBestSuggestion(payload.ownProps, payload.inheritedProps);
                    const diff: string = bestSuggestion.slice(incomplete.length);
                    // console.log(`bestSuggestion 1: ${bestSuggestion}; diff: ${diff}`);
                    payload.suggestedText = text + diff;
                } else {
                    let parent: string;
                    let toSlice: string;
                    // console.log("UNKEYED");
                    if(lastIndex === -1){
                        parent = "global";
                        toSlice = token;
                    } else {
                        parent = token;
                        toSlice = incomplete;
                    }
                    /*
                        let own = []; let inherited = [];

                        for(let key in UITextView){
                            if(key.indexOf(‘all’) !== 0) continue;
                            // both 'this' and 'global' work.
                            global.hasOwnProperty(key) ? own.push(key) : inherited.push(key);
                        }

                        let answer = { own: own, inherited: inherited }; answer;
                    */
                    value = evalInContext(
                        [
                            instantiateOwnInherited,
                            `let __NSIDE_instance__ = ${parent};`,
                            `for(let key in __NSIDE_instance__){`,
                                `if(key.indexOf('${toSlice}') !== 0) continue;`,
                                // both 'this' and 'global' work.
                                `global.hasOwnProperty(key) ? own.push(key) : inherited.push(key);`,
                            `}`,
                            returnAnswer
                        ].join('\n')
                    );

                    payload.ownProps = value.own.sort();
                    payload.inheritedProps = value.inherited.sort();
                    const bestSuggestion: string = makeBestSuggestion(payload.ownProps, payload.inheritedProps);
                    const diff: string = bestSuggestion.slice(toSlice.length);
                    // console.log(`bestSuggestion 2: ${bestSuggestion}; diff: ${diff}`);
                    payload.suggestedText = text + diff;
                }
            } catch (e) {
                payload.ownProps = [];
                payload.inheritedProps = [];
                payload.suggestedText = text;
            }
        } else {
            payload.ownProps = [];
            payload.inheritedProps = [];
            payload.suggestedText = text;
        }
    } else {
        // console.log("NO MATCH");
        payload.ownProps = [];
        payload.inheritedProps = [];
        payload.suggestedText = text;
    }
    payload.ownPropsText = payload.ownProps.join(', ');
    payload.inheritedPropsText = payload.inheritedProps.join(', ');

    return payload;
}