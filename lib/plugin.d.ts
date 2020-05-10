export = CombineManifestPlugin;
declare class CombineManifestPlugin {
    constructor(opts?: {
        from: string[];
        to: string;
    });
    private error;
    opts: {
        from: string[];
        to: string;
    };
    private apply;
}
declare namespace CombineManifestPlugin {
    export { Option };
}
type Option = {
    from: string[];
    to: string;
};
