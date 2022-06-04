# TypeScript高级类型

## 交叉类型（intersection type）
> 交叉类型是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。 例如， Person & Serializable & Loggable同时是 Person 和 Serializable 和 Loggable。 就是说这个类型的对象同时拥有了这三种类型的成员。
```ts
interface LeftType {
  id: number;
  left: string;
}

interface RightType {
  id: number;
  right: string;
}

type IntersectionType = LeftType & RightType

function showType(arg: IntersectionType) {
  console.log(arg)
}

showType({ id: 1, left: 'left', right: 'right' })
// Output: { id: 1, left: 'left', right: 'right' }
```

## 联合类型（Union Types）
> 联合类型与交叉类型很有关联，但是使用上却完全不同。 偶尔你会遇到这种情况，一个代码库希望传入number或string类型的参数。 例如下面的函数：
```ts
type UnionType = number | string

function showType(arg: UnionType) {
  console.log(arg)
}

showType('str')
// Output: str

showType(100)
// Output: 100
```

## 泛型（Generic Types）
> 泛型是重用指定类型的一种方法，类型变量T可以帮助我们捕获用户传入的类型。

可重用方法
```ts
function showType<T>(arg: T) {
  console.log(arg)
}

showType<string>('test') // 指定类型
// Output: test

showType(1) // 类型推导
// Output: 1
```
可重用接口

```ts
type Names = '小明' | '小李' | '小张'

interface GenerateType<T> {
  id: number;
  name: T;
}

function showTypeWithString(arg: GenerateType<string>) {
  console.log(arg)
}
showTypeWithString({ id: 1, name: 'lxy' })
// Output: { id: 1, name: 'lxy' }

function showTypeWithNumber(arg: GenerateType<number>) {
  console.log(arg)
}
showTypeWithNumber({ id: 1, name: 11 })
// Output: { id: 1, name: 11 }

function showTypeWithNames(arg: GenerateType<Names>) {
  console.log(arg)
}
showTypeWithNames({ id: 1, name: '小明' })
// Output: { id: 1, name: '小明' }
```
> 泛型类型可以接收多个参数。在这里，我们传入两个参数：T和U，然后将它们用作属性的类型注释。也就是说，我们现在可以使用该接口并提供不同的类型作为参数。
```ts
interface GenericType<T, U> {
  id: T;
  name: U;
}

function showType(arg: GenericType<number, string>) {
  console.log(arg)
}
showType({ id: 1, name: 'lxy' })
// Output: { id: 1, name: 'lxy' }

function showTypeTwo(arg: GenericType<number, string[]>) {
  console.log(arg)
}
showTypeTwo({ id: 1, name: ['lxy'] })
// Output: { id: 1, name: ['lxy'] }
```
## 实用程序类型（Utility Type）
> TypeScript提供了方便的内置实用程序，可帮助轻松地操作类型。要使用它们，您需要将要转换的类型传递给<>。

- ### Partial\<T\>
将T类型的所有属性设为可选
```ts
interface PartialType {
  id: number;
  firstname: string;
  lastname: string;
}

function showType(arg: Partial<PartialType>) {
  console.log(arg)
}

showType({ id: 1 })
// Output: {id: 1}

showType({ id: 1, firstname: 'Li' })
// Output: {id: 1, firstname: 'Li'}

showType({ firstname: 'Li', lastname: 'Yang' })
// Output: {firstname: 'Li', lastname: 'Yang'}
```
- ### Required\<T\>
与Partial相反，T类型的所有属性设为必填项
```ts
interface RequiredType {
  id: number;
  firstname?: string;
  lastname?: string;
}

function showType(arg: Required<RequiredType>) {
  console.log(arg)
}

showType({ id: 1, firstname: 'Li', lastname: 'Yang' })
// Output {id: 1, firstname: "Li", lastname: "Yang"}

showType({ id: 1 })
// 编译报错 Type '{ id: number; }' is missing the following properties from type 'Required<RequiredType>': firstname, lastname
```

- ### Readonly\<T\>
T类型的所有属性设为只读
```ts
interface ReadonlyType {
  id: number;
  name: string;
}

function showType(arg: Readonly<ReadonlyType>) {
  arg.id = 4
  console.log(arg)
}

showType({ id: 1, name: 'lxy' })
// 编译报错 Cannot assign to 'id' because it is a read-only property.
```

- ### Pick\<T, K\>
从T类型上选择某些属性K并创建新类型
```ts
interface PickType {
  id: number;
  firstname: string;
  lastname: string;
}

type K1 = 'firstname' & 'lastname'
type K2 = 'firstname' | 'lastname'

function showTypeWithK1(arg: Pick<PickType, K1>) {
  console.log(arg)
}

showTypeWithK1({ lastname: 'Yang' })
// Output {lastname: "Yang"}
showTypeWithK1({ firstname: 'Li', lastname: 'Yang' })
// Output {firstname: "Li", lastname: "Yang"}

function showTypeWithK2(arg: Pick<PickType, K2>) {
  console.log(arg)
}

showTypeWithK2({ lastname: 'Yang' })
// 编译错误 Property 'firstname' is missing in type '{ lastname: string; }' but required in type 'Pick<PickType, K2>'
showTypeWithK2({ firstname: 'Li', lastname: 'Yang' })
// Output {firstname: "Li", lastname: "Yang"}
```

- ### Omit\<T, K\>
与Pick相反，从T类型上删除某些属性K并创建新类型
```ts
interface OmitType {
  id: number;
  firstname: string;
  lastname: string;
}

type K = 'firstname' | 'lastname'

function showType(arg: Omit<OmitType, K>) {
  console.log(arg)
}

showType({ id: 1 })
// Output {id: 1}

showType({ id: 1, firstname: 'Li' })
// 编译报错  Object literal may only specify known properties, and 'firstname' does not exist in type 'Pick<OmitType, "id">'.
```

- ### Extract<T, U>
从T类型和U类型中抽出共有的属性
```ts
type K1 = 1 | 2 | 3
type K2 = 3 | 4 | 5
type ExtractType = Extract<K1, K2> // ExtractType = 3

function showType(arg: ExtractType) {
  console.log(arg)
}
showType(3)
// Output 3
showType(4)
// 编译报错 Argument of type '4' is not assignable to parameter of type '3'
```

- ### Exclude<T, U>
与Extract相反，从T类型属性中排除U类型中存在的属性
```ts
type K1 = 1 | 2 | 3
type K2 = 3 | 4 | 5
type ExcludeType = Exclude<K1, K2> // ExcludeType = 1 | 2

function showType(arg: ExcludeType) {
  console.log(arg)
}
showType(1)
// Output 1
showType(4)
// 编译报错 Argument of type '4' is not assignable to parameter of type '1 | 2'.
```

- ### Record<K, T>
构造指定类型为T的索引类型为K的记录
```ts
interface Person {
  name: string;
}

const UserList: Record<number, Person> = [
  { name: '小张' },
  { name: '小李' },
  { name: '小王' }
]

const UserObj: Record<string, Person> = {
  a: { name: '小张' },
  b: { name: '小李' },
  c: { name: '小王' }
}

console.log(UserList)
// Output [ { name: '小张' }, { name: '小李' }, { name: '小王' } ]
console.log(UserObj)
// Output { a: { name: '小张' }, b: { name: '小李' }, c: { name: '小王' } }
```

- ### NonNullable\<T\>
从T类型中删除null和undefined
```ts
type T = string | number | null | undefined

function showType(arg: NonNullable<T>) {
  console.log(arg)
}

showType(0)
// Output 0

showType('lxy')
// Output 'lxy'

showType(null)
// 编译错误 Argument of type 'null' is not assignable to parameter of type 'string | number'.

showType(undefined)
// 编译错误 Argument of type 'undefined' is not assignable to parameter of type 'string | number'.
```
## 映射类型（Mapped Types）
> 映射类型允许您采用现有模型并将其每个属性转换为新类型。请注意，前面介绍的某些实用程序类型也是映射类型
```ts
type StringMap<T> = {
  [P in keyof T]: string
}

interface T {
  id: number;
  name: string;
}

function showType(arg: StringMap<T>) {
  console.log(arg)
}

showType({ id: 10, name: 'lxy' })
// 编译错误 Type 'number' is not assignable to type 'string'.

showType({ id: '10', name: 'lxy' })
// Output {id: "10", name: "lxy"}
```
模拟实现部分Utility Types
```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
}
type Partial<T> = {
  [P in keyof T]?: T[P];
}
```

## 索引类型（Index Types）
> 使用索引类型，编译器就能够检查使用了动态属性名的代码。
```ts
function pluck<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name]
}

interface Person {
  name: string;
  age: number;
}

const person: Person = {
  name: 'lxy',
  age: 28
}

pluck(person, 'name')
// Output "lxy"
pluck(person, 'address')
// 编译错误 Argument of type '"address"' is not assignable to parameter of type '"name" | "age"'.
```

## 条件类型（Conditional Types）
它检查两种类型，并根据检查的结果选择其中一种。
```ts
type NonNullable<T> = T extends null | undefined ? never : T
```
