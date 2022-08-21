# Stacktrace Parser

Simple and lightweight stacktrace parser for NodeJS written in Typescript

# Installation
```bashv0.1
npm install --save-dev stacktrace-parser-node
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

## Basic object
| Field              | Type            | Description                                                                                                                                                                                                                                       |
| ------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `message`        | `string`             |                                                                                                                                                              |
| `name` | `string`                  |                                                                                                                                                                              |
| `traces`         | `Trace[]`             |         

## Trace object
| Field              | Type            | Description                                                                                                                                                                                                                                       |
| ------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `filename`        | `string`             |                                                                                                                                                              |
| `function` | `string`                  |                                                                                                                                                                              |
| `lineNo`         | `number`             |         
| `columnNo`         | `number`             |   
| `internal`         | `boolean`             |   
| `absPath`         | `string`             |   
| `extension`         | `string`             |   
| `code`         | `string[]`           |   
| `preCode`         | `string[]`             |   
| `postCode`         | `string[]`          |   


