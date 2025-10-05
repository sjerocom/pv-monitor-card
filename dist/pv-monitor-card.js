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
const r$4 = (t2) => new n$3("string" == typeof t2 ? t2 : t2 + "", void 0, s$2), i$3 = (t2, ...e2) => {
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
  return r$4(e2);
})(t2) : t2;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: i$2, defineProperty: e$1, getOwnPropertyDescriptor: h$1, getOwnPropertyNames: r$3, getOwnPropertySymbols: o$3, getPrototypeOf: n$2 } = Object, a$1 = globalThis, c$1 = a$1.trustedTypes, l$1 = c$1 ? c$1.emptyScript : "", p$1 = a$1.reactiveElementPolyfillSupport, d$1 = (t2, s2) => t2, u$1 = { toAttribute(t2, s2) {
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
      const t3 = this.properties, s2 = [...r$3(t3), ...o$3(t3)];
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
const t = globalThis, i$1 = t.trustedTypes, s$1 = i$1 ? i$1.createPolicy("lit-html", { createHTML: (t2) => t2 }) : void 0, e = "$lit$", h = `lit$${Math.random().toFixed(9).slice(2)}$`, o$2 = "?" + h, n$1 = `<${o$2}>`, r$2 = document, l = () => r$2.createComment(""), c = (t2) => null === t2 || "object" != typeof t2 && "function" != typeof t2, a = Array.isArray, u = (t2) => a(t2) || "function" == typeof t2?.[Symbol.iterator], d = "[ 	\n\f\r]", f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, _ = />/g, m = RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), p = /'/g, g = /"/g, $ = /^(?:script|style|textarea|title)$/i, y2 = (t2) => (i2, ...s2) => ({ _$litType$: t2, strings: i2, values: s2 }), x = y2(1), T = Symbol.for("lit-noChange"), E = Symbol.for("lit-nothing"), A = /* @__PURE__ */ new WeakMap(), C = r$2.createTreeWalker(r$2, 129);
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
    const s2 = r$2.createElement("template");
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
    const { el: { content: i2 }, parts: s2 } = this._$AD, e2 = (t2?.creationScope ?? r$2).importNode(i2, true);
    C.currentNode = e2;
    let h2 = C.nextNode(), o2 = 0, n3 = 0, l2 = s2[0];
    for (; void 0 !== l2; ) {
      if (o2 === l2.index) {
        let i3;
        2 === l2.type ? i3 = new R(h2, h2.nextSibling, this, t2) : 1 === l2.type ? i3 = new l2.ctor(h2, l2.name, l2.strings, this, t2) : 6 === l2.type && (i3 = new z(h2, this, t2)), this._$AV.push(i3), l2 = s2[++n3];
      }
      o2 !== l2?.index && (h2 = C.nextNode(), o2++);
    }
    return C.currentNode = r$2, e2;
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
    this._$AH !== E && c(this._$AH) ? this._$AA.nextSibling.data = t2 : this.T(r$2.createTextNode(t2)), this._$AH = t2;
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
const o = { attribute: true, type: String, converter: u$1, reflect: false, hasChanged: f$1 }, r$1 = (t2 = o, e2, r2) => {
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
  return (e2, o2) => "object" == typeof o2 ? r$1(t2, e2, o2) : ((t3, e3, o3) => {
    const r2 = e3.hasOwnProperty(o3);
    return e3.constructor.createProperty(o3, t3), r2 ? Object.getOwnPropertyDescriptor(e3, o3) : void 0;
  })(t2, e2, o2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function r(r2) {
  return n2({ ...r2, state: true, attribute: false });
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
    .card-header-text {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
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
const translations = {
  de: {
    general: {
      missing_entity: "fehlt",
      inactive: "Inaktiv"
    },
    editor: {
      tab_general: "Allgemein",
      tab_styling: "Styling",
      tab_infobar: "Info Bar",
      tab_pv: "PV-Anlage",
      tab_battery: "Batterie",
      tab_house: "Haus",
      tab_grid: "Netz",
      card_header: "Karten-Header",
      title: "Titel",
      title_placeholder: "PV Monitor",
      title_helper: "Leer lassen um auszublenden.",
      subtitle: "Untertitel",
      subtitle_placeholder: "Energieübersicht",
      subtitle_helper: "Leer lassen um auszublenden.",
      icon: "Icon",
      icon_helper: "Wird nur angezeigt, wenn auch ein Titel vorhanden ist, leer lassen um auszublenden.",
      layout: "Layout",
      grid_gap: "Grid Abstand",
      grid_gap_placeholder: "6px",
      grid_gap_helper: "Abstand zwischen den Karten.",
      header_margin_bottom: "Abstand Header zu Karten/Info Bar",
      header_margin_bottom_helper: "Abstand zwischen Titel/Untertitel und Info Bar/Karten",
      infobar_gap: "Abstand Info Bar zu Karten",
      infobar_gap_helper: "Abstand zwischen Info Bar und den 4 Karten",
      language: "Sprache",
      language_helper: "Wählen Sie die Anzeigesprache",
      central_entities: "Zentrale Entities",
      central_entities_helper: "Definieren Sie hier die Haupt-Entities für Berechnungen",
      entity_pv_production: "PV-Produktion Entity",
      entity_pv_production_helper: "Entity für PV-Leistung (wird für Berechnungen verwendet)",
      entity_battery_soc: "Batterie SOC Entity",
      entity_battery_soc_helper: "Entity für Batterieladezustand in % (für Berechnungen)",
      entity_battery_charge: "Batterie Laden Entity",
      entity_battery_charge_helper: "Entity für Batterie-Ladeleistung (für Berechnungen)",
      entity_battery_discharge: "Batterie Entladen Entity",
      entity_battery_discharge_helper: "Entity für Batterie-Entladeleistung (für Berechnungen)",
      entity_house_consumption: "Hausverbrauch Entity",
      entity_house_consumption_helper: "Entity für Hausverbrauch (für Autarkie-Berechnung, optional)",
      entity_grid_power: "Netz Entity",
      entity_grid_power_helper: "Entity für Netzbezug/Einspeisung (für Berechnungen)",
      central_config: "Zentrale Konfiguration",
      central_config_helper: "Diese Werte gelten für alle Karten",
      pv_max_power_label: "PV Max. Leistung (W)",
      pv_max_power_helper: "Maximale PV-Leistung für Animationen",
      battery_capacity_label: "Batteriekapazität (Wh)",
      battery_capacity_label_helper: "Kapazität der Batterie (z.B. 10000 für 10 kWh)",
      grid_threshold_label: "Netz-Schwellwert (W)",
      grid_threshold_helper: 'Unterhalb dieses Werts wird "Neutral" angezeigt',
      card_visibility: "Karten-Sichtbarkeit",
      show_pv_card: "PV-Karte anzeigen",
      show_battery_card: "Batterie-Karte anzeigen",
      show_house_card: "Haus-Karte anzeigen",
      show_grid_card: "Netz-Karte anzeigen",
      infobar_settings: "Info Bar Einstellungen",
      enable_infobar: "Info Bar aktivieren",
      infobar_position: "Info Bar Position",
      position_top: "Oben (über den Karten)",
      position_bottom: "Unten (unter den Karten)",
      calculation_mode: "Berechnung für Item 1",
      calculation_mode_helper: "Wählen Sie: Autarkie oder Eigenverbrauch",
      mode_autarky: "Autarkie (Selbstversorgungsgrad)",
      mode_self_consumption: "Eigenverbrauch (Selbstnutzungsgrad)",
      calculate_battery_times: "Batteriezeiten berechnen",
      calculate_battery_times_helper: "Automatische Berechnung für Item 2 (Restlaufzeit) und Item 3 (Restladezeit)",
      item: "Item",
      entity: "Entity",
      icon_label: "Icon",
      label: "Label",
      unit: "Einheit",
      default_autarky: "Autarkie",
      default_runtime: "Restlaufzeit",
      default_chargetime: "Restladezeit",
      pv_system: "PV-Anlage",
      pv_entity: "PV Entity",
      pv_entity_helper: "Entity für PV-Leistung",
      enable_animation: "Animation aktivieren",
      icon_rotation: "Icon Rotation",
      icon_rotation_helper: "Icon dreht sich je nach Leistung",
      max_power: "Max. Leistung (W)",
      max_power_helper: "Maximale PV-Leistung für Animation & Rotation",
      battery: "Batterie",
      battery_entity: "Batterie Entity",
      battery_entity_helper: "Entity für Batteriestand (%)",
      charge_entity: "Ladung Entity",
      charge_entity_helper: "Entity für Ladeleistung",
      discharge_entity: "Entladung Entity",
      discharge_entity_helper: "Entity für Entladeleistung",
      battery_capacity: "Batteriekapazität (Wh)",
      battery_capacity_helper: "Kapazität der Batterie für Animation (z.B. 10000 für 10 kWh)",
      calculate_runtime: "Rest-/Ladezeit berechnen",
      calculate_runtime_helper: "Automatische Berechnung für Info Bar Item 2 & 3",
      icon_auto_helper: "Leer lassen für automatisches Icon",
      house_consumption: "Hausverbrauch",
      house_entity: "Haus Entity",
      house_entity_helper: "Entity für Hausverbrauch",
      grid: "Netz",
      grid_entity: "Netz Entity",
      grid_entity_helper: "Entity für Netzbezug/Einspeisung",
      threshold: "Schwellwert (W)",
      threshold_helper: 'Unterhalb dieses Werts wird "Neutral" angezeigt',
      status_texts: "Status-Texte",
      text_feed_in: "Text bei Einspeisung",
      text_feed_in_placeholder: "Einspeisung",
      text_neutral: "Text bei Neutral",
      text_neutral_placeholder: "Neutral",
      text_consumption: "Text bei Bezug",
      text_consumption_placeholder: "Netzbezug",
      additional_texts: "Zusätzliche Texte",
      secondary_entity: "Sekundär Entity",
      secondary_entity_helper: "Optional: Entity für 2. Zeile",
      secondary_text: "Sekundär Text",
      secondary_text_helper: "Optional: Statischer Text für 2. Zeile",
      tertiary_entity: "Tertiär Entity",
      tertiary_text: "Tertiär Text",
      styling: "Styling",
      background_color: "Hintergrundfarbe",
      border_color: "Rahmenfarbe",
      primary_color: "Primärfarbe",
      secondary_color: "Sekundärfarbe",
      icon_color: "Icon Farbe",
      card_styling: "Karten-Styling",
      border_radius: "Border Radius",
      text_color: "Textfarbe",
      padding: "Padding",
      cursor: "Cursor",
      title_subtitle: "Titel & Untertitel",
      title_size: "Titel Größe",
      title_color: "Titel Farbe",
      title_alignment: "Titel Ausrichtung",
      title_alignment_helper: "left, center, right",
      title_font_weight: "Titel Font-Weight",
      subtitle_size: "Untertitel Größe",
      subtitle_color: "Untertitel Farbe",
      subtitle_alignment: "Untertitel Ausrichtung",
      subtitle_font_weight: "Untertitel Font-Weight",
      icons: "Icons",
      icon_size: "Icon Größe",
      icon_opacity: "Icon Opacity",
      icon_margin: "Icon Margin",
      primary_text_styling: "Primär-Text (Hauptwert)",
      primary_size: "Primär Größe",
      primary_color_label: "Primär Farbe",
      primary_opacity: "Primär Opacity",
      primary_font_weight: "Primär Font-Weight",
      secondary_text_styling: "Sekundär-Text (2. Zeile)",
      secondary_size: "Sekundär Größe",
      secondary_color_label: "Sekundär Farbe",
      secondary_opacity: "Sekundär Opacity",
      secondary_font_weight: "Sekundär Font-Weight",
      tertiary_text_styling: "Tertiär-Text (3. Zeile)",
      tertiary_size: "Tertiär Größe",
      tertiary_color_label: "Tertiär Farbe",
      tertiary_opacity: "Tertiär Opacity",
      tertiary_font_weight: "Tertiär Font-Weight",
      select_entity: "Entity auswählen",
      select_icon: "Icon auswählen",
      action_none: "Keine",
      action_more_info: "Mehr Info",
      action_navigate: "Navigieren",
      action_url: "URL",
      action_call_service: "Service aufrufen",
      theme: "Theme",
      theme_helper: "Wählen Sie ein vordefiniertes Farbthema",
      select_theme: "Theme auswählen"
    },
    status: {
      feed_in: "Einspeisung",
      neutral: "Neutral",
      grid_consumption: "Netzbezug",
      inactive: "Inaktiv"
    }
  },
  en: {
    general: {
      missing_entity: "missing",
      inactive: "Inactive"
    },
    editor: {
      tab_general: "General",
      tab_styling: "Styling",
      tab_infobar: "Info Bar",
      tab_pv: "PV System",
      tab_battery: "Battery",
      tab_house: "House",
      tab_grid: "Grid",
      card_header: "Card Header",
      title: "Title",
      title_placeholder: "PV Monitor",
      title_helper: "Leave empty to hide.",
      subtitle: "Subtitle",
      subtitle_placeholder: "Energy Overview",
      subtitle_helper: "Leave empty to hide.",
      icon: "Icon",
      icon_helper: "Only shown when a title is present, leave empty to hide.",
      layout: "Layout",
      grid_gap: "Grid Gap",
      grid_gap_placeholder: "6px",
      grid_gap_helper: "Space between cards.",
      header_margin_bottom: "Header to Cards/Info Bar Gap",
      header_margin_bottom_helper: "Space between title/subtitle and info bar/cards",
      infobar_gap: "Info Bar to Cards Gap",
      infobar_gap_helper: "Space between info bar and the 4 cards",
      language: "Language",
      language_helper: "Select display language",
      central_entities: "Central Entities",
      central_entities_helper: "Define the main entities for calculations here",
      entity_pv_production: "PV Production Entity",
      entity_pv_production_helper: "Entity for PV power (used for calculations)",
      entity_battery_soc: "Battery SOC Entity",
      entity_battery_soc_helper: "Entity for battery state of charge in % (for calculations)",
      entity_battery_charge: "Battery Charge Entity",
      entity_battery_charge_helper: "Entity for battery charging power (for calculations)",
      entity_battery_discharge: "Battery Discharge Entity",
      entity_battery_discharge_helper: "Entity for battery discharging power (for calculations)",
      entity_house_consumption: "House Consumption Entity",
      entity_house_consumption_helper: "Entity for house consumption (for autarky calculation, optional)",
      entity_grid_power: "Grid Entity",
      entity_grid_power_helper: "Entity for grid consumption/feed-in (for calculations)",
      central_config: "Central Configuration",
      central_config_helper: "These values apply to all cards",
      pv_max_power_label: "PV Max Power (W)",
      pv_max_power_helper: "Maximum PV power for animations",
      battery_capacity_label: "Battery Capacity (Wh)",
      battery_capacity_label_helper: "Battery capacity (e.g. 10000 for 10 kWh)",
      grid_threshold_label: "Grid Threshold (W)",
      grid_threshold_helper: 'Below this value "Neutral" is displayed',
      card_visibility: "Card Visibility",
      show_pv_card: "Show PV Card",
      show_battery_card: "Show Battery Card",
      show_house_card: "Show House Card",
      show_grid_card: "Show Grid Card",
      infobar_settings: "Info Bar Settings",
      enable_infobar: "Enable Info Bar",
      infobar_position: "Info Bar Position",
      position_top: "Top (above cards)",
      position_bottom: "Bottom (below cards)",
      calculation_mode: "Calculation for Item 1",
      calculation_mode_helper: "Choose: Autarky or Self-Consumption",
      mode_autarky: "Autarky (Self-Sufficiency)",
      mode_self_consumption: "Self-Consumption (Self-Usage)",
      calculate_battery_times: "Calculate Battery Times",
      calculate_battery_times_helper: "Automatic calculation for Item 2 (runtime) and Item 3 (charge time)",
      item: "Item",
      entity: "Entity",
      icon_label: "Icon",
      label: "Label",
      unit: "Unit",
      default_autarky: "Self-Sufficiency",
      default_runtime: "Battery Runtime",
      default_chargetime: "Charge Time",
      pv_system: "PV System",
      pv_entity: "PV Entity",
      pv_entity_helper: "Entity for PV power",
      enable_animation: "Enable Animation",
      icon_rotation: "Icon Rotation",
      icon_rotation_helper: "Icon rotates based on power",
      max_power: "Max. Power (W)",
      max_power_helper: "Maximum PV power for animation & rotation",
      battery: "Battery",
      battery_entity: "Battery Entity",
      battery_entity_helper: "Entity for battery level (%)",
      charge_entity: "Charge Entity",
      charge_entity_helper: "Entity for charging power",
      discharge_entity: "Discharge Entity",
      discharge_entity_helper: "Entity for discharging power",
      battery_capacity: "Battery Capacity (Wh)",
      battery_capacity_helper: "Battery capacity for animation (e.g. 10000 for 10 kWh)",
      calculate_runtime: "Calculate Runtime/Charge Time",
      calculate_runtime_helper: "Automatic calculation for Info Bar Item 2 & 3",
      icon_auto_helper: "Leave empty for automatic icon",
      house_consumption: "House Consumption",
      house_entity: "House Entity",
      house_entity_helper: "Entity for house consumption",
      grid: "Grid",
      grid_entity: "Grid Entity",
      grid_entity_helper: "Entity for grid consumption/feed-in",
      threshold: "Threshold (W)",
      threshold_helper: 'Below this value "Neutral" is displayed',
      status_texts: "Status Texts",
      text_feed_in: "Text for Feed-in",
      text_feed_in_placeholder: "Feed-in",
      text_neutral: "Text for Neutral",
      text_neutral_placeholder: "Neutral",
      text_consumption: "Text for Consumption",
      text_consumption_placeholder: "Grid Consumption",
      additional_texts: "Additional Texts",
      secondary_entity: "Secondary Entity",
      secondary_entity_helper: "Optional: Entity for 2nd line",
      secondary_text: "Secondary Text",
      secondary_text_helper: "Optional: Static text for 2nd line",
      tertiary_entity: "Tertiary Entity",
      tertiary_text: "Tertiary Text",
      styling: "Styling",
      background_color: "Background Color",
      border_color: "Border Color",
      primary_color: "Primary Color",
      secondary_color: "Secondary Color",
      icon_color: "Icon Color",
      card_styling: "Card Styling",
      border_radius: "Border Radius",
      text_color: "Text Color",
      padding: "Padding",
      cursor: "Cursor",
      title_subtitle: "Title & Subtitle",
      title_size: "Title Size",
      title_color: "Title Color",
      title_alignment: "Title Alignment",
      title_alignment_helper: "left, center, right",
      title_font_weight: "Title Font Weight",
      subtitle_size: "Subtitle Size",
      subtitle_color: "Subtitle Color",
      subtitle_alignment: "Subtitle Alignment",
      subtitle_font_weight: "Subtitle Font Weight",
      icons: "Icons",
      icon_size: "Icon Size",
      icon_opacity: "Icon Opacity",
      icon_margin: "Icon Margin",
      primary_text_styling: "Primary Text (Main Value)",
      primary_size: "Primary Size",
      primary_color_label: "Primary Color",
      primary_opacity: "Primary Opacity",
      primary_font_weight: "Primary Font Weight",
      secondary_text_styling: "Secondary Text (2nd Line)",
      secondary_size: "Secondary Size",
      secondary_color_label: "Secondary Color",
      secondary_opacity: "Secondary Opacity",
      secondary_font_weight: "Secondary Font Weight",
      tertiary_text_styling: "Tertiary Text (3rd Line)",
      tertiary_size: "Tertiary Size",
      tertiary_color_label: "Tertiary Color",
      tertiary_opacity: "Tertiary Opacity",
      tertiary_font_weight: "Tertiary Font Weight",
      select_entity: "Select Entity",
      select_icon: "Select Icon",
      action_none: "None",
      action_more_info: "More Info",
      action_navigate: "Navigate",
      action_url: "URL",
      action_call_service: "Call Service",
      theme: "Theme",
      theme_helper: "Select a predefined color theme",
      select_theme: "Select Theme"
    },
    status: {
      feed_in: "Feed-in",
      neutral: "Neutral",
      grid_consumption: "Grid Consumption",
      inactive: "Inactive"
    }
  },
  fr: {
    general: {
      missing_entity: "manquant",
      inactive: "Inactif"
    },
    editor: {
      tab_general: "Général",
      tab_styling: "Style",
      tab_infobar: "Barre d'Info",
      tab_pv: "Installation PV",
      tab_battery: "Batterie",
      tab_house: "Maison",
      tab_grid: "Réseau",
      card_header: "En-tête de Carte",
      title: "Titre",
      title_placeholder: "Moniteur PV",
      title_helper: "Laisser vide pour masquer.",
      subtitle: "Sous-titre",
      subtitle_placeholder: "Aperçu Énergétique",
      subtitle_helper: "Laisser vide pour masquer.",
      icon: "Icône",
      icon_helper: "Affiché uniquement si un titre est présent, laisser vide pour masquer.",
      layout: "Disposition",
      grid_gap: "Espacement Grille",
      grid_gap_placeholder: "6px",
      grid_gap_helper: "Espace entre les cartes.",
      header_margin_bottom: "Espace En-tête vers Cartes/Barre Info",
      header_margin_bottom_helper: "Espace entre titre/sous-titre et barre info/cartes",
      infobar_gap: "Espace Barre Info vers Cartes",
      infobar_gap_helper: "Espace entre la barre info et les 4 cartes",
      language: "Langue",
      language_helper: "Sélectionner la langue d'affichage",
      central_entities: "Entités Centrales",
      central_entities_helper: "Définissez ici les entités principales pour les calculs",
      entity_pv_production: "Entité Production PV",
      entity_pv_production_helper: "Entité pour la puissance PV (utilisée pour les calculs)",
      entity_battery_soc: "Entité SOC Batterie",
      entity_battery_soc_helper: "Entité pour l'état de charge de la batterie en % (pour les calculs)",
      entity_battery_charge: "Entité Charge Batterie",
      entity_battery_charge_helper: "Entité pour la puissance de charge (pour les calculs)",
      entity_battery_discharge: "Entité Décharge Batterie",
      entity_battery_discharge_helper: "Entité pour la puissance de décharge (pour les calculs)",
      entity_house_consumption: "Entité Consommation Maison",
      entity_house_consumption_helper: "Entité pour la consommation maison (pour calcul autosuffisance, optionnel)",
      entity_grid_power: "Entité Réseau",
      entity_grid_power_helper: "Entité pour consommation/injection réseau (pour les calculs)",
      central_config: "Configuration Centrale",
      central_config_helper: "Ces valeurs s'appliquent à toutes les cartes",
      pv_max_power_label: "Puissance Max PV (W)",
      pv_max_power_helper: "Puissance PV maximale pour les animations",
      battery_capacity_label: "Capacité Batterie (Wh)",
      battery_capacity_label_helper: "Capacité de la batterie (ex: 10000 pour 10 kWh)",
      grid_threshold_label: "Seuil Réseau (W)",
      grid_threshold_helper: 'En dessous de cette valeur "Neutre" est affiché',
      card_visibility: "Visibilité des Cartes",
      show_pv_card: "Afficher Carte PV",
      show_battery_card: "Afficher Carte Batterie",
      show_house_card: "Afficher Carte Maison",
      show_grid_card: "Afficher Carte Réseau",
      infobar_settings: "Paramètres Barre d'Info",
      enable_infobar: "Activer la Barre d'Info",
      infobar_position: "Position Barre d'Info",
      position_top: "Haut (au-dessus des cartes)",
      position_bottom: "Bas (en dessous des cartes)",
      calculation_mode: "Calcul pour Élément 1",
      calculation_mode_helper: "Choisir: Autosuffisance ou Autoconsommation",
      mode_autarky: "Autosuffisance",
      mode_self_consumption: "Autoconsommation",
      calculate_battery_times: "Calculer Temps Batterie",
      calculate_battery_times_helper: "Calcul automatique pour Élément 2 (autonomie) et Élément 3 (temps de charge)",
      item: "Élément",
      entity: "Entité",
      icon_label: "Icône",
      label: "Libellé",
      unit: "Unité",
      default_autarky: "Autosuffisance",
      default_runtime: "Autonomie Batterie",
      default_chargetime: "Temps de Charge",
      pv_system: "Installation PV",
      pv_entity: "Entité PV",
      pv_entity_helper: "Entité pour la puissance PV",
      enable_animation: "Activer l'Animation",
      icon_rotation: "Rotation d'Icône",
      icon_rotation_helper: "L'icône tourne selon la puissance",
      max_power: "Puissance Max. (W)",
      max_power_helper: "Puissance PV maximale pour animation & rotation",
      battery: "Batterie",
      battery_entity: "Entité Batterie",
      battery_entity_helper: "Entité pour le niveau de batterie (%)",
      charge_entity: "Entité Charge",
      charge_entity_helper: "Entité pour la puissance de charge",
      discharge_entity: "Entité Décharge",
      discharge_entity_helper: "Entité pour la puissance de décharge",
      battery_capacity: "Capacité Batterie (Wh)",
      battery_capacity_helper: "Capacité de la batterie pour animation (ex: 10000 pour 10 kWh)",
      calculate_runtime: "Calculer Autonomie/Temps de Charge",
      calculate_runtime_helper: "Calcul automatique pour Barre d'Info Élément 2 & 3",
      icon_auto_helper: "Laisser vide pour icône automatique",
      house_consumption: "Consommation Maison",
      house_entity: "Entité Maison",
      house_entity_helper: "Entité pour consommation de la maison",
      grid: "Réseau",
      grid_entity: "Entité Réseau",
      grid_entity_helper: "Entité pour consommation/injection réseau",
      threshold: "Seuil (W)",
      threshold_helper: 'En dessous de cette valeur "Neutre" est affiché',
      status_texts: "Textes de Statut",
      text_feed_in: "Texte pour Injection",
      text_feed_in_placeholder: "Injection",
      text_neutral: "Texte pour Neutre",
      text_neutral_placeholder: "Neutre",
      text_consumption: "Texte pour Consommation",
      text_consumption_placeholder: "Consommation Réseau",
      additional_texts: "Textes Supplémentaires",
      secondary_entity: "Entité Secondaire",
      secondary_entity_helper: "Optionnel: Entité pour 2ème ligne",
      secondary_text: "Texte Secondaire",
      secondary_text_helper: "Optionnel: Texte statique pour 2ème ligne",
      tertiary_entity: "Entité Tertiaire",
      tertiary_text: "Texte Tertiaire",
      styling: "Style",
      background_color: "Couleur de Fond",
      border_color: "Couleur de Bordure",
      primary_color: "Couleur Primaire",
      secondary_color: "Couleur Secondaire",
      icon_color: "Couleur d'Icône",
      card_styling: "Style de Carte",
      border_radius: "Rayon de Bordure",
      text_color: "Couleur de Texte",
      padding: "Espacement",
      cursor: "Curseur",
      title_subtitle: "Titre & Sous-titre",
      title_size: "Taille Titre",
      title_color: "Couleur Titre",
      title_alignment: "Alignement Titre",
      title_alignment_helper: "left, center, right",
      title_font_weight: "Épaisseur Police Titre",
      subtitle_size: "Taille Sous-titre",
      subtitle_color: "Couleur Sous-titre",
      subtitle_alignment: "Alignement Sous-titre",
      subtitle_font_weight: "Épaisseur Police Sous-titre",
      icons: "Icônes",
      icon_size: "Taille Icône",
      icon_opacity: "Opacité Icône",
      icon_margin: "Marge Icône",
      primary_text_styling: "Texte Primaire (Valeur Principale)",
      primary_size: "Taille Primaire",
      primary_color_label: "Couleur Primaire",
      primary_opacity: "Opacité Primaire",
      primary_font_weight: "Épaisseur Police Primaire",
      secondary_text_styling: "Texte Secondaire (2ème Ligne)",
      secondary_size: "Taille Secondaire",
      secondary_color_label: "Couleur Secondaire",
      secondary_opacity: "Opacité Secondaire",
      secondary_font_weight: "Épaisseur Police Secondaire",
      tertiary_text_styling: "Texte Tertiaire (3ème Ligne)",
      tertiary_size: "Taille Tertiaire",
      tertiary_color_label: "Couleur Tertiaire",
      tertiary_opacity: "Opacité Tertiaire",
      tertiary_font_weight: "Épaisseur Police Tertiaire",
      select_entity: "Sélectionner Entité",
      select_icon: "Sélectionner Icône",
      action_none: "Aucune",
      action_more_info: "Plus d'Info",
      action_navigate: "Naviguer",
      action_url: "URL",
      action_call_service: "Appeler Service",
      theme: "Thème",
      theme_helper: "Sélectionner un thème de couleur prédéfini",
      select_theme: "Sélectionner Thème"
    },
    status: {
      feed_in: "Injection",
      neutral: "Neutre",
      grid_consumption: "Consommation Réseau",
      inactive: "Inactif"
    }
  },
  it: {
    general: {
      missing_entity: "mancante",
      inactive: "Inattivo"
    },
    editor: {
      tab_general: "Generale",
      tab_styling: "Stile",
      tab_infobar: "Barra Info",
      tab_pv: "Impianto FV",
      tab_battery: "Batteria",
      tab_house: "Casa",
      tab_grid: "Rete",
      card_header: "Intestazione Scheda",
      title: "Titolo",
      title_placeholder: "Monitor FV",
      title_helper: "Lasciare vuoto per nascondere.",
      subtitle: "Sottotitolo",
      subtitle_placeholder: "Panoramica Energia",
      subtitle_helper: "Lasciare vuoto per nascondere.",
      icon: "Icona",
      icon_helper: "Mostrato solo se è presente un titolo, lasciare vuoto per nascondere.",
      layout: "Layout",
      grid_gap: "Spaziatura Griglia",
      grid_gap_placeholder: "6px",
      grid_gap_helper: "Spazio tra le schede.",
      header_margin_bottom: "Spazio Intestazione a Schede/Barra Info",
      header_margin_bottom_helper: "Spazio tra titolo/sottotitolo e barra info/schede",
      infobar_gap: "Spazio Barra Info a Schede",
      infobar_gap_helper: "Spazio tra barra info e le 4 schede",
      language: "Lingua",
      language_helper: "Seleziona lingua di visualizzazione",
      central_entities: "Entità Centrali",
      central_entities_helper: "Definisci qui le entità principali per i calcoli",
      entity_pv_production: "Entità Produzione FV",
      entity_pv_production_helper: "Entità per potenza FV (usata per i calcoli)",
      entity_battery_soc: "Entità SOC Batteria",
      entity_battery_soc_helper: "Entità per stato di carica batteria in % (per i calcoli)",
      entity_battery_charge: "Entità Carica Batteria",
      entity_battery_charge_helper: "Entità per potenza di carica (per i calcoli)",
      entity_battery_discharge: "Entità Scarica Batteria",
      entity_battery_discharge_helper: "Entità per potenza di scarica (per i calcoli)",
      entity_house_consumption: "Entità Consumo Casa",
      entity_house_consumption_helper: "Entità per consumo casa (per calcolo autosufficienza, opzionale)",
      entity_grid_power: "Entità Rete",
      entity_grid_power_helper: "Entità per consumo/immissione rete (per i calcoli)",
      central_config: "Configurazione Centrale",
      central_config_helper: "Questi valori si applicano a tutte le schede",
      pv_max_power_label: "Potenza Max FV (W)",
      pv_max_power_helper: "Potenza FV massima per le animazioni",
      battery_capacity_label: "Capacità Batteria (Wh)",
      battery_capacity_label_helper: "Capacità della batteria (es: 10000 per 10 kWh)",
      grid_threshold_label: "Soglia Rete (W)",
      grid_threshold_helper: 'Sotto questo valore viene visualizzato "Neutrale"',
      card_visibility: "Visibilità Schede",
      show_pv_card: "Mostra Scheda FV",
      show_battery_card: "Mostra Scheda Batteria",
      show_house_card: "Mostra Scheda Casa",
      show_grid_card: "Mostra Scheda Rete",
      infobar_settings: "Impostazioni Barra Info",
      enable_infobar: "Attiva Barra Info",
      infobar_position: "Posizione Barra Info",
      position_top: "Alto (sopra le schede)",
      position_bottom: "Basso (sotto le schede)",
      calculation_mode: "Calcolo per Elemento 1",
      calculation_mode_helper: "Scegli: Autosufficienza o Autoconsumo",
      mode_autarky: "Autosufficienza",
      mode_self_consumption: "Autoconsumo",
      calculate_battery_times: "Calcola Tempi Batteria",
      calculate_battery_times_helper: "Calcolo automatico per Elemento 2 (autonomia) e Elemento 3 (tempo di ricarica)",
      item: "Elemento",
      entity: "Entità",
      icon_label: "Icona",
      label: "Etichetta",
      unit: "Unità",
      default_autarky: "Autosufficienza",
      default_runtime: "Autonomia Batteria",
      default_chargetime: "Tempo di Ricarica",
      pv_system: "Impianto FV",
      pv_entity: "Entità FV",
      pv_entity_helper: "Entità per potenza FV",
      enable_animation: "Attiva Animazione",
      icon_rotation: "Rotazione Icona",
      icon_rotation_helper: "L'icona ruota in base alla potenza",
      max_power: "Potenza Max. (W)",
      max_power_helper: "Potenza FV massima per animazione & rotazione",
      battery: "Batteria",
      battery_entity: "Entità Batteria",
      battery_entity_helper: "Entità per livello batteria (%)",
      charge_entity: "Entità Carica",
      charge_entity_helper: "Entità per potenza di carica",
      discharge_entity: "Entità Scarica",
      discharge_entity_helper: "Entità per potenza di scarica",
      battery_capacity: "Capacità Batteria (Wh)",
      battery_capacity_helper: "Capacità della batteria per animazione (es. 10000 per 10 kWh)",
      calculate_runtime: "Calcola Autonomia/Tempo di Ricarica",
      calculate_runtime_helper: "Calcolo automatico per Barra Info Elemento 2 & 3",
      icon_auto_helper: "Lasciare vuoto per icona automatica",
      house_consumption: "Consumo Casa",
      house_entity: "Entità Casa",
      house_entity_helper: "Entità per consumo casa",
      grid: "Rete",
      grid_entity: "Entità Rete",
      grid_entity_helper: "Entità per consumo/immissione rete",
      threshold: "Soglia (W)",
      threshold_helper: 'Sotto questo valore viene visualizzato "Neutrale"',
      status_texts: "Testi di Stato",
      text_feed_in: "Testo per Immissione",
      text_feed_in_placeholder: "Immissione",
      text_neutral: "Testo per Neutrale",
      text_neutral_placeholder: "Neutrale",
      text_consumption: "Testo per Consumo",
      text_consumption_placeholder: "Consumo Rete",
      additional_texts: "Testi Aggiuntivi",
      secondary_entity: "Entità Secondaria",
      secondary_entity_helper: "Opzionale: Entità per 2a riga",
      secondary_text: "Testo Secondario",
      secondary_text_helper: "Opzionale: Testo statico per 2a riga",
      tertiary_entity: "Entità Terziaria",
      tertiary_text: "Testo Terziario",
      styling: "Stile",
      background_color: "Colore Sfondo",
      border_color: "Colore Bordo",
      primary_color: "Colore Primario",
      secondary_color: "Colore Secondario",
      icon_color: "Colore Icona",
      card_styling: "Stile Scheda",
      border_radius: "Raggio Bordo",
      text_color: "Colore Testo",
      padding: "Spaziatura",
      cursor: "Cursore",
      title_subtitle: "Titolo & Sottotitolo",
      title_size: "Dimensione Titolo",
      title_color: "Colore Titolo",
      title_alignment: "Allineamento Titolo",
      title_alignment_helper: "left, center, right",
      title_font_weight: "Spessore Font Titolo",
      subtitle_size: "Dimensione Sottotitolo",
      subtitle_color: "Colore Sottotitolo",
      subtitle_alignment: "Allineamento Sottotitolo",
      subtitle_font_weight: "Spessore Font Sottotitolo",
      icons: "Icone",
      icon_size: "Dimensione Icona",
      icon_opacity: "Opacità Icona",
      icon_margin: "Margine Icona",
      primary_text_styling: "Testo Primario (Valore Principale)",
      primary_size: "Dimensione Primaria",
      primary_color_label: "Colore Primario",
      primary_opacity: "Opacità Primaria",
      primary_font_weight: "Spessore Font Primario",
      secondary_text_styling: "Testo Secondario (2a Riga)",
      secondary_size: "Dimensione Secondaria",
      secondary_color_label: "Colore Secondario",
      secondary_opacity: "Opacità Secondaria",
      secondary_font_weight: "Spessore Font Secondario",
      tertiary_text_styling: "Testo Terziario (3a Riga)",
      tertiary_size: "Dimensione Terziaria",
      tertiary_color_label: "Colore Terziario",
      tertiary_opacity: "Opacità Terziaria",
      tertiary_font_weight: "Spessore Font Terziario",
      select_entity: "Seleziona Entità",
      select_icon: "Seleziona Icona",
      action_none: "Nessuna",
      action_more_info: "Più Info",
      action_navigate: "Naviga",
      action_url: "URL",
      action_call_service: "Chiama Servizio",
      theme: "Tema",
      theme_helper: "Seleziona un tema di colori predefinito",
      select_theme: "Seleziona Tema"
    },
    status: {
      feed_in: "Immissione",
      neutral: "Neutrale",
      grid_consumption: "Consumo Rete",
      inactive: "Inattivo"
    }
  },
  es: {
    general: {
      missing_entity: "falta",
      inactive: "Inactivo"
    },
    editor: {
      tab_general: "General",
      tab_styling: "Estilo",
      tab_infobar: "Barra Info",
      tab_pv: "Sistema FV",
      tab_battery: "Batería",
      tab_house: "Casa",
      tab_grid: "Red",
      card_header: "Encabezado de Tarjeta",
      title: "Título",
      title_placeholder: "Monitor FV",
      title_helper: "Dejar vacío para ocultar.",
      subtitle: "Subtítulo",
      subtitle_placeholder: "Resumen de Energía",
      subtitle_helper: "Dejar vacío para ocultar.",
      icon: "Icono",
      icon_helper: "Solo se muestra cuando hay un título, dejar vacío para ocultar.",
      layout: "Diseño",
      grid_gap: "Espaciado Cuadrícula",
      grid_gap_placeholder: "6px",
      grid_gap_helper: "Espacio entre tarjetas.",
      header_margin_bottom: "Espacio Encabezado a Tarjetas/Barra Info",
      header_margin_bottom_helper: "Espacio entre título/subtítulo y barra info/tarjetas",
      infobar_gap: "Espacio Barra Info a Tarjetas",
      infobar_gap_helper: "Espacio entre barra info y las 4 tarjetas",
      language: "Idioma",
      language_helper: "Seleccionar idioma de visualización",
      central_entities: "Entidades Centrales",
      central_entities_helper: "Defina aquí las entidades principales para los cálculos",
      entity_pv_production: "Entidad Producción FV",
      entity_pv_production_helper: "Entidad para potencia FV (usada para cálculos)",
      entity_battery_soc: "Entidad SOC Batería",
      entity_battery_soc_helper: "Entidad para estado de carga de batería en % (para cálculos)",
      entity_battery_charge: "Entidad Carga Batería",
      entity_battery_charge_helper: "Entidad para potencia de carga (para cálculos)",
      entity_battery_discharge: "Entidad Descarga Batería",
      entity_battery_discharge_helper: "Entidad para potencia de descarga (para cálculos)",
      entity_house_consumption: "Entidad Consumo Casa",
      entity_house_consumption_helper: "Entidad para consumo casa (para cálculo autosuficiencia, opcional)",
      entity_grid_power: "Entidad Red",
      entity_grid_power_helper: "Entidad para consumo/inyección red (para cálculos)",
      central_config: "Configuración Central",
      central_config_helper: "Estos valores se aplican a todas las tarjetas",
      pv_max_power_label: "Potencia Máx FV (W)",
      pv_max_power_helper: "Potencia FV máxima para animaciones",
      battery_capacity_label: "Capacidad Batería (Wh)",
      battery_capacity_label_helper: "Capacidad de la batería (ej: 10000 para 10 kWh)",
      grid_threshold_label: "Umbral Red (W)",
      grid_threshold_helper: 'Por debajo de este valor se muestra "Neutro"',
      card_visibility: "Visibilidad Tarjetas",
      show_pv_card: "Mostrar Tarjeta FV",
      show_battery_card: "Mostrar Tarjeta Batería",
      show_house_card: "Mostrar Tarjeta Casa",
      show_grid_card: "Mostrar Tarjeta Red",
      infobar_settings: "Configuración Barra Info",
      enable_infobar: "Activar Barra Info",
      infobar_position: "Posición Barra Info",
      position_top: "Arriba (sobre las tarjetas)",
      position_bottom: "Abajo (debajo de las tarjetas)",
      calculation_mode: "Cálculo para Elemento 1",
      calculation_mode_helper: "Elegir: Autosuficiencia o Autoconsumo",
      mode_autarky: "Autosuficiencia",
      mode_self_consumption: "Autoconsumo",
      calculate_battery_times: "Calcular Tiempos Batería",
      calculate_battery_times_helper: "Cálculo automático para Elemento 2 (autonomía) y Elemento 3 (tiempo de carga)",
      item: "Elemento",
      entity: "Entidad",
      icon_label: "Icono",
      label: "Etiqueta",
      unit: "Unidad",
      default_autarky: "Autosuficiencia",
      default_runtime: "Autonomía Batería",
      default_chargetime: "Tiempo de Carga",
      pv_system: "Sistema FV",
      pv_entity: "Entidad FV",
      pv_entity_helper: "Entidad para potencia FV",
      enable_animation: "Activar Animación",
      icon_rotation: "Rotación Icono",
      icon_rotation_helper: "El icono gira según la potencia",
      max_power: "Potencia Máx. (W)",
      max_power_helper: "Potencia FV máxima para animación y rotación",
      battery: "Batería",
      battery_entity: "Entidad Batería",
      battery_entity_helper: "Entidad para nivel de batería (%)",
      charge_entity: "Entidad Carga",
      charge_entity_helper: "Entidad para potencia de carga",
      discharge_entity: "Entidad Descarga",
      discharge_entity_helper: "Entidad para potencia de descarga",
      battery_capacity: "Capacidad Batería (Wh)",
      battery_capacity_helper: "Capacidad de la batería para animación (ej: 10000 para 10 kWh)",
      calculate_runtime: "Calcular Autonomía/Tiempo de Carga",
      calculate_runtime_helper: "Cálculo automático para Barra Info Elemento 2 y 3",
      icon_auto_helper: "Dejar vacío para icono automático",
      house_consumption: "Consumo Casa",
      house_entity: "Entidad Casa",
      house_entity_helper: "Entidad para consumo de la casa",
      grid: "Red",
      grid_entity: "Entidad Red",
      grid_entity_helper: "Entidad para consumo/inyección de red",
      threshold: "Umbral (W)",
      threshold_helper: 'Por debajo de este valor se muestra "Neutro"',
      status_texts: "Textos de Estado",
      text_feed_in: "Texto para Inyección",
      text_feed_in_placeholder: "Inyección",
      text_neutral: "Texto para Neutro",
      text_neutral_placeholder: "Neutro",
      text_consumption: "Texto para Consumo",
      text_consumption_placeholder: "Consumo Red",
      additional_texts: "Textos Adicionales",
      secondary_entity: "Entidad Secundaria",
      secondary_entity_helper: "Opcional: Entidad para 2ª línea",
      secondary_text: "Texto Secundario",
      secondary_text_helper: "Opcional: Texto estático para 2ª línea",
      tertiary_entity: "Entidad Terciaria",
      tertiary_text: "Texto Terciario",
      styling: "Estilo",
      background_color: "Color de Fondo",
      border_color: "Color de Borde",
      primary_color: "Color Primario",
      secondary_color: "Color Secundario",
      icon_color: "Color Icono",
      card_styling: "Estilo de Tarjeta",
      border_radius: "Radio de Borde",
      text_color: "Color de Texto",
      padding: "Espaciado",
      cursor: "Cursor",
      title_subtitle: "Título y Subtítulo",
      title_size: "Tamaño Título",
      title_color: "Color Título",
      title_alignment: "Alineación Título",
      title_alignment_helper: "left, center, right",
      title_font_weight: "Grosor Fuente Título",
      subtitle_size: "Tamaño Subtítulo",
      subtitle_color: "Color Subtítulo",
      subtitle_alignment: "Alineación Subtítulo",
      subtitle_font_weight: "Grosor Fuente Subtítulo",
      icons: "Iconos",
      icon_size: "Tamaño Icono",
      icon_opacity: "Opacidad Icono",
      icon_margin: "Margen Icono",
      primary_text_styling: "Texto Primario (Valor Principal)",
      primary_size: "Tamaño Primario",
      primary_color_label: "Color Primario",
      primary_opacity: "Opacidad Primaria",
      primary_font_weight: "Grosor Fuente Primaria",
      secondary_text_styling: "Texto Secundario (2ª Línea)",
      secondary_size: "Tamaño Secundario",
      secondary_color_label: "Color Secundario",
      secondary_opacity: "Opacidad Secundaria",
      secondary_font_weight: "Grosor Fuente Secundaria",
      tertiary_text_styling: "Texto Terciario (3ª Línea)",
      tertiary_size: "Tamaño Terciario",
      tertiary_color_label: "Color Terciario",
      tertiary_opacity: "Opacidad Terciaria",
      tertiary_font_weight: "Grosor Fuente Terciaria",
      select_entity: "Seleccionar Entidad",
      select_icon: "Seleccionar Icono",
      action_none: "Ninguna",
      action_more_info: "Más Info",
      action_navigate: "Navegar",
      action_url: "URL",
      action_call_service: "Llamar Servicio",
      theme: "Tema",
      theme_helper: "Seleccionar un tema de colores predefinido",
      select_theme: "Seleccionar Tema"
    },
    status: {
      feed_in: "Inyección",
      neutral: "Neutro",
      grid_consumption: "Consumo Red",
      inactive: "Inactivo"
    }
  }
};
function detectLanguage() {
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("de")) return "de";
  if (browserLang.startsWith("fr")) return "fr";
  if (browserLang.startsWith("it")) return "it";
  if (browserLang.startsWith("es")) return "es";
  return "en";
}
function getTranslations(language) {
  const lang = language || detectLanguage();
  return translations[lang] || translations.en;
}
const defaultThemes = {
  dark: {
    id: "dark",
    name: "Dark",
    colors: {
      card_background_color: "rgba(21, 20, 27, 1)",
      card_border_color: "rgba(255, 255, 255, 0.1)",
      card_text_color: "white",
      primary_color: "white",
      secondary_color: "white",
      title_color: "white",
      subtitle_color: "rgba(255, 255, 255, 0.7)",
      infobar_background_color: "rgba(21, 20, 27, 1)",
      infobar_border_color: "rgba(255, 255, 255, 0.1)",
      infobar_icon_color: "white",
      infobar_label_color: "rgba(255, 255, 255, 0.7)",
      infobar_value_color: "white"
    }
  },
  light: {
    id: "light",
    name: "Light",
    colors: {
      card_background_color: "rgba(255, 255, 255, 1)",
      card_border_color: "rgba(0, 0, 0, 0.1)",
      card_text_color: "rgba(0, 0, 0, 0.87)",
      primary_color: "rgba(0, 0, 0, 0.87)",
      secondary_color: "rgba(0, 0, 0, 0.6)",
      title_color: "rgba(0, 0, 0, 0.87)",
      subtitle_color: "rgba(0, 0, 0, 0.6)",
      infobar_background_color: "rgba(250, 250, 250, 1)",
      infobar_border_color: "rgba(0, 0, 0, 0.1)",
      infobar_icon_color: "rgba(0, 0, 0, 0.6)",
      infobar_label_color: "rgba(0, 0, 0, 0.6)",
      infobar_value_color: "rgba(0, 0, 0, 0.87)"
    }
  },
  blue: {
    id: "blue",
    name: "Blue",
    colors: {
      card_background_color: "rgba(15, 23, 42, 1)",
      card_border_color: "rgba(59, 130, 246, 0.3)",
      card_text_color: "rgba(226, 232, 240, 1)",
      primary_color: "rgba(96, 165, 250, 1)",
      secondary_color: "rgba(147, 197, 253, 0.8)",
      title_color: "rgba(96, 165, 250, 1)",
      subtitle_color: "rgba(148, 163, 184, 1)",
      infobar_background_color: "rgba(30, 41, 59, 1)",
      infobar_border_color: "rgba(59, 130, 246, 0.3)",
      infobar_icon_color: "rgba(96, 165, 250, 1)",
      infobar_label_color: "rgba(148, 163, 184, 1)",
      infobar_value_color: "rgba(226, 232, 240, 1)"
    }
  },
  green: {
    id: "green",
    name: "Green",
    colors: {
      card_background_color: "rgba(20, 30, 20, 1)",
      card_border_color: "rgba(34, 197, 94, 0.3)",
      card_text_color: "rgba(240, 253, 244, 1)",
      primary_color: "rgba(74, 222, 128, 1)",
      secondary_color: "rgba(134, 239, 172, 0.8)",
      title_color: "rgba(74, 222, 128, 1)",
      subtitle_color: "rgba(187, 247, 208, 0.7)",
      infobar_background_color: "rgba(22, 40, 25, 1)",
      infobar_border_color: "rgba(34, 197, 94, 0.3)",
      infobar_icon_color: "rgba(74, 222, 128, 1)",
      infobar_label_color: "rgba(187, 247, 208, 0.7)",
      infobar_value_color: "rgba(240, 253, 244, 1)"
    }
  },
  monochrome: {
    id: "monochrome",
    name: "Monochrome",
    colors: {
      card_background_color: "rgba(30, 30, 30, 1)",
      card_border_color: "rgba(128, 128, 128, 0.3)",
      card_text_color: "rgba(220, 220, 220, 1)",
      primary_color: "rgba(240, 240, 240, 1)",
      secondary_color: "rgba(180, 180, 180, 1)",
      title_color: "rgba(255, 255, 255, 1)",
      subtitle_color: "rgba(160, 160, 160, 1)",
      infobar_background_color: "rgba(40, 40, 40, 1)",
      infobar_border_color: "rgba(128, 128, 128, 0.3)",
      infobar_icon_color: "rgba(200, 200, 200, 1)",
      infobar_label_color: "rgba(160, 160, 160, 1)",
      infobar_value_color: "rgba(220, 220, 220, 1)"
    }
  },
  solarized: {
    id: "solarized",
    name: "Solarized Dark",
    colors: {
      card_background_color: "rgba(0, 43, 54, 1)",
      // base03
      card_border_color: "rgba(88, 110, 117, 0.3)",
      // base01
      card_text_color: "rgba(131, 148, 150, 1)",
      // base0
      primary_color: "rgba(147, 161, 161, 1)",
      // base1
      secondary_color: "rgba(131, 148, 150, 0.8)",
      // base0
      title_color: "rgba(38, 139, 210, 1)",
      // blue
      subtitle_color: "rgba(101, 123, 131, 1)",
      // base00
      infobar_background_color: "rgba(7, 54, 66, 1)",
      // base02
      infobar_border_color: "rgba(88, 110, 117, 0.3)",
      // base01
      infobar_icon_color: "rgba(42, 161, 152, 1)",
      // cyan
      infobar_label_color: "rgba(101, 123, 131, 1)",
      // base00
      infobar_value_color: "rgba(147, 161, 161, 1)"
      // base1
    }
  },
  nord: {
    id: "nord",
    name: "Nord",
    colors: {
      card_background_color: "rgba(46, 52, 64, 1)",
      // nord0
      card_border_color: "rgba(136, 192, 208, 0.3)",
      // nord8
      card_text_color: "rgba(236, 239, 244, 1)",
      // nord6
      primary_color: "rgba(216, 222, 233, 1)",
      // nord5
      secondary_color: "rgba(229, 233, 240, 0.8)",
      // nord4
      title_color: "rgba(136, 192, 208, 1)",
      // nord8
      subtitle_color: "rgba(216, 222, 233, 0.7)",
      // nord5
      infobar_background_color: "rgba(59, 66, 82, 1)",
      // nord1
      infobar_border_color: "rgba(136, 192, 208, 0.3)",
      // nord8
      infobar_icon_color: "rgba(143, 188, 187, 1)",
      // nord7
      infobar_label_color: "rgba(216, 222, 233, 0.7)",
      // nord5
      infobar_value_color: "rgba(236, 239, 244, 1)"
      // nord6
    }
  },
  dracula: {
    id: "dracula",
    name: "Dracula",
    colors: {
      card_background_color: "rgba(40, 42, 54, 1)",
      // background
      card_border_color: "rgba(189, 147, 249, 0.3)",
      // purple
      card_text_color: "rgba(248, 248, 242, 1)",
      // foreground
      primary_color: "rgba(139, 233, 253, 1)",
      // cyan
      secondary_color: "rgba(248, 248, 242, 0.8)",
      // foreground
      title_color: "rgba(189, 147, 249, 1)",
      // purple
      subtitle_color: "rgba(248, 248, 242, 0.7)",
      // foreground
      infobar_background_color: "rgba(68, 71, 90, 1)",
      // current line
      infobar_border_color: "rgba(189, 147, 249, 0.3)",
      // purple
      infobar_icon_color: "rgba(255, 121, 198, 1)",
      // pink
      infobar_label_color: "rgba(248, 248, 242, 0.7)",
      // foreground
      infobar_value_color: "rgba(248, 248, 242, 1)"
      // foreground
    }
  },
  catppuccin: {
    id: "catppuccin",
    name: "Catppuccin Mocha",
    colors: {
      card_background_color: "rgba(30, 30, 46, 1)",
      // base
      card_border_color: "rgba(137, 180, 250, 0.3)",
      // blue
      card_text_color: "rgba(205, 214, 244, 1)",
      // text
      primary_color: "rgba(137, 180, 250, 1)",
      // blue
      secondary_color: "rgba(205, 214, 244, 0.8)",
      // text
      title_color: "rgba(203, 166, 247, 1)",
      // mauve
      subtitle_color: "rgba(186, 194, 222, 1)",
      // subtext0
      infobar_background_color: "rgba(49, 50, 68, 1)",
      // surface0
      infobar_border_color: "rgba(137, 180, 250, 0.3)",
      // blue
      infobar_icon_color: "rgba(148, 226, 213, 1)",
      // teal
      infobar_label_color: "rgba(186, 194, 222, 1)",
      // subtext0
      infobar_value_color: "rgba(205, 214, 244, 1)"
      // text
    }
  },
  material: {
    id: "material",
    name: "Material Design",
    colors: {
      card_background_color: "rgba(18, 18, 18, 1)",
      // Material dark background
      card_border_color: "rgba(3, 218, 198, 0.3)",
      // teal accent
      card_text_color: "rgba(255, 255, 255, 0.87)",
      // high emphasis text
      primary_color: "rgba(3, 218, 198, 1)",
      // teal accent
      secondary_color: "rgba(255, 255, 255, 0.6)",
      // medium emphasis
      title_color: "rgba(3, 218, 198, 1)",
      // teal accent
      subtitle_color: "rgba(255, 255, 255, 0.6)",
      // medium emphasis
      infobar_background_color: "rgba(33, 33, 33, 1)",
      // elevated surface
      infobar_border_color: "rgba(3, 218, 198, 0.3)",
      // teal accent
      infobar_icon_color: "rgba(3, 218, 198, 1)",
      // teal accent
      infobar_label_color: "rgba(255, 255, 255, 0.6)",
      // medium emphasis
      infobar_value_color: "rgba(255, 255, 255, 0.87)"
      // high emphasis
    }
  },
  minimalist: {
    id: "minimalist",
    name: "Minimalist",
    colors: {
      card_background_color: "rgba(242, 242, 242, 1)",
      // light gray background
      card_border_color: "rgba(0, 0, 0, 0.1)",
      // subtle border
      card_text_color: "rgba(33, 33, 33, 1)",
      // almost black text
      primary_color: "rgba(33, 33, 33, 1)",
      // black
      secondary_color: "rgba(117, 117, 117, 1)",
      // gray
      title_color: "rgba(33, 33, 33, 1)",
      // black
      subtitle_color: "rgba(117, 117, 117, 1)",
      // gray
      infobar_background_color: "rgba(255, 255, 255, 1)",
      // white
      infobar_border_color: "rgba(0, 0, 0, 0.1)",
      // subtle border
      infobar_icon_color: "rgba(66, 66, 66, 1)",
      // dark gray
      infobar_label_color: "rgba(117, 117, 117, 1)",
      // gray
      infobar_value_color: "rgba(33, 33, 33, 1)"
      // black
    }
  },
  slate: {
    id: "slate",
    name: "Slate",
    colors: {
      card_background_color: "rgba(30, 41, 59, 1)",
      // slate-800
      card_border_color: "rgba(148, 163, 184, 0.3)",
      // slate-400
      card_text_color: "rgba(226, 232, 240, 1)",
      // slate-200
      primary_color: "rgba(100, 116, 139, 1)",
      // slate-500
      secondary_color: "rgba(148, 163, 184, 1)",
      // slate-400
      title_color: "rgba(148, 163, 184, 1)",
      // slate-400
      subtitle_color: "rgba(148, 163, 184, 0.8)",
      // slate-400
      infobar_background_color: "rgba(51, 65, 85, 1)",
      // slate-700
      infobar_border_color: "rgba(148, 163, 184, 0.3)",
      // slate-400
      infobar_icon_color: "rgba(148, 163, 184, 1)",
      // slate-400
      infobar_label_color: "rgba(148, 163, 184, 0.8)",
      // slate-400
      infobar_value_color: "rgba(226, 232, 240, 1)"
      // slate-200
    }
  }
};
const customThemes = {};
function getAllThemes() {
  return [
    ...Object.values(defaultThemes),
    ...Object.values(customThemes)
  ];
}
function getTheme(themeId) {
  if (!themeId) return null;
  if (defaultThemes[themeId]) {
    return defaultThemes[themeId];
  }
  if (customThemes[themeId]) {
    return customThemes[themeId];
  }
  return null;
}
function applyThemeToConfig(config, themeId) {
  const theme = getTheme(themeId);
  if (!theme) return config;
  return {
    ...config,
    style: {
      // Apply theme colors
      card_background_color: theme.colors.card_background_color,
      card_border_color: theme.colors.card_border_color,
      card_text_color: theme.colors.card_text_color,
      primary_color: theme.colors.primary_color,
      secondary_color: theme.colors.secondary_color,
      title_color: theme.colors.title_color,
      subtitle_color: theme.colors.subtitle_color,
      // Preserve any manual overrides from existing config
      ...config.style
    },
    info_bar: {
      ...config.info_bar,
      style: {
        // Apply theme colors
        background_color: theme.colors.infobar_background_color,
        border_color: theme.colors.infobar_border_color,
        icon_color: theme.colors.infobar_icon_color,
        label_color: theme.colors.infobar_label_color,
        value_color: theme.colors.infobar_value_color,
        // Preserve any manual overrides
        ...config.info_bar?.style
      }
    }
  };
}
function getDefaultConfig(config) {
  const t2 = getTranslations(config.language || detectLanguage());
  let themedConfig = config;
  if (config.theme) {
    themedConfig = applyThemeToConfig(config, config.theme);
  }
  return {
    ...themedConfig,
    language: themedConfig.language || detectLanguage(),
    theme: themedConfig.theme,
    show_title: themedConfig.show_title !== false,
    show_subtitle: themedConfig.show_subtitle !== false,
    show_icon: themedConfig.show_icon !== false,
    grid_gap: themedConfig.grid_gap ?? "6px",
    // Central entities - keep as is if provided
    entities: themedConfig.entities,
    // Central configuration values
    pv_max_power: themedConfig.pv_max_power ?? 1e4,
    battery_capacity: themedConfig.battery_capacity ?? 1e4,
    grid_threshold: themedConfig.grid_threshold ?? 10,
    info_bar: {
      show: themedConfig.info_bar?.show === true,
      position: themedConfig.info_bar?.position || "top",
      calculation_mode: themedConfig.info_bar?.calculation_mode || "autarky",
      calculate_battery_times: themedConfig.info_bar?.calculate_battery_times === true,
      item1: {
        icon: themedConfig.info_bar?.item1?.icon ?? "mdi:home-lightning-bolt",
        label: themedConfig.info_bar?.item1?.label ?? t2.editor.default_autarky,
        ...themedConfig.info_bar?.item1
      },
      item2: {
        icon: themedConfig.info_bar?.item2?.icon ?? "mdi:battery-clock",
        label: themedConfig.info_bar?.item2?.label ?? t2.editor.default_runtime,
        ...themedConfig.info_bar?.item2
      },
      item3: {
        icon: themedConfig.info_bar?.item3?.icon ?? "mdi:battery-charging",
        label: themedConfig.info_bar?.item3?.label ?? t2.editor.default_chargetime,
        ...themedConfig.info_bar?.item3
      },
      style: {
        background_color: themedConfig.info_bar?.style?.background_color ?? "rgba(21, 20, 27, 1)",
        border_color: themedConfig.info_bar?.style?.border_color ?? "rgba(255, 255, 255, 0.1)",
        border_radius: themedConfig.info_bar?.style?.border_radius ?? "16px",
        padding: themedConfig.info_bar?.style?.padding ?? "12px",
        gap: themedConfig.info_bar?.style?.gap ?? "8px",
        icon_size: themedConfig.info_bar?.style?.icon_size ?? "1.5em",
        icon_color: themedConfig.info_bar?.style?.icon_color ?? "white",
        label_size: themedConfig.info_bar?.style?.label_size ?? "0.8em",
        label_color: themedConfig.info_bar?.style?.label_color ?? "rgba(255, 255, 255, 0.7)",
        label_font_weight: themedConfig.info_bar?.style?.label_font_weight ?? "normal",
        value_size: themedConfig.info_bar?.style?.value_size ?? "1em",
        value_color: themedConfig.info_bar?.style?.value_color ?? "white",
        value_font_weight: themedConfig.info_bar?.style?.value_font_weight ?? "bold",
        ...themedConfig.info_bar?.style
      }
    },
    style: {
      card_background_color: themedConfig.style?.card_background_color ?? "rgba(21, 20, 27, 1)",
      card_border_color: themedConfig.style?.card_border_color ?? "rgba(255, 255, 255, 0.1)",
      card_boxshadow: themedConfig.style?.card_boxshadow ?? "0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
      card_border_radius: themedConfig.style?.card_border_radius ?? "16px",
      card_text_color: themedConfig.style?.card_text_color ?? "white",
      card_cursor: themedConfig.style?.card_cursor ?? "pointer",
      card_padding: themedConfig.style?.card_padding ?? "12px",
      header_margin_bottom: themedConfig.style?.header_margin_bottom ?? "12px",
      infobar_gap: themedConfig.style?.infobar_gap ?? "6px",
      title_align: themedConfig.style?.title_align ?? "center",
      title_size: themedConfig.style?.title_size ?? "1.5em",
      title_font_weight: themedConfig.style?.title_font_weight ?? "bold",
      title_color: themedConfig.style?.title_color ?? "white",
      subtitle_align: themedConfig.style?.subtitle_align ?? "center",
      subtitle_size: themedConfig.style?.subtitle_size ?? "1em",
      subtitle_font_weight: themedConfig.style?.subtitle_font_weight ?? "normal",
      subtitle_color: themedConfig.style?.subtitle_color ?? "rgba(255, 255, 255, 0.7)",
      icon_size: themedConfig.style?.icon_size ?? "2em",
      icon_opacity: themedConfig.style?.icon_opacity ?? "1",
      icon_margin: themedConfig.style?.icon_margin ?? "6px",
      primary_size: themedConfig.style?.primary_size ?? "1.2em",
      primary_color: themedConfig.style?.primary_color ?? "white",
      primary_font_opacity: themedConfig.style?.primary_font_opacity ?? "1",
      primary_font_weight: themedConfig.style?.primary_font_weight ?? "normal",
      secondary_size: themedConfig.style?.secondary_size ?? "0.9em",
      secondary_color: themedConfig.style?.secondary_color ?? "white",
      secondary_font_weight: themedConfig.style?.secondary_font_weight ?? "normal",
      secondary_font_opacity: themedConfig.style?.secondary_font_opacity ?? "0.7",
      tertiary_size: themedConfig.style?.tertiary_size ?? "0.9em",
      tertiary_color: themedConfig.style?.tertiary_color ?? "white",
      tertiary_font_weight: themedConfig.style?.tertiary_font_weight ?? "normal",
      tertiary_font_opacity: themedConfig.style?.tertiary_font_opacity ?? "0.7",
      ...themedConfig.style
    },
    netz: {
      show: themedConfig.netz?.show !== false,
      animation: themedConfig.netz?.animation !== false,
      threshold: themedConfig.netz?.threshold ?? 10,
      text_einspeisen: themedConfig.netz?.text_einspeisen ?? t2.status.feed_in,
      text_neutral: themedConfig.netz?.text_neutral ?? t2.status.neutral,
      text_bezug: themedConfig.netz?.text_bezug ?? t2.status.grid_consumption,
      ...themedConfig.netz
    },
    pv: {
      show: themedConfig.pv?.show !== false,
      animation: themedConfig.pv?.animation !== false,
      icon_rotation: themedConfig.pv?.icon_rotation === true,
      max_power: themedConfig.pv?.max_power ?? 1e4,
      ...themedConfig.pv
    },
    batterie: {
      show: themedConfig.batterie?.show !== false,
      animation: themedConfig.batterie?.animation !== false,
      battery_capacity: themedConfig.batterie?.battery_capacity ?? 1e4,
      calculate_runtime: themedConfig.batterie?.calculate_runtime === true,
      ...themedConfig.batterie
    },
    haus: {
      show: themedConfig.haus?.show !== false,
      animation: themedConfig.haus?.animation !== false,
      ...themedConfig.haus
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
function calculateAutarky(pvProductionW, batteryDischargeW, gridFeedInW, houseConsumptionW) {
  if (houseConsumptionW <= 0) return "—";
  const gridConsumption = gridFeedInW < 0 ? Math.abs(gridFeedInW) : 0;
  const selfConsumption = houseConsumptionW - gridConsumption;
  const autarky = selfConsumption / houseConsumptionW * 100;
  const clampedAutarky = Math.max(0, Math.min(100, autarky));
  return `${Math.round(clampedAutarky)}%`;
}
function calculateSelfConsumption(pvProductionW, gridFeedInW) {
  if (pvProductionW <= 10) return "—";
  const feedIn = gridFeedInW > 0 ? gridFeedInW : 0;
  const selfUsed = pvProductionW - feedIn;
  const selfConsumption = selfUsed / pvProductionW * 100;
  const clampedSelfConsumption = Math.max(0, Math.min(100, selfConsumption));
  return `${Math.round(clampedSelfConsumption)}%`;
}
var __defProp$1 = Object.defineProperty;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i2 = decorators.length - 1, decorator; i2 >= 0; i2--)
    if (decorator = decorators[i2])
      result = decorator(target, key, result) || result;
  if (result) __defProp$1(target, key, result);
  return result;
};
const CARD_TAG = "pv-monitor-card";
const _PVMonitorCard = class _PVMonitorCard extends i {
  static async getConfigElement() {
    await Promise.resolve().then(() => pvMonitorCardEditor);
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
    } else if (tapAction.action === "url" && tapAction.url_path) {
      window.open(tapAction.url_path, "_blank");
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
    const getCentralEntityValue = (entityKey) => {
      const entityId = this.config.entities?.[entityKey];
      if (!entityId) return 0;
      return parseFloat(this.hass.states[entityId]?.state) || 0;
    };
    if (itemType === "calculation") {
      const mode = this.config.info_bar?.calculation_mode || "autarky";
      if (mode === "autarky") {
        const pvProd = getCentralEntityValue("pv_production");
        const batteryDischarge = getCentralEntityValue("battery_discharge");
        const gridPower = getCentralEntityValue("grid_power");
        const houseConsumption = getCentralEntityValue("house_consumption");
        value = calculateAutarky(pvProd, batteryDischarge, gridPower, houseConsumption);
        unit = "";
      } else {
        const pvProd = getCentralEntityValue("pv_production");
        const gridPower = getCentralEntityValue("grid_power");
        value = calculateSelfConsumption(pvProd, gridPower);
        unit = "";
      }
    } else if (itemType === "runtime" && this.config.info_bar?.calculate_battery_times) {
      const batteryCapacity = this.config.battery_capacity || 1e4;
      const socPercent = getCentralEntityValue("battery_soc");
      const charge = getCentralEntityValue("battery_charge");
      const discharge = getCentralEntityValue("battery_discharge");
      value = calculateBatteryRuntime(batteryCapacity, socPercent, charge, discharge);
      unit = "";
    } else if (itemType === "chargetime" && this.config.info_bar?.calculate_battery_times) {
      const batteryCapacity = this.config.battery_capacity || 1e4;
      const socPercent = getCentralEntityValue("battery_soc");
      const charge = getCentralEntityValue("battery_charge");
      const discharge = getCentralEntityValue("battery_discharge");
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
    const hasAnyContent = ib.calculation_mode || ib.calculate_battery_times || ib.item1?.entity || ib.item2?.entity || ib.item3?.entity;
    if (!hasAnyContent) return x``;
    const hasActions = ib.tap_action || ib.double_tap_action || ib.hold_action;
    const cursor = hasActions ? "pointer" : "default";
    const infoBarStyle = `
            background: ${s2.background_color};
            border: 1px solid ${s2.border_color};
            border-radius: ${s2.border_radius};
            padding: ${s2.padding};
            gap: ${s2.gap};
            cursor: ${cursor};
            ${s2.background_color !== "transparent" ? `box-shadow: ${this.config.style.card_boxshadow};` : ""}
        `;
    return x`
            <div class="info-bar"
                 style="${infoBarStyle}"
                 @click=${() => hasActions && this._handleTap(ib.tap_action)}
                 @dblclick=${() => hasActions && this._handleTap(ib.double_tap_action)}
                 @contextmenu=${(ev) => {
      if (hasActions && ib.hold_action) {
        ev.preventDefault();
        this._handleTap(ib.hold_action);
      }
    }}
            >
                ${this._renderInfoBarItem(ib.item1, s2, "calculation")}
                ${this._renderInfoBarItem(ib.item2, s2, "runtime")}
                ${this._renderInfoBarItem(ib.item3, s2, "chargetime")}
            </div>
        `;
  }
  _renderNetz() {
    const entityId = this.config.netz?.entity || this.config.entities?.grid_power;
    if (!entityId || !this.hass) return x``;
    const entity = this.hass.states[entityId];
    const t2 = getTranslations(this.config.language);
    if (!entity) return x`<div class="card">⚠️ ${entityId} ${t2.general.missing_entity}</div>`;
    const value = parseFloat(entity.state) || 0;
    const threshold = this.config.netz?.threshold || this.config.grid_threshold || 10;
    let statusText = "";
    if (value < -threshold) {
      statusText = this.config.netz?.text_einspeisen || t2.status.feed_in;
    } else if (value > threshold) {
      statusText = this.config.netz?.text_bezug || t2.status.grid_consumption;
    } else {
      statusText = this.config.netz?.text_neutral || t2.status.neutral;
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
    const entityId = this.config.pv?.entity || this.config.entities?.pv_production;
    if (!entityId || !this.hass) return x``;
    const entity = this.hass.states[entityId];
    const t2 = getTranslations(this.config.language);
    if (!entity) return x`<div class="card">⚠️ ${entityId} ${t2.general.missing_entity}</div>`;
    const value = parseFloat(entity.state) || 0;
    const maxPower = this.config.pv?.max_power || this.config.pv_max_power || 1e4;
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
    const entityId = this.config.batterie?.entity || this.config.entities?.battery_soc;
    if (!entityId || !this.hass) return x``;
    const entity = this.hass.states[entityId];
    const t2 = getTranslations(this.config.language);
    if (!entity) return x`<div class="card">⚠️ ${entityId} ${t2.general.missing_entity}</div>`;
    const percentage = parseFloat(entity.state) || 0;
    const icon = this.config.batterie.icon || getBatteryIcon(percentage);
    const iconColor = getBatteryIconColor(percentage);
    const chargeEntityId = this.config.batterie.ladung_entity || this.config.entities?.battery_charge;
    const dischargeEntityId = this.config.batterie.entladung_entity || this.config.entities?.battery_discharge;
    const charge = chargeEntityId && this.hass.states[chargeEntityId] ? parseFloat(this.hass.states[chargeEntityId]?.state) || 0 : 0;
    const discharge = dischargeEntityId && this.hass.states[dischargeEntityId] ? parseFloat(this.hass.states[dischargeEntityId]?.state) || 0 : 0;
    const batteryCapacity = this.config.batterie.battery_capacity || this.config.battery_capacity || 1e4;
    let statusText = "";
    if (charge > 1) {
      statusText = formatPower(charge);
    } else if (discharge > 1) {
      statusText = "-" + formatPower(discharge);
    } else {
      statusText = t2.general.inactive;
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
    const entityId = this.config.haus?.entity || this.config.entities?.house_consumption;
    if (!entityId || !this.hass) return x``;
    const entity = this.hass.states[entityId];
    const t2 = getTranslations(this.config.language);
    if (!entity) return x`<div class="card">⚠️ ${entityId} ${t2.general.missing_entity}</div>`;
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
    const infoBarPosition = this.config.info_bar?.position || "top";
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
    const headerStyle = `
            margin-bottom: ${s2.header_margin_bottom || "12px"};
        `;
    return x`
            ${showTitle || showSubtitle ? x`
                <div class="card-header" style="${headerStyle}">
                    ${showIcon ? x`
                        <div class="card-header-with-icon">
                            <ha-icon .icon=${this.config.icon} style="${headerIconStyle}"></ha-icon>
                            <div class="card-header-text">
                                ${showTitle ? x`<h2 style="${titleStyle}">${this.config.title}</h2>` : ""}
                                ${showSubtitle ? x`<p style="${subtitleStyle}">${this.config.subtitle}</p>` : ""}
                            </div>
                        </div>
                    ` : x`
                        ${showTitle ? x`<h2 style="${titleStyle}">${this.config.title}</h2>` : ""}
                        ${showSubtitle ? x`<p style="${subtitleStyle}">${this.config.subtitle}</p>` : ""}
                    `}
                </div>
            ` : ""}
            ${infoBarPosition === "top" ? this._renderInfoBar() : ""}
            <div class="grid" style="gap: ${this.config.grid_gap}; ${infoBarPosition === "top" && this.config.info_bar?.show ? `margin-top: ${s2.infobar_gap || "6px"};` : ""}">
                ${this.config.pv?.show !== false ? this._renderPV() : ""}
                ${this.config.batterie?.show !== false ? this._renderBatterie() : ""}
                ${this.config.haus?.show !== false ? this._renderHaus() : ""}
                ${this.config.netz?.show !== false ? this._renderNetz() : ""}
            </div>
            ${infoBarPosition === "bottom" ? x`
                <div style="margin-top: ${s2.infobar_gap || "6px"};">
                    ${this._renderInfoBar()}
                </div>
            ` : ""}
        `;
  }
};
_PVMonitorCard.styles = pvMonitorCardStyles;
let PVMonitorCard = _PVMonitorCard;
__decorateClass$1([
  n2({ attribute: false })
], PVMonitorCard.prototype, "hass");
__decorateClass$1([
  n2()
], PVMonitorCard.prototype, "config");
if (!customElements.get(CARD_TAG)) {
  customElements.define(CARD_TAG, PVMonitorCard);
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
const _PVMonitorCardEditor = class _PVMonitorCardEditor extends i {
  constructor() {
    super(...arguments);
    this._activeTab = "general";
    this._isInteracting = false;
    this._localValues = /* @__PURE__ */ new Map();
    this._autocompleteResults = /* @__PURE__ */ new Map();
    this._showAutocomplete = /* @__PURE__ */ new Map();
  }
  setConfig(config) {
    this._config = config;
  }
  _valueChanged(ev, path) {
    if (!this._config) return;
    const target = ev.target;
    let value;
    if (target.type === "checkbox") {
      value = target.checked;
    } else if (target.type === "number") {
      value = target.value ? Number(target.value) : void 0;
    } else {
      value = target.value || void 0;
    }
    const newConfig = { ...this._config };
    let current = newConfig;
    for (let i2 = 0; i2 < path.length - 1; i2++) {
      if (!current[path[i2]]) {
        current[path[i2]] = {};
      }
      current = current[path[i2]];
    }
    if (value === void 0 || value === "") {
      delete current[path[path.length - 1]];
    } else {
      current[path[path.length - 1]] = value;
    }
    this._config = newConfig;
    this._fireEvent();
  }
  _fireEvent() {
    const event = new CustomEvent("config-changed", {
      detail: { config: this._config },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }
  _debouncedFireEvent() {
    if (this._debounceTimer) {
      window.clearTimeout(this._debounceTimer);
    }
    this._debounceTimer = window.setTimeout(() => {
      this._fireEvent();
      this._debounceTimer = void 0;
    }, 1e3);
  }
  _renderTapActions(cardType) {
    this._getT();
    const config = cardType === "info_bar" ? this._config?.info_bar : this._config?.[cardType];
    return x`
            <div class="subsection">
                <div class="section-header">
                    <ha-icon icon="mdi:gesture-tap"></ha-icon>
                    Tap Actions
                </div>

                ${this._renderActionSelector("Tap Action", [cardType, "tap_action"], config?.tap_action)}
                ${this._renderActionSelector("Double Tap", [cardType, "double_tap_action"], config?.double_tap_action)}
                ${this._renderActionSelector("Hold Action", [cardType, "hold_action"], config?.hold_action)}
            </div>
        `;
  }
  _renderActionSelector(label, path, action) {
    const t2 = this._getT();
    const actions = [
      { value: "none", label: t2.editor.action_none || "None" },
      { value: "more-info", label: t2.editor.action_more_info || "More Info" },
      { value: "navigate", label: t2.editor.action_navigate || "Navigate" },
      { value: "url", label: t2.editor.action_url || "URL" },
      { value: "call-service", label: t2.editor.action_call_service || "Call Service" }
    ];
    return x`
            <div class="option">
                <div class="option-label">${label}</div>
                <div class="option-control">
                    <ha-combo-box
                            .value=${action?.action || "none"}
                            .items=${actions}
                            item-value-path="value"
                            item-label-path="label"
                            @value-changed=${(ev) => this._updateTapAction(path, "action", ev.detail.value)}
                    ></ha-combo-box>
                </div>
            </div>

            ${action?.action === "navigate" ? x`
                <div class="option">
                    <div class="option-label">Navigation Path</div>
                    <div class="option-control">
                        <ha-textfield
                                .value=${action.navigation_path || ""}
                                placeholder="/lovelace/view"
                                @input=${(ev) => this._updateTapAction(path, "navigation_path", ev.target.value)}
                        ></ha-textfield>
                    </div>
                </div>
            ` : ""}

            ${action?.action === "url" ? x`
                <div class="option">
                    <div class="option-label">URL</div>
                    <div class="option-control">
                        <ha-textfield
                                .value=${action.url_path || ""}
                                placeholder="https://example.com"
                                @input=${(ev) => this._updateTapAction(path, "url_path", ev.target.value)}
                        ></ha-textfield>
                    </div>
                </div>
            ` : ""}

            ${action?.action === "call-service" ? x`
                <div class="option">
                    <div class="option-label">Service</div>
                    <div class="option-control">
                        <ha-textfield
                                .value=${action.service || ""}
                                placeholder="light.turn_on"
                                @input=${(ev) => this._updateTapAction(path, "service", ev.target.value)}
                        ></ha-textfield>
                    </div>
                </div>
            ` : ""}
        `;
  }
  _updateTapAction(path, key, value) {
    if (!this._config) return;
    const newConfig = JSON.parse(JSON.stringify(this._config));
    let current = newConfig;
    for (let i2 = 0; i2 < path.length; i2++) {
      if (i2 === path.length - 1) {
        if (!current[path[i2]]) current[path[i2]] = {};
        current[path[i2]][key] = value;
      } else {
        if (!current[path[i2]]) current[path[i2]] = {};
        current = current[path[i2]];
      }
    }
    this._config = newConfig;
    this._fireEvent();
  }
  _getT() {
    return getTranslations(this._config?.language);
  }
  _renderTab(id, label, icon) {
    return x`
            <button
                    class="tab ${this._activeTab === id ? "active" : ""}"
                    @click=${() => this._activeTab = id}
            >
                <ha-icon .icon=${icon}></ha-icon>
                ${label}
            </button>
        `;
  }
  _renderTextfield(label, path, value, placeholder, helper) {
    return x`
            <div class="option">
                <div class="option-label">
                    ${label}
                    ${helper ? x`<div class="info-text">${helper}</div>` : ""}
                </div>
                <div class="option-control">
                    <ha-textfield
                            .value=${value || ""}
                            .placeholder=${placeholder || ""}
                            @input=${(ev) => this._valueChanged(ev, path)}
                    ></ha-textfield>
                </div>
            </div>
        `;
  }
  _renderNumberfield(label, path, value, min, max, step, helper) {
    return x`
            <div class="option">
                <div class="option-label">
                    ${label}
                    ${helper ? x`<div class="info-text">${helper}</div>` : ""}
                </div>
                <div class="option-control">
                    <ha-textfield
                            type="number"
                            .value=${value?.toString() || ""}
                            .min=${min?.toString()}
                            .max=${max?.toString()}
                            .step=${step?.toString() || "1"}
                            @input=${(ev) => this._valueChanged(ev, path)}
                    ></ha-textfield>
                </div>
            </div>
        `;
  }
  _renderSwitch(label, path, value, helper) {
    return x`
            <div class="option">
                <div class="option-label">
                    ${label}
                    ${helper ? x`<div class="info-text">${helper}</div>` : ""}
                </div>
                <div class="option-control">
                    <ha-switch
                            .checked=${value === true}
                            @change=${(ev) => {
      if (!this._config) return;
      const target = ev.target;
      const newValue = target.checked;
      const newConfig = { ...this._config };
      let current = newConfig;
      for (let i2 = 0; i2 < path.length - 1; i2++) {
        if (!current[path[i2]]) current[path[i2]] = {};
        current = current[path[i2]];
      }
      current[path[path.length - 1]] = newValue;
      this._config = newConfig;
      this._fireEvent();
    }}
                    ></ha-switch>
                </div>
            </div>
        `;
  }
  _renderEntityPicker(label, path, value, helper) {
    if (!this.hass) return x``;
    const entities = Object.keys(this.hass.states).sort();
    const t2 = this._getT();
    const pathKey = path.join(".");
    const filteredEntities = this._autocompleteResults.get(pathKey) || [];
    const showDropdown = this._showAutocomplete.get(pathKey) || false;
    return x`
            <div class="option" style="${showDropdown ? "z-index: 1000; position: relative;" : ""}">
                <div class="option-label">
                    ${label}
                    ${helper ? x`<div class="info-text">${helper}</div>` : ""}
                </div>
                <div class="option-control">
                    <div class="autocomplete-wrapper">
                        <ha-textfield
                                .value=${value || ""}
                                .placeholder=${t2.editor.select_entity}
                                @input=${(ev) => {
      const target = ev.target;
      const inputValue = target.value;
      const filtered = inputValue ? entities.filter((e2) => e2.toLowerCase().includes(inputValue.toLowerCase())).slice(0, 50) : [];
      this._autocompleteResults.set(pathKey, filtered);
      this._showAutocomplete.set(pathKey, filtered.length > 0);
      this.requestUpdate();
      if (!this._config) return;
      const newConfig = JSON.parse(JSON.stringify(this._config));
      let current = newConfig;
      for (let i2 = 0; i2 < path.length - 1; i2++) {
        if (!current[path[i2]]) current[path[i2]] = {};
        current = current[path[i2]];
      }
      if (inputValue === "") {
        delete current[path[path.length - 1]];
      } else {
        current[path[path.length - 1]] = inputValue;
      }
      this._config = newConfig;
      this._debouncedFireEvent();
    }}
                                @focus=${() => {
      const currentValue = value || "";
      if (!currentValue) {
        this._autocompleteResults.set(pathKey, entities.slice(0, 50));
        this._showAutocomplete.set(pathKey, true);
        this.requestUpdate();
      }
    }}
                                @blur=${() => {
      setTimeout(() => {
        this._showAutocomplete.set(pathKey, false);
        this.requestUpdate();
      }, 200);
    }}
                        ></ha-textfield>

                        ${showDropdown ? x`
                            <div class="autocomplete-dropdown" @mousedown=${(ev) => ev.preventDefault()}>
                                ${filteredEntities.map((entity) => x`
                                    <div
                                            class="autocomplete-item"
                                            @click=${() => {
      if (!this._config) return;
      const newConfig = JSON.parse(JSON.stringify(this._config));
      let current = newConfig;
      for (let i2 = 0; i2 < path.length - 1; i2++) {
        if (!current[path[i2]]) current[path[i2]] = {};
        current = current[path[i2]];
      }
      current[path[path.length - 1]] = entity;
      this._config = newConfig;
      this._showAutocomplete.set(pathKey, false);
      this._fireEvent();
      this.requestUpdate();
    }}
                                    >
                                        ${entity}
                                    </div>
                                `)}
                            </div>
                        ` : ""}
                    </div>
                </div>
            </div>
        `;
  }
  _renderIconPicker(label, path, value, helper) {
    const t2 = this._getT();
    return x`
            <div class="option">
                <div class="option-label">
                    ${label}
                    ${helper ? x`<div class="info-text">${helper}</div>` : ""}
                </div>
                <div class="option-control">
                    <ha-icon-picker
                            .hass=${this.hass}
                            .value=${value || ""}
                            .label=${t2.editor.select_icon}
                            @value-changed=${(ev) => {
      ev.stopPropagation();
      if (!this._config) return;
      const newValue = ev.detail?.value || "";
      const newConfig = JSON.parse(JSON.stringify(this._config));
      let current = newConfig;
      for (let i2 = 0; i2 < path.length - 1; i2++) {
        if (!current[path[i2]]) current[path[i2]] = {};
        current = current[path[i2]];
      }
      if (newValue === "") {
        delete current[path[path.length - 1]];
      } else {
        current[path[path.length - 1]] = newValue;
      }
      this._config = newConfig;
      this._fireEvent();
    }}
                    ></ha-icon-picker>
                </div>
            </div>
        `;
  }
  _renderLanguageSelector() {
    const t2 = this._getT();
    const currentLang = this._config?.language || detectLanguage();
    return x`
            <div class="option">
                <div class="option-label">
                    ${t2.editor.language}
                    <div class="info-text">${t2.editor.language_helper}</div>
                </div>
                <div class="option-control">
                    <ha-combo-box
                            .value=${currentLang}
                            .items=${[
      { value: "de", label: "Deutsch" },
      { value: "en", label: "English" },
      { value: "fr", label: "Français" },
      { value: "it", label: "Italiano" },
      { value: "es", label: "Español" }
    ]}
                            item-value-path="value"
                            item-label-path="label"
                            @value-changed=${(ev) => {
      if (!this._config) return;
      const newValue = ev.detail?.value;
      if (!newValue || newValue === this._config.language) return;
      const newConfig = { ...this._config };
      newConfig.language = newValue;
      this._config = newConfig;
      this._fireEvent();
      this.requestUpdate();
    }}
                    ></ha-combo-box>
                </div>
            </div>
        `;
  }
  _renderThemeSelector() {
    const t2 = this._getT();
    const allThemes = getAllThemes();
    const themeItems = allThemes.map((theme) => ({
      value: theme.id,
      label: theme.name
    }));
    return x`
            <div class="option">
                <div class="option-label">
                    ${t2.editor.theme}
                    <div class="info-text">${t2.editor.theme_helper}</div>
                </div>
                <div class="option-control">
                    <ha-combo-box
                            .value=${this._config?.theme || ""}
                            .items=${themeItems}
                            item-value-path="value"
                            item-label-path="label"
                            allow-custom-value
                            @value-changed=${(ev) => {
      if (!this._config) return;
      const newValue = ev.detail?.value;
      const newConfig = { ...this._config };
      if (!newValue || newValue === "") {
        delete newConfig.theme;
      } else {
        newConfig.theme = newValue;
      }
      this._config = newConfig;
      this._fireEvent();
      this.requestUpdate();
    }}
                    ></ha-combo-box>
                </div>
            </div>
        `;
  }
  _renderGeneralTab() {
    const t2 = this._getT();
    return x`
            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:translate"></ha-icon>
                    ${t2.editor.language}
                </div>
                ${this._renderLanguageSelector()}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:link-variant"></ha-icon>
                    ${t2.editor.central_entities}
                </div>
                <div class="info-text" style="margin-bottom: 12px;">${t2.editor.central_entities_helper}</div>

                ${this._renderEntityPicker(t2.editor.entity_pv_production, ["entities", "pv_production"], this._config?.entities?.pv_production, t2.editor.entity_pv_production_helper)}
                ${this._renderEntityPicker(t2.editor.entity_battery_soc, ["entities", "battery_soc"], this._config?.entities?.battery_soc, t2.editor.entity_battery_soc_helper)}
                ${this._renderEntityPicker(t2.editor.entity_battery_charge, ["entities", "battery_charge"], this._config?.entities?.battery_charge, t2.editor.entity_battery_charge_helper)}
                ${this._renderEntityPicker(t2.editor.entity_battery_discharge, ["entities", "battery_discharge"], this._config?.entities?.battery_discharge, t2.editor.entity_battery_discharge_helper)}
                ${this._renderEntityPicker(t2.editor.entity_house_consumption, ["entities", "house_consumption"], this._config?.entities?.house_consumption, t2.editor.entity_house_consumption_helper)}
                ${this._renderEntityPicker(t2.editor.entity_grid_power, ["entities", "grid_power"], this._config?.entities?.grid_power, t2.editor.entity_grid_power_helper)}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:cog"></ha-icon>
                    ${t2.editor.central_config}
                </div>
                <div class="info-text" style="margin-bottom: 12px;">${t2.editor.central_config_helper}</div>

                ${this._renderNumberfield(t2.editor.pv_max_power_label, ["pv_max_power"], this._config?.pv_max_power, 0, 1e5, 100, t2.editor.pv_max_power_helper)}
                ${this._renderNumberfield(t2.editor.battery_capacity_label, ["battery_capacity"], this._config?.battery_capacity, 0, 1e5, 100, t2.editor.battery_capacity_label_helper)}
                ${this._renderNumberfield(t2.editor.grid_threshold_label, ["grid_threshold"], this._config?.grid_threshold, 0, 1e3, 10, t2.editor.grid_threshold_helper)}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:eye"></ha-icon>
                    ${t2.editor.card_visibility}
                </div>
                ${this._renderSwitch(t2.editor.show_pv_card, ["pv", "show"], this._config?.pv?.show !== false)}
                ${this._renderSwitch(t2.editor.show_battery_card, ["batterie", "show"], this._config?.batterie?.show !== false)}
                ${this._renderSwitch(t2.editor.show_house_card, ["haus", "show"], this._config?.haus?.show !== false)}
                ${this._renderSwitch(t2.editor.show_grid_card, ["netz", "show"], this._config?.netz?.show !== false)}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:card-text"></ha-icon>
                    ${t2.editor.card_header}
                </div>
                ${this._renderTextfield(t2.editor.title, ["title"], this._config?.title, t2.editor.title_placeholder, t2.editor.title_helper)}
                ${this._renderTextfield(t2.editor.subtitle, ["subtitle"], this._config?.subtitle, t2.editor.subtitle_placeholder, t2.editor.subtitle_helper)}
                ${this._renderIconPicker(t2.editor.icon, ["icon"], this._config?.icon, t2.editor.icon_helper)}
            </div>
        `;
  }
  _renderInfoBarTab() {
    const t2 = this._getT();
    return x`
            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:information"></ha-icon>
                    ${t2.editor.infobar_settings}
                </div>
                ${this._renderSwitch(t2.editor.enable_infobar, ["info_bar", "show"], this._config?.info_bar?.show)}

                ${this._config?.info_bar?.show ? x`
                    <div class="option">
                        <div class="option-label">${t2.editor.infobar_position}</div>
                        <div class="option-control">
                            <ha-combo-box
                                    .value=${this._config?.info_bar?.position || "top"}
                                    .items=${[
      { value: "top", label: t2.editor.position_top },
      { value: "bottom", label: t2.editor.position_bottom }
    ]}
                                    item-value-path="value"
                                    item-label-path="label"
                                    @value-changed=${(ev) => {
      if (!this._config) return;
      const newValue = ev.detail?.value;
      if (!newValue) return;
      const newConfig = { ...this._config };
      if (!newConfig.info_bar) newConfig.info_bar = {};
      newConfig.info_bar.position = newValue;
      this._config = newConfig;
      this._fireEvent();
    }}
                            ></ha-combo-box>
                        </div>
                    </div>
                ` : ""}
            </div>

            ${this._config?.info_bar?.show ? x`
                <div class="divider"></div>

                ${this._renderTapActions("info_bar")}

                <div class="divider"></div>

                <div class="section">
                    <div class="section-header">
                        <ha-icon icon="mdi:calculator"></ha-icon>
                        ${t2.editor.calculation_mode}
                    </div>
                    <div class="info-text" style="margin-bottom: 12px;">${t2.editor.calculation_mode_helper}</div>

                    <div class="option">
                        <div class="option-label">${t2.editor.calculation_mode}</div>
                        <div class="option-control">
                            <ha-combo-box
                                    .value=${this._config?.info_bar?.calculation_mode || "autarky"}
                                    .items=${[
      { value: "autarky", label: t2.editor.mode_autarky },
      { value: "self_consumption", label: t2.editor.mode_self_consumption }
    ]}
                                    item-value-path="value"
                                    item-label-path="label"
                                    @value-changed=${(ev) => {
      if (!this._config) return;
      const newValue = ev.detail?.value;
      if (!newValue) return;
      const newConfig = { ...this._config };
      if (!newConfig.info_bar) newConfig.info_bar = {};
      newConfig.info_bar.calculation_mode = newValue;
      this._config = newConfig;
      this._fireEvent();
    }}
                            ></ha-combo-box>
                        </div>
                    </div>

                    ${this._renderSwitch(t2.editor.calculate_battery_times, ["info_bar", "calculate_battery_times"], this._config?.info_bar?.calculate_battery_times, t2.editor.calculate_battery_times_helper)}
                </div>

                <div class="divider"></div>

                <div class="section">
                    <div class="section-header">
                        <ha-icon icon="mdi:numeric-1-box"></ha-icon>
                        ${t2.editor.item} 1
                    </div>
                    ${this._renderEntityPicker(t2.editor.entity, ["info_bar", "item1", "entity"], this._config?.info_bar?.item1?.entity)}
                    ${this._renderIconPicker(t2.editor.icon_label, ["info_bar", "item1", "icon"], this._config?.info_bar?.item1?.icon)}
                    ${this._renderTextfield(t2.editor.label, ["info_bar", "item1", "label"], this._config?.info_bar?.item1?.label, t2.editor.default_autarky)}
                    ${this._renderTextfield(t2.editor.unit, ["info_bar", "item1", "unit"], this._config?.info_bar?.item1?.unit, "%")}
                </div>

                <div class="divider"></div>

                <div class="section">
                    <div class="section-header">
                        <ha-icon icon="mdi:numeric-2-box"></ha-icon>
                        ${t2.editor.item} 2
                    </div>
                    ${this._renderEntityPicker(t2.editor.entity, ["info_bar", "item2", "entity"], this._config?.info_bar?.item2?.entity)}
                    ${this._renderIconPicker(t2.editor.icon_label, ["info_bar", "item2", "icon"], this._config?.info_bar?.item2?.icon)}
                    ${this._renderTextfield(t2.editor.label, ["info_bar", "item2", "label"], this._config?.info_bar?.item2?.label, t2.editor.default_runtime)}
                    ${this._renderTextfield(t2.editor.unit, ["info_bar", "item2", "unit"], this._config?.info_bar?.item2?.unit)}
                </div>

                <div class="divider"></div>

                <div class="section">
                    <div class="section-header">
                        <ha-icon icon="mdi:numeric-3-box"></ha-icon>
                        ${t2.editor.item} 3
                    </div>
                    ${this._renderEntityPicker(t2.editor.entity, ["info_bar", "item3", "entity"], this._config?.info_bar?.item3?.entity)}
                    ${this._renderIconPicker(t2.editor.icon_label, ["info_bar", "item3", "icon"], this._config?.info_bar?.item3?.icon)}
                    ${this._renderTextfield(t2.editor.label, ["info_bar", "item3", "label"], this._config?.info_bar?.item3?.label, t2.editor.default_chargetime)}
                    ${this._renderTextfield(t2.editor.unit, ["info_bar", "item3", "unit"], this._config?.info_bar?.item3?.unit)}
                </div>
            ` : ""}
        `;
  }
  _renderPVTab() {
    const t2 = this._getT();
    return x`
            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:solar-panel"></ha-icon>
                    ${t2.editor.pv_system}
                </div>
                ${this._renderIconPicker(t2.editor.icon_label, ["pv", "icon"], this._config?.pv?.icon)}
                ${this._renderSwitch(t2.editor.enable_animation, ["pv", "animation"], this._config?.pv?.animation)}
                ${this._renderSwitch(t2.editor.icon_rotation, ["pv", "icon_rotation"], this._config?.pv?.icon_rotation, t2.editor.icon_rotation_helper)}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:text"></ha-icon>
                    ${t2.editor.additional_texts}
                </div>
                ${this._renderEntityPicker(t2.editor.secondary_entity, ["pv", "secondary_entity"], this._config?.pv?.secondary_entity, t2.editor.secondary_entity_helper)}
                ${this._renderTextfield(t2.editor.secondary_text, ["pv", "secondary_text"], this._config?.pv?.secondary_text, "", t2.editor.secondary_text_helper)}
                ${this._renderEntityPicker(t2.editor.tertiary_entity, ["pv", "tertiary_entity"], this._config?.pv?.tertiary_entity)}
                ${this._renderTextfield(t2.editor.tertiary_text, ["pv", "tertiary_text"], this._config?.pv?.tertiary_text)}
            </div>

            <div class="divider"></div>

            ${this._renderTapActions("pv")}

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:palette"></ha-icon>
                    ${t2.editor.styling}
                </div>
                ${this._renderTextfield(t2.editor.background_color, ["pv", "style", "background_color"], this._config?.pv?.style?.background_color, "rgba(21, 20, 27, 1)")}
                ${this._renderTextfield(t2.editor.border_color, ["pv", "style", "border_color"], this._config?.pv?.style?.border_color, "rgba(255, 255, 255, 0.1)")}
                ${this._renderTextfield(t2.editor.primary_color, ["pv", "style", "primary_color"], this._config?.pv?.style?.primary_color)}
                ${this._renderTextfield(t2.editor.secondary_color, ["pv", "style", "secondary_color"], this._config?.pv?.style?.secondary_color)}
                ${this._renderTextfield(t2.editor.icon_color, ["pv", "style", "icon_color"], this._config?.pv?.style?.icon_color)}
            </div>
        `;
  }
  _renderBatteryTab() {
    const t2 = this._getT();
    return x`
            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:battery"></ha-icon>
                    ${t2.editor.battery}
                </div>
                ${this._renderIconPicker(t2.editor.icon_label, ["batterie", "icon"], this._config?.batterie?.icon, t2.editor.icon_auto_helper)}
                ${this._renderSwitch(t2.editor.enable_animation, ["batterie", "animation"], this._config?.batterie?.animation)}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:text"></ha-icon>
                    ${t2.editor.additional_texts}
                </div>
                ${this._renderEntityPicker(t2.editor.secondary_entity, ["batterie", "secondary_entity"], this._config?.batterie?.secondary_entity)}
                ${this._renderTextfield(t2.editor.secondary_text, ["batterie", "secondary_text"], this._config?.batterie?.secondary_text)}
                ${this._renderEntityPicker(t2.editor.tertiary_entity, ["batterie", "tertiary_entity"], this._config?.batterie?.tertiary_entity)}
                ${this._renderTextfield(t2.editor.tertiary_text, ["batterie", "tertiary_text"], this._config?.batterie?.tertiary_text)}
            </div>

            <div class="divider"></div>

            ${this._renderTapActions("batterie")}

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:palette"></ha-icon>
                    ${t2.editor.styling}
                </div>
                ${this._renderTextfield(t2.editor.background_color, ["batterie", "style", "background_color"], this._config?.batterie?.style?.background_color)}
                ${this._renderTextfield(t2.editor.border_color, ["batterie", "style", "border_color"], this._config?.batterie?.style?.border_color)}
                ${this._renderTextfield(t2.editor.primary_color, ["batterie", "style", "primary_color"], this._config?.batterie?.style?.primary_color)}
                ${this._renderTextfield(t2.editor.secondary_color, ["batterie", "style", "secondary_color"], this._config?.batterie?.style?.secondary_color)}
                ${this._renderTextfield(t2.editor.icon_color, ["batterie", "style", "icon_color"], this._config?.batterie?.style?.icon_color)}
            </div>
        `;
  }
  _renderHouseTab() {
    const t2 = this._getT();
    return x`
            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:home"></ha-icon>
                    ${t2.editor.house_consumption}
                </div>
                ${this._renderIconPicker(t2.editor.icon_label, ["haus", "icon"], this._config?.haus?.icon)}
                ${this._renderSwitch(t2.editor.enable_animation, ["haus", "animation"], this._config?.haus?.animation)}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:text"></ha-icon>
                    ${t2.editor.additional_texts}
                </div>
                ${this._renderEntityPicker(t2.editor.secondary_entity, ["haus", "secondary_entity"], this._config?.haus?.secondary_entity)}
                ${this._renderTextfield(t2.editor.secondary_text, ["haus", "secondary_text"], this._config?.haus?.secondary_text)}
                ${this._renderEntityPicker(t2.editor.tertiary_entity, ["haus", "tertiary_entity"], this._config?.haus?.tertiary_entity)}
                ${this._renderTextfield(t2.editor.tertiary_text, ["haus", "tertiary_text"], this._config?.haus?.tertiary_text)}
            </div>

            <div class="divider"></div>

            ${this._renderTapActions("haus")}

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:palette"></ha-icon>
                    ${t2.editor.styling}
                </div>
                ${this._renderTextfield(t2.editor.background_color, ["haus", "style", "background_color"], this._config?.haus?.style?.background_color)}
                ${this._renderTextfield(t2.editor.border_color, ["haus", "style", "border_color"], this._config?.haus?.style?.border_color)}
                ${this._renderTextfield(t2.editor.primary_color, ["haus", "style", "primary_color"], this._config?.haus?.style?.primary_color)}
                ${this._renderTextfield(t2.editor.secondary_color, ["haus", "style", "secondary_color"], this._config?.haus?.style?.secondary_color)}
                ${this._renderTextfield(t2.editor.icon_color, ["haus", "style", "icon_color"], this._config?.haus?.style?.icon_color)}
            </div>
        `;
  }
  _renderGridTab() {
    const t2 = this._getT();
    return x`
            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:transmission-tower"></ha-icon>
                    ${t2.editor.grid}
                </div>
                ${this._renderIconPicker(t2.editor.icon_label, ["netz", "icon"], this._config?.netz?.icon)}
                ${this._renderSwitch(t2.editor.enable_animation, ["netz", "animation"], this._config?.netz?.animation)}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:text-box"></ha-icon>
                    ${t2.editor.status_texts}
                </div>
                ${this._renderTextfield(t2.editor.text_feed_in, ["netz", "text_einspeisen"], this._config?.netz?.text_einspeisen, t2.editor.text_feed_in_placeholder)}
                ${this._renderTextfield(t2.editor.text_neutral, ["netz", "text_neutral"], this._config?.netz?.text_neutral, t2.editor.text_neutral_placeholder)}
                ${this._renderTextfield(t2.editor.text_consumption, ["netz", "text_bezug"], this._config?.netz?.text_bezug, t2.editor.text_consumption_placeholder)}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:text"></ha-icon>
                    ${t2.editor.additional_texts}
                </div>
                ${this._renderEntityPicker(t2.editor.secondary_entity, ["netz", "secondary_entity"], this._config?.netz?.secondary_entity)}
                ${this._renderTextfield(t2.editor.secondary_text, ["netz", "secondary_text"], this._config?.netz?.secondary_text)}
                ${this._renderEntityPicker(t2.editor.tertiary_entity, ["netz", "tertiary_entity"], this._config?.netz?.tertiary_entity)}
                ${this._renderTextfield(t2.editor.tertiary_text, ["netz", "tertiary_text"], this._config?.netz?.tertiary_text)}
            </div>

            <div class="divider"></div>

            ${this._renderTapActions("netz")}

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:palette"></ha-icon>
                    ${t2.editor.styling}
                </div>
                ${this._renderTextfield(t2.editor.background_color, ["netz", "style", "background_color"], this._config?.netz?.style?.background_color)}
                ${this._renderTextfield(t2.editor.border_color, ["netz", "style", "border_color"], this._config?.netz?.style?.border_color)}
                ${this._renderTextfield(t2.editor.primary_color, ["netz", "style", "primary_color"], this._config?.netz?.style?.primary_color)}
                ${this._renderTextfield(t2.editor.secondary_color, ["netz", "style", "secondary_color"], this._config?.netz?.style?.secondary_color)}
                ${this._renderTextfield(t2.editor.icon_color, ["netz", "style", "icon_color"], this._config?.netz?.style?.icon_color)}
            </div>
        `;
  }
  _renderStylingTab() {
    const t2 = this._getT();
    return x`
            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:palette"></ha-icon>
                    ${t2.editor.theme}
                </div>
                ${this._renderThemeSelector()}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:grid"></ha-icon>
                    ${t2.editor.layout}
                </div>
                ${this._renderTextfield(t2.editor.grid_gap, ["grid_gap"], this._config?.grid_gap, t2.editor.grid_gap_placeholder, t2.editor.grid_gap_helper)}
                ${this._renderTextfield(t2.editor.header_margin_bottom, ["style", "header_margin_bottom"], this._config?.style?.header_margin_bottom, "12px", t2.editor.header_margin_bottom_helper)}
                ${this._renderTextfield(t2.editor.infobar_gap, ["style", "infobar_gap"], this._config?.style?.infobar_gap, "6px", t2.editor.infobar_gap_helper)}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:card"></ha-icon>
                    ${t2.editor.card_styling}
                </div>
                ${this._renderTextfield(t2.editor.background_color, ["style", "card_background_color"], this._config?.style?.card_background_color, "rgba(21, 20, 27, 1)")}
                ${this._renderTextfield(t2.editor.border_color, ["style", "card_border_color"], this._config?.style?.card_border_color, "rgba(255, 255, 255, 0.1)")}
                ${this._renderTextfield(t2.editor.border_radius, ["style", "card_border_radius"], this._config?.style?.card_border_radius, "16px")}
                ${this._renderTextfield(t2.editor.text_color, ["style", "card_text_color"], this._config?.style?.card_text_color, "white")}
                ${this._renderTextfield(t2.editor.padding, ["style", "card_padding"], this._config?.style?.card_padding, "12px")}
                ${this._renderTextfield(t2.editor.cursor, ["style", "card_cursor"], this._config?.style?.card_cursor, "pointer")}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:format-title"></ha-icon>
                    ${t2.editor.title_subtitle}
                </div>
                ${this._renderTextfield(t2.editor.title_size, ["style", "title_size"], this._config?.style?.title_size, "1.5em")}
                ${this._renderTextfield(t2.editor.title_color, ["style", "title_color"], this._config?.style?.title_color, "white")}
                ${this._renderTextfield(t2.editor.title_alignment, ["style", "title_align"], this._config?.style?.title_align, "center", t2.editor.title_alignment_helper)}
                ${this._renderTextfield(t2.editor.title_font_weight, ["style", "title_font_weight"], this._config?.style?.title_font_weight, "bold")}

                <div class="divider"></div>

                ${this._renderTextfield(t2.editor.subtitle_size, ["style", "subtitle_size"], this._config?.style?.subtitle_size, "1em")}
                ${this._renderTextfield(t2.editor.subtitle_color, ["style", "subtitle_color"], this._config?.style?.subtitle_color)}
                ${this._renderTextfield(t2.editor.subtitle_alignment, ["style", "subtitle_align"], this._config?.style?.subtitle_align, "center")}
                ${this._renderTextfield(t2.editor.subtitle_font_weight, ["style", "subtitle_font_weight"], this._config?.style?.subtitle_font_weight, "normal")}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:shape"></ha-icon>
                    ${t2.editor.icons}
                </div>
                ${this._renderTextfield(t2.editor.icon_size, ["style", "icon_size"], this._config?.style?.icon_size, "2em")}
                ${this._renderTextfield(t2.editor.icon_opacity, ["style", "icon_opacity"], this._config?.style?.icon_opacity, "1")}
                ${this._renderTextfield(t2.editor.icon_margin, ["style", "icon_margin"], this._config?.style?.icon_margin, "6px")}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:format-text"></ha-icon>
                    ${t2.editor.primary_text_styling}
                </div>
                ${this._renderTextfield(t2.editor.primary_size, ["style", "primary_size"], this._config?.style?.primary_size, "1.2em")}
                ${this._renderTextfield(t2.editor.primary_color_label, ["style", "primary_color"], this._config?.style?.primary_color, "white")}
                ${this._renderTextfield(t2.editor.primary_opacity, ["style", "primary_font_opacity"], this._config?.style?.primary_font_opacity, "1")}
                ${this._renderTextfield(t2.editor.primary_font_weight, ["style", "primary_font_weight"], this._config?.style?.primary_font_weight, "normal")}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:format-text"></ha-icon>
                    ${t2.editor.secondary_text_styling}
                </div>
                ${this._renderTextfield(t2.editor.secondary_size, ["style", "secondary_size"], this._config?.style?.secondary_size, "0.9em")}
                ${this._renderTextfield(t2.editor.secondary_color_label, ["style", "secondary_color"], this._config?.style?.secondary_color, "white")}
                ${this._renderTextfield(t2.editor.secondary_opacity, ["style", "secondary_font_opacity"], this._config?.style?.secondary_font_opacity, "0.7")}
                ${this._renderTextfield(t2.editor.secondary_font_weight, ["style", "secondary_font_weight"], this._config?.style?.secondary_font_weight, "normal")}
            </div>

            <div class="divider"></div>

            <div class="section">
                <div class="section-header">
                    <ha-icon icon="mdi:format-text"></ha-icon>
                    ${t2.editor.tertiary_text_styling}
                </div>
                ${this._renderTextfield(t2.editor.tertiary_size, ["style", "tertiary_size"], this._config?.style?.tertiary_size, "0.9em")}
                ${this._renderTextfield(t2.editor.tertiary_color_label, ["style", "tertiary_color"], this._config?.style?.tertiary_color, "white")}
                ${this._renderTextfield(t2.editor.tertiary_opacity, ["style", "tertiary_font_opacity"], this._config?.style?.tertiary_font_opacity, "0.7")}
                ${this._renderTextfield(t2.editor.tertiary_font_weight, ["style", "tertiary_font_weight"], this._config?.style?.tertiary_font_weight, "normal")}
            </div>
        `;
  }
  render() {
    if (!this._config) {
      return x``;
    }
    const t2 = this._getT();
    return x`
            <div class="card-config">
                <div class="tabs">
                    ${this._renderTab("general", t2.editor.tab_general, "mdi:cog")}
                    ${this._renderTab("styling", t2.editor.tab_styling, "mdi:palette")}
                    ${this._renderTab("infobar", t2.editor.tab_infobar, "mdi:information")}
                    ${this._renderTab("pv", t2.editor.tab_pv, "mdi:solar-panel")}
                    ${this._renderTab("battery", t2.editor.tab_battery, "mdi:battery")}
                    ${this._renderTab("house", t2.editor.tab_house, "mdi:home")}
                    ${this._renderTab("grid", t2.editor.tab_grid, "mdi:transmission-tower")}
                </div>

                <div class="tab-content ${this._activeTab === "general" ? "active" : ""}">
                    ${this._renderGeneralTab()}
                </div>

                <div class="tab-content ${this._activeTab === "styling" ? "active" : ""}">
                    ${this._renderStylingTab()}
                </div>

                <div class="tab-content ${this._activeTab === "infobar" ? "active" : ""}">
                    ${this._renderInfoBarTab()}
                </div>

                <div class="tab-content ${this._activeTab === "pv" ? "active" : ""}">
                    ${this._renderPVTab()}
                </div>

                <div class="tab-content ${this._activeTab === "battery" ? "active" : ""}">
                    ${this._renderBatteryTab()}
                </div>

                <div class="tab-content ${this._activeTab === "house" ? "active" : ""}">
                    ${this._renderHouseTab()}
                </div>

                <div class="tab-content ${this._activeTab === "grid" ? "active" : ""}">
                    ${this._renderGridTab()}
                </div>
            </div>
        `;
  }
};
_PVMonitorCardEditor.styles = i$3`
        :host {
            display: block;
            position: relative;
            z-index: 1;
        }

        /* Critical fix: Ensure entity picker dropdowns appear above everything */
        :host ::slotted(*),
        :host * {
            --ha-entity-picker-z-index: 9999;
            --mdc-menu-z-index: 9999;
            --mdc-dialog-z-index: 9999;
        }

        .card-config {
            display: flex;
            flex-direction: column;
            gap: 16px;
            position: relative;
        }
        .tabs {
            display: flex;
            gap: 8px;
            border-bottom: 2px solid rgba(127, 127, 127, 0.3);
            margin-bottom: 16px;
            flex-wrap: wrap;
        }
        .tab {
            padding: 8px 16px;
            cursor: pointer;
            border: none;
            background: none;
            color: inherit;
            border-bottom: 2px solid transparent;
            margin-bottom: -2px;
            font-size: 14px;
            transition: all 0.2s;
        }
        .tab:hover {
            background: rgba(127, 127, 127, 0.1);
        }
        .tab.active {
            border-bottom-color: #3b82f6;
            color: #3b82f6;
            font-weight: 500;
        }
        .tab-content {
            display: none;
        }
        .tab-content.active {
            display: block;
        }
        .section {
            margin-bottom: 24px;
            position: relative;
            z-index: 1;
        }
        .section-header {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 12px;
            color: inherit;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .section-header ha-icon {
            --mdc-icon-size: 20px;
        }
        .option {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 0;
            gap: 16px;
            position: relative;
            z-index: 1;
        }
        .option-label {
            flex: 1;
            font-size: 14px;
            color: inherit;
        }
        .option-control {
            flex: 0 0 auto;
            min-width: 200px;
            position: relative;
        }

        /* Fix entity picker autocomplete being covered by dropdown */
        ha-entity-picker,
        ha-selector-entity {
            position: relative;
            z-index: 100;
        }

        ha-entity-picker[opened],
        ha-selector-entity[opened] {
            z-index: 1000;
        }

        /* Ensure combo-box dropdowns have proper z-index */
        ha-combo-box {
            position: relative;
        }

        ha-textfield, ha-select {
            width: 100%;
        }

        /* Fix dropdown text visibility - try different approach */
        ha-combo-box {
            color: #e1e1e1 !important;
        }

        ha-combo-box mwc-list-item {
            color: #e1e1e1 !important;
            background-color: #2c2c2c !important;
        }

        ha-combo-box mwc-menu {
            background-color: #2c2c2c !important;
        }

        /* Custom autocomplete dropdown */
        .autocomplete-wrapper {
            position: relative;
            width: 100%;
            z-index: 100;
        }

        .autocomplete-dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            right: auto;
            min-width: 400px;
            max-height: 200px;
            overflow-y: auto;
            background: #1c1c1c;
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 4px;
            margin-top: 4px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        }

        .autocomplete-item {
            padding: 8px 12px;
            cursor: pointer;
            color: #e1e1e1;
            font-size: 14px;
            background: #1c1c1c;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .autocomplete-item:hover {
            background: rgba(255, 255, 255, 0.08);
        }

        .subsection {
            margin-left: 16px;
            padding-left: 16px;
            border-left: 2px solid rgba(127, 127, 127, 0.3);
            margin-top: 8px;
        }
        .info-text {
            font-size: 12px;
            color: rgba(127, 127, 127, 0.8);
            margin-top: 4px;
            font-style: italic;
        }
        .divider {
            height: 1px;
            background: rgba(127, 127, 127, 0.3);
            margin: 16px 0;
        }
        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }
    `;
let PVMonitorCardEditor = _PVMonitorCardEditor;
__decorateClass([
  n2({ attribute: false })
], PVMonitorCardEditor.prototype, "hass");
__decorateClass([
  r()
], PVMonitorCardEditor.prototype, "_config");
__decorateClass([
  r()
], PVMonitorCardEditor.prototype, "_activeTab");
__decorateClass([
  r()
], PVMonitorCardEditor.prototype, "_isInteracting");
__decorateClass([
  r()
], PVMonitorCardEditor.prototype, "_autocompleteResults");
__decorateClass([
  r()
], PVMonitorCardEditor.prototype, "_showAutocomplete");
customElements.define("pv-monitor-card-editor", PVMonitorCardEditor);
const pvMonitorCardEditor = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PVMonitorCardEditor
}, Symbol.toStringTag, { value: "Module" }));
export {
  PVMonitorCard
};
