declare const transformer: {
    toObject: (s: string) => string;
    toArray: (s: string) => string;
    changeCase: (ccFnKey: string, text: string) => string;
    changeCaseAnyway: (ccFnKey: string, text: string) => string;
    toQrCode: (s: string) => Promise<unknown>;
};
export default transformer;
//# sourceMappingURL=index.d.ts.map