# Stacktrace Parser

Stacktrace parser for NodeJS written in Typescript with getting the code in which the error occurs.

# Installation
```bashv0.1
# Using npm
npm install --save stacktrace-parser-node

# Using yarn
yarn add stacktrace-parser-node
```

## Usage

```JavaScript
import { stacktrace } from "stacktrace-parser-node";

try {
  throw new Error();
} catch(error: Error) {
  const stack = stacktrace.parse(error);
  //handle stack
}
```

# Response

Basic 
| Field              | Type            | Description                                                                                                                                                                                                                                       |
| ------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `message`        | `string`             | Error description from `Error`                                                                                                                                                             |
| `name` | `string`                  |    Error name from `Error`                                                                                                                                                                          |
| `traces`         | `Trace[]`             |      List of traces   

Trace object
| Field              | Type            | Description                                                                                                                                                                                                                                       |
| ------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `filename`        | `string`             |      The name of the file in which the error occurs                                                                                                                                                        |
| `function` | `string`                  |     The name of the function where the error occurred                                                                                                                                                               |
| `lineNo`         | `number`             |     Line number with error    
| `columnNo`         | `number`             |   Column number with error
| `internal`         | `boolean`             |   A flag that determines whether the error has occurred in our code or in the code from installed packages
| `absPath`         | `string`             |   Absolute path to the file where the error occurs
| `extension`         | `string`             |   Extension of the file where the error occurs
| `code`         | `string[]`           |   Line of code where the error occurs
| `preCode`         | `string[]`             |   5 lines of code before `code`
| `postCode`         | `string[]`          |   5 lines of code after `code`

Example JSON
```
{
    "name": "QueryFailedError",
    "message": "missing FROM-clause entry for table \"accountapplica\"",
    "traces": [
        {
            "filename": "PostgresQueryRunner.js",
            "function": "PostgresQueryRunner.query",
            "absPath": "C:\\Users\\user\\Desktop\\project\\node_modules\\typeorm\\driver\\postgres\\PostgresQueryRunner.js",
            "lineNo": 211,
            "columnNo": 19,
            "internal": false,
            "extension": "js",
            "code": "            throw new QueryFailedError_1.QueryFailedError(query, parameters, err);",
            "postCode": [
                "    }",
                "    /**",
                "     * Returns raw data stream.",
                "     */",
                "    async stream(query, parameters, onEnd, onError) {"
            ],
            "preCode": [
                "            }",
                "            return result;",
                "        }",
                "        catch (err) {",
                "            this.driver.connection.logger.logQueryError(err, query, parameters, this);"
            ]
        },
    ]
}
```
## LICENSE

[The MIT License (MIT)](https://github.com/errwischt/stacktrace-parser/blob/master/LICENSE)
