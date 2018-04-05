// USAGE:
// import { Duration } from '<path>/duration.decorator';
// export class SomeClass {
//   @Duration
//   functionBeingDebugged() { ... }
// }

export function Duration(target: object, key: string, descriptor: TypedPropertyDescriptor<any>) {
  const originalMethod = descriptor.value;
  descriptor.value = function() {
    const starttime = performance.now();
    const result = originalMethod.apply(this);
    const duration = performance.now() - starttime;
    console.log(`${key} took ${duration}ms`);
    return result;
  };
}
