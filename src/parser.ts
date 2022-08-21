import { ErrorResponse, SourceCode, Trace } from "./types";
import { promises, existsSync } from "fs";

const MAX_CODE_LINES = 6;
const LINE_REGEXP = /at (.+?)\s+\((?:(.+?):(\d+)(?::(\d+))?|([^)]+))\)/;

const parse = async (error: Error): Promise<ErrorResponse> => {
    const { message, name, stack } = error;

    const traces = await parseTraces(stack || "");

    return {
        message, name,
        traces
    }
}

const parseTraces = async (stack: string): Promise<Trace[]> => {
    const traces: Trace[] = [];

    if (!stack.length) {
        return [];
    }

    const stacktraces = stack.split("\n").slice(1)
    for (const line of stacktraces) {
        const trace = await createTrace(line);
        if (trace) {
            traces.push(trace);
        }
    }

    return (
        traces.slice(0, 25).map((trace) => ({
            ...trace,
        })) || []
    );
};

const createTrace = async (line: string): Promise<Trace | undefined> => {
    const lineMatch = line.match(LINE_REGEXP);
    if (!lineMatch) {
        return undefined;
    }

    let functionName: string | undefined;
    let splitedPath: string[] | undefined;

    if (!lineMatch || lineMatch[0].includes("<anonymous>")) {
        return undefined;
    }

    if (lineMatch[1]) {
        functionName = lineMatch[1];
    }

    const path = lineMatch[2]?.startsWith("file://")
        ? lineMatch[2].substr(7)
        : lineMatch[2];
    const internal =
        path !== undefined &&
        !path.includes("node_modules/") &&
        !path.includes("node_modules\\") &&
        !path.includes("internal/");

    const isNodeProcess = path?.includes("internal") || path?.includes("process");
    isNodeProcess
        ? (splitedPath = path?.split("/"))
        : (splitedPath = path?.split("\\"));

    const fileName = splitedPath[splitedPath?.length - 1];

    const splitedFilename = fileName.split(".");
    const extension = splitedFilename[splitedFilename.length - 1];
    const lineNo = parseInt(lineMatch[3], 10);

    const code = await getSourceCode(path, lineNo);

    const properties = {
        filename: fileName,
        function: functionName,
        absPath: path,
        lineNo,
        columnNo: parseInt(lineMatch[4], 10) || undefined,
        internal,
        extension,
        ...code,
    };

    return properties;
};

const getSourceCode = async (
    path: string,
    lineNumber: number
): Promise<SourceCode | undefined> => {
    const context = await readFileContext(path);
    if (!context) {
        return undefined;
    }

    const linesOfCode: string[] = context?.split("\n");

    const code: string = linesOfCode[lineNumber - 1];
    const preCode: string[] = linesOfCode.slice(lineNumber - MAX_CODE_LINES, lineNumber - 1);
    const postCode: string[] = linesOfCode.slice(lineNumber + 1, lineNumber + MAX_CODE_LINES);

    return {
        code,
        preCode,
        postCode,
    };
};

const readFileContext = async (path: string): Promise<string> => {
    let context = "";

    const isExists = existsSync(path);
    if (isExists) {
        context = await promises.readFile(path, "utf8");
    }

    return context;
};

export const stackparser = {
    parse
}
