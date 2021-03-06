declare type Options = {
    minified: boolean;
    pinned: boolean;
    relative_external: boolean;
    web_external: boolean;
    shouldReplace: (module_id: string) => (boolean | string);
};
export declare function skypin(options: Options): {
    resolveId(id: string): Promise<{
        id: string;
        external: boolean;
    } | undefined>;
};
export {};
