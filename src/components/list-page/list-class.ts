export class Node<T> {
    value: T;
    next: Node<T> | null;

    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    }
}

interface ILinkedList<T> {
    prepend(element: T): void;

    append(element: T): void;

    addByIndex(index: number, element: T): void;

    deleteByIndex(index: number): void;

    deleteHead(): void;

    deleteTail(): void;

    toArray(): T[];
}

export class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;
    private size: number;
    private extend(values: T[]) {
        values.forEach((value) => this.append(value));
    };

    constructor(elements?: T[]) {
        this.head = null;
        this.tail = null;
        this.size = 0; // number of element in the list
        if (elements?.length) { // create a list from array
            this.extend(elements);
        }
    }

    append(element: T): void {
        const node: Node<T> = new Node(element);
        if (!this.head) {
            this.head = node;
        } else {
            this.tail!.next = node;
        }
        this.tail = node;
        this.size++;
    }

    prepend(element: T): void {
        const node: Node<T> = new Node(element);
        if (this.head === null || this.tail === null) {
            this.head = node;
            this.tail = node;
        } else {
            let currentNode = this.head;
            this.head = node;
            this.head.next = currentNode;
        }
        this.size++;
    }

    addByIndex(index: number, element: T): void {
        if (index < 0 || index > this.size) {
            console.log('Enter a valid index');
            return;
        } else {
            const node = new Node(element);
            // добавить элемент в начало списка
            if (index === 0) {
                node.next = this.head;
                this.head = node;
            } else {
                let curr = this.head;
                let currIndex = 0;

                while (currIndex !== index - 1) {
                    curr = curr!.next;
                    currIndex++;
                }

                node.next = curr!.next;
                curr!.next = node;
            }
            this.size++;
        }
    }

    deleteByIndex(index: number): void {
        if (index < 0 || index >= this.size) {
            console.log('Enter a valid index');
            return;
        }
        if (index === 0) return this.deleteHead();
        if (index === this.size - 1) return this.deleteTail();

        let curr = this.head;
        let prev = null;
        let currIndex = 0;

        while (currIndex !== index) {
            prev = curr;
            curr = curr!.next;
            currIndex++;
        }
        prev!.next = curr!.next;
        this.size--;
    }

    deleteHead(): void {
        if (!this.head) {
            console.log('The list is empty');
            return;
        }
        if (this.size === 1) {
            this.head = null;
            this.tail = null;
        } else {
            const currentHead = this.head;
            this.head = currentHead.next;
        }
        this.size--;
    }

    deleteTail(): void {
        if (!this.tail) {
            console.log('The list is empty');
            return;
        }

        if (this.size === 1) {
            this.head = null;
            this.tail = null;
        } else {
            let current = this.head;
            let newTail = null;
            while (current?.next !== null) {
                newTail = current;
                current = current!.next;
            }
            this.tail = newTail;
            this.tail!.next = null;
        }
        this.size--;
    }

    toArray(): T[] {
        let curr = this.head;
        const res: T[] = [];

        while (curr) {
            res.push(curr.value);
            curr = curr.next;
        }
        return res;
    }
}