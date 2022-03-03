export type LiteralString<T extends string> = string extends T ? never : T;
