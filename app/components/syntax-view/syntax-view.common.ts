import { View, Style, Property, CssProperty, isIOS } from "tns-core-modules/ui/core/view";

export const languageProperty = new Property<SyntaxViewBase, string>({ name: "language", defaultValue: "javascript", affectsLayout: true });

export abstract class SyntaxViewBase extends View {
    language: string;
}

languageProperty.register(SyntaxViewBase);

// SyntaxViewBase.prototype.recycleNativeView = false;