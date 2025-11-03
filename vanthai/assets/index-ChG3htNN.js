var Re = Object.defineProperty;
var _e = (t, e, o) => e in t ? Re(t, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: o
}) : t[e] = o;
var le = (t, e, o) => _e(t, typeof e != "symbol" ? e + "" : e, o);
(function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const a of document.querySelectorAll('link[rel="modulepreload"]')) i(a);
    new MutationObserver(a => {
        for (const n of a)
            if (n.type === "childList")
                for (const r of n.addedNodes) r.tagName === "LINK" && r.rel === "modulepreload" && i(r)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function o(a) {
        const n = {};
        return a.integrity && (n.integrity = a.integrity), a.referrerPolicy && (n.referrerPolicy = a.referrerPolicy), a.crossOrigin === "use-credentials" ? n.credentials = "include" : a.crossOrigin === "anonymous" ? n.credentials = "omit" : n.credentials = "same-origin", n
    }

    function i(a) {
        if (a.ep) return;
        a.ep = !0;
        const n = o(a);
        fetch(a.href, n)
    }
})();
const Oe = "modulepreload",
    Ne = function(t) {
        return "/" + t
    },
    he = {},
    ke = function(e, o, i) {
        let a = Promise.resolve();
        if (o && o.length > 0) {
            document.getElementsByTagName("link");
            const r = document.querySelector("meta[property=csp-nonce]"),
                s = (r == null ? void 0 : r.nonce) || (r == null ? void 0 : r.getAttribute("nonce"));
            a = Promise.allSettled(o.map(l => {
                if (l = Ne(l), l in he) return;
                he[l] = !0;
                const c = l.endsWith(".css"),
                    h = c ? '[rel="stylesheet"]' : "";
                if (document.querySelector(`link[href="${l}"]${h}`)) return;
                const d = document.createElement("link");
                if (d.rel = c ? "stylesheet" : Oe, c || (d.as = "script"), d.crossOrigin = "", d.href = l, s && d.setAttribute("nonce", s), document.head.appendChild(d), c) return new Promise((u, p) => {
                    d.addEventListener("load", u), d.addEventListener("error", () => p(new Error(`Unable to preload CSS for ${l}`)))
                })
            }))
        }

        function n(r) {
            const s = new Event("vite:preloadError", {
                cancelable: !0
            });
            if (s.payload = r, window.dispatchEvent(s), !s.defaultPrevented) throw r
        }
        return a.then(r => {
            for (const s of r || []) s.status === "rejected" && n(s.reason);
            return e().catch(n)
        })
    };

function We(t = {}) {
    const {
        immediate: e = !1,
        onNeedRefresh: o,
        onOfflineReady: i,
        onRegistered: a,
        onRegisteredSW: n,
        onRegisterError: r
    } = t;
    let s, l;
    const c = async (d = !0) => {
        await l
    };
    async function h() {
        if ("serviceWorker" in navigator) {
            if (s = await ke(async () => {
                    const {
                        Workbox: d
                    } = await
                    import ("./workbox-window.prod.es5-B9K5rw8f.js");
                    return {
                        Workbox: d
                    }
                }, []).then(({
                    Workbox: d
                }) => new d("/service-worker.js", {
                    scope: "/",
                    type: "classic"
                })).catch(d => {
                    r == null || r(d)
                }), !s) return;
            s.addEventListener("activated", d => {
                (d.isUpdate || d.isExternal) && window.location.reload()
            }), s.addEventListener("installed", d => {
                d.isUpdate || i == null || i()
            }), s.register({
                immediate: e
            }).then(d => {
                n ? n("/service-worker.js", d) : a == null || a(d)
            }).catch(d => {
                r == null || r(d)
            })
        }
    }
    return l = h(), c
}

function Pe() {
    const t = "pwa-last-update-check";
    let e, o;

    function i() {
        const n = Date.now();
        localStorage.setItem(t, n.toString()), a()
    }

    function a() {
        const n = localStorage.getItem(t),
            r = document.getElementById("last-updated");
        if (r && n) {
            const s = new Date(parseInt(n, 10));
            r.textContent = s.toLocaleString()
        }
    }
    return window.addEventListener("load", () => {
        a();
        const n = We({
                immediate: !0,
                onNeedRefresh() {
                    n(!0)
                },
                onRegisteredSW(s, l) {
                    var c;
                    e = s, o = l, ((c = l == null ? void 0 : l.active) == null ? void 0 : c.state) === "activated" ? (N(s, l), i()) : l != null && l.installing && l.installing.addEventListener("statechange", h => {
                        h.target.state === "activated" && (N(s, l), i())
                    })
                }
            }),
            r = document.getElementById("check-for-update");
        r && r.addEventListener("click", async () => {
            if (e && o) try {
                await N(e, o), i()
            } catch {
                alert("Failed to check for updates. Please try again later.")
            }
        })
    }), document.addEventListener("visibilitychange", () => {
        document.visibilityState === "visible" && e && o && (N(e, o), i())
    }), {
        checkForUpdates: async () => {
            if (e && o) try {
                return await N(e, o), i(), !0
            } catch {
                return alert("Failed to check for updates. Please try again later."), !1
            }
            return !1
        },
        getLastCheckTimestamp: () => {
            const n = localStorage.getItem(t);
            return n ? parseInt(n, 10) : null
        }
    }
}
async function N(t, e) {
    if ("onLine" in navigator && !navigator.onLine) throw new Error("Device is offline");
    const o = await fetch(t, {
        cache: "no-store",
        headers: {
            cache: "no-store",
            "cache-control": "no-cache"
        }
    });
    if ((o == null ? void 0 : o.status) === 200) await e.update();
    else throw new Error("Failed to fetch service worker")
}
/*!
 * Modified from ios-pwa-splash <https://github.com/avadhesh18/iosPWASplash>
 * Copyright (c) 2023, Avadhesh B.
 * Released under the MIT License.
 */
function qe(t, e, o = "white") {
    if (e.length === 0) throw new Error("Invalid icon URL provided");
    const i = screen.width,
        a = screen.height,
        n = window.devicePixelRatio || 1,
        r = t.createElement("canvas"),
        s = t.createElement("canvas"),
        l = r.getContext("2d"),
        c = s.getContext("2d"),
        h = new Image;
    h.onerror = function() {
        throw new Error("Failed to load icon image")
    }, h.src = e, h.onload = function() {
        const d = h.width / (3 / n),
            u = h.height / (3 / n);
        r.width = i * n, s.height = r.width, r.height = a * n, s.width = r.height, l.fillStyle = o, c.fillStyle = o, l.fillRect(0, 0, r.width, r.height), c.fillRect(0, 0, s.width, s.height);
        const p = (r.width - d) / 2,
            f = (r.height - u) / 2,
            m = (s.width - d) / 2,
            g = (s.height - u) / 2;
        l.drawImage(h, p, f, d, u), c.drawImage(h, m, g, d, u);
        const k = r.toDataURL("image/png"),
            E = s.toDataURL("image/png");
        if (!t.querySelector('meta[name="apple-mobile-web-app-capable"]')) {
            const O = t.createElement("meta");
            O.setAttribute("name", "apple-mobile-web-app-capable"), O.setAttribute("content", "yes"), t.head.appendChild(O)
        }
        const S = t.createElement("link");
        S.setAttribute("rel", "apple-touch-startup-image"), S.setAttribute("media", "screen and (orientation: portrait)"), S.setAttribute("href", k), t.head.appendChild(S);
        const b = t.createElement("link");
        b.setAttribute("rel", "apple-touch-startup-image"), b.setAttribute("media", "screen and (orientation: landscape)"), b.setAttribute("href", E), t.head.appendChild(b)
    }
}

function C(t) {
    return Array.isArray ? Array.isArray(t) : Ae(t) === "[object Array]"
}

function $e(t) {
    if (typeof t == "string") return t;
    let e = t + "";
    return e == "0" && 1 / t == -1 / 0 ? "-0" : e
}

function Ye(t) {
    return t == null ? "" : $e(t)
}

function I(t) {
    return typeof t == "string"
}

function Ee(t) {
    return typeof t == "number"
}

function Ve(t) {
    return t === !0 || t === !1 || je(t) && Ae(t) == "[object Boolean]"
}

function Se(t) {
    return typeof t == "object"
}

function je(t) {
    return Se(t) && t !== null
}

function w(t) {
    return t != null
}

function J(t) {
    return !t.trim().length
}

function Ae(t) {
    return t == null ? t === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(t)
}
const He = "Incorrect 'index' type",
    ze = t => `Invalid value for key ${t}`,
    Ue = t => `Pattern length exceeds max of ${t}.`,
    Ge = t => `Missing ${t} property in key`,
    Je = t => `Property 'weight' in key '${t}' must be a positive integer`,
    de = Object.prototype.hasOwnProperty;
class Ke {
    constructor(e) {
        this._keys = [], this._keyMap = {};
        let o = 0;
        e.forEach(i => {
            let a = Te(i);
            this._keys.push(a), this._keyMap[a.id] = a, o += a.weight
        }), this._keys.forEach(i => {
            i.weight /= o
        })
    }
    get(e) {
        return this._keyMap[e]
    }
    keys() {
        return this._keys
    }
    toJSON() {
        return JSON.stringify(this._keys)
    }
}

function Te(t) {
    let e = null,
        o = null,
        i = null,
        a = 1,
        n = null;
    if (I(t) || C(t)) i = t, e = ue(t), o = Q(t);
    else {
        if (!de.call(t, "name")) throw new Error(Ge("name"));
        const r = t.name;
        if (i = r, de.call(t, "weight") && (a = t.weight, a <= 0)) throw new Error(Je(r));
        e = ue(r), o = Q(r), n = t.getFn
    }
    return {
        path: e,
        id: o,
        weight: a,
        src: i,
        getFn: n
    }
}

function ue(t) {
    return C(t) ? t : t.split(".")
}

function Q(t) {
    return C(t) ? t.join(".") : t
}

function Qe(t, e) {
    let o = [],
        i = !1;
    const a = (n, r, s) => {
        if (w(n))
            if (!r[s]) o.push(n);
            else {
                let l = r[s];
                const c = n[l];
                if (!w(c)) return;
                if (s === r.length - 1 && (I(c) || Ee(c) || Ve(c))) o.push(Ye(c));
                else if (C(c)) {
                    i = !0;
                    for (let h = 0, d = c.length; h < d; h += 1) a(c[h], r, s + 1)
                } else r.length && a(c, r, s + 1)
            }
    };
    return a(t, I(e) ? e.split(".") : e, 0), i ? o : o[0]
}
const Xe = {
        includeMatches: !1,
        findAllMatches: !1,
        minMatchCharLength: 1
    },
    Ze = {
        isCaseSensitive: !1,
        ignoreDiacritics: !1,
        includeScore: !1,
        keys: [],
        shouldSort: !0,
        sortFn: (t, e) => t.score === e.score ? t.idx < e.idx ? -1 : 1 : t.score < e.score ? -1 : 1
    },
    et = {
        location: 0,
        threshold: .6,
        distance: 100
    },
    tt = {
        useExtendedSearch: !1,
        getFn: Qe,
        ignoreLocation: !1,
        ignoreFieldNorm: !1,
        fieldNormWeight: 1
    };
var y = { ...Ze,
    ...Xe,
    ...et,
    ...tt
};
const ot = /[^ ]+/g;

function at(t = 1, e = 3) {
    const o = new Map,
        i = Math.pow(10, e);
    return {
        get(a) {
            const n = a.match(ot).length;
            if (o.has(n)) return o.get(n);
            const r = 1 / Math.pow(n, .5 * t),
                s = parseFloat(Math.round(r * i) / i);
            return o.set(n, s), s
        },
        clear() {
            o.clear()
        }
    }
}
class ne {
    constructor({
        getFn: e = y.getFn,
        fieldNormWeight: o = y.fieldNormWeight
    } = {}) {
        this.norm = at(o, 3), this.getFn = e, this.isCreated = !1, this.setIndexRecords()
    }
    setSources(e = []) {
        this.docs = e
    }
    setIndexRecords(e = []) {
        this.records = e
    }
    setKeys(e = []) {
        this.keys = e, this._keysMap = {}, e.forEach((o, i) => {
            this._keysMap[o.id] = i
        })
    }
    create() {
        this.isCreated || !this.docs.length || (this.isCreated = !0, I(this.docs[0]) ? this.docs.forEach((e, o) => {
            this._addString(e, o)
        }) : this.docs.forEach((e, o) => {
            this._addObject(e, o)
        }), this.norm.clear())
    }
    add(e) {
        const o = this.size();
        I(e) ? this._addString(e, o) : this._addObject(e, o)
    }
    removeAt(e) {
        this.records.splice(e, 1);
        for (let o = e, i = this.size(); o < i; o += 1) this.records[o].i -= 1
    }
    getValueForItemAtKeyId(e, o) {
        return e[this._keysMap[o]]
    }
    size() {
        return this.records.length
    }
    _addString(e, o) {
        if (!w(e) || J(e)) return;
        let i = {
            v: e,
            i: o,
            n: this.norm.get(e)
        };
        this.records.push(i)
    }
    _addObject(e, o) {
        let i = {
            i: o,
            $: {}
        };
        this.keys.forEach((a, n) => {
            let r = a.getFn ? a.getFn(e) : this.getFn(e, a.path);
            if (w(r)) {
                if (C(r)) {
                    let s = [];
                    const l = [{
                        nestedArrIndex: -1,
                        value: r
                    }];
                    for (; l.length;) {
                        const {
                            nestedArrIndex: c,
                            value: h
                        } = l.pop();
                        if (w(h))
                            if (I(h) && !J(h)) {
                                let d = {
                                    v: h,
                                    i: c,
                                    n: this.norm.get(h)
                                };
                                s.push(d)
                            } else C(h) && h.forEach((d, u) => {
                                l.push({
                                    nestedArrIndex: u,
                                    value: d
                                })
                            })
                    }
                    i.$[n] = s
                } else if (I(r) && !J(r)) {
                    let s = {
                        v: r,
                        n: this.norm.get(r)
                    };
                    i.$[n] = s
                }
            }
        }), this.records.push(i)
    }
    toJSON() {
        return {
            keys: this.keys,
            records: this.records
        }
    }
}

function Ie(t, e, {
    getFn: o = y.getFn,
    fieldNormWeight: i = y.fieldNormWeight
} = {}) {
    const a = new ne({
        getFn: o,
        fieldNormWeight: i
    });
    return a.setKeys(t.map(Te)), a.setSources(e), a.create(), a
}

function nt(t, {
    getFn: e = y.getFn,
    fieldNormWeight: o = y.fieldNormWeight
} = {}) {
    const {
        keys: i,
        records: a
    } = t, n = new ne({
        getFn: e,
        fieldNormWeight: o
    });
    return n.setKeys(i), n.setIndexRecords(a), n
}

function Y(t, {
    errors: e = 0,
    currentLocation: o = 0,
    expectedLocation: i = 0,
    distance: a = y.distance,
    ignoreLocation: n = y.ignoreLocation
} = {}) {
    const r = e / t.length;
    if (n) return r;
    const s = Math.abs(i - o);
    return a ? r + s / a : s ? 1 : r
}

function it(t = [], e = y.minMatchCharLength) {
    let o = [],
        i = -1,
        a = -1,
        n = 0;
    for (let r = t.length; n < r; n += 1) {
        let s = t[n];
        s && i === -1 ? i = n : !s && i !== -1 && (a = n - 1, a - i + 1 >= e && o.push([i, a]), i = -1)
    }
    return t[n - 1] && n - i >= e && o.push([i, n - 1]), o
}
const B = 32;

function rt(t, e, o, {
    location: i = y.location,
    distance: a = y.distance,
    threshold: n = y.threshold,
    findAllMatches: r = y.findAllMatches,
    minMatchCharLength: s = y.minMatchCharLength,
    includeMatches: l = y.includeMatches,
    ignoreLocation: c = y.ignoreLocation
} = {}) {
    if (e.length > B) throw new Error(Ue(B));
    const h = e.length,
        d = t.length,
        u = Math.max(0, Math.min(i, d));
    let p = n,
        f = u;
    const m = s > 1 || l,
        g = m ? Array(d) : [];
    let k;
    for (;
        (k = t.indexOf(e, f)) > -1;) {
        let v = Y(e, {
            currentLocation: k,
            expectedLocation: u,
            distance: a,
            ignoreLocation: c
        });
        if (p = Math.min(v, p), f = k + h, m) {
            let x = 0;
            for (; x < h;) g[k + x] = 1, x += 1
        }
    }
    f = -1;
    let E = [],
        S = 1,
        b = h + d;
    const O = 1 << h - 1;
    for (let v = 0; v < h; v += 1) {
        let x = 0,
            L = b;
        for (; x < L;) Y(e, {
            errors: v,
            currentLocation: u + L,
            expectedLocation: u,
            distance: a,
            ignoreLocation: c
        }) <= p ? x = L : b = L, L = Math.floor((b - x) / 2 + x);
        b = L;
        let se = Math.max(1, u - L + 1),
            G = r ? d : Math.min(u + L, d) + h,
            D = Array(G + 2);
        D[G + 1] = (1 << v) - 1;
        for (let A = G; A >= se; A -= 1) {
            let $ = A - 1,
                ce = o[t.charAt($)];
            if (m && (g[$] = +!!ce), D[A] = (D[A + 1] << 1 | 1) & ce, v && (D[A] |= (E[A + 1] | E[A]) << 1 | 1 | E[A + 1]), D[A] & O && (S = Y(e, {
                    errors: v,
                    currentLocation: $,
                    expectedLocation: u,
                    distance: a,
                    ignoreLocation: c
                }), S <= p)) {
                if (p = S, f = $, f <= u) break;
                se = Math.max(1, 2 * u - f)
            }
        }
        if (Y(e, {
                errors: v + 1,
                currentLocation: u,
                expectedLocation: u,
                distance: a,
                ignoreLocation: c
            }) > p) break;
        E = D
    }
    const U = {
        isMatch: f >= 0,
        score: Math.max(.001, S)
    };
    if (m) {
        const v = it(g, s);
        v.length ? l && (U.indices = v) : U.isMatch = !1
    }
    return U
}

function st(t) {
    let e = {};
    for (let o = 0, i = t.length; o < i; o += 1) {
        const a = t.charAt(o);
        e[a] = (e[a] || 0) | 1 << i - o - 1
    }
    return e
}
const V = String.prototype.normalize ? t => t.normalize("NFD").replace(/[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]/g, "") : t => t;
class Ce {
    constructor(e, {
        location: o = y.location,
        threshold: i = y.threshold,
        distance: a = y.distance,
        includeMatches: n = y.includeMatches,
        findAllMatches: r = y.findAllMatches,
        minMatchCharLength: s = y.minMatchCharLength,
        isCaseSensitive: l = y.isCaseSensitive,
        ignoreDiacritics: c = y.ignoreDiacritics,
        ignoreLocation: h = y.ignoreLocation
    } = {}) {
        if (this.options = {
                location: o,
                threshold: i,
                distance: a,
                includeMatches: n,
                findAllMatches: r,
                minMatchCharLength: s,
                isCaseSensitive: l,
                ignoreDiacritics: c,
                ignoreLocation: h
            }, e = l ? e : e.toLowerCase(), e = c ? V(e) : e, this.pattern = e, this.chunks = [], !this.pattern.length) return;
        const d = (p, f) => {
                this.chunks.push({
                    pattern: p,
                    alphabet: st(p),
                    startIndex: f
                })
            },
            u = this.pattern.length;
        if (u > B) {
            let p = 0;
            const f = u % B,
                m = u - f;
            for (; p < m;) d(this.pattern.substr(p, B), p), p += B;
            if (f) {
                const g = u - B;
                d(this.pattern.substr(g), g)
            }
        } else d(this.pattern, 0)
    }
    searchIn(e) {
        const {
            isCaseSensitive: o,
            ignoreDiacritics: i,
            includeMatches: a
        } = this.options;
        if (e = o ? e : e.toLowerCase(), e = i ? V(e) : e, this.pattern === e) {
            let m = {
                isMatch: !0,
                score: 0
            };
            return a && (m.indices = [
                [0, e.length - 1]
            ]), m
        }
        const {
            location: n,
            distance: r,
            threshold: s,
            findAllMatches: l,
            minMatchCharLength: c,
            ignoreLocation: h
        } = this.options;
        let d = [],
            u = 0,
            p = !1;
        this.chunks.forEach(({
            pattern: m,
            alphabet: g,
            startIndex: k
        }) => {
            const {
                isMatch: E,
                score: S,
                indices: b
            } = rt(e, m, g, {
                location: n + k,
                distance: r,
                threshold: s,
                findAllMatches: l,
                minMatchCharLength: c,
                includeMatches: a,
                ignoreLocation: h
            });
            E && (p = !0), u += S, E && b && (d = [...d, ...b])
        });
        let f = {
            isMatch: p,
            score: p ? u / this.chunks.length : 1
        };
        return p && a && (f.indices = d), f
    }
}
class M {
    constructor(e) {
        this.pattern = e
    }
    static isMultiMatch(e) {
        return ye(e, this.multiRegex)
    }
    static isSingleMatch(e) {
        return ye(e, this.singleRegex)
    }
    search() {}
}

function ye(t, e) {
    const o = t.match(e);
    return o ? o[1] : null
}
class ct extends M {
    constructor(e) {
        super(e)
    }
    static get type() {
        return "exact"
    }
    static get multiRegex() {
        return /^="(.*)"$/
    }
    static get singleRegex() {
        return /^=(.*)$/
    }
    search(e) {
        const o = e === this.pattern;
        return {
            isMatch: o,
            score: o ? 0 : 1,
            indices: [0, this.pattern.length - 1]
        }
    }
}
class lt extends M {
    constructor(e) {
        super(e)
    }
    static get type() {
        return "inverse-exact"
    }
    static get multiRegex() {
        return /^!"(.*)"$/
    }
    static get singleRegex() {
        return /^!(.*)$/
    }
    search(e) {
        const i = e.indexOf(this.pattern) === -1;
        return {
            isMatch: i,
            score: i ? 0 : 1,
            indices: [0, e.length - 1]
        }
    }
}
class ht extends M {
    constructor(e) {
        super(e)
    }
    static get type() {
        return "prefix-exact"
    }
    static get multiRegex() {
        return /^\^"(.*)"$/
    }
    static get singleRegex() {
        return /^\^(.*)$/
    }
    search(e) {
        const o = e.startsWith(this.pattern);
        return {
            isMatch: o,
            score: o ? 0 : 1,
            indices: [0, this.pattern.length - 1]
        }
    }
}
class dt extends M {
    constructor(e) {
        super(e)
    }
    static get type() {
        return "inverse-prefix-exact"
    }
    static get multiRegex() {
        return /^!\^"(.*)"$/
    }
    static get singleRegex() {
        return /^!\^(.*)$/
    }
    search(e) {
        const o = !e.startsWith(this.pattern);
        return {
            isMatch: o,
            score: o ? 0 : 1,
            indices: [0, e.length - 1]
        }
    }
}
class ut extends M {
    constructor(e) {
        super(e)
    }
    static get type() {
        return "suffix-exact"
    }
    static get multiRegex() {
        return /^"(.*)"\$$/
    }
    static get singleRegex() {
        return /^(.*)\$$/
    }
    search(e) {
        const o = e.endsWith(this.pattern);
        return {
            isMatch: o,
            score: o ? 0 : 1,
            indices: [e.length - this.pattern.length, e.length - 1]
        }
    }
}
class yt extends M {
    constructor(e) {
        super(e)
    }
    static get type() {
        return "inverse-suffix-exact"
    }
    static get multiRegex() {
        return /^!"(.*)"\$$/
    }
    static get singleRegex() {
        return /^!(.*)\$$/
    }
    search(e) {
        const o = !e.endsWith(this.pattern);
        return {
            isMatch: o,
            score: o ? 0 : 1,
            indices: [0, e.length - 1]
        }
    }
}
class xe extends M {
    constructor(e, {
        location: o = y.location,
        threshold: i = y.threshold,
        distance: a = y.distance,
        includeMatches: n = y.includeMatches,
        findAllMatches: r = y.findAllMatches,
        minMatchCharLength: s = y.minMatchCharLength,
        isCaseSensitive: l = y.isCaseSensitive,
        ignoreDiacritics: c = y.ignoreDiacritics,
        ignoreLocation: h = y.ignoreLocation
    } = {}) {
        super(e), this._bitapSearch = new Ce(e, {
            location: o,
            threshold: i,
            distance: a,
            includeMatches: n,
            findAllMatches: r,
            minMatchCharLength: s,
            isCaseSensitive: l,
            ignoreDiacritics: c,
            ignoreLocation: h
        })
    }
    static get type() {
        return "fuzzy"
    }
    static get multiRegex() {
        return /^"(.*)"$/
    }
    static get singleRegex() {
        return /^(.*)$/
    }
    search(e) {
        return this._bitapSearch.searchIn(e)
    }
}
class Le extends M {
    constructor(e) {
        super(e)
    }
    static get type() {
        return "include"
    }
    static get multiRegex() {
        return /^'"(.*)"$/
    }
    static get singleRegex() {
        return /^'(.*)$/
    }
    search(e) {
        let o = 0,
            i;
        const a = [],
            n = this.pattern.length;
        for (;
            (i = e.indexOf(this.pattern, o)) > -1;) o = i + n, a.push([i, o - 1]);
        const r = !!a.length;
        return {
            isMatch: r,
            score: r ? 0 : 1,
            indices: a
        }
    }
}
const X = [ct, Le, ht, dt, yt, ut, lt, xe],
    pe = X.length,
    pt = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,
    ft = "|";

function mt(t, e = {}) {
    return t.split(ft).map(o => {
        let i = o.trim().split(pt).filter(n => n && !!n.trim()),
            a = [];
        for (let n = 0, r = i.length; n < r; n += 1) {
            const s = i[n];
            let l = !1,
                c = -1;
            for (; !l && ++c < pe;) {
                const h = X[c];
                let d = h.isMultiMatch(s);
                d && (a.push(new h(d, e)), l = !0)
            }
            if (!l)
                for (c = -1; ++c < pe;) {
                    const h = X[c];
                    let d = h.isSingleMatch(s);
                    if (d) {
                        a.push(new h(d, e));
                        break
                    }
                }
        }
        return a
    })
}
const gt = new Set([xe.type, Le.type]);
class wt {
    constructor(e, {
        isCaseSensitive: o = y.isCaseSensitive,
        ignoreDiacritics: i = y.ignoreDiacritics,
        includeMatches: a = y.includeMatches,
        minMatchCharLength: n = y.minMatchCharLength,
        ignoreLocation: r = y.ignoreLocation,
        findAllMatches: s = y.findAllMatches,
        location: l = y.location,
        threshold: c = y.threshold,
        distance: h = y.distance
    } = {}) {
        this.query = null, this.options = {
            isCaseSensitive: o,
            ignoreDiacritics: i,
            includeMatches: a,
            minMatchCharLength: n,
            findAllMatches: s,
            ignoreLocation: r,
            location: l,
            threshold: c,
            distance: h
        }, e = o ? e : e.toLowerCase(), e = i ? V(e) : e, this.pattern = e, this.query = mt(this.pattern, this.options)
    }
    static condition(e, o) {
        return o.useExtendedSearch
    }
    searchIn(e) {
        const o = this.query;
        if (!o) return {
            isMatch: !1,
            score: 1
        };
        const {
            includeMatches: i,
            isCaseSensitive: a,
            ignoreDiacritics: n
        } = this.options;
        e = a ? e : e.toLowerCase(), e = n ? V(e) : e;
        let r = 0,
            s = [],
            l = 0;
        for (let c = 0, h = o.length; c < h; c += 1) {
            const d = o[c];
            s.length = 0, r = 0;
            for (let u = 0, p = d.length; u < p; u += 1) {
                const f = d[u],
                    {
                        isMatch: m,
                        indices: g,
                        score: k
                    } = f.search(e);
                if (m) {
                    if (r += 1, l += k, i) {
                        const E = f.constructor.type;
                        gt.has(E) ? s = [...s, ...g] : s.push(g)
                    }
                } else {
                    l = 0, r = 0, s.length = 0;
                    break
                }
            }
            if (r) {
                let u = {
                    isMatch: !0,
                    score: l / r
                };
                return i && (u.indices = s), u
            }
        }
        return {
            isMatch: !1,
            score: 1
        }
    }
}
const Z = [];

function bt(...t) {
    Z.push(...t)
}

function ee(t, e) {
    for (let o = 0, i = Z.length; o < i; o += 1) {
        let a = Z[o];
        if (a.condition(t, e)) return new a(t, e)
    }
    return new Ce(t, e)
}
const j = {
        AND: "$and",
        OR: "$or"
    },
    te = {
        PATH: "$path",
        PATTERN: "$val"
    },
    oe = t => !!(t[j.AND] || t[j.OR]),
    vt = t => !!t[te.PATH],
    kt = t => !C(t) && Se(t) && !oe(t),
    fe = t => ({
        [j.AND]: Object.keys(t).map(e => ({
            [e]: t[e]
        }))
    });

function Me(t, e, {
    auto: o = !0
} = {}) {
    const i = a => {
        let n = Object.keys(a);
        const r = vt(a);
        if (!r && n.length > 1 && !oe(a)) return i(fe(a));
        if (kt(a)) {
            const l = r ? a[te.PATH] : n[0],
                c = r ? a[te.PATTERN] : a[l];
            if (!I(c)) throw new Error(ze(l));
            const h = {
                keyId: Q(l),
                pattern: c
            };
            return o && (h.searcher = ee(c, e)), h
        }
        let s = {
            children: [],
            operator: n[0]
        };
        return n.forEach(l => {
            const c = a[l];
            C(c) && c.forEach(h => {
                s.children.push(i(h))
            })
        }), s
    };
    return oe(t) || (t = fe(t)), i(t)
}

function Et(t, {
    ignoreFieldNorm: e = y.ignoreFieldNorm
}) {
    t.forEach(o => {
        let i = 1;
        o.matches.forEach(({
            key: a,
            norm: n,
            score: r
        }) => {
            const s = a ? a.weight : null;
            i *= Math.pow(r === 0 && s ? Number.EPSILON : r, (s || 1) * (e ? 1 : n))
        }), o.score = i
    })
}

function St(t, e) {
    const o = t.matches;
    e.matches = [], w(o) && o.forEach(i => {
        if (!w(i.indices) || !i.indices.length) return;
        const {
            indices: a,
            value: n
        } = i;
        let r = {
            indices: a,
            value: n
        };
        i.key && (r.key = i.key.src), i.idx > -1 && (r.refIndex = i.idx), e.matches.push(r)
    })
}

function At(t, e) {
    e.score = t.score
}

function Tt(t, e, {
    includeMatches: o = y.includeMatches,
    includeScore: i = y.includeScore
} = {}) {
    const a = [];
    return o && a.push(St), i && a.push(At), t.map(n => {
        const {
            idx: r
        } = n, s = {
            item: e[r],
            refIndex: r
        };
        return a.length && a.forEach(l => {
            l(n, s)
        }), s
    })
}
class _ {
    constructor(e, o = {}, i) {
        this.options = { ...y,
            ...o
        }, this.options.useExtendedSearch, this._keyStore = new Ke(this.options.keys), this.setCollection(e, i)
    }
    setCollection(e, o) {
        if (this._docs = e, o && !(o instanceof ne)) throw new Error(He);
        this._myIndex = o || Ie(this.options.keys, this._docs, {
            getFn: this.options.getFn,
            fieldNormWeight: this.options.fieldNormWeight
        })
    }
    add(e) {
        w(e) && (this._docs.push(e), this._myIndex.add(e))
    }
    remove(e = () => !1) {
        const o = [];
        for (let i = 0, a = this._docs.length; i < a; i += 1) {
            const n = this._docs[i];
            e(n, i) && (this.removeAt(i), i -= 1, a -= 1, o.push(n))
        }
        return o
    }
    removeAt(e) {
        this._docs.splice(e, 1), this._myIndex.removeAt(e)
    }
    getIndex() {
        return this._myIndex
    }
    search(e, {
        limit: o = -1
    } = {}) {
        const {
            includeMatches: i,
            includeScore: a,
            shouldSort: n,
            sortFn: r,
            ignoreFieldNorm: s
        } = this.options;
        let l = I(e) ? I(this._docs[0]) ? this._searchStringList(e) : this._searchObjectList(e) : this._searchLogical(e);
        return Et(l, {
            ignoreFieldNorm: s
        }), n && l.sort(r), Ee(o) && o > -1 && (l = l.slice(0, o)), Tt(l, this._docs, {
            includeMatches: i,
            includeScore: a
        })
    }
    _searchStringList(e) {
        const o = ee(e, this.options),
            {
                records: i
            } = this._myIndex,
            a = [];
        return i.forEach(({
            v: n,
            i: r,
            n: s
        }) => {
            if (!w(n)) return;
            const {
                isMatch: l,
                score: c,
                indices: h
            } = o.searchIn(n);
            l && a.push({
                item: n,
                idx: r,
                matches: [{
                    score: c,
                    value: n,
                    norm: s,
                    indices: h
                }]
            })
        }), a
    }
    _searchLogical(e) {
        const o = Me(e, this.options),
            i = (s, l, c) => {
                if (!s.children) {
                    const {
                        keyId: d,
                        searcher: u
                    } = s, p = this._findMatches({
                        key: this._keyStore.get(d),
                        value: this._myIndex.getValueForItemAtKeyId(l, d),
                        searcher: u
                    });
                    return p && p.length ? [{
                        idx: c,
                        item: l,
                        matches: p
                    }] : []
                }
                const h = [];
                for (let d = 0, u = s.children.length; d < u; d += 1) {
                    const p = s.children[d],
                        f = i(p, l, c);
                    if (f.length) h.push(...f);
                    else if (s.operator === j.AND) return []
                }
                return h
            },
            a = this._myIndex.records,
            n = {},
            r = [];
        return a.forEach(({
            $: s,
            i: l
        }) => {
            if (w(s)) {
                let c = i(o, s, l);
                c.length && (n[l] || (n[l] = {
                    idx: l,
                    item: s,
                    matches: []
                }, r.push(n[l])), c.forEach(({
                    matches: h
                }) => {
                    n[l].matches.push(...h)
                }))
            }
        }), r
    }
    _searchObjectList(e) {
        const o = ee(e, this.options),
            {
                keys: i,
                records: a
            } = this._myIndex,
            n = [];
        return a.forEach(({
            $: r,
            i: s
        }) => {
            if (!w(r)) return;
            let l = [];
            i.forEach((c, h) => {
                l.push(...this._findMatches({
                    key: c,
                    value: r[h],
                    searcher: o
                }))
            }), l.length && n.push({
                idx: s,
                item: r,
                matches: l
            })
        }), n
    }
    _findMatches({
        key: e,
        value: o,
        searcher: i
    }) {
        if (!w(o)) return [];
        let a = [];
        if (C(o)) o.forEach(({
            v: n,
            i: r,
            n: s
        }) => {
            if (!w(n)) return;
            const {
                isMatch: l,
                score: c,
                indices: h
            } = i.searchIn(n);
            l && a.push({
                score: c,
                key: e,
                value: n,
                idx: r,
                norm: s,
                indices: h
            })
        });
        else {
            const {
                v: n,
                n: r
            } = o, {
                isMatch: s,
                score: l,
                indices: c
            } = i.searchIn(n);
            s && a.push({
                score: l,
                key: e,
                value: n,
                norm: r,
                indices: c
            })
        }
        return a
    }
}
_.version = "7.1.0";
_.createIndex = Ie;
_.parseIndex = nt;
_.config = y;
_.parseQuery = Me;
bt(wt);

function It(t, e) {
    const o = t.getElementById("search-form"),
        i = o.querySelector('input[type="search"]'),
        a = o.querySelector('input[type="reset"]'),
        n = t.getElementById("search-results"),
        r = {
            includeScore: !0,
            shouldSort: !0,
            includeMatches: !0,
            findAllMatches: !0,
            minMatchCharLength: 3,
            threshold: .2,
            ignoreLocation: !0,
            fieldNormWeight: .5,
            keys: [{
                name: "title",
                weight: 10
            }, {
                name: "content",
                weight: 1
            }]
        };

    function s() {
        n.innerHTML = ""
    }

    function l() {
        const c = i.value,
            d = new _(e, r).search(c);
        let u = "";
        if (d.length) {
            u += `<p><small>${d.length} search result(s) found</small></p>`, u += '<ul class="index">';
            for (const p of d) u += `<li><a href=#${p.item.id}>${p.item.title}</a></li>`;
            u += "</ul>"
        } else u = "<h4>No result found</h4>";
        return n.innerHTML = u, u
    }
    return o.addEventListener("submit", c => {
        c.preventDefault()
    }), i.addEventListener("keyup", l), a.addEventListener("click", s), {
        doSearch: l,
        clearSearch: s
    }
}
const Ct = [{
        id: "about",
        title: "What’s this about?",
        content: ["This site is an official rules reference for Vantage by Stonemaier Games", "It’s great for finding a specific rule quickly It’s also an excellent supplement to the rulebook included in the box when watching a how-to-play video or while teaching the game", "Usage Tips", "Back Forward Nav Think of each rule entry as a separate webpage If you want to jump back hit your Back button", "Check the Index Don’t see what you’re looking for The Index has every term in the game Warning includes spoilers", "Install it This site is a (Progressive Web App You can install it as a standalone app that is lightning fast and works even when you’re offline", "Link to a rule Want to share a link to a particular rule Just click its title", "Credits Designed by Jamey Stegmaier Art by Valentina Fili Sören Meding and Emilien Rotival Special Thanks Vantage has been a passion project for me Jamey for over 8 years but I was not alone in this endeavor In addition to the monumental effort of creating an entire planet through nearly 1700 illustrations by Valentina Fili Sören Meding and Emilien Rotival I am forever grateful to Juliana Moreno and Ariel Rubin The Wild Optimists for creating some of the in-game puzzles Ira Fay for creating the playtest app from scratch Shannon Lentz at Panda Game Manufacturing for years of discussions about components Jose Manuel López-Cepero for creating the web app Karel Titeca and Christine Santana for typesetting and graphic design Morten Monrad Pedersen and the Automa Factory team for their help with the solo rules for the spoiler pack developers Garrett Feiner and Travis Willse for their detailed feedback and editing and Ryan Davis and Travis Willse for adding extra flair to many of the Move and Depart storybook results Playtesters Mike Bartoo-Abud Mitch Caudill Blake Chursinoff Caleb Chursinoff Dusty Craine Ryan S Davis Susannah Eisenbraun Mark Espiridion Ira Fay Allie Feiner Garrett Feiner William Augustus Griffin Sr Lindsay Grossmann Ossian Hawkes Wanja Heeren Preston Holmes Chris Ingold Josh Jahner Ben Jepsen Abigail Jones Emily Jones Derik Kellner Robert Konigsberg Max Lüdov Tyler McKinnon Thom Mollinga Chris Munford Jay Nabedian Crystal Nevin Jason Nevin Nicolas Pupat Gregory Rempe Caroline Rempe Clara Rempe Dominick Salazar Ana Salazar Erica Sanders Artur Carvalho Santos Nathan Smith Franziska Steiner David Studley Lieve Teugels Karel Titeca Kobe Titeca Michael Vannoy Josh Ward Travis Willse Shawn Wilson Darren Wolford Frank Wolf Kentoku Yamamoto Proofreaders Brian Chandler Garrett Feiner Jan Horák Jared Kepron Mike Lee Crystal Nevin Justin Radziewicz Asa Swain Karel Titeca Ian Tyrrell Jay Voss Josh Ward Travis Willse Dana Woller Dave Zokvic I’m also incredibly grateful for the many amazing games that inspired Vantage in some way including The Legend of Zelda Breath of the Wild and Tears of the Kingdom The Witcher 3 Baldur’s Gate 3 Eastshade Stardew Valley Subnautica Red Dead Redemption Ghost of Tsushima Elden Ring Tunic TIME Stories The 7th Continent and Citadel Sleeping Gods Tainted Grail Earthborne Rangers Near and Far Crusoe Crew Lands of Galzyr Micro Macro One Deck Dungeon and Roll Player Adventures among others", "Changelog 15 Jul 2025 Addition of FAQ Errata and Resources 16 Jul 2025 Updates from rulebook version r20 Updated errata 17 Jul 2025 Added to card grid section “You may not place challenge dice on horizontal cards in your supply 21 Jul 2025 Updated Errata and FAQ Incorporated content from the Book of Secrets glossary 23 Jul 2025 Added storybook lookup feature including updates to storybook content 24 Jul 2025 Added disclosure widgets to storybook entries to hide decision results 25 Jul 2025 Updated Errata Fixed access to single-digit storybook entries 28 Jul 2025 Updated Errata Enabled wake lock setting Added links in some storybook entries 2 Aug 2025 Updated text in some storybook entries and fixed two small typos 7 Aug 2025 Updated text in some storybook entries and some minor content styling fixes 9 Aug 2025 Updated Errata 17 Aug 2025 Updated glossary entry for cities Fixed hyphenation issues in storybook entries 26 Aug 2025 Errata for depart 213 Additional rule clarifications Minor wording changes to some storybook entries 29 Aug 2025 Updated Errata Minor storybook entry formatting and phrasing fixes 11 Sep 2025 Updated Errata Minor storybook entry formatting and phrasing fixes 20 Sep 2025 Storybook entry corrections and clarifications 13 Oct 2025 Updated Errata Storybook entry corrections and clarifications 26 Oct 2025 Small story entry formatting and phrasing fixes", "Check for update", "Last checked"]
    }, {
        id: "abilities",
        title: "Abilities",
        content: ["Ability cards provide you and other players with challenge dice slots for specific actions For example you might learn how to swim and you can coach your fellow players if they need to swim as well hence the impact slots", "Some actions on ability cards mention nearby natural features indicating that they can be used only if those features are visible and easily accessible on your location Some actions on abilities allow you to gain the benefit of a matching action i.e on a location which counts as a completed location action"]
    }, {
        id: "actions",
        title: "Actions",
        content: ["Turn step 1 Choose one action from the three types of actions", "You choose without knowing the cost or outcome but you always succeed The challenge is avoiding loss of time morale or health", "Location Card Depart", "Each location lists usually 6 location actions in the categories of move look engage help take and overpower Reference the storybook entry for this location e.g for the look-STUDY action on location 272 reference entry 272 in the look storybook If you previously performed a location action here even in a turn some time before the last you cannot perform another Choose a depart action or card action instead Always available Some location action lists may have a note indicating that a specific action is always available This action is available even if you previously performed it or another location action here If another player previously visited the same location this game you may not perform a thematically contradictory location action e.g if a player previously burned a bridge at your location you may not cross the bridge Because Vantage is a highly visual single-session game players should be able to remember where they’ve been or what they’ve done taking notes is permitted if necessary though", "Many non-location cards include action options These include actions on cards in your grid your supply and the center Reference the storybook entry for that specific card e.g for a help-EQUIP action on card 1435 reference entry 1435 in the help storybook You may not look at the card you are gaining if any until you have completed the action Unless stated otherwise you may perform a card action even if you have already performed an action on that card", "Move away from your location in 1 of 4 cardinal directions to another location north always points forward This is a move action Each number 500 273 and 271 for this location is an adjacent listed location You may go to any of these locations using a 1-cost move action WALK or SWIM that does not use a storybook Each star requires you to reference the Depart storybook For this location you would look at the move south entry for location 272 in the Depart storybook for the cost action and result of moving south from this location In the rare case that a direction shows neither a location number nor you cannot depart from this location in that direction", "You will choose the action for your turn without knowing the cost or results but you will always succeed You may not change your mind about the action after reading the cost and description A big part of the game is intuiting discussing and learning by trying."]
    }, {
        id: "animals",
        title: "Animals",
        content: ["Vantage includes a vast variety of animals biological creatures that are differentiated from the people-like sentients of the world", "Wild When you gain most animals they are wild They offer 1 challenge dice slot but no boost powers Some animals also increase your reserve capacity they carry things for you Loyal Loyal animals have multiple dice slots and a boost power"]
    }, {
        id: "book-of-secrets",
        title: "Book of Secrets & Glossary",
        content: ["Only reference entries in the Book of Secrets when instructed by a card or action result It contains solutions to puzzles and resolutions to goals."]
    }, {
        id: "book-of-vantages",
        title: "Book of Vantages",
        content: ["Only reference the Book of Vantages when instructed by a card or action result if you do you may describe what you see to other players but may not show them directly."]
    }, {
        id: "boost",
        title: "Boost",
        content: ["At any time on any turn even in the middle of an action or while another player is performing an action you may use boost powers on cards in your grid to benefit yourself Boost represents knowledge learned while you explore the planet and use the things you discover.", "Boost gained/paid on locations goes to/from your character e.g if the storybook text of a location action says to Gain 1 boost place it on your character Boost gained/paid on all other cards goes on/from that card", "Each card has limited capacity for boost that cannot be exceeded The effects of boost powers last until the end of the current turn When an icon is used instead of the word boost the number of icons represent the amount of boost is 1 boost is 2 boost There is no hard limit on total boost tokens in Vantage In the rare case that all 60 boost tokens are on cards and you need more any cube is a suitable addition If a challenge dice ability says place them in the center it’s referring to the penalty section of the center otherwise it would say to refresh the dice which returns them to the challenge dice pool Some cards request that players place ubiquitous tokens to track progress boost tokens are used for this purpose Your boost powers benefit you If a boost power has an impact icon it can benefit any player"]
    }, {
        id: "cards",
        title: "Cards",
        content: ["Challenge dice slot move one of your challenge dice can be placed here for a move action gain 1 boost after placing a die here Some cards have a coin value the game will tell you when this matters Reserve capacity quantity of vertical cards you can keep beyond your grid 1 extra When Placed benefit gain when placing this card into your grid for the first time 2 boost if this benefit looks at other cards only consider cards in your grid Card number Challenge dice slot as an impact slot a challenge die morale result rolled by any player can be placed here Card actions when you perform one refer to the storybook entry for this card 1435 Boost capacity quantity of boost this card can hold 6 Boost power at any time pay 2 boost from this card to gain either 1 coin or 1 move skill token Boost power at any time pay 1 boost from this card to do this"]
    }, {
        id: "center",
        title: "The Center (gameboard)",
        content: ["Any player may choose to perform actions on cards in the center If a challenge dice ability says place them in the center it’s referring to the penalty section of the center otherwise it would say to refresh the dice which returns them to the challenge dice pool"]
    }, {
        id: "challenge-dice",
        title: "Challenge Dice",
        content: ["Turn step 4 Roll dice from the challenge dice pool equal to the remaining cost", "The cost of an action represents its difficulty roll challenge dice from the pool equal to the numerical cost e.g for a cost of 2 roll 2 challenge dice", "For example if the cost is and a player paid 1 look skill token roll 2 challenge dice instead of 3 If the cost was decreased to 0 by spending skill tokens do not roll any challenge dice If and only if there are fewer available dice in the challenge dice pool than the remaining cost first refresh ALL challenge dice from cards in grids and the penalty section of the center by returning them to the challenge dice pool For example if the remaining cost is 2 but there is only 1 die in the challenge dice pool first refresh all challenge dice then roll 2 of them from the full pool The total quantity of challenge dice in the game is always 8 dice plus 2 per player any excess dice are not used—keep them in the box"]
    }, {
        id: "characters",
        title: "Characters",
        content: ["Each player always has a character card in the center of their grid You are that character you view the world through their eyes While each character is unique if you are looking to increase asymmetry among characters try performing some of the actions printed on your character.", "Starting Starting characters have a when-placed benefit of gaining 2 boost representing your knowledge along with capacity for 6 total boost This is important because the default place to gain boost from location actions and depart actions is on your character Starting characters have the following abilities pay 2 boost to gain or a move skill pay 1 boost to reroll a challenge die you rolled for an action and receive a specific skill if the result is unchanged pay 1 boost to transfer 1 card from your reserve to your grid your character includes a capacity for 1 reserved card and some other cards increase your capacity Characters also have a few actions use the storybook entry matching the character card’s number if you perform any of these actions as your turn", "Survivor There are a few opportunities to replace your character with a survivor version which improves one of the challenge dice slots adds and improves options for the boost power and provides immunity to either heat or cold damage", "Power Armor There are a few opportunities to replace your character with a power armor version which adds a challenge dice slot adds and improves options for the boost power and provides immunity to hypoxia damage"]
    }, {
        id: "coins",
        title: "Coins",
        content: ["You will discover a variety of ways to earn and spend coins noted as on cards and 1 in storybook text Many cards also have coin values action results will indicate when you can sell items for their value Unless you are at the same location as another player you may not transfer coins between players."]
    }, {
        id: "components",
        title: "Components",
        content: ["Storybooks Book of Vantages Book of Secrets The Center Location cards Standard cards Challenge dice Skill dice Boost Tokens Skill tokens Coins Time Morale and Health trackers Location card holders Spoiler pack"]
    }, {
        id: "component-inventory",
        title: "Component Inventory",
        content: ["415 large cards double-sided 80x120mm 916 standard cards 57x87mm 1 spoiler pack of cards 8 storybooks including Book of Secrets 1 Book of Vantages 1 game board the Center 20 challenge dice 12 skill dice 60 boost tokens cubes 60 skill tokens 45 coins 6 time trackers 1 per player 6 morale trackers 1 per player 6 health trackers 1 per player 6 location card holders 1 per player"]
    }, {
        id: "composition",
        title: "Composition",
        content: ["Some actions and abilities refer to a card’s composition which is the primary element associated with that card These icons are also found on some challenge dice slots Not all cards have a composition but if they do it appears as one of these icons:", "Circuit Energy Fire Gold Leaf Metal Sand Sinew Stone Water Wind Wood"]
    }, {
        id: "cost",
        title: "Cost and Action",
        content: ["Turn step 2 Read the cost and action not the result)", "The cost and/or action are printed on some cards though most require players to reference a storybook In most cases you will use a storybook entry to see the cost and full action Use the storybook matching the category e.g engage and the entry matching the card on which the action appears e.g location 272", "Some cards include the full cost action and result—do not reference the storybook for these actions In addition to the type of action and the standard cost the quantity of challenge dice to roll some actions on grid cards also have a boost cost a cube paid from that card In the example to the right this is a 4-cost help action that requires you to also pay 1 boost If the depart action you chose is to an adjacent listed location the move cost is 1 Other adjacent locations are marked with you must look up their move cost in the Depart storybook after declaring a direction Intercardinal directions If you move in a specific cardinal direction e.g move east and there is a related intercardinal direction entry in the Depart storybook e.g move southeast you may choose to move in that related direction instead of your original choice Regions Some location actions refer to the region a broader area encompassing multiple locations which is a letter noted in parentheses in the look storybook entry for your location For actions with cost choose a number 1–6 as the cost This indicates how much effort you will put into the action and the result of the action will depend on the cost number you choose"]
    }, {
        id: "continue",
        title: "Continue",
        content: ["Turn step 8 End your turn.", "If a location action’s result includes instructions to continue you must perform an additional action ignoring the restriction in step 1 e.g if you already performed the engage location action you may choose another location action but not the same engage action", "Some results include instructions to continue with a specific action If it is an action noted on the location start with step 2 Otherwise start with step 1 Some non-location actions include instructions to continue but these do not ignore the restriction in step 1 The instructions sometimes read “You may continue in that case continuing to perform another action is a choice not mandatory This only applies to your current turn you may not continue at this location on a future turn unless another action allows you to do so"]
    }, {
        id: "curses",
        title: "Curses",
        content: ["When caught doing something devious by a nearby sentient sometimes out of view on an adjacent location it is possible you will gain a curse card If so you must place it in your grid If your grid is full you may not reserve the curse Instead reserve a non-character card to make room.", "Each curse adds a penalty to unplaced setback challenge dice results when any player interacts with an action on a location or other card with the corresponding composition icon Setback results are not equivalent to time morale and health results on challenge dice for the purposes of placing setback dice on grid card slots even when the penalty for not placing a specific setback result is to lose time morale or health."]
    }, {
        id: "damage",
        title: "Damage",
        content: ["If you suffer 1 heat cold or hypoxia damage lose either 1 health or both 1 time and 1 morale"]
    }, {
        id: "difficulty",
        title: "Difficulty",
        content: ["Vantage presents players with a variety of options to scale how difficult it is to win most of them during setup Feel free to experiment with these to see what fits best for you.", "The starting position of your time morale and health trackers If you’re feeling bold you might set them all to 3 or 4 for a little buffer you may choose 5 or 6 instead the track maxes out at 6 Just like the game Nations each player chooses independently taking into account that a riskier player may need extra help from others during the game You can even choose these starting stats based on how long you want the game to be—we found that some players want their first game to end quickly so they don’t see too much while learning the mechanisms while others prefer a more relaxed experience The type of mission The mission is randomly selected by rolling 2 skill dice Mathematically rolling a specific pair of runes occurs less often than rolling a specific non-pair so the 6 mission cards associated with pairs are the most difficult missions As indicated on location 000 you can reroll pairs to get an easier mission The crash location In each escape pod there are 21 possible locations where you can crash 126 total across all 6 escape pods The top 6—the pairs—are in more extreme climates so you can reroll them for an easier start The inclusion of actions on each mission card that assist your progress These actions were added during the playtest process to help players who struggled with some of the missions The game does not hold your hand and many missions have multiple ways to accomplish them plus you may simply decide you don’t care about the mission But if you decide the mission is important to you and yet you’re struggling with it each mission includes 4 actions that will help Challenge dice optional variant The first time a player has 3 cards and 6 cards in their grid permanently add an extra die to the challenge dice pool This isn’t possible at 6 players for 1–5 players this will result in a total of 2 challenge dice added to the pool"]
    }, {
        id: "elementals",
        title: "Elementals",
        content: ["Elementals are ancient monsters that sprang to life when the planet was first seeded with the 12 elements.", "Elemental locations The first time each game that you arrive at an elemental location you will incur an immediate penalty and be forced to go to an adjacent location This is essentially a warning shot from the elemental Elemental cards If you gain an elemental by releasing it it instructs you to transfer 3 boost from adjacent cards onto the elemental they absorb the power of surrounding cards you choose which boost to transfer if there are more than 3 boost on cards sharing an edge with the elemental Each elemental has a few challenge dice slots that cost boost from the elemental to use If an elemental has no boost on it lose the card and gain the listed benefits 1 time/morale/health and 1 specific skill Slaying an elemental Slaying a monstrous elemental is a difficult task that requires multiple actions to complete If you choose the overpower-SLAY action you will be instructed to find 4 cards to combine on the table to form the elemental You can then choose which of those cards a different part of the monster to slay first with different parts resulting in different benefits to aid you in the SLAY actions You can also choose to retreat ending the attempt to SLAY the elemental Actions on elemental combat cards count as interactions with that elemental for any added penalties from the associated curse card"]
    }, {
        id: "end-game",
        title: "End of Game",
        content: ["A game can end in several different ways and the storybooks will give you the option or the requirement to end the game when:", "You complete the mission completing a mission will give you a choice between ending the game and continuing to pursue a destiny You complete a destiny and then choose to read its storybook entry which will end the game You may collect multiple destiny cards Any player’s time morale or health is reduced to 0 If this happens read the mission’s entry in the take storybook", "You may even end the game when the time you allotted to play Vantage has expired There is a lot of variation in the duration of Vantage depending both on random factors and player choices e.g performing the actions printed on the mission can significantly decrease the duration Some games may end far quicker than 2 hours while others might push beyond the 3-hour mark.", "In addition to a mission victory a destiny victory or an epic victory both the mission and a destiny are complete you may define success through anything you pursue and achieve.", "When the game ends return all cards and components to the box any cards gained from the spoiler pack return to that pack In other words everything completely resets so you can have a new adventure the next time you play Vantage For storage purposes lay the 3 stacks of location cards flat inside their compartments with various tokens/dice in the gaps that remain then place all storybooks on top of them."]
    }, {
        id: "errata",
        title: "Errata & Clarifications",
        content: ["Cards Storybooks Rules", "104 A relevant portion of the illustration is obscured by the card text a basket containing 6 fruits 267 The card composition should be wind not leaf 431 Change Then go to 413 723 or 728 to Then go to 476 874 Replace (reserve this with (replace this 10 Oct 2025 910 911 912 913 932 3 boost slots are missing from these fishing gear cards you can gain boost on these cards by performing their FISH action and getting a specific result 948 Increase the cost of the boost power to 2 boost instead of 1 10 Oct 2025 957 The dice slot is missing a boost output When you place a challenge die on this slot immediately gain a boost token on that card 962 The dice slot is missing a boost output When you place a challenge die on this slot immediately gain a boost token on that card 1013 RIDE should be a boost power not a card action 1016 3 boost slots are missing from this vehicle card you can gain boost on this card by performing its FISH action and getting a specific result 1444 1450 The second boost ability should be refresh 1 challenge die on another card There are a few of the 1700 cards in the game that function just fine but have one little detail incorrect At some point we will print a slim errata pack and put it on our webstore for 1 or 0 if Shopify allows it I recommend not spoiling these cards before finding them organically if you find them in a game of Vantage you’ll probably notice that something is a little odd and hopefully that will bring you here", "Note The errata below has been incorporated into the storybook lookup move 051–063 To make this action a little friendlier instead of losing vehicles when you DIVE we have revised the text to read “Reserve all vehicle cards if any while you’re underwater look 145 301 The ability you gain should be 1483 not 1482 look 303 Change the entire result to As you trace the lines on the stone three distinctly colored icons emerge You may choose to focus on one of the three If you choose the green icon gain spell 1236 If you choose the pink icon gain spell 1237 If you choose the blue icon gain spell 1238 look 439 Change more than 1 die to 1 or more dice engage 579 In the first bullet point 410 should be 499 help 020–021 023–026 028 030–039 050 help-SHARE actions should have You may continue after the action these are places where you’re trying move past a specific type of barrier take 123 This should give you card 1472 not 1480 take 781 The first option should give you card 1336 not 1344 overpower 530 The opponent’s card should not be 1530 it should be 1521 overpower 558 This should have you exit to 271 not 215 overpower 910 911 912 913 932 1016 The entries for these fishing-related items should include the line roll 1 extra die per boost you pay from this depart 213 north This should take you to 218 not 210", "There is currently no official errata but updates and clarifications to the rulebook are incorporated into this reference as they become available"]
    }, {
        id: "escape-pods",
        title: "Escape Pods",
        content: ["The view from each escape pod is unique as they head towards 1 of 6 different regions of the planet Each escape pod can crash on 21 locations 126 total locations you might crash close to another player but you will never crash on the exact same location You may not perform actions on other cards while in an escape pod."]
    }, {
        id: "experience",
        title: "Experience",
        content: ["Each character has a specific experience card that you may use to mitigate challenge dice results and even gain health However if there are 3 boost on your experience card it is full at the end of your turn you must lose the card it cannot be regained and you may replace your character with an alternative card generally this is a good idea but if you already have an alternate version of your character you may prefer not to replace it When this happens any challenge dice on the experience and character cards are refreshed to the challenge dice pool Any boost on your current character card are transferred to the new card."]
    }, {
        id: "faq",
        title: "Frequently Asked Questions",
        content: ["If the game ends due to a player’s time morale or health dropping to 0 do you complete the current action Can you rally to take one final chance more than once per game If a player’s time morale or health drops to 0 typically during step 6 of an action which is before any benefits are gained you immediately read the entry in the TAKE storybook for the mission which includes an option to potentially proceed If you do you’ll be instructed to continue playing at which point you finish whatever you were doing before including gaining the benefit of the current action The intent of one final chance is that final is final–once per game–but it’s intentionally worded with a little ambiguity so that players can end the game or proceed on their own terms This is your journey not ours", "How do you get more skill tokens Skill tokens are primarily there at the beginning of the game when you don’t have many ways to mitigate dice However there are many actions in the game that give you a specific skill token e.g gain 1 move or a random skill token roll a skill die Some of these actions are very consistent–you just need to try a variety of actions and communicate about what you find There are even a few way built right into the starting components As noted on the board if you have 6 time/health/morale and you would gain more you gain a random skill instead as shown on your starting character you can pay 2 boost to gain 1 move skill token or gain a skill if you reroll and roll the same result", "Two blue storybooks There are two different blue storybooks one for Move actions and one for Depart actions", "Skill tokens The primary function of skill tokens is to decrease the cost of an action typically early in the game but skill tokens are never needed to perform any action", "“Place them in the center If a challenge dice ability says place them in the center it’s referring to the penalty section of the center otherwise it would say to refresh the dice which returns them to the challenge dice pool", "Card actions There are a variety of card actions you can perform on cards in your grid in your supply and on your mission These are either listed on the right side of the card use a storybook to find the cost and result or at the bottom of the card which shows the type of skill cost and result When performing card actions follow all action steps as normal", "No dice on horizontal cards You may only place challenge dice on cards in your grid not in your reserve or supply", "Challenge dice slots with words in them Like the example shown here you can place challenge dice on these slots while performing the matching action e.g while performing a help-CREATE action you can place a die on a slot that has the word create in it Some of these slots have multiple words to use while performing any of those actions", "Cities City locations are labeled with the name of the city or town village etc–they’re all cities Cities offer an exception to the typical rule of one total location action per location “You may perform multiple different actions here 1/turn Please note the word different you may not choose the same action twice", "Location Action Restrictions vs Card and Depart Actions For each location you may perform at most 1 location action unless a location action there says to continue This restriction does not apply to card and depart actions For example your character card has multiple actions master buy equip on separate turns you may perform any of them or even repeat the same action unless it specifically says you can only perform it once", "What’s a faction emblem This is one of the many different types of cards you can find in Vantage It’s listed in the glossary under items as emblems You’ll know when you’ve earned one of these emblems because it will have the word emblem in multiple places on the card", "Do some puzzles have more than one solution They do If you follow the rules of the puzzle and find a different solution than the one in the Book of Secrets it’s still valid Some help with puzzle and minigame rules are found in the following videos Card 798 Card 802", "Are there any important frequently needed rule clarifications not in the printed rulebook Note These changes have been incorporated into this Rulepop If a challenge dice ability says place them in the center it’s referring to the penalty section of the center otherwise it would say to refresh the dice which returns them to the challenge dice pool page 11 You may not use slots abilities or powers on reserved cards but they retain boost tokens When reserved a card’s challenge dice are refreshed [page 12 You may not place challenge dice on horizontal cards in your supply [page 12 this is also noted in the printed rules “Place rolled challenge dice one at a time on your grid cards", "Are there any mistakes in the storybooks that impact gameplay Since printing Vantage we’ve found a few mistakes in the storybooks that impact gameplay though even if you ignore this errata you’ll still get a good card as the result of these actions just not the intended card We recommend putting a little dot in the storybooks next to these entries if you ever encounter them while playing that’s your signal to read the errata", 'How do you win Vantage Can you lose The short answer is yes there are specific clearly defined victory and loss conditions in a game of Vantage But the full answer is more nuanced than that Victory in Vantage depends on whether you’re extrinsically motivated or intrinsically motivated or a mix of both Win There are 21 different reasons why you decided to come to the uncharted planet in the first place–1 of these missions is randomly selected for the group at the beginning of the game You didn’t plan on crashing though so there’s also the matter of resolving your final destination–as you play you’ll discover up to 11 options to consider for completing your destiny as we call it e.g some are different ways to escape the planet You can win Vantage by completing your mission or a destiny or both for an epic victory but the rules also state that you may define success through anything you pursue and achieve Vantage gives you some flexibility as to when you want the game to end that is if you complete a mission or are ready to complete your destiny you can choose to keep playing–presumably to aim for an epic victory–or you can decide the game is over Lose Each player has a set amount of health morale and time "time is a catch-all for your limitations beyond physical and mental The first time any player’s health morale or time is reduced to 0 the game might end–you have a few options depending on the circumstances–but if it happens a second time the game is over If you haven’t completed a mission or destiny you lose Vantage doesn’t overly emphasize the loss though as it’s more about the journey what you experienced along the way and what was important to you I understand that intrinsic victories are unusual for tabletop games Have you ever played The Mind Technically you win The Mind if you get through all 10 levels without failing I’ve never done that Yet I’ve still had games of The Mind that felt like we won–perhaps we played once and lost after 3 levels and we decided to play again to do better if we got to level 5 the next time we met our goal and felt like we won You may have felt this way in digital roguelike games too–maybe you decided to try to build a Slay the Spire deck around a certain card or to do something clever with a new joker in Balatro With all that said if you’re someone who dislikes these types of intrinsic motivations in games you can instead pursue the mission the reason you came to the planet in the first place or a destiny The mission is the victory condition for those who are extrinsically motivated or even those who just want something to focus on in the face of so many different options and paths', "Can you play Vantage remotely with other people If you have a copy of Vantage you can play remotely with anyone else who also has the game Only audio is necessary in fact it’s more thematic that way There’s certain information about other players that’s helpful to have so you can smoothly cooperate while playing remotely To facilitate this please copy and use this Google Sheet while playing remotely", "If a player can explain everything on their location card including the actions they can person why can’t they just show the other players the card Two people looking at the same exact picture scene or view won’t describe it the same way in real life in a game etc It encourages communication by having players talk about what they can see expressing themselves in words and actually listening to each other It saves time–if everyone can see everyone will take the time to look It’s thematic We’re on different parts of the planet so it doesn’t make sense that I can see what you see It adds replayability because seeing is different than hearing something described–if I ever make it to a location you described I may or may not realize that it’s the same location you were talking about It adds curiosity and anticipation If you’re describing something compelling I’m curious to find it myself someday It discourages alpha playstyles empowering players to make their own decisions", "What happens if two players find each other on the same location Players can share a location if so they perform turns as normal simply passing the location card back and forth between turns There are two notes in the rules about sharing the same location First while placing challenge dice If another player is at your location you may place challenge dice on open slots on their cards even non-impact slots with their permission Second when reading action results If another player is on your location you may depart/move them with you simultaneously with permission they don’t pay the cost and give them coins items flora and vehicles ignore when placed effects on exchanged cards", "How does movement work in Vantage In Vantage because players are stranded far from each other on a vast planet only you can see your location just as you cannot see other locations Your location is a large card placed upright in front of you in a card holder You’re always facing north literally looking through your character’s eyes–instead of a miniature you are your character Among the various actions to choose from on your turn is to move from your location to an adjacent location in any cardinal direction In the example below the compass shows that you can easily walk east or south If you do after completing the action simply return the current location card to the box in numerical order its place reserved by your placeholder card and find location card 103 or 576 to place in your card holder You could instead move north or west but the difficulty of these directions is unknown This is one of the ways that using your eyes matters in Vantage Are you adept at moving–or specifically moving across water Does the water appear calm or stormy Do you or other players have advice to offer mechanically for such movement It is only after you commit to moving north or west on this location that you will learn the difficulty perform the action and go to the resulting location Also note that even though you’re always facing north you can still discern from the terrain shown near the bottom of your location as to what you’ll find to the south If it’s a particularly perilous journey south the text on your location will describe what’s behind you This is how movement works in Vantage Nearly every location of close to 800 unique locations allows you to move in any direction as your turn In this way whenever you move you’ve created a new branching path in your story Even if luck has it that you crash on the exact location a 1 in 126 chance you can move in a different direction for a new adventure", "How is it possible that moving north is always an option on a spherical planet The world is a grid that wraps east to west and north to south Thematically some locations are simply closer farther bigger or smaller than others–it doesn’t impact gameplay at all but it is important that the world wraps consistently and seamlessly without complications east to west and north to south The game equates moving forward to moving north as it would be confusing if you reached a pole and suddenly location cards showed that moving forward is now south Just as the shape of Earth isn’t important to me when I’m sitting here at my computer or driving to the farmer’s market beyond the existence of gravity the exact shape of Vantage’s planet isn’t important to the gameplay of a character walking around the planet or to the story of the world The only important thing–more of a feature rather than something useful in the game–is that it is possible to walk all the way around the planet largely to show that this is a complete planet you’re exploring not just a piece of a planet where there are edges to the map", "Check the Stonemaier Games site for additional FAQs with insights from the designer"]
    }, {
        id: "first-game",
        title: "Before Your First Game",
        content: ["For your first game we recommend using the daring starting level for time morale and health and avoiding difficult crash locations These settings are found on location 000 and on the escape pod locations Make bold choices while playing as the first time a player’s time morale or health is reduced to 0 doesn’t necessarily end the game—you will have an option to continue playing as presented by the mission’s entry in the take storybook.", "Your first game is largely about experimentation as you learn about different actions consequences and risk tolerances in Vantage This is more important than the mission instead just try to fill your grid by gaining 8 cards from different locations and from actions on cards in your grid It’s perfectly normal if you don’t achieve this goal If you'd like some direction or want to speed up the game you can perform the actions printed on the mission card.", "Discovery and perception are significant elements of Vantage You will wonder how to do and find things—that is a normal part of the discovery curve of this game and the game will not hold your hand Just try things that intrigue you Use your eyes and intuition If an action looks difficult it probably has a high cost Some actions will turn out differently or be more difficult than what you expect this will help the next time a player sees that type of action When in doubt about a rule apply the Universal Rule of Thematic Fun in the moment then ask about it later", "Communication between players is critically important and not just for sharing skills and impact dice slots which represent sharing your advice and expertise Each player’s choices are their own but any information you have from what you have seen and experienced is yours to share freely To succeed you will often need to describe what you see and discuss your options both for short term and long-term goals."]
    }, {
        id: "flora",
        title: "Flora",
        content: ["The world is flush with a variety of flora each of which has a challenge dice slot for interactions with a specific element Boost on flora cards represents your understanding of the flora’s nature which you can learn about by consuming a piece."]
    }, {
        id: "gameplay",
        title: "Gameplay Overview",
        content: ["The game consists of players taking turns clockwise around the table Each player performs 1 action per turn unless indicated otherwise using skills contributed by any player to decrease the action cost rolling challenge dice based on that cost to determine any complications encountered and placing dice on cards in grids to mitigate those complications You always succeed when performing an action the challenge is to avoid losing time morale and health.", "You will typically begin the game by exploring the area where you arrive—which will be different than the other players—and interacting with various locations in the hopes of adding cards to your 3x3 grid these cards offer additional challenge dice placement slots and other powers One or more players may pursue the shared mission why you traveled to this planet and along the way you may discover various destinies options for resolving your fate on or beyond this world You must discover destiny cards—there is no destiny revealed during setup Work together to share knowledge skills and impact dice slots as you seek to avoid any player’s time morale or health being reduced to 0.", "Solo Play", "Solo play in Vantage is the same as any other player count the number of challenge dice scales as normal with 10 total dice in a solo game There is no Automa to represent the other characters—you are in full control No matter the player count you only ever control 1 character we highly discourage you from breaking the immersion by playing multiple characters"]
    }, {
        id: "goals",
        title: "Goals",
        content: ["In addition to anything players deem important to accomplish there are four types of goals found in Vantage These include both short-term and long-term ambitions.", "Missions Players share 1 mission each game—this is the reason you traveled to the uncharted planet Some missions scale by player count e.g plus X per player this number simply adds to the total—it is not a requirement for each player to achieve If you struggle with a mission there are actions on each mission card to nudge you in the right direction or even to make the mission easier When you complete a mission you have the option of ending the game Actions on mission cards cannot be performed after the mission is complete", "Destinies You did not expect to crash on this planet but now that you have it is up to you to decide your final destination Players may discover and pursue multiple destinies each game There’s one destiny that scales by player count “plus 1 per player this number simply adds to the total—it is not a requirement for each player to achieve Completing a destiny will end the game so you may wait until you are ready to read the destiny’s entry in the Book of Secrets", "Objectives You may discover that your character has a personal journey to pursue leading to a sequence of several connected objectives When you gain an objective add it horizontally to your supply You may not yet place challenge dice on the objective if it has dice slots as the card is not in your grid If you complete the objective the instructions will tell you to rotate the objective vertically and place it in your grid", "Quests When you gain a quest typically by offering to help a sentient add it horizontally to your supply You may not yet place challenge dice on the quest as the card is not in your grid If you complete the quest the instructions will tell you to rotate the quest vertically and place it in your grid after which you cannot perform actions on the quest portion of the card When you gain a quest you will often receive instructions to head in a specific direction Please treat these directions similar to how you might in the real world–if someone says to head north they mean the area to the north not an unwavering path straight to the north"]
    }, {
        id: "grid",
        title: "Card Grid",
        content: ["Whenever you gain a vertical card same size as your character card place it in any open space in your 3x3 grid a tableau of up to 9 cards with your character in the middle You may not reposition cards in your grid The first time a player completes their grid place destiny 1705 in the center.", "Other than impact slots/powers any benefits provided by cards in your grid only apply to cards in your grid not cards controlled by other players or in your reserve Whenever you are instructed to replace or lose a card in your grid refresh any dice on it and return any boost on it to the general supply Return lost cards to the box You must always have your character card in your grid Insert the new card in the same position as the replaced card Adjacency in Vantage always refers to orthogonal adjacency cards that touch at edges left-to-right or top-to-bottom", "Reserve", "You also have a limited capacity to reserve vertical cards outside of your grid in your supply capacity is the total of all icons on cards in your grid Whenever you gain a card but your grid is already full you may either reserve the new card or reserve a card in your grid other than your character card to make space Then if this exceeds your reserve capacity lose an excess card from your reserve.", "You may not use slots abilities or powers on reserved cards but they retain boost tokens When reserved a card’s challenge dice are refreshed Each character has a boost power to transfer a reserved card into their grid to an open space or swapping with a card do not gain when placed benefits of cards transferred from reserve", "Supply", "Some cards you gain are horizontal not vertical These cards are either shared with all players missions and destinies or are kept in your supply There is no limit to how many horizontal cards you can have in your supply You may not place challenge dice on horizontal cards in your supply."]
    }, {
        id: "icons",
        title: "Icons",
        content: ["Move Look Engage Help Take Overpower Time Morale Health Setback Blank Boost Coin Impact Mandatory Traveler Cost X Reserve Circuit Energy Fire Gold Leaf Metal Sand Sinew Stone Water Wind Wood"]
    }, {
        id: "interactions",
        title: "Interactions",
        content: ["Some actions specify that they can only be performed when interacting with a sentient For purposes of those actions you are interacting with a sentient either when you perform a location action where there is a sentient depicted both in the art and by a composition icon or when you perform an action printed on a sentient card in your grid."]
    }, {
        id: "items",
        title: "Items",
        content: ["There are a wide variety of items in the world some that may need further explanations are listed below.", "Artifacts Artifacts are powerful items earned by completing puzzles When you first place an artifact gain 1 boost on it up to 3 for each card matching its composition in your grid including itself so it will always gain at least 1 boost this way", "Books Books offer knowledge to share with all players though only you can view a particular page of the Book of Vantages when you use the book card’s boost power Each book offers information about the world and sometimes special actions", "Bows and arrows These weapons have abilities that trigger before you perform an overpower action step 3 At that time if you spend a boost from a bow or from an arrow if you also have a bow reduce the action cost by 1 you may do this multiple times if you have more than 1 boost on a bow/arrow to spend If you used a boost from an arrow also gain the special benefit unique to that arrow", "Emblems Emblems are powerful items earned by completing trials They cannot hold boost but they add boost to each card in your grid that matches its composition Emblems indicate that a certain type of sentient has welcomed your people into their culture hence they benefit your entire crew via impact challenge dice slots", "Maps When you place a map in your grid gain 1 boost on the map for each card adjacent to it sharing an edge Maps show approximate locations of specific targets in the world though they are not always comprehensive By spending a boost you can view a large version of the map in the Book of Vantages", "Shields Shields prevent a loss of health upon arriving at dangerous locations This does not include climate-based damage—it only applies to upon arrival penalties that specifically show the health icon"]
    }, {
        id: "lessons",
        title: "Lessons",
        content: ["There are 3 types of magic in this world and the most common way to gain access to magical spells is through lesson cards Each lesson card has a look-LEARN action with a cost of (you choose a number 1–6 The more dice you roll the greater the chance you will roll a challenge die result that you can place on the slot at the top of the lesson card to gain a specific spell card you can use this slot for any look-LEARN action Even if you do not roll the matching icon a lesson’s LEARN action until level 5 unlocks the next level lesson in that school of magic."]
    }, {
        id: "locations",
        title: "Location Cards",
        content: ["Your location card represents your current position on the planet and it includes what you can see and many of your action options Keep it in your location card holder.", "Specific numbers in the descriptions below are examples referring to the sample location below.", "Art background This is your vantage You may describe this view to the other players but not show it to them as they are elsewhere on the planet and can’t see through your eyes Location number upper left Provide this number to the other players when you interact with this location so they can find the corresponding entry 272 in a storybook Compass upper right This symbol shows the 4 different cardinal directions to which you can depart from this location forward is always north The compass may include Adjacent listed locations e.g 500 273 and 271 Departing to any of these locations is a 1-cost move action without a storybook entry Unlisted adjacent locations After choosing to depart in the direction of a location the cost is revealed in the Depart storybook for this location number e.g 272 move south Blocked locations If there is no number or you cannot depart from this location in that direction Description Brief text about the location You may read this to other players Some locations show the icon in the bottom left followed by text in quotation marks This means that the mysterious Traveler is talking to you at this location A icon indicates a mandatory instruction that must be followed immediately upon arrival typically a climate-related penalty Elemental icons e.g indicate an interaction with something of that composition Location Actions almost always the right sidebar You may read these to other players These are the different ways you can interact with the location within the categories of move look engage help take and overpower (e.g look-STUDY Unless an action result indicates otherwise you may only perform 1 location action per location"]
    }, {
        id: "location-card-holders",
        title: "Location card holders",
        content: ["Since your location represents your vantage what you can see only you may look at your current location card Place it in a location card holder to keep it upright and easily visible—angled so other players can’t see it."]
    }, {
        id: "obstacles",
        title: "Obstacles",
        content: ["The description of some actions include variations on the conditional statement if the ____ is no longer an obstacle reduce this cost to 1 typically in regards to moving north past a creature in your way Apply this at your discretion using the Universal Rule of Thematic Fun For example if you talked to a sentient at a location you may not sneak past them using a SNEAK past the sentient action since they already know you’re there."]
    }, {
        id: "orbs",
        title: "Orbs",
        content: ["The world contains a number of large glass orbs that act as wayfinders for travelers Vantage is not an app-driven game but one type of orb interaction involves going to a website to view and post hints to other players around the world about the surrounding area It will not work if you enter a location without an orb This feature was inspired by Elden Ring thanks to Jose Manuel López-Cepero for creating the website orb.stonemaiergames.com The website is not necessary to play Vantage as there is nothing gameplay related gained or lost in the app."]
    }, {
        id: "penalties",
        title: "Penalties",
        content: ["Turn step 6 Suffer penalties from rolled-but-unplaced challenge dice", "Resolve dice that couldn’t be placed in card slots then discard them to the penalty section of the center.", "These symbols represent the loss of time morale and health respectively If you can’t place these dice on cards discard them to the penalty section of the center and lose the time morale and/or health shown on those dice by adjusting the appropriate tracker These losses are applied simultaneously If any of these stats is ever reduced to 0 read the mission’s entry in the take storybook This symbol represents a setback If you don’t place dice with this symbol return them to the challenge dice pool this delays the potential for a full refresh when all dice are returned to the pool from cards in grids and the penalty section This symbol represents a blank result this is good Discard this die to the penalty section of the center"]
    }, {
        id: "puzzles",
        title: "Puzzles",
        content: ["To earn many of the world’s artifacts and emblems you must solve a specific puzzle You are ultimately responsible for declaring the solution to the puzzle but other players may see the puzzle if you ask for their assistance A few puzzles require tokens of different colors for which we recommend using skill tokens If you ever encounter a puzzle and would like an alternative way to earn the benefit perform a matching 9-cost action instead e.g look-9-SOLVE", "Thanks to Juliana Moreno and Ariel Rubin The Wild Optimists for designing many of these puzzles!"]
    }, {
        id: "reminders",
        title: "Friendly Reminders",
        content: ["You may always talk openly with other players and share the text of any card but you may never show your location to anyone else unless a card specifically says to do so nor may you look at any location you are not currently on When you depart to an adjacent listed location it is a move action with a cost of 1 Proceed with all steps to complete a 1-cost move action just like any action this movement is your entire turn When placing challenge dice unless specified by a challenge dice slot you can even place blank and setback results For example if you roll 1 challenge die to move to an adjacent listed location and the result is blank you could place it on a general move slot on a card in your grid to gain a boost bonus even though there is no penalty for not placing it Instead of choosing a location action on your turn you may perform an action on a card in your grid your supply or the center If you do view the entry for that action using the number at the bottom of the card To use a card’s boost power spend boost from that specific card If you gain a boost from a location action place it on your character You can only perform 1 location action per location per game unless an action instructs you otherwise or if the card specifies that the second action you take is always available e.g you cannot perform the take action on a location and then later perform the overpower action there Other than this restriction you have complete freedom to choose your actions You cannot read the cost or results of an action before performing it Likewise some action results include more choices you can read the choices while selecting but not the results The only persistent element in Vantage from game to game is information Everything you learn about the world can benefit you in future games and we encourage players to use that knowledge to their advantage Please respect other players desire to avoid or learn what you already know For a comprehensive list of ways to make Vantage easier or harder see Difficulty on page 11 of the Book of Secrets"]
    }, {
        id: "resources",
        title: "Resources",
        content: ["Watch it Played rules video How to Teach Vantage video from the designer Jamey Stegmaier Join the discussion about Vantage via the Facebook Group or on Board Game Geek The Vantage section on the Stonemaier Games website has an overview of the game news updates and links to even more resources"]
    }, {
        id: "results",
        title: "Action Results",
        content: ["Turn step 7 Read the action result", "Most actions result in an immediate benefit described in the storybook or on the card for some card actions", "In multi-option lists make a choice before learning or viewing the outcome e.g if you choose to move to location 259 you only look at that card after making the decision If your location changes as a result the player in charge of managing the cards will use your placeholder card to return your current location card to the box find and give you the new card and mark the new card’s position In the rare case that you move onto a location on either side of someone else’s location card simply pass it back and forth If a location’s (upon arrival effect—or any other penalty—instructs you to suffer 1 heat cold or hypoxia damage lose your choice of either 1 or both 1 and 1 If you would ever gain when that stat is already at the max of 6 instead gain 1 random skill roll a skill die and gain a skill token matching the result Skills If the results include a skill payment e.g pay 1 move or 1 overpower any player may discard a skill token so that you can gain the benefit If no one pays you do not gain the benefit If the results include a skill benefit e.g gain 1 move or 1 engage gain a skill token of that kind If the results instruct you to gain a random skill roll a skill die to determine the token to gain Sometimes the benefit is a specific skill e.g Roll 2 skill dice and gain all move results If another player is on your location during this step you may depart/move them with you simultaneously with permission they don’t pay the cost and give them coins items flora and vehicles ignore when placed effects on exchanged cards the exchanged cards retain all challenge dice but lose all boost If an action result or any consequence causes you to lose something that you don’t have e.g lose when you have no money lose a card in reserve when you have no cards in reserve etc ignore those instructions This rule only applies to results not costs—if you can’t pay a listed cost you may not gain the benefit", "If you would ever gain a card you already have in your grid instead gain 1 boost on the card if possible", "If you would ever gain a card another player already has the two players decide who keeps/gains it If the card goes to you any challenge dice on the card are refreshed and any boost are lost and you gain when placed benefits on the card if any If the card remains with the other player you instead gain 1 boost on your character if possible"]
    }, {
        id: "runes",
        title: "Runes",
        content: ["There are runes found throughout the world that match the icons of the 6 skills and some actions will ask you to look for specific runes on your current location The color of the runes is not important some are well hidden as a result nor is their mirroring only the shape matters.", "Move Look Engage Help Take Overpower"]
    }, {
        id: "sample-turn",
        title: "Sample Turn",
        content: ["This is a brief overview of a sample turn and each of the steps described here are explained in detail elsewhere.", "Choose one action from the three types of actions I’m at location 272 and decide to perform a location action I read my location’s description aloud and describe what I see The area does not look dangerous so I commit to performing the move-WANDER action I cannot change my mind after proceeding to the next step Read the cost and action not the result Another player finds entry 272 in the move storybook and reads the cost 3 and the action “WANDER around the mysterious area They do not read the action result Reduce the cost by 1 per matching skill optionally paid by any player I do not have a move skill token but another player does They discard 1 move skill token to reduce the cost by 1 Roll dice from the challenge dice pool equal to the remaining cost I roll 2 challenge dice resulting in 1 time and 1 health I have to deal with thematically the action took more time than expected and I hurt myself doing it Place rolled challenge dice one at a time on grid cards any slots on your cards and impact slots on other players cards My character the captain has both challenge dice slots open I am performing a move action so I can place any die on the move slot—I choose the time die for this—and gain 1 boost as the immediate output placing a cube on my character I only have my character card in my grid and no other player has an open impact slot for health results so I cannot place the health result Suffer penalties from rolled-but-unplaced challenge dice The unplaced die showing health goes to the penalty section of the center and I lose 1 health adjusting my tracker The time die remains on the character card Read the action result Another player reads the result for entry 272 in the move storybook End your turn The action result did not say continue so my turn ends here If the action had said to continue I’d be required to perform another action if it had said “You may continue it’s my choice to perform another action or not This only applies to my current turn I may not continue at this location on a future turn unless another action allows me to do so The player to my left takes the next turn"]
    }, {
        id: "seeds-and-trees",
        title: "Seeds and Trees",
        content: ["Seeds are grid cards though you cannot gain boost on them until you choose a specific location where they will grow a location you are on From then on it is a matter of time until the seed grows into a tree Trees are horizontal cards kept in your supply on the location where they were grown To remember a tree’s location place the tree card on top of its location card we recommend leaving this location on the table rather than returning it to the box when a player departs"]
    }, {
        id: "sentients",
        title: "Sentients",
        content: ["The world of Vantage is populated by a diverse array of sentients the people of this world Sometimes you will see them and interact with them but they’re also actively walking around and living their lives—they’re all around you Many people on this planet will join you for a limited time with the temporary nature of their companionship indicated by the number of boost on the sentient card if a sentient ever has 0 boost lose them at the end of the action unless they regain boost during the action Each sentient has a challenge dice slot that costs a boost from the sentient to use a challenge dice slot related to an ability in which they are an expert and an impact challenge dice slot to be used in interactions with anything sharing the same composition including the actions printed on the sentient itself Unless an action states otherwise there is no limit to the number of times you can perform each action on the sentient."]
    }, {
        id: "setup",
        title: "Setup",
        content: ["Place the game box on the table next to a player in charge of finding and returning cards they gain placeholder cards 1709–1714 this is more efficient than passing the box around the table Tilt the three big stacks of large cards out of their flat-packed position Place the board the center in the middle of the table with time morale and health trackers nearby Both sides of the board are functionally the same Place all skill tokens coins boost tokens cubes skill dice and the storybooks in a general supply near the game board the center The backs of most storybooks have reference guides Seed the challenge dice pool with 8 challenge dice plus 2 per player e.g for three players there are 14 dice then return the remaining challenge dice to the box Each player gains a location card holder Randomly select someone to be the first player Place the Book of Vantages on the table with the back cover facing up to display location 000 Follow the instructions on location 000 to complete setup using skill dice for randomization It is here that each player will independently gain their character and starting stats For your first game we recommend the daring starting level for time morale and health and avoid difficult crash locations"]
    }, {
        id: "shared-info",
        title: "Sharing Information",
        content: ["Since your location represents your vantage what you can see only you may look at your current location card.", "You may not look at any of your previous locations or the locations seen by other players You may describe the card’s artwork to other players read the description aloud to them and share the location action options If you are directed to look at a page in the Book of Vantages you may look at only that page and you may not show it to other players Tokens dice cards in each player’s grid reserve and supply and cards you are instructed to place on the table are public information"]
    }, {
        id: "skill-tokens",
        title: "Skill Tokens",
        content: ["Skill tokens are benefits players gain at the beginning of the game and in various ways throughout the game including when your time morale health would increase above 6 They represent bits of knowledge for the various action categories move/depart look engage help take and overpower", "Whenever you have the opportunity to pay a skill any player can pay it Skills are often paid to decrease the cost of an action—whether you are performing the action or another player—but some action results also offer the option to pay skills to gain additional benefits and some upon arrival penalties ask you to pay certain skills.", "Whenever you gain a random skill roll a skill die and gain a skill token matching the result."]
    }, {
        id: "skills",
        title: "Skills",
        content: ["Turn step 3 Reduce action cost by 1 per matching skill optionally paid by any player", "Using skill tokens to reduce the cost will decrease the potential to lose time morale and health due to unplaced challenge dice.", "Skills tokens represent insights and advice Players may pay skills to benefit each other at any time not just to reduce action costs Discard paid skill tokens to the general supply You are limited to the tokens provided"]
    }, {
        id: "skirm",
        title: "Skirm",
        content: ["Skirm is a card and dice dueling game played by many sentients of the world Instructions for how to play Skirm are found on card 798 and there are 12 default Skirm cards used by sentients and you if you have not earned a card from the spoiler pack The design of the spoiler pack is to make it authentic to this fictional planet All Skirm cards you collect in a Vantage session take up 1 total reserve capacity they cannot be placed in your grid return all non-default Skirm cards to the spoiler pack at end of game."]
    }, {
        id: "skirm-quick",
        title: "Skirm: Quick Variant",
        content: ["Setup", "Ignore card 798 If this is your first Skirm duel gain destiny 1603 From the spoiler pack gain 1 random card", "Roll skill dice", "Roll 6 skill dice for yourself Roll 6 skill dice for the sentient", "Choose cards", "Choose 1 of your Skirm cards to play for yourself Choose 1 random Skirm card from the pack for the sentient or a specific card if indicated in the action", "Resolution", "You are trying to have more dice matching the icons on your card versus the opponent’s dice matching the icons on their card ignore all text If your card has the higher speed upper left number you may reroll all your dice once If your card has the lower speed you break ties when comparing the dice", "Outcome", "If you win Gain 2 Win lose or tie Keep the card you gained in your reserve your entire Skirm collection counts as only 1 reserved card"]
    }, {
        id: "slots",
        title: "Card Slots",
        content: ["Turn step 5 Place rolled challenge dice one at a time on your grid cards and impact slots on any players grid cards)", "By placing a die on an open slot you avoid suffering its penalty.", "Each slot can hold at most 1 die Most slots have restrictions on which types of challenge dice can be placed Click on the examples below to see more details Skill type e.g you may only place a challenge die here during a move action Ability e.g you may only place a challenge die here during a help-CREATE action Important If you have dice slots or powers related to abilities pay close attention when moving to a new location especially if someone else is reading the storybook to you Interaction e.g you may only place a challenge die on this slot during an action involving a sinew creature This includes location actions and card actions showing this icon plus interactive depart actions e.g Sneak past the creature Many slots have a or indicating that only a die showing that specific result may be placed there For any slot without a specific die face any result may be placed even Impact dice slots may be used by any player with your permission even if they are at a different location They represent expertise and personality e.g a character with a morale impact slot is someone with a positive attitude and leadership qualities If another player places a challenge die on your impact dice slot and there is a bonus e.g a boost you gain it To place a challenge die on a terrain-specific dice slot e.g underwater identified visually from the art your current location must match that terrain Some slots have costs to place a challenge die arrow pointing towards the slot you must pay the boost 1 or 2 as indicated from the same card Some slots provide immediate bonuses when you place a challenge die on them arrow pointing away from the slot place the gained boost on the same card While the bonus is typically a boost other bonuses are also possible a skill a specific card etc", "If another player is at your location you may place challenge dice on open slots on their cards even non-impact slots with their permission If another player has a location-specific card in their supply and you are on that card’s location you may perform actions on that card Whenever a challenge die is placed on a slot it remains there until all challenge dice are refreshed"]
    }, {
        id: "spells",
        title: "Spells",
        content: ["When you place a spell in your grid gain a boost on each card in the column of the spell including the spell card itself Most spells have an impact challenge dice slot and a powerful impact boost power."]
    }, {
        id: "spoilers",
        title: "Spoilers",
        content: ["Like the glossary in the Book of Secrets this resource includes entries for many terms you may discover while playing Vantage We highly recommend only reading a spoiler entry if you have questions and only after encountering a specific type of card or a specific term For example the first time you see a Lesson card you may look up Lessons", "Spoiler entries can be found in the Index Search You can also choose to include them on the main screen in settings."]
    }, {
        id: "spoiler-pack",
        title: "Spoiler pack of cards",
        content: ["Will you earn the contents of this mysterious pack of cards as you explore the planet Follow your boldest gaming instincts to find out!"]
    }, {
        id: "story-lookup",
        title: "Storybook Lookup",
        content: ["1 2 3 4 5 6 7 8 9 0"]
    }, {
        id: "storybooks",
        title: "Storybooks",
        content: ["On most turns in the game short passages of text in a storybook are referenced Early in your turn you will read the cost and the action in bold then later in your turn you will read the result unbold text We recommend that players share the responsibility of reading aloud with another player reading on your turn so you can focus on the mechanisms of performing an action.", "There are 9 books 1 storybook for each of the skills 1 for depart actions the Book of Secrets and the Book of Vantages The reason for separate storybooks instead of one giant book is to help players avoid spoiling other actions on the same location as each action has different costs and results Separate storybooks also discourage players from making a choice and then changing it after seeing the other options which is against the rules and the spirit of the game—you will need to use your eyes and the shared knowledge of all players to intuit the nature and difficulty of an action before performing it"]
    }, {
        id: "structures",
        title: "Structures",
        content: ["Structures are horizontal cards kept in your supply You any player not just the player who created the structure may only perform actions on the structure when you are on its location of origin which you can remember by placing the structure card on top of its location card we recommend leaving this location on the table rather than returning it to the box when a player departs Unless an action states otherwise there is no limit to the number of times you can perform each structure action."]
    }, {
        id: "terrain",
        title: "Terrain",
        content: ["There are various types of locations in Vantage the default of which is a land location outside on the surface of the planet Some cards may refer to a specific terrain.", `Cities City locations are vertical cards labeled with the name of the city or town village etc—they're all cities The various horizontal locations in the capital are not city locations Within each city are a variety of businesses you can explore each tagged with action icons these do not count as runes for other actions you will need to intuit the nature of each business from the art and other context clues Each city location includes special instructions on the card "You may perform multiple different actions here 1/turn This is an exception to the typical rule of one total location action per location Please note the word different you may not choose the same action twice`, "Interiors If you gain access to the interior of a building you have limited time to interact with the location before you must leave Different features within the interior are tagged with action icons these do not count as runes for other actions allowing you to focus on the item that catches your eye When you exit an interior you will frequently find yourself back on on the previous location e.g you’ll go from location 123 to interior 550 and back to location 123 so for ease of play you can set the location temporarily off to the side while you’re inside", "Ocean The surface of the ocean is an ever-changing landscape—you are at the whim of the tides You may repeat actions on ocean locations i.e you may perform a location action on an ocean location even if you have already performed a location action at that location on a previous turn Ocean locations also offer the option of diving underwater if you originally surfaced from an underwater location the currents may have shifted your location There are no preset adjacent ocean locations to which you can move", "Sky There are a few vehicles and items that allow you to fly above the planet referencing your current region found in the look storybook and the Book of Vantages enjoying a bird’s-eye view of the land below Thematically you cannot use these vehicles and items if you are not outside Given the thin atmosphere you suffer 1 hypoxia damage whenever you arrive at a sky location When you are on a sky location you can fly in each cardinal direction or you can steer back down to the planet either aiming roughly at one of the quadrants on the sky location or—if your previous action was to fly up to the sky location—landing back on your previous location You may perform the same move-STEER action on the same sky location on different turns if you find yourself there again", "Underground Cavern Barriers Caves Dungeons Cavern Barriers These underground entrances to caves present a barrier in your path There are 6 different types of cavern barriers each with a different action associated with proceeding deeper If you find yourself on the same cavern barrier location multiple times in the same game you are always allowed to perform the action required to proceed deeper whether or not you have previously performed it Caves These underground locations have the standard 6 location action choices and a way to travel deeper into the planet Dungeons Dungeons are underground locations that connect to several caves Each dungeon presents an obstacle to overcome some of which strike first when you arrive Dungeons offer the option to exit to the location from which you originally entered the dungeon even if you have since traversed through several dungeon locations You may repeat actions on dungeon locations i.e you may perform a location action in a dungeon even if you took a location action there on a previous turn", "Underwater There are some underwater locations where due to the lack of oxygen you suffer 1 hypoxia damage whenever you arrive The cost to depart to an adjacent listed location while you are underwater is move SWIM just like walking to an adjacent listed location on land Most underwater locations include an always-available move-SURFACE action if you need to catch your breath", "Water There are many locations that feature streams rivers ponds lakes and oceans Some cards have special benefits if you are on water or if there is water nearby There is no symbol to indicate this on locations it’s simply a matter of whether or not you can see a body of water on your current location If you are underwater or in the sky you are not on water"]
    }, {
        id: "tokens",
        title: "Tokens",
        content: ["Vantage includes boost tokens cubes and skill tokens cardboard Cubes are sometimes used as counters other than boost e.g on goal cards or as defined on certain puzzles."]
    }, {
        id: "trackers",
        title: "Trackers",
        content: ["Use these to track your character’s time morale and health on the center gameboard.", "If any player’s is reduced to 0 read the mission’s entry in the take storybook If you would increase or above 6 instead gain 1 random skill"]
    }, {
        id: "traveler",
        title: "Traveler",
        content: ["The mysterious Traveler sent the signal that brought you to this planet The Traveler appears on many locations indicated by a specific icon and text between quotation marks they are talking to you"]
    }, {
        id: "trials",
        title: "Trials",
        content: ["Each of the world’s cultures has an initiation trial for their people and anyone who wants to be welcomed among them Each trial location has a specific action—an important action to its corresponding sentients—that you may perform after you have been formally welcomed to participate in the trial via one of the other actions The trials themselves are puzzles that a player may attempt once per game If a player fails at a trial another player can try it later in the same game."]
    }, {
        id: "turns",
        title: "Turns",
        content: ["Expanded Brief", "Choose one action You will always succeed when performing an action the challenge is to avoid losing time morale and health Location action Each location lists several options often 6 total If you previously performed a location action here you cannot perform another Card action Many non-location cards include action options These include actions on cards in your grid your supply or the center Depart action Move away from your location in 1 of 4 cardinal directions to another location If the depart action you chose is to go to an adjacent listed location i.e the number is on the compass there is no description and the cost is 1 Read the cost and action not the result A player finds the entry for the card number in the skill-specific storybook then reads only the cost and the bolded text For any action with cost X choose a number from 1–6 Reduce the cost by 1 per matching skill optionally paid by any player Skills represent insights and advice Example If the cost of a look action is 2 but you or another player pay a skill token the cost is reduced to 1 Roll dice from the challenge pool equal to the remaining cost If there are not enough available dice first refresh all challenge dice from the center and cards in grids Place rolled dice on slots in your card grid slots in any grid Most slots have a category to indicate whether a challenge die can be placed there depending on the skill type ability composition dice face etc Impact slots and powers can benefit any player Suffer penalties from rolled-but-unplaced challenge dice Lose time morale and health and/or place these dice and blank dice in the penalty section of the center Refresh setbacks to the challenge dice pool Read the action result The storybook will describe the consequences and benefits of the action for a depart action to an adjacent listed location just find that location card In multi-option lists make a choice before learning or viewing the benefit Did the result say to continue YES You must perform another action any type Ignore the location action restriction If the result says “You may continue it is your choice NO End your turn"]
    }, {
        id: "urtf",
        title: "Universal Rule of Thematic Fun",
        content: ["If you are ever in doubt about a Vantage rule card ability or anything else choose the most fun answer that makes sense thematically.", "We are always happy to help in real time or after your game if you post your question aided by details about the situation including exact text when available in the Vantage Facebook group on BoardGameGeek on the Vantage FAQ page on our website or on the Stonemaier Games Discord server."]
    }, {
        id: "vehicles",
        title: "Vehicles",
        content: ["Vehicle cards assist you with travel Some vehicles have special benefits related to a location’s terrain Many vehicles have move-RIDE actions that instruct you to use a guide in the Book of Vantages to find a specific location card Almost all vehicles feature a help-UPGRADE action requiring a boost from the current vehicle to replace it with a better vehicle."]
    }],
    F = document.title,
    H = class H extends HTMLElement {
        constructor() {
            super(), this.attachShadow({
                mode: "open"
            }), this.close = this.close.bind(this), this.clickCloseHandler = this.clickCloseHandler.bind(this), this.toggleFromHashChange = this.toggleFromHashChange.bind(this), this.loadDynamicContent = this.loadDynamicContent.bind(this), this._shareUrl = this._shareUrl.bind(this), this.addShareUrlOnClickEvent = this.addShareUrlOnClickEvent.bind(this), this.removeShareUrlOnClickEvent = this.removeShareUrlOnClickEvent.bind(this), this._watchEscape = this._watchEscape.bind(this), this._bodyHasScrollbar = this._bodyHasScrollbar.bind(this), this.currentScrollTop = 0, this._wasFocused = null, this.shareUrlOnClickEvent = null, this.dontClearHash = !1, this._mousedownTarget = null
        }
        connectedCallback() {
            this.render(), window.addEventListener("hashchange", this.toggleFromHashChange), this.toggleFromHashChange()
        }
        disconnectedCallback() {
            window.removeEventListener("hashchange", this.toggleFromHashChange)
        }
        get template() {
            return this.getAttribute("template")
        }
        set template(e) {
            e ? this.setAttribute("template", e) : this.removeAttribute("template"), this.render()
        }
        get open() {
            return this.hasAttribute("open")
        }
        set open(e) {
            this.open !== e && (this.setAttribute("aria-hidden", (!e).toString()), e ? this._handleOpen() : this._handleClose())
        }
        updateTitle() {
            const e = this.getAttribute("data-title"),
                o = this.querySelector('h2[slot="header"]');
            this.getAttribute("id") === "about" || e === null && o === null ? document.title = F : e === null && o ? document.title = `${o.textContent} | ${F}` : e && (document.title = `${e} | ${F}`)
        }
        async loadDynamicContent() {
            const e = this.getAttribute("data-partials"),
                o = this.getAttribute("data-dynamic"),
                a = window.location.hash.slice(1).split("/").pop() || "";
            if (e) {
                const n = `${e}/${a}.html`;
                return this.loadPartial(n, this)
            }
            if (o) {
                const n = H.dynamicContentMap[o];
                if (n) {
                    const r = await n(a);
                    this.innerHTML = r
                }
            }
            return Promise.resolve()
        }
        async loadPartial(e, o) {
            const a = await (await fetch(e)).text();
            o.innerHTML = a
        }
        close() {
            this.open && (this.open = !1), this.dispatchEvent(new CustomEvent("modal-closed")), this.dontClearHash || this._clearHash(), (this.hasAttribute("data-partials") || this.hasAttribute("data-dynamic")) && (this.innerHTML = ""), this.removeShareUrlOnClickEvent(), document.documentElement.scrollTop = this.currentScrollTop
        }
        async _handleOpen() {
            var i, a;
            await this.loadDynamicContent(), this.addShareUrlOnClickEvent(), this.updateTitle(), this.currentScrollTop = document.documentElement.scrollTop, this._wasFocused = document.activeElement, this.setAttribute("open", ""), document.addEventListener("keydown", this._watchEscape);
            const e = (i = this.shadowRoot) == null ? void 0 : i.querySelector('[part="closer"]'),
                o = (a = this.shadowRoot) == null ? void 0 : a.querySelector(".flex-container");
            if (e == null || e.addEventListener("mousedown", this.clickCloseHandler), e == null || e.addEventListener("mouseup", this.clickCloseHandler), o == null || o.addEventListener("mousedown", this.clickCloseHandler), o == null || o.addEventListener("mouseup", this.clickCloseHandler), e == null || e.focus(), this._bodyHasScrollbar() && (document.body.style.marginRight = `${window.innerWidth-document.body.clientWidth}px`), document.body.style.overflow = "hidden", this.dispatchEvent(new CustomEvent("modal-open")), window._paq) {
                let n = document.title;
                const r = ` | ${F}`;
                n.endsWith(r) && (n = n.slice(0, -r.length));
                const s = "/" + window.location.hash.slice(1);
                window._paq.push(["setCustomUrl", s]), window._paq.push(["setDocumentTitle", n]), window._paq.push(["trackPageView"])
            }
        }
        _handleClose() {
            var i, a;
            this.removeAttribute("open"), document.removeEventListener("keydown", this._watchEscape);
            const e = (i = this.shadowRoot) == null ? void 0 : i.querySelector('[part="closer"]'),
                o = (a = this.shadowRoot) == null ? void 0 : a.querySelector(".flex-container");
            e == null || e.removeEventListener("mousedown", this.clickCloseHandler), e == null || e.removeEventListener("mouseup", this.clickCloseHandler), o == null || o.removeEventListener("mousedown", this.clickCloseHandler), o == null || o.removeEventListener("mouseup", this.clickCloseHandler), this.close(), document.body.style.marginRight = "", document.body.style.overflow = ""
        }
        _clearHash() {
            window.location.hash = "", window.location.replace("#"), typeof window.history.replaceState == "function" && history.replaceState({}, "", window.location.href.slice(0, -1)), document.title = F
        }
        _shareUrl(e) {
            var n;
            const o = this.querySelector('h2[slot="header"]');
            if (!o || ((n = e.target) == null ? void 0 : n.closest("*[data-no-link-copy]"))) return;
            const a = window.location.href;
            if (navigator.share) {
                const l = {
                    title: `${o.parentNode.getAttribute("title")??o.textContent} | ${F}`,
                    url: a
                };
                navigator.share(l)
            } else {
                navigator.clipboard.writeText(a).catch(console.error);
                const r = document.querySelector("#url-copied");
                if (r) {
                    r.classList.add("animation-active");
                    const s = () => {
                        r.removeEventListener("animationend", s), r.classList.remove("animation-active")
                    };
                    r.addEventListener("animationend", s)
                }
            }
        }
        addShareUrlOnClickEvent() {
            const e = this.querySelector('h2[slot="header"]');
            e && (this.shareUrlOnClickEvent || (this.shareUrlOnClickEvent = o => this._shareUrl(o)), e.addEventListener("click", this.shareUrlOnClickEvent))
        }
        removeShareUrlOnClickEvent() {
            const e = this.querySelector('h2[slot="header"]');
            !e || !this.shareUrlOnClickEvent || e.removeEventListener("click", this.shareUrlOnClickEvent)
        }
        toggleFromHashChange() {
            this.dontClearHash = !0, window.location.hash.slice(1).split("/")[0] === this.getAttribute("id") ? this.open === !0 ? this.loadDynamicContent() : this.open = !0 : this.open === !0 && (this.open = !1), this.dontClearHash = !1
        }
        _watchEscape(e) {
            e.key === "Escape" && this.close()
        }
        _bodyHasScrollbar() {
            const e = this.ownerDocument.body;
            return {
                vertical: e.scrollHeight > e.clientHeight,
                horizontal: e.scrollWidth > e.clientWidth
            }
        }
        clickCloseHandler(e) {
            var r, s, l;
            const o = (r = this.shadowRoot) == null ? void 0 : r.querySelector(".flex-container"),
                i = (s = this.shadowRoot) == null ? void 0 : s.querySelector('[part="dialog"]'),
                a = (l = this.shadowRoot) == null ? void 0 : l.querySelector('[part="closer"]');
            let n = e.target;
            if (a != null && a.contains(n) ? n = a : i != null && i.contains(n) ? n = i : o != null && o.contains(n) && (n = o), e.type === "mousedown") {
                this._mousedownTarget = n;
                return
            }
            if (e.type === "mouseup") {
                const c = this._mousedownTarget;
                if (this._mousedownTarget = null, c !== n) return;
                (a === n || o === n) && this.close()
            }
        }
        render() {
            const {
                shadowRoot: e,
                template: o
            } = this, i = document.getElementById(o);
            if (i) {
                const n = document.importNode(i.content, !0);
                e.appendChild(n)
            } else e.innerHTML = `<style>
				:host {
					--closer-x-clr: black;
					--closer-x-hvr-clr: white;
					display: none;
					position: fixed;
					top: 0;
					right: 0;
					bottom: 0;
					left: 0;
					z-index: 10000;
					overflow-x: hidden;
					overflow-y: auto;
					background-color: hsl(0 0% 0% / 0.3);
					-webkit-backdrop-filter: blur(4px);
					backdrop-filter: blur(4px);
				}
				:host([open]) {
					display: block;
				}
				.flex-container {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					min-height: 100vh;
					padding: 0 10px;
					position: relative;
				}
				[part='dialog'] {
					position: relative;
					display: flex;
					flex-direction: column;
					justify-content: center;
					background-color: white;
					margin: 2rem auto 3rem;
					border-radius: 3px;
					min-height: 100px;
					min-width: 200px;
					max-width: 600px;
					box-shadow: 0 0 2rem hsl(0 0% 0% / 0.1);
					overflow: hidden;
					text-overflow: ellipsis;
				}
				@media (max-width: 600px) {
					[part='dialog'] {
						max-width: 100%;
						min-width: 0;
					}
				}
				[part='closer'] {
					position: absolute;
					top: 0;
					right: 0;
					height: 20px;
					width: 20px;
					border-radius: 50%;
					border: 5px solid transparent;
					display: flex;
					cursor: pointer;
					background-clip: padding-box;
				}
				[part='closer']:hover {
					background-color: dodgerblue;
				}
				[part='closer'] svg {
					width: 50%;
					height: auto;
					margin: auto;
				}
				[part='closer'] path {
					fill: var(--closer-x-clr);
				}
				[part='closer']:hover path {
					fill: var(--closer-x-hvr-clr);
				}
				slot[filled] {
					display: block;
				}
				[part='header'] {
					padding: 0 30px 0 1rem;
					background-color: hsl(0 0% 0% / 0.05);
				}
				[part='main'] {
					padding: 1rem 1rem 0;
				}
				[part='footer'] {
					border-top: 1px solid hsl(0 0% 0% / 0.05);
					padding: 0 1rem;
				}
			</style>
			<div class='flex-container'>
				<div part='dialog'>
					<div part='closer'>
						<svg viewBox='0 0 50 50'><path d='M0 43.06L18.06 25 .06 7l6.99-7 18 18L43 .06 49.88 7 32 24.94l18.01 18-7 7-18-18L6.93 50 0 43.06z'/></svg>
					</div>
					<slot name='header' part='header'></slot>
					<slot part='main'>No dialog content</slot>
					<slot name='footer' part='footer'></slot>
				</div>
			</div>`;
            e.querySelectorAll("slot").forEach(function(n) {
                n.addEventListener("slotchange", function(r) {
                    const s = r.target;
                    let l, c, h;
                    for (s.assignedElements().length > 0 ? s.setAttribute("filled", "") : s.removeAttribute("filled"), l = s.getAttribute("name"), h = s.parentElement; h;) {
                        if (!h.hasAttribute("filled-slots")) {
                            h = h.parentElement;
                            continue
                        }
                        c = h.getAttribute("filled-slots").split(" "), c.push(l), c = c.filter(function(d, u, p) {
                            return p.indexOf(d) === u
                        }), h.setAttribute("filled-slots", c.join(" ").trim()), h = h.parentElement
                    }
                })
            })
        }
    };
le(H, "dynamicContentMap");
let P = H;

function xt(t, e) {
    return P.dynamicContentMap = e, t.customElements.define("rp-modal", P), P
}

function Lt(t, e) {
    return Math.floor(Math.random() * (e - t + 1) + t)
}

function Mt(t) {
    let e = t;
    for (; e && e.nodeType === Node.ELEMENT_NODE;) {
        if (e.matches("*[data-display-target]")) return e;
        e = e.parentNode
    }
    return null
}

function Bt(t, e) {
    const o = Mt(e);
    if (o) {
        const i = o.getAttribute("data-display-target");
        if (i) {
            const a = t.querySelectorAll(i),
                n = e.tagName.toLowerCase() === "option" ? e.parentNode.getAttribute("name") : e.getAttribute("name"),
                r = e.value,
                s = t.getElementsByName(n);
            let l;
            if (r === "random") {
                const c = Array.from(s).filter(d => d.value !== "random"),
                    h = Lt(0, c.length - 1);
                l = c[h].value
            } else l = r;
            if (e.type === "checkbox") {
                e.checked ? (a[0].classList.add(l), a[0].setAttribute(n, l)) : (a[0].classList.remove(l), a[0].removeAttribute(n));
                const c = Array.from(s).filter(h => h.checked).map(h => h.value);
                localStorage.setItem(n, c.join(","))
            } else a.forEach(function(c) {
                let h = c.getAttribute(n),
                    d = [];
                if (h) {
                    const p = h.split(" ");
                    for (const f of p) c.classList.contains(f) ? c.classList.remove(f) : d.push(f);
                    d.length === 0 && c.removeAttribute(n)
                }
                const u = l.split(" ");
                for (const p of u) c.classList.add(p);
                if (d.length > 0 || u.length > 0) {
                    const p = [...u, ...d];
                    c.setAttribute(n, p.join(" "))
                }
            }), localStorage.setItem(n, r)
        }
    }
}

function me(t, e) {
    Bt(t, e)
}

function Dt(t) {
    t.addEventListener("change", function(e) {
        me(t, e.target)
    });
    for (let e = 0; e < localStorage.length; e++) {
        const o = localStorage.key(e),
            i = localStorage.getItem(o),
            a = t.getElementsByName(o);
        if (a.length !== 0)
            if (a[0].type === "radio") {
                for (const n of a)
                    if (n.value === i) {
                        n.checked = !0, n.dispatchEvent(new Event("change", {
                            bubbles: !0
                        }));
                        break
                    }
            } else if (a[0].type === "checkbox") {
            const n = i.split(",");
            for (const r of n)
                for (const s of a)
                    if (s.value === r) {
                        s.checked = !0, s.dispatchEvent(new Event("change", {
                            bubbles: !0
                        }));
                        break
                    }
        } else a[0].tagName.toLowerCase() === "select" && (a[0].value = i, a[0].dispatchEvent(new Event("change", {
            bubbles: !0
        })))
    }
    t.querySelectorAll("*[data-display-target]").forEach(function(e) {
        const o = e.querySelectorAll(':scope input[type="checkbox"],:scope input[type="radio"],:scope option');
        if (o.length === 0) return;
        const i = [];
        for (const a of o)
            if (a.tagName.toLowerCase() === "option") {
                if (a.selected) {
                    i.push(a);
                    break
                }
            } else if (a.checked && (i.push(a), a.type === "radio")) break;
        for (const a of i) me(t, a), a.tagName.toLowerCase() === "option" ? a.selected = !0 : a.checked = !0
    })
}

function Ft(t, e) {
    var o = function() {
        if (!t.localStorage.getItem("firsttime_user") && t.location.hash.slice(1).length === 0 && t.location.protocol !== "file:") {
            var i;
            e.querySelector("#about").open = !0, t.location.hash = "#about", i = new Date, i.setTime(i.getTime() + 7776e6), t.localStorage.setItem("firsttime_user", i.getTime().toString())
        }
    };
    o(), t.addEventListener("hashchange", o, !1)
}

function Rt(t, e) {
    e.getElementById("back-button").addEventListener("click", () => {
        history.back()
    }), e.getElementById("forward-button").addEventListener("click", () => {
        history.forward()
    })
}

function _t(t, e, o) {
    var i = t._paq = t._paq || [];
    window.location.hash || i.push(["trackPageView"]), i.push(["enableLinkTracking"]),
        function() {
            var a = "https://stats.rulepop.com/";
            i.push(["setTrackerUrl", a + "m.php"]), i.push(["setSiteId", o]);
            var n = e,
                r = n.createElement("script"),
                s = n.getElementsByTagName("script")[0];
            r.async = !0, r.src = a + "m.js", s.parentNode.insertBefore(r, s)
        }()
}
const W = {
    ACTIVE_DT: ".disclosure-grid > dt.active",
    MODAL: "rp-modal",
    DT: "dt"
};

function Ot(t) {
    const e = n => {
            var r;
            n && (n.classList.remove("active"), (r = n.parentNode) == null || r.classList.remove("active"))
        },
        o = n => {
            var r;
            n && (n.classList.add("active"), (r = n.parentNode) == null || r.classList.add("active"))
        },
        i = n => {
            let r = n.target.matches(W.DT) ? n.target : n.target.closest(W.DT);
            if (!r) return;
            const s = t.querySelector(W.ACTIVE_DT);
            e(s), s !== r && o(r)
        },
        a = function() {
            const n = this.querySelector(W.ACTIVE_DT);
            e(n)
        };
    try {
        t.body.addEventListener("click", i), Array.from(t.querySelectorAll(W.MODAL)).forEach(r => {
            r.addEventListener("modal-closed", a)
        })
    } catch (n) {
        console.error("Error initializing disclosure grid:", n)
    }
}
class Nt extends HTMLElement {
    constructor() {
        super(), this.attachShadow({
            mode: "open"
        })
    }
    parseAspectRatio(e) {
        if (!e) return "1/1";
        const [o, i] = e.split("/").map(a => parseFloat(a));
        return !o || !i || isNaN(o) || isNaN(i) || i === 0 ? (console.warn(`Invalid aspect-ratio "${e}" for <rp-composite>. Using 1/1 instead.`), "1/1") : e
    }
    connectedCallback() {
        const e = this.parseAspectRatio(this.getAttribute("aspect-ratio"));
        this.shadowRoot.innerHTML = `<style>
			:host {
				display: block;
			}
			slot {
				display: block;
				position: relative;
				aspect-ratio: ${e};
			}
			::slotted(*) {
				position: absolute;
				margin: 0 !important;
			}
		</style>
		<slot></slot>`
    }
}

function Wt() {
    customElements.define("rp-composite", Nt)
}

function Pt(t) {
    t.addEventListener("click", function(o) {
        let i = o.target;
        const a = i.closest(".spoiler.obscured");
        if (a) {
            if (e(i)) {
                o.preventDefault(), o.stopPropagation(), a.classList.remove("obscured");
                return
            }
            a.classList.remove("obscured")
        }
    });

    function e(o) {
        return ["a", "button", "input", "select", "textarea", "label", "summary", '[role="button"]', '[role="link"]', '[role="menuitem"]', "[tabindex]", "[onclick]", "[data-action]"].some(a => o.matches(a))
    }
}

function qt(t) {
    t.querySelectorAll("rp-modal.glossary").forEach(o => {
        const i = Array.from(o.childNodes),
            a = [];
        if (i.forEach(n => {
                n.nodeType === Node.ELEMENT_NODE && !n.hasAttribute("slot") && a.push(n)
            }), a.length > 0) {
            const n = t.createElement("div");
            n.className = "spoiler obscured", a.forEach(r => {
                n.appendChild(r)
            }), o.appendChild(n)
        }
    })
}

function $t(t) {
    if (!("wakeLock" in navigator)) {
        const c = t.querySelector("#wake-lock");
        c && (c.style.display = "none");
        return
    }
    let e = null;

    function o(c) {
        try {
            localStorage.setItem("wake-lock", c)
        } catch (h) {
            console.error("Failed to save wake lock preference:", h)
        }
    }

    function i(c) {
        o(c), c === "on" ? n() : r()
    }
    t.querySelectorAll('input[name="wake-lock"]').forEach(c => {
        c.addEventListener("change", function(h) {
            i(h.target.value)
        })
    }), t.addEventListener("visibilitychange", function() {
        t.visibilityState === "visible" && s() ? n() : t.visibilityState === "hidden" && r()
    });
    async function n() {
        if (!e) try {
            e = await navigator.wakeLock.request("screen"), console.log("Wake lock enabled"), e.addEventListener("release", function() {
                e = null
            })
        } catch (c) {
            console.error("Failed to enable wake lock:", c);
            const h = t.querySelector('input[name="wake-lock"][value="off"]');
            h && (h.checked = !0, h.dispatchEvent(new Event("change", {
                bubbles: !0
            })))
        }
    }

    function r() {
        e && (e.release(), e = null, console.log("Wake lock disabled"))
    }

    function s() {
        const c = t.querySelector('input[name="wake-lock"]:checked');
        return c && c.value === "on"
    }

    function l() {
        try {
            const c = localStorage.getItem("wake-lock");
            if (c) {
                const h = t.querySelector(`input[name="wake-lock"][value="${c}"]`);
                h && (h.checked = !0, h.dispatchEvent(new Event("change", {
                    bubbles: !0
                })))
            } else {
                const h = t.querySelector('input[name="wake-lock"]:checked');
                h && o(h.value)
            }
        } catch (c) {
            console.error("Failed to load wake lock preference:", c)
        }
    }
    l()
}
let R = null,
    K = null;
const Be = "VantageStoriesDB",
    Yt = 1,
    T = "stories",
    ie = "stories-data",
    re = "stories-version";

function z() {
    return new Promise((t, e) => {
        const o = indexedDB.open(Be, Yt);
        o.onerror = () => e(o.error), o.onsuccess = () => t(o.result), o.onupgradeneeded = i => {
            const a = i.target.result;
            a.objectStoreNames.contains(T) || (a.createObjectStore(T, {
                keyPath: "key"
            }), console.log("IndexedDB store created for stories"))
        }
    })
}
async function Vt(t, e) {
    try {
        const a = (await z()).transaction([T], "readwrite").objectStore(T);
        await new Promise((n, r) => {
            const s = a.put({
                key: ie,
                data: t
            });
            s.onsuccess = () => n(), s.onerror = () => r(s.error)
        }), await new Promise((n, r) => {
            const s = a.put({
                key: re,
                data: e
            });
            s.onsuccess = () => n(), s.onerror = () => r(s.error)
        }), console.log("Stories data stored in IndexedDB")
    } catch (o) {
        console.warn("Failed to store stories in IndexedDB:", o)
    }
}
async function jt(t) {
    try {
        const i = (await z()).transaction([T], "readonly").objectStore(T),
            a = await new Promise((r, s) => {
                const l = i.get(re);
                l.onsuccess = () => r(l.result), l.onerror = () => s(l.error)
            });
        if (!a || a.data !== t) return console.log("IndexedDB cache invalid or missing, will reload from source"), null;
        const n = await new Promise((r, s) => {
            const l = i.get(ie);
            l.onsuccess = () => r(l.result), l.onerror = () => s(l.error)
        });
        return n && n.data ? (console.log("Stories data loaded from IndexedDB"), n.data) : null
    } catch (e) {
        return console.warn("Failed to load stories from IndexedDB:", e), null
    }
}

function Ht(t) {
    const e = JSON.stringify(t);
    let o = 0;
    for (let i = 0; i < e.length; i++) {
        const a = e.charCodeAt(i);
        o = (o << 5) - o + a, o = o & o
    }
    return o.toString(36)
}

function zt(t) {
    return Ht(t)
}
async function Ut() {
    try {
        const t = await fetch("/src/data/stories.json");
        if (!t.ok) throw new Error(`HTTP error! status: ${t.status}`);
        return await t.json()
    } catch (t) {
        throw console.error("Failed to load stories via fetch:", t), t
    }
}
async function ge() {
    K || (K = (async () => {
        let e;
        try {
            const a = await ke(() =>
                import ("./stories-DQfSTkkr.js"), []);
            e = a.default || a, console.log("Stories data loaded from source")
        } catch (a) {
            console.warn("Source load failed, trying fetch:", a), e = await Ut()
        }
        const o = zt(e),
            i = await jt(o);
        return i ? e = i : await Vt(e, o), e
    })()), R = await K, console.log(`Story database initialized with ${Object.keys(R).length} entries`)
}

function Gt() {
    if (!R) throw new Error("Story database not initialized. Call setupStoryDatabase() first.");
    return R
}

function Jt(t) {
    return R ? t in R : !1
}
async function Kt() {
    try {
        const o = (await z()).transaction([T], "readwrite").objectStore(T);
        await new Promise((i, a) => {
            const n = o.clear();
            n.onsuccess = () => i(), n.onerror = () => a(n.error)
        }), console.log("Stories cache cleared from IndexedDB")
    } catch (t) {
        console.error("Failed to clear stories cache:", t)
    }
}
async function we() {
    try {
        const o = (await z()).transaction([T], "readonly").objectStore(T),
            i = await new Promise((n, r) => {
                const s = o.get(re);
                s.onsuccess = () => n(s.result), s.onerror = () => r(s.error)
            }),
            a = await new Promise((n, r) => {
                const s = o.get(ie);
                s.onsuccess = () => n(s.result), s.onerror = () => r(s.error)
            });
        return {
            hasCache: !!(a && a.data),
            version: i ? i.data : null,
            entryCount: a && a.data ? Object.keys(a.data).length : 0,
            databaseName: Be,
            storeName: T
        }
    } catch (t) {
        return console.error("Failed to get cache status:", t), {
            hasCache: !1,
            error: t.message
        }
    }
}

function be() {
    return typeof indexedDB < "u"
}
const Qt = 3;

function Xt(t) {
    try {
        const o = Gt()[t];
        if (!o) throw new Error(`Story entry not found: ${t}`);
        const i = t.slice(1).padStart(Qt, "0");
        return o.map(a => {
            const n = o.length > 1 ? a.option : null;
            return {
                number: i,
                option: n,
                direction: a.direction,
                region: a.region,
                cost: a.cost,
                action: a.action,
                result: a.result,
                obscure: a.obscure
            }
        })
    } catch (e) {
        throw e.message.includes("not initialized") ? new Error("Story database is still loading. Please try again in a moment.") : e
    }
}
const De = {
        move: "m",
        look: "l",
        engage: "e",
        help: "h",
        take: "t",
        overpower: "o",
        depart: "d",
        secret: "s"
    },
    ve = De,
    Zt = Object.fromEntries(Object.entries(De).map(([t, e]) => [e, t])),
    eo = 1,
    to = 4;
let q = null;

function oo() {
    const t = document.querySelector('meta[name="viewport"]');
    t && !q && (q = t.getAttribute("content"), t.setAttribute("content", "width=device-width, initial-scale=1, user-scalable=no"))
}

function ao() {
    const t = document.querySelector('meta[name="viewport"]');
    t && q && (t.setAttribute("content", q), q = null)
}

function no(t) {
    const e = t.getElementById("story-lookup");
    if (!e) return;
    const o = e.querySelector(".selected-story"),
        i = e.querySelector('[data-key="submit"]');
    let a = null,
        n = "",
        r = null;

    function s() {
        const h = o.querySelector(".loc-num");
        let d = o.querySelector("svg use");
        if (a)
            if (d) d.setAttribute("href", `#i-${a}`);
            else {
                const m = `<svg viewBox="0 0 500 500"><use href="#i-${a}"/></svg>`;
                o.insertAdjacentHTML("afterbegin", m), d = o.querySelector("svg use")
            }
        else {
            const m = o.querySelector("svg");
            m && m.remove()
        }
        h.textContent = n || "", e.querySelectorAll(".story-numpad li[data-key]").forEach(m => {
            const g = m.getAttribute("data-key");
            /^[0-9]$/.test(g) && (n.length >= 4 ? m.setAttribute("inert", "") : m.removeAttribute("inert"))
        });
        const p = e.querySelector('[data-key="delete"]');
        if (n.length === 0 && !a ? p.setAttribute("inert", "") : p.removeAttribute("inert"), a && n.length >= eo && n.length <= to && /^\d+$/.test(n)) {
            const m = n.replace(/^0+/, "") || "0",
                g = `${ve[a]}${m}`;
            Jt(g) ? (i.removeAttribute("inert"), r = g) : (i.setAttribute("inert", ""), r = null)
        } else i.setAttribute("inert", ""), r = null
    }

    function l(h) {
        h in ve && (a = h, s())
    }

    function c(h) {
        h === "delete" ? n.length > 0 ? (n = n.slice(0, -1), s()) : a && (a = null, s()) : h === "submit" ? r && (window.location.hash = `#story/${r}`) : /^[0-9]$/.test(h) && n.length < 4 && (n += h, s())
    }
    e.addEventListener("click", function(h) {
        const d = h.target.closest(".story-type li");
        if (d) {
            const u = d.getAttribute("data-key");
            l(u)
        }
    }), e.addEventListener("click", function(h) {
        const d = h.target.closest(".story-numpad li");
        if (d) {
            const u = d.getAttribute("data-key");
            c(u)
        }
    }), t.addEventListener("keydown", function(h) {
        if (!e.hasAttribute("open")) return;
        const d = h.key;
        if (/^[dmlhetos]$/i.test(d)) {
            const u = d.toLowerCase();
            l({
                d: "depart",
                m: "move",
                l: "look",
                h: "help",
                e: "engage",
                t: "take",
                o: "overpower",
                s: "secret"
            }[u])
        } else /^[0-9]$/.test(d) ? c(d) : d === "Backspace" || d === "Delete" ? c("delete") : d === "Enter" && c("submit")
    }), e.addEventListener("modal-open", function() {
        a = null, n = "", r = null, s(), oo()
    }), e.addEventListener("modal-closed", function() {
        a = null, n = "", r = null, s(), ao()
    }), s()
}
const Fe = "dynamic-story-content";

function io(t, e) {
    return `
		<h2 slot="header"><svg class="◊" viewBox="0 0 500 500"><use href="#i-${t}"/></svg> ${e}</h2>
	`
}

function ro(t, e) {
    return e ? `
		<fieldset class="story-options">
			<ul>
				${t.map((i,a)=>`<li><label><input name="story" type="radio" value="${i.option}" ${a===0?"checked":""}><span>${i.option}</span></label></li>`).join("")}
			</ul>
		</fieldset>
	` : ""
}

function ae(t, e = !1) {
    const o = t.action != null ? t.action : "",
        i = t.result != null ? t.result : "",
        a = t.cost != null ? t.cost : "",
        n = t.direction != null ? t.direction : "",
        r = t.obscure !== !1,
        s = t.region != null ? `<span class="region">(${t.region})</span>` : "",
        l = a != "" ? `<svg class="◊" viewBox="0 0 500 500"><use href="#i-cost-${String(a).toLowerCase()}"/></svg>` : "";
    let c = "";
    if (n) {
        const d = n.toUpperCase();
        ["N", "E", "S", "W"].includes(d) ? c = `<svg class="◊" viewBox="0 0 500 500"><use href="#i-${{N:"north",E:"east",S:"south",W:"west"}[d]}"/></svg>` : c = `<span class="move">${n}</span>`
    }
    const h = `
		<p class="action">
			${s}
			${c}
			${l}
			${o}
		</p>
	`;
    return e ? r ? `
				<div class="spoiler obscured">
					${h}
				</div>
				<div class="spoiler obscured">
					${i}
				</div>
			` : `
				<div class="spoiler obscured">
					${h}
					${i}
				</div>
			` : r ? `
				${h}
				<div class="spoiler obscured">${i}</div>
			` : `
				${h}
				${i}
			`
}

function so(t) {
    const e = document.getElementById("story");
    if (!e) return;
    const o = () => {
        e.querySelectorAll('input[type="radio"]').forEach(a => {
            a.addEventListener("change", function() {
                if (this.checked) {
                    const n = t.find(r => r.option === this.value);
                    if (n) {
                        const r = ae(n, !0),
                            s = e.querySelector(`#${Fe}`);
                        s && (s.innerHTML = r)
                    }
                }
            })
        }), e.removeEventListener("modal-open", o)
    };
    e.addEventListener("modal-open", o)
}

function co(t) {
    try {
        const e = Xt(t),
            o = e.length > 1,
            i = e[0],
            a = Zt[t.charAt(0)],
            n = i.number,
            r = io(a, n);
        if (!o) {
            const h = ae(i, !1);
            return `
				${r}
				<ul slot="header" class="see-also">
					<li><a href="#story-lookup">Storybook Lookup</a></li>
				</ul>
				${h}
			`
        }
        const s = ro(e, o),
            l = ae(i, !0),
            c = `
			${r}
			<ul slot="header" class="see-also">
				<li><a href="#story-lookup">Storybook Lookup</a></li>
			</ul>
			${s}
			<div id="${Fe}">
				${l}
			</div>
		`;
        return so(e), c
    } catch (e) {
        return console.error("Error building story entry HTML:", e), e.message.includes("not found") ? `<p>Story entry not found: ${t}</p>` : "<p>Error loading story entry.</p>"
    }
}
async function lo(t, e) {
    typeof t < "u" && (t.VantageStories = {
        getCacheStatus: we,
        clearStoriesCache: Kt,
        isIndexedDBSupported: be,
        setupStoryDatabase: ge,
        databaseReady: !1
    }, console.log("VantageStories utilities available in console. Try: VantageStories.getCacheStatus()"));
    try {
        no(e)
    } catch (o) {
        console.error("Failed to initialize story lookup UI:", o)
    }
    try {
        if (await ge(), typeof t < "u" && t.VantageStories && (t.VantageStories.databaseReady = !0), be()) {
            const o = await we();
            console.log("Stories cache status:", o)
        } else console.log("IndexedDB not supported in this browser")
    } catch (o) {
        console.error("Failed to load stories data:", o)
    }
    return {
        story: co
    }
}
Pe();
const ho = "/meta/splash.png";
qe(document, ho);
It(document, Ct);
lo(window, document).then(t => {
    xt(window, t)
});
Dt(document);
Ft(window, document);
Rt(window, document);
const uo = 13;
_t(window, document, uo);
Ot(document);
Wt();
Pt(document);
qt(document);
$t(document);