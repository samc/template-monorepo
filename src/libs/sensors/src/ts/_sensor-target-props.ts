export interface PropsWithData<T> {
	data: T;
}

export interface PropsWithPayload<T> {
	payload: T;
}

export interface PropsWithTarget<T extends HTMLElement = any> {
	target: React.RefObject<T>;
}
