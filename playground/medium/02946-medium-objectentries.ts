/*
  2946 - ObjectEntries
  -------
  by jiangshan (@jiangshanmeta) #中等 #object

  ### 题目

  Implement the type version of ```Object.entries```

  For example

  ```typescript
  interface Model {
    name: string;
    age: number;
    locations: string[] | null;
  }
  type modelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];
  ```

  > 在 Github 上查看：https://tsch.js.org/2946/zh-CN
*/

/* _____________ 你的代码 _____________ */

// 本题关键是把对象转换成联合类型，然后去掉去掉可选符和 Partial<T> 带来的影响
// 数组转联合类型用 [number] 作为下标， ['1', '2']['number'] // '1' | '2'
// 对象则是用 [keyof T] 作为下标，type ObjectToUnion<T> = T[keyof T]
// 去掉 Partial<T>、可选符效果则是用 Required<T>
type ObjectEntries<T> = {
  [P in keyof Required<T>]: [P, Required<T>[P] extends never ? undefined : Required<T>[P]]
}[keyof T]

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectEntries<Model>, ModelEntries>>,
  Expect<Equal<ObjectEntries<Partial<Model>>, ModelEntries>>,
  Expect<Equal<ObjectEntries<{ key?: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: undefined }>, ['key', undefined]>>,
  Expect<Equal<ObjectEntries<{ key: string | undefined }>, ['key', string | undefined]>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/2946/answer/zh-CN
  > 查看解答：https://tsch.js.org/2946/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
