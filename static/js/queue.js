class Queue {
    constructor() {
        this.queued_items = new Array();
    }
    enqueue(element_in) {
        this.queued_items.push(element_in);
    }
    dequeue() {
        if (this.is_empty())
            return "Error";
        return this.queued_items.shift();
    }
    front() {
        if (this.is_empty())
            return "No elements in Queue";
        return this.queued_items[0];
    }
    is_empty() {
        return this.queued_items.length == 0;
    }
    output_queue() {
        let output;
        for (let i = 0; i < this.queued_items.length; i++)
            output += this.queued_items[i] + " ";
        return output;
    }
    len() {
        return this.queued_items.length;
    }
}