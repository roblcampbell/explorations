# State Management

## @ngrx/store
In order to separate application state and business logic from the display logic of our Angular components, we're using [ngrx/store](https://github.com/ngrx/platform/blob/master/docs/store/README.md) to manage state in a manner similar to using Redux with a React application.

ngrx/store has [its own documentation](https://github.com/ngrx/platform/blob/master/docs/store/README.md) as well as this great [Comprehensive Introduction](https://gist.github.com/btroncone/a6e4347326749f938510#comprehensive-introduction-to-ngrxstore) by Brian Troncone, so you can read those for more detail.

Here I'll be providing an incomplete overview of the moving parts that apply to the this template app. UI. I will focus on usage rather than setup.

## Table of Contents

1. [Store](#store)
1. [Initial State](#initial-state)
1. [Actions](#actions)
1. [Reducers](#reducers)
1. [Effects](#effects)
2. [Action & Effect Workflow](#action-effect-workflow)

### Store

The heart of ngrx/store is the store itself. It's a single object that contains a representation of your application state, so you don't have state stored in your angular components.

For example, we use it to track client and user information, the status of the process, etc.

State is never mutated. Instead, a new application state is created whenever there's a change, and the old state is maintained historically so that you can step back and forth "through time" while debugging with the Redux DevTools.

You can access state in an Angular component by injecting the Store object and using the `select` method to retrieve data, like so:

```typescript
export class ExampleComponent {

  user$: Observable<string>;

  constructor(private _store: Store<any>) {
    this.user$ = _store.select('user');
  }
}
```

The above is sufficient to be able to access `user` from your template with `{{user | async}}`. [Learn about the async pipe here](https://angular.io/api/common/AsyncPipe), it's very handy.

If you need to access `user` in our example within your component code, you can:

```typescript
export class ExampleComponent {

  user$: Observable<string>;
  subscription;

  constructor(private _store: Store<any>) {
    this.user$ = _store.select('user');
  }

  ngOnInit() {
    this.subscription = this.user$.subscribe((user) => {
      // do something with the 'user' object here
    });
  }

  ngOnDestroy() {
    // don't forget to unsubscribe
    this.subscription.unsubscribe();
  }
}

```

You can also create and use [Selectors](https://github.com/ngrx/platform/blob/master/docs/store/selectors.md#selectors) for more sophisticated queries to the store.

### Initial State

You can set initial state in [initialState.ts](initialState.ts). There are some types defined there as well for portions of the store data.

### Actions

Just as we read state from the store indirectly, we want to update the state indirectly. Rather than calling methods on a service or assigning values, a component will dispatch an ACTION to the store. An ACTION has semantic meaning to the component but no implementation logic.

Every action has a `type` property and can have an optional `payload`.

Using Actions seems like a lot of boiler plate, but it buys us some big advantages:
- Your editor will notice if you use an Action that doesn't exist.
- Your editor will tell you which parameters are allowed on your payload, if you define your payload in detail in the action class.
- Your action class can also define default values on the payload, if there are any.

### Reducers

As I mentioned before, an Action has semantic meaning to the component but no implementation logic. Your component dispatches an ACQUIRE_IMAGE action to the store, and that's that.

When the store receives an Action, it sends it (along with the current application state) to a set of functions called 'reducers'. A reducer is a pure function that accepts your state and an Action, performs some operation based on whichever Action it received, and returns a new representation of state.


```typescript
```

Note that every action is dispatched to every reducer.

The above example only shows us changing the status, and doesn't show any interaction with the user. This is because reducers only handle synchronous state changes. They do not have side-effects.

If your Action requires an asynchronous task the action is still sent to your reducers, so you can handle any immedate state changes, but it is **also** dispatched to an Effect for asynchronous operations.

### Effects

If you need an Action to kick off an asynchronous operation, you create an Effect that listens for the relevent Action to be dispatched. That action is essentially completed immediately, but the Effect can execute asynchronous code.

When the async operation is completed, the Effect will dispatch another synchonrous Action, sending your state to the relevant reducer function and updating state immediately.

### Action & Effect Workflow

Currently, the flow of actions and effects goes like this:

```markdown
# Every 60s, dispatches
    ACTION: UPDATE_TOKEN              // jwt token that identifies the user
    EFFECT: UpdateToken...
  when done, dispatches
    ACTION: TOKEN_UPDATED
```
