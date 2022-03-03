type ObjectEntries<T> = T extends object ? [keyof T, T[keyof T]][] : never;
type ObjectFreeze<T extends object> = Readonly<T>;
type ObjectKeys<T> = T extends object ? (keyof T)[] : never;
type ObjectValues<T> = T extends object ? T[keyof T][] : never;
interface ObjectConstructor {
	entries<T>(o: T): ObjectEntries<T>;
	freeze<T extends object>(o: T): ObjectFreeze<T>;
	keys<T>(o: T): ObjectKeys<T>;
	values<T>(o: T): ObjectValues<T>;
}
