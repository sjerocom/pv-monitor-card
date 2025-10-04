/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1 = globalThis, e$2 = t$1.ShadowRoot && (void 0 === t$1.ShadyCSS || t$1.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s$2 = Symbol(), o$4 = /* @__PURE__ */ new WeakMap();
let n$3 = class n {
  constructor(t2, e2, o2) {
    if (this._$cssResult$ = true, o2 !== s$2) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t2, this.t = e2;
  }
  get styleSheet() {
    let t2 = this.o;
    const s2 = this.t;
    if (e$2 && void 0 === t2) {
      const e2 = void 0 !== s2 && 1 === s2.length;
      e2 && (t2 = o$4.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e2 && o$4.set(s2, t2));
    }
    return t2;
  }
  toString() {
    return this.cssText;
  }
};
const r$3 = (t2) => new n$3("string" == typeof t2 ? t2 : t2 + "", void 0, s$2), i$3 = (t2, ...e2) => {
  const o2 = 1 === t2.length ? t2[0] : e2.reduce(((e3, s2, o3) => e3 + ((t3) => {
    if (true === t3._$cssResult$) return t3.cssText;
    if ("number" == typeof t3) return t3;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t3 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s2) + t2[o3 + 1]), t2[0]);
  return new n$3(o2, t2, s$2);
}, S$1 = (s2, o2) => {
  if (e$2) s2.adoptedStyleSheets = o2.map(((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet));
  else for (const e2 of o2) {
    const o3 = document.createElement("style"), n3 = t$1.litNonce;
    void 0 !== n3 && o3.setAttribute("nonce", n3), o3.textContent = e2.cssText, s2.appendChild(o3);
  }
}, c$2 = e$2 ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
  let e2 = "";
  for (const s2 of t3.cssRules) e2 += s2.cssText;
  return r$3(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: i$2, defineProperty: e$1, getOwnPropertyDescriptor: h$1, getOwnPropertyNames: r$2, getOwnPropertySymbols: o$3, getPrototypeOf: n$2 } = Object, a$1 = globalThis, c$1 = a$1.trustedTypes, l$1 = c$1 ? c$1.emptyScript : "", p$1 = a$1.reactiveElementPolyfillSupport, d$1 = (t2, s2) => t2, u$1 = { toAttribute(t2, s2) {
  switch (s2) {
    case Boolean:
      t2 = t2 ? l$1 : null;
      break;
    case Object:
    case Array:
      t2 = null == t2 ? t2 : JSON.stringify(t2);
  }
  return t2;
}, fromAttribute(t2, s2) {
  let i2 = t2;
  switch (s2) {
    case Boolean:
      i2 = null !== t2;
      break;
    case Number:
      i2 = null === t2 ? null : Number(t2);
      break;
    case Object:
    case Array:
      try {
        i2 = JSON.parse(t2);
      } catch (t3) {
        i2 = null;
      }
  }
  return i2;
} }, f$1 = (t2, s2) => !i$2(t2, s2), b = { attribute: true, type: String, converter: u$1, reflect: false, useDefault: false, hasChanged: f$1 };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), a$1.litPropertyMetadata ?? (a$1.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let y$1 = class y extends HTMLElement {
  static addInitializer(t2) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t2);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t2, s2 = b) {
    if (s2.state && (s2.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t2) && ((s2 = Object.create(s2)).wrapped = true), this.elementProperties.set(t2, s2), !s2.noAccessor) {
      const i2 = Symbol(), h2 = this.getPropertyDescriptor(t2, i2, s2);
      void 0 !== h2 && e$1(this.prototype, t2, h2);
    }
  }
  static getPropertyDescriptor(t2, s2, i2) {
    const { get: e2, set: r2 } = h$1(this.prototype, t2) ?? { get() {
      return this[s2];
    }, set(t3) {
      this[s2] = t3;
    } };
    return { get: e2, set(s3) {
      const h2 = e2?.call(this);
      r2?.call(this, s3), this.requestUpdate(t2, h2, i2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t2) {
    return this.elementProperties.get(t2) ?? b;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d$1("elementProperties"))) return;
    const t2 = n$2(this);
    t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d$1("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d$1("properties"))) {
      const t3 = this.properties, s2 = [...r$2(t3), ...o$3(t3)];
      for (const i2 of s2) this.createProperty(i2, t3[i2]);
    }
    const t2 = this[Symbol.metadata];
    if (null !== t2) {
      const s2 = litPropertyMetadata.get(t2);
      if (void 0 !== s2) for (const [t3, i2] of s2) this.elementProperties.set(t3, i2);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t3, s2] of this.elementProperties) {
      const i2 = this._$Eu(t3, s2);
      void 0 !== i2 && this._$Eh.set(i2, t3);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s2) {
    const i2 = [];
    if (Array.isArray(s2)) {
      const e2 = new Set(s2.flat(1 / 0).reverse());
      for (const s3 of e2) i2.unshift(c$2(s3));
    } else void 0 !== s2 && i2.push(c$2(s2));
    return i2;
  }
  static _$Eu(t2, s2) {
    const i2 = s2.attribute;
    return false === i2 ? void 0 : "string" == typeof i2 ? i2 : "string" == typeof t2 ? t2.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise(((t2) => this.enableUpdating = t2)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach(((t2) => t2(this)));
  }
  addController(t2) {
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t2), void 0 !== this.renderRoot && this.isConnected && t2.hostConnected?.();
  }
  removeController(t2) {
    this._$EO?.delete(t2);
  }
  _$E_() {
    const t2 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties;
    for (const i2 of s2.keys()) this.hasOwnProperty(i2) && (t2.set(i2, this[i2]), delete this[i2]);
    t2.size > 0 && (this._$Ep = t2);
  }
  createRenderRoot() {
    const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(t2, this.constructor.elementStyles), t2;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), this._$EO?.forEach(((t2) => t2.hostConnected?.()));
  }
  enableUpdating(t2) {
  }
  disconnectedCallback() {
    this._$EO?.forEach(((t2) => t2.hostDisconnected?.()));
  }
  attributeChangedCallback(t2, s2, i2) {
    this._$AK(t2, i2);
  }
  _$ET(t2, s2) {
    const i2 = this.constructor.elementProperties.get(t2), e2 = this.constructor._$Eu(t2, i2);
    if (void 0 !== e2 && true === i2.reflect) {
      const h2 = (void 0 !== i2.converter?.toAttribute ? i2.converter : u$1).toAttribute(s2, i2.type);
      this._$Em = t2, null == h2 ? this.removeAttribute(e2) : this.setAttribute(e2, h2), this._$Em = null;
    }
  }
  _$AK(t2, s2) {
    const i2 = this.constructor, e2 = i2._$Eh.get(t2);
    if (void 0 !== e2 && this._$Em !== e2) {
      const t3 = i2.getPropertyOptions(e2), h2 = "function" == typeof t3.converter ? { fromAttribute: t3.converter } : void 0 !== t3.converter?.fromAttribute ? t3.converter : u$1;
      this._$Em = e2;
      const r2 = h2.fromAttribute(s2, t3.type);
      this[e2] = r2 ?? this._$Ej?.get(e2) ?? r2, this._$Em = null;
    }
  }
  requestUpdate(t2, s2, i2) {
    if (void 0 !== t2) {
      const e2 = this.constructor, h2 = this[t2];
      if (i2 ?? (i2 = e2.getPropertyOptions(t2)), !((i2.hasChanged ?? f$1)(h2, s2) || i2.useDefault && i2.reflect && h2 === this._$Ej?.get(t2) && !this.hasAttribute(e2._$Eu(t2, i2)))) return;
      this.C(t2, s2, i2);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t2, s2, { useDefault: i2, reflect: e2, wrapped: h2 }, r2) {
    i2 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t2) && (this._$Ej.set(t2, r2 ?? s2 ?? this[t2]), true !== h2 || void 0 !== r2) || (this._$AL.has(t2) || (this.hasUpdated || i2 || (s2 = void 0), this._$AL.set(t2, s2)), true === e2 && this._$Em !== t2 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t2));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t3) {
      Promise.reject(t3);
    }
    const t2 = this.scheduleUpdate();
    return null != t2 && await t2, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t4, s3] of this._$Ep) this[t4] = s3;
        this._$Ep = void 0;
      }
      const t3 = this.constructor.elementProperties;
      if (t3.size > 0) for (const [s3, i2] of t3) {
        const { wrapped: t4 } = i2, e2 = this[s3];
        true !== t4 || this._$AL.has(s3) || void 0 === e2 || this.C(s3, void 0, i2, e2);
      }
    }
    let t2 = false;
    const s2 = this._$AL;
    try {
      t2 = this.shouldUpdate(s2), t2 ? (this.willUpdate(s2), this._$EO?.forEach(((t3) => t3.hostUpdate?.())), this.update(s2)) : this._$EM();
    } catch (s3) {
      throw t2 = false, this._$EM(), s3;
    }
    t2 && this._$AE(s2);
  }
  willUpdate(t2) {
  }
  _$AE(t2) {
    this._$EO?.forEach(((t3) => t3.hostUpdated?.())), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t2) {
    return true;
  }
  update(t2) {
    this._$Eq && (this._$Eq = this._$Eq.forEach(((t3) => this._$ET(t3, this[t3])))), this._$EM();
  }
  updated(t2) {
  }
  firstUpdated(t2) {
  }
};
y$1.elementStyles = [], y$1.shadowRootOptions = { mode: "open" }, y$1[d$1("elementProperties")] = /* @__PURE__ */ new Map(), y$1[d$1("finalized")] = /* @__PURE__ */ new Map(), p$1?.({ ReactiveElement: y$1 }), (a$1.reactiveElementVersions ?? (a$1.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = globalThis, i$1 = t.trustedTypes, s$1 = i$1 ? i$1.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, e = "$lit$", h = `lit$${Math.random().toFixed(9).slice(2)}$`, o$2 = "?" + h, n$1 = `<${o$2}>`, r$1 = document, l = () => r$1.createComment(""), c = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, a = Array.isArray, u = (t2) => a(t2) || "function" == typeof t2?.[Symbol.iterator], d = "[ 	\n\f\r]", f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, _ = />/g, m = RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), p = /'/g, g = /"/g, $ = /^(?:script|style|textarea|title)$/i, y2 = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), x = y2(1), T = Symbol.for("lit-noChange"), E = Symbol.for("lit-nothing"), A = /* @__PURE__ */ new WeakMap(), C = r$1.createTreeWalker(r$1, 129);
function P(t2, i2) {
  if (!a(t2) || !t2.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== s$1 ? s$1.createHTML(i2) : i2;
}
const V = (t2, i2) => {
  const s2 = t2.length - 1, o2 = [];
  let r2, l2 = 2 === i2 ? "<svg>" : 3 === i2 ? "<math>" : "", c2 = f;
  for (let i3 = 0; i3 < s2; i3++) {
    const s3 = t2[i3];
    let a2, u2, d2 = -1, y3 = 0;
    for (; y3 < s3.length && (c2.lastIndex = y3, u2 = c2.exec(s3), null !== u2); ) y3 = c2.lastIndex, c2 === f ? "!--" === u2[1] ? c2 = v : void 0 !== u2[1] ? c2 = _ : void 0 !== u2[2] ? ($.test(u2[2]) && (r2 = RegExp("</" + u2[2], "g")), c2 = m) : void 0 !== u2[3] && (c2 = m) : c2 === m ? ">" === u2[0] ? (c2 = r2 ?? f, d2 = -1) : void 0 === u2[1] ? d2 = -2 : (d2 = c2.lastIndex - u2[2].length, a2 = u2[1], c2 = void 0 === u2[3] ? m : '"' === u2[3] ? g : p) : c2 === g || c2 === p ? c2 = m : c2 === v || c2 === _ ? c2 = f : (c2 = m, r2 = void 0);
    const x2 = c2 === m && t2[i3 + 1].startsWith("/>") ? " " : "";
    l2 += c2 === f ? s3 + n$1 : d2 >= 0 ? (o2.push(a2), s3.slice(0, d2) + e + s3.slice(d2) + h + x2) : s3 + h + (-2 === d2 ? i3 : x2);
  }
  return [P(t2, l2 + (t2[s2] || "<?>") + (2 === i2 ? "</svg>" : 3 === i2 ? "</math>" : "")), o2];
};
class N {
  constructor({ strings: t2, _$litType$: s2 }, n3) {
    let r2;
    this.parts = [];
    let c2 = 0, a2 = 0;
    const u2 = t2.length - 1, d2 = this.parts, [f2, v2] = V(t2, s2);
    if (this.el = N.createElement(f2, n3), C.currentNode = this.el.content, 2 === s2 || 3 === s2) {
      const t3 = this.el.content.firstChild;
      t3.replaceWith(...t3.childNodes);
    }
    for (; null !== (r2 = C.nextNode()) && d2.length < u2; ) {
      if (1 === r2.nodeType) {
        if (r2.hasAttributes()) for (const t3 of r2.getAttributeNames()) if (t3.endsWith(e)) {
          const i2 = v2[a2++], s3 = r2.getAttribute(t3).split(h), e2 = /([.?@])?(.*)/.exec(i2);
          d2.push({ type: 1, index: c2, name: e2[2], strings: s3, ctor: "." === e2[1] ? H : "?" === e2[1] ? I : "@" === e2[1] ? L : k }), r2.removeAttribute(t3);
        } else t3.startsWith(h) && (d2.push({ type: 6, index: c2 }), r2.removeAttribute(t3));
        if ($.test(r2.tagName)) {
          const t3 = r2.textContent.split(h), s3 = t3.length - 1;
          if (s3 > 0) {
            r2.textContent = i$1 ? i$1.emptyScript : "";
            for (let i2 = 0; i2 < s3; i2++) r2.append(t3[i2], l()), C.nextNode(), d2.push({ type: 2, index: ++c2 });
            r2.append(t3[s3], l());
          }
        }
      } else if (8 === r2.nodeType) if (r2.data === o$2) d2.push({ type: 2, index: c2 });
      else {
        let t3 = -1;
        for (; -1 !== (t3 = r2.data.indexOf(h, t3 + 1)); ) d2.push({ type: 7, index: c2 }), t3 += h.length - 1;
      }
      c2++;
    }
  }
  static createElement(t2, i2) {
    const s2 = r$1.createElement("template");
    return s2.innerHTML = t2, s2;
  }
}
function S(t2, i2, s2 = t2, e2) {
  if (i2 === T) return i2;
  let h2 = void 0 !== e2 ? s2._$Co?.[e2] : s2._$Cl;
  const o2 = c(i2) ? void 0 : i2._$litDirective$;
  return h2?.constructor !== o2 && (h2?._$AO?.(false), void 0 === o2 ? h2 = void 0 : (h2 = new o2(t2), h2._$AT(t2, s2, e2)), void 0 !== e2 ? (s2._$Co ?? (s2._$Co = []))[e2] = h2 : s2._$Cl = h2), void 0 !== h2 && (i2 = S(t2, h2._$AS(t2, i2.values), h2, e2)), i2;
}
class M {
  constructor(t2, i2) {
    this._$AV = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t2) {
    const { el: { content: i2 }, parts: s2 } = this._$AD, e2 = (t2?.creationScope ?? r$1).importNode(i2, true);
    C.currentNode = e2;
    let h2 = C.nextNode(), o2 = 0, n3 = 0, l2 = s2[0];
    for (; void 0 !== l2; ) {
      if (o2 === l2.index) {
        let i3;
        2 === l2.type ? i3 = new R(h2, h2.nextSibling, this, t2) : 1 === l2.type ? i3 = new l2.ctor(h2, l2.name, l2.strings, this, t2) : 6 === l2.type && (i3 = new z(h2, this, t2)), this._$AV.push(i3), l2 = s2[++n3];
      }
      o2 !== l2?.index && (h2 = C.nextNode(), o2++);
    }
    return C.currentNode = r$1, e2;
  }
  p(t2) {
    let i2 = 0;
    for (const s2 of this._$AV) void 0 !== s2 && (void 0 !== s2.strings ? (s2._$AI(t2, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t2[i2])), i2++;
  }
}
class R {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t2, i2, s2, e2) {
    this.type = 2, this._$AH = E, this._$AN = void 0, this._$AA = t2, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cv = e2?.isConnected ?? true;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return void 0 !== i2 && 11 === t2?.nodeType && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = S(this, t2, i2), c(t2) ? t2 === E || null == t2 || "" === t2 ? (this._$AH !== E && this._$AR(), this._$AH = E) : t2 !== this._$AH && t2 !== T && this._(t2) : void 0 !== t2._$litType$ ? this.$(t2) : void 0 !== t2.nodeType ? this.T(t2) : u(t2) ? this.k(t2) : this._(t2);
  }
  O(t2) {
    return this._$AA.parentNode.insertBefore(t2, this._$AB);
  }
  T(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.O(t2));
  }
  _(t2) {
    this._$AH !== E && c(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(r$1.createTextNode(t2)), this._$AH = t2;
  }
  $(t2) {
    const { values: i2, _$litType$: s2 } = t2, e2 = "number" == typeof s2 ? this._$AC(t2) : (void 0 === s2.el && (s2.el = N.createElement(P(s2.h, s2.h[0]), this.options)), s2);
    if (this._$AH?._$AD === e2) this._$AH.p(i2);
    else {
      const t3 = new M(e2, this), s3 = t3.u(this.options);
      t3.p(i2), this.T(s3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = A.get(t2.strings);
    return void 0 === i2 && A.set(t2.strings, i2 = new N(t2)), i2;
  }
  k(t2) {
    a(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const h2 of t2) e2 === i2.length ? i2.push(s2 = new R(this.O(l()), this.O(l()), this, this.options)) : s2 = i2[e2], s2._$AI(h2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    for (this._$AP?.(false, true, i2); t2 !== this._$AB; ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
  setConnected(t2) {
    void 0 === this._$AM && (this._$Cv = t2, this._$AP?.(t2));
  }
}
class k {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t2, i2, s2, e2, h2) {
    this.type = 1, this._$AH = E, this._$AN = void 0, this.element = t2, this.name = i2, this._$AM = e2, this.options = h2, s2.length > 2 || "" !== s2[0] || "" !== s2[1] ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = E;
  }
  _$AI(t2, i2 = this, s2, e2) {
    const h2 = this.strings;
    let o2 = false;
    if (void 0 === h2) t2 = S(this, t2, i2, 0), o2 = !c(t2) || t2 !== this._$AH && t2 !== T, o2 && (this._$AH = t2);
    else {
      const e3 = t2;
      let n3, r2;
      for (t2 = h2[0], n3 = 0; n3 < h2.length - 1; n3++) r2 = S(this, e3[s2 + n3], i2, n3), r2 === T && (r2 = this._$AH[n3]), o2 || (o2 = !c(r2) || r2 !== this._$AH[n3]), r2 === E ? t2 = E : t2 !== E && (t2 += (r2 ?? "") + h2[n3 + 1]), this._$AH[n3] = r2;
    }
    o2 && !e2 && this.j(t2);
  }
  j(t2) {
    t2 === E ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t2 ?? "");
  }
}
class H extends k {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t2) {
    this.element[this.name] = t2 === E ? void 0 : t2;
  }
}
class I extends k {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t2) {
    this.element.toggleAttribute(this.name, !!t2 && t2 !== E);
  }
}
class L extends k {
  constructor(t2, i2, s2, e2, h2) {
    super(t2, i2, s2, e2, h2), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    if ((t2 = S(this, t2, i2, 0) ?? E) === T) return;
    const s2 = this._$AH, e2 = t2 === E && s2 !== E || t2.capture !== s2.capture || t2.once !== s2.once || t2.passive !== s2.passive, h2 = t2 !== E && (s2 === E || e2);
    e2 && this.element.removeEventListener(this.name, this, s2), h2 && this.element.addEventListener(this.name, this, t2), this._$AH = t2;
  }
  handleEvent(t2) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t2) : this._$AH.handleEvent(t2);
  }
}
class z {
  constructor(t2, i2, s2) {
    this.element = t2, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    S(this, t2);
  }
}
const j = t.litHtmlPolyfillSupport;
j?.(N, R), (t.litHtmlVersions ?? (t.litHtmlVersions = [])).push("3.3.1");
const B = (t2, i2, s2) => {
  const e2 = s2?.renderBefore ?? i2;
  let h2 = e2._$litPart$;
  if (void 0 === h2) {
    const t3 = s2?.renderBefore ?? null;
    e2._$litPart$ = h2 = new R(i2.insertBefore(l(), t3), t3, void 0, s2 ?? {});
  }
  return h2._$AI(t2), h2;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const s = globalThis;
class i extends y$1 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var _a;
    const t2 = super.createRenderRoot();
    return (_a = this.renderOptions).renderBefore ?? (_a.renderBefore = t2.firstChild), t2;
  }
  update(t2) {
    const r2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this._$Do = B(r2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return T;
  }
}
i._$litElement$ = true, i["finalized"] = true, s.litElementHydrateSupport?.({ LitElement: i });
const o$1 = s.litElementPolyfillSupport;
o$1?.({ LitElement: i });
(s.litElementVersions ?? (s.litElementVersions = [])).push("4.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o = { attribute: true, type: String, converter: u$1, reflect: false, hasChanged: f$1 }, r = (t2 = o, e2, r2) => {
  const { kind: n3, metadata: i2 } = r2;
  let s2 = globalThis.litPropertyMetadata.get(i2);
  if (void 0 === s2 && globalThis.litPropertyMetadata.set(i2, s2 = /* @__PURE__ */ new Map()), "setter" === n3 && ((t2 = Object.create(t2)).wrapped = true), s2.set(r2.name, t2), "accessor" === n3) {
    const { name: o2 } = r2;
    return { set(r3) {
      const n4 = e2.get.call(this);
      e2.set.call(this, r3), this.requestUpdate(o2, n4, t2);
    }, init(e3) {
      return void 0 !== e3 && this.C(o2, void 0, t2, e3), e3;
    } };
  }
  if ("setter" === n3) {
    const { name: o2 } = r2;
    return function(r3) {
      const n4 = this[o2];
      e2.call(this, r3), this.requestUpdate(o2, n4, t2);
    };
  }
  throw Error("Unsupported decorator location: " + n3);
};
function n2(t2) {
  return (e2, o2) => "object" == typeof o2 ? r(t2, e2, o2) : ((t3, e3, o3) => {
    const r2 = e3.hasOwnProperty(o3);
    return e3.constructor.createProperty(o3, t3), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
  })(t2, e2, o2);
}
const pvMonitorCardStyles = i$3`
    :host {
        display: block;
        background: transparent !important;
        box-shadow: none !important;
        border: none !important;
        --ha-card-box-shadow: none !important;
        --ha-card-border-width: 0 !important;
    }
    ha-card {
        background: transparent !important;
        box-shadow: none !important;
        border: none !important;
    }
    .card-header {
        text-align: center;
        margin-bottom: 12px;
    }
    .card-header-with-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }
    .info-bar {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 6px;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }
    .info-bar-item {
        display: flex;
        align-items: center;
        gap: 6px;
        flex: 1;
        justify-content: center;
    }
    .info-bar-content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0px;
        margin: 0;
        padding: 0;
    }
    .info-bar-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }
    .info-bar-icon ha-icon {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .info-bar-label {
        line-height: 1;
    }
    .info-bar-value {
        line-height: 1.2;
    }
    .grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }
    .card {
        text-align: center;
        color: white;
        position: relative;
        overflow: hidden;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }
    .card::after {
        content: "";
        position: absolute;
        inset: 2px;
        border-radius: inherit;
        background: inherit;
        z-index: 1;
    }
    .card > * {
        position: relative;
        z-index: 2;
    }
    .primary {
        font-weight: normal;
    }
    .secondary {
        opacity: 0.7;
        margin-top: 2px;
    }
    .tertiary {
        opacity: 0.7;
        margin-top: 2px;
    }
    .icon {
        margin-bottom: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    @keyframes spin {
        0%   { transform: rotate(0deg); }
        25%  { transform: rotate(120deg); }
        50%  { transform: rotate(200deg); }
        75%  { transform: rotate(300deg); }
        100% { transform: rotate(360deg); }
    }
`;
function getDefaultConfig(config) {
  return {
    ...config,
    show_title: config.show_title !== false,
    show_subtitle: config.show_subtitle !== false,
    show_icon: config.show_icon !== false,
    grid_gap: config.grid_gap ?? "6px",
    info_bar: {
      show: config.info_bar?.show === true,
      item1: {
        icon: config.info_bar?.item1?.icon ?? "mdi:home-lightning-bolt",
        label: config.info_bar?.item1?.label ?? "Autarkie",
        ...config.info_bar?.item1
      },
      item2: {
        icon: config.info_bar?.item2?.icon ?? "mdi:battery-clock",
        label: config.info_bar?.item2?.label ?? "Restlaufzeit",
        ...config.info_bar?.item2
      },
      item3: {
        icon: config.info_bar?.item3?.icon ?? "mdi:battery-charging",
        label: config.info_bar?.item3?.label ?? "Restladezeit",
        ...config.info_bar?.item3
      },
      style: {
        background_color: config.info_bar?.style?.background_color ?? "rgba(21, 20, 27, 1)",
        border_color: config.info_bar?.style?.border_color ?? "rgba(255, 255, 255, 0.1)",
        border_radius: config.info_bar?.style?.border_radius ?? "16px",
        padding: config.info_bar?.style?.padding ?? "12px",
        gap: config.info_bar?.style?.gap ?? "8px",
        icon_size: config.info_bar?.style?.icon_size ?? "1.5em",
        icon_color: config.info_bar?.style?.icon_color ?? "white",
        label_size: config.info_bar?.style?.label_size ?? "0.8em",
        label_color: config.info_bar?.style?.label_color ?? "rgba(255, 255, 255, 0.7)",
        label_font_weight: config.info_bar?.style?.label_font_weight ?? "normal",
        value_size: config.info_bar?.style?.value_size ?? "1em",
        value_color: config.info_bar?.style?.value_color ?? "white",
        value_font_weight: config.info_bar?.style?.value_font_weight ?? "bold",
        ...config.info_bar?.style
      }
    },
    style: {
      card_background_color: config.style?.card_background_color ?? "rgba(21, 20, 27, 1)",
      card_border_color: config.style?.card_border_color ?? "rgba(255, 255, 255, 0.1)",
      card_boxshadow: config.style?.card_boxshadow ?? "0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
      card_border_radius: config.style?.card_border_radius ?? "16px",
      card_text_color: config.style?.card_text_color ?? "white",
      card_cursor: config.style?.card_cursor ?? "pointer",
      card_padding: config.style?.card_padding ?? "12px",
      title_align: config.style?.title_align ?? "center",
      title_size: config.style?.title_size ?? "1.5em",
      title_font_weight: config.style?.title_font_weight ?? "bold",
      title_color: config.style?.title_color ?? "white",
      subtitle_align: config.style?.subtitle_align ?? "center",
      subtitle_size: config.style?.subtitle_size ?? "1em",
      subtitle_font_weight: config.style?.subtitle_font_weight ?? "normal",
      subtitle_color: config.style?.subtitle_color ?? "rgba(255, 255, 255, 0.7)",
      icon_size: config.style?.icon_size ?? "2em",
      icon_opacity: config.style?.icon_opacity ?? "1",
      icon_margin: config.style?.icon_margin ?? "6px",
      primary_size: config.style?.primary_size ?? "1.2em",
      primary_color: config.style?.primary_color ?? "white",
      primary_font_opacity: config.style?.primary_font_opacity ?? "1",
      primary_font_weight: config.style?.primary_font_weight ?? "normal",
      secondary_size: config.style?.secondary_size ?? "0.9em",
      secondary_color: config.style?.secondary_color ?? "white",
      secondary_font_weight: config.style?.secondary_font_weight ?? "normal",
      secondary_font_opacity: config.style?.secondary_font_opacity ?? "0.7",
      tertiary_size: config.style?.tertiary_size ?? "0.9em",
      tertiary_color: config.style?.tertiary_color ?? "white",
      tertiary_font_weight: config.style?.tertiary_font_weight ?? "normal",
      tertiary_font_opacity: config.style?.tertiary_font_opacity ?? "0.7",
      ...config.style
    },
    netz: {
      animation: config.netz?.animation !== false,
      threshold: config.netz?.threshold ?? 10,
      text_einspeisen: config.netz?.text_einspeisen ?? "Einspeisung",
      text_neutral: config.netz?.text_neutral ?? "Neutral",
      text_bezug: config.netz?.text_bezug ?? "Netzbezug",
      ...config.netz
    },
    pv: {
      animation: config.pv?.animation !== false,
      icon_rotation: config.pv?.icon_rotation === true,
      max_power: config.pv?.max_power ?? 1e4,
      ...config.pv
    },
    batterie: {
      animation: config.batterie?.animation !== false,
      battery_capacity: config.batterie?.battery_capacity ?? 1e4,
      calculate_runtime: config.batterie?.calculate_runtime === true,
      ...config.batterie
    },
    haus: {
      animation: config.haus?.animation !== false,
      ...config.haus
    }
  };
}
function formatPower(value) {
  const absValue = Math.abs(value);
  if (absValue >= 1e3) {
    return `${(value / 1e3).toFixed(2)} kW`;
  }
  return `${Math.round(value)} W`;
}
function getBatteryIcon(percentage) {
  if (percentage >= 95) return "mdi:battery";
  else if (percentage >= 85) return "mdi:battery-90";
  else if (percentage >= 75) return "mdi:battery-80";
  else if (percentage >= 65) return "mdi:battery-70";
  else if (percentage >= 55) return "mdi:battery-60";
  else if (percentage >= 45) return "mdi:battery-50";
  else if (percentage >= 35) return "mdi:battery-40";
  else if (percentage >= 25) return "mdi:battery-30";
  else if (percentage >= 15) return "mdi:battery-20";
  else if (percentage >= 5) return "mdi:battery-10";
  else return "mdi:battery-outline";
}
function getBatteryIconColor(percentage) {
  if (percentage >= 80) return "rgba(76,175,80,1)";
  else if (percentage >= 70) return "rgba(139,195,74,1)";
  else if (percentage >= 60) return "rgba(205,220,57,1)";
  else if (percentage >= 50) return "rgba(255,235,59,1)";
  else if (percentage >= 40) return "rgba(255,193,7,1)";
  else if (percentage >= 30) return "rgba(255,152,0,1)";
  else if (percentage >= 20) return "rgba(255,87,34,1)";
  else if (percentage >= 10) return "rgba(244,67,54,1)";
  else return "rgba(211,47,47,1)";
}
function getNetzColor(power, threshold) {
  const abs_w = Math.abs(power);
  const dur = Math.max(1, 15 - abs_w / 6e3 * 6);
  if (abs_w < threshold) return { color: "", duration: dur, show: false };
  let color = "";
  if (power > threshold) {
    if (abs_w < 250) color = "rgba(255,235,59,1)";
    else if (abs_w < 300) color = "rgba(255,202,40,1)";
    else if (abs_w < 350) color = "rgba(255,167,38,1)";
    else if (abs_w < 400) color = "rgba(255,138,101,1)";
    else if (abs_w < 450) color = "rgba(255,112,67,1)";
    else if (abs_w < 500) color = "rgba(244,67,54,1)";
    else if (abs_w < 550) color = "rgba(229,57,53,1)";
    else if (abs_w < 600) color = "rgba(211,47,47,1)";
    else if (abs_w < 650) color = "rgba(198,40,40,1)";
    else if (abs_w < 700) color = "rgba(183,28,28,1)";
    else if (abs_w < 750) color = "rgba(156,39,176,1)";
    else if (abs_w < 1e3) color = "rgba(142,36,170,1)";
    else if (abs_w < 1250) color = "rgba(123,31,162,1)";
    else if (abs_w < 1500) color = "rgba(106,27,154,1)";
    else if (abs_w < 1750) color = "rgba(94,53,177,1)";
    else if (abs_w < 2e3) color = "rgba(81,45,168,1)";
    else if (abs_w < 2500) color = "rgba(74,20,140,1)";
    else if (abs_w < 3e3) color = "rgba(49,27,146,1)";
    else color = "rgba(26,35,126,1)";
  } else {
    if (abs_w < 250) color = "rgba(255,235,59,1)";
    else if (abs_w < 300) color = "rgba(238,233,52,1)";
    else if (abs_w < 350) color = "rgba(220,231,47,1)";
    else if (abs_w < 400) color = "rgba(205,220,57,1)";
    else if (abs_w < 450) color = "rgba(174,213,89,1)";
    else if (abs_w < 500) color = "rgba(156,204,101,1)";
    else if (abs_w < 550) color = "rgba(139,195,74,1)";
    else if (abs_w < 600) color = "rgba(124,179,66,1)";
    else if (abs_w < 650) color = "rgba(104,159,56,1)";
    else if (abs_w < 700) color = "rgba(85,139,47,1)";
    else if (abs_w < 750) color = "rgba(76,175,80,1)";
    else if (abs_w < 1e3) color = "rgba(67,160,71,1)";
    else if (abs_w < 1250) color = "rgba(56,142,60,1)";
    else if (abs_w < 1500) color = "rgba(46,125,50,1)";
    else if (abs_w < 1750) color = "rgba(35,94,39,1)";
    else if (abs_w < 2e3) color = "rgba(27,94,32,1)";
    else if (abs_w < 2500) color = "rgba(20,83,28,1)";
    else if (abs_w < 3e3) color = "rgba(15,71,24,1)";
    else color = "rgba(10,50,20,1)";
  }
  return { color, duration: dur, show: true };
}
function getPVRotation(power, maxPower = 1e4) {
  const abs_w = Math.abs(power);
  return Math.min(abs_w / maxPower * 360, 360);
}
function getPVColor(power, maxPower = 1e4) {
  const abs_w = Math.abs(power);
  const dur_glow = Math.max(1, 15 - abs_w / (maxPower * 0.6) * 6);
  if (abs_w < 10) return { color: "", duration: dur_glow, show: false };
  const step1 = maxPower * 0.01;
  const step2 = maxPower * 0.05;
  const step3 = maxPower * 0.1;
  const step4 = maxPower * 0.2;
  const step5 = maxPower * 0.4;
  const step6 = maxPower * 0.6;
  const step7 = maxPower * 0.8;
  const step8 = maxPower * 1;
  const step9 = maxPower * 1.2;
  const step10 = maxPower * 1.4;
  let baseColor = "";
  if (abs_w < step1) baseColor = "rgba(156,39,176,";
  else if (abs_w < step2) baseColor = "rgba(244,67,54,";
  else if (abs_w < step3) baseColor = "rgba(255,111,0,";
  else if (abs_w < step4) baseColor = "rgba(255,152,0,";
  else if (abs_w < step5) baseColor = "rgba(255,193,7,";
  else if (abs_w < step6) baseColor = "rgba(255,214,0,";
  else if (abs_w < step7) baseColor = "rgba(255,235,59,";
  else if (abs_w < step8) baseColor = "rgba(255,249,196,";
  else if (abs_w < step9) baseColor = "rgba(255,255,224,";
  else if (abs_w < step10) baseColor = "rgba(255,255,240,";
  else baseColor = "rgba(255,255,255,";
  const alpha = Math.min(1, 0.5 + abs_w / (maxPower * 1.3) * 0.8);
  const color = baseColor + alpha.toFixed(2) + ")";
  return { color, duration: dur_glow, show: true };
}
function getBatterieColor(charge, discharge, batteryCapacity = 1e4) {
  const net_w = charge - discharge;
  const abs_w = Math.abs(net_w);
  const threshold = 10;
  const dur = Math.max(1, 15 - abs_w / (batteryCapacity * 0.6) * 6);
  if (Math.abs(net_w) < threshold) return { color: "", duration: dur, show: false };
  const step1 = batteryCapacity * 0.025;
  const step2 = batteryCapacity * 0.03;
  const step3 = batteryCapacity * 0.035;
  const step4 = batteryCapacity * 0.04;
  const step5 = batteryCapacity * 0.045;
  const step6 = batteryCapacity * 0.05;
  const step7 = batteryCapacity * 0.055;
  const step8 = batteryCapacity * 0.06;
  const step9 = batteryCapacity * 0.065;
  const step10 = batteryCapacity * 0.075;
  const step11 = batteryCapacity * 0.1;
  const step12 = batteryCapacity * 0.125;
  const step13 = batteryCapacity * 0.15;
  const step14 = batteryCapacity * 0.175;
  const step15 = batteryCapacity * 0.2;
  const step16 = batteryCapacity * 0.25;
  const step17 = batteryCapacity * 0.3;
  let color = "";
  if (net_w > threshold) {
    if (abs_w < step1) color = "rgba(255,235,59,0.4)";
    else if (abs_w < step2) color = "rgba(238,233,52,0.6)";
    else if (abs_w < step3) color = "rgba(220,231,47,0.8)";
    else if (abs_w < step4) color = "rgba(205,220,57,1)";
    else if (abs_w < step5) color = "rgba(174,213,89,1)";
    else if (abs_w < step6) color = "rgba(156,204,101,1)";
    else if (abs_w < step7) color = "rgba(139,195,74,1)";
    else if (abs_w < step8) color = "rgba(124,179,66,1)";
    else if (abs_w < step9) color = "rgba(104,159,56,1)";
    else if (abs_w < step10) color = "rgba(85,139,47,1)";
    else if (abs_w < step11) color = "rgba(76,175,80,1)";
    else if (abs_w < step12) color = "rgba(67,160,71,1)";
    else if (abs_w < step13) color = "rgba(56,142,60,1)";
    else if (abs_w < step14) color = "rgba(46,125,50,1)";
    else if (abs_w < step15) color = "rgba(35,94,39,1)";
    else if (abs_w < step16) color = "rgba(27,94,32,1)";
    else if (abs_w < step17) color = "rgba(20,83,28,1)";
    else color = "rgba(10,50,20,1)";
  } else {
    if (abs_w < step1) color = "rgba(255,235,59,0.5)";
    else if (abs_w < step2) color = "rgba(255,202,40,0.6)";
    else if (abs_w < step3) color = "rgba(255,167,38,0.7)";
    else if (abs_w < step4) color = "rgba(255,138,101,0.8)";
    else if (abs_w < step5) color = "rgba(255,112,67,0.9)";
    else if (abs_w < step6) color = "rgba(244,67,54,1)";
    else if (abs_w < step7) color = "rgba(229,57,53,1)";
    else if (abs_w < step8) color = "rgba(211,47,47,1)";
    else if (abs_w < step9) color = "rgba(198,40,40,1)";
    else if (abs_w < step10) color = "rgba(183,28,28,1)";
    else if (abs_w < step11) color = "rgba(156,39,176,1)";
    else if (abs_w < step12) color = "rgba(142,36,170,1)";
    else if (abs_w < step13) color = "rgba(123,31,162,1)";
    else if (abs_w < step14) color = "rgba(106,27,154,1)";
    else if (abs_w < step15) color = "rgba(94,53,177,1)";
    else if (abs_w < step16) color = "rgba(81,45,168,1)";
    else if (abs_w < step17) color = "rgba(49,27,146,1)";
    else color = "rgba(26,35,126,1)";
  }
  return { color, duration: dur, show: true };
}
function getHausColor(power) {
  const w = Math.abs(power);
  const threshold = 50;
  const dur = Math.max(1, 6 - w / 6e3 * 4);
  if (w < threshold) return { color: "", duration: dur, show: false };
  let color = "";
  if (w < 80) color = "rgba(255,235,59,1)";
  else if (w < 100) color = "rgba(255,202,40,1)";
  else if (w < 150) color = "rgba(255,167,38,1)";
  else if (w < 250) color = "rgba(244,81,30,1)";
  else if (w < 500) color = "rgba(229,57,53,1)";
  else if (w < 1e3) color = "rgba(198,40,40,1)";
  else if (w < 1500) color = "rgba(233,30,99,1)";
  else if (w < 2500) color = "rgba(216,27,96,1)";
  else if (w < 3e3) color = "rgba(194,24,91,1)";
  else if (w < 4e3) color = "rgba(156,39,176,1)";
  else if (w < 5e3) color = "rgba(123,31,162,1)";
  else color = "rgba(74,20,140,1)";
  return { color, duration: dur, show: true };
}
function getAnimationStyle(color, duration) {
  return `
        position: absolute;
        top: -50%;
        left: -50%;
        right: -50%;
        bottom: -50%;
        border-radius: 50%;
        background: conic-gradient(
            rgba(0,0,0,0.2) 30deg,
            ${color} 88deg,
            rgba(255,255,255,1) 90deg,
            ${color} 92deg,
            rgba(0,0,0,0.2) 94deg,
            rgba(0,0,0,0.2) 160deg,
            ${color} 208deg,
            rgba(255,255,255,1) 210deg,
            ${color} 212deg,
            rgba(0,0,0,0.2) 214deg,
            rgba(0,0,0,0.2) 280deg,
            ${color} 328deg,
            rgba(255,255,255,1) 330deg,
            ${color} 332deg,
            rgba(0,0,0,0.2) 334deg,
            rgba(0,0,0,0.2) 360deg
        );
        animation: spin ${duration}s linear infinite;
        z-index: 0;
    `;
}
function calculateBatteryRuntime(batteryCapacityWh, socPercent, chargeW, dischargeW) {
  const capKwh = batteryCapacityWh / 1e3;
  const soc = socPercent / 100;
  const eRestKwh = capKwh * soc;
  const chKw = chargeW / 1e3;
  const disKw = dischargeW / 1e3;
  const pNetKw = chKw - disKw;
  const thresholdKw = 0.03;
  if (eRestKwh > 0 && pNetKw < -thresholdKw) {
    const totalSeconds = eRestKwh / Math.abs(pNetKw) * 3600;
    return formatTime(totalSeconds);
  } else if (pNetKw > thresholdKw) {
    return "♾️";
  } else {
    return "—";
  }
}
function calculateBatteryChargeTime(batteryCapacityWh, socPercent, chargeW, dischargeW) {
  const capKwh = batteryCapacityWh / 1e3;
  const soc = socPercent / 100;
  const eMissingKwh = capKwh * (1 - soc);
  const chKw = chargeW / 1e3;
  const disKw = dischargeW / 1e3;
  const pNetKw = chKw - disKw;
  const thresholdKw = 0.03;
  if (eMissingKwh > 0 && pNetKw > thresholdKw) {
    const totalSeconds = eMissingKwh / pNetKw * 3600;
    return formatTime(totalSeconds);
  } else if (pNetKw < -thresholdKw) {
    return "♾️";
  } else {
    return "—";
  }
}
function formatTime(totalSeconds) {
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor(totalSeconds % 86400 / 3600);
  const minutes = Math.floor(totalSeconds % 3600 / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const parts = [];
  if (days > 0) parts.push(`${days}t`);
  if (hours > 0 || days > 0) parts.push(`${hours}h`);
  if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);
  return parts.join(" ");
}
var __defProp = Object.defineProperty;
var __decorateClass = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = decorator(target, key, result) || result;
  if (result) __defProp(target, key, result);
  return result;
};
const CARD_TAG = "pv-monitor-card";
const _PVMonitorCard = class _PVMonitorCard extends i {
  static async getConfigElement() {
    await import("./pv-monitor-card-editor-CXJMaSXL.mjs");
    return document.createElement("pv-monitor-card-editor");
  }
  static getStubConfig() {
    return {
      type: "custom:pv-monitor-card",
      title: "PV Monitor",
      show_title: true,
      pv: {
        entity: "",
        animation: true,
        max_power: 1e4
      },
      batterie: {
        entity: "",
        animation: true
      },
      haus: {
        entity: "",
        animation: true
      },
      netz: {
        entity: "",
        animation: true,
        threshold: 10
      }
    };
  }
  setConfig(config) {
    if (!config) throw new Error("Fehlende Konfiguration");
    this.config = getDefaultConfig(config);
  }
  _handleAction(event, actions) {
    const actionType = event.type === "dblclick" ? "double_tap" : event.type === "contextmenu" ? "hold" : "tap";
    const action = actions[actionType];
    if (event.type === "contextmenu") {
      event.preventDefault();
    }
    this._handleTap(action);
  }
  _handleTap(tapAction) {
    if (!tapAction || tapAction.action === "none") return;
    if (tapAction.action === "navigate" && tapAction.navigation_path) {
      history.pushState(null, "", tapAction.navigation_path);
      window.dispatchEvent(new CustomEvent("location-changed"));
    } else if (tapAction.action === "call-service" && tapAction.service && this.hass) {
      const [domain, service] = tapAction.service.split(".");
      if (this.hass.callService) {
        this.hass.callService(domain, service, tapAction.service_data || {});
      } else {
        window.dispatchEvent(new CustomEvent("hass-call-service", {
          bubbles: true,
          composed: true,
          detail: {
            domain,
            service,
            serviceData: tapAction.service_data || {}
          }
        }));
      }
    } else if (tapAction.action === "more-info") {
      const entityId = tapAction.target?.entity_id;
      if (entityId) {
        this.dispatchEvent(new CustomEvent("hass-more-info", {
          composed: true,
          bubbles: true,
          detail: { entityId }
        }));
      }
    }
  }
  _getCardStyle(cardStyle) {
    const s2 = this.config.style;
    const bgColor = cardStyle?.background_color || s2.card_background_color || "rgba(21, 20, 27, 1)";
    const borderColor = cardStyle?.border_color || s2.card_border_color || "rgba(255, 255, 255, 0.1)";
    return `background: ${bgColor}; border: 1px solid ${borderColor}; box-shadow: ${s2.card_boxshadow}; border-radius: ${s2.card_border_radius}; color: ${s2.card_text_color}; cursor: ${s2.card_cursor}; padding: ${s2.card_padding};`;
  }
  _calculatePVRotation(value, maxPower) {
    if (value <= 0) return 0;
    if (value >= maxPower) return 360;
    return value / maxPower * 360;
  }
  _getTextFromEntityOrConfig(entity, text) {
    if (entity && this.hass) {
      const entityObj = this.hass.states[entity];
      if (entityObj) {
        return `${entityObj.state} ${entityObj.attributes.unit_of_measurement || ""}`;
      }
    }
    return text || "";
  }
  _renderCard(config) {
    const s2 = this.config.style;
    const cardStyle = config.cardConfig?.style;
    const iconColor = config.iconColor || (config.animStyle.show && config.animStyle.color ? config.animStyle.color : "");
    const primaryColor = cardStyle?.primary_color || s2.primary_color;
    const secondaryColor = cardStyle?.secondary_color || s2.secondary_color;
    const iconStyle = `font-size: ${s2.icon_size}; opacity: ${s2.icon_opacity}; ${config.customIconStyle || ""} ${iconColor ? `color: ${iconColor};` : ""}`;
    const primaryStyle = `font-size: ${s2.primary_size}; color: ${primaryColor}; opacity: ${s2.primary_font_opacity}; font-weight: ${s2.primary_font_weight}; line-height: calc(${s2.primary_size} + 2px);`;
    const secondaryStyle = `font-size: ${s2.secondary_size}; color: ${secondaryColor}; opacity: ${s2.secondary_font_opacity}; font-weight: ${s2.secondary_font_weight}; line-height: calc(${s2.secondary_size} + 2px);`;
    const tertiaryStyle = `font-size: ${s2.tertiary_size}; color: ${s2.tertiary_color}; opacity: ${s2.tertiary_font_opacity}; font-weight: ${s2.tertiary_font_weight}; line-height: calc(${s2.tertiary_size} + 2px);`;
    return x`
            <div class="card"
                 style="${this._getCardStyle(cardStyle)}"
                 @click=${(e2) => this._handleAction(e2, { tap: config.cardConfig?.tap_action })}
                 @dblclick=${(e2) => this._handleAction(e2, { double_tap: config.cardConfig?.double_tap_action })}
                 @contextmenu=${(e2) => this._handleAction(e2, { hold: config.cardConfig?.hold_action })}>
                ${config.animStyle.show && config.animStyle.color ? x`
                    <div style="${getAnimationStyle(config.animStyle.color, config.animStyle.duration)}"></div>
                ` : ""}
                <div class="icon" style="${iconStyle}; margin-bottom: ${s2.icon_margin};"><ha-icon .icon=${config.icon} style="--mdc-icon-size: ${s2.icon_size}; width: ${s2.icon_size}; height: ${s2.icon_size};"></ha-icon></div>
                <div class="primary" style="${primaryStyle}">${config.primaryValue}</div>
                ${config.secondaryText ? x`<div class="secondary" style="${secondaryStyle}">${config.secondaryText}</div>` : ""}
                ${config.tertiaryText ? x`<div class="tertiary" style="${tertiaryStyle}">${config.tertiaryText}</div>` : ""}
            </div>
        `;
  }
  _renderInfoBarItem(item, s2, itemType) {
    if (!item || !this.hass) return x``;
    let value = "";
    let unit = "";
    if (itemType === "runtime" && this.config.batterie?.calculate_runtime && this.config.batterie?.entity) {
      const batteryCapacity = this.config.batterie.battery_capacity || 1e4;
      const socPercent = parseFloat(this.hass.states[this.config.batterie.entity]?.state) || 0;
      const charge = this.config.batterie.ladung_entity ? parseFloat(this.hass.states[this.config.batterie.ladung_entity]?.state) || 0 : 0;
      const discharge = this.config.batterie.entladung_entity ? parseFloat(this.hass.states[this.config.batterie.entladung_entity]?.state) || 0 : 0;
      value = calculateBatteryRuntime(batteryCapacity, socPercent, charge, discharge);
      unit = "";
    } else if (itemType === "chargetime" && this.config.batterie?.calculate_runtime && this.config.batterie?.entity) {
      const batteryCapacity = this.config.batterie.battery_capacity || 1e4;
      const socPercent = parseFloat(this.hass.states[this.config.batterie.entity]?.state) || 0;
      const charge = this.config.batterie.ladung_entity ? parseFloat(this.hass.states[this.config.batterie.ladung_entity]?.state) || 0 : 0;
      const discharge = this.config.batterie.entladung_entity ? parseFloat(this.hass.states[this.config.batterie.entladung_entity]?.state) || 0 : 0;
      value = calculateBatteryChargeTime(batteryCapacity, socPercent, charge, discharge);
      unit = "";
    } else if (item.entity) {
      const entity = this.hass.states[item.entity];
      if (!entity) return x``;
      value = entity.state;
      unit = item.unit ?? entity.attributes.unit_of_measurement ?? "";
    } else {
      return x``;
    }
    return x`
            <div class="info-bar-item">
                ${item.icon ? x`
                    <div class="info-bar-icon">
                        <ha-icon .icon=${item.icon} style="--mdc-icon-size: ${s2.icon_size}; color: ${s2.icon_color}; width: ${s2.icon_size}; height: ${s2.icon_size};"></ha-icon>
                    </div>
                ` : ""}
                <div class="info-bar-content">
                    ${item.label ? x`<div class="info-bar-label" style="font-size: ${s2.label_size}; color: ${s2.label_color}; font-weight: ${s2.label_font_weight};">${item.label}</div>` : ""}
                    <div class="info-bar-value" style="font-size: ${s2.value_size}; color: ${s2.value_color}; font-weight: ${s2.value_font_weight};">${value}${unit ? " " + unit : ""}</div>
                </div>
            </div>
        `;
  }
  _renderInfoBar() {
    if (!this.config.info_bar?.show || !this.hass) return x``;
    const ib = this.config.info_bar;
    const s2 = ib.style;
    const hasAnyEntity = ib.item1?.entity || ib.item2?.entity || ib.item3?.entity || this.config.batterie?.calculate_runtime && (ib.item2 || ib.item3);
    if (!hasAnyEntity) return x``;
    const infoBarStyle = `
            background: ${s2.background_color};
            border: 1px solid ${s2.border_color};
            border-radius: ${s2.border_radius};
            padding: ${s2.padding};
            gap: ${s2.gap};
            ${s2.background_color !== "transparent" ? `box-shadow: ${this.config.style.card_boxshadow};` : ""}
        `;
    return x`
            <div class="info-bar" style="${infoBarStyle}">
                ${this._renderInfoBarItem(ib.item1, s2, "item1")}
                ${this._renderInfoBarItem(ib.item2, s2, "runtime")}
                ${this._renderInfoBarItem(ib.item3, s2, "chargetime")}
            </div>
        `;
  }
  _renderNetz() {
    if (!this.config.netz?.entity || !this.hass) return x``;
    const entity = this.hass.states[this.config.netz.entity];
    if (!entity) return x`<div class="card">⚠️ ${this.config.netz.entity} fehlt</div>`;
    const value = parseFloat(entity.state) || 0;
    const threshold = this.config.netz.threshold || 10;
    let statusText = "";
    if (value < -threshold) {
      statusText = this.config.netz.text_einspeisen || "Einspeisung";
    } else if (value > threshold) {
      statusText = this.config.netz.text_bezug || "Netzbezug";
    } else {
      statusText = this.config.netz.text_neutral || "Neutral";
    }
    const secondaryText = this._getTextFromEntityOrConfig(this.config.netz.secondary_entity, this.config.netz.secondary_text) || statusText;
    const tertiaryText = this._getTextFromEntityOrConfig(this.config.netz.tertiary_entity, this.config.netz.tertiary_text);
    return this._renderCard({
      cardConfig: this.config.netz,
      icon: this.config.netz.icon || "mdi:transmission-tower",
      primaryValue: formatPower(value),
      secondaryText,
      tertiaryText,
      animStyle: this.config.netz.animation ? getNetzColor(value, threshold) : { color: "", duration: 0, show: false }
    });
  }
  _renderPV() {
    if (!this.config.pv?.entity || !this.hass) return x``;
    const entity = this.hass.states[this.config.pv.entity];
    if (!entity) return x`<div class="card">⚠️ ${this.config.pv.entity} fehlt</div>`;
    const value = parseFloat(entity.state) || 0;
    const maxPower = this.config.pv.max_power || 1e4;
    const shouldRotate = this.config.pv.icon_rotation === true;
    let rotation = 0;
    if (shouldRotate) {
      try {
        rotation = getPVRotation(value, maxPower);
      } catch (e2) {
        rotation = this._calculatePVRotation(value, maxPower);
      }
    }
    return this._renderCard({
      cardConfig: this.config.pv,
      icon: this.config.pv.icon || "mdi:white-balance-sunny",
      primaryValue: formatPower(value),
      secondaryText: this._getTextFromEntityOrConfig(this.config.pv.secondary_entity, this.config.pv.secondary_text),
      tertiaryText: this._getTextFromEntityOrConfig(this.config.pv.tertiary_entity, this.config.pv.tertiary_text),
      animStyle: this.config.pv.animation ? getPVColor(value, maxPower) : { color: "", duration: 0, show: false },
      customIconStyle: shouldRotate ? `transform: rotate(${rotation}deg); transition: transform 0.5s ease;` : ""
    });
  }
  _renderBatterie() {
    if (!this.config.batterie?.entity || !this.hass) return x``;
    const entity = this.hass.states[this.config.batterie.entity];
    if (!entity) return x`<div class="card">⚠️ ${this.config.batterie.entity} fehlt</div>`;
    const percentage = parseFloat(entity.state) || 0;
    const icon = this.config.batterie.icon || getBatteryIcon(percentage);
    const iconColor = getBatteryIconColor(percentage);
    const charge = this.config.batterie.ladung_entity ? parseFloat(this.hass.states[this.config.batterie.ladung_entity]?.state) || 0 : 0;
    const discharge = this.config.batterie.entladung_entity ? parseFloat(this.hass.states[this.config.batterie.entladung_entity]?.state) || 0 : 0;
    const batteryCapacity = this.config.batterie.battery_capacity || 1e4;
    let statusText = "";
    if (charge > 1) {
      statusText = formatPower(charge);
    } else if (discharge > 1) {
      statusText = "-" + formatPower(discharge);
    } else {
      statusText = "Inaktiv";
    }
    const secondaryText = this._getTextFromEntityOrConfig(this.config.batterie.secondary_entity, this.config.batterie.secondary_text) || statusText;
    const tertiaryText = this._getTextFromEntityOrConfig(this.config.batterie.tertiary_entity, this.config.batterie.tertiary_text);
    return this._renderCard({
      cardConfig: this.config.batterie,
      icon,
      primaryValue: `${Math.round(percentage)}%`,
      secondaryText,
      tertiaryText,
      animStyle: this.config.batterie.animation ? getBatterieColor(charge, discharge, batteryCapacity) : { color: "", duration: 0, show: false },
      iconColor: this.config.batterie.style?.icon_color || iconColor
    });
  }
  _renderHaus() {
    if (!this.config.haus?.entity || !this.hass) return x``;
    const entity = this.hass.states[this.config.haus.entity];
    if (!entity) return x`<div class="card">⚠️ ${this.config.haus.entity} fehlt</div>`;
    const value = parseFloat(entity.state) || 0;
    return this._renderCard({
      cardConfig: this.config.haus,
      icon: this.config.haus.icon || "mdi:home",
      primaryValue: formatPower(value),
      secondaryText: this._getTextFromEntityOrConfig(this.config.haus.secondary_entity, this.config.haus.secondary_text),
      tertiaryText: this._getTextFromEntityOrConfig(this.config.haus.tertiary_entity, this.config.haus.tertiary_text),
      animStyle: this.config.haus.animation ? getHausColor(value) : { color: "", duration: 0, show: false }
    });
  }
  render() {
    const s2 = this.config.style;
    const showTitle = this.config.show_title && this.config.title;
    const showSubtitle = this.config.show_subtitle && this.config.subtitle;
    const showIcon = this.config.show_icon && this.config.icon;
    const titleStyle = `
            text-align: ${s2.title_align};
            font-size: ${s2.title_size};
            font-weight: ${s2.title_font_weight};
            color: ${s2.title_color};
            margin: 0;
        `;
    const subtitleStyle = `
            text-align: ${s2.subtitle_align};
            font-size: ${s2.subtitle_size};
            font-weight: ${s2.subtitle_font_weight};
            color: ${s2.subtitle_color};
            margin: 4px 0 0 0;
        `;
    const headerIconStyle = `
            font-size: ${s2.title_size};
            color: ${s2.title_color};
        `;
    return x`
            ${showTitle || showSubtitle ? x`
                <div class="card-header">
                    ${showIcon && showTitle ? x`
                        <div class="card-header-with-icon">
                            <ha-icon .icon=${this.config.icon} style="${headerIconStyle}"></ha-icon>
                            <h2 style="${titleStyle}">${this.config.title}</h2>
                        </div>
                    ` : showTitle ? x`
                        <h2 style="${titleStyle}">${this.config.title}</h2>
                    ` : ""}
                    ${showSubtitle ? x`
                        <p style="${subtitleStyle}">${this.config.subtitle}</p>
                    ` : ""}
                </div>
            ` : ""}
            ${this._renderInfoBar()}
            <div class="grid" style="gap: ${this.config.grid_gap};">
                ${this._renderPV()}
                ${this._renderBatterie()}
                ${this._renderHaus()}
                ${this._renderNetz()}
            </div>
        `;
  }
};
_PVMonitorCard.styles = pvMonitorCardStyles;
let PVMonitorCard = _PVMonitorCard;
__decorateClass([
  n2({ attribute: false })
], PVMonitorCard.prototype, "hass");
__decorateClass([
  n2()
], PVMonitorCard.prototype, "config");
if (!customElements.get(CARD_TAG)) {
  customElements.define(CARD_TAG, PVMonitorCard);
}
export {
  PVMonitorCard as P,
  i$3 as a,
  i,
  n2 as n,
  x
};
