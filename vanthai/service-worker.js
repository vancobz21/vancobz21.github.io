try {
    self["workbox:core:7.2.0"] && _()
} catch {}
const N = (a, ...e) => {
        let t = a;
        return e.length > 0 && (t += ` :: ${JSON.stringify(e)}`), t
    },
    x = N;
class l extends Error {
    constructor(e, t) {
        const s = x(e, t);
        super(s), this.name = e, this.details = t
    }
}
const f = {
        googleAnalytics: "googleAnalytics",
        precache: "precache-v2",
        prefix: "workbox",
        runtime: "runtime",
        suffix: typeof registration < "u" ? registration.scope : ""
    },
    b = a => [f.prefix, a, f.suffix].filter(e => e && e.length > 0).join("-"),
    E = a => {
        for (const e of Object.keys(f)) a(e)
    },
    C = {
        updateDetails: a => {
            E(e => {
                typeof a[e] == "string" && (f[e] = a[e])
            })
        },
        getGoogleAnalyticsName: a => a || b(f.googleAnalytics),
        getPrecacheName: a => a || b(f.precache),
        getPrefix: () => f.prefix,
        getRuntimeName: a => a || b(f.runtime),
        getSuffix: () => f.suffix
    };

function P(a, e) {
    const t = e();
    return a.waitUntil(t), t
}
try {
    self["workbox:precaching:7.2.0"] && _()
} catch {}
const O = "__WB_REVISION__";

function I(a) {
    if (!a) throw new l("add-to-cache-list-unexpected-type", {
        entry: a
    });
    if (typeof a == "string") {
        const r = new URL(a, location.href);
        return {
            cacheKey: r.href,
            url: r.href
        }
    }
    const {
        revision: e,
        url: t
    } = a;
    if (!t) throw new l("add-to-cache-list-unexpected-type", {
        entry: a
    });
    if (!e) {
        const r = new URL(t, location.href);
        return {
            cacheKey: r.href,
            url: r.href
        }
    }
    const s = new URL(t, location.href),
        n = new URL(t, location.href);
    return s.searchParams.set(O, e), {
        cacheKey: s.href,
        url: n.href
    }
}
class M {
    constructor() {
        this.updatedURLs = [], this.notUpdatedURLs = [], this.handlerWillStart = async ({
            request: e,
            state: t
        }) => {
            t && (t.originalRequest = e)
        }, this.cachedResponseWillBeUsed = async ({
            event: e,
            state: t,
            cachedResponse: s
        }) => {
            if (e.type === "install" && t && t.originalRequest && t.originalRequest instanceof Request) {
                const n = t.originalRequest.url;
                s ? this.notUpdatedURLs.push(n) : this.updatedURLs.push(n)
            }
            return s
        }
    }
}
class D {
    constructor({
        precacheController: e
    }) {
        this.cacheKeyWillBeUsed = async ({
            request: t,
            params: s
        }) => {
            const n = (s == null ? void 0 : s.cacheKey) || this._precacheController.getCacheKeyForURL(t.url);
            return n ? new Request(n, {
                headers: t.headers
            }) : t
        }, this._precacheController = e
    }
}
let y;

function W() {
    if (y === void 0) {
        const a = new Response("");
        if ("body" in a) try {
            new Response(a.body), y = !0
        } catch {
            y = !1
        }
        y = !1
    }
    return y
}
async function A(a, e) {
    let t = null;
    if (a.url && (t = new URL(a.url).origin), t !== self.location.origin) throw new l("cross-origin-copy-response", {
        origin: t
    });
    const s = a.clone(),
        r = {
            headers: new Headers(s.headers),
            status: s.status,
            statusText: s.statusText
        },
        c = W() ? s.body : await s.blob();
    return new Response(c, r)
}
const S = a => new URL(String(a), location.href).href.replace(new RegExp(`^${location.origin}`), "");

function K(a, e) {
    const t = new URL(a);
    for (const s of e) t.searchParams.delete(s);
    return t.href
}
async function q(a, e, t, s) {
    const n = K(e.url, t);
    if (e.url === n) return a.match(e, s);
    const r = Object.assign(Object.assign({}, s), {
            ignoreSearch: !0
        }),
        c = await a.keys(e, r);
    for (const i of c) {
        const o = K(i.url, t);
        if (n === o) return a.match(i, s)
    }
}
class H {
    constructor() {
        this.promise = new Promise((e, t) => {
            this.resolve = e, this.reject = t
        })
    }
}
const j = new Set;
async function F() {
    for (const a of j) await a()
}

function B(a) {
    return new Promise(e => setTimeout(e, a))
}
try {
    self["workbox:strategies:7.2.0"] && _()
} catch {}

function m(a) {
    return typeof a == "string" ? new Request(a) : a
}
class $ {
    constructor(e, t) {
        this._cacheKeys = {}, Object.assign(this, t), this.event = t.event, this._strategy = e, this._handlerDeferred = new H, this._extendLifetimePromises = [], this._plugins = [...e.plugins], this._pluginStateMap = new Map;
        for (const s of this._plugins) this._pluginStateMap.set(s, {});
        this.event.waitUntil(this._handlerDeferred.promise)
    }
    async fetch(e) {
        const {
            event: t
        } = this;
        let s = m(e);
        if (s.mode === "navigate" && t instanceof FetchEvent && t.preloadResponse) {
            const c = await t.preloadResponse;
            if (c) return c
        }
        const n = this.hasCallback("fetchDidFail") ? s.clone() : null;
        try {
            for (const c of this.iterateCallbacks("requestWillFetch")) s = await c({
                request: s.clone(),
                event: t
            })
        } catch (c) {
            if (c instanceof Error) throw new l("plugin-error-request-will-fetch", {
                thrownErrorMessage: c.message
            })
        }
        const r = s.clone();
        try {
            let c;
            c = await fetch(s, s.mode === "navigate" ? void 0 : this._strategy.fetchOptions);
            for (const i of this.iterateCallbacks("fetchDidSucceed")) c = await i({
                event: t,
                request: r,
                response: c
            });
            return c
        } catch (c) {
            throw n && await this.runCallbacks("fetchDidFail", {
                error: c,
                event: t,
                originalRequest: n.clone(),
                request: r.clone()
            }), c
        }
    }
    async fetchAndCachePut(e) {
        const t = await this.fetch(e),
            s = t.clone();
        return this.waitUntil(this.cachePut(e, s)), t
    }
    async cacheMatch(e) {
        const t = m(e);
        let s;
        const {
            cacheName: n,
            matchOptions: r
        } = this._strategy, c = await this.getCacheKey(t, "read"), i = Object.assign(Object.assign({}, r), {
            cacheName: n
        });
        s = await caches.match(c, i);
        for (const o of this.iterateCallbacks("cachedResponseWillBeUsed")) s = await o({
            cacheName: n,
            matchOptions: r,
            cachedResponse: s,
            request: c,
            event: this.event
        }) || void 0;
        return s
    }
    async cachePut(e, t) {
        const s = m(e);
        await B(0);
        const n = await this.getCacheKey(s, "write");
        if (!t) throw new l("cache-put-with-no-response", {
            url: S(n.url)
        });
        const r = await this._ensureResponseSafeToCache(t);
        if (!r) return !1;
        const {
            cacheName: c,
            matchOptions: i
        } = this._strategy, o = await self.caches.open(c), h = this.hasCallback("cacheDidUpdate"), p = h ? await q(o, n.clone(), ["__WB_REVISION__"], i) : null;
        try {
            await o.put(n, h ? r.clone() : r)
        } catch (u) {
            if (u instanceof Error) throw u.name === "QuotaExceededError" && await F(), u
        }
        for (const u of this.iterateCallbacks("cacheDidUpdate")) await u({
            cacheName: c,
            oldResponse: p,
            newResponse: r.clone(),
            request: n,
            event: this.event
        });
        return !0
    }
    async getCacheKey(e, t) {
        const s = `${e.url} | ${t}`;
        if (!this._cacheKeys[s]) {
            let n = e;
            for (const r of this.iterateCallbacks("cacheKeyWillBeUsed")) n = m(await r({
                mode: t,
                request: n,
                event: this.event,
                params: this.params
            }));
            this._cacheKeys[s] = n
        }
        return this._cacheKeys[s]
    }
    hasCallback(e) {
        for (const t of this._strategy.plugins)
            if (e in t) return !0;
        return !1
    }
    async runCallbacks(e, t) {
        for (const s of this.iterateCallbacks(e)) await s(t)
    }* iterateCallbacks(e) {
        for (const t of this._strategy.plugins)
            if (typeof t[e] == "function") {
                const s = this._pluginStateMap.get(t);
                yield r => {
                    const c = Object.assign(Object.assign({}, r), {
                        state: s
                    });
                    return t[e](c)
                }
            }
    }
    waitUntil(e) {
        return this._extendLifetimePromises.push(e), e
    }
    async doneWaiting() {
        let e;
        for (; e = this._extendLifetimePromises.shift();) await e
    }
    destroy() {
        this._handlerDeferred.resolve(null)
    }
    async _ensureResponseSafeToCache(e) {
        let t = e,
            s = !1;
        for (const n of this.iterateCallbacks("cacheWillUpdate"))
            if (t = await n({
                    request: this.request,
                    response: t,
                    event: this.event
                }) || void 0, s = !0, !t) break;
        return s || t && t.status !== 200 && (t = void 0), t
    }
}
class G {
    constructor(e = {}) {
        this.cacheName = C.getRuntimeName(e.cacheName), this.plugins = e.plugins || [], this.fetchOptions = e.fetchOptions, this.matchOptions = e.matchOptions
    }
    handle(e) {
        const [t] = this.handleAll(e);
        return t
    }
    handleAll(e) {
        e instanceof FetchEvent && (e = {
            event: e,
            request: e.request
        });
        const t = e.event,
            s = typeof e.request == "string" ? new Request(e.request) : e.request,
            n = "params" in e ? e.params : void 0,
            r = new $(this, {
                event: t,
                request: s,
                params: n
            }),
            c = this._getResponse(r, s, t),
            i = this._awaitComplete(c, r, s, t);
        return [c, i]
    }
    async _getResponse(e, t, s) {
        await e.runCallbacks("handlerWillStart", {
            event: s,
            request: t
        });
        let n;
        try {
            if (n = await this._handle(t, e), !n || n.type === "error") throw new l("no-response", {
                url: t.url
            })
        } catch (r) {
            if (r instanceof Error) {
                for (const c of e.iterateCallbacks("handlerDidError"))
                    if (n = await c({
                            error: r,
                            event: s,
                            request: t
                        }), n) break
            }
            if (!n) throw r
        }
        for (const r of e.iterateCallbacks("handlerWillRespond")) n = await r({
            event: s,
            request: t,
            response: n
        });
        return n
    }
    async _awaitComplete(e, t, s, n) {
        let r, c;
        try {
            r = await e
        } catch {}
        try {
            await t.runCallbacks("handlerDidRespond", {
                event: n,
                request: s,
                response: r
            }), await t.doneWaiting()
        } catch (i) {
            i instanceof Error && (c = i)
        }
        if (await t.runCallbacks("handlerDidComplete", {
                event: n,
                request: s,
                response: r,
                error: c
            }), t.destroy(), c) throw c
    }
}
class d extends G {
    constructor(e = {}) {
        e.cacheName = C.getPrecacheName(e.cacheName), super(e), this._fallbackToNetwork = e.fallbackToNetwork !== !1, this.plugins.push(d.copyRedirectedCacheableResponsesPlugin)
    }
    async _handle(e, t) {
        const s = await t.cacheMatch(e);
        return s || (t.event && t.event.type === "install" ? await this._handleInstall(e, t) : await this._handleFetch(e, t))
    }
    async _handleFetch(e, t) {
        let s;
        const n = t.params || {};
        if (this._fallbackToNetwork) {
            const r = n.integrity,
                c = e.integrity,
                i = !c || c === r;
            s = await t.fetch(new Request(e, {
                integrity: e.mode !== "no-cors" ? c || r : void 0
            })), r && i && e.mode !== "no-cors" && (this._useDefaultCacheabilityPluginIfNeeded(), await t.cachePut(e, s.clone()))
        } else throw new l("missing-precache-entry", {
            cacheName: this.cacheName,
            url: e.url
        });
        return s
    }
    async _handleInstall(e, t) {
        this._useDefaultCacheabilityPluginIfNeeded();
        const s = await t.fetch(e);
        if (!await t.cachePut(e, s.clone())) throw new l("bad-precaching-response", {
            url: e.url,
            status: s.status
        });
        return s
    }
    _useDefaultCacheabilityPluginIfNeeded() {
        let e = null,
            t = 0;
        for (const [s, n] of this.plugins.entries()) n !== d.copyRedirectedCacheableResponsesPlugin && (n === d.defaultPrecacheCacheabilityPlugin && (e = s), n.cacheWillUpdate && t++);
        t === 0 ? this.plugins.push(d.defaultPrecacheCacheabilityPlugin) : t > 1 && e !== null && this.plugins.splice(e, 1)
    }
}
d.defaultPrecacheCacheabilityPlugin = {
    async cacheWillUpdate({
        response: a
    }) {
        return !a || a.status >= 400 ? null : a
    }
};
d.copyRedirectedCacheableResponsesPlugin = {
    async cacheWillUpdate({
        response: a
    }) {
        return a.redirected ? await A(a) : a
    }
};
class V {
    constructor({
        cacheName: e,
        plugins: t = [],
        fallbackToNetwork: s = !0
    } = {}) {
        this._urlsToCacheKeys = new Map, this._urlsToCacheModes = new Map, this._cacheKeysToIntegrities = new Map, this._strategy = new d({
            cacheName: C.getPrecacheName(e),
            plugins: [...t, new D({
                precacheController: this
            })],
            fallbackToNetwork: s
        }), this.install = this.install.bind(this), this.activate = this.activate.bind(this)
    }
    get strategy() {
        return this._strategy
    }
    precache(e) {
        this.addToCacheList(e), this._installAndActiveListenersAdded || (self.addEventListener("install", this.install), self.addEventListener("activate", this.activate), this._installAndActiveListenersAdded = !0)
    }
    addToCacheList(e) {
        const t = [];
        for (const s of e) {
            typeof s == "string" ? t.push(s) : s && s.revision === void 0 && t.push(s.url);
            const {
                cacheKey: n,
                url: r
            } = I(s), c = typeof s != "string" && s.revision ? "reload" : "default";
            if (this._urlsToCacheKeys.has(r) && this._urlsToCacheKeys.get(r) !== n) throw new l("add-to-cache-list-conflicting-entries", {
                firstEntry: this._urlsToCacheKeys.get(r),
                secondEntry: n
            });
            if (typeof s != "string" && s.integrity) {
                if (this._cacheKeysToIntegrities.has(n) && this._cacheKeysToIntegrities.get(n) !== s.integrity) throw new l("add-to-cache-list-conflicting-integrities", {
                    url: r
                });
                this._cacheKeysToIntegrities.set(n, s.integrity)
            }
            if (this._urlsToCacheKeys.set(r, n), this._urlsToCacheModes.set(r, c), t.length > 0) {
                const i = `Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;
                console.warn(i)
            }
        }
    }
    install(e) {
        return P(e, async () => {
            const t = new M;
            this.strategy.plugins.push(t);
            for (const [r, c] of this._urlsToCacheKeys) {
                const i = this._cacheKeysToIntegrities.get(c),
                    o = this._urlsToCacheModes.get(r),
                    h = new Request(r, {
                        integrity: i,
                        cache: o,
                        credentials: "same-origin"
                    });
                await Promise.all(this.strategy.handleAll({
                    params: {
                        cacheKey: c
                    },
                    request: h,
                    event: e
                }))
            }
            const {
                updatedURLs: s,
                notUpdatedURLs: n
            } = t;
            return {
                updatedURLs: s,
                notUpdatedURLs: n
            }
        })
    }
    activate(e) {
        return P(e, async () => {
            const t = await self.caches.open(this.strategy.cacheName),
                s = await t.keys(),
                n = new Set(this._urlsToCacheKeys.values()),
                r = [];
            for (const c of s) n.has(c.url) || (await t.delete(c), r.push(c.url));
            return {
                deletedURLs: r
            }
        })
    }
    getURLsToCacheKeys() {
        return this._urlsToCacheKeys
    }
    getCachedURLs() {
        return [...this._urlsToCacheKeys.keys()]
    }
    getCacheKeyForURL(e) {
        const t = new URL(e, location.href);
        return this._urlsToCacheKeys.get(t.href)
    }
    getIntegrityForCacheKey(e) {
        return this._cacheKeysToIntegrities.get(e)
    }
    async matchPrecache(e) {
        const t = e instanceof Request ? e.url : e,
            s = this.getCacheKeyForURL(t);
        if (s) return (await self.caches.open(this.strategy.cacheName)).match(s)
    }
    createHandlerBoundToURL(e) {
        const t = this.getCacheKeyForURL(e);
        if (!t) throw new l("non-precached-url", {
            url: e
        });
        return s => (s.request = new Request(e), s.params = Object.assign({
            cacheKey: t
        }, s.params), this.strategy.handle(s))
    }
}
let U;
const L = () => (U || (U = new V), U);
try {
    self["workbox:routing:7.2.0"] && _()
} catch {}
const v = "GET",
    R = a => a && typeof a == "object" ? a : {
        handle: a
    };
class g {
    constructor(e, t, s = v) {
        this.handler = R(t), this.match = e, this.method = s
    }
    setCatchHandler(e) {
        this.catchHandler = R(e)
    }
}
class Q extends g {
    constructor(e, t, s) {
        const n = ({
            url: r
        }) => {
            const c = e.exec(r.href);
            if (c && !(r.origin !== location.origin && c.index !== 0)) return c.slice(1)
        };
        super(n, t, s)
    }
}
class z {
    constructor() {
        this._routes = new Map, this._defaultHandlerMap = new Map
    }
    get routes() {
        return this._routes
    }
    addFetchListener() {
        self.addEventListener("fetch", e => {
            const {
                request: t
            } = e, s = this.handleRequest({
                request: t,
                event: e
            });
            s && e.respondWith(s)
        })
    }
    addCacheListener() {
        self.addEventListener("message", e => {
            if (e.data && e.data.type === "CACHE_URLS") {
                const {
                    payload: t
                } = e.data, s = Promise.all(t.urlsToCache.map(n => {
                    typeof n == "string" && (n = [n]);
                    const r = new Request(...n);
                    return this.handleRequest({
                        request: r,
                        event: e
                    })
                }));
                e.waitUntil(s), e.ports && e.ports[0] && s.then(() => e.ports[0].postMessage(!0))
            }
        })
    }
    handleRequest({
        request: e,
        event: t
    }) {
        const s = new URL(e.url, location.href);
        if (!s.protocol.startsWith("http")) return;
        const n = s.origin === location.origin,
            {
                params: r,
                route: c
            } = this.findMatchingRoute({
                event: t,
                request: e,
                sameOrigin: n,
                url: s
            });
        let i = c && c.handler;
        const o = e.method;
        if (!i && this._defaultHandlerMap.has(o) && (i = this._defaultHandlerMap.get(o)), !i) return;
        let h;
        try {
            h = i.handle({
                url: s,
                request: e,
                event: t,
                params: r
            })
        } catch (u) {
            h = Promise.reject(u)
        }
        const p = c && c.catchHandler;
        return h instanceof Promise && (this._catchHandler || p) && (h = h.catch(async u => {
            if (p) try {
                return await p.handle({
                    url: s,
                    request: e,
                    event: t,
                    params: r
                })
            } catch (k) {
                k instanceof Error && (u = k)
            }
            if (this._catchHandler) return this._catchHandler.handle({
                url: s,
                request: e,
                event: t
            });
            throw u
        })), h
    }
    findMatchingRoute({
        url: e,
        sameOrigin: t,
        request: s,
        event: n
    }) {
        const r = this._routes.get(s.method) || [];
        for (const c of r) {
            let i;
            const o = c.match({
                url: e,
                sameOrigin: t,
                request: s,
                event: n
            });
            if (o) return i = o, (Array.isArray(i) && i.length === 0 || o.constructor === Object && Object.keys(o).length === 0 || typeof o == "boolean") && (i = void 0), {
                route: c,
                params: i
            }
        }
        return {}
    }
    setDefaultHandler(e, t = v) {
        this._defaultHandlerMap.set(t, R(e))
    }
    setCatchHandler(e) {
        this._catchHandler = R(e)
    }
    registerRoute(e) {
        this._routes.has(e.method) || this._routes.set(e.method, []), this._routes.get(e.method).push(e)
    }
    unregisterRoute(e) {
        if (!this._routes.has(e.method)) throw new l("unregister-route-but-not-found-with-method", {
            method: e.method
        });
        const t = this._routes.get(e.method).indexOf(e);
        if (t > -1) this._routes.get(e.method).splice(t, 1);
        else throw new l("unregister-route-route-not-registered")
    }
}
let w;
const J = () => (w || (w = new z, w.addFetchListener(), w.addCacheListener()), w);

function T(a, e, t) {
    let s;
    if (typeof a == "string") {
        const r = new URL(a, location.href),
            c = ({
                url: i
            }) => i.href === r.href;
        s = new g(c, e, t)
    } else if (a instanceof RegExp) s = new Q(a, e, t);
    else if (typeof a == "function") s = new g(a, e, t);
    else if (a instanceof g) s = a;
    else throw new l("unsupported-route-type", {
        moduleName: "workbox-routing",
        funcName: "registerRoute",
        paramName: "capture"
    });
    return J().registerRoute(s), s
}

function X(a, e = []) {
    for (const t of [...a.searchParams.keys()]) e.some(s => s.test(t)) && a.searchParams.delete(t);
    return a
}

function* Y(a, {
    ignoreURLParametersMatching: e = [/^utm_/, /^fbclid$/],
    directoryIndex: t = "index.html",
    cleanURLs: s = !0,
    urlManipulation: n
} = {}) {
    const r = new URL(a, location.href);
    r.hash = "", yield r.href;
    const c = X(r, e);
    if (yield c.href, t && c.pathname.endsWith("/")) {
        const i = new URL(c.href);
        i.pathname += t, yield i.href
    }
    if (s) {
        const i = new URL(c.href);
        i.pathname += ".html", yield i.href
    }
    if (n) {
        const i = n({
            url: r
        });
        for (const o of i) yield o.href
    }
}
class Z extends g {
    constructor(e, t) {
        const s = ({
            request: n
        }) => {
            const r = e.getURLsToCacheKeys();
            for (const c of Y(n.url, t)) {
                const i = r.get(c);
                if (i) {
                    const o = e.getIntegrityForCacheKey(i);
                    return {
                        cacheKey: i,
                        integrity: o
                    }
                }
            }
        };
        super(s, e.strategy)
    }
}

function ee(a) {
    const e = L(),
        t = new Z(e, a);
    T(t)
}
const te = "-precache-",
    se = async (a, e = te) => {
        const s = (await self.caches.keys()).filter(n => n.includes(e) && n.includes(self.registration.scope) && n !== a);
        return await Promise.all(s.map(n => self.caches.delete(n))), s
    };

function ae() {
    self.addEventListener("activate", a => {
        const e = C.getPrecacheName();
        a.waitUntil(se(e).then(t => {}))
    })
}

function ne(a) {
    return L().createHandlerBoundToURL(a)
}

function re(a) {
    L().precache(a)
}

function ce(a, e) {
    re(a), ee(e)
}

function ie() {
    self.addEventListener("activate", () => self.clients.claim())
}
class oe extends g {
    constructor(e, {
        allowlist: t = [/./],
        denylist: s = []
    } = {}) {
        super(n => this._match(n), e), this._allowlist = t, this._denylist = s
    }
    _match({
        url: e,
        request: t
    }) {
        if (t && t.mode !== "navigate") return !1;
        const s = e.pathname + e.search;
        for (const n of this._denylist)
            if (n.test(s)) return !1;
        return !!this._allowlist.some(n => n.test(s))
    }
}
ce([{
    "revision": null,
    "url": "assets/android-back-D9JKjfw7.webp"
}, {
    "revision": null,
    "url": "assets/android-step-2-CIEKmUXE.webp"
}, {
    "revision": null,
    "url": "assets/browser-history-nav-Bw_eWMEs.webp"
}, {
    "revision": null,
    "url": "assets/desktop-edge-CmXtGStC.webp"
}, {
    "revision": null,
    "url": "assets/index-2Qs447AD.css"
}, {
    "revision": null,
    "url": "assets/index-ChG3htNN.js"
}, {
    "revision": null,
    "url": "assets/mobile-safari-step-1-CKlnxkk_.webp"
}, {
    "revision": null,
    "url": "assets/mobile-safari-step-2-CHMXqPRH.webp"
}, {
    "revision": null,
    "url": "assets/stories-DQfSTkkr.js"
}, {
    "revision": null,
    "url": "assets/workbox-window.prod.es5-B9K5rw8f.js"
}, {
    "revision": "f7ed979f3ee3d4db46d621ac5dfafd1a",
    "url": "components/animal-card.webp"
}, {
    "revision": "6de96eb1d174178e64b73ff8e6844969",
    "url": "components/book-of-secrets.webp"
}, {
    "revision": "599210d1b89922df940be7eea6a90699",
    "url": "components/book-of-vantages.webp"
}, {
    "revision": "1ed36b2a329ef2009ddb10c169df96c7",
    "url": "components/boost-tokens.webp"
}, {
    "revision": "f815fb47df8819f05804339eff4b6e55",
    "url": "components/card-captain.webp"
}, {
    "revision": "259a74e8f0b4ec306ec1970fa7289f04",
    "url": "components/center.webp"
}, {
    "revision": "8d4cc0c56fa5db71055fc777c51cfde9",
    "url": "components/challenge-die.webp"
}, {
    "revision": "1cc3d92fea78706341fb011e23150716",
    "url": "components/coins.webp"
}, {
    "revision": "3f2e57177628ae6a3abea0e86586bf97",
    "url": "components/destiny-card.webp"
}, {
    "revision": "d054201ce7158258da0d383520ebd679",
    "url": "components/escape-pod.webp"
}, {
    "revision": "b37b733021f69e2fd54bcf35cbcf8307",
    "url": "components/location-card-holder.webp"
}, {
    "revision": "4d2b6a068313bb6811e4893ca61012ef",
    "url": "components/location-card.webp"
}, {
    "revision": "3159da15806025b2de2377c838ce5387",
    "url": "components/mission-card.webp"
}, {
    "revision": "ad14c1c6635b5a0a64bd3d1f7829a757",
    "url": "components/skill-die.webp"
}, {
    "revision": "a413ad35ae020c8b0527c1b53188a528",
    "url": "components/skill-tokens.webp"
}, {
    "revision": "9c2feef2c50f53a3281ebf455e6e2d28",
    "url": "components/spoiler-pack.webp"
}, {
    "revision": "8d45ae1d973635f36db5fba0de9a4d8b",
    "url": "components/storybooks.webp"
}, {
    "revision": "e8f6a7683dae55cdf432bb575da90799",
    "url": "components/trackers.webp"
}, {
    "revision": "de03efe481d1187c625fcd29aa1d141f",
    "url": "figures/always-available-action.webp"
}, {
    "revision": "6e4ffc16f97456dd9bb3974923cbbc91",
    "url": "figures/basket-fruit.webp"
}, {
    "revision": "1bcc11c0ff4fa53187b480a3283b15a5",
    "url": "figures/boost-card.webp"
}, {
    "revision": "e8be66492108aecaf445de4009ab4d94",
    "url": "figures/boost-character.webp"
}, {
    "revision": "bb9ec5d0d00cd3905abd858451a0d853",
    "url": "figures/bos1002.webp"
}, {
    "revision": "26897bdf7601629f13fba50adde29602",
    "url": "figures/bos110.webp"
}, {
    "revision": "ebce955122d751943ecb64c2f35ade43",
    "url": "figures/bos207.webp"
}, {
    "revision": "1f7b0f18834c524b46e553772ed09f5c",
    "url": "figures/bos231.webp"
}, {
    "revision": "11d2d28ab0fac291fde42ab6cdbe17ba",
    "url": "figures/bos621.webp"
}, {
    "revision": "5577431e92379a86ce8cc30ac0c65075",
    "url": "figures/bos693.webp"
}, {
    "revision": "b8a9bb26b8b9092d77f950046fa81d99",
    "url": "figures/bos721.webp"
}, {
    "revision": "e606b192a61983c12797d48cd72011d2",
    "url": "figures/card-action-cost.webp"
}, {
    "revision": "72a294433e3d239eb39e64ae28b2420c",
    "url": "figures/card-action.webp"
}, {
    "revision": "de77d1994e69df467c537b5b7d6cdc09",
    "url": "figures/depart-action.webp"
}, {
    "revision": "96d9d8b4b99e3b3135eb4c2e2b813362",
    "url": "figures/location-actions.webp"
}, {
    "revision": "3f671dfd782c25984511dcaaf88c64a3",
    "url": "figures/put-away.webp"
}, {
    "revision": "0b4619089690691f8014fc82a77103c0",
    "url": "figures/results.webp"
}, {
    "revision": "6f3790a982c8a21509a0ea5ff682109f",
    "url": "figures/roll-dice.webp"
}, {
    "revision": "f7fa319dcf4dfb503f94c6f963340685",
    "url": "figures/setup-1.webp"
}, {
    "revision": "15f4ffa9eb4b3969e0788cc214a4be5b",
    "url": "figures/setup-2.webp"
}, {
    "revision": "f56f61ecc47b13020ca7fcdde2223f16",
    "url": "figures/setup-3.webp"
}, {
    "revision": "214842799afcbef5f2671dcf6430b44b",
    "url": "figures/setup-4.webp"
}, {
    "revision": "936a2655017aed0fc28d0282181b3494",
    "url": "figures/setup-5.webp"
}, {
    "revision": "cd4bb4ed0fa129a48bdbde0f83066650",
    "url": "figures/setup-6.webp"
}, {
    "revision": "f3755fe9b3d057fefcdfda5ef670498c",
    "url": "figures/setup-difficulty.webp"
}, {
    "revision": "615d1fea815eabfddf310d89c7903211",
    "url": "figures/spend-skill-tokens.webp"
}, {
    "revision": "0c986e95553e068ced8742dae017e621",
    "url": "figures/storybook-action.webp"
}, {
    "revision": "a0f1abb3a2cfb4f68b7ed97d2af26ad4",
    "url": "figures/storybook-card-action.webp"
}, {
    "revision": "39481eec70ec378725a1f27a1c8ba0b9",
    "url": "fonts/alumni-sans-600.woff2"
}, {
    "revision": "c6731eae5ecae4d872beffdba9a79d74",
    "url": "fonts/alumni-sans-italic-600.woff2"
}, {
    "revision": "0f36ecf8e1cd1ff540cf42122e4b5724",
    "url": "fonts/fira-sans-300.woff2"
}, {
    "revision": "b87eef4652dabebe0a6f9ae04b709d0a",
    "url": "fonts/fira-sans-400.woff2"
}, {
    "revision": "6faa3495dacdb01d260e819367773350",
    "url": "fonts/fira-sans-600.woff2"
}, {
    "revision": "f820a1d5765db730de14428c9bc7e7a0",
    "url": "fonts/fira-sans-condensed-400.woff2"
}, {
    "revision": "1e3d360a7f60d86428e75a92f757cd75",
    "url": "fonts/fira-sans-italic-300.woff2"
}, {
    "revision": "b7c2a8321cfd081df5bbd748321d65d8",
    "url": "fonts/fira-sans-italic-400.woff2"
}, {
    "revision": "bec906f2d6b37e952c7263cbff5c2e16",
    "url": "fonts/fira-sans-italic-600.woff2"
}, {
    "revision": "28fb7a94ae6ff04d9fea033b49035b07",
    "url": "fonts/khand-500.woff2"
}, {
    "revision": "8955265a5451f7f627e09cb6c91d6a67",
    "url": "fonts/khand-600.woff2"
}, {
    "revision": "caeb448618779b391aa3b143fc9f6c32",
    "url": "fonts/khand-700.woff2"
}, {
    "revision": "8bb78d9d5905fd064d0240722877fb46",
    "url": "icons/i-circuit.webp"
}, {
    "revision": "3db674a4948100db8356a75116ae62bf",
    "url": "icons/i-energy.webp"
}, {
    "revision": "274a137dde5dcd624f74de43e0fa2a11",
    "url": "icons/i-fire.webp"
}, {
    "revision": "3023b152cd59e45edf1564eaf32c9f09",
    "url": "icons/i-gold.webp"
}, {
    "revision": "47c906368ca9c525320cf72c4c281ca5",
    "url": "icons/i-leaf.webp"
}, {
    "revision": "f55e5ffe168216bcf1e2ee2fbe0c4629",
    "url": "icons/i-metal.webp"
}, {
    "revision": "683d05780b509271e7c853981b82af52",
    "url": "icons/i-sand.webp"
}, {
    "revision": "8102e23d59150e0dbd60ddee3048aa9a",
    "url": "icons/i-sinew.webp"
}, {
    "revision": "6f5f9c7a682adcd67568f0e70c7de0f5",
    "url": "icons/i-stone.webp"
}, {
    "revision": "97a93ec263674804bcdb2cc741e06972",
    "url": "icons/i-water.webp"
}, {
    "revision": "295008abfb34adf40b93488f12d8a9a5",
    "url": "icons/i-wind.webp"
}, {
    "revision": "17501f07bf2aa15b77bf7e0121eb1371",
    "url": "icons/i-wood.webp"
}, {
    "revision": "03beffd47c96b4b088ce2fe5087a7e1e",
    "url": "index.html"
}, {
    "revision": "ec9e8e1cd5e4d91203271112c2e15fea",
    "url": "meta/apple-touch-icon.png"
}, {
    "revision": "86d0f87f688058ae02cb21441075cc57",
    "url": "meta/favicon.png"
}, {
    "revision": "fd116c8a06587d34b64eed422a2c2868",
    "url": "meta/icon-192-maskable.png"
}, {
    "revision": "3c6c26068c57edb97afa7a3e772e1b6d",
    "url": "meta/icon-192.png"
}, {
    "revision": "8e1d1f220673c83a9b553ef0b085e847",
    "url": "meta/icon-384-maskable.png"
}, {
    "revision": "7176ab6a9888eee8fef9f235e82d3ef2",
    "url": "meta/icon-384.png"
}, {
    "revision": "76af9f1742541a19d6867a10f2a9ee32",
    "url": "meta/icon-512-maskable.png"
}, {
    "revision": "a797240815c818adaf176e2816d4df31",
    "url": "meta/icon-512.png"
}, {
    "revision": "603a880aacb053e4a9241bb8ca3264bd",
    "url": "meta/screen-home-m.webp"
}, {
    "revision": "02e0019e2d1a1d6a34ff6c8b9e2cefa1",
    "url": "meta/screen-home.webp"
}, {
    "revision": "db27145b5887cfb23d919a7abd65ff0f",
    "url": "meta/screen-index-m.webp"
}, {
    "revision": "0ba3daa1550542a8444066803db7af9e",
    "url": "meta/screen-index.webp"
}, {
    "revision": "11b4877b118db98cd68e53215a9bd360",
    "url": "meta/screen-spoilers-m.webp"
}, {
    "revision": "5dbd0962d48f305f0c9b4a8bbff75060",
    "url": "meta/screen-spoilers.webp"
}, {
    "revision": "913dccd34ce2faec8ffac0508a09c6ef",
    "url": "meta/screen-stories-m.webp"
}, {
    "revision": "38a9f74cca97aca4e58c270f68f0049d",
    "url": "meta/screen-stories.webp"
}, {
    "revision": "b2dfa57cfb688138b3f61e37025d8821",
    "url": "meta/splash.png"
}, {
    "revision": "0985a4eeb672c82021c89dee2465af26",
    "url": "number-key.svg"
}, {
    "revision": "f03ea244d035c2dcbeada33b3fe27160",
    "url": "vantage-bg.webp"
}, {
    "revision": "6d97aca33d6584cd6e519e08861d1547",
    "url": "vantage.webp"
}, {
    "revision": "fd116c8a06587d34b64eed422a2c2868",
    "url": "meta/icon-192-maskable.png"
}, {
    "revision": "3c6c26068c57edb97afa7a3e772e1b6d",
    "url": "meta/icon-192.png"
}, {
    "revision": "8e1d1f220673c83a9b553ef0b085e847",
    "url": "meta/icon-384-maskable.png"
}, {
    "revision": "7176ab6a9888eee8fef9f235e82d3ef2",
    "url": "meta/icon-384.png"
}, {
    "revision": "76af9f1742541a19d6867a10f2a9ee32",
    "url": "meta/icon-512-maskable.png"
}, {
    "revision": "a797240815c818adaf176e2816d4df31",
    "url": "meta/icon-512.png"
}, {
    "revision": "b658cd43b827ab71ba303d8028f4f64c",
    "url": "manifest.webmanifest"
}]);
ae();
let le;
T(new oe(ne("index.html"), {
    allowlist: le
}));
self.skipWaiting();
ie();