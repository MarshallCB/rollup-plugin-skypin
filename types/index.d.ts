export declare type Options = {
    /**
     * @default true
     */
    minified?: boolean;
    /**
     * @default true
     */
    pinned?: boolean;
    /**
     * @default false
     */
    relative_external?: boolean;
    /**
     * @default true
     */
    web_external?: boolean;
    /**
     * @default (_id) => true
     */
    shouldReplace?: (module_id: string) => (boolean | string);
};
export declare function skypin(options?: Options): {
    name: string;
    resolveId(id: string): Promise<{
        id: string;
        external: boolean;
    } | undefined>;
};
export {};
