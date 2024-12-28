/*
  3243 - FlattenDepth
  -------
  by jiangshan (@jiangshanmeta) #中等 #array

  ### 题目

  Recursively flatten array up to depth times.

  For example:

  ```typescript
  type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
  type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
  ```

  If the depth is provided, it's guaranteed to be positive integer.

  > 在 Github 上查看：https://tsch.js.org/3243/zh-CN
*/

/* _____________ 你的代码 _____________ */

// 考虑下层数问题，ts 中需要比较具体的数字类型，通常都需要数组的 length 属性。
// 那么我们可以增加一个数组类型参数 U，每次打平向它里面添加一个元素来达到 ”+1“ 的目的。
// 然后每次递归时，判断层数和它的 length 是否一致，如果一致，说明打平层数够了，直接返回本身即可；否则继续递归。
type FlattenDepth<T extends any[], Depth extends number = 1, U extends any[] = []> = U['length'] extends Depth
  ? T
  : T extends [infer First, ...infer Rest]
    // 深度递归，考虑到本题的性质，不建议选择单个遍历递归 FlattenDepth<[...First, ...Rest], Depth>, 应选择多向递归
    ? First extends any[] ? [...FlattenDepth<First, Depth, [...U, 1]>, ...FlattenDepth<Rest, Depth, U>] : [First, ...FlattenDepth<[...Rest], Depth, U>]
    : []

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/3243/answer/zh-CN
  > 查看解答：https://tsch.js.org/3243/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
