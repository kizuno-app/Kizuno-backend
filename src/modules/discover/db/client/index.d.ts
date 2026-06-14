
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
 * Model DiscoverTopic
 * 
 */
export type DiscoverTopic = $Result.DefaultSelection<Prisma.$DiscoverTopicPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more DiscoverTopics
 * const discoverTopics = await prisma.discoverTopic.findMany()
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
   * // Fetch zero or more DiscoverTopics
   * const discoverTopics = await prisma.discoverTopic.findMany()
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
   * `prisma.discoverTopic`: Exposes CRUD operations for the **DiscoverTopic** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DiscoverTopics
    * const discoverTopics = await prisma.discoverTopic.findMany()
    * ```
    */
  get discoverTopic(): Prisma.DiscoverTopicDelegate<ExtArgs>;
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
    DiscoverTopic: 'DiscoverTopic'
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
      modelProps: "discoverTopic"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      DiscoverTopic: {
        payload: Prisma.$DiscoverTopicPayload<ExtArgs>
        fields: Prisma.DiscoverTopicFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DiscoverTopicFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscoverTopicPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DiscoverTopicFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscoverTopicPayload>
          }
          findFirst: {
            args: Prisma.DiscoverTopicFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscoverTopicPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DiscoverTopicFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscoverTopicPayload>
          }
          findMany: {
            args: Prisma.DiscoverTopicFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscoverTopicPayload>[]
          }
          create: {
            args: Prisma.DiscoverTopicCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscoverTopicPayload>
          }
          createMany: {
            args: Prisma.DiscoverTopicCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DiscoverTopicCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscoverTopicPayload>[]
          }
          delete: {
            args: Prisma.DiscoverTopicDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscoverTopicPayload>
          }
          update: {
            args: Prisma.DiscoverTopicUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscoverTopicPayload>
          }
          deleteMany: {
            args: Prisma.DiscoverTopicDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DiscoverTopicUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DiscoverTopicUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiscoverTopicPayload>
          }
          aggregate: {
            args: Prisma.DiscoverTopicAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDiscoverTopic>
          }
          groupBy: {
            args: Prisma.DiscoverTopicGroupByArgs<ExtArgs>
            result: $Utils.Optional<DiscoverTopicGroupByOutputType>[]
          }
          count: {
            args: Prisma.DiscoverTopicCountArgs<ExtArgs>
            result: $Utils.Optional<DiscoverTopicCountAggregateOutputType> | number
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
   * Models
   */

  /**
   * Model DiscoverTopic
   */

  export type AggregateDiscoverTopic = {
    _count: DiscoverTopicCountAggregateOutputType | null
    _avg: DiscoverTopicAvgAggregateOutputType | null
    _sum: DiscoverTopicSumAggregateOutputType | null
    _min: DiscoverTopicMinAggregateOutputType | null
    _max: DiscoverTopicMaxAggregateOutputType | null
  }

  export type DiscoverTopicAvgAggregateOutputType = {
    score: number | null
  }

  export type DiscoverTopicSumAggregateOutputType = {
    score: number | null
  }

  export type DiscoverTopicMinAggregateOutputType = {
    id: string | null
    name: string | null
    score: number | null
    updatedAt: Date | null
  }

  export type DiscoverTopicMaxAggregateOutputType = {
    id: string | null
    name: string | null
    score: number | null
    updatedAt: Date | null
  }

  export type DiscoverTopicCountAggregateOutputType = {
    id: number
    name: number
    score: number
    updatedAt: number
    _all: number
  }


  export type DiscoverTopicAvgAggregateInputType = {
    score?: true
  }

  export type DiscoverTopicSumAggregateInputType = {
    score?: true
  }

  export type DiscoverTopicMinAggregateInputType = {
    id?: true
    name?: true
    score?: true
    updatedAt?: true
  }

  export type DiscoverTopicMaxAggregateInputType = {
    id?: true
    name?: true
    score?: true
    updatedAt?: true
  }

  export type DiscoverTopicCountAggregateInputType = {
    id?: true
    name?: true
    score?: true
    updatedAt?: true
    _all?: true
  }

  export type DiscoverTopicAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DiscoverTopic to aggregate.
     */
    where?: DiscoverTopicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiscoverTopics to fetch.
     */
    orderBy?: DiscoverTopicOrderByWithRelationInput | DiscoverTopicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DiscoverTopicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiscoverTopics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiscoverTopics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DiscoverTopics
    **/
    _count?: true | DiscoverTopicCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DiscoverTopicAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DiscoverTopicSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DiscoverTopicMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DiscoverTopicMaxAggregateInputType
  }

  export type GetDiscoverTopicAggregateType<T extends DiscoverTopicAggregateArgs> = {
        [P in keyof T & keyof AggregateDiscoverTopic]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDiscoverTopic[P]>
      : GetScalarType<T[P], AggregateDiscoverTopic[P]>
  }




  export type DiscoverTopicGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiscoverTopicWhereInput
    orderBy?: DiscoverTopicOrderByWithAggregationInput | DiscoverTopicOrderByWithAggregationInput[]
    by: DiscoverTopicScalarFieldEnum[] | DiscoverTopicScalarFieldEnum
    having?: DiscoverTopicScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DiscoverTopicCountAggregateInputType | true
    _avg?: DiscoverTopicAvgAggregateInputType
    _sum?: DiscoverTopicSumAggregateInputType
    _min?: DiscoverTopicMinAggregateInputType
    _max?: DiscoverTopicMaxAggregateInputType
  }

  export type DiscoverTopicGroupByOutputType = {
    id: string
    name: string
    score: number
    updatedAt: Date
    _count: DiscoverTopicCountAggregateOutputType | null
    _avg: DiscoverTopicAvgAggregateOutputType | null
    _sum: DiscoverTopicSumAggregateOutputType | null
    _min: DiscoverTopicMinAggregateOutputType | null
    _max: DiscoverTopicMaxAggregateOutputType | null
  }

  type GetDiscoverTopicGroupByPayload<T extends DiscoverTopicGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DiscoverTopicGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DiscoverTopicGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DiscoverTopicGroupByOutputType[P]>
            : GetScalarType<T[P], DiscoverTopicGroupByOutputType[P]>
        }
      >
    >


  export type DiscoverTopicSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    score?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["discoverTopic"]>

  export type DiscoverTopicSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    score?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["discoverTopic"]>

  export type DiscoverTopicSelectScalar = {
    id?: boolean
    name?: boolean
    score?: boolean
    updatedAt?: boolean
  }


  export type $DiscoverTopicPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DiscoverTopic"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      score: number
      updatedAt: Date
    }, ExtArgs["result"]["discoverTopic"]>
    composites: {}
  }

  type DiscoverTopicGetPayload<S extends boolean | null | undefined | DiscoverTopicDefaultArgs> = $Result.GetResult<Prisma.$DiscoverTopicPayload, S>

  type DiscoverTopicCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DiscoverTopicFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DiscoverTopicCountAggregateInputType | true
    }

  export interface DiscoverTopicDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DiscoverTopic'], meta: { name: 'DiscoverTopic' } }
    /**
     * Find zero or one DiscoverTopic that matches the filter.
     * @param {DiscoverTopicFindUniqueArgs} args - Arguments to find a DiscoverTopic
     * @example
     * // Get one DiscoverTopic
     * const discoverTopic = await prisma.discoverTopic.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DiscoverTopicFindUniqueArgs>(args: SelectSubset<T, DiscoverTopicFindUniqueArgs<ExtArgs>>): Prisma__DiscoverTopicClient<$Result.GetResult<Prisma.$DiscoverTopicPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DiscoverTopic that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DiscoverTopicFindUniqueOrThrowArgs} args - Arguments to find a DiscoverTopic
     * @example
     * // Get one DiscoverTopic
     * const discoverTopic = await prisma.discoverTopic.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DiscoverTopicFindUniqueOrThrowArgs>(args: SelectSubset<T, DiscoverTopicFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DiscoverTopicClient<$Result.GetResult<Prisma.$DiscoverTopicPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DiscoverTopic that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoverTopicFindFirstArgs} args - Arguments to find a DiscoverTopic
     * @example
     * // Get one DiscoverTopic
     * const discoverTopic = await prisma.discoverTopic.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DiscoverTopicFindFirstArgs>(args?: SelectSubset<T, DiscoverTopicFindFirstArgs<ExtArgs>>): Prisma__DiscoverTopicClient<$Result.GetResult<Prisma.$DiscoverTopicPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DiscoverTopic that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoverTopicFindFirstOrThrowArgs} args - Arguments to find a DiscoverTopic
     * @example
     * // Get one DiscoverTopic
     * const discoverTopic = await prisma.discoverTopic.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DiscoverTopicFindFirstOrThrowArgs>(args?: SelectSubset<T, DiscoverTopicFindFirstOrThrowArgs<ExtArgs>>): Prisma__DiscoverTopicClient<$Result.GetResult<Prisma.$DiscoverTopicPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DiscoverTopics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoverTopicFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DiscoverTopics
     * const discoverTopics = await prisma.discoverTopic.findMany()
     * 
     * // Get first 10 DiscoverTopics
     * const discoverTopics = await prisma.discoverTopic.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const discoverTopicWithIdOnly = await prisma.discoverTopic.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DiscoverTopicFindManyArgs>(args?: SelectSubset<T, DiscoverTopicFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscoverTopicPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DiscoverTopic.
     * @param {DiscoverTopicCreateArgs} args - Arguments to create a DiscoverTopic.
     * @example
     * // Create one DiscoverTopic
     * const DiscoverTopic = await prisma.discoverTopic.create({
     *   data: {
     *     // ... data to create a DiscoverTopic
     *   }
     * })
     * 
     */
    create<T extends DiscoverTopicCreateArgs>(args: SelectSubset<T, DiscoverTopicCreateArgs<ExtArgs>>): Prisma__DiscoverTopicClient<$Result.GetResult<Prisma.$DiscoverTopicPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DiscoverTopics.
     * @param {DiscoverTopicCreateManyArgs} args - Arguments to create many DiscoverTopics.
     * @example
     * // Create many DiscoverTopics
     * const discoverTopic = await prisma.discoverTopic.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DiscoverTopicCreateManyArgs>(args?: SelectSubset<T, DiscoverTopicCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DiscoverTopics and returns the data saved in the database.
     * @param {DiscoverTopicCreateManyAndReturnArgs} args - Arguments to create many DiscoverTopics.
     * @example
     * // Create many DiscoverTopics
     * const discoverTopic = await prisma.discoverTopic.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DiscoverTopics and only return the `id`
     * const discoverTopicWithIdOnly = await prisma.discoverTopic.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DiscoverTopicCreateManyAndReturnArgs>(args?: SelectSubset<T, DiscoverTopicCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiscoverTopicPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DiscoverTopic.
     * @param {DiscoverTopicDeleteArgs} args - Arguments to delete one DiscoverTopic.
     * @example
     * // Delete one DiscoverTopic
     * const DiscoverTopic = await prisma.discoverTopic.delete({
     *   where: {
     *     // ... filter to delete one DiscoverTopic
     *   }
     * })
     * 
     */
    delete<T extends DiscoverTopicDeleteArgs>(args: SelectSubset<T, DiscoverTopicDeleteArgs<ExtArgs>>): Prisma__DiscoverTopicClient<$Result.GetResult<Prisma.$DiscoverTopicPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DiscoverTopic.
     * @param {DiscoverTopicUpdateArgs} args - Arguments to update one DiscoverTopic.
     * @example
     * // Update one DiscoverTopic
     * const discoverTopic = await prisma.discoverTopic.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DiscoverTopicUpdateArgs>(args: SelectSubset<T, DiscoverTopicUpdateArgs<ExtArgs>>): Prisma__DiscoverTopicClient<$Result.GetResult<Prisma.$DiscoverTopicPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DiscoverTopics.
     * @param {DiscoverTopicDeleteManyArgs} args - Arguments to filter DiscoverTopics to delete.
     * @example
     * // Delete a few DiscoverTopics
     * const { count } = await prisma.discoverTopic.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DiscoverTopicDeleteManyArgs>(args?: SelectSubset<T, DiscoverTopicDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DiscoverTopics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoverTopicUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DiscoverTopics
     * const discoverTopic = await prisma.discoverTopic.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DiscoverTopicUpdateManyArgs>(args: SelectSubset<T, DiscoverTopicUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DiscoverTopic.
     * @param {DiscoverTopicUpsertArgs} args - Arguments to update or create a DiscoverTopic.
     * @example
     * // Update or create a DiscoverTopic
     * const discoverTopic = await prisma.discoverTopic.upsert({
     *   create: {
     *     // ... data to create a DiscoverTopic
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DiscoverTopic we want to update
     *   }
     * })
     */
    upsert<T extends DiscoverTopicUpsertArgs>(args: SelectSubset<T, DiscoverTopicUpsertArgs<ExtArgs>>): Prisma__DiscoverTopicClient<$Result.GetResult<Prisma.$DiscoverTopicPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DiscoverTopics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoverTopicCountArgs} args - Arguments to filter DiscoverTopics to count.
     * @example
     * // Count the number of DiscoverTopics
     * const count = await prisma.discoverTopic.count({
     *   where: {
     *     // ... the filter for the DiscoverTopics we want to count
     *   }
     * })
    **/
    count<T extends DiscoverTopicCountArgs>(
      args?: Subset<T, DiscoverTopicCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DiscoverTopicCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DiscoverTopic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoverTopicAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DiscoverTopicAggregateArgs>(args: Subset<T, DiscoverTopicAggregateArgs>): Prisma.PrismaPromise<GetDiscoverTopicAggregateType<T>>

    /**
     * Group by DiscoverTopic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiscoverTopicGroupByArgs} args - Group by arguments.
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
      T extends DiscoverTopicGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DiscoverTopicGroupByArgs['orderBy'] }
        : { orderBy?: DiscoverTopicGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DiscoverTopicGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiscoverTopicGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DiscoverTopic model
   */
  readonly fields: DiscoverTopicFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DiscoverTopic.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DiscoverTopicClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the DiscoverTopic model
   */ 
  interface DiscoverTopicFieldRefs {
    readonly id: FieldRef<"DiscoverTopic", 'String'>
    readonly name: FieldRef<"DiscoverTopic", 'String'>
    readonly score: FieldRef<"DiscoverTopic", 'Float'>
    readonly updatedAt: FieldRef<"DiscoverTopic", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DiscoverTopic findUnique
   */
  export type DiscoverTopicFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoverTopic
     */
    select?: DiscoverTopicSelect<ExtArgs> | null
    /**
     * Filter, which DiscoverTopic to fetch.
     */
    where: DiscoverTopicWhereUniqueInput
  }

  /**
   * DiscoverTopic findUniqueOrThrow
   */
  export type DiscoverTopicFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoverTopic
     */
    select?: DiscoverTopicSelect<ExtArgs> | null
    /**
     * Filter, which DiscoverTopic to fetch.
     */
    where: DiscoverTopicWhereUniqueInput
  }

  /**
   * DiscoverTopic findFirst
   */
  export type DiscoverTopicFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoverTopic
     */
    select?: DiscoverTopicSelect<ExtArgs> | null
    /**
     * Filter, which DiscoverTopic to fetch.
     */
    where?: DiscoverTopicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiscoverTopics to fetch.
     */
    orderBy?: DiscoverTopicOrderByWithRelationInput | DiscoverTopicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DiscoverTopics.
     */
    cursor?: DiscoverTopicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiscoverTopics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiscoverTopics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DiscoverTopics.
     */
    distinct?: DiscoverTopicScalarFieldEnum | DiscoverTopicScalarFieldEnum[]
  }

  /**
   * DiscoverTopic findFirstOrThrow
   */
  export type DiscoverTopicFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoverTopic
     */
    select?: DiscoverTopicSelect<ExtArgs> | null
    /**
     * Filter, which DiscoverTopic to fetch.
     */
    where?: DiscoverTopicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiscoverTopics to fetch.
     */
    orderBy?: DiscoverTopicOrderByWithRelationInput | DiscoverTopicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DiscoverTopics.
     */
    cursor?: DiscoverTopicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiscoverTopics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiscoverTopics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DiscoverTopics.
     */
    distinct?: DiscoverTopicScalarFieldEnum | DiscoverTopicScalarFieldEnum[]
  }

  /**
   * DiscoverTopic findMany
   */
  export type DiscoverTopicFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoverTopic
     */
    select?: DiscoverTopicSelect<ExtArgs> | null
    /**
     * Filter, which DiscoverTopics to fetch.
     */
    where?: DiscoverTopicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiscoverTopics to fetch.
     */
    orderBy?: DiscoverTopicOrderByWithRelationInput | DiscoverTopicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DiscoverTopics.
     */
    cursor?: DiscoverTopicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiscoverTopics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiscoverTopics.
     */
    skip?: number
    distinct?: DiscoverTopicScalarFieldEnum | DiscoverTopicScalarFieldEnum[]
  }

  /**
   * DiscoverTopic create
   */
  export type DiscoverTopicCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoverTopic
     */
    select?: DiscoverTopicSelect<ExtArgs> | null
    /**
     * The data needed to create a DiscoverTopic.
     */
    data: XOR<DiscoverTopicCreateInput, DiscoverTopicUncheckedCreateInput>
  }

  /**
   * DiscoverTopic createMany
   */
  export type DiscoverTopicCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DiscoverTopics.
     */
    data: DiscoverTopicCreateManyInput | DiscoverTopicCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DiscoverTopic createManyAndReturn
   */
  export type DiscoverTopicCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoverTopic
     */
    select?: DiscoverTopicSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DiscoverTopics.
     */
    data: DiscoverTopicCreateManyInput | DiscoverTopicCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DiscoverTopic update
   */
  export type DiscoverTopicUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoverTopic
     */
    select?: DiscoverTopicSelect<ExtArgs> | null
    /**
     * The data needed to update a DiscoverTopic.
     */
    data: XOR<DiscoverTopicUpdateInput, DiscoverTopicUncheckedUpdateInput>
    /**
     * Choose, which DiscoverTopic to update.
     */
    where: DiscoverTopicWhereUniqueInput
  }

  /**
   * DiscoverTopic updateMany
   */
  export type DiscoverTopicUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DiscoverTopics.
     */
    data: XOR<DiscoverTopicUpdateManyMutationInput, DiscoverTopicUncheckedUpdateManyInput>
    /**
     * Filter which DiscoverTopics to update
     */
    where?: DiscoverTopicWhereInput
  }

  /**
   * DiscoverTopic upsert
   */
  export type DiscoverTopicUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoverTopic
     */
    select?: DiscoverTopicSelect<ExtArgs> | null
    /**
     * The filter to search for the DiscoverTopic to update in case it exists.
     */
    where: DiscoverTopicWhereUniqueInput
    /**
     * In case the DiscoverTopic found by the `where` argument doesn't exist, create a new DiscoverTopic with this data.
     */
    create: XOR<DiscoverTopicCreateInput, DiscoverTopicUncheckedCreateInput>
    /**
     * In case the DiscoverTopic was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DiscoverTopicUpdateInput, DiscoverTopicUncheckedUpdateInput>
  }

  /**
   * DiscoverTopic delete
   */
  export type DiscoverTopicDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoverTopic
     */
    select?: DiscoverTopicSelect<ExtArgs> | null
    /**
     * Filter which DiscoverTopic to delete.
     */
    where: DiscoverTopicWhereUniqueInput
  }

  /**
   * DiscoverTopic deleteMany
   */
  export type DiscoverTopicDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DiscoverTopics to delete
     */
    where?: DiscoverTopicWhereInput
  }

  /**
   * DiscoverTopic without action
   */
  export type DiscoverTopicDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiscoverTopic
     */
    select?: DiscoverTopicSelect<ExtArgs> | null
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


  export const DiscoverTopicScalarFieldEnum: {
    id: 'id',
    name: 'name',
    score: 'score',
    updatedAt: 'updatedAt'
  };

  export type DiscoverTopicScalarFieldEnum = (typeof DiscoverTopicScalarFieldEnum)[keyof typeof DiscoverTopicScalarFieldEnum]


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
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type DiscoverTopicWhereInput = {
    AND?: DiscoverTopicWhereInput | DiscoverTopicWhereInput[]
    OR?: DiscoverTopicWhereInput[]
    NOT?: DiscoverTopicWhereInput | DiscoverTopicWhereInput[]
    id?: StringFilter<"DiscoverTopic"> | string
    name?: StringFilter<"DiscoverTopic"> | string
    score?: FloatFilter<"DiscoverTopic"> | number
    updatedAt?: DateTimeFilter<"DiscoverTopic"> | Date | string
  }

  export type DiscoverTopicOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    score?: SortOrder
    updatedAt?: SortOrder
  }

  export type DiscoverTopicWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: DiscoverTopicWhereInput | DiscoverTopicWhereInput[]
    OR?: DiscoverTopicWhereInput[]
    NOT?: DiscoverTopicWhereInput | DiscoverTopicWhereInput[]
    score?: FloatFilter<"DiscoverTopic"> | number
    updatedAt?: DateTimeFilter<"DiscoverTopic"> | Date | string
  }, "id" | "name">

  export type DiscoverTopicOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    score?: SortOrder
    updatedAt?: SortOrder
    _count?: DiscoverTopicCountOrderByAggregateInput
    _avg?: DiscoverTopicAvgOrderByAggregateInput
    _max?: DiscoverTopicMaxOrderByAggregateInput
    _min?: DiscoverTopicMinOrderByAggregateInput
    _sum?: DiscoverTopicSumOrderByAggregateInput
  }

  export type DiscoverTopicScalarWhereWithAggregatesInput = {
    AND?: DiscoverTopicScalarWhereWithAggregatesInput | DiscoverTopicScalarWhereWithAggregatesInput[]
    OR?: DiscoverTopicScalarWhereWithAggregatesInput[]
    NOT?: DiscoverTopicScalarWhereWithAggregatesInput | DiscoverTopicScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DiscoverTopic"> | string
    name?: StringWithAggregatesFilter<"DiscoverTopic"> | string
    score?: FloatWithAggregatesFilter<"DiscoverTopic"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"DiscoverTopic"> | Date | string
  }

  export type DiscoverTopicCreateInput = {
    id?: string
    name: string
    score?: number
    updatedAt?: Date | string
  }

  export type DiscoverTopicUncheckedCreateInput = {
    id?: string
    name: string
    score?: number
    updatedAt?: Date | string
  }

  export type DiscoverTopicUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiscoverTopicUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiscoverTopicCreateManyInput = {
    id?: string
    name: string
    score?: number
    updatedAt?: Date | string
  }

  export type DiscoverTopicUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiscoverTopicUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
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

  export type DiscoverTopicCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    score?: SortOrder
    updatedAt?: SortOrder
  }

  export type DiscoverTopicAvgOrderByAggregateInput = {
    score?: SortOrder
  }

  export type DiscoverTopicMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    score?: SortOrder
    updatedAt?: SortOrder
  }

  export type DiscoverTopicMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    score?: SortOrder
    updatedAt?: SortOrder
  }

  export type DiscoverTopicSumOrderByAggregateInput = {
    score?: SortOrder
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

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
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

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
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

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
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

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
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



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use DiscoverTopicDefaultArgs instead
     */
    export type DiscoverTopicArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DiscoverTopicDefaultArgs<ExtArgs>

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