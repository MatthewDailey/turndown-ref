declare module "collapse-whitespace" {
    export default collapseWhitespace;
    /**
     * The collapseWhitespace function is adapted from collapse-whitespace
     * by Luc Thevenard.
     *
     * The MIT License (MIT)
     *
     * Copyright (c) 2014 Luc Thevenard <lucthevenard@gmail.com>
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    /**
     * collapseWhitespace(options) removes extraneous whitespace from an the given element.
     *
     * @param {Object} options
     */
    function collapseWhitespace(options: any): void;
}
declare module "utilities" {
    export function extend(destination: any, ...args: any[]): any;
    export function repeat(character: any, count: any): string;
    export function trimLeadingNewlines(string: any): any;
    export function trimTrailingNewlines(string: any): any;
    export function isBlock(node: any): boolean;
    export function isVoid(node: any): boolean;
    export function hasVoid(node: any): any;
    export function isMeaningfulWhenBlank(node: any): boolean;
    export function hasMeaningfulWhenBlank(node: any): any;
    export const blockElements: string[];
    export const voidElements: string[];
}
declare module "commonmark-rules" {
    export default rules;
    namespace rules {
        namespace paragraph {
            let filter: string;
            function replacement(content: any): string;
        }
        namespace lineBreak {
            let filter_1: string;
            export { filter_1 as filter };
            export function replacement_1(content: any, node: any, options: any): string;
            export { replacement_1 as replacement };
        }
        namespace heading {
            let filter_2: string[];
            export { filter_2 as filter };
            export function replacement_2(content: any, node: any, options: any): string;
            export { replacement_2 as replacement };
        }
        namespace blockquote {
            let filter_3: string;
            export { filter_3 as filter };
            export function replacement_3(content: any): string;
            export { replacement_3 as replacement };
        }
        namespace list {
            let filter_4: string[];
            export { filter_4 as filter };
            export function replacement_4(content: any, node: any): string;
            export { replacement_4 as replacement };
        }
        namespace listItem {
            let filter_5: string;
            export { filter_5 as filter };
            export function replacement_5(content: any, node: any, options: any): string;
            export { replacement_5 as replacement };
        }
        namespace indentedCodeBlock {
            export function filter_6(node: any, options: any): boolean;
            export { filter_6 as filter };
            export function replacement_6(content: any, node: any, options: any): string;
            export { replacement_6 as replacement };
        }
        namespace fencedCodeBlock {
            export function filter_7(node: any, options: any): boolean;
            export { filter_7 as filter };
            export function replacement_7(content: any, node: any, options: any): string;
            export { replacement_7 as replacement };
        }
        namespace horizontalRule {
            let filter_8: string;
            export { filter_8 as filter };
            export function replacement_8(content: any, node: any, options: any): string;
            export { replacement_8 as replacement };
        }
        namespace inlineLink {
            export function filter_9(node: any, options: any): any;
            export { filter_9 as filter };
            export function replacement_9(content: any, node: any): string;
            export { replacement_9 as replacement };
        }
        namespace referenceLink {
            export function filter_10(node: any, options: any): any;
            export { filter_10 as filter };
            export function replacement_10(content: any, node: any, options: any): string;
            export { replacement_10 as replacement };
            export let references: string[];
            export let append: (options: any) => string;
        }
        namespace emphasis {
            let filter_11: string[];
            export { filter_11 as filter };
            export function replacement_11(content: any, node: any, options: any): any;
            export { replacement_11 as replacement };
        }
        namespace strong {
            let filter_12: string[];
            export { filter_12 as filter };
            export function replacement_12(content: any, node: any, options: any): any;
            export { replacement_12 as replacement };
        }
        namespace code {
            export function filter_13(node: any): boolean;
            export { filter_13 as filter };
            export function replacement_13(content: any): string;
            export { replacement_13 as replacement };
        }
        namespace image {
            let filter_14: string;
            export { filter_14 as filter };
            export function replacement_14(content: any, node: any): string;
            export { replacement_14 as replacement };
        }
    }
}
declare module "html-parser" {
    const _default: any;
    export default _default;
}
declare module "node" {
    export default function Node(node: any, options: any): any;
}
declare module "root-node" {
    export default function RootNode(input: any, options: any): any;
}
declare module "rules" {
    /**
     * Manages a collection of rules used to convert HTML to Markdown
     */
    function Rules(options: any): void;
    class Rules {
        /**
         * Manages a collection of rules used to convert HTML to Markdown
         */
        constructor(options: any);
        options: any;
        _keep: any[];
        _remove: any[];
        blankRule: {
            replacement: any;
        };
        keepReplacement: any;
        defaultRule: {
            replacement: any;
        };
        array: any[];
        add: (key: any, rule: any) => void;
        keep: (filter: any) => void;
        remove: (filter: any) => void;
        forNode: (node: any) => any;
        forEach: (fn: any) => void;
    }
    export default Rules;
}
declare module "turndown-ref" {
    function TurndownService(options: any): TurndownService;
    class TurndownService {
        constructor(options: any);
        options: any;
        rules: Rules;
        turndown: string;
        use: any;
        addRule: any;
        keep: any;
        remove: any;
        escape: string;
    }
    export default TurndownService;
    import Rules from "rules";
}
