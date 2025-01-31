/*
  4182 - 斐波那契序列
  -------
  by windliang (@wind-liang) #中等

  ### 题目

  Implement a generic Fibonacci\<T\> takes an number T and returns it's corresponding [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number).

  The sequence starts:
  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

  For example
  ```js
  type Result1 = Fibonacci<3> // 2
  type Result2 = Fibonacci<8> // 21
  ```

  > 在 Github 上查看：https://tsch.js.org/4182/zh-CN
*/

/* _____________ 你的代码 _____________ */

// 答案解析 https://github.com/type-challenges/type-challenges/issues/16384
// No 表示当前的计算到那个数
// N_2 表示当前 n-2 的结果
// N_1 表示当前 n-1 的结果
type Fibonacci<T extends number, No extends 1[] = [1, 1, 1], N_2 extends 1[] = [1], N_1 extends 1[] = [1]> = T extends 1 | 2
  ? 1
  : T extends No['length']
    ? [...N_2, ...N_1]['length']
    : Fibonacci<T, [...No, 1], N_1, [...N_2, ...N_1]>

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/4182/answer/zh-CN
  > 查看解答：https://tsch.js.org/4182/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
