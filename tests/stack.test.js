const stack = require('../src/stack');

test('peek on empty stack returns undefined', () => {
    expect(stack.peek()).toBeUndefined();
});

test('peek on stack with one element returns that element', () => {
    stack.push(1);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(1);
});

test('peek on stack with two or more elements returns the top element', () => {
    stack.push(1);
    stack.push("wow");
    stack.push(42);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(42);
});

test('peek on stack with one element after multiple elements have been popped', () => {
    stack.push(1);
    stack.push(5);
    stack.push("Star Wars");
    stack.push("Hej");
    stack.pop();
    stack.pop();
    stack.pop();
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(1);
});

test('pop to return the value of the top of the stack', () => {
    stack.push(1);
    stack.push("wow");
    stack.push(42);
    expect(stack.peek()).toBeDefined();
    expect(stack.pop()).toBe(42);
});