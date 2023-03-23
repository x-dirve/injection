import { isArray, isUndefined, isNull, isFunction, isObject, labelReplace } from "@x-drive/utils";
import type Koa from "koa";

/**注入字段 */
const injectVars: string[] = [];

/**允许查找的配置项 */
const conf: Record<string, any> = {};

/**
 * 注入数据存储对象
 */
const INJECTIONS = {};

/**
 * 数据注入方法
 * @param  html 待处理的字符串
 * @param  req  请求对象
 * @return      处理完的字符串
 */
function inject(html: string, req: Koa.Context) {
    if (isArray(injectVars) && injectVars.length) {
        let processorData = {};
        injectVars.forEach((key: string) => {
            // 优先在模块內的缓存对象中找
            let dat = INJECTIONS[key];

            switch (true) {
                // 找不到再去配置中找
                case isUndefined(dat) || isNull(dat):
                    dat = conf[key];
                    break;

                // 如果找出来的是个函数，则尝试执行函数得到返回结果
                case isFunction(dat):
                    dat = dat(key, req);
                    break;
            }

            if (isObject(dat) || Array.isArray(dat)) {
                dat = JSON.stringify(dat);
            }

            processorData[key] = dat;
        });
        return labelReplace(html, processorData, true);
    }
    return html;
}
export { inject }

/**
 * 添加一个字段到缓存对象
 * @param  key 字段名
 * @param  val 数据
 * @return     存储的数据
 */
function add(key: string, val: XLab.JsonValue) {
    INJECTIONS[key] = val;
    injectVars.push(key);
    return INJECTIONS[key];
}
export { add }

/**
 * 修改一个字段
 * @param  key 字段名
 * @param  val 数据
 * @return     存储的数据
 */
function modify(key: string, val: XLab.JsonValue) {
    var re = INJECTIONS.hasOwnProperty(key)
    if (re) {
        INJECTIONS[key] = val;
    }
    return re
}
export { modify }

/**修改模块内部的注入字段及允许查找的配置项 */
function configuration(vars?: string[], confs?: Record<string, any>) {
    if (isArray(vars)) {
        vars.forEach(v => {
            if (v) {
                injectVars.push(v);
            }
        });
    }

    if (isObject(confs)) {
        Object.keys(confs).forEach(k => {
            conf[k] = confs[k];
        });
    }
}
export { configuration }