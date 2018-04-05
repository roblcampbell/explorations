# RxJS and Observables

In order to understand and modify much of the code in this project, you need a strong understanding of reactive programming and how the `rxjs` library works.

The Angular framework was written with extensive use of `rxjs`, and all built-in asynchronous functionality (such as the `HttpClient` service) expects you to be able to work with the Observer pattern as implemented by `rxjs`.

## Rx

RxJS is the javascript implementation of [ReactiveX](http://reactivex.io/), also known as Rx. ReactiveX is an approach to reactive programming, which can be **very difficult** to grasp, so take care to do some research before jumping in.

 You should check out the [reactivex.io introduction](http://reactivex.io/intro.html) and the [Observable](http://reactivex.io/documentation/observable.html) page to learn what Observables are and why they're useful.

Read through [learnrxjs.io](https://www.learnrxjs.io/) for "Clear examples, explanations and resources for RxJS."

## Observable

Where a Promise allows you to work with a single value from the future, Observables allow you to work with a consistent stream of values from the future.

To oversimplify, think of an Observable as an array that is populated over time. Instead of iterating over the values of an existing array, you subscribe to an Observable and define a callback that will handle each value as it is emitted.

```typescript
Rx.Observable
  .fromEvent(buttonElement, 'click')
  .subscribe((event) => {
    // every time the button is clicked,
    // the id of the button is emitted
    console.log(event.target.id);
  });
```

It looks like just a plain old JavaScript event listener. That's the idea - the trick is that everything behaves like an event: the response to an http request, a timer interval, each element in an array, the resolution of a Promise, or anything else you want.

[Read more](http://reactivex.io/documentation/observable.html) if you haven't already.

## Operators

In addition to subscribing to raw values, rxjs provides a huge selection of operators you can use to mutate, filter and aggregate values prior to subscribing to them. This is similar to instructing a database to sort or transform data prior to returning the results of a query.

Here's a more complex example using ngrx/effects.

```typescript
export class ScannerEffects {

  @Effect() sendImagesBatch: Observable<Action> = this._actions$
    .ofType(ScannerActions.SEND_IMAGES_BATCH)
    .withLatestFrom(this._store$.select((state) => state.scans))
    .switchMap(([action, scans]) => {
      const uploads = pick(scans.unsynced, scans.entities);
      return this.webapi.sendScans(uploads);
    })
    .switchMap((payload) => {
      return Observable.of(new ImageSent(payload));
    });

  // ... other effects ...
}
```

In the code above, `this._actions$` is an Observable **actions** stream. The `$` at the end of the variable name is a convention telling us this is a stream. We could subscribe to `this._actions$` if we wanted to react to all actions dispatched by ngrx/store.

Since we want to focus on handling just one type of action (`SEND_IMAGES_BATCH`), we specify which with the `ofType` operator, which is a special operator provided by ngrx/effects.

Next, we use the rxjs operator `withLatestFrom`, which we can give another Observable (in this case, an Observable of scan data from our data store). The next operator in the chain will receive a tuple-like array of `[action, scans]` instead of just an `action` value.

Once we have the latest scan data, we use `switchMap` to replace our Observable stream of `SEND_IMAGES_BATCH` actions with the Observable stream returned from `this.webAapi.sendScans(uploads)`. The Observable returned by `sendScans` will emit an http response each time an image finishes uploading.

Finally, we use `switchMap` again to replace the Observable stream of http responses with an Observable stream of `IMAGE_SENT` actions. Because this Observable is the final value returned from our effect, an `IMAGE_SENT` action is dispatched back to ngrx/store each time the Observable emits because an image finished uploading.

Learn more:
- [Read more about Operators](http://reactivex.io/documentation/operators.html)
- [Check out this list of available operators by category](http://reactivex.io/documentation/operators.html#categorized)