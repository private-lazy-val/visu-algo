interface IStack<T> {
    push(item: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    size(): number;
    clear(): void;
    getElements(): T[];
}
export class Stack<T> implements IStack<T> {
    private storage: T[] = [];
    push(item: T): void {
        this.storage.push(item);
    }

    pop(): T | undefined {
        return this.storage.pop();
    }

    size(): number {
        return this.storage.length;
    }

    peek(): T | undefined {
        return this.storage[this.size() - 1];
    }

    clear(): void {
        this.storage = [];
    }

    getElements(): T[] {
        return this.storage;
    }
}