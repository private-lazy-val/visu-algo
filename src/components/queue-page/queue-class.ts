interface IQueue<T> {
    enqueue(item: T): void;

    dequeue(): void;

    peek(): T | null;

    getHead(): number;

    getTail(): number;

    getPreTail(): number;

    isEmpty(): boolean;

    clear(): void;

    hasRoom(): boolean;
}

export class Queue<T> implements IQueue<T> {
    private storage: (T | null)[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0; // max queue size
    private length: number = 0; // number of elements in the array

    constructor(size: number) {
        this.size = size;
        this.storage = Array(size);
    }

    enqueue = (item: T): void => {
        if (!this.hasRoom()) {
            throw new Error("Maximum length exceeded");
        } else {
            this.storage[this.getTail()] = item;
            this.tail = (this.getTail() + 1) % this.size;
            this.length++;
        }
    };

    dequeue = (): void => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        } else {
            this.storage[this.getHead()] = null;
            this.head = (this.getHead() + 1) % this.size;
            this.length--;
        }
    };

    peek = (): T | null => {
        if (this.isEmpty()) {
            return null;
        }
        return this.storage[this.getHead() % this.size];
    };

    getHead = (): number => {
        return this.head;
    };

    getTail = (): number => {
        return this.tail;
    };

    getPreTail = (): number => {
        let prev = this.getTail() - 1;
        if (prev < 0) {
            prev = this.size - 1;
        }
        return prev;
    }

    isEmpty = (): boolean => this.length === 0;

    clear = (): void => {
        this.head = 0;
        this.tail = 0;
        this.length = 0;
        this.storage = [];
    }

    hasRoom = (): boolean => {
        return this.length < this.size;
    }
}