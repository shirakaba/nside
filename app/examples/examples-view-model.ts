import { Observable } from "@nativescript/core";
import { Item } from "./shared/item";

export class ExamplesViewModel extends Observable {
    items: Array<Item>;

    constructor() {
        super();

        this.items = [];
    }
}
