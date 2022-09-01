import { stacktrace } from "..";

describe('parse', () => {
    test('parse basic error', async () => {
        const error = new Error("Basic Error");
        const { message, name, traces } = await stacktrace.parse(error);

        expect(message).toBe("Basic Error");
        expect(name).toBe("Error");
        expect(traces[0]).toEqual({
            filename: 'tslib.js',
            function: 'step',
            absPath: 'C:\\Users\\pszew\\Desktop\\stacktrace-parser\\node_modules\\tslib\\tslib.js',
            lineNo: 144,
            columnNo: 27,
            internal: false,
            extension: 'js',
            code: '                op = body.call(thisArg, _);\r',
            preCode: [
                '                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r',
                '                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r',
                '                        if (t[2]) _.ops.pop();\r',
                '                        _.trys.pop(); continue;\r',
                '                }\r'
            ],
            postCode: [
                '            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r',
                '            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r',
                '        }\r',
                '    };\r',
                '\r',
                '    __exportStar = function(m, o) {\r'
            ]
        }
        );
        expect(traces[traces.length - 1]).toEqual({
            filename: 'task_queues',
            function: 'processTicksAndRejections',
            absPath: 'node:internal/process/task_queues',
            lineNo: 96,
            columnNo: 5,
            internal: false,
            extension: 'task_queues'
        })
    })
})