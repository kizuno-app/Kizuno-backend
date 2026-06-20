
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Organization
 * 
 */
export type Organization = $Result.DefaultSelection<Prisma.$OrganizationPayload>
/**
 * Model OrganizationDomain
 * 
 */
export type OrganizationDomain = $Result.DefaultSelection<Prisma.$OrganizationDomainPayload>
/**
 * Model OrganizationApplication
 * 
 */
export type OrganizationApplication = $Result.DefaultSelection<Prisma.$OrganizationApplicationPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Organizations
 * const organizations = await prisma.organization.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Organizations
   * const organizations = await prisma.organization.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.organization`: Exposes CRUD operations for the **Organization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Organizations
    * const organizations = await prisma.organization.findMany()
    * ```
    */
  get organization(): Prisma.OrganizationDelegate<ExtArgs>;

  /**
   * `prisma.organizationDomain`: Exposes CRUD operations for the **OrganizationDomain** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrganizationDomains
    * const organizationDomains = await prisma.organizationDomain.findMany()
    * ```
    */
  get organizationDomain(): Prisma.OrganizationDomainDelegate<ExtArgs>;

  /**
   * `prisma.organizationApplication`: Exposes CRUD operations for the **OrganizationApplication** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrganizationApplications
    * const organizationApplications = await prisma.organizationApplication.findMany()
    * ```
    */
  get organizationApplication(): Prisma.OrganizationApplicationDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Organization: 'Organization',
    OrganizationDomain: 'OrganizationDomain',
    OrganizationApplication: 'OrganizationApplication'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "organization" | "organizationDomain" | "organizationApplication"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Organization: {
        payload: Prisma.$OrganizationPayload<ExtArgs>
        fields: Prisma.OrganizationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findFirst: {
            args: Prisma.OrganizationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findMany: {
            args: Prisma.OrganizationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          create: {
            args: Prisma.OrganizationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          createMany: {
            args: Prisma.OrganizationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          delete: {
            args: Prisma.OrganizationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          update: {
            args: Prisma.OrganizationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrganizationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          aggregate: {
            args: Prisma.OrganizationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganization>
          }
          groupBy: {
            args: Prisma.OrganizationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationCountAggregateOutputType> | number
          }
        }
      }
      OrganizationDomain: {
        payload: Prisma.$OrganizationDomainPayload<ExtArgs>
        fields: Prisma.OrganizationDomainFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationDomainFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationDomainPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationDomainFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationDomainPayload>
          }
          findFirst: {
            args: Prisma.OrganizationDomainFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationDomainPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationDomainFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationDomainPayload>
          }
          findMany: {
            args: Prisma.OrganizationDomainFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationDomainPayload>[]
          }
          create: {
            args: Prisma.OrganizationDomainCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationDomainPayload>
          }
          createMany: {
            args: Prisma.OrganizationDomainCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationDomainCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationDomainPayload>[]
          }
          delete: {
            args: Prisma.OrganizationDomainDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationDomainPayload>
          }
          update: {
            args: Prisma.OrganizationDomainUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationDomainPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationDomainDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationDomainUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrganizationDomainUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationDomainPayload>
          }
          aggregate: {
            args: Prisma.OrganizationDomainAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganizationDomain>
          }
          groupBy: {
            args: Prisma.OrganizationDomainGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationDomainGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationDomainCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationDomainCountAggregateOutputType> | number
          }
        }
      }
      OrganizationApplication: {
        payload: Prisma.$OrganizationApplicationPayload<ExtArgs>
        fields: Prisma.OrganizationApplicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationApplicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationApplicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationApplicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationApplicationPayload>
          }
          findFirst: {
            args: Prisma.OrganizationApplicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationApplicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationApplicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationApplicationPayload>
          }
          findMany: {
            args: Prisma.OrganizationApplicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationApplicationPayload>[]
          }
          create: {
            args: Prisma.OrganizationApplicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationApplicationPayload>
          }
          createMany: {
            args: Prisma.OrganizationApplicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationApplicationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationApplicationPayload>[]
          }
          delete: {
            args: Prisma.OrganizationApplicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationApplicationPayload>
          }
          update: {
            args: Prisma.OrganizationApplicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationApplicationPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationApplicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationApplicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrganizationApplicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationApplicationPayload>
          }
          aggregate: {
            args: Prisma.OrganizationApplicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganizationApplication>
          }
          groupBy: {
            args: Prisma.OrganizationApplicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationApplicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationApplicationCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationApplicationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type OrganizationCountOutputType
   */

  export type OrganizationCountOutputType = {
    domains: number
  }

  export type OrganizationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domains?: boolean | OrganizationCountOutputTypeCountDomainsArgs
  }

  // Custom InputTypes
  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCountOutputType
     */
    select?: OrganizationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountDomainsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationDomainWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Organization
   */

  export type AggregateOrganization = {
    _count: OrganizationCountAggregateOutputType | null
    _avg: OrganizationAvgAggregateOutputType | null
    _sum: OrganizationSumAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  export type OrganizationAvgAggregateOutputType = {
    expectedUsers: number | null
  }

  export type OrganizationSumAggregateOutputType = {
    expectedUsers: number | null
  }

  export type OrganizationMinAggregateOutputType = {
    id: string | null
    name: string | null
    type: string | null
    description: string | null
    website: string | null
    officialEmail: string | null
    location: string | null
    logoUrl: string | null
    bannerUrl: string | null
    expectedUsers: number | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    billingCustomerId: string | null
    billingTier: string | null
    optOutVirality: boolean | null
  }

  export type OrganizationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    type: string | null
    description: string | null
    website: string | null
    officialEmail: string | null
    location: string | null
    logoUrl: string | null
    bannerUrl: string | null
    expectedUsers: number | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
    billingCustomerId: string | null
    billingTier: string | null
    optOutVirality: boolean | null
  }

  export type OrganizationCountAggregateOutputType = {
    id: number
    name: number
    type: number
    description: number
    website: number
    officialEmail: number
    location: number
    logoUrl: number
    bannerUrl: number
    expectedUsers: number
    status: number
    createdAt: number
    updatedAt: number
    billingCustomerId: number
    billingTier: number
    optOutVirality: number
    _all: number
  }


  export type OrganizationAvgAggregateInputType = {
    expectedUsers?: true
  }

  export type OrganizationSumAggregateInputType = {
    expectedUsers?: true
  }

  export type OrganizationMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    description?: true
    website?: true
    officialEmail?: true
    location?: true
    logoUrl?: true
    bannerUrl?: true
    expectedUsers?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    billingCustomerId?: true
    billingTier?: true
    optOutVirality?: true
  }

  export type OrganizationMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    description?: true
    website?: true
    officialEmail?: true
    location?: true
    logoUrl?: true
    bannerUrl?: true
    expectedUsers?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    billingCustomerId?: true
    billingTier?: true
    optOutVirality?: true
  }

  export type OrganizationCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    description?: true
    website?: true
    officialEmail?: true
    location?: true
    logoUrl?: true
    bannerUrl?: true
    expectedUsers?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    billingCustomerId?: true
    billingTier?: true
    optOutVirality?: true
    _all?: true
  }

  export type OrganizationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organization to aggregate.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Organizations
    **/
    _count?: true | OrganizationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrganizationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrganizationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationMaxAggregateInputType
  }

  export type GetOrganizationAggregateType<T extends OrganizationAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganization[P]>
      : GetScalarType<T[P], AggregateOrganization[P]>
  }




  export type OrganizationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationWhereInput
    orderBy?: OrganizationOrderByWithAggregationInput | OrganizationOrderByWithAggregationInput[]
    by: OrganizationScalarFieldEnum[] | OrganizationScalarFieldEnum
    having?: OrganizationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationCountAggregateInputType | true
    _avg?: OrganizationAvgAggregateInputType
    _sum?: OrganizationSumAggregateInputType
    _min?: OrganizationMinAggregateInputType
    _max?: OrganizationMaxAggregateInputType
  }

  export type OrganizationGroupByOutputType = {
    id: string
    name: string
    type: string
    description: string | null
    website: string | null
    officialEmail: string
    location: string | null
    logoUrl: string | null
    bannerUrl: string | null
    expectedUsers: number | null
    status: string
    createdAt: Date
    updatedAt: Date
    billingCustomerId: string | null
    billingTier: string | null
    optOutVirality: boolean
    _count: OrganizationCountAggregateOutputType | null
    _avg: OrganizationAvgAggregateOutputType | null
    _sum: OrganizationSumAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  type GetOrganizationGroupByPayload<T extends OrganizationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    description?: boolean
    website?: boolean
    officialEmail?: boolean
    location?: boolean
    logoUrl?: boolean
    bannerUrl?: boolean
    expectedUsers?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    billingCustomerId?: boolean
    billingTier?: boolean
    optOutVirality?: boolean
    domains?: boolean | Organization$domainsArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    description?: boolean
    website?: boolean
    officialEmail?: boolean
    location?: boolean
    logoUrl?: boolean
    bannerUrl?: boolean
    expectedUsers?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    billingCustomerId?: boolean
    billingTier?: boolean
    optOutVirality?: boolean
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    description?: boolean
    website?: boolean
    officialEmail?: boolean
    location?: boolean
    logoUrl?: boolean
    bannerUrl?: boolean
    expectedUsers?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    billingCustomerId?: boolean
    billingTier?: boolean
    optOutVirality?: boolean
  }

  export type OrganizationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    domains?: boolean | Organization$domainsArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrganizationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OrganizationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Organization"
    objects: {
      domains: Prisma.$OrganizationDomainPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      type: string
      description: string | null
      website: string | null
      officialEmail: string
      location: string | null
      logoUrl: string | null
      bannerUrl: string | null
      expectedUsers: number | null
      status: string
      createdAt: Date
      updatedAt: Date
      billingCustomerId: string | null
      billingTier: string | null
      optOutVirality: boolean
    }, ExtArgs["result"]["organization"]>
    composites: {}
  }

  type OrganizationGetPayload<S extends boolean | null | undefined | OrganizationDefaultArgs> = $Result.GetResult<Prisma.$OrganizationPayload, S>

  type OrganizationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<OrganizationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OrganizationCountAggregateInputType | true
    }

  export interface OrganizationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Organization'], meta: { name: 'Organization' } }
    /**
     * Find zero or one Organization that matches the filter.
     * @param {OrganizationFindUniqueArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationFindUniqueArgs>(args: SelectSubset<T, OrganizationFindUniqueArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Organization that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {OrganizationFindUniqueOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Organization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationFindFirstArgs>(args?: SelectSubset<T, OrganizationFindFirstArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Organization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Organizations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Organizations
     * const organizations = await prisma.organization.findMany()
     * 
     * // Get first 10 Organizations
     * const organizations = await prisma.organization.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationWithIdOnly = await prisma.organization.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizationFindManyArgs>(args?: SelectSubset<T, OrganizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Organization.
     * @param {OrganizationCreateArgs} args - Arguments to create a Organization.
     * @example
     * // Create one Organization
     * const Organization = await prisma.organization.create({
     *   data: {
     *     // ... data to create a Organization
     *   }
     * })
     * 
     */
    create<T extends OrganizationCreateArgs>(args: SelectSubset<T, OrganizationCreateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Organizations.
     * @param {OrganizationCreateManyArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationCreateManyArgs>(args?: SelectSubset<T, OrganizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Organizations and returns the data saved in the database.
     * @param {OrganizationCreateManyAndReturnArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Organization.
     * @param {OrganizationDeleteArgs} args - Arguments to delete one Organization.
     * @example
     * // Delete one Organization
     * const Organization = await prisma.organization.delete({
     *   where: {
     *     // ... filter to delete one Organization
     *   }
     * })
     * 
     */
    delete<T extends OrganizationDeleteArgs>(args: SelectSubset<T, OrganizationDeleteArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Organization.
     * @param {OrganizationUpdateArgs} args - Arguments to update one Organization.
     * @example
     * // Update one Organization
     * const organization = await prisma.organization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationUpdateArgs>(args: SelectSubset<T, OrganizationUpdateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Organizations.
     * @param {OrganizationDeleteManyArgs} args - Arguments to filter Organizations to delete.
     * @example
     * // Delete a few Organizations
     * const { count } = await prisma.organization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationDeleteManyArgs>(args?: SelectSubset<T, OrganizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationUpdateManyArgs>(args: SelectSubset<T, OrganizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Organization.
     * @param {OrganizationUpsertArgs} args - Arguments to update or create a Organization.
     * @example
     * // Update or create a Organization
     * const organization = await prisma.organization.upsert({
     *   create: {
     *     // ... data to create a Organization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Organization we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationUpsertArgs>(args: SelectSubset<T, OrganizationUpsertArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCountArgs} args - Arguments to filter Organizations to count.
     * @example
     * // Count the number of Organizations
     * const count = await prisma.organization.count({
     *   where: {
     *     // ... the filter for the Organizations we want to count
     *   }
     * })
    **/
    count<T extends OrganizationCountArgs>(
      args?: Subset<T, OrganizationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrganizationAggregateArgs>(args: Subset<T, OrganizationAggregateArgs>): Prisma.PrismaPromise<GetOrganizationAggregateType<T>>

    /**
     * Group by Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrganizationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrganizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Organization model
   */
  readonly fields: OrganizationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Organization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    domains<T extends Organization$domainsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$domainsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationDomainPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Organization model
   */ 
  interface OrganizationFieldRefs {
    readonly id: FieldRef<"Organization", 'String'>
    readonly name: FieldRef<"Organization", 'String'>
    readonly type: FieldRef<"Organization", 'String'>
    readonly description: FieldRef<"Organization", 'String'>
    readonly website: FieldRef<"Organization", 'String'>
    readonly officialEmail: FieldRef<"Organization", 'String'>
    readonly location: FieldRef<"Organization", 'String'>
    readonly logoUrl: FieldRef<"Organization", 'String'>
    readonly bannerUrl: FieldRef<"Organization", 'String'>
    readonly expectedUsers: FieldRef<"Organization", 'Int'>
    readonly status: FieldRef<"Organization", 'String'>
    readonly createdAt: FieldRef<"Organization", 'DateTime'>
    readonly updatedAt: FieldRef<"Organization", 'DateTime'>
    readonly billingCustomerId: FieldRef<"Organization", 'String'>
    readonly billingTier: FieldRef<"Organization", 'String'>
    readonly optOutVirality: FieldRef<"Organization", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Organization findUnique
   */
  export type OrganizationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findUniqueOrThrow
   */
  export type OrganizationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findFirst
   */
  export type OrganizationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findFirstOrThrow
   */
  export type OrganizationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findMany
   */
  export type OrganizationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organizations to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization create
   */
  export type OrganizationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to create a Organization.
     */
    data: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
  }

  /**
   * Organization createMany
   */
  export type OrganizationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization createManyAndReturn
   */
  export type OrganizationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization update
   */
  export type OrganizationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to update a Organization.
     */
    data: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
    /**
     * Choose, which Organization to update.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization updateMany
   */
  export type OrganizationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
  }

  /**
   * Organization upsert
   */
  export type OrganizationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The filter to search for the Organization to update in case it exists.
     */
    where: OrganizationWhereUniqueInput
    /**
     * In case the Organization found by the `where` argument doesn't exist, create a new Organization with this data.
     */
    create: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
    /**
     * In case the Organization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
  }

  /**
   * Organization delete
   */
  export type OrganizationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter which Organization to delete.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization deleteMany
   */
  export type OrganizationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organizations to delete
     */
    where?: OrganizationWhereInput
  }

  /**
   * Organization.domains
   */
  export type Organization$domainsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationDomain
     */
    select?: OrganizationDomainSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationDomainInclude<ExtArgs> | null
    where?: OrganizationDomainWhereInput
    orderBy?: OrganizationDomainOrderByWithRelationInput | OrganizationDomainOrderByWithRelationInput[]
    cursor?: OrganizationDomainWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrganizationDomainScalarFieldEnum | OrganizationDomainScalarFieldEnum[]
  }

  /**
   * Organization without action
   */
  export type OrganizationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
  }


  /**
   * Model OrganizationDomain
   */

  export type AggregateOrganizationDomain = {
    _count: OrganizationDomainCountAggregateOutputType | null
    _min: OrganizationDomainMinAggregateOutputType | null
    _max: OrganizationDomainMaxAggregateOutputType | null
  }

  export type OrganizationDomainMinAggregateOutputType = {
    id: string | null
    organizationId: string | null
    domain: string | null
    addedAt: Date | null
  }

  export type OrganizationDomainMaxAggregateOutputType = {
    id: string | null
    organizationId: string | null
    domain: string | null
    addedAt: Date | null
  }

  export type OrganizationDomainCountAggregateOutputType = {
    id: number
    organizationId: number
    domain: number
    addedAt: number
    _all: number
  }


  export type OrganizationDomainMinAggregateInputType = {
    id?: true
    organizationId?: true
    domain?: true
    addedAt?: true
  }

  export type OrganizationDomainMaxAggregateInputType = {
    id?: true
    organizationId?: true
    domain?: true
    addedAt?: true
  }

  export type OrganizationDomainCountAggregateInputType = {
    id?: true
    organizationId?: true
    domain?: true
    addedAt?: true
    _all?: true
  }

  export type OrganizationDomainAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrganizationDomain to aggregate.
     */
    where?: OrganizationDomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationDomains to fetch.
     */
    orderBy?: OrganizationDomainOrderByWithRelationInput | OrganizationDomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationDomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationDomains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationDomains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrganizationDomains
    **/
    _count?: true | OrganizationDomainCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationDomainMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationDomainMaxAggregateInputType
  }

  export type GetOrganizationDomainAggregateType<T extends OrganizationDomainAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganizationDomain]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganizationDomain[P]>
      : GetScalarType<T[P], AggregateOrganizationDomain[P]>
  }




  export type OrganizationDomainGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationDomainWhereInput
    orderBy?: OrganizationDomainOrderByWithAggregationInput | OrganizationDomainOrderByWithAggregationInput[]
    by: OrganizationDomainScalarFieldEnum[] | OrganizationDomainScalarFieldEnum
    having?: OrganizationDomainScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationDomainCountAggregateInputType | true
    _min?: OrganizationDomainMinAggregateInputType
    _max?: OrganizationDomainMaxAggregateInputType
  }

  export type OrganizationDomainGroupByOutputType = {
    id: string
    organizationId: string
    domain: string
    addedAt: Date
    _count: OrganizationDomainCountAggregateOutputType | null
    _min: OrganizationDomainMinAggregateOutputType | null
    _max: OrganizationDomainMaxAggregateOutputType | null
  }

  type GetOrganizationDomainGroupByPayload<T extends OrganizationDomainGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationDomainGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationDomainGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationDomainGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationDomainGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationDomainSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    domain?: boolean
    addedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizationDomain"]>

  export type OrganizationDomainSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    organizationId?: boolean
    domain?: boolean
    addedAt?: boolean
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organizationDomain"]>

  export type OrganizationDomainSelectScalar = {
    id?: boolean
    organizationId?: boolean
    domain?: boolean
    addedAt?: boolean
  }

  export type OrganizationDomainInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }
  export type OrganizationDomainIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $OrganizationDomainPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrganizationDomain"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      organizationId: string
      domain: string
      addedAt: Date
    }, ExtArgs["result"]["organizationDomain"]>
    composites: {}
  }

  type OrganizationDomainGetPayload<S extends boolean | null | undefined | OrganizationDomainDefaultArgs> = $Result.GetResult<Prisma.$OrganizationDomainPayload, S>

  type OrganizationDomainCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<OrganizationDomainFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OrganizationDomainCountAggregateInputType | true
    }

  export interface OrganizationDomainDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrganizationDomain'], meta: { name: 'OrganizationDomain' } }
    /**
     * Find zero or one OrganizationDomain that matches the filter.
     * @param {OrganizationDomainFindUniqueArgs} args - Arguments to find a OrganizationDomain
     * @example
     * // Get one OrganizationDomain
     * const organizationDomain = await prisma.organizationDomain.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationDomainFindUniqueArgs>(args: SelectSubset<T, OrganizationDomainFindUniqueArgs<ExtArgs>>): Prisma__OrganizationDomainClient<$Result.GetResult<Prisma.$OrganizationDomainPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one OrganizationDomain that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {OrganizationDomainFindUniqueOrThrowArgs} args - Arguments to find a OrganizationDomain
     * @example
     * // Get one OrganizationDomain
     * const organizationDomain = await prisma.organizationDomain.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationDomainFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationDomainFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationDomainClient<$Result.GetResult<Prisma.$OrganizationDomainPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first OrganizationDomain that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationDomainFindFirstArgs} args - Arguments to find a OrganizationDomain
     * @example
     * // Get one OrganizationDomain
     * const organizationDomain = await prisma.organizationDomain.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationDomainFindFirstArgs>(args?: SelectSubset<T, OrganizationDomainFindFirstArgs<ExtArgs>>): Prisma__OrganizationDomainClient<$Result.GetResult<Prisma.$OrganizationDomainPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first OrganizationDomain that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationDomainFindFirstOrThrowArgs} args - Arguments to find a OrganizationDomain
     * @example
     * // Get one OrganizationDomain
     * const organizationDomain = await prisma.organizationDomain.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationDomainFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationDomainFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationDomainClient<$Result.GetResult<Prisma.$OrganizationDomainPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more OrganizationDomains that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationDomainFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrganizationDomains
     * const organizationDomains = await prisma.organizationDomain.findMany()
     * 
     * // Get first 10 OrganizationDomains
     * const organizationDomains = await prisma.organizationDomain.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationDomainWithIdOnly = await prisma.organizationDomain.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizationDomainFindManyArgs>(args?: SelectSubset<T, OrganizationDomainFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationDomainPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a OrganizationDomain.
     * @param {OrganizationDomainCreateArgs} args - Arguments to create a OrganizationDomain.
     * @example
     * // Create one OrganizationDomain
     * const OrganizationDomain = await prisma.organizationDomain.create({
     *   data: {
     *     // ... data to create a OrganizationDomain
     *   }
     * })
     * 
     */
    create<T extends OrganizationDomainCreateArgs>(args: SelectSubset<T, OrganizationDomainCreateArgs<ExtArgs>>): Prisma__OrganizationDomainClient<$Result.GetResult<Prisma.$OrganizationDomainPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many OrganizationDomains.
     * @param {OrganizationDomainCreateManyArgs} args - Arguments to create many OrganizationDomains.
     * @example
     * // Create many OrganizationDomains
     * const organizationDomain = await prisma.organizationDomain.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationDomainCreateManyArgs>(args?: SelectSubset<T, OrganizationDomainCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrganizationDomains and returns the data saved in the database.
     * @param {OrganizationDomainCreateManyAndReturnArgs} args - Arguments to create many OrganizationDomains.
     * @example
     * // Create many OrganizationDomains
     * const organizationDomain = await prisma.organizationDomain.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrganizationDomains and only return the `id`
     * const organizationDomainWithIdOnly = await prisma.organizationDomain.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationDomainCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationDomainCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationDomainPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a OrganizationDomain.
     * @param {OrganizationDomainDeleteArgs} args - Arguments to delete one OrganizationDomain.
     * @example
     * // Delete one OrganizationDomain
     * const OrganizationDomain = await prisma.organizationDomain.delete({
     *   where: {
     *     // ... filter to delete one OrganizationDomain
     *   }
     * })
     * 
     */
    delete<T extends OrganizationDomainDeleteArgs>(args: SelectSubset<T, OrganizationDomainDeleteArgs<ExtArgs>>): Prisma__OrganizationDomainClient<$Result.GetResult<Prisma.$OrganizationDomainPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one OrganizationDomain.
     * @param {OrganizationDomainUpdateArgs} args - Arguments to update one OrganizationDomain.
     * @example
     * // Update one OrganizationDomain
     * const organizationDomain = await prisma.organizationDomain.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationDomainUpdateArgs>(args: SelectSubset<T, OrganizationDomainUpdateArgs<ExtArgs>>): Prisma__OrganizationDomainClient<$Result.GetResult<Prisma.$OrganizationDomainPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more OrganizationDomains.
     * @param {OrganizationDomainDeleteManyArgs} args - Arguments to filter OrganizationDomains to delete.
     * @example
     * // Delete a few OrganizationDomains
     * const { count } = await prisma.organizationDomain.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationDomainDeleteManyArgs>(args?: SelectSubset<T, OrganizationDomainDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrganizationDomains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationDomainUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrganizationDomains
     * const organizationDomain = await prisma.organizationDomain.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationDomainUpdateManyArgs>(args: SelectSubset<T, OrganizationDomainUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OrganizationDomain.
     * @param {OrganizationDomainUpsertArgs} args - Arguments to update or create a OrganizationDomain.
     * @example
     * // Update or create a OrganizationDomain
     * const organizationDomain = await prisma.organizationDomain.upsert({
     *   create: {
     *     // ... data to create a OrganizationDomain
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrganizationDomain we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationDomainUpsertArgs>(args: SelectSubset<T, OrganizationDomainUpsertArgs<ExtArgs>>): Prisma__OrganizationDomainClient<$Result.GetResult<Prisma.$OrganizationDomainPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of OrganizationDomains.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationDomainCountArgs} args - Arguments to filter OrganizationDomains to count.
     * @example
     * // Count the number of OrganizationDomains
     * const count = await prisma.organizationDomain.count({
     *   where: {
     *     // ... the filter for the OrganizationDomains we want to count
     *   }
     * })
    **/
    count<T extends OrganizationDomainCountArgs>(
      args?: Subset<T, OrganizationDomainCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationDomainCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrganizationDomain.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationDomainAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrganizationDomainAggregateArgs>(args: Subset<T, OrganizationDomainAggregateArgs>): Prisma.PrismaPromise<GetOrganizationDomainAggregateType<T>>

    /**
     * Group by OrganizationDomain.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationDomainGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrganizationDomainGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationDomainGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationDomainGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrganizationDomainGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationDomainGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrganizationDomain model
   */
  readonly fields: OrganizationDomainFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrganizationDomain.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationDomainClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrganizationDomain model
   */ 
  interface OrganizationDomainFieldRefs {
    readonly id: FieldRef<"OrganizationDomain", 'String'>
    readonly organizationId: FieldRef<"OrganizationDomain", 'String'>
    readonly domain: FieldRef<"OrganizationDomain", 'String'>
    readonly addedAt: FieldRef<"OrganizationDomain", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrganizationDomain findUnique
   */
  export type OrganizationDomainFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationDomain
     */
    select?: OrganizationDomainSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationDomainInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationDomain to fetch.
     */
    where: OrganizationDomainWhereUniqueInput
  }

  /**
   * OrganizationDomain findUniqueOrThrow
   */
  export type OrganizationDomainFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationDomain
     */
    select?: OrganizationDomainSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationDomainInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationDomain to fetch.
     */
    where: OrganizationDomainWhereUniqueInput
  }

  /**
   * OrganizationDomain findFirst
   */
  export type OrganizationDomainFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationDomain
     */
    select?: OrganizationDomainSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationDomainInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationDomain to fetch.
     */
    where?: OrganizationDomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationDomains to fetch.
     */
    orderBy?: OrganizationDomainOrderByWithRelationInput | OrganizationDomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrganizationDomains.
     */
    cursor?: OrganizationDomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationDomains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationDomains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizationDomains.
     */
    distinct?: OrganizationDomainScalarFieldEnum | OrganizationDomainScalarFieldEnum[]
  }

  /**
   * OrganizationDomain findFirstOrThrow
   */
  export type OrganizationDomainFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationDomain
     */
    select?: OrganizationDomainSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationDomainInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationDomain to fetch.
     */
    where?: OrganizationDomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationDomains to fetch.
     */
    orderBy?: OrganizationDomainOrderByWithRelationInput | OrganizationDomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrganizationDomains.
     */
    cursor?: OrganizationDomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationDomains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationDomains.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizationDomains.
     */
    distinct?: OrganizationDomainScalarFieldEnum | OrganizationDomainScalarFieldEnum[]
  }

  /**
   * OrganizationDomain findMany
   */
  export type OrganizationDomainFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationDomain
     */
    select?: OrganizationDomainSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationDomainInclude<ExtArgs> | null
    /**
     * Filter, which OrganizationDomains to fetch.
     */
    where?: OrganizationDomainWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationDomains to fetch.
     */
    orderBy?: OrganizationDomainOrderByWithRelationInput | OrganizationDomainOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrganizationDomains.
     */
    cursor?: OrganizationDomainWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationDomains from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationDomains.
     */
    skip?: number
    distinct?: OrganizationDomainScalarFieldEnum | OrganizationDomainScalarFieldEnum[]
  }

  /**
   * OrganizationDomain create
   */
  export type OrganizationDomainCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationDomain
     */
    select?: OrganizationDomainSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationDomainInclude<ExtArgs> | null
    /**
     * The data needed to create a OrganizationDomain.
     */
    data: XOR<OrganizationDomainCreateInput, OrganizationDomainUncheckedCreateInput>
  }

  /**
   * OrganizationDomain createMany
   */
  export type OrganizationDomainCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrganizationDomains.
     */
    data: OrganizationDomainCreateManyInput | OrganizationDomainCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrganizationDomain createManyAndReturn
   */
  export type OrganizationDomainCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationDomain
     */
    select?: OrganizationDomainSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many OrganizationDomains.
     */
    data: OrganizationDomainCreateManyInput | OrganizationDomainCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationDomainIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrganizationDomain update
   */
  export type OrganizationDomainUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationDomain
     */
    select?: OrganizationDomainSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationDomainInclude<ExtArgs> | null
    /**
     * The data needed to update a OrganizationDomain.
     */
    data: XOR<OrganizationDomainUpdateInput, OrganizationDomainUncheckedUpdateInput>
    /**
     * Choose, which OrganizationDomain to update.
     */
    where: OrganizationDomainWhereUniqueInput
  }

  /**
   * OrganizationDomain updateMany
   */
  export type OrganizationDomainUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrganizationDomains.
     */
    data: XOR<OrganizationDomainUpdateManyMutationInput, OrganizationDomainUncheckedUpdateManyInput>
    /**
     * Filter which OrganizationDomains to update
     */
    where?: OrganizationDomainWhereInput
  }

  /**
   * OrganizationDomain upsert
   */
  export type OrganizationDomainUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationDomain
     */
    select?: OrganizationDomainSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationDomainInclude<ExtArgs> | null
    /**
     * The filter to search for the OrganizationDomain to update in case it exists.
     */
    where: OrganizationDomainWhereUniqueInput
    /**
     * In case the OrganizationDomain found by the `where` argument doesn't exist, create a new OrganizationDomain with this data.
     */
    create: XOR<OrganizationDomainCreateInput, OrganizationDomainUncheckedCreateInput>
    /**
     * In case the OrganizationDomain was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationDomainUpdateInput, OrganizationDomainUncheckedUpdateInput>
  }

  /**
   * OrganizationDomain delete
   */
  export type OrganizationDomainDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationDomain
     */
    select?: OrganizationDomainSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationDomainInclude<ExtArgs> | null
    /**
     * Filter which OrganizationDomain to delete.
     */
    where: OrganizationDomainWhereUniqueInput
  }

  /**
   * OrganizationDomain deleteMany
   */
  export type OrganizationDomainDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrganizationDomains to delete
     */
    where?: OrganizationDomainWhereInput
  }

  /**
   * OrganizationDomain without action
   */
  export type OrganizationDomainDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationDomain
     */
    select?: OrganizationDomainSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationDomainInclude<ExtArgs> | null
  }


  /**
   * Model OrganizationApplication
   */

  export type AggregateOrganizationApplication = {
    _count: OrganizationApplicationCountAggregateOutputType | null
    _avg: OrganizationApplicationAvgAggregateOutputType | null
    _sum: OrganizationApplicationSumAggregateOutputType | null
    _min: OrganizationApplicationMinAggregateOutputType | null
    _max: OrganizationApplicationMaxAggregateOutputType | null
  }

  export type OrganizationApplicationAvgAggregateOutputType = {
    expectedUsers: number | null
  }

  export type OrganizationApplicationSumAggregateOutputType = {
    expectedUsers: number | null
  }

  export type OrganizationApplicationMinAggregateOutputType = {
    id: string | null
    applicantUserId: string | null
    applicantName: string | null
    applicantPhone: string | null
    proofFileUrl: string | null
    name: string | null
    type: string | null
    location: string | null
    website: string | null
    description: string | null
    officialEmail: string | null
    expectedUsers: number | null
    logoUrl: string | null
    orgAccountName: string | null
    orgAccountUsername: string | null
    status: string | null
    submittedAt: Date | null
    reviewedAt: Date | null
    reviewedBy: string | null
  }

  export type OrganizationApplicationMaxAggregateOutputType = {
    id: string | null
    applicantUserId: string | null
    applicantName: string | null
    applicantPhone: string | null
    proofFileUrl: string | null
    name: string | null
    type: string | null
    location: string | null
    website: string | null
    description: string | null
    officialEmail: string | null
    expectedUsers: number | null
    logoUrl: string | null
    orgAccountName: string | null
    orgAccountUsername: string | null
    status: string | null
    submittedAt: Date | null
    reviewedAt: Date | null
    reviewedBy: string | null
  }

  export type OrganizationApplicationCountAggregateOutputType = {
    id: number
    applicantUserId: number
    applicantName: number
    applicantPhone: number
    proofFileUrl: number
    name: number
    type: number
    location: number
    website: number
    description: number
    officialEmail: number
    expectedUsers: number
    domains: number
    logoUrl: number
    orgAccountName: number
    orgAccountUsername: number
    status: number
    submittedAt: number
    reviewedAt: number
    reviewedBy: number
    _all: number
  }


  export type OrganizationApplicationAvgAggregateInputType = {
    expectedUsers?: true
  }

  export type OrganizationApplicationSumAggregateInputType = {
    expectedUsers?: true
  }

  export type OrganizationApplicationMinAggregateInputType = {
    id?: true
    applicantUserId?: true
    applicantName?: true
    applicantPhone?: true
    proofFileUrl?: true
    name?: true
    type?: true
    location?: true
    website?: true
    description?: true
    officialEmail?: true
    expectedUsers?: true
    logoUrl?: true
    orgAccountName?: true
    orgAccountUsername?: true
    status?: true
    submittedAt?: true
    reviewedAt?: true
    reviewedBy?: true
  }

  export type OrganizationApplicationMaxAggregateInputType = {
    id?: true
    applicantUserId?: true
    applicantName?: true
    applicantPhone?: true
    proofFileUrl?: true
    name?: true
    type?: true
    location?: true
    website?: true
    description?: true
    officialEmail?: true
    expectedUsers?: true
    logoUrl?: true
    orgAccountName?: true
    orgAccountUsername?: true
    status?: true
    submittedAt?: true
    reviewedAt?: true
    reviewedBy?: true
  }

  export type OrganizationApplicationCountAggregateInputType = {
    id?: true
    applicantUserId?: true
    applicantName?: true
    applicantPhone?: true
    proofFileUrl?: true
    name?: true
    type?: true
    location?: true
    website?: true
    description?: true
    officialEmail?: true
    expectedUsers?: true
    domains?: true
    logoUrl?: true
    orgAccountName?: true
    orgAccountUsername?: true
    status?: true
    submittedAt?: true
    reviewedAt?: true
    reviewedBy?: true
    _all?: true
  }

  export type OrganizationApplicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrganizationApplication to aggregate.
     */
    where?: OrganizationApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationApplications to fetch.
     */
    orderBy?: OrganizationApplicationOrderByWithRelationInput | OrganizationApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrganizationApplications
    **/
    _count?: true | OrganizationApplicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrganizationApplicationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrganizationApplicationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationApplicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationApplicationMaxAggregateInputType
  }

  export type GetOrganizationApplicationAggregateType<T extends OrganizationApplicationAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganizationApplication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganizationApplication[P]>
      : GetScalarType<T[P], AggregateOrganizationApplication[P]>
  }




  export type OrganizationApplicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationApplicationWhereInput
    orderBy?: OrganizationApplicationOrderByWithAggregationInput | OrganizationApplicationOrderByWithAggregationInput[]
    by: OrganizationApplicationScalarFieldEnum[] | OrganizationApplicationScalarFieldEnum
    having?: OrganizationApplicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationApplicationCountAggregateInputType | true
    _avg?: OrganizationApplicationAvgAggregateInputType
    _sum?: OrganizationApplicationSumAggregateInputType
    _min?: OrganizationApplicationMinAggregateInputType
    _max?: OrganizationApplicationMaxAggregateInputType
  }

  export type OrganizationApplicationGroupByOutputType = {
    id: string
    applicantUserId: string
    applicantName: string
    applicantPhone: string
    proofFileUrl: string | null
    name: string
    type: string
    location: string | null
    website: string | null
    description: string | null
    officialEmail: string
    expectedUsers: number | null
    domains: string[]
    logoUrl: string | null
    orgAccountName: string | null
    orgAccountUsername: string | null
    status: string
    submittedAt: Date
    reviewedAt: Date | null
    reviewedBy: string | null
    _count: OrganizationApplicationCountAggregateOutputType | null
    _avg: OrganizationApplicationAvgAggregateOutputType | null
    _sum: OrganizationApplicationSumAggregateOutputType | null
    _min: OrganizationApplicationMinAggregateOutputType | null
    _max: OrganizationApplicationMaxAggregateOutputType | null
  }

  type GetOrganizationApplicationGroupByPayload<T extends OrganizationApplicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationApplicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationApplicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationApplicationGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationApplicationGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationApplicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicantUserId?: boolean
    applicantName?: boolean
    applicantPhone?: boolean
    proofFileUrl?: boolean
    name?: boolean
    type?: boolean
    location?: boolean
    website?: boolean
    description?: boolean
    officialEmail?: boolean
    expectedUsers?: boolean
    domains?: boolean
    logoUrl?: boolean
    orgAccountName?: boolean
    orgAccountUsername?: boolean
    status?: boolean
    submittedAt?: boolean
    reviewedAt?: boolean
    reviewedBy?: boolean
  }, ExtArgs["result"]["organizationApplication"]>

  export type OrganizationApplicationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicantUserId?: boolean
    applicantName?: boolean
    applicantPhone?: boolean
    proofFileUrl?: boolean
    name?: boolean
    type?: boolean
    location?: boolean
    website?: boolean
    description?: boolean
    officialEmail?: boolean
    expectedUsers?: boolean
    domains?: boolean
    logoUrl?: boolean
    orgAccountName?: boolean
    orgAccountUsername?: boolean
    status?: boolean
    submittedAt?: boolean
    reviewedAt?: boolean
    reviewedBy?: boolean
  }, ExtArgs["result"]["organizationApplication"]>

  export type OrganizationApplicationSelectScalar = {
    id?: boolean
    applicantUserId?: boolean
    applicantName?: boolean
    applicantPhone?: boolean
    proofFileUrl?: boolean
    name?: boolean
    type?: boolean
    location?: boolean
    website?: boolean
    description?: boolean
    officialEmail?: boolean
    expectedUsers?: boolean
    domains?: boolean
    logoUrl?: boolean
    orgAccountName?: boolean
    orgAccountUsername?: boolean
    status?: boolean
    submittedAt?: boolean
    reviewedAt?: boolean
    reviewedBy?: boolean
  }


  export type $OrganizationApplicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrganizationApplication"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      applicantUserId: string
      applicantName: string
      applicantPhone: string
      proofFileUrl: string | null
      name: string
      type: string
      location: string | null
      website: string | null
      description: string | null
      officialEmail: string
      expectedUsers: number | null
      domains: string[]
      logoUrl: string | null
      orgAccountName: string | null
      orgAccountUsername: string | null
      status: string
      submittedAt: Date
      reviewedAt: Date | null
      reviewedBy: string | null
    }, ExtArgs["result"]["organizationApplication"]>
    composites: {}
  }

  type OrganizationApplicationGetPayload<S extends boolean | null | undefined | OrganizationApplicationDefaultArgs> = $Result.GetResult<Prisma.$OrganizationApplicationPayload, S>

  type OrganizationApplicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<OrganizationApplicationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OrganizationApplicationCountAggregateInputType | true
    }

  export interface OrganizationApplicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrganizationApplication'], meta: { name: 'OrganizationApplication' } }
    /**
     * Find zero or one OrganizationApplication that matches the filter.
     * @param {OrganizationApplicationFindUniqueArgs} args - Arguments to find a OrganizationApplication
     * @example
     * // Get one OrganizationApplication
     * const organizationApplication = await prisma.organizationApplication.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationApplicationFindUniqueArgs>(args: SelectSubset<T, OrganizationApplicationFindUniqueArgs<ExtArgs>>): Prisma__OrganizationApplicationClient<$Result.GetResult<Prisma.$OrganizationApplicationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one OrganizationApplication that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {OrganizationApplicationFindUniqueOrThrowArgs} args - Arguments to find a OrganizationApplication
     * @example
     * // Get one OrganizationApplication
     * const organizationApplication = await prisma.organizationApplication.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationApplicationFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationApplicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationApplicationClient<$Result.GetResult<Prisma.$OrganizationApplicationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first OrganizationApplication that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationApplicationFindFirstArgs} args - Arguments to find a OrganizationApplication
     * @example
     * // Get one OrganizationApplication
     * const organizationApplication = await prisma.organizationApplication.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationApplicationFindFirstArgs>(args?: SelectSubset<T, OrganizationApplicationFindFirstArgs<ExtArgs>>): Prisma__OrganizationApplicationClient<$Result.GetResult<Prisma.$OrganizationApplicationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first OrganizationApplication that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationApplicationFindFirstOrThrowArgs} args - Arguments to find a OrganizationApplication
     * @example
     * // Get one OrganizationApplication
     * const organizationApplication = await prisma.organizationApplication.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationApplicationFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationApplicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationApplicationClient<$Result.GetResult<Prisma.$OrganizationApplicationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more OrganizationApplications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationApplicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrganizationApplications
     * const organizationApplications = await prisma.organizationApplication.findMany()
     * 
     * // Get first 10 OrganizationApplications
     * const organizationApplications = await prisma.organizationApplication.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationApplicationWithIdOnly = await prisma.organizationApplication.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizationApplicationFindManyArgs>(args?: SelectSubset<T, OrganizationApplicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationApplicationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a OrganizationApplication.
     * @param {OrganizationApplicationCreateArgs} args - Arguments to create a OrganizationApplication.
     * @example
     * // Create one OrganizationApplication
     * const OrganizationApplication = await prisma.organizationApplication.create({
     *   data: {
     *     // ... data to create a OrganizationApplication
     *   }
     * })
     * 
     */
    create<T extends OrganizationApplicationCreateArgs>(args: SelectSubset<T, OrganizationApplicationCreateArgs<ExtArgs>>): Prisma__OrganizationApplicationClient<$Result.GetResult<Prisma.$OrganizationApplicationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many OrganizationApplications.
     * @param {OrganizationApplicationCreateManyArgs} args - Arguments to create many OrganizationApplications.
     * @example
     * // Create many OrganizationApplications
     * const organizationApplication = await prisma.organizationApplication.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationApplicationCreateManyArgs>(args?: SelectSubset<T, OrganizationApplicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrganizationApplications and returns the data saved in the database.
     * @param {OrganizationApplicationCreateManyAndReturnArgs} args - Arguments to create many OrganizationApplications.
     * @example
     * // Create many OrganizationApplications
     * const organizationApplication = await prisma.organizationApplication.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrganizationApplications and only return the `id`
     * const organizationApplicationWithIdOnly = await prisma.organizationApplication.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationApplicationCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationApplicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationApplicationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a OrganizationApplication.
     * @param {OrganizationApplicationDeleteArgs} args - Arguments to delete one OrganizationApplication.
     * @example
     * // Delete one OrganizationApplication
     * const OrganizationApplication = await prisma.organizationApplication.delete({
     *   where: {
     *     // ... filter to delete one OrganizationApplication
     *   }
     * })
     * 
     */
    delete<T extends OrganizationApplicationDeleteArgs>(args: SelectSubset<T, OrganizationApplicationDeleteArgs<ExtArgs>>): Prisma__OrganizationApplicationClient<$Result.GetResult<Prisma.$OrganizationApplicationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one OrganizationApplication.
     * @param {OrganizationApplicationUpdateArgs} args - Arguments to update one OrganizationApplication.
     * @example
     * // Update one OrganizationApplication
     * const organizationApplication = await prisma.organizationApplication.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationApplicationUpdateArgs>(args: SelectSubset<T, OrganizationApplicationUpdateArgs<ExtArgs>>): Prisma__OrganizationApplicationClient<$Result.GetResult<Prisma.$OrganizationApplicationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more OrganizationApplications.
     * @param {OrganizationApplicationDeleteManyArgs} args - Arguments to filter OrganizationApplications to delete.
     * @example
     * // Delete a few OrganizationApplications
     * const { count } = await prisma.organizationApplication.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationApplicationDeleteManyArgs>(args?: SelectSubset<T, OrganizationApplicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrganizationApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationApplicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrganizationApplications
     * const organizationApplication = await prisma.organizationApplication.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationApplicationUpdateManyArgs>(args: SelectSubset<T, OrganizationApplicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OrganizationApplication.
     * @param {OrganizationApplicationUpsertArgs} args - Arguments to update or create a OrganizationApplication.
     * @example
     * // Update or create a OrganizationApplication
     * const organizationApplication = await prisma.organizationApplication.upsert({
     *   create: {
     *     // ... data to create a OrganizationApplication
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrganizationApplication we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationApplicationUpsertArgs>(args: SelectSubset<T, OrganizationApplicationUpsertArgs<ExtArgs>>): Prisma__OrganizationApplicationClient<$Result.GetResult<Prisma.$OrganizationApplicationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of OrganizationApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationApplicationCountArgs} args - Arguments to filter OrganizationApplications to count.
     * @example
     * // Count the number of OrganizationApplications
     * const count = await prisma.organizationApplication.count({
     *   where: {
     *     // ... the filter for the OrganizationApplications we want to count
     *   }
     * })
    **/
    count<T extends OrganizationApplicationCountArgs>(
      args?: Subset<T, OrganizationApplicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationApplicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrganizationApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationApplicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrganizationApplicationAggregateArgs>(args: Subset<T, OrganizationApplicationAggregateArgs>): Prisma.PrismaPromise<GetOrganizationApplicationAggregateType<T>>

    /**
     * Group by OrganizationApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationApplicationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrganizationApplicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationApplicationGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationApplicationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrganizationApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrganizationApplication model
   */
  readonly fields: OrganizationApplicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrganizationApplication.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationApplicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrganizationApplication model
   */ 
  interface OrganizationApplicationFieldRefs {
    readonly id: FieldRef<"OrganizationApplication", 'String'>
    readonly applicantUserId: FieldRef<"OrganizationApplication", 'String'>
    readonly applicantName: FieldRef<"OrganizationApplication", 'String'>
    readonly applicantPhone: FieldRef<"OrganizationApplication", 'String'>
    readonly proofFileUrl: FieldRef<"OrganizationApplication", 'String'>
    readonly name: FieldRef<"OrganizationApplication", 'String'>
    readonly type: FieldRef<"OrganizationApplication", 'String'>
    readonly location: FieldRef<"OrganizationApplication", 'String'>
    readonly website: FieldRef<"OrganizationApplication", 'String'>
    readonly description: FieldRef<"OrganizationApplication", 'String'>
    readonly officialEmail: FieldRef<"OrganizationApplication", 'String'>
    readonly expectedUsers: FieldRef<"OrganizationApplication", 'Int'>
    readonly domains: FieldRef<"OrganizationApplication", 'String[]'>
    readonly logoUrl: FieldRef<"OrganizationApplication", 'String'>
    readonly orgAccountName: FieldRef<"OrganizationApplication", 'String'>
    readonly orgAccountUsername: FieldRef<"OrganizationApplication", 'String'>
    readonly status: FieldRef<"OrganizationApplication", 'String'>
    readonly submittedAt: FieldRef<"OrganizationApplication", 'DateTime'>
    readonly reviewedAt: FieldRef<"OrganizationApplication", 'DateTime'>
    readonly reviewedBy: FieldRef<"OrganizationApplication", 'String'>
  }
    

  // Custom InputTypes
  /**
   * OrganizationApplication findUnique
   */
  export type OrganizationApplicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationApplication
     */
    select?: OrganizationApplicationSelect<ExtArgs> | null
    /**
     * Filter, which OrganizationApplication to fetch.
     */
    where: OrganizationApplicationWhereUniqueInput
  }

  /**
   * OrganizationApplication findUniqueOrThrow
   */
  export type OrganizationApplicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationApplication
     */
    select?: OrganizationApplicationSelect<ExtArgs> | null
    /**
     * Filter, which OrganizationApplication to fetch.
     */
    where: OrganizationApplicationWhereUniqueInput
  }

  /**
   * OrganizationApplication findFirst
   */
  export type OrganizationApplicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationApplication
     */
    select?: OrganizationApplicationSelect<ExtArgs> | null
    /**
     * Filter, which OrganizationApplication to fetch.
     */
    where?: OrganizationApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationApplications to fetch.
     */
    orderBy?: OrganizationApplicationOrderByWithRelationInput | OrganizationApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrganizationApplications.
     */
    cursor?: OrganizationApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizationApplications.
     */
    distinct?: OrganizationApplicationScalarFieldEnum | OrganizationApplicationScalarFieldEnum[]
  }

  /**
   * OrganizationApplication findFirstOrThrow
   */
  export type OrganizationApplicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationApplication
     */
    select?: OrganizationApplicationSelect<ExtArgs> | null
    /**
     * Filter, which OrganizationApplication to fetch.
     */
    where?: OrganizationApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationApplications to fetch.
     */
    orderBy?: OrganizationApplicationOrderByWithRelationInput | OrganizationApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrganizationApplications.
     */
    cursor?: OrganizationApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrganizationApplications.
     */
    distinct?: OrganizationApplicationScalarFieldEnum | OrganizationApplicationScalarFieldEnum[]
  }

  /**
   * OrganizationApplication findMany
   */
  export type OrganizationApplicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationApplication
     */
    select?: OrganizationApplicationSelect<ExtArgs> | null
    /**
     * Filter, which OrganizationApplications to fetch.
     */
    where?: OrganizationApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrganizationApplications to fetch.
     */
    orderBy?: OrganizationApplicationOrderByWithRelationInput | OrganizationApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrganizationApplications.
     */
    cursor?: OrganizationApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrganizationApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrganizationApplications.
     */
    skip?: number
    distinct?: OrganizationApplicationScalarFieldEnum | OrganizationApplicationScalarFieldEnum[]
  }

  /**
   * OrganizationApplication create
   */
  export type OrganizationApplicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationApplication
     */
    select?: OrganizationApplicationSelect<ExtArgs> | null
    /**
     * The data needed to create a OrganizationApplication.
     */
    data: XOR<OrganizationApplicationCreateInput, OrganizationApplicationUncheckedCreateInput>
  }

  /**
   * OrganizationApplication createMany
   */
  export type OrganizationApplicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrganizationApplications.
     */
    data: OrganizationApplicationCreateManyInput | OrganizationApplicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrganizationApplication createManyAndReturn
   */
  export type OrganizationApplicationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationApplication
     */
    select?: OrganizationApplicationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many OrganizationApplications.
     */
    data: OrganizationApplicationCreateManyInput | OrganizationApplicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrganizationApplication update
   */
  export type OrganizationApplicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationApplication
     */
    select?: OrganizationApplicationSelect<ExtArgs> | null
    /**
     * The data needed to update a OrganizationApplication.
     */
    data: XOR<OrganizationApplicationUpdateInput, OrganizationApplicationUncheckedUpdateInput>
    /**
     * Choose, which OrganizationApplication to update.
     */
    where: OrganizationApplicationWhereUniqueInput
  }

  /**
   * OrganizationApplication updateMany
   */
  export type OrganizationApplicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrganizationApplications.
     */
    data: XOR<OrganizationApplicationUpdateManyMutationInput, OrganizationApplicationUncheckedUpdateManyInput>
    /**
     * Filter which OrganizationApplications to update
     */
    where?: OrganizationApplicationWhereInput
  }

  /**
   * OrganizationApplication upsert
   */
  export type OrganizationApplicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationApplication
     */
    select?: OrganizationApplicationSelect<ExtArgs> | null
    /**
     * The filter to search for the OrganizationApplication to update in case it exists.
     */
    where: OrganizationApplicationWhereUniqueInput
    /**
     * In case the OrganizationApplication found by the `where` argument doesn't exist, create a new OrganizationApplication with this data.
     */
    create: XOR<OrganizationApplicationCreateInput, OrganizationApplicationUncheckedCreateInput>
    /**
     * In case the OrganizationApplication was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationApplicationUpdateInput, OrganizationApplicationUncheckedUpdateInput>
  }

  /**
   * OrganizationApplication delete
   */
  export type OrganizationApplicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationApplication
     */
    select?: OrganizationApplicationSelect<ExtArgs> | null
    /**
     * Filter which OrganizationApplication to delete.
     */
    where: OrganizationApplicationWhereUniqueInput
  }

  /**
   * OrganizationApplication deleteMany
   */
  export type OrganizationApplicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrganizationApplications to delete
     */
    where?: OrganizationApplicationWhereInput
  }

  /**
   * OrganizationApplication without action
   */
  export type OrganizationApplicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationApplication
     */
    select?: OrganizationApplicationSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const OrganizationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    type: 'type',
    description: 'description',
    website: 'website',
    officialEmail: 'officialEmail',
    location: 'location',
    logoUrl: 'logoUrl',
    bannerUrl: 'bannerUrl',
    expectedUsers: 'expectedUsers',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    billingCustomerId: 'billingCustomerId',
    billingTier: 'billingTier',
    optOutVirality: 'optOutVirality'
  };

  export type OrganizationScalarFieldEnum = (typeof OrganizationScalarFieldEnum)[keyof typeof OrganizationScalarFieldEnum]


  export const OrganizationDomainScalarFieldEnum: {
    id: 'id',
    organizationId: 'organizationId',
    domain: 'domain',
    addedAt: 'addedAt'
  };

  export type OrganizationDomainScalarFieldEnum = (typeof OrganizationDomainScalarFieldEnum)[keyof typeof OrganizationDomainScalarFieldEnum]


  export const OrganizationApplicationScalarFieldEnum: {
    id: 'id',
    applicantUserId: 'applicantUserId',
    applicantName: 'applicantName',
    applicantPhone: 'applicantPhone',
    proofFileUrl: 'proofFileUrl',
    name: 'name',
    type: 'type',
    location: 'location',
    website: 'website',
    description: 'description',
    officialEmail: 'officialEmail',
    expectedUsers: 'expectedUsers',
    domains: 'domains',
    logoUrl: 'logoUrl',
    orgAccountName: 'orgAccountName',
    orgAccountUsername: 'orgAccountUsername',
    status: 'status',
    submittedAt: 'submittedAt',
    reviewedAt: 'reviewedAt',
    reviewedBy: 'reviewedBy'
  };

  export type OrganizationApplicationScalarFieldEnum = (typeof OrganizationApplicationScalarFieldEnum)[keyof typeof OrganizationApplicationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type OrganizationWhereInput = {
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    id?: StringFilter<"Organization"> | string
    name?: StringFilter<"Organization"> | string
    type?: StringFilter<"Organization"> | string
    description?: StringNullableFilter<"Organization"> | string | null
    website?: StringNullableFilter<"Organization"> | string | null
    officialEmail?: StringFilter<"Organization"> | string
    location?: StringNullableFilter<"Organization"> | string | null
    logoUrl?: StringNullableFilter<"Organization"> | string | null
    bannerUrl?: StringNullableFilter<"Organization"> | string | null
    expectedUsers?: IntNullableFilter<"Organization"> | number | null
    status?: StringFilter<"Organization"> | string
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    billingCustomerId?: StringNullableFilter<"Organization"> | string | null
    billingTier?: StringNullableFilter<"Organization"> | string | null
    optOutVirality?: BoolFilter<"Organization"> | boolean
    domains?: OrganizationDomainListRelationFilter
  }

  export type OrganizationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    description?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    officialEmail?: SortOrder
    location?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    bannerUrl?: SortOrderInput | SortOrder
    expectedUsers?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    billingCustomerId?: SortOrderInput | SortOrder
    billingTier?: SortOrderInput | SortOrder
    optOutVirality?: SortOrder
    domains?: OrganizationDomainOrderByRelationAggregateInput
  }

  export type OrganizationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    name?: StringFilter<"Organization"> | string
    type?: StringFilter<"Organization"> | string
    description?: StringNullableFilter<"Organization"> | string | null
    website?: StringNullableFilter<"Organization"> | string | null
    officialEmail?: StringFilter<"Organization"> | string
    location?: StringNullableFilter<"Organization"> | string | null
    logoUrl?: StringNullableFilter<"Organization"> | string | null
    bannerUrl?: StringNullableFilter<"Organization"> | string | null
    expectedUsers?: IntNullableFilter<"Organization"> | number | null
    status?: StringFilter<"Organization"> | string
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    billingCustomerId?: StringNullableFilter<"Organization"> | string | null
    billingTier?: StringNullableFilter<"Organization"> | string | null
    optOutVirality?: BoolFilter<"Organization"> | boolean
    domains?: OrganizationDomainListRelationFilter
  }, "id">

  export type OrganizationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    description?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    officialEmail?: SortOrder
    location?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    bannerUrl?: SortOrderInput | SortOrder
    expectedUsers?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    billingCustomerId?: SortOrderInput | SortOrder
    billingTier?: SortOrderInput | SortOrder
    optOutVirality?: SortOrder
    _count?: OrganizationCountOrderByAggregateInput
    _avg?: OrganizationAvgOrderByAggregateInput
    _max?: OrganizationMaxOrderByAggregateInput
    _min?: OrganizationMinOrderByAggregateInput
    _sum?: OrganizationSumOrderByAggregateInput
  }

  export type OrganizationScalarWhereWithAggregatesInput = {
    AND?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    OR?: OrganizationScalarWhereWithAggregatesInput[]
    NOT?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Organization"> | string
    name?: StringWithAggregatesFilter<"Organization"> | string
    type?: StringWithAggregatesFilter<"Organization"> | string
    description?: StringNullableWithAggregatesFilter<"Organization"> | string | null
    website?: StringNullableWithAggregatesFilter<"Organization"> | string | null
    officialEmail?: StringWithAggregatesFilter<"Organization"> | string
    location?: StringNullableWithAggregatesFilter<"Organization"> | string | null
    logoUrl?: StringNullableWithAggregatesFilter<"Organization"> | string | null
    bannerUrl?: StringNullableWithAggregatesFilter<"Organization"> | string | null
    expectedUsers?: IntNullableWithAggregatesFilter<"Organization"> | number | null
    status?: StringWithAggregatesFilter<"Organization"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
    billingCustomerId?: StringNullableWithAggregatesFilter<"Organization"> | string | null
    billingTier?: StringNullableWithAggregatesFilter<"Organization"> | string | null
    optOutVirality?: BoolWithAggregatesFilter<"Organization"> | boolean
  }

  export type OrganizationDomainWhereInput = {
    AND?: OrganizationDomainWhereInput | OrganizationDomainWhereInput[]
    OR?: OrganizationDomainWhereInput[]
    NOT?: OrganizationDomainWhereInput | OrganizationDomainWhereInput[]
    id?: StringFilter<"OrganizationDomain"> | string
    organizationId?: StringFilter<"OrganizationDomain"> | string
    domain?: StringFilter<"OrganizationDomain"> | string
    addedAt?: DateTimeFilter<"OrganizationDomain"> | Date | string
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
  }

  export type OrganizationDomainOrderByWithRelationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    domain?: SortOrder
    addedAt?: SortOrder
    organization?: OrganizationOrderByWithRelationInput
  }

  export type OrganizationDomainWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    domain?: string
    AND?: OrganizationDomainWhereInput | OrganizationDomainWhereInput[]
    OR?: OrganizationDomainWhereInput[]
    NOT?: OrganizationDomainWhereInput | OrganizationDomainWhereInput[]
    organizationId?: StringFilter<"OrganizationDomain"> | string
    addedAt?: DateTimeFilter<"OrganizationDomain"> | Date | string
    organization?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
  }, "id" | "domain">

  export type OrganizationDomainOrderByWithAggregationInput = {
    id?: SortOrder
    organizationId?: SortOrder
    domain?: SortOrder
    addedAt?: SortOrder
    _count?: OrganizationDomainCountOrderByAggregateInput
    _max?: OrganizationDomainMaxOrderByAggregateInput
    _min?: OrganizationDomainMinOrderByAggregateInput
  }

  export type OrganizationDomainScalarWhereWithAggregatesInput = {
    AND?: OrganizationDomainScalarWhereWithAggregatesInput | OrganizationDomainScalarWhereWithAggregatesInput[]
    OR?: OrganizationDomainScalarWhereWithAggregatesInput[]
    NOT?: OrganizationDomainScalarWhereWithAggregatesInput | OrganizationDomainScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrganizationDomain"> | string
    organizationId?: StringWithAggregatesFilter<"OrganizationDomain"> | string
    domain?: StringWithAggregatesFilter<"OrganizationDomain"> | string
    addedAt?: DateTimeWithAggregatesFilter<"OrganizationDomain"> | Date | string
  }

  export type OrganizationApplicationWhereInput = {
    AND?: OrganizationApplicationWhereInput | OrganizationApplicationWhereInput[]
    OR?: OrganizationApplicationWhereInput[]
    NOT?: OrganizationApplicationWhereInput | OrganizationApplicationWhereInput[]
    id?: StringFilter<"OrganizationApplication"> | string
    applicantUserId?: StringFilter<"OrganizationApplication"> | string
    applicantName?: StringFilter<"OrganizationApplication"> | string
    applicantPhone?: StringFilter<"OrganizationApplication"> | string
    proofFileUrl?: StringNullableFilter<"OrganizationApplication"> | string | null
    name?: StringFilter<"OrganizationApplication"> | string
    type?: StringFilter<"OrganizationApplication"> | string
    location?: StringNullableFilter<"OrganizationApplication"> | string | null
    website?: StringNullableFilter<"OrganizationApplication"> | string | null
    description?: StringNullableFilter<"OrganizationApplication"> | string | null
    officialEmail?: StringFilter<"OrganizationApplication"> | string
    expectedUsers?: IntNullableFilter<"OrganizationApplication"> | number | null
    domains?: StringNullableListFilter<"OrganizationApplication">
    logoUrl?: StringNullableFilter<"OrganizationApplication"> | string | null
    orgAccountName?: StringNullableFilter<"OrganizationApplication"> | string | null
    orgAccountUsername?: StringNullableFilter<"OrganizationApplication"> | string | null
    status?: StringFilter<"OrganizationApplication"> | string
    submittedAt?: DateTimeFilter<"OrganizationApplication"> | Date | string
    reviewedAt?: DateTimeNullableFilter<"OrganizationApplication"> | Date | string | null
    reviewedBy?: StringNullableFilter<"OrganizationApplication"> | string | null
  }

  export type OrganizationApplicationOrderByWithRelationInput = {
    id?: SortOrder
    applicantUserId?: SortOrder
    applicantName?: SortOrder
    applicantPhone?: SortOrder
    proofFileUrl?: SortOrderInput | SortOrder
    name?: SortOrder
    type?: SortOrder
    location?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    officialEmail?: SortOrder
    expectedUsers?: SortOrderInput | SortOrder
    domains?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    orgAccountName?: SortOrderInput | SortOrder
    orgAccountUsername?: SortOrderInput | SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    reviewedBy?: SortOrderInput | SortOrder
  }

  export type OrganizationApplicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrganizationApplicationWhereInput | OrganizationApplicationWhereInput[]
    OR?: OrganizationApplicationWhereInput[]
    NOT?: OrganizationApplicationWhereInput | OrganizationApplicationWhereInput[]
    applicantUserId?: StringFilter<"OrganizationApplication"> | string
    applicantName?: StringFilter<"OrganizationApplication"> | string
    applicantPhone?: StringFilter<"OrganizationApplication"> | string
    proofFileUrl?: StringNullableFilter<"OrganizationApplication"> | string | null
    name?: StringFilter<"OrganizationApplication"> | string
    type?: StringFilter<"OrganizationApplication"> | string
    location?: StringNullableFilter<"OrganizationApplication"> | string | null
    website?: StringNullableFilter<"OrganizationApplication"> | string | null
    description?: StringNullableFilter<"OrganizationApplication"> | string | null
    officialEmail?: StringFilter<"OrganizationApplication"> | string
    expectedUsers?: IntNullableFilter<"OrganizationApplication"> | number | null
    domains?: StringNullableListFilter<"OrganizationApplication">
    logoUrl?: StringNullableFilter<"OrganizationApplication"> | string | null
    orgAccountName?: StringNullableFilter<"OrganizationApplication"> | string | null
    orgAccountUsername?: StringNullableFilter<"OrganizationApplication"> | string | null
    status?: StringFilter<"OrganizationApplication"> | string
    submittedAt?: DateTimeFilter<"OrganizationApplication"> | Date | string
    reviewedAt?: DateTimeNullableFilter<"OrganizationApplication"> | Date | string | null
    reviewedBy?: StringNullableFilter<"OrganizationApplication"> | string | null
  }, "id">

  export type OrganizationApplicationOrderByWithAggregationInput = {
    id?: SortOrder
    applicantUserId?: SortOrder
    applicantName?: SortOrder
    applicantPhone?: SortOrder
    proofFileUrl?: SortOrderInput | SortOrder
    name?: SortOrder
    type?: SortOrder
    location?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    officialEmail?: SortOrder
    expectedUsers?: SortOrderInput | SortOrder
    domains?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    orgAccountName?: SortOrderInput | SortOrder
    orgAccountUsername?: SortOrderInput | SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    reviewedBy?: SortOrderInput | SortOrder
    _count?: OrganizationApplicationCountOrderByAggregateInput
    _avg?: OrganizationApplicationAvgOrderByAggregateInput
    _max?: OrganizationApplicationMaxOrderByAggregateInput
    _min?: OrganizationApplicationMinOrderByAggregateInput
    _sum?: OrganizationApplicationSumOrderByAggregateInput
  }

  export type OrganizationApplicationScalarWhereWithAggregatesInput = {
    AND?: OrganizationApplicationScalarWhereWithAggregatesInput | OrganizationApplicationScalarWhereWithAggregatesInput[]
    OR?: OrganizationApplicationScalarWhereWithAggregatesInput[]
    NOT?: OrganizationApplicationScalarWhereWithAggregatesInput | OrganizationApplicationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrganizationApplication"> | string
    applicantUserId?: StringWithAggregatesFilter<"OrganizationApplication"> | string
    applicantName?: StringWithAggregatesFilter<"OrganizationApplication"> | string
    applicantPhone?: StringWithAggregatesFilter<"OrganizationApplication"> | string
    proofFileUrl?: StringNullableWithAggregatesFilter<"OrganizationApplication"> | string | null
    name?: StringWithAggregatesFilter<"OrganizationApplication"> | string
    type?: StringWithAggregatesFilter<"OrganizationApplication"> | string
    location?: StringNullableWithAggregatesFilter<"OrganizationApplication"> | string | null
    website?: StringNullableWithAggregatesFilter<"OrganizationApplication"> | string | null
    description?: StringNullableWithAggregatesFilter<"OrganizationApplication"> | string | null
    officialEmail?: StringWithAggregatesFilter<"OrganizationApplication"> | string
    expectedUsers?: IntNullableWithAggregatesFilter<"OrganizationApplication"> | number | null
    domains?: StringNullableListFilter<"OrganizationApplication">
    logoUrl?: StringNullableWithAggregatesFilter<"OrganizationApplication"> | string | null
    orgAccountName?: StringNullableWithAggregatesFilter<"OrganizationApplication"> | string | null
    orgAccountUsername?: StringNullableWithAggregatesFilter<"OrganizationApplication"> | string | null
    status?: StringWithAggregatesFilter<"OrganizationApplication"> | string
    submittedAt?: DateTimeWithAggregatesFilter<"OrganizationApplication"> | Date | string
    reviewedAt?: DateTimeNullableWithAggregatesFilter<"OrganizationApplication"> | Date | string | null
    reviewedBy?: StringNullableWithAggregatesFilter<"OrganizationApplication"> | string | null
  }

  export type OrganizationCreateInput = {
    id?: string
    name: string
    type: string
    description?: string | null
    website?: string | null
    officialEmail: string
    location?: string | null
    logoUrl?: string | null
    bannerUrl?: string | null
    expectedUsers?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    billingCustomerId?: string | null
    billingTier?: string | null
    optOutVirality?: boolean
    domains?: OrganizationDomainCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateInput = {
    id?: string
    name: string
    type: string
    description?: string | null
    website?: string | null
    officialEmail: string
    location?: string | null
    logoUrl?: string | null
    bannerUrl?: string | null
    expectedUsers?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    billingCustomerId?: string | null
    billingTier?: string | null
    optOutVirality?: boolean
    domains?: OrganizationDomainUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    officialEmail?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bannerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    expectedUsers?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    billingCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    billingTier?: NullableStringFieldUpdateOperationsInput | string | null
    optOutVirality?: BoolFieldUpdateOperationsInput | boolean
    domains?: OrganizationDomainUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    officialEmail?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bannerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    expectedUsers?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    billingCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    billingTier?: NullableStringFieldUpdateOperationsInput | string | null
    optOutVirality?: BoolFieldUpdateOperationsInput | boolean
    domains?: OrganizationDomainUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCreateManyInput = {
    id?: string
    name: string
    type: string
    description?: string | null
    website?: string | null
    officialEmail: string
    location?: string | null
    logoUrl?: string | null
    bannerUrl?: string | null
    expectedUsers?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    billingCustomerId?: string | null
    billingTier?: string | null
    optOutVirality?: boolean
  }

  export type OrganizationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    officialEmail?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bannerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    expectedUsers?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    billingCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    billingTier?: NullableStringFieldUpdateOperationsInput | string | null
    optOutVirality?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OrganizationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    officialEmail?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bannerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    expectedUsers?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    billingCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    billingTier?: NullableStringFieldUpdateOperationsInput | string | null
    optOutVirality?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OrganizationDomainCreateInput = {
    id?: string
    domain: string
    addedAt?: Date | string
    organization: OrganizationCreateNestedOneWithoutDomainsInput
  }

  export type OrganizationDomainUncheckedCreateInput = {
    id?: string
    organizationId: string
    domain: string
    addedAt?: Date | string
  }

  export type OrganizationDomainUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organization?: OrganizationUpdateOneRequiredWithoutDomainsNestedInput
  }

  export type OrganizationDomainUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationDomainCreateManyInput = {
    id?: string
    organizationId: string
    domain: string
    addedAt?: Date | string
  }

  export type OrganizationDomainUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationDomainUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationApplicationCreateInput = {
    id?: string
    applicantUserId: string
    applicantName: string
    applicantPhone: string
    proofFileUrl?: string | null
    name: string
    type: string
    location?: string | null
    website?: string | null
    description?: string | null
    officialEmail: string
    expectedUsers?: number | null
    domains?: OrganizationApplicationCreatedomainsInput | string[]
    logoUrl?: string | null
    orgAccountName?: string | null
    orgAccountUsername?: string | null
    status?: string
    submittedAt?: Date | string
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
  }

  export type OrganizationApplicationUncheckedCreateInput = {
    id?: string
    applicantUserId: string
    applicantName: string
    applicantPhone: string
    proofFileUrl?: string | null
    name: string
    type: string
    location?: string | null
    website?: string | null
    description?: string | null
    officialEmail: string
    expectedUsers?: number | null
    domains?: OrganizationApplicationCreatedomainsInput | string[]
    logoUrl?: string | null
    orgAccountName?: string | null
    orgAccountUsername?: string | null
    status?: string
    submittedAt?: Date | string
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
  }

  export type OrganizationApplicationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicantUserId?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantPhone?: StringFieldUpdateOperationsInput | string
    proofFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    officialEmail?: StringFieldUpdateOperationsInput | string
    expectedUsers?: NullableIntFieldUpdateOperationsInput | number | null
    domains?: OrganizationApplicationUpdatedomainsInput | string[]
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orgAccountName?: NullableStringFieldUpdateOperationsInput | string | null
    orgAccountUsername?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrganizationApplicationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicantUserId?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantPhone?: StringFieldUpdateOperationsInput | string
    proofFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    officialEmail?: StringFieldUpdateOperationsInput | string
    expectedUsers?: NullableIntFieldUpdateOperationsInput | number | null
    domains?: OrganizationApplicationUpdatedomainsInput | string[]
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orgAccountName?: NullableStringFieldUpdateOperationsInput | string | null
    orgAccountUsername?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrganizationApplicationCreateManyInput = {
    id?: string
    applicantUserId: string
    applicantName: string
    applicantPhone: string
    proofFileUrl?: string | null
    name: string
    type: string
    location?: string | null
    website?: string | null
    description?: string | null
    officialEmail: string
    expectedUsers?: number | null
    domains?: OrganizationApplicationCreatedomainsInput | string[]
    logoUrl?: string | null
    orgAccountName?: string | null
    orgAccountUsername?: string | null
    status?: string
    submittedAt?: Date | string
    reviewedAt?: Date | string | null
    reviewedBy?: string | null
  }

  export type OrganizationApplicationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicantUserId?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantPhone?: StringFieldUpdateOperationsInput | string
    proofFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    officialEmail?: StringFieldUpdateOperationsInput | string
    expectedUsers?: NullableIntFieldUpdateOperationsInput | number | null
    domains?: OrganizationApplicationUpdatedomainsInput | string[]
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orgAccountName?: NullableStringFieldUpdateOperationsInput | string | null
    orgAccountUsername?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrganizationApplicationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicantUserId?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantPhone?: StringFieldUpdateOperationsInput | string
    proofFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    officialEmail?: StringFieldUpdateOperationsInput | string
    expectedUsers?: NullableIntFieldUpdateOperationsInput | number | null
    domains?: OrganizationApplicationUpdatedomainsInput | string[]
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orgAccountName?: NullableStringFieldUpdateOperationsInput | string | null
    orgAccountUsername?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type OrganizationDomainListRelationFilter = {
    every?: OrganizationDomainWhereInput
    some?: OrganizationDomainWhereInput
    none?: OrganizationDomainWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type OrganizationDomainOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    description?: SortOrder
    website?: SortOrder
    officialEmail?: SortOrder
    location?: SortOrder
    logoUrl?: SortOrder
    bannerUrl?: SortOrder
    expectedUsers?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    billingCustomerId?: SortOrder
    billingTier?: SortOrder
    optOutVirality?: SortOrder
  }

  export type OrganizationAvgOrderByAggregateInput = {
    expectedUsers?: SortOrder
  }

  export type OrganizationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    description?: SortOrder
    website?: SortOrder
    officialEmail?: SortOrder
    location?: SortOrder
    logoUrl?: SortOrder
    bannerUrl?: SortOrder
    expectedUsers?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    billingCustomerId?: SortOrder
    billingTier?: SortOrder
    optOutVirality?: SortOrder
  }

  export type OrganizationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    description?: SortOrder
    website?: SortOrder
    officialEmail?: SortOrder
    location?: SortOrder
    logoUrl?: SortOrder
    bannerUrl?: SortOrder
    expectedUsers?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    billingCustomerId?: SortOrder
    billingTier?: SortOrder
    optOutVirality?: SortOrder
  }

  export type OrganizationSumOrderByAggregateInput = {
    expectedUsers?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type OrganizationRelationFilter = {
    is?: OrganizationWhereInput
    isNot?: OrganizationWhereInput
  }

  export type OrganizationDomainCountOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    domain?: SortOrder
    addedAt?: SortOrder
  }

  export type OrganizationDomainMaxOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    domain?: SortOrder
    addedAt?: SortOrder
  }

  export type OrganizationDomainMinOrderByAggregateInput = {
    id?: SortOrder
    organizationId?: SortOrder
    domain?: SortOrder
    addedAt?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type OrganizationApplicationCountOrderByAggregateInput = {
    id?: SortOrder
    applicantUserId?: SortOrder
    applicantName?: SortOrder
    applicantPhone?: SortOrder
    proofFileUrl?: SortOrder
    name?: SortOrder
    type?: SortOrder
    location?: SortOrder
    website?: SortOrder
    description?: SortOrder
    officialEmail?: SortOrder
    expectedUsers?: SortOrder
    domains?: SortOrder
    logoUrl?: SortOrder
    orgAccountName?: SortOrder
    orgAccountUsername?: SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
    reviewedAt?: SortOrder
    reviewedBy?: SortOrder
  }

  export type OrganizationApplicationAvgOrderByAggregateInput = {
    expectedUsers?: SortOrder
  }

  export type OrganizationApplicationMaxOrderByAggregateInput = {
    id?: SortOrder
    applicantUserId?: SortOrder
    applicantName?: SortOrder
    applicantPhone?: SortOrder
    proofFileUrl?: SortOrder
    name?: SortOrder
    type?: SortOrder
    location?: SortOrder
    website?: SortOrder
    description?: SortOrder
    officialEmail?: SortOrder
    expectedUsers?: SortOrder
    logoUrl?: SortOrder
    orgAccountName?: SortOrder
    orgAccountUsername?: SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
    reviewedAt?: SortOrder
    reviewedBy?: SortOrder
  }

  export type OrganizationApplicationMinOrderByAggregateInput = {
    id?: SortOrder
    applicantUserId?: SortOrder
    applicantName?: SortOrder
    applicantPhone?: SortOrder
    proofFileUrl?: SortOrder
    name?: SortOrder
    type?: SortOrder
    location?: SortOrder
    website?: SortOrder
    description?: SortOrder
    officialEmail?: SortOrder
    expectedUsers?: SortOrder
    logoUrl?: SortOrder
    orgAccountName?: SortOrder
    orgAccountUsername?: SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
    reviewedAt?: SortOrder
    reviewedBy?: SortOrder
  }

  export type OrganizationApplicationSumOrderByAggregateInput = {
    expectedUsers?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type OrganizationDomainCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<OrganizationDomainCreateWithoutOrganizationInput, OrganizationDomainUncheckedCreateWithoutOrganizationInput> | OrganizationDomainCreateWithoutOrganizationInput[] | OrganizationDomainUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationDomainCreateOrConnectWithoutOrganizationInput | OrganizationDomainCreateOrConnectWithoutOrganizationInput[]
    createMany?: OrganizationDomainCreateManyOrganizationInputEnvelope
    connect?: OrganizationDomainWhereUniqueInput | OrganizationDomainWhereUniqueInput[]
  }

  export type OrganizationDomainUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<OrganizationDomainCreateWithoutOrganizationInput, OrganizationDomainUncheckedCreateWithoutOrganizationInput> | OrganizationDomainCreateWithoutOrganizationInput[] | OrganizationDomainUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationDomainCreateOrConnectWithoutOrganizationInput | OrganizationDomainCreateOrConnectWithoutOrganizationInput[]
    createMany?: OrganizationDomainCreateManyOrganizationInputEnvelope
    connect?: OrganizationDomainWhereUniqueInput | OrganizationDomainWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type OrganizationDomainUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<OrganizationDomainCreateWithoutOrganizationInput, OrganizationDomainUncheckedCreateWithoutOrganizationInput> | OrganizationDomainCreateWithoutOrganizationInput[] | OrganizationDomainUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationDomainCreateOrConnectWithoutOrganizationInput | OrganizationDomainCreateOrConnectWithoutOrganizationInput[]
    upsert?: OrganizationDomainUpsertWithWhereUniqueWithoutOrganizationInput | OrganizationDomainUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: OrganizationDomainCreateManyOrganizationInputEnvelope
    set?: OrganizationDomainWhereUniqueInput | OrganizationDomainWhereUniqueInput[]
    disconnect?: OrganizationDomainWhereUniqueInput | OrganizationDomainWhereUniqueInput[]
    delete?: OrganizationDomainWhereUniqueInput | OrganizationDomainWhereUniqueInput[]
    connect?: OrganizationDomainWhereUniqueInput | OrganizationDomainWhereUniqueInput[]
    update?: OrganizationDomainUpdateWithWhereUniqueWithoutOrganizationInput | OrganizationDomainUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: OrganizationDomainUpdateManyWithWhereWithoutOrganizationInput | OrganizationDomainUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: OrganizationDomainScalarWhereInput | OrganizationDomainScalarWhereInput[]
  }

  export type OrganizationDomainUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<OrganizationDomainCreateWithoutOrganizationInput, OrganizationDomainUncheckedCreateWithoutOrganizationInput> | OrganizationDomainCreateWithoutOrganizationInput[] | OrganizationDomainUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: OrganizationDomainCreateOrConnectWithoutOrganizationInput | OrganizationDomainCreateOrConnectWithoutOrganizationInput[]
    upsert?: OrganizationDomainUpsertWithWhereUniqueWithoutOrganizationInput | OrganizationDomainUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: OrganizationDomainCreateManyOrganizationInputEnvelope
    set?: OrganizationDomainWhereUniqueInput | OrganizationDomainWhereUniqueInput[]
    disconnect?: OrganizationDomainWhereUniqueInput | OrganizationDomainWhereUniqueInput[]
    delete?: OrganizationDomainWhereUniqueInput | OrganizationDomainWhereUniqueInput[]
    connect?: OrganizationDomainWhereUniqueInput | OrganizationDomainWhereUniqueInput[]
    update?: OrganizationDomainUpdateWithWhereUniqueWithoutOrganizationInput | OrganizationDomainUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: OrganizationDomainUpdateManyWithWhereWithoutOrganizationInput | OrganizationDomainUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: OrganizationDomainScalarWhereInput | OrganizationDomainScalarWhereInput[]
  }

  export type OrganizationCreateNestedOneWithoutDomainsInput = {
    create?: XOR<OrganizationCreateWithoutDomainsInput, OrganizationUncheckedCreateWithoutDomainsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutDomainsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type OrganizationUpdateOneRequiredWithoutDomainsNestedInput = {
    create?: XOR<OrganizationCreateWithoutDomainsInput, OrganizationUncheckedCreateWithoutDomainsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutDomainsInput
    upsert?: OrganizationUpsertWithoutDomainsInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutDomainsInput, OrganizationUpdateWithoutDomainsInput>, OrganizationUncheckedUpdateWithoutDomainsInput>
  }

  export type OrganizationApplicationCreatedomainsInput = {
    set: string[]
  }

  export type OrganizationApplicationUpdatedomainsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type OrganizationDomainCreateWithoutOrganizationInput = {
    id?: string
    domain: string
    addedAt?: Date | string
  }

  export type OrganizationDomainUncheckedCreateWithoutOrganizationInput = {
    id?: string
    domain: string
    addedAt?: Date | string
  }

  export type OrganizationDomainCreateOrConnectWithoutOrganizationInput = {
    where: OrganizationDomainWhereUniqueInput
    create: XOR<OrganizationDomainCreateWithoutOrganizationInput, OrganizationDomainUncheckedCreateWithoutOrganizationInput>
  }

  export type OrganizationDomainCreateManyOrganizationInputEnvelope = {
    data: OrganizationDomainCreateManyOrganizationInput | OrganizationDomainCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationDomainUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: OrganizationDomainWhereUniqueInput
    update: XOR<OrganizationDomainUpdateWithoutOrganizationInput, OrganizationDomainUncheckedUpdateWithoutOrganizationInput>
    create: XOR<OrganizationDomainCreateWithoutOrganizationInput, OrganizationDomainUncheckedCreateWithoutOrganizationInput>
  }

  export type OrganizationDomainUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: OrganizationDomainWhereUniqueInput
    data: XOR<OrganizationDomainUpdateWithoutOrganizationInput, OrganizationDomainUncheckedUpdateWithoutOrganizationInput>
  }

  export type OrganizationDomainUpdateManyWithWhereWithoutOrganizationInput = {
    where: OrganizationDomainScalarWhereInput
    data: XOR<OrganizationDomainUpdateManyMutationInput, OrganizationDomainUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type OrganizationDomainScalarWhereInput = {
    AND?: OrganizationDomainScalarWhereInput | OrganizationDomainScalarWhereInput[]
    OR?: OrganizationDomainScalarWhereInput[]
    NOT?: OrganizationDomainScalarWhereInput | OrganizationDomainScalarWhereInput[]
    id?: StringFilter<"OrganizationDomain"> | string
    organizationId?: StringFilter<"OrganizationDomain"> | string
    domain?: StringFilter<"OrganizationDomain"> | string
    addedAt?: DateTimeFilter<"OrganizationDomain"> | Date | string
  }

  export type OrganizationCreateWithoutDomainsInput = {
    id?: string
    name: string
    type: string
    description?: string | null
    website?: string | null
    officialEmail: string
    location?: string | null
    logoUrl?: string | null
    bannerUrl?: string | null
    expectedUsers?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    billingCustomerId?: string | null
    billingTier?: string | null
    optOutVirality?: boolean
  }

  export type OrganizationUncheckedCreateWithoutDomainsInput = {
    id?: string
    name: string
    type: string
    description?: string | null
    website?: string | null
    officialEmail: string
    location?: string | null
    logoUrl?: string | null
    bannerUrl?: string | null
    expectedUsers?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    billingCustomerId?: string | null
    billingTier?: string | null
    optOutVirality?: boolean
  }

  export type OrganizationCreateOrConnectWithoutDomainsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutDomainsInput, OrganizationUncheckedCreateWithoutDomainsInput>
  }

  export type OrganizationUpsertWithoutDomainsInput = {
    update: XOR<OrganizationUpdateWithoutDomainsInput, OrganizationUncheckedUpdateWithoutDomainsInput>
    create: XOR<OrganizationCreateWithoutDomainsInput, OrganizationUncheckedCreateWithoutDomainsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutDomainsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutDomainsInput, OrganizationUncheckedUpdateWithoutDomainsInput>
  }

  export type OrganizationUpdateWithoutDomainsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    officialEmail?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bannerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    expectedUsers?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    billingCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    billingTier?: NullableStringFieldUpdateOperationsInput | string | null
    optOutVirality?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OrganizationUncheckedUpdateWithoutDomainsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    officialEmail?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    bannerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    expectedUsers?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    billingCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    billingTier?: NullableStringFieldUpdateOperationsInput | string | null
    optOutVirality?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OrganizationDomainCreateManyOrganizationInput = {
    id?: string
    domain: string
    addedAt?: Date | string
  }

  export type OrganizationDomainUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationDomainUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationDomainUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    domain?: StringFieldUpdateOperationsInput | string
    addedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use OrganizationCountOutputTypeDefaultArgs instead
     */
    export type OrganizationCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrganizationCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OrganizationDefaultArgs instead
     */
    export type OrganizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrganizationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OrganizationDomainDefaultArgs instead
     */
    export type OrganizationDomainArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrganizationDomainDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OrganizationApplicationDefaultArgs instead
     */
    export type OrganizationApplicationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrganizationApplicationDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}