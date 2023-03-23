# 文件内入注入模块

`@x-9lab/xlab` 使用文件内入注入模块

## 使用
与 `@x-9lab/xlab` 内置的模块不同, `@x-drive/injection` 没有任何已有的注入设置及注入数据。因此需要在使用时额外对 injection 做配置处理
- 使用 `configuration` 设置允许解析的注入字段与允许查找的配置
- 根据实际情况使用 `add` 或 `modify` 添加或修改注入数据
- 使用 `inject` 方法处理请求文件

## 方法

- 数据注入方法
    ```ts
    /**
    * 数据注入方法
    * @param  html 待处理的字符串
    * @param  req  请求对象
    * @return      处理完的字符串
    */
    function inject(html: string, req: Koa.Context): string;
    ```
- 添加一个字段到缓存对象
    ```ts
    /**
    * 添加一个字段到缓存对象
    * @param  key 字段名
    * @param  val 数据
    * @return     存储的数据
    */
    function add(key: string, val: XLab.JsonValue): any;
    ```
- 修改一个字段
    ```ts
    /**
    * 修改一个字段
    * @param  key 字段名
    * @param  val 数据
    * @return     存储的数据
    */
    function modify(key: string, val: XLab.JsonValue): boolean;
    ```
- 修改模块内部的注入字段及允许查找的配置项
    ```ts
    /**修改模块内部的注入字段及允许查找的配置项 */
    function configuration(vars?: string[], confs?: Record<string, any>): void;
    ```