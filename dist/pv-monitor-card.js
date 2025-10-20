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
const baseStyles = i$3`
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
        grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
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
        margin-top: -6px;
        margin-bottom: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .icon ha-icon {
        transform-origin: center center;
    }

    .consumers-bar {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        margin-top: 6px;
    }

    .consumer-item {
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
        padding: 6px 12px;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        cursor: pointer;
        white-space: nowrap;
    }

    .consumer-item .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        min-width: 1.2em;
        min-height: 1.2em;
    }

    .consumer-item .consumer-content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 2px;
        line-height: 1;
    }

    .consumer-item .primary {
        font-weight: bold;
        margin: 0;
        line-height: 1;
    }

    .consumer-item .secondary {
        margin: 0;
        opacity: 0.7;
        font-size: 0.75em;
        line-height: 1;
    }
`;
const animationStyles = i$3`
    @keyframes spin {
        0%   { transform: rotate(0deg); }
        25%  { transform: rotate(120deg); }
        50%  { transform: rotate(200deg); }
        75%  { transform: rotate(300deg); }
        100% { transform: rotate(360deg); }
    }

    @keyframes continuousRotation {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    @keyframes particleFloat {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.7;
        }
        15% {
            transform: translate(8px, -8px) scale(1.1);
            opacity: 1;
        }
        30% {
            transform: translate(12px, -4px) scale(0.95);
            opacity: 0.8;
        }
        45% {
            transform: translate(6px, 6px) scale(1.05);
            opacity: 0.9;
        }
        60% {
            transform: translate(-6px, 8px) scale(1);
            opacity: 0.85;
        }
        75% {
            transform: translate(-10px, -2px) scale(1.08);
            opacity: 0.95;
        }
        90% {
            transform: translate(-4px, -10px) scale(0.98);
            opacity: 0.75;
        }
    }

    @keyframes electricPulse {
        0%, 100% {
            transform: rotate(0deg);
            opacity: 0.6;
        }
        5% {
            opacity: 1;
        }
        10% {
            transform: rotate(15deg);
            opacity: 0.4;
        }
        15% {
            opacity: 0.9;
        }
        20% {
            transform: rotate(45deg);
            opacity: 0.5;
        }
        25% {
            opacity: 1;
        }
        30% {
            transform: rotate(70deg);
            opacity: 0.6;
        }
        40% {
            transform: rotate(120deg);
            opacity: 0.9;
        }
        50% {
            transform: rotate(180deg);
            opacity: 0.5;
        }
        55% {
            opacity: 1;
        }
        60% {
            transform: rotate(210deg);
            opacity: 0.7;
        }
        70% {
            transform: rotate(270deg);
            opacity: 0.9;
        }
        75% {
            opacity: 0.5;
        }
        80% {
            transform: rotate(310deg);
            opacity: 1;
        }
        90% {
            transform: rotate(350deg);
            opacity: 0.7;
        }
    }
`;
const pvMonitorCardStyles = [baseStyles, animationStyles];
function detectLanguage() {
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("de")) return "de";
  if (browserLang.startsWith("fr")) return "fr";
  if (browserLang.startsWith("it")) return "it";
  if (browserLang.startsWith("es")) return "es";
  if (browserLang.startsWith("nl")) return "nl";
  if (browserLang.startsWith("pt")) return "pt";
  if (browserLang.startsWith("sv")) return "sv";
  if (browserLang.startsWith("fi")) return "fi";
  if (browserLang.startsWith("cs")) return "cs";
  if (browserLang.startsWith("sl")) return "sl";
  if (browserLang.startsWith("sk")) return "sk";
  if (browserLang.startsWith("bs")) return "bs";
  if (browserLang.startsWith("sr")) return "sr";
  return "en";
}
const __variableDynamicImportRuntimeHelper = (glob$1, path$13, segs) => {
  const v2 = glob$1[path$13];
  if (v2) return typeof v2 === "function" ? v2() : Promise.resolve(v2);
  return new Promise((_2, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, /* @__PURE__ */ new Error("Unknown variable dynamic import: " + path$13 + (path$13.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : ""))));
  });
};
const translationsCache = /* @__PURE__ */ new Map();
async function loadTranslation(lang) {
  if (translationsCache.has(lang)) {
    return translationsCache.get(lang);
  }
  try {
    const module = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./locales/bs.json": () => Promise.resolve().then(() => bs$1), "./locales/cs.json": () => Promise.resolve().then(() => cs$1), "./locales/de.json": () => Promise.resolve().then(() => de$1), "./locales/en.json": () => Promise.resolve().then(() => en$1), "./locales/es.json": () => Promise.resolve().then(() => es$1), "./locales/fi.json": () => Promise.resolve().then(() => fi$1), "./locales/fr.json": () => Promise.resolve().then(() => fr$1), "./locales/it.json": () => Promise.resolve().then(() => it$1), "./locales/nl.json": () => Promise.resolve().then(() => nl$1), "./locales/pt.json": () => Promise.resolve().then(() => pt$1), "./locales/sk.json": () => Promise.resolve().then(() => sk$1), "./locales/sl.json": () => Promise.resolve().then(() => sl$1), "./locales/sr.json": () => Promise.resolve().then(() => sr$1), "./locales/sv.json": () => Promise.resolve().then(() => sv$1) }), `./locales/${lang}.json`, 3);
    const translation = module.default;
    translationsCache.set(lang, translation);
    return translation;
  } catch (error) {
    console.error(`Failed to load translation for ${lang}:`, error);
    if (lang !== "en") {
      return loadTranslation("en");
    }
    throw error;
  }
}
function getTranslations(language) {
  const lang = language || detectLanguage();
  if (translationsCache.has(lang)) {
    return translationsCache.get(lang);
  }
  loadTranslation(lang).catch((err) => console.error("Translation load error:", err));
  if (lang !== "en" && translationsCache.has("en")) {
    return translationsCache.get("en");
  }
  console.warn(`No translations available for ${lang}, using empty fallback`);
  return createEmptyTranslations();
}
async function preloadAllTranslations() {
  try {
    await Promise.all([
      loadTranslation("de"),
      loadTranslation("en"),
      loadTranslation("fr"),
      loadTranslation("it"),
      loadTranslation("es"),
      loadTranslation("nl"),
      loadTranslation("pt"),
      loadTranslation("sv"),
      loadTranslation("fi"),
      loadTranslation("cs"),
      loadTranslation("sl"),
      loadTranslation("sk"),
      loadTranslation("bs"),
      loadTranslation("sr")
    ]);
  } catch (error) {
    console.error("Error preloading translations:", error);
  }
}
function createEmptyTranslations() {
  return {
    general: {
      missing_entity: "missing",
      inactive: "Inactive"
    },
    editor: {
      tab_general: "General",
      tab_elements: "Elements",
      tab_cards: "Cards",
      tab_layout: "Layout",
      tab_language: "Language",
      tab_header: "Header",
      tab_theme: "Theme",
      tab_infobar: "Info Bar",
      tab_pv: "PV System",
      tab_battery: "Battery",
      tab_house: "House",
      tab_grid: "Grid",
      tab_consumers: "Consumers",
      tab_pv_bar: "PV Bar",
      tab_battery_bar: "Battery Bar",
      card_header: "Card Header",
      title: "Title",
      title_placeholder: "PV Monitor",
      title_helper: "Leave empty to hide.",
      subtitle: "Subtitle",
      subtitle_placeholder: "Energy Overview",
      subtitle_helper: "Leave empty to hide.",
      title_subtitle_gap: "Title-Subtitle Gap",
      title_subtitle_gap_helper: "Space between title and subtitle",
      header_icon_size: "Header Icon Size",
      header_icon_size_helper: "Size of icon next to title",
      header_icon_color: "Header Icon Color",
      header_icon_margin: "Header Icon Margin",
      icon: "Icon",
      icon_helper: "Only shown when title is present, leave empty to hide.",
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
      central_entities_helper: "Define main entities for calculations",
      entity_pv_production: "PV Production Entity",
      entity_pv_production_helper: "Entity for PV power (used for calculations)",
      entity_battery_soc: "Battery SOC Entity",
      entity_battery_soc_helper: "Entity for battery charge in % (for calculations)",
      entity_battery_charge: "Battery Charge Entity",
      entity_battery_charge_helper: "Entity for battery charge power (for calculations)",
      entity_battery_discharge: "Battery Discharge Entity",
      entity_battery_discharge_helper: "Entity for battery discharge power (for calculations)",
      entity_house_consumption: "House Consumption Entity",
      entity_house_consumption_helper: "Entity for house consumption (for autarky calculation, optional)",
      entity_grid_power: "Grid Entity",
      entity_grid_power_helper: "Entity for grid import/export (for calculations)",
      central_config: "Central Configuration",
      central_config_helper: "These values apply to all cards",
      pv_max_power_label: "PV Max Power (W)",
      pv_max_power_helper: "Maximum PV power for animations",
      battery_capacity_label: "Battery Capacity (Wh)",
      battery_capacity_label_helper: "Battery capacity (e.g. 10000 for 10 kWh)",
      grid_threshold_label: "Grid Threshold (W)",
      grid_threshold_helper: 'Below this value "Neutral" is displayed',
      card_visibility: "Card Visibility",
      cards_order: "Cards Order",
      cards_order_helper: "Change order and visibility of the 4 cards",
      card_pv: "PV System",
      card_battery: "Battery",
      card_house: "House",
      card_grid: "Grid",
      show_pv_card: "Show PV Card",
      show_battery_card: "Show Battery Card",
      show_house_card: "Show House Card",
      show_grid_card: "Show Grid Card",
      infobar_settings: "Info Bar Settings",
      enable_infobar: "Enable Info Bar",
      infobar_position: "Info Bar Position",
      position_top: "Top (above cards)",
      position_bottom: "Bottom",
      calculation_mode: "Calculation for Item 1",
      calculation_mode_helper: "Choose: Autarky or Self-Consumption",
      mode_autarky: "Autarky (Self-Sufficiency)",
      mode_self_consumption: "Self-Consumption (Self-Use)",
      calculate_battery_times: "Calculate Battery Times",
      calculate_battery_times_helper: "Automatic calculation for Item 2 (remaining runtime) and 3 (remaining charge time)",
      item: "Item",
      entity: "Entity",
      icon_label: "Icon",
      label: "Label",
      unit: "Unit",
      default_autarky: "Autarky",
      default_runtime: "Remaining Runtime",
      default_chargetime: "Remaining Charge Time",
      pv_system: "PV System",
      pv_entity: "PV Entity",
      pv_entity_helper: "Entity for PV power",
      enable_animation: "Enable Animation",
      animation_style: "Animation Style",
      animation_style_helper: "Choose animation effect",
      animation_rotating_dots: "Rotating Dots",
      animation_particle_field: "Particle Field",
      animation_electric_arc: "Electric Arcs",
      icon_rotation: "Icon Rotation",
      icon_rotation_helper: "Icon rotates based on power",
      max_power: "Max Power (W)",
      max_power_helper: "Maximum PV power for animation & rotation",
      battery: "Battery",
      battery_entity: "Battery Entity",
      battery_entity_helper: "Entity for battery level (%)",
      charge_entity: "Charge Entity",
      charge_entity_helper: "Entity for charge power",
      discharge_entity: "Discharge Entity",
      discharge_entity_helper: "Entity for discharge power",
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
      grid_entity_helper: "Entity for grid import/export",
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
      header_background: "Header Background",
      enable_header_background: "Enable Header Background",
      enable_header_background_helper: "Enable background for title/subtitle area",
      header_background_color: "Header Background Color",
      header_border_color: "Header Border Color",
      header_border_radius: "Header Border Radius",
      header_padding: "Header Padding",
      header_width: "Header Width",
      header_width_helper: "Auto = centered with content size, Full = full width",
      header_width_auto: "Auto (content size)",
      header_width_full: "Full (100% width)",
      header_box_shadow: "Header Box Shadow",
      border_radius: "Border Radius",
      text_color: "Text Color",
      padding: "Padding",
      cursor: "Cursor",
      title_subtitle: "Title & Subtitle",
      title_size: "Title Size",
      title_color: "Title Color",
      title_alignment: "Title Alignment",
      title_alignment_helper: "left, center, right",
      title_font_weight: "Title Font-Weight",
      subtitle_size: "Subtitle Size",
      subtitle_color: "Subtitle Color",
      subtitle_alignment: "Subtitle Alignment",
      subtitle_font_weight: "Subtitle Font-Weight",
      icons: "Icons",
      icon_size: "Icon Size",
      icon_opacity: "Icon Opacity",
      icon_margin: "Icon Margin",
      primary_text_styling: "Primary Text (Main Value)",
      primary_size: "Primary Size",
      primary_color_label: "Primary Color",
      primary_opacity: "Primary Opacity",
      primary_font_weight: "Primary Font-Weight",
      secondary_text_styling: "Secondary Text (2nd Line)",
      secondary_size: "Secondary Size",
      secondary_color_label: "Secondary Color",
      secondary_opacity: "Secondary Opacity",
      secondary_font_weight: "Secondary Font-Weight",
      tertiary_text_styling: "Tertiary Text (3rd Line)",
      tertiary_size: "Tertiary Size",
      tertiary_color_label: "Tertiary Color",
      tertiary_opacity: "Tertiary Opacity",
      tertiary_font_weight: "Tertiary Font-Weight",
      select_entity: "Select Entity",
      select_icon: "Select Icon",
      action_none: "None",
      action_more_info: "More Info",
      action_navigate: "Navigate",
      action_url: "URL",
      action_call_service: "Call Service",
      theme: "Theme",
      theme_helper: "Choose a predefined color theme",
      select_theme: "Select Theme",
      consumers_settings: "Consumer Settings",
      enable_consumers: "Enable Consumer Bar",
      consumers_position: "Position",
      consumers_sort_mode: "Sorting",
      sort_highest_first: "Highest First",
      sort_lowest_first: "Lowest First",
      sort_none: "No Sorting (Input Order)",
      sort_alpha_asc: "Alphabetically Ascending",
      sort_alpha_desc: "Alphabetically Descending",
      consumers_threshold: "Global Threshold (W)",
      consumers_threshold_helper: "Consumers below this value are not displayed",
      add_consumer: "Add Consumer",
      remove_consumer: "Remove Consumer",
      consumer_entity: "No:",
      consumer_icon: "Icon",
      consumer_label: "Label",
      consumer_threshold: "Individual Threshold (W)",
      consumer_auto_color: "Automatic Color",
      consumer_auto_color_helper: "Color based on consumption (green to purple)",
      consumer_item_styling: "Consumer Styling",
      consumer_primary_entity: "Primary Entity (for value)",
      consumer_primary_text: "Primary Text (overrides value)",
      consumer_show_primary: "Show Primary Line",
      consumer_secondary_entity: "Secondary Entity (for label)",
      consumer_secondary_text: "Secondary Text (overrides label)",
      consumer_show_secondary: "Show Secondary Line",
      consumer_switch_entity: "Switch Entity (for toggle)",
      consumer_switch_entity_helper: "Optional: Switch to turn on/off",
      consumer_tap_actions: "Tap Actions",
      tap_action_target: "Tap Action Target",
      double_tap_action_target: "Double Tap Action Target",
      hold_action_target: "Hold Action Target",
      action_target_none: "No Action",
      action_target_entity: "Entity Toggle",
      action_target_custom_entity: "Custom Entity Toggle",
      action_target_custom_action: "Custom Action",
      custom_entity_toggle: "Custom Entity (Toggle)",
      custom_entity_toggle_helper: "Entity to be toggled",
      show_consumer_total_in_house: "Total Consumption as Secondary Text",
      show_consumer_total_helper: "Shows sum of all consumers under house consumption",
      show_title: "Show Title",
      show_subtitle: "Show Subtitle",
      show_icon: "Show Icon",
      title_line_height: "Title Line-Height",
      subtitle_line_height: "Subtitle Line-Height",
      primary_line_height: "Primary Line-Height",
      secondary_line_height: "Secondary Line-Height",
      tertiary_line_height: "Tertiary Line-Height",
      label_line_height: "Label Line-Height",
      value_line_height: "Value Line-Height",
      item_calc_type: "Select Calculation",
      calc_type_entity: "Manual Entity",
      calc_type_autarky: "Autarky",
      calc_type_self_consumption: "Self-Consumption",
      calc_type_runtime: "Remaining Runtime",
      calc_type_chargetime: "Remaining Charge Time",
      header_section: "Title Area",
      header_visibility: "Visibility",
      header_content: "Content",
      header_title_styling: "Title Styling",
      header_subtitle_styling: "Subtitle Styling",
      header_icon_styling: "Icon Styling",
      infobar_styling: "Info Bar Styling",
      card_styling_section: "Card Styling",
      theme_editor_cards: "Theme Editor (Cards)",
      theme_editor_cards_note: "Changes only card colors, not title area.",
      header_background_subsection: "Header Background",
      icon_subsection: "Icon",
      primary_text_subsection: "Primary Text (Main Value)",
      secondary_text_subsection: "Secondary Text (2nd Line)",
      tertiary_text_subsection: "Tertiary Text (3rd Line)",
      action_navigation_path: "Navigation Path",
      action_url_label: "URL",
      action_service: "Service",
      layout_order: "Layout Order",
      layout_order_helper: "Determine the order of elements",
      pv_bar_settings: "PV Bar Settings",
      battery_bar_settings: "Battery Bar Settings",
      enable_pv_bar: "Enable PV Bar",
      enable_battery_bar: "Enable Battery Bar",
      bar_position: "Position",
      bar_align: "Alignment",
      align_left: "Left",
      align_center: "Centered",
      align_right: "Right",
      bar_entities: "Systems/Batteries",
      add_pv_entity: "Add PV System",
      add_battery_entity: "Add Battery",
      remove_entity: "Remove",
      entity_name: "Name",
      entity_name_helper: "Display name in bar",
      pv_max_5: "Max 5 PV Systems",
      battery_max_5: "Max 5 Batteries",
      bar_styling: "Bar Styling",
      bar_separator: "Separator",
      bar_separator_helper: "Character between items (e.g. | or •)",
      bar_item_gap: "Item Gap",
      bar_item_gap_helper: "Space between items",
      position_above_cards: "Above Cards",
      position_below_cards: "Below Cards",
      position_above_consumers: "Above Consumers",
      position_below_consumers: "Below Consumers",
      pv_bar_gap: "PV Bar Gap",
      pv_bar_gap_helper: "Space between PV bar and other elements",
      battery_bar_gap: "Battery Bar Gap",
      battery_bar_gap_helper: "Space between battery bar and other elements",
      move_up: "Move Up",
      move_down: "Move Down",
      duplicate: "Duplicate",
      delete: "Delete",
      tap_action: "Tap Action",
      double_tap: "Double Tap",
      hold_action: "Hold Action"
    },
    status: {
      feed_in: "Feed-in",
      neutral: "Neutral",
      grid_consumption: "Grid Consumption",
      inactive: "Inactive"
    }
  };
}
(async () => {
  await preloadAllTranslations();
})();
const themeCache = /* @__PURE__ */ new Map();
const customThemes = /* @__PURE__ */ new Map();
async function loadThemeFromFile(themeId) {
  if (themeCache.has(themeId)) {
    return themeCache.get(themeId);
  }
  try {
    const module = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./data/avatar.json": () => Promise.resolve().then(() => avatar$1), "./data/batman.json": () => Promise.resolve().then(() => batman$1), "./data/blade_runner.json": () => Promise.resolve().then(() => blade_runner$1), "./data/blue.json": () => Promise.resolve().then(() => blue$1), "./data/bobs_burgers.json": () => Promise.resolve().then(() => bobs_burgers$1), "./data/breaking_bad.json": () => Promise.resolve().then(() => breaking_bad$1), "./data/brown.json": () => Promise.resolve().then(() => brown$1), "./data/catppuccin.json": () => Promise.resolve().then(() => catppuccin$1), "./data/cyan.json": () => Promise.resolve().then(() => cyan$1), "./data/dark.json": () => Promise.resolve().then(() => dark$1), "./data/dr_who.json": () => Promise.resolve().then(() => dr_who$1), "./data/dracula.json": () => Promise.resolve().then(() => dracula$1), "./data/dune.json": () => Promise.resolve().then(() => dune$1), "./data/family_guy.json": () => Promise.resolve().then(() => family_guy$1), "./data/frankenstein.json": () => Promise.resolve().then(() => frankenstein$1), "./data/frozen.json": () => Promise.resolve().then(() => frozen$1), "./data/game_of_thrones.json": () => Promise.resolve().then(() => game_of_thrones$1), "./data/ghostbusters.json": () => Promise.resolve().then(() => ghostbusters$1), "./data/gold.json": () => Promise.resolve().then(() => gold$1), "./data/green.json": () => Promise.resolve().then(() => green$1), "./data/guardians.json": () => Promise.resolve().then(() => guardians$1), "./data/hal9000.json": () => Promise.resolve().then(() => hal9000$1), "./data/inception.json": () => Promise.resolve().then(() => inception$1), "./data/indigo.json": () => Promise.resolve().then(() => indigo$1), "./data/jurassic_park.json": () => Promise.resolve().then(() => jurassic_park$1), "./data/light.json": () => Promise.resolve().then(() => light$1), "./data/lime.json": () => Promise.resolve().then(() => lime$1), "./data/lotr.json": () => Promise.resolve().then(() => lotr$1), "./data/mad_max.json": () => Promise.resolve().then(() => mad_max$1), "./data/magenta.json": () => Promise.resolve().then(() => magenta$1), "./data/material.json": () => Promise.resolve().then(() => material$1), "./data/matrix.json": () => Promise.resolve().then(() => matrix$1), "./data/minimalist.json": () => Promise.resolve().then(() => minimalist$1), "./data/monochrome.json": () => Promise.resolve().then(() => monochrome$1), "./data/mr_robot.json": () => Promise.resolve().then(() => mr_robot$1), "./data/nord.json": () => Promise.resolve().then(() => nord$1), "./data/ocean.json": () => Promise.resolve().then(() => ocean$1), "./data/orange.json": () => Promise.resolve().then(() => orange$1), "./data/pink.json": () => Promise.resolve().then(() => pink$1), "./data/pirates.json": () => Promise.resolve().then(() => pirates$1), "./data/purple.json": () => Promise.resolve().then(() => purple$1), "./data/red.json": () => Promise.resolve().then(() => red$1), "./data/rick_morty.json": () => Promise.resolve().then(() => rick_morty$1), "./data/silver.json": () => Promise.resolve().then(() => silver$1), "./data/simpsons.json": () => Promise.resolve().then(() => simpsons$1), "./data/slate.json": () => Promise.resolve().then(() => slate$1), "./data/solarized.json": () => Promise.resolve().then(() => solarized$1), "./data/spiderverse.json": () => Promise.resolve().then(() => spiderverse$1), "./data/star_trek.json": () => Promise.resolve().then(() => star_trek$1), "./data/star_wars.json": () => Promise.resolve().then(() => star_wars$1), "./data/stranger_things.json": () => Promise.resolve().then(() => stranger_things$1), "./data/sunset.json": () => Promise.resolve().then(() => sunset$1), "./data/terminator.json": () => Promise.resolve().then(() => terminator$1), "./data/the_expanse.json": () => Promise.resolve().then(() => the_expanse$1), "./data/the_office.json": () => Promise.resolve().then(() => the_office$1), "./data/tron.json": () => Promise.resolve().then(() => tron$1), "./data/turkis.json": () => Promise.resolve().then(() => turkis$1), "./data/x_files.json": () => Promise.resolve().then(() => x_files$1), "./data/yellow.json": () => Promise.resolve().then(() => yellow$1) }), `./data/${themeId}.json`, 3);
    const theme = module.default || module;
    themeCache.set(themeId, theme);
    return theme;
  } catch (error) {
    console.warn(`Failed to load theme ${themeId}:`, error);
    return null;
  }
}
function getAllThemes() {
  const builtInThemes = [
    // Basis-Themes
    { id: "dark", name: "Dark" },
    { id: "light", name: "Light" },
    // Farb- und Stil-Themes
    { id: "blue", name: "Blue" },
    { id: "brown", name: "Brown" },
    { id: "catppuccin", name: "Catppuccin" },
    { id: "cyan", name: "Cyan" },
    { id: "dracula", name: "Dracula" },
    { id: "gold", name: "Gold" },
    { id: "green", name: "Green" },
    { id: "indigo", name: "Indigo" },
    { id: "lime", name: "Lime" },
    { id: "magenta", name: "Magenta" },
    { id: "material", name: "Material" },
    { id: "minimalist", name: "Minimalist" },
    { id: "monochrome", name: "Monochrome" },
    { id: "nord", name: "Nord" },
    { id: "ocean", name: "Ocean" },
    { id: "orange", name: "Orange" },
    { id: "pink", name: "Pink" },
    { id: "purple", name: "Purple" },
    { id: "red", name: "Red" },
    { id: "silver", name: "Silver" },
    { id: "slate", name: "Slate" },
    { id: "solarized", name: "Solarized" },
    { id: "sunset", name: "Sunset" },
    { id: "turkis", name: "Turkis" },
    { id: "yellow", name: "Yellow" },
    // Film-Themes
    { id: "avatar", name: "Avatar" },
    { id: "batman", name: "Batman" },
    { id: "blade_runner", name: "Blade Runner" },
    { id: "dune", name: "Dune" },
    { id: "frozen", name: "Frozen" },
    { id: "ghostbusters", name: "Ghostbusters" },
    { id: "guardians", name: "Guardians of the Galaxy" },
    { id: "inception", name: "Inception" },
    { id: "jurassic_park", name: "Jurassic Park" },
    { id: "lotr", name: "Lord of the Rings" },
    { id: "mad_max", name: "Mad Max" },
    { id: "matrix", name: "Matrix" },
    { id: "pirates", name: "Pirates of the Caribbean" },
    { id: "star_trek", name: "Star Trek" },
    { id: "star_wars", name: "Star Wars" },
    { id: "tron", name: "Tron" },
    { id: "terminator", name: "Terminator" },
    // Serien-Themes
    { id: "bobs_burgers", name: "Bob's Burgers" },
    { id: "breaking_bad", name: "Breaking Bad" },
    { id: "dr_who", name: "Doctor Who" },
    { id: "family_guy", name: "Family Guy" },
    { id: "frankenstein", name: "Frankenstein" },
    { id: "game_of_thrones", name: "Game of Thrones" },
    { id: "hal9000", name: "HAL 9000" },
    { id: "mr_robot", name: "Mr. Robot" },
    { id: "rick_morty", name: "Rick & Morty" },
    { id: "simpsons", name: "The Simpsons" },
    { id: "spiderverse", name: "Spider-Verse" },
    { id: "stranger_things", name: "Stranger Things" },
    { id: "the_expanse", name: "The Expanse" },
    { id: "the_office", name: "The Office" },
    { id: "x_files", name: "The X-Files" }
  ];
  const customThemesList = Array.from(customThemes.values()).map((theme) => ({
    id: theme.id,
    name: theme.name
  }));
  return [...builtInThemes, ...customThemesList];
}
async function getTheme(themeId) {
  if (!themeId) return null;
  if (customThemes.has(themeId)) {
    return customThemes.get(themeId);
  }
  return await loadThemeFromFile(themeId);
}
function getThemeSync(themeId) {
  if (!themeId) return null;
  if (customThemes.has(themeId)) {
    return customThemes.get(themeId);
  }
  if (themeCache.has(themeId)) {
    return themeCache.get(themeId);
  }
  loadThemeFromFile(themeId);
  return null;
}
function applyThemeColors(config, theme) {
  return {
    ...config,
    style: {
      ...config.style,
      card_background_color: theme.colors.card_background_color,
      card_border_color: theme.colors.card_border_color,
      card_text_color: theme.colors.card_text_color,
      primary_color: theme.colors.primary_color,
      secondary_color: theme.colors.secondary_color,
      title_color: theme.colors.title_color,
      subtitle_color: theme.colors.subtitle_color,
      header_icon_color: theme.colors.title_color,
      header_background_color: theme.colors.header_background_color,
      header_border_color: theme.colors.header_border_color
    },
    info_bar: {
      ...config.info_bar,
      style: {
        ...config.info_bar?.style,
        background_color: theme.colors.infobar_background_color,
        border_color: theme.colors.infobar_border_color,
        icon_color: theme.colors.infobar_icon_color,
        label_color: theme.colors.infobar_label_color,
        value_color: theme.colors.infobar_value_color
      }
    },
    pv_bar: {
      ...config.pv_bar,
      style: {
        ...config.pv_bar?.style,
        background_color: theme.colors.infobar_background_color,
        border_color: theme.colors.infobar_border_color,
        icon_color: theme.colors.infobar_icon_color,
        label_color: theme.colors.infobar_label_color,
        value_color: theme.colors.infobar_value_color
      }
    },
    battery_bar: {
      ...config.battery_bar,
      style: {
        ...config.battery_bar?.style,
        background_color: theme.colors.infobar_background_color,
        border_color: theme.colors.infobar_border_color,
        icon_color: theme.colors.infobar_icon_color,
        label_color: theme.colors.infobar_label_color,
        value_color: theme.colors.infobar_value_color
      }
    },
    consumers: {
      ...config.consumers,
      style: {
        ...config.consumers?.style,
        item_background_color: theme.colors.consumer_background_color,
        item_border_color: theme.colors.consumer_border_color
      }
    }
  };
}
async function applyThemeToConfig(config, themeId) {
  const theme = await getTheme(themeId);
  if (!theme) return config;
  return applyThemeColors(config, theme);
}
function applyThemeToConfigSync(config, themeId) {
  if (!themeId) return config;
  const theme = getThemeSync(themeId);
  if (!theme) {
    console.warn(`Theme ${themeId} not loaded yet, loading async...`);
    return config;
  }
  return applyThemeColors(config, theme);
}
function getDefaultConfig(config) {
  const t2 = getTranslations(config.language || detectLanguage());
  let themedConfig = config;
  if (config.theme) {
    themedConfig = applyThemeToConfigSync(config, config.theme);
  }
  return {
    ...themedConfig,
    language: themedConfig.language || detectLanguage(),
    theme: themedConfig.theme,
    show_title: themedConfig.show_title !== false,
    show_subtitle: themedConfig.show_subtitle !== false,
    show_icon: themedConfig.show_icon !== false,
    grid_gap: themedConfig.grid_gap ?? "6px",
    entities: themedConfig.entities,
    pv_max_power: themedConfig.pv_max_power ?? 1e4,
    battery_capacity: themedConfig.battery_capacity ?? 1e4,
    grid_threshold: themedConfig.grid_threshold ?? 10,
    pv_bar: {
      show: themedConfig.pv_bar?.show === true,
      position: themedConfig.pv_bar?.position || "above-cards",
      align: themedConfig.pv_bar?.align || "left",
      entities: themedConfig.pv_bar?.entities || [],
      style: {
        background_color: themedConfig.pv_bar?.style?.background_color ?? "rgba(21, 20, 27, 1)",
        border_color: themedConfig.pv_bar?.style?.border_color ?? "rgba(255, 255, 255, 0.1)",
        border_radius: themedConfig.pv_bar?.style?.border_radius ?? "16px",
        padding: themedConfig.pv_bar?.style?.padding ?? "12px",
        gap: themedConfig.pv_bar?.style?.gap ?? "8px",
        height: themedConfig.pv_bar?.style?.height ?? "auto",
        icon_size: themedConfig.pv_bar?.style?.icon_size ?? "1.5em",
        icon_color: themedConfig.pv_bar?.style?.icon_color ?? "white",
        label_size: themedConfig.pv_bar?.style?.label_size ?? "0.8em",
        label_color: themedConfig.pv_bar?.style?.label_color ?? "rgba(255, 255, 255, 0.7)",
        label_font_weight: themedConfig.pv_bar?.style?.label_font_weight ?? "normal",
        label_line_height: themedConfig.pv_bar?.style?.label_line_height ?? "1.2",
        value_size: themedConfig.pv_bar?.style?.value_size ?? "1em",
        value_color: themedConfig.pv_bar?.style?.value_color ?? "white",
        value_font_weight: themedConfig.pv_bar?.style?.value_font_weight ?? "bold",
        value_line_height: themedConfig.pv_bar?.style?.value_line_height ?? "1.4",
        separator: themedConfig.pv_bar?.style?.separator ?? "|",
        item_gap: themedConfig.pv_bar?.style?.item_gap ?? "0.5rem",
        ...themedConfig.pv_bar?.style
      }
    },
    battery_bar: {
      show: themedConfig.battery_bar?.show === true,
      position: themedConfig.battery_bar?.position || "below-cards",
      align: themedConfig.battery_bar?.align || "left",
      entities: themedConfig.battery_bar?.entities || [],
      style: {
        background_color: themedConfig.battery_bar?.style?.background_color ?? "rgba(21, 20, 27, 1)",
        border_color: themedConfig.battery_bar?.style?.border_color ?? "rgba(255, 255, 255, 0.1)",
        border_radius: themedConfig.battery_bar?.style?.border_radius ?? "16px",
        padding: themedConfig.battery_bar?.style?.padding ?? "12px",
        gap: themedConfig.battery_bar?.style?.gap ?? "8px",
        height: themedConfig.battery_bar?.style?.height ?? "auto",
        icon_size: themedConfig.battery_bar?.style?.icon_size ?? "1.5em",
        icon_color: themedConfig.battery_bar?.style?.icon_color ?? "white",
        label_size: themedConfig.battery_bar?.style?.label_size ?? "0.8em",
        label_color: themedConfig.battery_bar?.style?.label_color ?? "rgba(255, 255, 255, 0.7)",
        label_font_weight: themedConfig.battery_bar?.style?.label_font_weight ?? "normal",
        label_line_height: themedConfig.battery_bar?.style?.label_line_height ?? "1.2",
        value_size: themedConfig.battery_bar?.style?.value_size ?? "1em",
        value_color: themedConfig.battery_bar?.style?.value_color ?? "white",
        value_font_weight: themedConfig.battery_bar?.style?.value_font_weight ?? "bold",
        value_line_height: themedConfig.battery_bar?.style?.value_line_height ?? "1.4",
        separator: themedConfig.battery_bar?.style?.separator ?? "|",
        item_gap: themedConfig.battery_bar?.style?.item_gap ?? "0.5rem",
        ...themedConfig.battery_bar?.style
      }
    },
    layout: {
      order: themedConfig.layout?.order || ["header", "pv_bar", "cards", "info_bar", "battery_bar", "consumers"],
      cards_order: themedConfig.layout?.cards_order || ["pv", "battery", "house", "grid"],
      cards_visibility: themedConfig.layout?.cards_visibility || {
        pv: themedConfig.pv?.show !== false,
        battery: themedConfig.batterie?.show !== false,
        house: themedConfig.haus?.show !== false,
        grid: themedConfig.netz?.show !== false
      }
    },
    info_bar: {
      show: themedConfig.info_bar?.show === true,
      position: themedConfig.info_bar?.position || "top",
      calculation_mode: themedConfig.info_bar?.calculation_mode || "autarky",
      calculate_battery_times: themedConfig.info_bar?.calculate_battery_times === true,
      item1_calc_type: themedConfig.info_bar?.item1_calc_type ?? (themedConfig.info_bar?.calculation_mode || "autarky"),
      item2_calc_type: themedConfig.info_bar?.item2_calc_type ?? "runtime",
      item3_calc_type: themedConfig.info_bar?.item3_calc_type ?? "chargetime",
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
        label_line_height: themedConfig.info_bar?.style?.label_line_height ?? "1.2",
        value_size: themedConfig.info_bar?.style?.value_size ?? "1em",
        value_color: themedConfig.info_bar?.style?.value_color ?? "white",
        value_font_weight: themedConfig.info_bar?.style?.value_font_weight ?? "bold",
        value_line_height: themedConfig.info_bar?.style?.value_line_height ?? "1.4",
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
      pv_bar_gap: themedConfig.style?.pv_bar_gap ?? "6px",
      battery_bar_gap: themedConfig.style?.battery_bar_gap ?? "6px",
      header_background_enabled: themedConfig.style?.header_background_enabled ?? false,
      header_background_color: themedConfig.style?.header_background_color ?? "rgba(21, 20, 27, 1)",
      header_border_color: themedConfig.style?.header_border_color ?? "rgba(255, 255, 255, 0.1)",
      header_border_radius: themedConfig.style?.header_border_radius ?? "16px",
      header_padding: themedConfig.style?.header_padding ?? "12px",
      header_width: themedConfig.style?.header_width ?? "auto",
      header_box_shadow: themedConfig.style?.header_box_shadow ?? "0 2px 8px 0 rgba(0, 0, 0, 0.15)",
      title_align: themedConfig.style?.title_align ?? "center",
      title_size: themedConfig.style?.title_size ?? "1.5em",
      title_font_weight: themedConfig.style?.title_font_weight ?? "bold",
      title_color: themedConfig.style?.title_color ?? "white",
      title_line_height: themedConfig.style?.title_line_height ?? "1.2",
      title_subtitle_gap: themedConfig.style?.title_subtitle_gap ?? "4px",
      subtitle_align: themedConfig.style?.subtitle_align ?? "center",
      subtitle_size: themedConfig.style?.subtitle_size ?? "1em",
      subtitle_font_weight: themedConfig.style?.subtitle_font_weight ?? "normal",
      subtitle_color: themedConfig.style?.subtitle_color ?? "rgba(255, 255, 255, 0.7)",
      subtitle_line_height: themedConfig.style?.subtitle_line_height ?? "1.4",
      header_icon_size: themedConfig.style?.header_icon_size ?? "1.5em",
      header_icon_color: themedConfig.style?.header_icon_color ?? "white",
      header_icon_margin: themedConfig.style?.header_icon_margin ?? "8px",
      icon_size: themedConfig.style?.icon_size ?? "2em",
      icon_opacity: themedConfig.style?.icon_opacity ?? "1",
      icon_margin: themedConfig.style?.icon_margin ?? "6px",
      primary_size: themedConfig.style?.primary_size ?? "1.2em",
      primary_color: themedConfig.style?.primary_color ?? "white",
      primary_font_opacity: themedConfig.style?.primary_font_opacity ?? "1",
      primary_font_weight: themedConfig.style?.primary_font_weight ?? "normal",
      primary_line_height: themedConfig.style?.primary_line_height ?? "1.2",
      secondary_size: themedConfig.style?.secondary_size ?? "0.9em",
      secondary_color: themedConfig.style?.secondary_color ?? "white",
      secondary_font_weight: themedConfig.style?.secondary_font_weight ?? "normal",
      secondary_font_opacity: themedConfig.style?.secondary_font_opacity ?? "0.7",
      secondary_line_height: themedConfig.style?.secondary_line_height ?? "1.4",
      tertiary_size: themedConfig.style?.tertiary_size ?? "0.9em",
      tertiary_color: themedConfig.style?.tertiary_color ?? "white",
      tertiary_font_weight: themedConfig.style?.tertiary_font_weight ?? "normal",
      tertiary_font_opacity: themedConfig.style?.tertiary_font_opacity ?? "0.7",
      tertiary_line_height: themedConfig.style?.tertiary_line_height ?? "1.4",
      ...themedConfig.style
    },
    netz: {
      show: themedConfig.netz?.show !== false,
      animation: themedConfig.netz?.animation !== false,
      animation_style: themedConfig.netz?.animation_style || "rotating-dots",
      threshold: themedConfig.netz?.threshold ?? 10,
      text_einspeisen: themedConfig.netz?.text_einspeisen ?? t2.status.feed_in,
      text_neutral: themedConfig.netz?.text_neutral ?? t2.status.neutral,
      text_bezug: themedConfig.netz?.text_bezug ?? t2.status.grid_consumption,
      ...themedConfig.netz
    },
    pv: {
      show: themedConfig.pv?.show !== false,
      animation: themedConfig.pv?.animation !== false,
      animation_style: themedConfig.pv?.animation_style || "rotating-dots",
      icon_rotation: themedConfig.pv?.icon_rotation === true,
      max_power: themedConfig.pv?.max_power ?? 1e4,
      ...themedConfig.pv
    },
    batterie: {
      show: themedConfig.batterie?.show !== false,
      animation: themedConfig.batterie?.animation !== false,
      animation_style: themedConfig.batterie?.animation_style || "rotating-dots",
      battery_capacity: themedConfig.batterie?.battery_capacity ?? 1e4,
      calculate_runtime: themedConfig.batterie?.calculate_runtime === true,
      ...themedConfig.batterie
    },
    haus: {
      show: themedConfig.haus?.show !== false,
      animation: themedConfig.haus?.animation !== false,
      animation_style: themedConfig.haus?.animation_style || "rotating-dots",
      ...themedConfig.haus
    },
    consumers: {
      show: themedConfig.consumers?.show === true,
      position: themedConfig.consumers?.position || "bottom",
      sort_mode: themedConfig.consumers?.sort_mode || "highest_first",
      threshold: themedConfig.consumers?.threshold ?? 0,
      style: {
        gap: themedConfig.consumers?.style?.gap ?? "6px",
        item_background_color: themedConfig.consumers?.style?.item_background_color ?? "rgba(21, 20, 27, 1)",
        item_border_color: themedConfig.consumers?.style?.item_border_color ?? "rgba(255, 255, 255, 0.1)",
        item_border_radius: themedConfig.consumers?.style?.item_border_radius ?? "18px",
        item_padding: themedConfig.consumers?.style?.item_padding ?? "6px 12px",
        item_margin: themedConfig.consumers?.style?.item_margin ?? "2px",
        item_box_shadow: themedConfig.consumers?.style?.item_box_shadow ?? "0 2px 8px 0 rgba(0, 0, 0, 0.15)",
        icon_size: themedConfig.consumers?.style?.icon_size ?? "1.2em",
        icon_opacity: themedConfig.consumers?.style?.icon_opacity ?? "1",
        primary_size: themedConfig.consumers?.style?.primary_size ?? "0.9em",
        primary_font_weight: themedConfig.consumers?.style?.primary_font_weight ?? "bold",
        primary_opacity: themedConfig.consumers?.style?.primary_opacity ?? "1",
        secondary_size: themedConfig.consumers?.style?.secondary_size ?? "0.7em",
        secondary_font_weight: themedConfig.consumers?.style?.secondary_font_weight ?? "normal",
        secondary_opacity: themedConfig.consumers?.style?.secondary_opacity ?? "0.7",
        ...themedConfig.consumers?.style
      },
      items: themedConfig.consumers?.items || []
    }
  };
}
function migrateConfig(config) {
  const migratedConfig = JSON.parse(JSON.stringify(config));
  if (migratedConfig.entities) {
    if (migratedConfig.entities.pv_production && !migratedConfig.pv?.entity) {
      if (!migratedConfig.pv) migratedConfig.pv = {};
      migratedConfig.pv.entity = migratedConfig.entities.pv_production;
    }
    if (migratedConfig.entities.battery_soc && !migratedConfig.batterie?.entity) {
      if (!migratedConfig.batterie) migratedConfig.batterie = {};
      migratedConfig.batterie.entity = migratedConfig.entities.battery_soc;
    }
    if (migratedConfig.entities.battery_charge && !migratedConfig.batterie?.ladung_entity) {
      if (!migratedConfig.batterie) migratedConfig.batterie = {};
      migratedConfig.batterie.ladung_entity = migratedConfig.entities.battery_charge;
    }
    if (migratedConfig.entities.battery_discharge && !migratedConfig.batterie?.entladung_entity) {
      if (!migratedConfig.batterie) migratedConfig.batterie = {};
      migratedConfig.batterie.entladung_entity = migratedConfig.entities.battery_discharge;
    }
    if (migratedConfig.entities.house_consumption && !migratedConfig.haus?.entity) {
      if (!migratedConfig.haus) migratedConfig.haus = {};
      migratedConfig.haus.entity = migratedConfig.entities.house_consumption;
    }
    if (migratedConfig.entities.grid_power && !migratedConfig.netz?.entity) {
      if (!migratedConfig.netz) migratedConfig.netz = {};
      migratedConfig.netz.entity = migratedConfig.entities.grid_power;
    }
    delete migratedConfig.entities;
  }
  if (migratedConfig.pv_max_power !== void 0 && !migratedConfig.pv?.max_power) {
    if (!migratedConfig.pv) migratedConfig.pv = {};
    migratedConfig.pv.max_power = migratedConfig.pv_max_power;
    delete migratedConfig.pv_max_power;
  }
  if (migratedConfig.battery_capacity !== void 0 && !migratedConfig.batterie?.battery_capacity) {
    if (!migratedConfig.batterie) migratedConfig.batterie = {};
    migratedConfig.batterie.battery_capacity = migratedConfig.battery_capacity;
    delete migratedConfig.battery_capacity;
  }
  if (migratedConfig.grid_threshold !== void 0 && !migratedConfig.netz?.threshold) {
    if (!migratedConfig.netz) migratedConfig.netz = {};
    migratedConfig.netz.threshold = migratedConfig.grid_threshold;
    delete migratedConfig.grid_threshold;
  }
  return migratedConfig;
}
function formatPower(value) {
  const absValue = Math.abs(value);
  if (absValue >= 1e3) {
    return `${(value / 1e3).toFixed(2)} kW`;
  }
  return `${Math.round(value)} W`;
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
function aggregatePVPower(entities, hass) {
  if (!entities || entities.length === 0) return 0;
  return entities.reduce((sum, entity) => {
    const state = hass.states[entity.entity];
    if (!state || state.state === "unavailable" || state.state === "unknown") return sum;
    const value = parseFloat(state.state);
    return sum + (isNaN(value) ? 0 : value);
  }, 0);
}
function aggregateBatterySOC(entities, hass) {
  if (!entities || entities.length === 0) return 0;
  const values = entities.map((e2) => {
    const state = hass.states[e2.entity];
    if (!state || state.state === "unavailable" || state.state === "unknown") return null;
    const value = parseFloat(state.state);
    return isNaN(value) ? null : value;
  }).filter((v2) => v2 !== null);
  if (values.length === 0) return 0;
  return values.reduce((sum, v2) => sum + v2, 0) / values.length;
}
function aggregateBatteryPower(entities, hass) {
  let totalCharge = 0;
  let totalDischarge = 0;
  if (!entities || entities.length === 0) {
    return { charge: 0, discharge: 0 };
  }
  entities.forEach((entity) => {
    if (entity.charge_entity) {
      const chargeState = hass.states[entity.charge_entity];
      if (chargeState && chargeState.state !== "unavailable" && chargeState.state !== "unknown") {
        const value = parseFloat(chargeState.state);
        if (!isNaN(value)) {
          totalCharge += value;
        }
      }
    }
    if (entity.discharge_entity) {
      const dischargeState = hass.states[entity.discharge_entity];
      if (dischargeState && dischargeState.state !== "unavailable" && dischargeState.state !== "unknown") {
        const value = parseFloat(dischargeState.state);
        if (!isNaN(value)) {
          totalDischarge += value;
        }
      }
    }
  });
  return { charge: totalCharge, discharge: totalDischarge };
}
function getTotalBatteryCapacity(entities) {
  if (!entities || entities.length === 0) return 0;
  return entities.reduce((sum, entity) => {
    return sum + (entity.capacity || 0);
  }, 0);
}
function getTotalPVMaxPower(entities) {
  if (!entities || entities.length === 0) return 0;
  return entities.reduce((sum, entity) => {
    return sum + (entity.max_power || 0);
  }, 0);
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
function getBatterieColor(charge, discharge, batteryCapacity = 1e4) {
  const net_w = charge - discharge;
  const abs_w = Math.abs(net_w);
  const threshold = 10;
  const dur = Math.max(1, 15 - abs_w / (batteryCapacity * 0.6) * 6);
  if (Math.abs(net_w) < threshold) {
    return { color: "", duration: dur, show: false };
  }
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
function getNetzColor(power, threshold) {
  const abs_w = Math.abs(power);
  const dur = Math.max(1, 15 - abs_w / 6e3 * 6);
  if (abs_w < threshold) {
    return { color: "", duration: dur, show: false };
  }
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
function getPVColor(power, maxPower = 1e4) {
  const abs_w = Math.abs(power);
  const dur_glow = Math.max(1, 15 - abs_w / (maxPower * 0.6) * 6);
  if (abs_w < 10) {
    return { color: "", duration: dur_glow, show: false };
  }
  const step1 = maxPower * 0.01;
  const step2 = maxPower * 0.05;
  const step3 = maxPower * 0.1;
  const step4 = maxPower * 0.2;
  const step5 = maxPower * 0.4;
  const step6 = maxPower * 0.6;
  const step7 = maxPower * 0.8;
  const step8 = maxPower;
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
function getHausColor(power) {
  const w = Math.abs(power);
  const threshold = 50;
  const dur = Math.max(1, 6 - w / 6e3 * 4);
  if (w < threshold) {
    return { color: "", duration: dur, show: false };
  }
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
function getConsumerColor(powerW) {
  const w = Math.abs(powerW);
  if (w <= 10) return "rgba(76,175,80,1)";
  else if (w <= 25) return "rgba(139,195,74,1)";
  else if (w <= 50) return "rgba(205,220,57,1)";
  else if (w <= 100) return "rgba(255,235,59,1)";
  else if (w <= 150) return "rgba(255,193,7,1)";
  else if (w <= 200) return "rgba(255,152,0,1)";
  else if (w <= 250) return "rgba(255,87,34,1)";
  else if (w <= 300) return "rgba(244,67,54,1)";
  else if (w <= 500) return "rgba(233,30,99,1)";
  else if (w <= 1e3) return "rgba(156,39,176,1)";
  else if (w <= 1500) return "rgba(103,58,183,1)";
  else if (w <= 2500) return "rgba(63,81,181,1)";
  else return "rgba(26,35,126,1)";
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
function getPVRotationSpeed(power, maxPower = 1e4) {
  const abs_w = Math.abs(power);
  if (abs_w < 10) return 60;
  const ratio = abs_w / maxPower;
  const speed = Math.max(2, 30 - ratio * 28);
  return speed;
}
function getRotatingDotsStyle(color, duration) {
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
function getParticleFieldStyle(color, duration) {
  const opaqueColor = color.replace(/[\d.]+\)$/, "1)");
  return `
        position: absolute;
        top: -50%;
        left: -50%;
        right: -50%;
        bottom: -50%;
        border-radius: 50%;
        background: 
            radial-gradient(circle at 20% 30%, ${opaqueColor} 3px, transparent 3px),
            radial-gradient(circle at 60% 70%, ${opaqueColor} 4px, transparent 4px),
            radial-gradient(circle at 80% 20%, ${opaqueColor} 3px, transparent 3px),
            radial-gradient(circle at 30% 80%, ${opaqueColor} 3.5px, transparent 3.5px),
            radial-gradient(circle at 90% 60%, ${opaqueColor} 3px, transparent 3px),
            radial-gradient(circle at 15% 60%, ${opaqueColor} 4px, transparent 4px),
            radial-gradient(circle at 70% 40%, ${opaqueColor} 3px, transparent 3px),
            radial-gradient(circle at 40% 15%, ${opaqueColor} 3.5px, transparent 3.5px),
            radial-gradient(circle at 50% 50%, ${opaqueColor} 4px, transparent 4px),
            radial-gradient(circle at 25% 55%, ${opaqueColor} 3px, transparent 3px),
            radial-gradient(circle at 75% 65%, ${opaqueColor} 3.5px, transparent 3.5px),
            radial-gradient(circle at 85% 45%, ${opaqueColor} 3px, transparent 3px);
        background-size: 100% 100%;
        animation: particleFloat ${duration}s ease-in-out infinite;
        z-index: 0;
        opacity: 0.9;
    `;
}
function getElectricArcStyle(color, duration) {
  const brightColor = color.replace(/[\d.]+\)$/, "1)");
  const mediumColor = color.replace(/[\d.]+\)$/, "0.7)");
  const dimColor = color.replace(/[\d.]+\)$/, "0.3)");
  return `
        position: absolute;
        top: -50%;
        left: -50%;
        right: -50%;
        bottom: -50%;
        border-radius: 50%;
        background: 
            conic-gradient(
                from 0deg,
                transparent 0deg,
                ${dimColor} 1deg,
                ${brightColor} 3deg,
                ${mediumColor} 5deg,
                transparent 7deg,
                transparent 43deg,
                ${dimColor} 44deg,
                ${brightColor} 46deg,
                ${mediumColor} 48deg,
                transparent 50deg,
                transparent 88deg,
                ${dimColor} 89deg,
                ${brightColor} 91deg,
                ${mediumColor} 93deg,
                transparent 95deg,
                transparent 133deg,
                ${dimColor} 134deg,
                ${brightColor} 136deg,
                ${mediumColor} 138deg,
                transparent 140deg,
                transparent 178deg,
                ${dimColor} 179deg,
                ${brightColor} 181deg,
                ${mediumColor} 183deg,
                transparent 185deg,
                transparent 223deg,
                ${dimColor} 224deg,
                ${brightColor} 226deg,
                ${mediumColor} 228deg,
                transparent 230deg,
                transparent 268deg,
                ${dimColor} 269deg,
                ${brightColor} 271deg,
                ${mediumColor} 273deg,
                transparent 275deg,
                transparent 313deg,
                ${dimColor} 314deg,
                ${brightColor} 316deg,
                ${mediumColor} 318deg,
                transparent 320deg,
                transparent 360deg
            );
        animation: electricPulse ${duration}s ease-in-out infinite;
        z-index: 0;
    `;
}
function getAnimationStyleByType(type, color, duration) {
  switch (type) {
    case "particle-field":
      return getParticleFieldStyle(color, duration);
    case "electric-arc":
      return getElectricArcStyle(color, duration);
    case "rotating-dots":
    default:
      return getRotatingDotsStyle(color, duration);
  }
}
function renderCard(config, style, getCardStyle2, handleAction) {
  const s2 = style;
  const cardStyle = config.cardConfig?.style;
  const iconColor = config.iconColor || (config.animStyle.show && config.animStyle.color ? config.animStyle.color : "");
  const primaryColor = cardStyle?.primary_color || s2.primary_color;
  const secondaryColor = cardStyle?.secondary_color || s2.secondary_color;
  const iconStyle = `font-size: ${s2.icon_size}; opacity: ${s2.icon_opacity}; ${config.customIconStyle || ""} ${iconColor ? `color: ${iconColor};` : ""}`;
  const primaryStyle = `font-size: ${s2.primary_size}; color: ${primaryColor}; opacity: ${s2.primary_font_opacity}; font-weight: ${s2.primary_font_weight}; line-height: ${s2.primary_line_height};`;
  const secondaryStyle = `font-size: ${s2.secondary_size}; color: ${secondaryColor}; opacity: ${s2.secondary_font_opacity}; font-weight: ${s2.secondary_font_weight}; line-height: ${s2.secondary_line_height};`;
  const tertiaryStyle = `font-size: ${s2.tertiary_size}; color: ${s2.tertiary_color}; opacity: ${s2.tertiary_font_opacity}; font-weight: ${s2.tertiary_font_weight}; line-height: ${s2.tertiary_line_height};`;
  const animationType = config.cardConfig?.animation_style || "rotating-dots";
  const isHaus = config.isHausCard || false;
  return x`
        <div class="card"
             style="${getCardStyle2(cardStyle)}"
             @click=${(e2) => handleAction(e2, { tap: config.cardConfig?.tap_action }, isHaus)}
             @dblclick=${(e2) => handleAction(e2, { double_tap: config.cardConfig?.double_tap_action }, isHaus)}
             @contextmenu=${(e2) => handleAction(e2, { hold: config.cardConfig?.hold_action }, isHaus)}>
            ${config.animStyle.show && config.animStyle.color ? x`
                <div style="${getAnimationStyleByType(animationType, config.animStyle.color, config.animStyle.duration)}"></div>
            ` : ""}
            <div class="icon" style="${iconStyle}; margin-bottom: ${s2.icon_margin};"><ha-icon .icon=${config.icon} style="--mdc-icon-size: ${s2.icon_size}; width: ${s2.icon_size}; height: ${s2.icon_size};"></ha-icon></div>
            <div class="primary" style="${primaryStyle}">${config.primaryValue}</div>
            ${config.secondaryText ? x`<div class="secondary" style="${secondaryStyle}">${config.secondaryText}</div>` : ""}
            ${config.tertiaryText ? x`<div class="tertiary" style="${tertiaryStyle}">${config.tertiaryText}</div>` : ""}
        </div>
    `;
}
function renderPV(config, hass, style, getCardStyle2, getTextFromEntityOrConfig2, handleAction) {
  if (!hass) return x``;
  const t2 = getTranslations(config.language);
  const entities = config.pv?.entities;
  if (!entities || entities.length === 0) {
    return x`<div class="card">⚠️ ${t2.general.missing_entity}</div>`;
  }
  const value = aggregatePVPower(entities, hass);
  const maxPower = getTotalPVMaxPower(entities);
  const shouldRotate = config.pv?.icon_rotation === true;
  let customIconStyle = "";
  if (shouldRotate && maxPower > 0) {
    const rotationSpeed = getPVRotationSpeed(value, maxPower);
    customIconStyle = `animation: continuousRotation ${rotationSpeed}s linear infinite;`;
  }
  return renderCard({
    cardConfig: config.pv,
    icon: config.pv?.icon || "mdi:white-balance-sunny",
    primaryValue: formatPower(value),
    secondaryText: getTextFromEntityOrConfig2(config.pv?.secondary_entity, config.pv?.secondary_text),
    tertiaryText: getTextFromEntityOrConfig2(config.pv?.tertiary_entity, config.pv?.tertiary_text),
    animStyle: config.pv?.animation ? getPVColor(value, maxPower) : { color: "", duration: 0, show: false },
    customIconStyle
  }, style, getCardStyle2, handleAction);
}
function renderBattery(config, hass, style, getCardStyle2, getTextFromEntityOrConfig2, handleAction) {
  if (!hass) return x``;
  const t2 = getTranslations(config.language);
  const entities = config.batterie?.entities;
  if (!entities || entities.length === 0) {
    return x`<div class="card">⚠️ ${t2.general.missing_entity}</div>`;
  }
  const soc = aggregateBatterySOC(entities, hass);
  const { charge, discharge } = aggregateBatteryPower(entities, hass);
  const totalCapacity = getTotalBatteryCapacity(entities);
  let icon = config.batterie?.icon;
  let iconColor = getBatteryIconColor(soc);
  if (!icon) {
    const firstEntity = entities[0];
    if (firstEntity?.icon) {
      icon = firstEntity.icon;
    } else {
      icon = getBatteryIcon(soc);
    }
  }
  let secondaryText = getTextFromEntityOrConfig2(config.batterie?.secondary_entity, config.batterie?.secondary_text);
  if (!secondaryText || secondaryText === "") {
    const netPower = charge - discharge;
    if (netPower > 10) {
      secondaryText = `+${formatPower(netPower)}`;
    } else if (netPower < -10) {
      const formatted = formatPower(Math.abs(netPower));
      secondaryText = `-${formatted}`;
    }
  }
  return renderCard({
    cardConfig: config.batterie,
    icon,
    primaryValue: `${soc.toFixed(0)}%`,
    secondaryText,
    tertiaryText: getTextFromEntityOrConfig2(config.batterie?.tertiary_entity, config.batterie?.tertiary_text),
    animStyle: config.batterie?.animation ? getBatterieColor(charge, discharge, totalCapacity) : { color: "", duration: 0, show: false },
    iconColor,
    customIconStyle: ""
  }, style, getCardStyle2, handleAction);
}
function renderHouse(config, hass, style, getCardStyle2, getTextFromEntityOrConfig2, calculateTotalConsumerPower2, handleAction) {
  const entityId = config.haus?.entity || config.entities?.house_consumption;
  if (!entityId || !hass) return x``;
  const entity = hass.states[entityId];
  const t2 = getTranslations(config.language);
  if (!entity) return x`<div class="card">⚠️ ${entityId} ${t2.general.missing_entity}</div>`;
  const value = parseFloat(entity.state) || 0;
  let secondaryText = getTextFromEntityOrConfig2(config.haus.secondary_entity, config.haus.secondary_text);
  if (config.haus.show_consumer_total && config.consumers?.show && config.consumers.items) {
    const totalConsumerPower = calculateTotalConsumerPower2();
    if (totalConsumerPower > 0) {
      secondaryText = formatPower(totalConsumerPower);
    }
  }
  return renderCard({
    cardConfig: config.haus,
    icon: config.haus.icon || "mdi:home",
    primaryValue: formatPower(value),
    secondaryText,
    tertiaryText: getTextFromEntityOrConfig2(config.haus.tertiary_entity, config.haus.tertiary_text),
    animStyle: config.haus.animation ? getHausColor(value) : { color: "", duration: 0, show: false },
    isHausCard: true
  }, style, getCardStyle2, handleAction);
}
function renderGrid(config, hass, style, getCardStyle2, getTextFromEntityOrConfig2, handleAction) {
  const entityId = config.netz?.entity || config.entities?.grid_power;
  if (!entityId || !hass) return x``;
  const entity = hass.states[entityId];
  const t2 = getTranslations(config.language);
  if (!entity) return x`<div class="card">⚠️ ${entityId} ${t2.general.missing_entity}</div>`;
  const value = parseFloat(entity.state) || 0;
  const threshold = config.netz?.threshold || config.grid_threshold || 10;
  let statusText = "";
  if (value < -threshold) {
    statusText = config.netz?.text_einspeisen || t2.status.feed_in;
  } else if (value > threshold) {
    statusText = config.netz?.text_bezug || t2.status.grid_consumption;
  } else {
    statusText = config.netz?.text_neutral || t2.status.neutral;
  }
  const secondaryText = getTextFromEntityOrConfig2(config.netz.secondary_entity, config.netz.secondary_text) || statusText;
  const tertiaryText = getTextFromEntityOrConfig2(config.netz.tertiary_entity, config.netz.tertiary_text);
  return renderCard({
    cardConfig: config.netz,
    icon: config.netz.icon || "mdi:transmission-tower",
    primaryValue: formatPower(value),
    secondaryText,
    tertiaryText,
    animStyle: config.netz.animation ? getNetzColor(value, threshold) : { color: "", duration: 0, show: false }
  }, style, getCardStyle2, handleAction);
}
function renderInfoBar(config, hass, handleTap) {
  if (!config.info_bar?.show || !hass) return x``;
  const ib = config.info_bar;
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
        ${s2.background_color !== "transparent" ? `box-shadow: ${config.style.card_boxshadow};` : ""}
    `;
  return x`
        <div class="info-bar"
             style="${infoBarStyle}"
             @click=${() => hasActions && handleTap(ib.tap_action)}
             @dblclick=${() => hasActions && handleTap(ib.double_tap_action)}
             @contextmenu=${(ev) => {
    if (hasActions && ib.hold_action) {
      ev.preventDefault();
      handleTap(ib.hold_action);
    }
  }}
        >
            ${renderInfoBarItem(config, hass, ib.item1, s2, ib.item1_calc_type || ib.calculation_mode)}
            ${renderInfoBarItem(config, hass, ib.item2, s2, ib.item2_calc_type)}
            ${renderInfoBarItem(config, hass, ib.item3, s2, ib.item3_calc_type)}
        </div>
    `;
}
function renderInfoBarItem(config, hass, item, s2, itemCalcType) {
  if (!item) return x``;
  let value = "";
  let unit = "";
  const getAggregatedPVPower = () => {
    const pvEntities = config.pv?.entities;
    if (pvEntities && pvEntities.length > 0) {
      return aggregatePVPower(pvEntities, hass);
    }
    return 0;
  };
  const getAggregatedBatteryValues = () => {
    const batteryEntities = config.batterie?.entities;
    if (batteryEntities && batteryEntities.length > 0) {
      const soc = aggregateBatterySOC(batteryEntities, hass);
      const power = aggregateBatteryPower(batteryEntities, hass);
      const capacity = getTotalBatteryCapacity(batteryEntities);
      return { soc, charge: power.charge, discharge: power.discharge, capacity };
    }
    return { soc: 0, charge: 0, discharge: 0, capacity: 0 };
  };
  const getGridPower = () => {
    if (config.netz?.entity) {
      return parseFloat(hass.states[config.netz.entity]?.state) || 0;
    }
    return getCentralEntityValue("grid_power");
  };
  const getHouseConsumption = () => {
    if (config.haus?.entity) {
      return parseFloat(hass.states[config.haus.entity]?.state) || 0;
    }
    return getCentralEntityValue("house_consumption");
  };
  if (itemCalcType === "autarky") {
    const pvProd = getAggregatedPVPower();
    const battery = getAggregatedBatteryValues();
    const gridPower = getGridPower();
    const houseConsumption = getHouseConsumption();
    value = calculateAutarky(pvProd, battery.discharge, gridPower, houseConsumption);
    unit = "";
  } else if (itemCalcType === "self_consumption") {
    const pvProd = getAggregatedPVPower();
    const gridPower = getGridPower();
    value = calculateSelfConsumption(pvProd, gridPower);
    unit = "";
  } else if (itemCalcType === "runtime") {
    const battery = getAggregatedBatteryValues();
    value = calculateBatteryRuntime(battery.capacity, battery.soc, battery.charge, battery.discharge);
    unit = "";
  } else if (itemCalcType === "chargetime") {
    const battery = getAggregatedBatteryValues();
    value = calculateBatteryChargeTime(battery.capacity, battery.soc, battery.charge, battery.discharge);
    unit = "";
  } else if (item.entity) {
    const entity = hass.states[item.entity];
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
                ${item.label ? x`<div class="info-bar-label" style="font-size: ${s2.label_size}; color: ${s2.label_color}; font-weight: ${s2.label_font_weight}; line-height: ${s2.label_line_height};">${item.label}</div>` : ""}
                <div class="info-bar-value" style="font-size: ${s2.value_size}; color: ${s2.value_color}; font-weight: ${s2.value_font_weight}; line-height: ${s2.value_line_height};">${value}${unit ? " " + unit : ""}</div>
            </div>
        </div>
    `;
}
function renderConsumers(config, hass, consumersVisible, handleConsumerAction) {
  console.log("renderConsumers called:", {
    show: config.consumers?.show,
    hasHass: !!hass,
    consumersVisible,
    itemsLength: config.consumers?.items?.length || 0
  });
  if (!config.consumers?.show || !hass || !consumersVisible) {
    console.log("renderConsumers: Early return");
    return x``;
  }
  const items = config.consumers.items || [];
  if (items.length === 0) {
    console.log("renderConsumers: No items");
    return x``;
  }
  const globalThreshold = config.consumers.threshold ?? 0;
  const globalStyle = config.consumers.style;
  console.log("renderConsumers: Processing items", { itemsCount: items.length, globalThreshold });
  const consumerData = items.map((item) => {
    const entity = hass.states[item.entity];
    console.log("Processing consumer item:", {
      entity: item.entity,
      entityExists: !!entity,
      state: entity?.state
    });
    if (!entity) {
      console.warn("Consumer entity not found:", item.entity);
      return null;
    }
    const value = parseFloat(entity.state) || 0;
    const threshold = item.threshold !== void 0 ? item.threshold : globalThreshold;
    console.log("Consumer value check:", {
      entity: item.entity,
      value,
      threshold,
      passes: value > threshold
    });
    if (value <= threshold) return null;
    return {
      item,
      entity,
      value,
      label: item.label || entity.attributes.friendly_name || item.entity
    };
  }).filter((d2) => d2 !== null);
  console.log("renderConsumers: Filtered consumer data", { count: consumerData.length });
  if (consumerData.length === 0) {
    console.log("renderConsumers: No consumers pass threshold");
    return x``;
  }
  const sortMode = config.consumers.sort_mode || "highest_first";
  if (sortMode === "highest_first") {
    consumerData.sort((a2, b2) => b2.value - a2.value);
  } else if (sortMode === "lowest_first") {
    consumerData.sort((a2, b2) => a2.value - b2.value);
  } else if (sortMode === "alpha_asc") {
    consumerData.sort((a2, b2) => a2.label.localeCompare(b2.label));
  } else if (sortMode === "alpha_desc") {
    consumerData.sort((a2, b2) => b2.label.localeCompare(a2.label));
  }
  console.log("renderConsumers: Rendering consumers", { count: consumerData.length });
  return x`
        <div class="consumers-bar" style="gap: ${globalStyle.gap};">
            ${consumerData.map((data) => renderConsumerItem$1(data, config, hass, handleConsumerAction))}
        </div>
    `;
}
function renderConsumerItem$1(data, config, hass, handleConsumerAction) {
  const { item, value, label } = data;
  const globalStyle = config.consumers.style;
  const itemStyle = item.style || {};
  const bgColor = itemStyle.background_color || globalStyle.item_background_color;
  const borderColor = itemStyle.border_color || globalStyle.item_border_color;
  const borderRadius = itemStyle.border_radius || globalStyle.item_border_radius;
  const padding = itemStyle.padding || globalStyle.item_padding;
  const margin = itemStyle.margin || globalStyle.item_margin;
  const boxShadow = itemStyle.box_shadow || globalStyle.item_box_shadow;
  const iconSize = itemStyle.icon_size || globalStyle.icon_size;
  const iconOpacity = itemStyle.icon_opacity || globalStyle.icon_opacity;
  const primarySize = itemStyle.primary_size || globalStyle.primary_size;
  const primaryFontWeight = itemStyle.primary_font_weight || globalStyle.primary_font_weight;
  const primaryOpacity = itemStyle.primary_opacity || globalStyle.primary_opacity;
  const secondarySize = itemStyle.secondary_size || globalStyle.secondary_size;
  const secondaryFontWeight = itemStyle.secondary_font_weight || globalStyle.secondary_font_weight;
  const secondaryOpacity = itemStyle.secondary_opacity || globalStyle.secondary_opacity;
  let iconColor = "";
  if (item.auto_color !== false) {
    iconColor = getConsumerColor(value);
  } else {
    iconColor = itemStyle.icon_color || "";
  }
  const primaryColor = itemStyle.primary_color || "white";
  const secondaryColor = itemStyle.secondary_color || "white";
  const containerStyle = `
        background: ${bgColor};
        border: 1px solid ${borderColor};
        border-radius: ${borderRadius};
        padding: ${padding};
        margin: ${margin};
        box-shadow: ${boxShadow};
    `;
  const iconStyle = `
        font-size: ${iconSize};
        opacity: ${iconOpacity};
        ${iconColor ? `color: ${iconColor};` : ""}
    `;
  const primaryStyle = `
        font-size: ${primarySize};
        font-weight: ${primaryFontWeight};
        opacity: ${primaryOpacity};
        color: ${primaryColor};
    `;
  const secondaryStyle = `
        font-size: ${secondarySize};
        font-weight: ${secondaryFontWeight};
        opacity: ${secondaryOpacity};
        color: ${secondaryColor};
    `;
  const icon = item.icon || "mdi:flash";
  let primaryText = "";
  const showPrimary = item.show_primary !== false;
  if (showPrimary) {
    if (item.primary_text) {
      primaryText = item.primary_text;
    } else if (item.primary_entity && hass) {
      const primaryEntity = hass.states[item.primary_entity];
      if (primaryEntity) {
        primaryText = `${primaryEntity.state} ${primaryEntity.attributes.unit_of_measurement || ""}`;
      } else {
        primaryText = formatPower(value);
      }
    } else {
      primaryText = formatPower(value);
    }
  }
  let secondaryText = "";
  const showSecondary = item.show_secondary !== false;
  if (showSecondary) {
    if (item.secondary_text) {
      secondaryText = item.secondary_text;
    } else if (item.secondary_entity && hass) {
      const secondaryEntity = hass.states[item.secondary_entity];
      if (secondaryEntity) {
        secondaryText = `${secondaryEntity.state} ${secondaryEntity.attributes.unit_of_measurement || ""}`;
      } else {
        secondaryText = label;
      }
    } else {
      secondaryText = label;
    }
  }
  console.log("Rendering consumer item:", {
    entity: item.entity,
    value,
    primaryText,
    secondaryText
  });
  return x`
        <div class="consumer-item"
             style="${containerStyle}"
             @click=${(e2) => handleConsumerAction(e2, item)}
             @dblclick=${(e2) => handleConsumerAction(e2, item)}
             @contextmenu=${(e2) => handleConsumerAction(e2, item)}>
            <div class="icon" style="${iconStyle}">
                <ha-icon .icon=${icon} style="--mdc-icon-size: ${iconSize}; width: ${iconSize}; height: ${iconSize};"></ha-icon>
            </div>
            <div class="consumer-content">
                ${showPrimary ? x`<div class="primary" style="${primaryStyle}">${primaryText}</div>` : ""}
                ${showSecondary ? x`<div class="secondary" style="${secondaryStyle}">${secondaryText}</div>` : ""}
            </div>
        </div>
    `;
}
function renderHeader(config) {
  const s2 = config.style;
  const showTitle = config.show_title && config.title;
  const showSubtitle = config.show_subtitle && config.subtitle;
  const showIcon = config.show_icon && config.icon;
  if (!showTitle && !showSubtitle) return x``;
  const titleStyle = `
        text-align: ${s2.title_align};
        font-size: ${s2.title_size};
        line-height: ${s2.title_line_height};
        font-weight: ${s2.title_font_weight};
        color: ${s2.title_color};
        margin: 0;
    `;
  const subtitleStyle = `
        text-align: ${s2.subtitle_align};
        font-size: ${s2.subtitle_size};
        line-height: ${s2.subtitle_line_height};
        font-weight: ${s2.subtitle_font_weight};
        color: ${s2.subtitle_color};
        margin: ${s2.title_subtitle_gap || "4px"} 0 0 0;
    `;
  const headerIconStyle = `
        font-size: ${s2.header_icon_size};
        color: ${s2.header_icon_color};
        margin-right: ${s2.header_icon_margin};
    `;
  const headerBackgroundEnabled = s2.header_background_enabled ?? false;
  const headerWidth = s2.header_width ?? "auto";
  let headerStyle = "";
  if (headerBackgroundEnabled) {
    headerStyle = `
            background: ${s2.header_background_color};
            border: 1px solid ${s2.header_border_color};
            border-radius: ${s2.header_border_radius};
            padding: ${s2.header_padding};
            box-shadow: ${s2.header_box_shadow};
            width: ${headerWidth === "full" ? "calc(100% - 2 * var(--ha-card-border-width, 1px))" : "fit-content"};
            ${headerWidth === "auto" ? "margin-left: auto; margin-right: auto;" : ""}
            box-sizing: border-box;
            margin-bottom: ${s2.header_margin_bottom || "12px"};
        `;
  } else {
    headerStyle = `margin-bottom: ${s2.header_margin_bottom || "12px"};`;
  }
  return x`
        <div class="card-header" style="${headerStyle}">
            ${showIcon ? x`
                <div class="card-header-with-icon">
                    <ha-icon .icon=${config.icon} style="${headerIconStyle} --mdc-icon-size: ${s2.header_icon_size}; width: ${s2.header_icon_size}; height: ${s2.header_icon_size};"></ha-icon>
                    <div class="card-header-text">
                        ${showTitle ? x`<h2 style="${titleStyle}">${config.title}</h2>` : ""}
                        ${showSubtitle ? x`<p style="${subtitleStyle}">${config.subtitle}</p>` : ""}
                    </div>
                </div>
            ` : x`
                ${showTitle ? x`<h2 style="${titleStyle}">${config.title}</h2>` : ""}
                ${showSubtitle ? x`<p style="${subtitleStyle}">${config.subtitle}</p>` : ""}
            `}
        </div>
    `;
}
function renderPVBar(config, hass) {
  const pvBar = config.pv_bar;
  const pvEntities = config.pv?.entities;
  if (!pvBar?.show || !pvEntities || pvEntities.length === 0) {
    return x``;
  }
  const style = pvBar.style || {};
  const align = pvBar.align || "left";
  const entityData = [];
  pvEntities.forEach((entity) => {
    if (entity.entity && hass?.states[entity.entity]) {
      const state = hass.states[entity.entity];
      const value = parseFloat(state.state) || 0;
      entityData.push({ entity, value, state });
    }
  });
  const barStyle = `
        background-color: ${style.background_color || "transparent"};
        border: 1px solid ${style.border_color || "rgba(127, 127, 127, 0.3)"};
        border-radius: ${style.border_radius || "8px"};
        padding: ${style.padding || "12px"};
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: ${style.gap || "12px"};
        justify-content: ${align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start"};
        align-items: center;
    `;
  const itemGap = style.item_gap || "0.5rem";
  const separator = style.separator || "|";
  const iconSize = style.icon_size || "1.5em";
  return x`
        <div class="pv-bar" style="${barStyle}">
            ${entityData.map((data, index) => x`
                <div class="pv-bar-item" style="display: flex; align-items: center; gap: ${itemGap};">
                    ${data.entity.icon ? x`
                        <ha-icon
                                .icon="${data.entity.icon}"
                                style="
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                width: ${iconSize};
                                height: ${iconSize};
                                --mdc-icon-size: ${iconSize};
                                color: ${style.icon_color || "#7f7f7f"};
                            "
                        ></ha-icon>
                    ` : ""}
                    <span class="pv-bar-label" style="
                        font-size: ${style.label_size || "0.9em"};
                        color: ${style.label_color || "#7f7f7f"};
                        font-weight: ${style.label_font_weight || "normal"};
                        line-height: ${style.label_line_height || "1.4"};
                    ">
                        ${data.entity.name || data.state.attributes.friendly_name || data.entity.entity}
                    </span>
                    <span class="pv-bar-value" style="
                        font-size: ${style.value_size || "1em"};
                        color: ${style.value_color || "#ffffff"};
                        font-weight: ${style.value_font_weight || "bold"};
                        line-height: ${style.value_line_height || "1.4"};
                    ">
                        ${formatPower(data.value)}
                    </span>
                </div>
                ${index < entityData.length - 1 ? x`<span style="color: rgba(127, 127, 127, 0.3);">${separator}</span>` : ""}
            `)}
        </div>
    `;
}
function renderBatteryBar(config, hass) {
  const batteryBar = config.battery_bar;
  const batteryEntities = config.batterie?.entities;
  if (!batteryBar?.show || !batteryEntities || batteryEntities.length === 0) {
    return x``;
  }
  const style = batteryBar.style || {};
  const align = batteryBar.align || "left";
  const entityData = [];
  batteryEntities.forEach((entity) => {
    if (entity.entity && hass?.states[entity.entity]) {
      const state = hass.states[entity.entity];
      const soc = parseFloat(state.state) || 0;
      let charge = 0;
      if (entity.charge_entity && hass.states[entity.charge_entity]) {
        charge = parseFloat(hass.states[entity.charge_entity].state) || 0;
      }
      let discharge = 0;
      if (entity.discharge_entity && hass.states[entity.discharge_entity]) {
        discharge = parseFloat(hass.states[entity.discharge_entity].state) || 0;
      }
      entityData.push({ entity, soc, charge, discharge, state });
    }
  });
  const barStyle = `
        background-color: ${style.background_color || "transparent"};
        border: 1px solid ${style.border_color || "rgba(127, 127, 127, 0.3)"};
        border-radius: ${style.border_radius || "8px"};
        padding: ${style.padding || "12px"};
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: ${style.gap || "12px"};
        justify-content: ${align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start"};
        align-items: center;
    `;
  const itemGap = style.item_gap || "0.5rem";
  const separator = style.separator || "|";
  const iconSize = style.icon_size || "1.5em";
  return x`
        <div class="battery-bar" style="${barStyle}">
            ${entityData.map((data, index) => {
    const useDynamicIcon = data.entity.use_dynamic_icon !== false && !data.entity.icon;
    const icon = useDynamicIcon ? getBatteryIcon(data.soc) : data.entity.icon;
    const iconColor = useDynamicIcon || !style.icon_color ? getBatteryIconColor(data.soc) : style.icon_color;
    return x`
                <div class="battery-bar-item" style="display: flex; align-items: center; gap: ${itemGap};">
                    ${icon ? x`
                        <ha-icon
                            .icon="${icon}"
                            style="
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                width: ${iconSize};
                                height: ${iconSize};
                                --mdc-icon-size: ${iconSize};
                                color: ${iconColor};
                            "
                        ></ha-icon>
                    ` : ""}
                    <span class="battery-bar-label" style="
                        font-size: ${style.label_size || "0.9em"};
                        color: ${style.label_color || "#7f7f7f"};
                        font-weight: ${style.label_font_weight || "normal"};
                        line-height: ${style.label_line_height || "1.4"};
                    ">
                        ${data.entity.name || data.state.attributes.friendly_name || data.entity.entity}
                    </span>
                    <span class="battery-bar-value" style="
                        font-size: ${style.value_size || "1em"};
                        color: ${style.value_color || "#ffffff"};
                        font-weight: ${style.value_font_weight || "bold"};
                        line-height: ${style.value_line_height || "1.4"};
                    ">
                        ${data.soc.toFixed(0)}%
                        ${data.charge > 0 ? x` (+${formatPower(data.charge)})` : ""}
                        ${data.discharge > 0 ? x` (-${formatPower(data.discharge)})` : ""}
                    </span>
                </div>
                ${index < entityData.length - 1 ? x`<span style="color: rgba(127, 127, 127, 0.3);">${separator}</span>` : ""}
                `;
  })}
        </div>
    `;
}
function renderWarnings(warnings) {
  if (!warnings || warnings.length === 0) {
    return x``;
  }
  return x`
        <div class="warnings-container" style="
            background: rgba(244, 67, 54, 0.1);
            border: 1px solid rgba(244, 67, 54, 0.3);
            border-radius: 8px;
            padding: 8px 12px;
            margin-bottom: 12px;
        ">
            ${warnings.map((warning) => x`
                <div class="warning-item" style="
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin: 4px 0;
                    font-size: 0.9em;
                    color: rgba(244, 67, 54, 1);
                ">
                    <ha-icon icon="mdi:alert" style="font-size: 1.2em;"></ha-icon>
                    <span>${warning.message}</span>
                </div>
            `)}
        </div>
    `;
}
class ActionHandler {
  constructor(getHass, dispatchEvent) {
    this.getHass = getHass;
    this.dispatchEvent = dispatchEvent;
  }
  handleAction(event, actions, isHausCard = false, toggleConsumers) {
    if (isHausCard && toggleConsumers) {
      if (event.type === "click") {
        toggleConsumers();
        return;
      }
    }
    const actionType = event.type === "dblclick" ? "double_tap" : event.type === "contextmenu" ? "hold" : "tap";
    const action = actions[actionType];
    if (event.type === "contextmenu") {
      event.preventDefault();
    }
    this.handleTap(action);
  }
  /**
   * Handhabt Consumer-spezifische Actions
   * @param event Event
   * @param consumer Consumer Item Config
   */
  handleConsumerAction(event, consumer) {
    console.log("handleConsumerAction called:", {
      eventType: event.type,
      consumerEntity: consumer.entity,
      tap_action_target: consumer.tap_action_target,
      double_tap_action_target: consumer.double_tap_action_target,
      hold_action_target: consumer.hold_action_target
    });
    const actionType = event.type === "dblclick" ? "double_tap" : event.type === "contextmenu" ? "hold" : "tap";
    if (event.type === "contextmenu") {
      event.preventDefault();
    }
    let target;
    if (actionType === "tap") target = consumer.tap_action_target;
    else if (actionType === "double_tap") target = consumer.double_tap_action_target;
    else if (actionType === "hold") target = consumer.hold_action_target;
    console.log("Action type and target:", { actionType, target });
    if (!target) {
      target = "none";
      console.log("No target defined, using default: none");
    }
    if (target === "entity") {
      console.log("Toggling consumer entity:", consumer.entity);
      this.toggleEntity(consumer.entity);
    } else if (target === "custom_entity") {
      let customEntity;
      if (actionType === "tap") customEntity = consumer.tap_action_custom_entity;
      else if (actionType === "double_tap") customEntity = consumer.double_tap_action_custom_entity;
      else if (actionType === "hold") customEntity = consumer.hold_action_custom_entity;
      console.log("Toggling custom entity:", customEntity);
      if (customEntity) {
        this.toggleEntity(customEntity);
      }
    } else if (target === "custom_action") {
      let action;
      if (actionType === "tap") action = consumer.tap_action;
      else if (actionType === "double_tap") action = consumer.double_tap_action;
      else if (actionType === "hold") action = consumer.hold_action;
      console.log("Executing custom action:", action);
      this.handleTap(action);
    } else {
      console.log("No action (target is none)");
    }
  }
  /**
   * Toggle eine Entity (z.B. Switch)
   */
  toggleEntity(entityId) {
    const hass = this.getHass();
    console.log("toggleEntity called:", { entityId, hasHass: !!hass });
    if (!hass || !entityId) {
      console.warn("toggleEntity: Missing hass or entityId");
      return;
    }
    const [domain] = entityId.split(".");
    const service = "toggle";
    console.log("Calling service:", { domain, service, entity_id: entityId });
    if (hass.callService) {
      console.log("Using hass.callService");
      hass.callService(domain, service, { entity_id: entityId });
    } else {
      console.log("Using window.dispatchEvent");
      window.dispatchEvent(new CustomEvent("hass-call-service", {
        bubbles: true,
        composed: true,
        detail: {
          domain,
          service,
          serviceData: { entity_id: entityId }
        }
      }));
    }
  }
  handleTap(tapAction) {
    if (!tapAction || tapAction.action === "none") return;
    const hass = this.getHass();
    if (tapAction.action === "toggle") {
      const entityId = tapAction.target?.entity_id;
      if (entityId) {
        this.toggleEntity(entityId);
      }
    } else if (tapAction.action === "navigate" && tapAction.navigation_path) {
      history.pushState(null, "", tapAction.navigation_path);
      window.dispatchEvent(new CustomEvent("location-changed"));
    } else if (tapAction.action === "url" && tapAction.url_path) {
      window.open(tapAction.url_path, "_blank");
    } else if (tapAction.action === "call-service" && tapAction.service && hass) {
      const [domain, service] = tapAction.service.split(".");
      const serviceData = { ...tapAction.service_data || {} };
      if (tapAction.target) {
        Object.assign(serviceData, tapAction.target);
      }
      if (hass.callService) {
        hass.callService(domain, service, serviceData);
      } else {
        window.dispatchEvent(new CustomEvent("hass-call-service", {
          bubbles: true,
          composed: true,
          detail: {
            domain,
            service,
            serviceData
          }
        }));
      }
    } else if (tapAction.action === "more-info") {
      const entityId = tapAction.target?.entity_id;
      if (entityId && this.dispatchEvent) {
        this.dispatchEvent(new CustomEvent("hass-more-info", {
          composed: true,
          bubbles: true,
          detail: { entityId }
        }));
      }
    }
  }
}
function getCardStyle(cardStyle, style) {
  const s2 = style;
  const bgColor = cardStyle?.background_color || s2.card_background_color || "rgba(21, 20, 27, 1)";
  const borderColor = cardStyle?.border_color || s2.card_border_color || "rgba(255, 255, 255, 0.1)";
  return `background: ${bgColor}; border: 1px solid ${borderColor}; box-shadow: ${s2.card_boxshadow}; border-radius: ${s2.card_border_radius}; color: ${s2.card_text_color}; cursor: ${s2.card_cursor}; padding: ${s2.card_padding};`;
}
function getTextFromEntityOrConfig(hass, entity, text) {
  if (entity && hass) {
    const entityObj = hass.states[entity];
    if (entityObj) {
      return `${entityObj.state} ${entityObj.attributes.unit_of_measurement || ""}`;
    }
  }
  return text || "";
}
function calculateTotalConsumerPower(hass, consumerItems, globalThreshold) {
  if (!consumerItems || !hass) return 0;
  let total = 0;
  for (const item of consumerItems) {
    const entity = hass.states[item.entity];
    if (!entity) continue;
    const value = parseFloat(entity.state) || 0;
    const threshold = item.threshold !== void 0 ? item.threshold : globalThreshold;
    if (value > threshold) {
      total += value;
    }
  }
  return total;
}
function calculateGridColumns(config) {
  const visibility = config.layout?.cards_visibility || {
    pv: config.pv?.show !== false,
    battery: config.batterie?.show !== false,
    house: config.haus?.show !== false,
    grid: config.netz?.show !== false
  };
  let visibleCards = 0;
  if (visibility.pv) visibleCards++;
  if (visibility.battery) visibleCards++;
  if (visibility.house) visibleCards++;
  if (visibility.grid) visibleCards++;
  if (visibleCards === 3) return "repeat(3, 1fr)";
  if (visibleCards === 2) return "repeat(2, 1fr)";
  if (visibleCards === 1) return "1fr";
  return "repeat(4, 1fr)";
}
function validatePVBar(config, hass) {
  const warnings = [];
  const pvBar = config.pv_bar;
  if (!pvBar?.show || !pvBar?.entities?.length) return warnings;
  if (pvBar.entities.length > 5) {
    warnings.push({
      type: "pv_bar",
      message: "Max. 5 PV-Anlagen erlaubt - nur erste 5 werden angezeigt"
    });
  }
  pvBar.entities.slice(0, 5).forEach((entity, index) => {
    if (!entity.max_power) {
      warnings.push({
        type: "pv_bar",
        message: `PV ${index + 1} (${entity.name || entity.entity}): max_power fehlt`
      });
    }
    if (!hass.states[entity.entity]) {
      warnings.push({
        type: "pv_bar",
        message: `PV ${index + 1}: Entity ${entity.entity} nicht gefunden`
      });
    }
  });
  return warnings;
}
function validateBatteryBar(config, hass) {
  const warnings = [];
  const batteryBar = config.battery_bar;
  if (!batteryBar?.show || !batteryBar?.entities?.length) return warnings;
  if (batteryBar.entities.length > 5) {
    warnings.push({
      type: "battery_bar",
      message: "Max. 5 Batterien erlaubt - nur erste 5 werden angezeigt"
    });
  }
  batteryBar.entities.slice(0, 5).forEach((entity, index) => {
    if (!entity.capacity) {
      warnings.push({
        type: "battery_bar",
        message: `Batterie ${index + 1} (${entity.name || entity.entity}): capacity fehlt`
      });
    }
    if (!hass.states[entity.entity]) {
      warnings.push({
        type: "battery_bar",
        message: `Batterie ${index + 1}: Entity ${entity.entity} nicht gefunden`
      });
    }
  });
  return warnings;
}
function validatePVCard(config, hass) {
  const warnings = [];
  const pv = config.pv;
  if (!pv?.show || !pv?.entities?.length) return warnings;
  pv.entities.forEach((entity, index) => {
    if (!entity.max_power) {
      warnings.push({
        type: "pv_card",
        message: `PV-Anlage ${index + 1}: max_power fehlt - Berechnungen nicht möglich`
      });
    }
  });
  return warnings;
}
function validateBatteryCard(config, hass) {
  const warnings = [];
  const batterie = config.batterie;
  if (!batterie?.show || !batterie?.entities?.length) return warnings;
  batterie.entities.forEach((entity, index) => {
    if (!entity.capacity) {
      warnings.push({
        type: "battery_card",
        message: `Batterie ${index + 1}: capacity fehlt - Berechnungen nicht möglich`
      });
    }
  });
  return warnings;
}
function validateOldConfig(config) {
  const warnings = [];
  if (config.pv?.entity && !config.pv?.entities?.length) {
    warnings.push({
      type: "pv_card",
      message: "⚠️ Config ungültig - verwende entities[] statt entity"
    });
  }
  if (config.batterie?.entity && !config.batterie?.entities?.length) {
    warnings.push({
      type: "battery_card",
      message: "⚠️ Config ungültig - verwende entities[] statt entity"
    });
  }
  return warnings;
}
function getAllValidationWarnings(config, hass) {
  return [
    ...validateOldConfig(config),
    ...validatePVBar(config, hass),
    ...validateBatteryBar(config, hass),
    ...validatePVCard(config),
    ...validateBatteryCard(config)
  ];
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
  constructor() {
    super(...arguments);
    this._consumersVisible = true;
    this._toggleConsumers = () => {
      if (this.config.consumers?.show && (this.config.consumers?.items?.length ?? 0) > 0) {
        this._consumersVisible = !this._consumersVisible;
        this.requestUpdate();
      }
    };
  }
  static async getConfigElement() {
    await Promise.resolve().then(() => editor);
    return document.createElement(`${CARD_TAG}-editor`);
  }
  static getStubConfig() {
    return {
      type: `custom:${CARD_TAG}`,
      title: "PV Monitor",
      show_title: true,
      pv: { entity: "", animation: true, max_power: 1e4 },
      batterie: { entity: "", animation: true },
      haus: { entity: "", animation: true },
      netz: { entity: "", animation: true, threshold: 10 }
    };
  }
  setConfig(config) {
    if (!config) throw new Error("Fehlende Konfiguration");
    const migratedConfig = migrateConfig(config);
    this.config = getDefaultConfig(migratedConfig);
    this._actionHandler = new ActionHandler(() => this.hass, this.dispatchEvent.bind(this));
    console.log("PV Monitor Card - Config updated:", {
      migrated: config.entities ? "yes" : "no",
      cards_order: this.config.layout?.cards_order,
      cards_visibility: this.config.layout?.cards_visibility
    });
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this._actionHandler) {
      this._actionHandler = new ActionHandler(() => this.hass, this.dispatchEvent.bind(this));
    }
  }
  _renderCards(s2, getCardStyleBound, getTextBound, calcConsumerPowerBound, handleActionBound) {
    const defaultOrder = ["pv", "battery", "house", "grid"];
    const cardsOrder = this.config.layout?.cards_order || defaultOrder;
    const cardsVisibility = this.config.layout?.cards_visibility || {
      pv: this.config.pv?.show !== false,
      battery: this.config.batterie?.show !== false,
      house: this.config.haus?.show !== false,
      grid: this.config.netz?.show !== false
    };
    console.log("_renderCards:", { cardsOrder, cardsVisibility });
    const cardRenderers = {
      pv: () => cardsVisibility.pv ? renderPV(this.config, this.hass, s2, getCardStyleBound, getTextBound, handleActionBound) : "",
      battery: () => cardsVisibility.battery ? renderBattery(this.config, this.hass, s2, getCardStyleBound, getTextBound, handleActionBound) : "",
      house: () => cardsVisibility.house ? renderHouse(this.config, this.hass, s2, getCardStyleBound, getTextBound, calcConsumerPowerBound, handleActionBound) : "",
      grid: () => cardsVisibility.grid ? renderGrid(this.config, this.hass, s2, getCardStyleBound, getTextBound, handleActionBound) : ""
    };
    return cardsOrder.map((card) => cardRenderers[card] ? cardRenderers[card]() : "");
  }
  render() {
    if (!this.config || !this._actionHandler) return x``;
    const s2 = this.config.style;
    const gridTemplateColumns = calculateGridColumns(this.config);
    const warnings = this.hass ? getAllValidationWarnings(this.config, this.hass) : [];
    const getCardStyleBound = (cardStyle) => getCardStyle(cardStyle, s2);
    const getTextBound = (entity, text) => getTextFromEntityOrConfig(this.hass, entity, text);
    const calcConsumerPowerBound = () => calculateTotalConsumerPower(this.hass, this.config.consumers?.items, this.config.consumers?.threshold ?? 0);
    const handleActionBound = (event, actions, isHausCard) => this._actionHandler.handleAction(event, actions, isHausCard || false, this._toggleConsumers);
    const handleTapBound = (action) => this._actionHandler.handleTap(action);
    const handleConsumerActionBound = (event, consumer) => this._actionHandler.handleConsumerAction(event, consumer);
    const order = this.config.layout?.order || ["header", "pv_bar", "cards", "info_bar", "battery_bar", "consumers"];
    const sections = {
      header: renderHeader(this.config),
      pv_bar: this.config.pv_bar?.show ? x`
                <div style="margin-top: ${s2.pv_bar_gap || "6px"}; margin-bottom: ${s2.pv_bar_gap || "6px"};">
                    ${renderPVBar(this.config, this.hass)}
                </div>
            ` : "",
      battery_bar: this.config.battery_bar?.show ? x`
                <div style="margin-top: ${s2.battery_bar_gap || "6px"}; margin-bottom: ${s2.battery_bar_gap || "6px"};">
                    ${renderBatteryBar(this.config, this.hass)}
                </div>
            ` : "",
      info_bar: this.config.info_bar?.show ? x`
                <div style="margin-top: ${s2.infobar_gap || "6px"}; margin-bottom: ${s2.infobar_gap || "6px"};">
                    ${renderInfoBar(this.config, this.hass, handleTapBound)}
                </div>
            ` : "",
      cards: x`
                <div class="grid" style="gap: ${this.config.grid_gap}; grid-template-columns: ${gridTemplateColumns};">
                    ${this._renderCards(s2, getCardStyleBound, getTextBound, calcConsumerPowerBound, handleActionBound)}
                </div>
            `,
      consumers: renderConsumers(this.config, this.hass, this._consumersVisible, handleConsumerActionBound)
    };
    return x`
            ${renderWarnings(warnings)}
            ${order.map((key) => sections[key] || "")}
        `;
  }
};
_PVMonitorCard.styles = pvMonitorCardStyles;
let PVMonitorCard = _PVMonitorCard;
__decorateClass$1([
  n2({ attribute: false })
], PVMonitorCard.prototype, "hass");
__decorateClass$1([
  n2({ attribute: false })
], PVMonitorCard.prototype, "config");
__decorateClass$1([
  n2()
], PVMonitorCard.prototype, "_consumersVisible");
if (!customElements.get(CARD_TAG)) {
  customElements.define(CARD_TAG, PVMonitorCard);
}
window.customCards = window.customCards || [];
window.customCards.push({
  type: `custom:${CARD_TAG}`,
  name: "PV Monitor Card",
  description: "Monitor your PV-System with Battery-Info, Calculations, Grid status and Devices Power Consumtion",
  preview: true,
  documentationURL: "https://github.com/sjerocom/pv-monitor-card"
});
const buildInfo = typeof __BUILD_TIMESTAMP__ !== "undefined" ? ` [DEV: ${__BUILD_TIMESTAMP__}]` : " Version: 0.0.1";
console.info(
  "%c PV-MONITOR-CARD %c" + buildInfo,
  "color: orange; font-weight: bold; background: black",
  "color: white; font-weight: bold; background: dimgray"
);
const general$d = { "missing_entity": "nedostaje", "inactive": "Neaktivno" };
const editor$e = /* @__PURE__ */ JSON.parse(`{"tab_general":"Opće","tab_elements":"Elementi","tab_cards":"Kartice","tab_layout":"Raspored","tab_language":"Jezik","tab_header":"Header","tab_theme":"Tema","tab_infobar":"Informacijska traka","tab_pv":"Solarni sistem","tab_battery":"Baterija","tab_house":"Kuća","tab_grid":"Mreža","tab_consumers":"Potrošači","tab_pv_bar":"Solarna traka","tab_battery_bar":"Traka baterije","card_header":"Zaglavlje kartice","title":"Naslov","title_placeholder":"Solarni monitor","title_helper":"Ostavite prazno za skrivanje.","subtitle":"Podnaslov","subtitle_placeholder":"Energetski pregled","subtitle_helper":"Ostavite prazno za skrivanje.","title_subtitle_gap":"Razmak između naslova i podnaslova","title_subtitle_gap_helper":"Udaljenost između naslova i podnaslova","header_icon_size":"Veličina ikone u zaglavlju","header_icon_size_helper":"Veličina ikone pored naslova","header_icon_color":"Boja ikone u zaglavlju","header_icon_margin":"Margina ikone u zaglavlju","icon":"Ikona","icon_helper":"Prikazuje se samo ako je naslov postavljen. Ostavite prazno za skrivanje.","layout":"Raspored","grid_gap":"Razmak mreže","grid_gap_placeholder":"6px","grid_gap_helper":"Udaljenost između kartica.","header_margin_bottom":"Razmak između zaglavlja i kartica/informacijske trake","header_margin_bottom_helper":"Udaljenost između naslova/podnaslova i informacijske trake/kartica","infobar_gap":"Razmak između informacijske trake i kartica","infobar_gap_helper":"Udaljenost između informacijske trake i četiri kartice","language":"Jezik","language_helper":"Odaberite jezik interfejsa","central_entities":"Centralne entitete","central_entities_helper":"Definišite glavne entitete koji se koriste za izračune","entity_pv_production":"Entitet solarne proizvodnje","entity_pv_production_helper":"Entitet za snagu solarnog sistema (koristi se za izračune)","entity_battery_soc":"Stanje napunjenosti baterije (SoC)","entity_battery_soc_helper":"Entitet za nivo napunjenosti baterije u % (za izračune)","entity_battery_charge":"Entitet punjenja baterije","entity_battery_charge_helper":"Entitet za snagu punjenja (za izračune)","entity_battery_discharge":"Entitet pražnjenja baterije","entity_battery_discharge_helper":"Entitet za snagu pražnjenja (za izračune)","entity_house_consumption":"Potrošnja kuće","entity_house_consumption_helper":"Entitet za potrošnju kuće (za izračun samostalnosti, opcionalno)","entity_grid_power":"Snaga mreže","entity_grid_power_helper":"Entitet za uvoz/izvoz u mrežu (za izračune)","central_config":"Centralna konfiguracija","central_config_helper":"Ove vrijednosti važe za sve kartice","pv_max_power_label":"Maksimalna solarna snaga (W)","pv_max_power_helper":"Maksimalna solarna snaga za animacije","battery_capacity_label":"Kapacitet baterije (Wh)","battery_capacity_label_helper":"Kapacitet baterije (npr. 10000 za 10 kWh)","grid_threshold_label":"Prag mreže (W)","grid_threshold_helper":"Ispod ove vrijednosti prikazuje se 'Neutralno'","card_visibility":"Vidljivost kartica","cards_order":"Redoslijed kartica","cards_order_helper":"Promijenite redoslijed i vidljivost četiri kartice","card_house":"Kuća","card_grid":"Mreža","show_pv_card":"Prikaži karticu solarnog sistema","show_battery_card":"Prikaži karticu baterije","show_house_card":"Prikaži karticu kuće","show_grid_card":"Prikaži karticu mreže","infobar_settings":"Postavke informacijske trake","enable_infobar":"Omogući informacijsku traku","infobar_position":"Pozicija informacijske trake","position_top":"Na vrhu (iznad kartica)","calculation_mode":"Režim izračuna za stavku 1","calculation_mode_helper":"Odaberite: Samostalnost ili Samopotrošnja","mode_autarky":"Samostalnost","mode_self_consumption":"Samopotrošnja","calculate_battery_times":"Izračunaj vrijeme baterije","calculate_battery_times_helper":"Automatski izračun za stavke 2 (preostalo vrijeme rada) i 3 (preostalo vrijeme punjenja)","item":"Stavka","entity":"Entitet","icon_label":"Ikona","label":"Oznaka","unit":"Jedinica","default_autarky":"Samostalnost","default_runtime":"Preostalo vrijeme rada","default_chargetime":"Preostalo vrijeme punjenja","pv_system":"Solarni sistem","pv_entity":"Solarni entitet","pv_entity_helper":"Entitet za snagu solarnog sistema","enable_animation":"Omogući animaciju","animation_style":"Stil animacije","animation_style_helper":"Odaberite stil animacije","animation_rotating_dots":"Rotirajuće tačke","animation_particle_field":"Polje čestica","animation_electric_arc":"Električni lukovi","icon_rotation":"Rotacija ikone","icon_rotation_helper":"Ikona se rotira prema snazi","max_power":"Maksimalna snaga (W)","max_power_helper":"Maksimalna solarna snaga za animacije i rotaciju","battery":"Baterija","battery_entity":"Entitet baterije","battery_entity_helper":"Entitet za nivo napunjenosti baterije (%)","charge_entity":"Entitet punjenja","charge_entity_helper":"Entitet za snagu punjenja","discharge_entity":"Entitet pražnjenja","discharge_entity_helper":"Entitet za snagu pražnjenja","battery_capacity":"Kapacitet baterije (Wh)","battery_capacity_helper":"Kapacitet za animacije (npr. 10000 za 10 kWh)","calculate_runtime":"Izračunaj vrijeme punjenja/pražnjenja","calculate_runtime_helper":"Automatski izračun za stavke 2 i 3 informacijske trake","icon_auto_helper":"Ostavite prazno za automatsku ikonu","house_consumption":"Potrošnja kuće","house_entity":"Entitet kuće","house_entity_helper":"Entitet za potrošnju kuće","grid":"Mreža","grid_entity":"Entitet mreže","grid_entity_helper":"Entitet za uvoz/izvoz u mrežu","threshold":"Prag (W)","threshold_helper":"Ispod ove vrijednosti prikazuje se 'Neutralno'","status_texts":"Tekstovi statusa","text_feed_in":"Tekst za predaju u mrežu","text_feed_in_placeholder":"Predaja","text_neutral":"Tekst za neutralno stanje","text_neutral_placeholder":"Neutralno","text_consumption":"Tekst za potrošnju","text_consumption_placeholder":"Potrošnja iz mreže","additional_texts":"Dodatni tekstovi","secondary_entity":"Sekundarni entitet","secondary_entity_helper":"Opcionalno: entitet za drugi red","secondary_text":"Sekundarni tekst","secondary_text_helper":"Opcionalno: statični tekst za drugi red","tertiary_entity":"Treći entitet","tertiary_text":"Treći tekst","styling":"Stil","background_color":"Boja pozadine","border_color":"Boja ivice","primary_color":"Primarna boja","secondary_color":"Sekundarna boja","icon_color":"Boja ikone","card_styling":"Stil kartice","header_background":"Pozadina zaglavlja","enable_header_background":"Omogući pozadinu zaglavlja","enable_header_background_helper":"Aktivira pozadinu za područje naslova/podnaslova","header_background_color":"Boja pozadine zaglavlja","header_border_color":"Boja ivice zaglavlja","header_border_radius":"Zaobljenje zaglavlja","header_padding":"Unutrašnji razmak zaglavlja","header_width":"Širina zaglavlja","header_width_helper":"Automatski = prema sadržaju, Puno = puna širina","header_width_auto":"Automatski (veličina sadržaja)","header_width_full":"Puno (100% širina)","header_box_shadow":"Sjena zaglavlja","border_radius":"Zaobljenje ivica","text_color":"Boja teksta","padding":"Unutrašnji razmak","cursor":"Kursor","title_subtitle":"Naslov i podnaslov","title_size":"Veličina naslova","title_color":"Boja naslova","title_alignment":"Poravnanje naslova","title_alignment_helper":"lijevo, centar, desno","title_font_weight":"Debljina fonta naslova","subtitle_size":"Veličina podnaslova","subtitle_color":"Boja podnaslova","subtitle_alignment":"Poravnanje podnaslova","subtitle_font_weight":"Debljina fonta podnaslova","icons":"Ikone","icon_size":"Veličina ikone","icon_opacity":"Prozirnost ikone","icon_margin":"Margina ikone","primary_text_styling":"Primarni tekst (vrijednost)","primary_size":"Veličina primarnog teksta","primary_color_label":"Boja primarnog teksta","primary_opacity":"Prozirnost primarnog teksta","primary_font_weight":"Debljina fonta primarnog teksta","secondary_text_styling":"Sekundarni tekst (drugi red)","secondary_size":"Veličina sekundarnog teksta","secondary_color_label":"Boja sekundarnog teksta","secondary_opacity":"Prozirnost sekundarnog teksta","secondary_font_weight":"Debljina fonta sekundarnog teksta","tertiary_text_styling":"Treći tekst (treći red)","tertiary_size":"Veličina trećeg teksta","tertiary_color_label":"Boja trećeg teksta","tertiary_opacity":"Prozirnost trećeg teksta","tertiary_font_weight":"Debljina fonta trećeg teksta","select_entity":"Odaberite entitet","select_icon":"Odaberite ikonu","action_none":"Nijedna","action_more_info":"Više informacija","action_navigate":"Navigacija","action_url":"URL","action_call_service":"Poziv usluge","theme":"Tema","theme_helper":"Odaberite unaprijed definiranu temu boja","select_theme":"Odaberite temu","consumers_settings":"Postavke potrošača","enable_consumers":"Omogući traku potrošača","consumers_position":"Pozicija","consumers_sort_mode":"Način sortiranja","sort_highest_first":"Najveći prvo","sort_lowest_first":"Najmanji prvo","sort_none":"Bez sortiranja","sort_alpha_asc":"Po abecedi (A–Ž)","sort_alpha_desc":"Po abecedi (Ž–A)","consumers_threshold":"Globalni prag (W)","consumers_threshold_helper":"Potrošači ispod ove vrijednosti se ne prikazuju","add_consumer":"Dodaj potrošača","remove_consumer":"Ukloni potrošača","consumer_entity":"Entitet","consumer_icon":"Ikona","consumer_label":"Oznaka","consumer_threshold":"Individualni prag (W)","consumer_auto_color":"Automatska boja","consumer_auto_color_helper":"Boja prema potrošnji (zelena do ljubičasta)","consumer_item_styling":"Stil potrošača","consumer_primary_entity":"Primarni entitet (vrijednost)","consumer_primary_text":"Primarni tekst (zamjenjuje vrijednost)","consumer_show_primary":"Prikaži primarni red","consumer_secondary_entity":"Sekundarni entitet (oznaka)","consumer_secondary_text":"Sekundarni tekst (zamjenjuje oznaku)","consumer_show_secondary":"Prikaži sekundarni red","consumer_switch_entity":"Prekidač (uključivanje/isključivanje)","consumer_switch_entity_helper":"Opcionalno: prekidač za uključivanje/isključivanje","consumer_tap_actions":"Akcije na dodir","tap_action_target":"Cilj akcije na dodir","double_tap_action_target":"Cilj akcije na dvostruki dodir","hold_action_target":"Cilj akcije pri držanju","action_target_none":"Bez akcije","action_target_entity":"Prebaci entitet","action_target_custom_entity":"Prebaci prilagođeni entitet","action_target_custom_action":"Prilagođena akcija","custom_entity_toggle":"Prilagođeni entitet (prebacivanje)","custom_entity_toggle_helper":"Entitet koji želite prebaciti","show_consumer_total_in_house":"Prikaži ukupnu potrošnju kao sekundarni tekst","show_consumer_total_helper":"Prikazuje zbir svih potrošača ispod potrošnje kuće","show_title":"Prikaži naslov","show_subtitle":"Prikaži podnaslov","show_icon":"Prikaži ikonu","title_line_height":"Visina linije naslova","subtitle_line_height":"Visina linije podnaslova","primary_line_height":"Visina linije primarnog teksta","secondary_line_height":"Visina linije sekundarnog teksta","tertiary_line_height":"Visina linije trećeg teksta","label_line_height":"Visina linije oznake","value_line_height":"Visina linije vrijednosti","item_calc_type":"Tip izračuna","calc_type_entity":"Ručno definisan entitet","calc_type_autarky":"Samostalnost","calc_type_self_consumption":"Samopotrošnja","calc_type_runtime":"Preostalo vrijeme rada","calc_type_chargetime":"Preostalo vrijeme punjenja","header_section":"Zaglavlje","header_visibility":"Vidljivost","header_content":"Sadržaj","header_title_styling":"Stil naslova","header_subtitle_styling":"Stil podnaslova","header_icon_styling":"Stil ikone","infobar_styling":"Stil informacijske trake","card_styling_section":"Stil kartica","theme_editor_cards":"Uređivač tema (kartice)","theme_editor_cards_note":"Mijenja samo boje kartica, ne zaglavlje.","header_background_subsection":"Pozadina zaglavlja","icon_subsection":"Ikona","primary_text_subsection":"Primarni tekst (vrijednost)","secondary_text_subsection":"Sekundarni tekst (drugi red)","tertiary_text_subsection":"Treći tekst (treći red)","action_navigation_path":"Navigacijska putanja","action_url_label":"URL","action_service":"Usluga","layout_order":"Redoslijed rasporeda","layout_order_helper":"Odredite redoslijed elemenata","pv_bar_settings":"Postavke solarne trake","battery_bar_settings":"Postavke trake baterije","enable_pv_bar":"Omogući solarnu traku","enable_battery_bar":"Omogući traku baterije","bar_position":"Pozicija","bar_align":"Poravnanje","align_left":"Lijevo","align_center":"Centar","align_right":"Desno","bar_entities":"Sistemi/Baterije","add_pv_entity":"Dodaj solarni sistem","add_battery_entity":"Dodaj bateriju","remove_entity":"Ukloni","entity_name":"Ime","entity_name_helper":"Ime prikazano na traci","pv_max_5":"Maks. 5 solarnih sistema","battery_max_5":"Maks. 5 baterija","bar_styling":"Stil trake","bar_separator":"Razdjelnik","bar_separator_helper":"Znak između stavki (npr. | ili •)","bar_item_gap":"Razmak između stavki","bar_item_gap_helper":"Udaljenost između stavki","position_above_cards":"Iznad kartica","position_below_cards":"Ispod kartica","position_above_consumers":"Iznad potrošača","position_below_consumers":"Ispod potrošača","position_bottom":"Dno","pv_bar_gap":"Razmak solarne trake","pv_bar_gap_helper":"Udaljenost između solarne trake i drugih elemenata","battery_bar_gap":"Razmak trake baterije","battery_bar_gap_helper":"Udaljenost između trake baterije i drugih elemenata","move_up":"Pomakni gore","move_down":"Pomakni dolje","duplicate":"Dupliciraj","delete":"Izbriši","tap_action":"Akcija na dodir","double_tap":"Dvostruki dodir","hold_action":"Držanje"}`);
const status$d = { "feed_in": "Predaja", "neutral": "Neutralno", "grid_consumption": "Potrošnja mreže", "inactive": "Neaktivno" };
const bs = {
  general: general$d,
  editor: editor$e,
  status: status$d
};
const bs$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: bs,
  editor: editor$e,
  general: general$d,
  status: status$d
}, Symbol.toStringTag, { value: "Module" }));
const general$c = { "missing_entity": "chybí", "inactive": "Neaktivní" };
const editor$d = /* @__PURE__ */ JSON.parse('{"tab_general":"Obecné","tab_elements":"Prvky","tab_cards":"Karty","tab_layout":"Rozložení","tab_language":"Jazyk","tab_header":"Header","tab_theme":"Motiv","tab_infobar":"Informační lišta","tab_pv":"Solární systém","tab_battery":"Baterie","tab_house":"Dům","tab_grid":"Síť","tab_consumers":"Spotřebiče","tab_pv_bar":"Solární lišta","tab_battery_bar":"Lišta baterie","card_header":"Záhlaví karty","title":"Název","title_placeholder":"Solární monitor","title_helper":"Nechte prázdné pro skrytí.","subtitle":"Podtitul","subtitle_placeholder":"Souhrn energie","subtitle_helper":"Nechte prázdné pro skrytí.","title_subtitle_gap":"Rozestup mezi názvem a podtitulem","title_subtitle_gap_helper":"Vzdálenost mezi názvem a podtitulem","header_icon_size":"Velikost ikony v záhlaví","header_icon_size_helper":"Velikost ikony vedle názvu","header_icon_color":"Barva ikony v záhlaví","header_icon_margin":"Okraj ikony v záhlaví","icon":"Ikona","icon_helper":"Zobrazí se pouze, pokud je uveden název. Nechte prázdné pro skrytí.","layout":"Rozvržení","grid_gap":"Mezera v mřížce","grid_gap_placeholder":"6px","grid_gap_helper":"Vzdálenost mezi kartami.","header_margin_bottom":"Vzdálenost mezi záhlavím a kartami/informační lištou","header_margin_bottom_helper":"Vzdálenost mezi názvem/podtitulem a informační lištou/kartami","infobar_gap":"Mezera mezi informační lištou a kartami","infobar_gap_helper":"Vzdálenost mezi informační lištou a čtyřmi kartami","language":"Jazyk","language_helper":"Vyberte jazyk rozhraní","central_entities":"Centrální entity","central_entities_helper":"Definujte hlavní entity používané pro výpočty","entity_pv_production":"Entita solární výroby","entity_pv_production_helper":"Entita pro výkon solárního systému (používá se pro výpočty)","entity_battery_soc":"Úroveň nabití baterie (SoC)","entity_battery_soc_helper":"Entita pro úroveň nabití baterie v % (pro výpočty)","entity_battery_charge":"Entita nabíjení baterie","entity_battery_charge_helper":"Entita pro výkon nabíjení (pro výpočty)","entity_battery_discharge":"Entita vybíjení baterie","entity_battery_discharge_helper":"Entita pro výkon vybíjení (pro výpočty)","entity_house_consumption":"Spotřeba domu","entity_house_consumption_helper":"Entita pro spotřebu domácnosti (pro výpočet soběstačnosti, volitelné)","entity_grid_power":"Síťový výkon","entity_grid_power_helper":"Entita pro import/export do sítě (pro výpočty)","central_config":"Centrální konfigurace","central_config_helper":"Tyto hodnoty platí pro všechny karty","pv_max_power_label":"Maximální solární výkon (W)","pv_max_power_helper":"Maximální solární výkon pro animace","battery_capacity_label":"Kapacita baterie (Wh)","battery_capacity_label_helper":"Kapacita baterie (např. 10000 pro 10 kWh)","grid_threshold_label":"Práh sítě (W)","grid_threshold_helper":"Pod touto hodnotou se zobrazí „Neutrální“","card_visibility":"Viditelnost karet","cards_order":"Pořadí karet","cards_order_helper":"Změňte pořadí a viditelnost čtyř karet","card_house":"Dům","card_grid":"Síť","show_pv_card":"Zobrazit kartu solárního systému","show_battery_card":"Zobrazit kartu baterie","show_house_card":"Zobrazit kartu domu","show_grid_card":"Zobrazit kartu sítě","infobar_settings":"Nastavení informační lišty","enable_infobar":"Povolit informační lištu","infobar_position":"Pozice informační lišty","position_top":"Nahoře (nad kartami)","calculation_mode":"Režim výpočtu pro položku 1","calculation_mode_helper":"Vyberte: Soběstačnost nebo Vlastní spotřebu","mode_autarky":"Soběstačnost","mode_self_consumption":"Vlastní spotřeba","calculate_battery_times":"Vypočítat časy baterie","calculate_battery_times_helper":"Automatický výpočet pro položky 2 (zbývající čas provozu) a 3 (zbývající čas nabíjení)","item":"Položka","entity":"Entita","icon_label":"Ikona","label":"Popisek","unit":"Jednotka","default_autarky":"Soběstačnost","default_runtime":"Zbývající doba provozu","default_chargetime":"Zbývající doba nabíjení","pv_system":"Solární systém","pv_entity":"Solární entita","pv_entity_helper":"Entita pro solární výkon","enable_animation":"Povolit animaci","animation_style":"Styl animace","animation_style_helper":"Vyberte styl animace","animation_rotating_dots":"Otáčející se body","animation_particle_field":"Pole částic","animation_electric_arc":"Elektrické oblouky","icon_rotation":"Rotace ikony","icon_rotation_helper":"Ikona se otáčí podle výkonu","max_power":"Maximální výkon (W)","max_power_helper":"Maximální solární výkon pro animace a rotaci","battery":"Baterie","battery_entity":"Entita baterie","battery_entity_helper":"Entita pro úroveň nabití baterie (%)","charge_entity":"Entita nabíjení","charge_entity_helper":"Entita pro nabíjecí výkon","discharge_entity":"Entita vybíjení","discharge_entity_helper":"Entita pro vybíjecí výkon","battery_capacity":"Kapacita baterie (Wh)","battery_capacity_helper":"Kapacita pro animace (např. 10000 pro 10 kWh)","calculate_runtime":"Vypočítat časy nabíjení/vybíjení","calculate_runtime_helper":"Automatický výpočet pro položky 2 a 3 informační lišty","icon_auto_helper":"Nechte prázdné pro automatickou ikonu","house_consumption":"Spotřeba domu","house_entity":"Entita domu","house_entity_helper":"Entita pro spotřebu domu","grid":"Síť","grid_entity":"Síťová entita","grid_entity_helper":"Entita pro import/export do sítě","threshold":"Práh (W)","threshold_helper":"Pod touto hodnotou se zobrazí „Neutrální“","status_texts":"Texty stavů","text_feed_in":"Text pro dodávku","text_feed_in_placeholder":"Dodávka","text_neutral":"Text pro neutrální","text_neutral_placeholder":"Neutrální","text_consumption":"Text pro spotřebu","text_consumption_placeholder":"Spotřeba ze sítě","additional_texts":"Další texty","secondary_entity":"Sekundární entita","secondary_entity_helper":"Volitelné: entita pro druhý řádek","secondary_text":"Sekundární text","secondary_text_helper":"Volitelné: statický text pro druhý řádek","tertiary_entity":"Třetí entita","tertiary_text":"Třetí text","styling":"Styl","background_color":"Barva pozadí","border_color":"Barva ohraničení","primary_color":"Primární barva","secondary_color":"Sekundární barva","icon_color":"Barva ikony","card_styling":"Styl karty","header_background":"Pozadí záhlaví","enable_header_background":"Povolit pozadí záhlaví","enable_header_background_helper":"Aktivuje pozadí pro oblast názvu/podtitulu","header_background_color":"Barva pozadí záhlaví","header_border_color":"Barva ohraničení záhlaví","header_border_radius":"Zaoblení záhlaví","header_padding":"Vnitřní okraj záhlaví","header_width":"Šířka záhlaví","header_width_helper":"Auto = podle obsahu, Full = plná šířka","header_width_auto":"Automaticky (velikost obsahu)","header_width_full":"Plná (100 % šířka)","header_box_shadow":"Stín záhlaví","border_radius":"Zaoblení rohů","text_color":"Barva textu","padding":"Vnitřní okraj","cursor":"Kurzor","title_subtitle":"Název a podtitul","title_size":"Velikost názvu","title_color":"Barva názvu","title_alignment":"Zarovnání názvu","title_alignment_helper":"vlevo, střed, vpravo","title_font_weight":"Tloušťka písma názvu","subtitle_size":"Velikost podtitulu","subtitle_color":"Barva podtitulu","subtitle_alignment":"Zarovnání podtitulu","subtitle_font_weight":"Tloušťka písma podtitulu","icons":"Ikony","icon_size":"Velikost ikony","icon_opacity":"Průhlednost ikony","icon_margin":"Okraj ikony","primary_text_styling":"Primární text (hodnota)","primary_size":"Velikost primárního textu","primary_color_label":"Barva primárního textu","primary_opacity":"Průhlednost primárního textu","primary_font_weight":"Tloušťka písma primárního textu","secondary_text_styling":"Sekundární text (druhý řádek)","secondary_size":"Velikost sekundárního textu","secondary_color_label":"Barva sekundárního textu","secondary_opacity":"Průhlednost sekundárního textu","secondary_font_weight":"Tloušťka písma sekundárního textu","tertiary_text_styling":"Třetí text (třetí řádek)","tertiary_size":"Velikost třetího textu","tertiary_color_label":"Barva třetího textu","tertiary_opacity":"Průhlednost třetího textu","tertiary_font_weight":"Tloušťka písma třetího textu","select_entity":"Vybrat entitu","select_icon":"Vybrat ikonu","action_none":"Žádná","action_more_info":"Více informací","action_navigate":"Navigovat","action_url":"URL","action_call_service":"Zavolat službu","theme":"Téma","theme_helper":"Vyberte přednastavené barevné téma","select_theme":"Vybrat téma","consumers_settings":"Nastavení spotřebičů","enable_consumers":"Povolit lištu spotřebičů","consumers_position":"Pozice","consumers_sort_mode":"Řazení","sort_highest_first":"Nejvyšší první","sort_lowest_first":"Nejnižší první","sort_none":"Bez řazení","sort_alpha_asc":"Abecedně (A–Z)","sort_alpha_desc":"Abecedně (Z–A)","consumers_threshold":"Globální práh (W)","consumers_threshold_helper":"Spotřebiče pod touto hodnotou se nezobrazí","add_consumer":"Přidat spotřebič","remove_consumer":"Odebrat spotřebič","consumer_entity":"Číslo","consumer_icon":"Ikona","consumer_label":"Popisek","consumer_threshold":"Individuální práh (W)","consumer_auto_color":"Automatická barva","consumer_auto_color_helper":"Barva podle spotřeby (zelená až fialová)","consumer_item_styling":"Styl spotřebiče","consumer_primary_entity":"Primární entita (hodnota)","consumer_primary_text":"Primární text (nahrazuje hodnotu)","consumer_show_primary":"Zobrazit primární řádek","consumer_secondary_entity":"Sekundární entita (popisek)","consumer_secondary_text":"Sekundární text (nahrazuje popisek)","consumer_show_secondary":"Zobrazit sekundární řádek","consumer_switch_entity":"Přepínač (pro zapnutí/vypnutí)","consumer_switch_entity_helper":"Volitelné: přepínač pro zapnutí/vypnutí","consumer_tap_actions":"Akce klepnutí","tap_action_target":"Cíl akce při klepnutí","double_tap_action_target":"Cíl akce při dvojitém klepnutí","hold_action_target":"Cíl akce při podržení","action_target_none":"Žádná akce","action_target_entity":"Přepnout entitu","action_target_custom_entity":"Přepnout vlastní entitu","action_target_custom_action":"Vlastní akce","custom_entity_toggle":"Vlastní entita (přepnutí)","custom_entity_toggle_helper":"Entita, která se má přepnout","show_consumer_total_in_house":"Zobrazit celkovou spotřebu jako sekundární text","show_consumer_total_helper":"Zobrazí součet všech spotřebičů pod spotřebou domu","show_title":"Zobrazit název","show_subtitle":"Zobrazit podtitul","show_icon":"Zobrazit ikonu","title_line_height":"Výška řádku názvu","subtitle_line_height":"Výška řádku podtitulu","primary_line_height":"Výška řádku primárního textu","secondary_line_height":"Výška řádku sekundárního textu","tertiary_line_height":"Výška řádku třetího textu","label_line_height":"Výška řádku popisku","value_line_height":"Výška řádku hodnoty","item_calc_type":"Typ výpočtu","calc_type_entity":"Manuální entita","calc_type_autarky":"Soběstačnost","calc_type_self_consumption":"Vlastní spotřeba","calc_type_runtime":"Zbývající doba provozu","calc_type_chargetime":"Zbývající doba nabíjení","header_section":"Záhlaví","header_visibility":"Viditelnost","header_content":"Obsah","header_title_styling":"Styl nadpisu","header_subtitle_styling":"Styl podnadpisu","header_icon_styling":"Styl ikony","infobar_styling":"Styl informační lišty","card_styling_section":"Styl karet","theme_editor_cards":"Editor tématu (karty)","theme_editor_cards_note":"Mění pouze barvy karet, ne záhlaví.","header_background_subsection":"Pozadí záhlaví","icon_subsection":"Ikona","primary_text_subsection":"Primární text (hodnota)","secondary_text_subsection":"Sekundární text (druhý řádek)","tertiary_text_subsection":"Třetí text (třetí řádek)","action_navigation_path":"Navigační cesta","action_url_label":"URL","action_service":"Služba","layout_order":"Pořadí rozvržení","layout_order_helper":"Určete pořadí prvků","pv_bar_settings":"Nastavení solární lišty","battery_bar_settings":"Nastavení lišty baterie","enable_pv_bar":"Povolit solární lištu","enable_battery_bar":"Povolit lištu baterie","bar_position":"Pozice","bar_align":"Zarovnání","align_left":"Vlevo","align_center":"Na střed","align_right":"Vpravo","bar_entities":"Systémy/Baterie","add_pv_entity":"Přidat solární systém","add_battery_entity":"Přidat baterii","remove_entity":"Odebrat","entity_name":"Název","entity_name_helper":"Název zobrazený v liště","pv_max_5":"Max. 5 solárních systémů","battery_max_5":"Max. 5 baterií","bar_styling":"Styl lišty","bar_separator":"Oddělovač","bar_separator_helper":"Znak mezi položkami (např. | nebo •)","bar_item_gap":"Mezera mezi položkami","bar_item_gap_helper":"Vzdálenost mezi položkami","position_above_cards":"Nad kartami","position_below_cards":"Pod kartami","position_above_consumers":"Nad spotřebiči","position_below_consumers":"Pod spotřebiči","position_bottom":"Dole","pv_bar_gap":"Mezera solární lišty","pv_bar_gap_helper":"Vzdálenost mezi solární lištou a ostatními prvky","battery_bar_gap":"Mezera lišty baterie","battery_bar_gap_helper":"Vzdálenost mezi lištou baterie a ostatními prvky","move_up":"Posunout nahoru","move_down":"Posunout dolů","duplicate":"Duplikovat","delete":"Smazat","tap_action":"Akce při klepnutí","double_tap":"Dvojité klepnutí","hold_action":"Podržení"}');
const status$c = { "feed_in": "Dodávka", "neutral": "Neutrální", "grid_consumption": "Spotřeba sítě", "inactive": "Neaktivní" };
const cs = {
  general: general$c,
  editor: editor$d,
  status: status$c
};
const cs$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: cs,
  editor: editor$d,
  general: general$c,
  status: status$c
}, Symbol.toStringTag, { value: "Module" }));
const general$b = { "missing_entity": "fehlt", "inactive": "Inaktiv" };
const editor$c = /* @__PURE__ */ JSON.parse('{"tab_general":"Allgemein","tab_elements":"Elemente","tab_cards":"Karten","tab_layout":"Layout","tab_language":"Sprache","tab_header":"Header","tab_theme":"Theme","tab_infobar":"Info Bar","tab_pv":"PV-Anlage","tab_battery":"Batterie","tab_house":"Haus","tab_grid":"Netz","tab_consumers":"Verbraucher","tab_pv_bar":"PV-Bar","tab_battery_bar":"Batterie-Bar","card_header":"Karten Header","title":"Titel","title_placeholder":"PV Monitor","title_helper":"Leer lassen um auszublenden.","subtitle":"Untertitel","subtitle_placeholder":"Energieübersicht","subtitle_helper":"Leer lassen um auszublenden.","title_subtitle_gap":"Abstand Titel-Untertitel","title_subtitle_gap_helper":"Abstand zwischen Titel und Untertitel","header_icon_size":"Header Icon Größe","header_icon_size_helper":"Größe des Icons neben dem Titel","header_icon_color":"Header Icon Farbe","header_icon_margin":"Header Icon Abstand","icon":"Icon","icon_helper":"Wird nur angezeigt, wenn auch ein Titel vorhanden ist, leer lassen um auszublenden.","layout":"Layout","grid_gap":"Grid Abstand","grid_gap_placeholder":"6px","grid_gap_helper":"Abstand zwischen den Karten.","header_margin_bottom":"Abstand Header zu Karten/Info Bar","header_margin_bottom_helper":"Abstand zwischen Titel/Untertitel und Info Bar/Karten","infobar_gap":"Abstand Info Bar zu Karten","infobar_gap_helper":"Abstand zwischen Info Bar und den 4 Karten","language":"Sprache","language_helper":"Wählen Sie die Anzeigesprache","central_entities":"Zentrale Entities","central_entities_helper":"Definieren Sie hier die Haupt-Entities für Berechnungen","entity_pv_production":"PV-Produktion Entity","entity_pv_production_helper":"Entity für PV-Leistung (wird für Berechnungen verwendet)","entity_battery_soc":"Batterie SOC Entity","entity_battery_soc_helper":"Entity für Batterieladezustand in % (für Berechnungen)","entity_battery_charge":"Batterie Laden Entity","entity_battery_charge_helper":"Entity für Batterie-Ladeleistung (für Berechnungen)","entity_battery_discharge":"Batterie Entladen Entity","entity_battery_discharge_helper":"Entity für Batterie-Entladeleistung (für Berechnungen)","entity_house_consumption":"Hausverbrauch Entity","entity_house_consumption_helper":"Entity für Hausverbrauch (für Autarkie-Berechnung, optional)","entity_grid_power":"Netz Entity","entity_grid_power_helper":"Entity für Netzbezug/Einspeisung (für Berechnungen)","central_config":"Zentrale Konfiguration","central_config_helper":"Diese Werte gelten für alle Karten","pv_max_power_label":"PV Max. Leistung (W)","pv_max_power_helper":"Maximale PV-Leistung für Animationen","battery_capacity_label":"Batteriekapazität (Wh)","battery_capacity_label_helper":"Kapazität der Batterie (z.B. 10000 für 10 kWh)","grid_threshold_label":"Netz-Schwellwert (W)","grid_threshold_helper":"Unterhalb dieses Werts wird \\"Neutral\\" angezeigt","card_visibility":"Karten-Sichtbarkeit","cards_order":"Karten-Reihenfolge","cards_order_helper":"Ordnung und Sichtbarkeit der 4 Karten ändern","card_house":"Haus","card_grid":"Netz","show_pv_card":"PV-Karte anzeigen","show_battery_card":"Batterie-Karte anzeigen","show_house_card":"Haus-Karte anzeigen","show_grid_card":"Netz-Karte anzeigen","infobar_settings":"Info Bar Einstellungen","enable_infobar":"Info Bar aktivieren","infobar_position":"Info Bar Position","position_top":"Oben (über den Karten)","calculation_mode":"Berechnung für Item 1","calculation_mode_helper":"Wählen Sie: Autarkie oder Eigenverbrauch","mode_autarky":"Autarkie (Selbstversorgungsgrad)","mode_self_consumption":"Eigenverbrauch (Selbstnutzungsgrad)","calculate_battery_times":"Batteriezeiten berechnen","calculate_battery_times_helper":"Automatische Berechnung für Item 2 (Restlaufzeit) und Item 3 (Restladezeit)","item":"Item","entity":"Entity","icon_label":"Icon","label":"Label","unit":"Einheit","default_autarky":"Autarkie","default_runtime":"Restlaufzeit","default_chargetime":"Restladezeit","pv_system":"PV-Anlage","pv_entity":"PV Entity","pv_entity_helper":"Entity für PV-Leistung","enable_animation":"Animation aktivieren","animation_style":"Animationsstil","animation_style_helper":"Wählen Sie den Animationseffekt","animation_rotating_dots":"Rotierende Punkte","animation_particle_field":"Partikelfeld","animation_electric_arc":"Elektrische Bögen","icon_rotation":"Icon Rotation","icon_rotation_helper":"Icon dreht sich je nach Leistung","max_power":"Max. Leistung (W)","max_power_helper":"Maximale PV-Leistung für Animation & Rotation","battery":"Batterie","battery_entity":"Batterie Entity","battery_entity_helper":"Entity für Batteriestand (%)","charge_entity":"Ladung Entity","charge_entity_helper":"Entity für Ladeleistung","discharge_entity":"Entladung Entity","discharge_entity_helper":"Entity für Entladeleistung","battery_capacity":"Batteriekapazität (Wh)","battery_capacity_helper":"Kapazität der Batterie für Animation (z.B. 10000 für 10 kWh)","calculate_runtime":"Rest-/Ladezeit berechnen","calculate_runtime_helper":"Automatische Berechnung für Info Bar Item 2 & 3","icon_auto_helper":"Leer lassen für automatisches Icon","house_consumption":"Hausverbrauch","house_entity":"Haus Entity","house_entity_helper":"Entity für Hausverbrauch","grid":"Netz","grid_entity":"Netz Entity","grid_entity_helper":"Entity für Netzbezug/Einspeisung","threshold":"Schwellwert (W)","threshold_helper":"Unterhalb dieses Werts wird \\"Neutral\\" angezeigt","status_texts":"Status-Texte","text_feed_in":"Text bei Einspeisung","text_feed_in_placeholder":"Einspeisung","text_neutral":"Text bei Neutral","text_neutral_placeholder":"Neutral","text_consumption":"Text bei Bezug","text_consumption_placeholder":"Netzbezug","additional_texts":"Zusätzliche Texte","secondary_entity":"Sekundär Entity","secondary_entity_helper":"Optional: Entity für 2. Zeile","secondary_text":"Sekundär Text","secondary_text_helper":"Optional: Statischer Text für 2. Zeile","tertiary_entity":"Tertiär Entity","tertiary_text":"Tertiär Text","styling":"Styling","background_color":"Hintergrundfarbe","border_color":"Rahmenfarbe","primary_color":"Primärfarbe","secondary_color":"Sekundärfarbe","icon_color":"Icon Farbe","card_styling":"Karten-Styling","header_background":"Header-Hintergrund","enable_header_background":"Header-Hintergrund aktivieren","enable_header_background_helper":"Hintergrund für Titel/Untertitel-Bereich aktivieren","header_background_color":"Header Hintergrundfarbe","header_border_color":"Header Rahmenfarbe","header_border_radius":"Header Border Radius","header_padding":"Header Padding","header_width":"Header Breite","header_width_helper":"Auto = zentriert mit Inhaltsgröße, Full = volle Breite","header_width_auto":"Auto (Inhaltsgröße)","header_width_full":"Full (100% Breite)","header_box_shadow":"Header Box Shadow","border_radius":"Border Radius","text_color":"Textfarbe","padding":"Padding","cursor":"Cursor","title_subtitle":"Titel & Untertitel","title_size":"Titel Größe","title_color":"Titel Farbe","title_alignment":"Titel Ausrichtung","title_alignment_helper":"left, center, right","title_font_weight":"Titel Font-Weight","subtitle_size":"Untertitel Größe","subtitle_color":"Untertitel Farbe","subtitle_alignment":"Untertitel Ausrichtung","subtitle_font_weight":"Untertitel Font-Weight","icons":"Icons","icon_size":"Icon Größe","icon_opacity":"Icon Opacity","icon_margin":"Icon Margin","primary_text_styling":"Primär-Text (Hauptwert)","primary_size":"Primär Größe","primary_color_label":"Primär Farbe","primary_opacity":"Primär Opacity","primary_font_weight":"Primär Font-Weight","secondary_text_styling":"Sekundär-Text (2. Zeile)","secondary_size":"Sekundär Größe","secondary_color_label":"Sekundär Farbe","secondary_opacity":"Sekundär Opacity","secondary_font_weight":"Sekundär Font-Weight","tertiary_text_styling":"Tertiär-Text (3. Zeile)","tertiary_size":"Tertiär Größe","tertiary_color_label":"Tertiär Farbe","tertiary_opacity":"Tertiär Opacity","tertiary_font_weight":"Tertiär Font-Weight","select_entity":"Entity auswählen","select_icon":"Icon auswählen","action_none":"Keine","action_more_info":"Mehr Info","action_navigate":"Navigieren","action_url":"URL","action_call_service":"Service aufrufen","theme":"Theme","theme_helper":"Wählen Sie ein vordefiniertes Farbthema","select_theme":"Theme auswählen","consumers_settings":"Verbraucher-Einstellungen","enable_consumers":"Verbraucher-Leiste aktivieren","consumers_position":"Position","consumers_sort_mode":"Sortierung","sort_highest_first":"Höchster zuerst","sort_lowest_first":"Niedrigster zuerst","sort_none":"Keine Sortierung (Eingabe-Reihenfolge)","sort_alpha_asc":"Alphabetisch aufsteigend","sort_alpha_desc":"Alphabetisch absteigend","consumers_threshold":"Globaler Schwellwert (W)","consumers_threshold_helper":"Verbraucher unter diesem Wert werden nicht angezeigt","add_consumer":"Verbraucher hinzufügen","remove_consumer":"Verbraucher entfernen","consumer_entity":"Nr:","consumer_icon":"Icon","consumer_label":"Bezeichnung","consumer_threshold":"Individueller Schwellwert (W)","consumer_auto_color":"Automatische Farbanpassung","consumer_auto_color_helper":"Farbe basierend auf Verbrauch (grün bis purple)","consumer_item_styling":"Verbraucher Styling","consumer_primary_entity":"Primär Entity (für Wert)","consumer_primary_text":"Primär Text (überschreibt Wert)","consumer_show_primary":"Primär-Zeile anzeigen","consumer_secondary_entity":"Sekundär Entity (für Label)","consumer_secondary_text":"Sekundär Text (überschreibt Label)","consumer_show_secondary":"Sekundär-Zeile anzeigen","consumer_switch_entity":"Switch Entity (für Toggle)","consumer_switch_entity_helper":"Optional: Switch zum Ein-/Ausschalten","consumer_tap_actions":"Tap Actions","tap_action_target":"Tap Action Target","double_tap_action_target":"Double Tap Action Target","hold_action_target":"Hold Action Target","action_target_none":"Keine Aktion","action_target_entity":"Entity Toggle","action_target_custom_entity":"Custom Entity Toggle","action_target_custom_action":"Custom Action","custom_entity_toggle":"Custom Entity (Toggle)","custom_entity_toggle_helper":"Entity die getoggled werden soll","show_consumer_total_in_house":"Gesamtverbrauch als Sekundär-Text","show_consumer_total_helper":"Zeigt Summe aller Consumer unter Hausverbrauch","show_title":"Titel anzeigen","show_subtitle":"Untertitel anzeigen","show_icon":"Icon anzeigen","title_line_height":"Titel Line-Height","subtitle_line_height":"Untertitel Line-Height","primary_line_height":"Primär Line-Height","secondary_line_height":"Sekundär Line-Height","tertiary_line_height":"Tertiär Line-Height","label_line_height":"Label Line-Height","value_line_height":"Value Line-Height","item_calc_type":"Berechnung wählen","calc_type_entity":"Manuelle Entity","calc_type_autarky":"Autarkie","calc_type_self_consumption":"Eigenverbrauch","calc_type_runtime":"Restlaufzeit","calc_type_chargetime":"Restladezeit","header_section":"Titelbereich","header_visibility":"Sichtbarkeit","header_content":"Inhalt","header_title_styling":"Titel Styling","header_subtitle_styling":"Untertitel Styling","header_icon_styling":"Icon Styling","infobar_styling":"Info Bar Styling","card_styling_section":"Karten Styling","theme_editor_cards":"Theme Editor (Karten)","theme_editor_cards_note":"Ändert nur die Karten-Farben, nicht den Titelbereich.","header_background_subsection":"Header-Hintergrund","icon_subsection":"Icon","primary_text_subsection":"Primär-Text (Hauptwert)","secondary_text_subsection":"Sekundär-Text (2. Zeile)","tertiary_text_subsection":"Tertiär-Text (3. Zeile)","action_navigation_path":"Navigationspfad","action_url_label":"URL","action_service":"Service","layout_order":"Layout-Reihenfolge","layout_order_helper":"Bestimmen Sie die Reihenfolge der Elemente","pv_bar_settings":"PV-Bar Einstellungen","battery_bar_settings":"Batterie-Bar Einstellungen","enable_pv_bar":"PV-Bar aktivieren","enable_battery_bar":"Batterie-Bar aktivieren","bar_position":"Position","bar_align":"Ausrichtung","align_left":"Links","align_center":"Zentriert","align_right":"Rechts","bar_entities":"Anlagen/Batterien","add_pv_entity":"PV-Anlage hinzufügen","add_battery_entity":"Batterie hinzufügen","remove_entity":"Entfernen","entity_name":"Name","entity_name_helper":"Anzeigename in der Bar","pv_max_5":"Max. 5 PV-Anlagen","battery_max_5":"Max. 5 Batterien","bar_styling":"Bar Styling","bar_separator":"Trennzeichen","bar_separator_helper":"Zeichen zwischen Items (z.B. | oder •)","bar_item_gap":"Item-Abstand","bar_item_gap_helper":"Abstand zwischen Items","position_above_cards":"Über den Karten","position_below_cards":"Unter den Karten","position_above_consumers":"Über den Verbrauchern","position_below_consumers":"Unter den Verbrauchern","position_bottom":"Ganz unten","pv_bar_gap":"Abstand PV-Bar","pv_bar_gap_helper":"Abstand zwischen PV-Bar und anderen Elementen","battery_bar_gap":"Abstand Battery-Bar","battery_bar_gap_helper":"Abstand zwischen Battery-Bar und anderen Elementen","move_up":"Nach oben","move_down":"Nach unten","duplicate":"Duplizieren","delete":"Löschen","tap_action":"Tap Action","double_tap":"Double Tap","hold_action":"Hold Action"}');
const status$b = { "feed_in": "Einspeisung", "neutral": "Neutral", "grid_consumption": "Netzbezug", "inactive": "Inaktiv" };
const de = {
  general: general$b,
  editor: editor$c,
  status: status$b
};
const de$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: de,
  editor: editor$c,
  general: general$b,
  status: status$b
}, Symbol.toStringTag, { value: "Module" }));
const general$a = { "missing_entity": "missing", "inactive": "Inactive" };
const editor$b = /* @__PURE__ */ JSON.parse('{"tab_general":"General","tab_elements":"Elements","tab_cards":"Cards","tab_layout":"Layout","tab_language":"Language","tab_header":"Header","tab_theme":"Theme","tab_infobar":"Info bar","tab_pv":"PV system","tab_battery":"Battery","tab_house":"Home","tab_grid":"Grid","tab_consumers":"Consumers","tab_pv_bar":"PV bar","tab_battery_bar":"Battery bar","card_header":"Card header","title":"Title","title_placeholder":"PV Monitor","title_helper":"Leave empty to hide.","subtitle":"Subtitle","subtitle_placeholder":"Energy overview","subtitle_helper":"Leave empty to hide.","title_subtitle_gap":"Title–subtitle gap","title_subtitle_gap_helper":"Spacing between title and subtitle","header_icon_size":"Header icon size","header_icon_size_helper":"Size of the icon next to the title","header_icon_color":"Header icon color","header_icon_margin":"Header icon margin","icon":"Icon","icon_helper":"Shown only if a title is set. Leave empty to hide.","layout":"Layout","grid_gap":"Grid gap","grid_gap_placeholder":"6px","grid_gap_helper":"Spacing between cards.","header_margin_bottom":"Header to cards/info bar gap","header_margin_bottom_helper":"Spacing between title/subtitle and info bar/cards","infobar_gap":"Info bar to cards gap","infobar_gap_helper":"Spacing between the info bar and the four cards","language":"Language","language_helper":"Choose the display language","central_entities":"Central entities","central_entities_helper":"Define the main entities used for calculations","entity_pv_production":"PV production entity","entity_pv_production_helper":"Entity for PV power (used in calculations)","entity_battery_soc":"Battery SoC entity","entity_battery_soc_helper":"Entity for battery state of charge in % (for calculations)","entity_battery_charge":"Battery charging entity","entity_battery_charge_helper":"Entity for battery charge power (for calculations)","entity_battery_discharge":"Battery discharging entity","entity_battery_discharge_helper":"Entity for battery discharge power (for calculations)","entity_house_consumption":"Home consumption entity","entity_house_consumption_helper":"Entity for home consumption (for self-sufficiency calculation, optional)","entity_grid_power":"Grid entity","entity_grid_power_helper":"Entity for grid import/export (for calculations)","central_config":"Global settings","central_config_helper":"These values apply to all cards","pv_max_power_label":"PV max. power (W)","pv_max_power_helper":"Maximum PV power for animations","battery_capacity_label":"Battery capacity (Wh)","battery_capacity_label_helper":"Battery capacity (e.g. 10000 for 10 kWh)","grid_threshold_label":"Grid threshold (W)","grid_threshold_helper":"Below this value, \\"Neutral\\" is shown","card_visibility":"Card visibility","cards_order":"Card order","cards_order_helper":"Change the order and visibility of the four cards","card_house":"Home","card_grid":"Grid","show_pv_card":"Show PV card","show_battery_card":"Show battery card","show_house_card":"Show home card","show_grid_card":"Show grid card","infobar_settings":"Info bar settings","enable_infobar":"Enable info bar","infobar_position":"Info bar position","position_top":"Top (above the cards)","calculation_mode":"Calculation for item 1","calculation_mode_helper":"Choose: Self-sufficiency or Self-consumption","mode_autarky":"Self-sufficiency","mode_self_consumption":"Self-consumption","calculate_battery_times":"Calculate battery times","calculate_battery_times_helper":"Auto calculation for item 2 (remaining runtime) and item 3 (remaining charge time)","item":"Item","entity":"Entity","icon_label":"Icon","label":"Label","unit":"Unit","default_autarky":"Self-sufficiency","default_runtime":"Remaining runtime","default_chargetime":"Remaining charge time","pv_system":"PV system","pv_entity":"PV entity","pv_entity_helper":"Entity for PV power","enable_animation":"Enable animation","animation_style":"Animation style","animation_style_helper":"Select the animation effect","animation_rotating_dots":"Rotating dots","animation_particle_field":"Particle field","animation_electric_arc":"Electric arcs","icon_rotation":"Icon rotation","icon_rotation_helper":"Icon rotates based on power","max_power":"Max. power (W)","max_power_helper":"Maximum PV power for animation & rotation","battery":"Battery","battery_entity":"Battery entity","battery_entity_helper":"Entity for battery level (%)","charge_entity":"Charge entity","charge_entity_helper":"Entity for charge power","discharge_entity":"Discharge entity","discharge_entity_helper":"Entity for discharge power","battery_capacity":"Battery capacity (Wh)","battery_capacity_helper":"Battery capacity for animation (e.g. 10000 for 10 kWh)","calculate_runtime":"Calculate run/charge time","calculate_runtime_helper":"Auto calculation for info bar item 2 & 3","icon_auto_helper":"Leave empty for automatic icon","house_consumption":"Home consumption","house_entity":"Home entity","house_entity_helper":"Entity for home consumption","grid":"Grid","grid_entity":"Grid entity","grid_entity_helper":"Entity for grid import/export","threshold":"Threshold (W)","threshold_helper":"Below this value, \\"Neutral\\" is shown","status_texts":"Status texts","text_feed_in":"Text for feed-in","text_feed_in_placeholder":"Feed-in","text_neutral":"Text for neutral","text_neutral_placeholder":"Neutral","text_consumption":"Text for consumption","text_consumption_placeholder":"Grid import","additional_texts":"Additional texts","secondary_entity":"Secondary entity","secondary_entity_helper":"Optional: entity for line 2","secondary_text":"Secondary text","secondary_text_helper":"Optional: static text for line 2","tertiary_entity":"Tertiary entity","tertiary_text":"Tertiary text","styling":"Styling","background_color":"Background color","border_color":"Border color","primary_color":"Primary color","secondary_color":"Secondary color","icon_color":"Icon color","card_styling":"Card styling","header_background":"Header background","enable_header_background":"Enable header background","enable_header_background_helper":"Enable background for the title/subtitle area","header_background_color":"Header background color","header_border_color":"Header border color","header_border_radius":"Header border radius","header_padding":"Header padding","header_width":"Header width","header_width_helper":"Auto = centered to content size, Full = full width","header_width_auto":"Auto (content size)","header_width_full":"Full (100% width)","header_box_shadow":"Header box shadow","border_radius":"Border radius","text_color":"Text color","padding":"Padding","cursor":"Cursor","title_subtitle":"Title & subtitle","title_size":"Title size","title_color":"Title color","title_alignment":"Title alignment","title_alignment_helper":"left, center, right","title_font_weight":"Title font weight","subtitle_size":"Subtitle size","subtitle_color":"Subtitle color","subtitle_alignment":"Subtitle alignment","subtitle_font_weight":"Subtitle font weight","icons":"Icons","icon_size":"Icon size","icon_opacity":"Icon opacity","icon_margin":"Icon margin","primary_text_styling":"Primary text (main value)","primary_size":"Primary size","primary_color_label":"Primary color","primary_opacity":"Primary opacity","primary_font_weight":"Primary font weight","secondary_text_styling":"Secondary text (line 2)","secondary_size":"Secondary size","secondary_color_label":"Secondary color","secondary_opacity":"Secondary opacity","secondary_font_weight":"Secondary font weight","tertiary_text_styling":"Tertiary text (line 3)","tertiary_size":"Tertiary size","tertiary_color_label":"Tertiary color","tertiary_opacity":"Tertiary opacity","tertiary_font_weight":"Tertiary font weight","select_entity":"Select entity","select_icon":"Select icon","action_none":"None","action_more_info":"More info","action_navigate":"Navigate","action_url":"URL","action_call_service":"Call service","theme":"Theme","theme_helper":"Choose a predefined color theme","select_theme":"Select theme","consumers_settings":"Consumer settings","enable_consumers":"Enable consumer bar","consumers_position":"Position","consumers_sort_mode":"Sorting","sort_highest_first":"Highest first","sort_lowest_first":"Lowest first","sort_none":"No sorting (input order)","sort_alpha_asc":"Alphabetical (A–Z)","sort_alpha_desc":"Alphabetical (Z–A)","consumers_threshold":"Global threshold (W)","consumers_threshold_helper":"Consumers below this value are hidden","add_consumer":"Add consumer","remove_consumer":"Remove consumer","consumer_entity":"No.","consumer_icon":"Icon","consumer_label":"Label","consumer_threshold":"Individual threshold (W)","consumer_auto_color":"Automatic color","consumer_auto_color_helper":"Color based on usage (green to purple)","consumer_item_styling":"Consumer styling","consumer_primary_entity":"Primary entity (for value)","consumer_primary_text":"Primary text (overrides value)","consumer_show_primary":"Show primary line","consumer_secondary_entity":"Secondary entity (for label)","consumer_secondary_text":"Secondary text (overrides label)","consumer_show_secondary":"Show secondary line","consumer_switch_entity":"Switch entity (for toggle)","consumer_switch_entity_helper":"Optional: switch to turn on/off","consumer_tap_actions":"Tap actions","tap_action_target":"Tap action target","double_tap_action_target":"Double tap action target","hold_action_target":"Hold action target","action_target_none":"No action","action_target_entity":"Entity toggle","action_target_custom_entity":"Custom entity toggle","action_target_custom_action":"Custom action","custom_entity_toggle":"Custom entity (toggle)","custom_entity_toggle_helper":"Entity to be toggled","show_consumer_total_in_house":"Show total consumption as secondary text","show_consumer_total_helper":"Shows the sum of all consumers under Home consumption","show_title":"Show title","show_subtitle":"Show subtitle","show_icon":"Show icon","title_line_height":"Title line height","subtitle_line_height":"Subtitle line height","primary_line_height":"Primary line height","secondary_line_height":"Secondary line height","tertiary_line_height":"Tertiary line height","label_line_height":"Label line height","value_line_height":"Value line height","item_calc_type":"Choose calculation","calc_type_entity":"Manual entity","calc_type_autarky":"Self-sufficiency","calc_type_self_consumption":"Self-consumption","calc_type_runtime":"Remaining runtime","calc_type_chargetime":"Remaining charge time","header_section":"Header","header_visibility":"Visibility","header_content":"Content","header_title_styling":"Title styling","header_subtitle_styling":"Subtitle styling","header_icon_styling":"Icon styling","infobar_styling":"Info bar styling","card_styling_section":"Card styling","theme_editor_cards":"Theme editor (cards)","theme_editor_cards_note":"Only changes card colors, not the header.","header_background_subsection":"Header background","icon_subsection":"Icon","primary_text_subsection":"Primary text (main value)","secondary_text_subsection":"Secondary text (line 2)","tertiary_text_subsection":"Tertiary text (line 3)","action_navigation_path":"Navigation path","action_url_label":"URL","action_service":"Service","layout_order":"Layout order","layout_order_helper":"Define the order of elements","pv_bar_settings":"PV bar settings","battery_bar_settings":"Battery bar settings","enable_pv_bar":"Enable PV bar","enable_battery_bar":"Enable battery bar","bar_position":"Position","bar_align":"Alignment","align_left":"Left","align_center":"Center","align_right":"Right","bar_entities":"Systems/Batteries","add_pv_entity":"Add PV system","add_battery_entity":"Add battery","remove_entity":"Remove","entity_name":"Name","entity_name_helper":"Display name in the bar","pv_max_5":"Max. 5 PV systems","battery_max_5":"Max. 5 batteries","bar_styling":"Bar styling","bar_separator":"Separator","bar_separator_helper":"Character between items (e.g. | or •)","bar_item_gap":"Item gap","bar_item_gap_helper":"Spacing between items","position_above_cards":"Above the cards","position_below_cards":"Below the cards","position_above_consumers":"Above the consumers","position_below_consumers":"Below the consumers","position_bottom":"Bottom","pv_bar_gap":"PV bar gap","pv_bar_gap_helper":"Spacing between the PV bar and other elements","battery_bar_gap":"Battery bar gap","battery_bar_gap_helper":"Spacing between the battery bar and other elements","move_up":"Move up","move_down":"Move down","duplicate":"Duplicate","delete":"Delete","tap_action":"Tap action","double_tap":"Double tap","hold_action":"Hold action"}');
const status$a = { "feed_in": "Feed-in", "neutral": "Neutral", "grid_consumption": "Grid import", "inactive": "Inactive" };
const en = {
  general: general$a,
  editor: editor$b,
  status: status$a
};
const en$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: en,
  editor: editor$b,
  general: general$a,
  status: status$a
}, Symbol.toStringTag, { value: "Module" }));
const general$9 = { "missing_entity": "falta", "inactive": "Inactivo" };
const editor$a = /* @__PURE__ */ JSON.parse('{"tab_general":"General","tab_elements":"Elementos","tab_cards":"Tarjetas","tab_layout":"Diseño","tab_language":"Idioma","tab_header":"Header","tab_theme":"Tema","tab_infobar":"Barra de información","tab_pv":"Sistema FV","tab_battery":"Batería","tab_house":"Casa","tab_grid":"Red","tab_consumers":"Consumidores","tab_pv_bar":"Barra FV","tab_battery_bar":"Barra de batería","card_header":"Encabezado de tarjeta","title":"Título","title_placeholder":"Monitor FV","title_helper":"Dejar vacío para ocultar.","subtitle":"Subtítulo","subtitle_placeholder":"Resumen de energía","subtitle_helper":"Dejar vacío para ocultar.","title_subtitle_gap":"Espacio entre título y subtítulo","title_subtitle_gap_helper":"Espacio entre el título y el subtítulo","header_icon_size":"Tamaño del icono del encabezado","header_icon_size_helper":"Tamaño del icono junto al título","header_icon_color":"Color del icono del encabezado","header_icon_margin":"Margen del icono del encabezado","icon":"Icono","icon_helper":"Se muestra solo si hay un título. Déjalo vacío para ocultarlo.","layout":"Diseño","grid_gap":"Espacio de cuadrícula","grid_gap_placeholder":"6px","grid_gap_helper":"Espacio entre las tarjetas.","header_margin_bottom":"Espacio entre encabezado y tarjetas/barra de información","header_margin_bottom_helper":"Espacio entre título/subtítulo y barra de información/tarjetas","infobar_gap":"Espacio entre barra de información y tarjetas","infobar_gap_helper":"Espacio entre la barra de información y las cuatro tarjetas","language":"Idioma","language_helper":"Selecciona el idioma de la interfaz","central_entities":"Entidades principales","central_entities_helper":"Define las entidades principales utilizadas para los cálculos","entity_pv_production":"Entidad de producción FV","entity_pv_production_helper":"Entidad para la potencia FV (usada en cálculos)","entity_battery_soc":"Entidad SoC de batería","entity_battery_soc_helper":"Entidad del estado de carga de la batería en % (para cálculos)","entity_battery_charge":"Entidad de carga de batería","entity_battery_charge_helper":"Entidad de la potencia de carga (para cálculos)","entity_battery_discharge":"Entidad de descarga de batería","entity_battery_discharge_helper":"Entidad de la potencia de descarga (para cálculos)","entity_house_consumption":"Entidad de consumo doméstico","entity_house_consumption_helper":"Entidad del consumo de la casa (para cálculo de autosuficiencia, opcional)","entity_grid_power":"Entidad de red","entity_grid_power_helper":"Entidad para la importación/exportación de energía (para cálculos)","central_config":"Configuración global","central_config_helper":"Estos valores se aplican a todas las tarjetas","pv_max_power_label":"Potencia máxima FV (W)","pv_max_power_helper":"Potencia máxima FV para animaciones","battery_capacity_label":"Capacidad de la batería (Wh)","battery_capacity_label_helper":"Capacidad de la batería (por ejemplo, 10000 para 10 kWh)","grid_threshold_label":"Umbral de red (W)","grid_threshold_helper":"Por debajo de este valor se muestra \\"Neutral\\"","card_visibility":"Visibilidad de tarjetas","cards_order":"Orden de las tarjetas","cards_order_helper":"Cambia el orden y la visibilidad de las cuatro tarjetas","card_house":"Casa","card_grid":"Red","show_pv_card":"Mostrar tarjeta FV","show_battery_card":"Mostrar tarjeta de batería","show_house_card":"Mostrar tarjeta de casa","show_grid_card":"Mostrar tarjeta de red","infobar_settings":"Configuración de la barra de información","enable_infobar":"Activar barra de información","infobar_position":"Posición de la barra de información","position_top":"Arriba (sobre las tarjetas)","calculation_mode":"Cálculo para el elemento 1","calculation_mode_helper":"Selecciona: Autosuficiencia o Autoconsumo","mode_autarky":"Autosuficiencia","mode_self_consumption":"Autoconsumo","calculate_battery_times":"Calcular tiempos de batería","calculate_battery_times_helper":"Cálculo automático para el elemento 2 (tiempo restante de descarga) y el 3 (tiempo restante de carga)","item":"Elemento","entity":"Entidad","icon_label":"Icono","label":"Etiqueta","unit":"Unidad","default_autarky":"Autosuficiencia","default_runtime":"Tiempo restante de descarga","default_chargetime":"Tiempo restante de carga","pv_system":"Sistema FV","pv_entity":"Entidad FV","pv_entity_helper":"Entidad para potencia FV","enable_animation":"Activar animación","animation_style":"Estilo de animación","animation_style_helper":"Selecciona el efecto de animación","animation_rotating_dots":"Puntos giratorios","animation_particle_field":"Campo de partículas","animation_electric_arc":"Arcos eléctricos","icon_rotation":"Rotación de icono","icon_rotation_helper":"El icono gira según la potencia","max_power":"Potencia máxima (W)","max_power_helper":"Potencia máxima FV para animación y rotación","battery":"Batería","battery_entity":"Entidad de batería","battery_entity_helper":"Entidad del nivel de batería (%)","charge_entity":"Entidad de carga","charge_entity_helper":"Entidad para potencia de carga","discharge_entity":"Entidad de descarga","discharge_entity_helper":"Entidad para potencia de descarga","battery_capacity":"Capacidad de la batería (Wh)","battery_capacity_helper":"Capacidad de la batería para animación (por ejemplo, 10000 para 10 kWh)","calculate_runtime":"Calcular tiempos de carga/descarga","calculate_runtime_helper":"Cálculo automático para elementos 2 y 3 en la barra de información","icon_auto_helper":"Dejar vacío para icono automático","house_consumption":"Consumo doméstico","house_entity":"Entidad de casa","house_entity_helper":"Entidad para consumo doméstico","grid":"Red","grid_entity":"Entidad de red","grid_entity_helper":"Entidad para importación/exportación de red","threshold":"Umbral (W)","threshold_helper":"Por debajo de este valor se muestra \\"Neutral\\"","status_texts":"Textos de estado","text_feed_in":"Texto para inyección","text_feed_in_placeholder":"Inyección","text_neutral":"Texto para neutral","text_neutral_placeholder":"Neutral","text_consumption":"Texto para consumo","text_consumption_placeholder":"Consumo de red","additional_texts":"Textos adicionales","secondary_entity":"Entidad secundaria","secondary_entity_helper":"Opcional: entidad para la segunda línea","secondary_text":"Texto secundario","secondary_text_helper":"Opcional: texto estático para la segunda línea","tertiary_entity":"Entidad terciaria","tertiary_text":"Texto terciario","styling":"Estilo","background_color":"Color de fondo","border_color":"Color del borde","primary_color":"Color primario","secondary_color":"Color secundario","icon_color":"Color del icono","card_styling":"Estilo de tarjeta","header_background":"Fondo del encabezado","enable_header_background":"Activar fondo del encabezado","enable_header_background_helper":"Activa el fondo del área de título/subtítulo","header_background_color":"Color de fondo del encabezado","header_border_color":"Color del borde del encabezado","header_border_radius":"Radio del borde del encabezado","header_padding":"Relleno del encabezado","header_width":"Ancho del encabezado","header_width_helper":"Auto = centrado al contenido, Full = ancho completo","header_width_auto":"Auto (tamaño del contenido)","header_width_full":"Completo (100% de ancho)","header_box_shadow":"Sombra del encabezado","border_radius":"Radio del borde","text_color":"Color del texto","padding":"Relleno","cursor":"Cursor","title_subtitle":"Título y subtítulo","title_size":"Tamaño del título","title_color":"Color del título","title_alignment":"Alineación del título","title_alignment_helper":"izquierda, centro, derecha","title_font_weight":"Peso de fuente del título","subtitle_size":"Tamaño del subtítulo","subtitle_color":"Color del subtítulo","subtitle_alignment":"Alineación del subtítulo","subtitle_font_weight":"Peso de fuente del subtítulo","icons":"Iconos","icon_size":"Tamaño del icono","icon_opacity":"Opacidad del icono","icon_margin":"Margen del icono","primary_text_styling":"Texto principal (valor)","primary_size":"Tamaño principal","primary_color_label":"Color principal","primary_opacity":"Opacidad principal","primary_font_weight":"Peso de fuente principal","secondary_text_styling":"Texto secundario (segunda línea)","secondary_size":"Tamaño secundario","secondary_color_label":"Color secundario","secondary_opacity":"Opacidad secundaria","secondary_font_weight":"Peso de fuente secundaria","tertiary_text_styling":"Texto terciario (tercera línea)","tertiary_size":"Tamaño terciario","tertiary_color_label":"Color terciario","tertiary_opacity":"Opacidad terciaria","tertiary_font_weight":"Peso de fuente terciaria","select_entity":"Seleccionar entidad","select_icon":"Seleccionar icono","action_none":"Ninguna","action_more_info":"Más información","action_navigate":"Navegar","action_url":"URL","action_call_service":"Llamar servicio","theme":"Tema","theme_helper":"Selecciona un tema de color predefinido","select_theme":"Seleccionar tema","consumers_settings":"Configuración de consumidores","enable_consumers":"Activar barra de consumidores","consumers_position":"Posición","consumers_sort_mode":"Ordenación","sort_highest_first":"Mayor primero","sort_lowest_first":"Menor primero","sort_none":"Sin orden (orden de entrada)","sort_alpha_asc":"Alfabético ascendente","sort_alpha_desc":"Alfabético descendente","consumers_threshold":"Umbral global (W)","consumers_threshold_helper":"Los consumidores por debajo de este valor no se muestran","add_consumer":"Agregar consumidor","remove_consumer":"Eliminar consumidor","consumer_entity":"N.º","consumer_icon":"Icono","consumer_label":"Etiqueta","consumer_threshold":"Umbral individual (W)","consumer_auto_color":"Color automático","consumer_auto_color_helper":"Color basado en consumo (verde a púrpura)","consumer_item_styling":"Estilo del consumidor","consumer_primary_entity":"Entidad principal (para valor)","consumer_primary_text":"Texto principal (reemplaza valor)","consumer_show_primary":"Mostrar línea principal","consumer_secondary_entity":"Entidad secundaria (para etiqueta)","consumer_secondary_text":"Texto secundario (reemplaza etiqueta)","consumer_show_secondary":"Mostrar línea secundaria","consumer_switch_entity":"Entidad de interruptor (para alternar)","consumer_switch_entity_helper":"Opcional: interruptor para encender/apagar","consumer_tap_actions":"Acciones táctiles","tap_action_target":"Acción al tocar","double_tap_action_target":"Acción al tocar dos veces","hold_action_target":"Acción al mantener pulsado","action_target_none":"Sin acción","action_target_entity":"Alternar entidad","action_target_custom_entity":"Alternar entidad personalizada","action_target_custom_action":"Acción personalizada","custom_entity_toggle":"Entidad personalizada (alternar)","custom_entity_toggle_helper":"Entidad que se alternará","show_consumer_total_in_house":"Mostrar consumo total como texto secundario","show_consumer_total_helper":"Muestra la suma de todos los consumidores bajo Consumo de casa","show_title":"Mostrar título","show_subtitle":"Mostrar subtítulo","show_icon":"Mostrar icono","title_line_height":"Altura de línea del título","subtitle_line_height":"Altura de línea del subtítulo","primary_line_height":"Altura de línea principal","secondary_line_height":"Altura de línea secundaria","tertiary_line_height":"Altura de línea terciaria","label_line_height":"Altura de línea de etiqueta","value_line_height":"Altura de línea de valor","item_calc_type":"Seleccionar cálculo","calc_type_entity":"Entidad manual","calc_type_autarky":"Autosuficiencia","calc_type_self_consumption":"Autoconsumo","calc_type_runtime":"Tiempo restante de descarga","calc_type_chargetime":"Tiempo restante de carga","header_section":"Encabezado","header_visibility":"Visibilidad","header_content":"Contenido","header_title_styling":"Estilo del título","header_subtitle_styling":"Estilo del subtítulo","header_icon_styling":"Estilo del icono","infobar_styling":"Estilo de la barra de información","card_styling_section":"Estilo de tarjetas","theme_editor_cards":"Editor de tema (tarjetas)","theme_editor_cards_note":"Solo cambia los colores de las tarjetas, no el encabezado.","header_background_subsection":"Fondo del encabezado","icon_subsection":"Icono","primary_text_subsection":"Texto principal (valor)","secondary_text_subsection":"Texto secundario (segunda línea)","tertiary_text_subsection":"Texto terciario (tercera línea)","action_navigation_path":"Ruta de navegación","action_url_label":"URL","action_service":"Servicio","layout_order":"Orden de diseño","layout_order_helper":"Define el orden de los elementos","pv_bar_settings":"Configuración de la barra FV","battery_bar_settings":"Configuración de la barra de batería","enable_pv_bar":"Activar barra FV","enable_battery_bar":"Activar barra de batería","bar_position":"Posición","bar_align":"Alineación","align_left":"Izquierda","align_center":"Centro","align_right":"Derecha","bar_entities":"Sistemas/Baterías","add_pv_entity":"Agregar sistema FV","add_battery_entity":"Agregar batería","remove_entity":"Eliminar","entity_name":"Nombre","entity_name_helper":"Nombre mostrado en la barra","pv_max_5":"Máx. 5 sistemas FV","battery_max_5":"Máx. 5 baterías","bar_styling":"Estilo de barra","bar_separator":"Separador","bar_separator_helper":"Carácter entre elementos (por ejemplo | o •)","bar_item_gap":"Espacio entre elementos","bar_item_gap_helper":"Espacio entre elementos","position_above_cards":"Sobre las tarjetas","position_below_cards":"Debajo de las tarjetas","position_above_consumers":"Sobre los consumidores","position_below_consumers":"Debajo de los consumidores","position_bottom":"Inferior","pv_bar_gap":"Espacio de barra FV","pv_bar_gap_helper":"Espacio entre la barra FV y otros elementos","battery_bar_gap":"Espacio de barra de batería","battery_bar_gap_helper":"Espacio entre la barra de batería y otros elementos","move_up":"Mover hacia arriba","move_down":"Mover hacia abajo","duplicate":"Duplicar","delete":"Eliminar","tap_action":"Acción al tocar","double_tap":"Doble toque","hold_action":"Mantener pulsado"}');
const status$9 = { "feed_in": "Inyección", "neutral": "Neutral", "grid_consumption": "Consumo de red", "inactive": "Inactivo" };
const es = {
  general: general$9,
  editor: editor$a,
  status: status$9
};
const es$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: es,
  editor: editor$a,
  general: general$9,
  status: status$9
}, Symbol.toStringTag, { value: "Module" }));
const general$8 = { "missing_entity": "puuttuu", "inactive": "Ei aktiivinen" };
const editor$9 = /* @__PURE__ */ JSON.parse('{"tab_general":"Yleinen","tab_elements":"Elementit","tab_cards":"Kortit","tab_layout":"Asettelu","tab_language":"Kieli","tab_header":"Header","tab_theme":"Teema","tab_infobar":"Tietopalkki","tab_pv":"Aurinkosähköjärjestelmä","tab_battery":"Akku","tab_house":"Talo","tab_grid":"Sähköverkko","tab_consumers":"Kuluttajat","tab_pv_bar":"Aurinkopalkki","tab_battery_bar":"Akkupalkki","card_header":"Kortin otsikko","title":"Otsikko","title_placeholder":"Aurinkosähkömonitori","title_helper":"Jätä tyhjäksi piilottaaksesi.","subtitle":"Alaotsikko","subtitle_placeholder":"Energiayhteenveto","subtitle_helper":"Jätä tyhjäksi piilottaaksesi.","title_subtitle_gap":"Väli otsikon ja alaotsikon välillä","title_subtitle_gap_helper":"Etäisyys otsikon ja alaotsikon välillä","header_icon_size":"Otsikon kuvakkeen koko","header_icon_size_helper":"Kuvakkeen koko otsikon vieressä","header_icon_color":"Otsikon kuvakkeen väri","header_icon_margin":"Otsikon kuvakkeen marginaali","icon":"Kuvake","icon_helper":"Näytetään vain, jos otsikko on asetettu. Jätä tyhjäksi piilottaaksesi.","layout":"Asettelu","grid_gap":"Ristikkoetäisyys","grid_gap_placeholder":"6px","grid_gap_helper":"Etäisyys korttien välillä.","header_margin_bottom":"Etäisyys otsikon ja korttien/tietopalkin välillä","header_margin_bottom_helper":"Etäisyys otsikon/alaotsikon ja tietopalkin/korttien välillä","infobar_gap":"Tietopalkin ja korttien väli","infobar_gap_helper":"Etäisyys tietopalkin ja neljän kortin välillä","language":"Kieli","language_helper":"Valitse käyttöliittymän kieli","central_entities":"Keskitetyt entiteetit","central_entities_helper":"Määritä laskelmissa käytettävät pääentiteetit","entity_pv_production":"Aurinkosähköntuotantoentiteetti","entity_pv_production_helper":"Entiteetti aurinkosähköteholle (käytetään laskelmissa)","entity_battery_soc":"Akun varaustaso (SoC)","entity_battery_soc_helper":"Entiteetti akun varaustasolle prosentteina (laskelmia varten)","entity_battery_charge":"Akun latausentiteetti","entity_battery_charge_helper":"Entiteetti latausteholle (laskelmia varten)","entity_battery_discharge":"Akun purkuentiteetti","entity_battery_discharge_helper":"Entiteetti purkuteholle (laskelmia varten)","entity_house_consumption":"Kotitalouden kulutus","entity_house_consumption_helper":"Entiteetti kotitalouden kulutukselle (omavaraisuuden laskentaa varten, valinnainen)","entity_grid_power":"Sähköverkkoteho","entity_grid_power_helper":"Entiteetti sähköverkon tuonnille/viennille (laskelmia varten)","central_config":"Keskitetty asetukset","central_config_helper":"Nämä arvot koskevat kaikkia kortteja","pv_max_power_label":"Maksimi aurinkoteho (W)","pv_max_power_helper":"Aurinkosähkön enimmäisteho animaatioita varten","battery_capacity_label":"Akun kapasiteetti (Wh)","battery_capacity_label_helper":"Akun kapasiteetti (esim. 10000 tarkoittaa 10 kWh)","grid_threshold_label":"Verkon kynnys (W)","grid_threshold_helper":"Tämän arvon alapuolella näytetään \\"Neutraali\\"","card_visibility":"Kortin näkyvyys","cards_order":"Korttien järjestys","cards_order_helper":"Muuta neljän kortin järjestystä ja näkyvyyttä","card_house":"Talo","card_grid":"Verkko","show_pv_card":"Näytä aurinkokortti","show_battery_card":"Näytä akkukortti","show_house_card":"Näytä talokortti","show_grid_card":"Näytä verkkokortti","infobar_settings":"Tietopalkin asetukset","enable_infobar":"Ota tietopalkki käyttöön","infobar_position":"Tietopalkin sijainti","position_top":"Ylhäällä (korttien yläpuolella)","calculation_mode":"Laskentatapa kohteelle 1","calculation_mode_helper":"Valitse: Omavaraisuus tai Itse kulutus","mode_autarky":"Omavaraisuus","mode_self_consumption":"Itse kulutus","calculate_battery_times":"Laske akkuajat","calculate_battery_times_helper":"Automaattinen laskenta kohteille 2 (jäljellä oleva käyttöaika) ja 3 (jäljellä oleva latausaika)","item":"Kohde","entity":"Entiteetti","icon_label":"Kuvake","label":"Tunniste","unit":"Yksikkö","default_autarky":"Omavaraisuus","default_runtime":"Jäljellä oleva käyttöaika","default_chargetime":"Jäljellä oleva latausaika","pv_system":"Aurinkosähköjärjestelmä","pv_entity":"Aurinkosähköentiteetti","pv_entity_helper":"Entiteetti aurinkosähköteholle","enable_animation":"Ota animaatio käyttöön","animation_style":"Animaatiotyyli","animation_style_helper":"Valitse animaatiotehoste","animation_rotating_dots":"Pyörivät pisteet","animation_particle_field":"Hiukkaskenttä","animation_electric_arc":"Sähkökaari","icon_rotation":"Kuvakkeen kierto","icon_rotation_helper":"Kuvake pyörii tehon mukaan","max_power":"Suurin teho (W)","max_power_helper":"Suurin aurinkoteho animaatiota ja kiertoa varten","battery":"Akku","battery_entity":"Akun entiteetti","battery_entity_helper":"Entiteetti akun varaustasolle (%)","charge_entity":"Latausentiteetti","charge_entity_helper":"Entiteetti latausteholle","discharge_entity":"Purkuentiteetti","discharge_entity_helper":"Entiteetti purkuteholle","battery_capacity":"Akun kapasiteetti (Wh)","battery_capacity_helper":"Kapasiteetti animaatioita varten (esim. 10000 tarkoittaa 10 kWh)","calculate_runtime":"Laske käyttö- ja latausajat","calculate_runtime_helper":"Automaattinen laskenta tietopalkin kohdille 2 ja 3","icon_auto_helper":"Jätä tyhjäksi käyttääksesi automaattista kuvaketta","house_consumption":"Talouden kulutus","house_entity":"Taloentiteetti","house_entity_helper":"Entiteetti talouden kulutukselle","grid":"Verkko","grid_entity":"Verkkoentiteetti","grid_entity_helper":"Entiteetti sähköverkon tuonnille/viennille","threshold":"Kynnys (W)","threshold_helper":"Tämän arvon alapuolella näytetään \\"Neutraali\\"","status_texts":"Tilatekstit","text_feed_in":"Syöttöteksti","text_feed_in_placeholder":"Syöttö","text_neutral":"Neutraali teksti","text_neutral_placeholder":"Neutraali","text_consumption":"Kulutusteksti","text_consumption_placeholder":"Verkon kulutus","additional_texts":"Lisätekstit","secondary_entity":"Toissijainen entiteetti","secondary_entity_helper":"Valinnainen: entiteetti toiselle riville","secondary_text":"Toissijainen teksti","secondary_text_helper":"Valinnainen: staattinen teksti toiselle riville","tertiary_entity":"Kolmas entiteetti","tertiary_text":"Kolmas teksti","styling":"Tyyli","background_color":"Taustaväri","border_color":"Reunaväri","primary_color":"Ensisijainen väri","secondary_color":"Toissijainen väri","icon_color":"Kuvakkeen väri","card_styling":"Kortin tyyli","header_background":"Otsikon tausta","enable_header_background":"Ota otsikon tausta käyttöön","enable_header_background_helper":"Ottaa käyttöön taustan otsikko-/alaotsikkoalueelle","header_background_color":"Otsikon taustaväri","header_border_color":"Otsikon reunaväri","header_border_radius":"Otsikon reunapyöristys","header_padding":"Otsikon täyte","header_width":"Otsikon leveys","header_width_helper":"Auto = keskitetty sisältöön, Full = täysi leveys","header_width_auto":"Automaattinen (sisällön koko)","header_width_full":"Täysi (100 % leveys)","header_box_shadow":"Otsikon varjo","border_radius":"Reunapyöristys","text_color":"Tekstin väri","padding":"Täyte","cursor":"Kursori","title_subtitle":"Otsikko ja alaotsikko","title_size":"Otsikon koko","title_color":"Otsikon väri","title_alignment":"Otsikon tasaus","title_alignment_helper":"vasen, keski, oikea","title_font_weight":"Otsikon lihavointi","subtitle_size":"Alaotsikon koko","subtitle_color":"Alaotsikon väri","subtitle_alignment":"Alaotsikon tasaus","subtitle_font_weight":"Alaotsikon lihavointi","icons":"Kuvakkeet","icon_size":"Kuvakkeen koko","icon_opacity":"Kuvakkeen läpinäkyvyys","icon_margin":"Kuvakkeen marginaali","primary_text_styling":"Ensisijainen teksti (arvo)","primary_size":"Ensisijainen koko","primary_color_label":"Ensisijainen väri","primary_opacity":"Ensisijainen läpinäkyvyys","primary_font_weight":"Ensisijainen lihavointi","secondary_text_styling":"Toissijainen teksti (toinen rivi)","secondary_size":"Toissijainen koko","secondary_color_label":"Toissijainen väri","secondary_opacity":"Toissijainen läpinäkyvyys","secondary_font_weight":"Toissijainen lihavointi","tertiary_text_styling":"Kolmas teksti (kolmas rivi)","tertiary_size":"Kolmas koko","tertiary_color_label":"Kolmas väri","tertiary_opacity":"Kolmas läpinäkyvyys","tertiary_font_weight":"Kolmas lihavointi","select_entity":"Valitse entiteetti","select_icon":"Valitse kuvake","action_none":"Ei mitään","action_more_info":"Lisätietoja","action_navigate":"Siirry","action_url":"URL","action_call_service":"Kutsu palvelua","theme":"Teema","theme_helper":"Valitse esiasetettu värimaailma","select_theme":"Valitse teema","consumers_settings":"Kuluttaja-asetukset","enable_consumers":"Ota kuluttajapalkki käyttöön","consumers_position":"Sijainti","consumers_sort_mode":"Lajittelu","sort_highest_first":"Suurin ensin","sort_lowest_first":"Pienin ensin","sort_none":"Ei lajittelua","sort_alpha_asc":"Aakkosellinen (A–Ö)","sort_alpha_desc":"Aakkosellinen (Ö–A)","consumers_threshold":"Yleinen kynnys (W)","consumers_threshold_helper":"Kuluttajia, joiden arvo on tämän alapuolella, ei näytetä","add_consumer":"Lisää kuluttaja","remove_consumer":"Poista kuluttaja","consumer_entity":"Nro","consumer_icon":"Kuvake","consumer_label":"Tunniste","consumer_threshold":"Yksittäinen kynnys (W)","consumer_auto_color":"Automaattinen väri","consumer_auto_color_helper":"Väri perustuu kulutukseen (vihreä → violetti)","consumer_item_styling":"Kuluttajan tyyli","consumer_primary_entity":"Ensisijainen entiteetti (arvo)","consumer_primary_text":"Ensisijainen teksti (korvaa arvon)","consumer_show_primary":"Näytä ensisijainen rivi","consumer_secondary_entity":"Toissijainen entiteetti (tunniste)","consumer_secondary_text":"Toissijainen teksti (korvaa tunnisteen)","consumer_show_secondary":"Näytä toissijainen rivi","consumer_switch_entity":"Kytkinentiteetti (vaihtamiseen)","consumer_switch_entity_helper":"Valinnainen: kytkin päälle/pois","consumer_tap_actions":"Napautustoiminnot","tap_action_target":"Napautustoiminnon kohde","double_tap_action_target":"Kaksoisnapautustoiminnon kohde","hold_action_target":"Pitotoiminnon kohde","action_target_none":"Ei toimintoa","action_target_entity":"Vaihda entiteetti","action_target_custom_entity":"Vaihda mukautettu entiteetti","action_target_custom_action":"Mukautettu toiminto","custom_entity_toggle":"Mukautettu entiteetti (vaihto)","custom_entity_toggle_helper":"Entiteetti, jota vaihdetaan","show_consumer_total_in_house":"Näytä kokonaiskulutus toissijaisena tekstinä","show_consumer_total_helper":"Näyttää kaikkien kuluttajien summan Talo-kulutuksen alla","show_title":"Näytä otsikko","show_subtitle":"Näytä alaotsikko","show_icon":"Näytä kuvake","title_line_height":"Otsikon rivikorkeus","subtitle_line_height":"Alaotsikon rivikorkeus","primary_line_height":"Ensisijainen rivikorkeus","secondary_line_height":"Toissijainen rivikorkeus","tertiary_line_height":"Kolmas rivikorkeus","label_line_height":"Tunnisterivikorkeus","value_line_height":"Arvorivikorkeus","item_calc_type":"Laskentatyyppi","calc_type_entity":"Manuaalinen entiteetti","calc_type_autarky":"Omavaraisuus","calc_type_self_consumption":"Itse kulutus","calc_type_runtime":"Jäljellä oleva käyttöaika","calc_type_chargetime":"Jäljellä oleva latausaika","header_section":"Otsikko","header_visibility":"Näkyvyys","header_content":"Sisältö","header_title_styling":"Otsikon tyyli","header_subtitle_styling":"Alaotsikon tyyli","header_icon_styling":"Kuvakkeen tyyli","infobar_styling":"Tietopalkin tyyli","card_styling_section":"Kortin tyyli","theme_editor_cards":"Teemamuokkain (kortit)","theme_editor_cards_note":"Muokkaa vain korttien värejä, ei otsikkoa.","header_background_subsection":"Otsikon tausta","icon_subsection":"Kuvake","primary_text_subsection":"Ensisijainen teksti (arvo)","secondary_text_subsection":"Toissijainen teksti (toinen rivi)","tertiary_text_subsection":"Kolmas teksti (kolmas rivi)","action_navigation_path":"Navigointipolku","action_url_label":"URL","action_service":"Palvelu","layout_order":"Asettelujärjestys","layout_order_helper":"Määritä elementtien järjestys","pv_bar_settings":"Aurinkopalkin asetukset","battery_bar_settings":"Akkupalkin asetukset","enable_pv_bar":"Ota aurinkopalkki käyttöön","enable_battery_bar":"Ota akkupalkki käyttöön","bar_position":"Sijainti","bar_align":"Tasaus","align_left":"Vasemmalla","align_center":"Keskellä","align_right":"Oikealla","bar_entities":"Järjestelmät/Akut","add_pv_entity":"Lisää aurinkojärjestelmä","add_battery_entity":"Lisää akku","remove_entity":"Poista","entity_name":"Nimi","entity_name_helper":"Nimi, joka näytetään palkissa","pv_max_5":"Enintään 5 aurinkojärjestelmää","battery_max_5":"Enintään 5 akkua","bar_styling":"Palkin tyyli","bar_separator":"Erotin","bar_separator_helper":"Merkki elementtien välissä (esim. | tai •)","bar_item_gap":"Etäisyys elementtien välillä","bar_item_gap_helper":"Etäisyys elementtien välillä","position_above_cards":"Korttien yläpuolella","position_below_cards":"Korttien alapuolella","position_above_consumers":"Kuluttajien yläpuolella","position_below_consumers":"Kuluttajien alapuolella","position_bottom":"Alhaalla","pv_bar_gap":"Aurinkopalkin väli","pv_bar_gap_helper":"Etäisyys aurinkopalkin ja muiden elementtien välillä","battery_bar_gap":"Akkupalkin väli","battery_bar_gap_helper":"Etäisyys akkupalkin ja muiden elementtien välillä","move_up":"Siirrä ylös","move_down":"Siirrä alas","duplicate":"Monista","delete":"Poista","tap_action":"Napautustoiminto","double_tap":"Kaksoisnapautus","hold_action":"Pito"}');
const status$8 = { "feed_in": "Syöttö", "neutral": "Neutraali", "grid_consumption": "Verkon kulutus", "inactive": "Ei aktiivinen" };
const fi = {
  general: general$8,
  editor: editor$9,
  status: status$8
};
const fi$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fi,
  editor: editor$9,
  general: general$8,
  status: status$8
}, Symbol.toStringTag, { value: "Module" }));
const general$7 = { "missing_entity": "manquant", "inactive": "Inactif" };
const editor$8 = /* @__PURE__ */ JSON.parse(`{"tab_general":"Général","tab_elements":"Éléments","tab_cards":"Cartes","tab_layout":"Disposition","tab_language":"Langue","tab_header":"Header","tab_theme":"Thème","tab_infobar":"Barre d’information","tab_pv":"Système PV","tab_battery":"Batterie","tab_house":"Maison","tab_grid":"Réseau","tab_consumers":"Consommateurs","tab_pv_bar":"Barre PV","tab_battery_bar":"Barre de batterie","card_header":"En-tête de carte","title":"Titre","title_placeholder":"Moniteur PV","title_helper":"Laisser vide pour masquer.","subtitle":"Sous-titre","subtitle_placeholder":"Vue d’ensemble de l’énergie","subtitle_helper":"Laisser vide pour masquer.","title_subtitle_gap":"Espace titre-sous-titre","title_subtitle_gap_helper":"Espace entre le titre et le sous-titre","header_icon_size":"Taille de l’icône d’en-tête","header_icon_size_helper":"Taille de l’icône à côté du titre","header_icon_color":"Couleur de l’icône d’en-tête","header_icon_margin":"Marge de l’icône d’en-tête","icon":"Icône","icon_helper":"Affiché uniquement si un titre est défini. Laisser vide pour masquer.","layout":"Disposition","grid_gap":"Espace de la grille","grid_gap_placeholder":"6px","grid_gap_helper":"Espace entre les cartes.","header_margin_bottom":"Espace entre l’en-tête et les cartes/barre d’info","header_margin_bottom_helper":"Espace entre le titre/sous-titre et la barre d’info/cartes","infobar_gap":"Espace barre d’info-cartes","infobar_gap_helper":"Espace entre la barre d’information et les quatre cartes","language":"Langue","language_helper":"Choisissez la langue d’affichage","central_entities":"Entités centrales","central_entities_helper":"Définissez les entités principales utilisées pour les calculs","entity_pv_production":"Entité production PV","entity_pv_production_helper":"Entité pour la puissance PV (utilisée dans les calculs)","entity_battery_soc":"Entité SoC de la batterie","entity_battery_soc_helper":"Entité pour le niveau de charge de la batterie en % (pour calculs)","entity_battery_charge":"Entité de charge de batterie","entity_battery_charge_helper":"Entité pour la puissance de charge (pour calculs)","entity_battery_discharge":"Entité de décharge de batterie","entity_battery_discharge_helper":"Entité pour la puissance de décharge (pour calculs)","entity_house_consumption":"Entité consommation maison","entity_house_consumption_helper":"Entité pour la consommation domestique (pour le calcul de l’autonomie, optionnel)","entity_grid_power":"Entité réseau","entity_grid_power_helper":"Entité pour l’import/export du réseau (pour calculs)","central_config":"Configuration globale","central_config_helper":"Ces valeurs s’appliquent à toutes les cartes","pv_max_power_label":"Puissance PV max (W)","pv_max_power_helper":"Puissance maximale du PV pour les animations","battery_capacity_label":"Capacité de la batterie (Wh)","battery_capacity_label_helper":"Capacité de la batterie (ex. 10000 pour 10 kWh)","grid_threshold_label":"Seuil réseau (W)","grid_threshold_helper":"En dessous de cette valeur, « Neutre » est affiché","card_visibility":"Visibilité des cartes","cards_order":"Ordre des cartes","cards_order_helper":"Modifier l’ordre et la visibilité des quatre cartes","card_house":"Maison","card_grid":"Réseau","show_pv_card":"Afficher la carte PV","show_battery_card":"Afficher la carte batterie","show_house_card":"Afficher la carte maison","show_grid_card":"Afficher la carte réseau","infobar_settings":"Paramètres de la barre d’information","enable_infobar":"Activer la barre d’information","infobar_position":"Position de la barre d’information","position_top":"Haut (au-dessus des cartes)","calculation_mode":"Calcul pour l’élément 1","calculation_mode_helper":"Choisir : Autonomie ou Autoconsommation","mode_autarky":"Autonomie (autosuffisance)","mode_self_consumption":"Autoconsommation","calculate_battery_times":"Calculer les temps de batterie","calculate_battery_times_helper":"Calcul automatique pour l’élément 2 (autonomie restante) et 3 (temps de charge restant)","item":"Élément","entity":"Entité","icon_label":"Icône","label":"Libellé","unit":"Unité","default_autarky":"Autonomie","default_runtime":"Durée restante","default_chargetime":"Temps de charge restant","pv_system":"Système PV","pv_entity":"Entité PV","pv_entity_helper":"Entité pour la puissance PV","enable_animation":"Activer l’animation","animation_style":"Style d’animation","animation_style_helper":"Choisissez l’effet d’animation","animation_rotating_dots":"Points tournants","animation_particle_field":"Champ de particules","animation_electric_arc":"Arcs électriques","icon_rotation":"Rotation de l’icône","icon_rotation_helper":"L’icône tourne selon la puissance","max_power":"Puissance max (W)","max_power_helper":"Puissance PV maximale pour animation et rotation","battery":"Batterie","battery_entity":"Entité batterie","battery_entity_helper":"Entité pour le niveau de batterie (%)","charge_entity":"Entité de charge","charge_entity_helper":"Entité pour la puissance de charge","discharge_entity":"Entité de décharge","discharge_entity_helper":"Entité pour la puissance de décharge","battery_capacity":"Capacité de batterie (Wh)","battery_capacity_helper":"Capacité de la batterie pour l’animation (ex. 10000 pour 10 kWh)","calculate_runtime":"Calculer les durées de charge/décharge","calculate_runtime_helper":"Calcul automatique pour les éléments 2 et 3 dans la barre d’info","icon_auto_helper":"Laisser vide pour icône automatique","house_consumption":"Consommation maison","house_entity":"Entité maison","house_entity_helper":"Entité pour la consommation domestique","grid":"Réseau","grid_entity":"Entité réseau","grid_entity_helper":"Entité pour import/export réseau","threshold":"Seuil (W)","threshold_helper":"En dessous de cette valeur, « Neutre » est affiché","status_texts":"Textes d’état","text_feed_in":"Texte pour injection","text_feed_in_placeholder":"Injection","text_neutral":"Texte pour neutre","text_neutral_placeholder":"Neutre","text_consumption":"Texte pour consommation","text_consumption_placeholder":"Consommation réseau","additional_texts":"Textes supplémentaires","secondary_entity":"Entité secondaire","secondary_entity_helper":"Optionnel : entité pour la 2ᵉ ligne","secondary_text":"Texte secondaire","secondary_text_helper":"Optionnel : texte statique pour la 2ᵉ ligne","tertiary_entity":"Entité tertiaire","tertiary_text":"Texte tertiaire","styling":"Style","background_color":"Couleur d’arrière-plan","border_color":"Couleur de bordure","primary_color":"Couleur principale","secondary_color":"Couleur secondaire","icon_color":"Couleur de l’icône","card_styling":"Style de carte","header_background":"Fond de l’en-tête","enable_header_background":"Activer le fond d’en-tête","enable_header_background_helper":"Active le fond pour la zone titre/sous-titre","header_background_color":"Couleur de fond d’en-tête","header_border_color":"Couleur de bordure d’en-tête","header_border_radius":"Rayon de bordure d’en-tête","header_padding":"Marge interne d’en-tête","header_width":"Largeur d’en-tête","header_width_helper":"Auto = centré au contenu, Full = pleine largeur","header_width_auto":"Auto (taille du contenu)","header_width_full":"Pleine largeur (100 %)","header_box_shadow":"Ombre d’en-tête","border_radius":"Rayon de bordure","text_color":"Couleur du texte","padding":"Marge interne","cursor":"Curseur","title_subtitle":"Titre et sous-titre","title_size":"Taille du titre","title_color":"Couleur du titre","title_alignment":"Alignement du titre","title_alignment_helper":"gauche, centre, droite","title_font_weight":"Épaisseur du titre","subtitle_size":"Taille du sous-titre","subtitle_color":"Couleur du sous-titre","subtitle_alignment":"Alignement du sous-titre","subtitle_font_weight":"Épaisseur du sous-titre","icons":"Icônes","icon_size":"Taille de l’icône","icon_opacity":"Opacité de l’icône","icon_margin":"Marge de l’icône","primary_text_styling":"Texte principal (valeur)","primary_size":"Taille principale","primary_color_label":"Couleur principale","primary_opacity":"Opacité principale","primary_font_weight":"Épaisseur principale","secondary_text_styling":"Texte secondaire (2ᵉ ligne)","secondary_size":"Taille secondaire","secondary_color_label":"Couleur secondaire","secondary_opacity":"Opacité secondaire","secondary_font_weight":"Épaisseur secondaire","tertiary_text_styling":"Texte tertiaire (3ᵉ ligne)","tertiary_size":"Taille tertiaire","tertiary_color_label":"Couleur tertiaire","tertiary_opacity":"Opacité tertiaire","tertiary_font_weight":"Épaisseur tertiaire","select_entity":"Sélectionner une entité","select_icon":"Sélectionner une icône","action_none":"Aucune","action_more_info":"Plus d’informations","action_navigate":"Naviguer","action_url":"URL","action_call_service":"Appeler un service","theme":"Thème","theme_helper":"Choisissez un thème de couleur prédéfini","select_theme":"Sélectionner un thème","consumers_settings":"Paramètres des consommateurs","enable_consumers":"Activer la barre des consommateurs","consumers_position":"Position","consumers_sort_mode":"Tri","sort_highest_first":"Plus élevé d’abord","sort_lowest_first":"Plus bas d’abord","sort_none":"Aucun tri (ordre d’entrée)","sort_alpha_asc":"Alphabétique (A–Z)","sort_alpha_desc":"Alphabétique (Z–A)","consumers_threshold":"Seuil global (W)","consumers_threshold_helper":"Les consommateurs en dessous de cette valeur ne s’affichent pas","add_consumer":"Ajouter un consommateur","remove_consumer":"Supprimer un consommateur","consumer_entity":"N°","consumer_icon":"Icône","consumer_label":"Libellé","consumer_threshold":"Seuil individuel (W)","consumer_auto_color":"Couleur automatique","consumer_auto_color_helper":"Couleur basée sur la consommation (vert à violet)","consumer_item_styling":"Style du consommateur","consumer_primary_entity":"Entité principale (valeur)","consumer_primary_text":"Texte principal (remplace la valeur)","consumer_show_primary":"Afficher la ligne principale","consumer_secondary_entity":"Entité secondaire (étiquette)","consumer_secondary_text":"Texte secondaire (remplace l’étiquette)","consumer_show_secondary":"Afficher la ligne secondaire","consumer_switch_entity":"Entité interrupteur (pour bascule)","consumer_switch_entity_helper":"Optionnel : interrupteur pour activer/désactiver","consumer_tap_actions":"Actions tactiles","tap_action_target":"Cible de l’action tactile","double_tap_action_target":"Cible du double tap","hold_action_target":"Cible du maintien","action_target_none":"Aucune action","action_target_entity":"Bascule d’entité","action_target_custom_entity":"Bascule personnalisée","action_target_custom_action":"Action personnalisée","custom_entity_toggle":"Entité personnalisée (bascule)","custom_entity_toggle_helper":"Entité à basculer","show_consumer_total_in_house":"Afficher la consommation totale comme texte secondaire","show_consumer_total_helper":"Affiche la somme de tous les consommateurs sous « Consommation maison »","show_title":"Afficher le titre","show_subtitle":"Afficher le sous-titre","show_icon":"Afficher l’icône","title_line_height":"Hauteur de ligne du titre","subtitle_line_height":"Hauteur de ligne du sous-titre","primary_line_height":"Hauteur de ligne principale","secondary_line_height":"Hauteur de ligne secondaire","tertiary_line_height":"Hauteur de ligne tertiaire","label_line_height":"Hauteur de ligne de l’étiquette","value_line_height":"Hauteur de ligne de la valeur","item_calc_type":"Type de calcul","calc_type_entity":"Entité manuelle","calc_type_autarky":"Autonomie","calc_type_self_consumption":"Autoconsommation","calc_type_runtime":"Durée restante","calc_type_chargetime":"Temps de charge restant","header_section":"En-tête","header_visibility":"Visibilité","header_content":"Contenu","header_title_styling":"Style du titre","header_subtitle_styling":"Style du sous-titre","header_icon_styling":"Style de l'icône","infobar_styling":"Style de la barre d'information","card_styling_section":"Style des cartes","theme_editor_cards":"Éditeur de thème (cartes)","theme_editor_cards_note":"Modifie uniquement les couleurs des cartes, pas l’en-tête.","header_background_subsection":"Fond d’en-tête","icon_subsection":"Icône","primary_text_subsection":"Texte principal (valeur)","secondary_text_subsection":"Texte secondaire (2ᵉ ligne)","tertiary_text_subsection":"Texte tertiaire (3ᵉ ligne)","action_navigation_path":"Chemin de navigation","action_url_label":"URL","action_service":"Service","layout_order":"Ordre de disposition","layout_order_helper":"Définissez l’ordre des éléments","pv_bar_settings":"Paramètres de la barre PV","battery_bar_settings":"Paramètres de la barre batterie","enable_pv_bar":"Activer la barre PV","enable_battery_bar":"Activer la barre batterie","bar_position":"Position","bar_align":"Alignement","align_left":"Gauche","align_center":"Centre","align_right":"Droite","bar_entities":"Systèmes/Batteries","add_pv_entity":"Ajouter un système PV","add_battery_entity":"Ajouter une batterie","remove_entity":"Supprimer","entity_name":"Nom","entity_name_helper":"Nom affiché dans la barre","pv_max_5":"Max. 5 systèmes PV","battery_max_5":"Max. 5 batteries","bar_styling":"Style de barre","bar_separator":"Séparateur","bar_separator_helper":"Caractère entre les éléments (ex. | ou •)","bar_item_gap":"Espace entre éléments","bar_item_gap_helper":"Espace entre les éléments","position_above_cards":"Au-dessus des cartes","position_below_cards":"En dessous des cartes","position_above_consumers":"Au-dessus des consommateurs","position_below_consumers":"En dessous des consommateurs","position_bottom":"Bas","pv_bar_gap":"Espace barre PV","pv_bar_gap_helper":"Espace entre la barre PV et les autres éléments","battery_bar_gap":"Espace barre batterie","battery_bar_gap_helper":"Espace entre la barre batterie et les autres éléments","move_up":"Déplacer vers le haut","move_down":"Déplacer vers le bas","duplicate":"Dupliquer","delete":"Supprimer","tap_action":"Action tactile","double_tap":"Double appui","hold_action":"Maintenir"}`);
const status$7 = { "feed_in": "Injection", "neutral": "Neutre", "grid_consumption": "Consommation réseau", "inactive": "Inactif" };
const fr = {
  general: general$7,
  editor: editor$8,
  status: status$7
};
const fr$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fr,
  editor: editor$8,
  general: general$7,
  status: status$7
}, Symbol.toStringTag, { value: "Module" }));
const general$6 = { "missing_entity": "mancante", "inactive": "Inattivo" };
const editor$7 = /* @__PURE__ */ JSON.parse('{"tab_general":"Generale","tab_elements":"Elementi","tab_cards":"Schede","tab_layout":"Layout","tab_language":"Lingua","tab_header":"Header","tab_theme":"Tema","tab_infobar":"Barra informazioni","tab_pv":"Impianto FV","tab_battery":"Batteria","tab_house":"Casa","tab_grid":"Rete","tab_consumers":"Consumatori","tab_pv_bar":"Barra FV","tab_battery_bar":"Barra batteria","card_header":"Intestazione scheda","title":"Titolo","title_placeholder":"Monitor FV","title_helper":"Lascia vuoto per nascondere.","subtitle":"Sottotitolo","subtitle_placeholder":"Panoramica energetica","subtitle_helper":"Lascia vuoto per nascondere.","title_subtitle_gap":"Spazio tra titolo e sottotitolo","title_subtitle_gap_helper":"Distanza tra titolo e sottotitolo","header_icon_size":"Dimensione icona intestazione","header_icon_size_helper":"Dimensione dell’icona accanto al titolo","header_icon_color":"Colore icona intestazione","header_icon_margin":"Margine icona intestazione","icon":"Icona","icon_helper":"Mostrata solo se è presente un titolo. Lascia vuoto per nascondere.","layout":"Layout","grid_gap":"Spazio griglia","grid_gap_placeholder":"6px","grid_gap_helper":"Spazio tra le schede.","header_margin_bottom":"Spazio tra intestazione e schede/barra info","header_margin_bottom_helper":"Distanza tra titolo/sottotitolo e barra info/schede","infobar_gap":"Spazio barra info-schede","infobar_gap_helper":"Spazio tra la barra informazioni e le quattro schede","language":"Lingua","language_helper":"Seleziona la lingua dell’interfaccia","central_entities":"Entità centrali","central_entities_helper":"Definisci le entità principali utilizzate per i calcoli","entity_pv_production":"Entità produzione FV","entity_pv_production_helper":"Entità per la potenza FV (utilizzata nei calcoli)","entity_battery_soc":"Entità SoC batteria","entity_battery_soc_helper":"Entità per lo stato di carica della batteria in % (per calcoli)","entity_battery_charge":"Entità carica batteria","entity_battery_charge_helper":"Entità per la potenza di carica (per calcoli)","entity_battery_discharge":"Entità scarica batteria","entity_battery_discharge_helper":"Entità per la potenza di scarica (per calcoli)","entity_house_consumption":"Entità consumo casa","entity_house_consumption_helper":"Entità per il consumo domestico (per calcolo autosufficienza, opzionale)","entity_grid_power":"Entità rete","entity_grid_power_helper":"Entità per importazione/esportazione rete (per calcoli)","central_config":"Configurazione globale","central_config_helper":"Questi valori si applicano a tutte le schede","pv_max_power_label":"Potenza FV massima (W)","pv_max_power_helper":"Potenza massima FV per animazioni","battery_capacity_label":"Capacità batteria (Wh)","battery_capacity_label_helper":"Capacità della batteria (es. 10000 per 10 kWh)","grid_threshold_label":"Soglia rete (W)","grid_threshold_helper":"Sotto questo valore viene mostrato \\"Neutro\\"","card_visibility":"Visibilità schede","cards_order":"Ordine schede","cards_order_helper":"Modifica l’ordine e la visibilità delle quattro schede","card_house":"Casa","card_grid":"Rete","show_pv_card":"Mostra scheda FV","show_battery_card":"Mostra scheda batteria","show_house_card":"Mostra scheda casa","show_grid_card":"Mostra scheda rete","infobar_settings":"Impostazioni barra informazioni","enable_infobar":"Abilita barra informazioni","infobar_position":"Posizione barra informazioni","position_top":"In alto (sopra le schede)","calculation_mode":"Calcolo per elemento 1","calculation_mode_helper":"Scegli: Autosufficienza o Autoconsumo","mode_autarky":"Autosufficienza","mode_self_consumption":"Autoconsumo","calculate_battery_times":"Calcola tempi batteria","calculate_battery_times_helper":"Calcolo automatico per elemento 2 (tempo di autonomia) e 3 (tempo di carica rimanente)","item":"Elemento","entity":"Entità","icon_label":"Icona","label":"Etichetta","unit":"Unità","default_autarky":"Autosufficienza","default_runtime":"Tempo rimanente","default_chargetime":"Tempo di carica rimanente","pv_system":"Impianto FV","pv_entity":"Entità FV","pv_entity_helper":"Entità per la potenza FV","enable_animation":"Abilita animazione","animation_style":"Stile animazione","animation_style_helper":"Scegli l’effetto di animazione","animation_rotating_dots":"Punti rotanti","animation_particle_field":"Campo di particelle","animation_electric_arc":"Archi elettrici","icon_rotation":"Rotazione icona","icon_rotation_helper":"L’icona ruota in base alla potenza","max_power":"Potenza massima (W)","max_power_helper":"Potenza FV massima per animazione e rotazione","battery":"Batteria","battery_entity":"Entità batteria","battery_entity_helper":"Entità per livello batteria (%)","charge_entity":"Entità carica","charge_entity_helper":"Entità per potenza di carica","discharge_entity":"Entità scarica","discharge_entity_helper":"Entità per potenza di scarica","battery_capacity":"Capacità batteria (Wh)","battery_capacity_helper":"Capacità batteria per animazione (es. 10000 per 10 kWh)","calculate_runtime":"Calcola durata carica/scarica","calculate_runtime_helper":"Calcolo automatico per elementi 2 e 3 nella barra informazioni","icon_auto_helper":"Lascia vuoto per icona automatica","house_consumption":"Consumo casa","house_entity":"Entità casa","house_entity_helper":"Entità per consumo casa","grid":"Rete","grid_entity":"Entità rete","grid_entity_helper":"Entità per importazione/esportazione rete","threshold":"Soglia (W)","threshold_helper":"Sotto questo valore viene mostrato \\"Neutro\\"","status_texts":"Testi di stato","text_feed_in":"Testo per immissione","text_feed_in_placeholder":"Immissione","text_neutral":"Testo per neutro","text_neutral_placeholder":"Neutro","text_consumption":"Testo per consumo","text_consumption_placeholder":"Prelievo da rete","additional_texts":"Testi aggiuntivi","secondary_entity":"Entità secondaria","secondary_entity_helper":"Opzionale: entità per la seconda riga","secondary_text":"Testo secondario","secondary_text_helper":"Opzionale: testo statico per la seconda riga","tertiary_entity":"Entità terziaria","tertiary_text":"Testo terziario","styling":"Stile","background_color":"Colore di sfondo","border_color":"Colore bordo","primary_color":"Colore principale","secondary_color":"Colore secondario","icon_color":"Colore icona","card_styling":"Stile scheda","header_background":"Sfondo intestazione","enable_header_background":"Abilita sfondo intestazione","enable_header_background_helper":"Abilita sfondo per l’area titolo/sottotitolo","header_background_color":"Colore sfondo intestazione","header_border_color":"Colore bordo intestazione","header_border_radius":"Raggio bordo intestazione","header_padding":"Spaziatura intestazione","header_width":"Larghezza intestazione","header_width_helper":"Auto = centrato al contenuto, Full = larghezza completa","header_width_auto":"Auto (dimensione contenuto)","header_width_full":"Completa (100% larghezza)","header_box_shadow":"Ombra intestazione","border_radius":"Raggio bordo","text_color":"Colore testo","padding":"Spaziatura interna","cursor":"Cursore","title_subtitle":"Titolo e sottotitolo","title_size":"Dimensione titolo","title_color":"Colore titolo","title_alignment":"Allineamento titolo","title_alignment_helper":"sinistra, centro, destra","title_font_weight":"Spessore titolo","subtitle_size":"Dimensione sottotitolo","subtitle_color":"Colore sottotitolo","subtitle_alignment":"Allineamento sottotitolo","subtitle_font_weight":"Spessore sottotitolo","icons":"Icone","icon_size":"Dimensione icona","icon_opacity":"Opacità icona","icon_margin":"Margine icona","primary_text_styling":"Testo principale (valore)","primary_size":"Dimensione principale","primary_color_label":"Colore principale","primary_opacity":"Opacità principale","primary_font_weight":"Spessore principale","secondary_text_styling":"Testo secondario (seconda riga)","secondary_size":"Dimensione secondaria","secondary_color_label":"Colore secondario","secondary_opacity":"Opacità secondaria","secondary_font_weight":"Spessore secondario","tertiary_text_styling":"Testo terziario (terza riga)","tertiary_size":"Dimensione terziaria","tertiary_color_label":"Colore terziario","tertiary_opacity":"Opacità terziaria","tertiary_font_weight":"Spessore terziario","select_entity":"Seleziona entità","select_icon":"Seleziona icona","action_none":"Nessuna","action_more_info":"Altre informazioni","action_navigate":"Naviga","action_url":"URL","action_call_service":"Chiama servizio","theme":"Tema","theme_helper":"Seleziona un tema colore predefinito","select_theme":"Seleziona tema","consumers_settings":"Impostazioni consumatori","enable_consumers":"Abilita barra consumatori","consumers_position":"Posizione","consumers_sort_mode":"Ordinamento","sort_highest_first":"Più alto per primo","sort_lowest_first":"Più basso per primo","sort_none":"Nessun ordinamento (ordine di inserimento)","sort_alpha_asc":"Alfabetico crescente","sort_alpha_desc":"Alfabetico decrescente","consumers_threshold":"Soglia globale (W)","consumers_threshold_helper":"I consumatori sotto questo valore non vengono mostrati","add_consumer":"Aggiungi consumatore","remove_consumer":"Rimuovi consumatore","consumer_entity":"N°","consumer_icon":"Icona","consumer_label":"Etichetta","consumer_threshold":"Soglia individuale (W)","consumer_auto_color":"Colore automatico","consumer_auto_color_helper":"Colore basato sul consumo (verde → viola)","consumer_item_styling":"Stile consumatore","consumer_primary_entity":"Entità principale (valore)","consumer_primary_text":"Testo principale (sovrascrive valore)","consumer_show_primary":"Mostra riga principale","consumer_secondary_entity":"Entità secondaria (etichetta)","consumer_secondary_text":"Testo secondario (sovrascrive etichetta)","consumer_show_secondary":"Mostra riga secondaria","consumer_switch_entity":"Entità interruttore (per alternare)","consumer_switch_entity_helper":"Opzionale: interruttore per accensione/spegnimento","consumer_tap_actions":"Azioni tocco","tap_action_target":"Destinazione tocco","double_tap_action_target":"Destinazione doppio tocco","hold_action_target":"Destinazione pressione prolungata","action_target_none":"Nessuna azione","action_target_entity":"Alterna entità","action_target_custom_entity":"Alterna entità personalizzata","action_target_custom_action":"Azione personalizzata","custom_entity_toggle":"Entità personalizzata (alternanza)","custom_entity_toggle_helper":"Entità da alternare","show_consumer_total_in_house":"Mostra consumo totale come testo secondario","show_consumer_total_helper":"Mostra la somma di tutti i consumatori sotto \\"Consumo casa\\"","show_title":"Mostra titolo","show_subtitle":"Mostra sottotitolo","show_icon":"Mostra icona","title_line_height":"Altezza riga titolo","subtitle_line_height":"Altezza riga sottotitolo","primary_line_height":"Altezza riga principale","secondary_line_height":"Altezza riga secondaria","tertiary_line_height":"Altezza riga terziaria","label_line_height":"Altezza riga etichetta","value_line_height":"Altezza riga valore","item_calc_type":"Tipo di calcolo","calc_type_entity":"Entità manuale","calc_type_autarky":"Autosufficienza","calc_type_self_consumption":"Autoconsumo","calc_type_runtime":"Tempo rimanente","calc_type_chargetime":"Tempo di carica rimanente","header_section":"Intestazione","header_visibility":"Visibilità","header_content":"Contenuto","header_title_styling":"Stile titolo","header_subtitle_styling":"Stile sottotitolo","header_icon_styling":"Stile icona","infobar_styling":"Stile barra informazioni","card_styling_section":"Stile schede","theme_editor_cards":"Editor tema (schede)","theme_editor_cards_note":"Modifica solo i colori delle schede, non l’intestazione.","header_background_subsection":"Sfondo intestazione","icon_subsection":"Icona","primary_text_subsection":"Testo principale (valore)","secondary_text_subsection":"Testo secondario (seconda riga)","tertiary_text_subsection":"Testo terziario (terza riga)","action_navigation_path":"Percorso navigazione","action_url_label":"URL","action_service":"Servizio","layout_order":"Ordine layout","layout_order_helper":"Definisci l’ordine degli elementi","pv_bar_settings":"Impostazioni barra FV","battery_bar_settings":"Impostazioni barra batteria","enable_pv_bar":"Abilita barra FV","enable_battery_bar":"Abilita barra batteria","bar_position":"Posizione","bar_align":"Allineamento","align_left":"Sinistra","align_center":"Centro","align_right":"Destra","bar_entities":"Impianti/Batterie","add_pv_entity":"Aggiungi impianto FV","add_battery_entity":"Aggiungi batteria","remove_entity":"Rimuovi","entity_name":"Nome","entity_name_helper":"Nome visualizzato nella barra","pv_max_5":"Max. 5 impianti FV","battery_max_5":"Max. 5 batterie","bar_styling":"Stile barra","bar_separator":"Separatore","bar_separator_helper":"Carattere tra elementi (es. | o •)","bar_item_gap":"Spazio tra elementi","bar_item_gap_helper":"Distanza tra elementi","position_above_cards":"Sopra le schede","position_below_cards":"Sotto le schede","position_above_consumers":"Sopra i consumatori","position_below_consumers":"Sotto i consumatori","position_bottom":"In basso","pv_bar_gap":"Spazio barra FV","pv_bar_gap_helper":"Spazio tra la barra FV e altri elementi","battery_bar_gap":"Spazio barra batteria","battery_bar_gap_helper":"Spazio tra la barra batteria e altri elementi","move_up":"Sposta su","move_down":"Sposta giù","duplicate":"Duplica","delete":"Elimina","tap_action":"Azione tocco","double_tap":"Doppio tocco","hold_action":"Pressione prolungata"}');
const status$6 = { "feed_in": "Immissione", "neutral": "Neutro", "grid_consumption": "Prelievo da rete", "inactive": "Inattivo" };
const it = {
  general: general$6,
  editor: editor$7,
  status: status$6
};
const it$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: it,
  editor: editor$7,
  general: general$6,
  status: status$6
}, Symbol.toStringTag, { value: "Module" }));
const general$5 = { "missing_entity": "ontbreekt", "inactive": "Inactief" };
const editor$6 = /* @__PURE__ */ JSON.parse('{"tab_general":"Algemeen","tab_elements":"Elementen","tab_cards":"Kaarten","tab_layout":"Layout","tab_language":"Taal","tab_header":"Header","tab_theme":"Thema","tab_infobar":"Infobalk","tab_pv":"Zonne-energiesysteem","tab_battery":"Batterij","tab_house":"Huis","tab_grid":"Net","tab_consumers":"Verbruikers","tab_pv_bar":"PV-balk","tab_battery_bar":"Batterijbalk","card_header":"Kaartkop","title":"Titel","title_placeholder":"Zonne-energiemonitor","title_helper":"Laat leeg om te verbergen.","subtitle":"Subtitel","subtitle_placeholder":"Energieoverzicht","subtitle_helper":"Laat leeg om te verbergen.","title_subtitle_gap":"Afstand tussen titel en subtitel","title_subtitle_gap_helper":"Ruimte tussen titel en subtitel","header_icon_size":"Pictogramgrootte kop","header_icon_size_helper":"Grootte van het pictogram naast de titel","header_icon_color":"Pictogramkleur kop","header_icon_margin":"Marge pictogram kop","icon":"Pictogram","icon_helper":"Wordt alleen weergegeven als er een titel is. Laat leeg om te verbergen.","layout":"Indeling","grid_gap":"Rasterafstand","grid_gap_placeholder":"6px","grid_gap_helper":"Afstand tussen kaarten.","header_margin_bottom":"Afstand kop tot kaarten/infobalk","header_margin_bottom_helper":"Ruimte tussen titel/subtitel en infobalk/kaarten","infobar_gap":"Afstand infobalk–kaarten","infobar_gap_helper":"Afstand tussen infobalk en de vier kaarten","language":"Taal","language_helper":"Kies de weergavetaal","central_entities":"Centrale entiteiten","central_entities_helper":"Definieer de hoofdentiteiten voor berekeningen","entity_pv_production":"PV-productie-entiteit","entity_pv_production_helper":"Entiteit voor zonne-energieproductie (gebruikt in berekeningen)","entity_battery_soc":"Batterij SoC-entiteit","entity_battery_soc_helper":"Entiteit voor batterijlading in % (voor berekeningen)","entity_battery_charge":"Batterijlaad-entiteit","entity_battery_charge_helper":"Entiteit voor laadvermogen (voor berekeningen)","entity_battery_discharge":"Batterijontlaad-entiteit","entity_battery_discharge_helper":"Entiteit voor ontlaadvermogen (voor berekeningen)","entity_house_consumption":"Huishoudverbruik-entiteit","entity_house_consumption_helper":"Entiteit voor huishoudverbruik (voor berekening van zelfvoorziening, optioneel)","entity_grid_power":"Net-entiteit","entity_grid_power_helper":"Entiteit voor netimport/-export (voor berekeningen)","central_config":"Centrale configuratie","central_config_helper":"Deze waarden gelden voor alle kaarten","pv_max_power_label":"Max. PV-vermogen (W)","pv_max_power_helper":"Maximaal PV-vermogen voor animaties","battery_capacity_label":"Batterijcapaciteit (Wh)","battery_capacity_label_helper":"Capaciteit van de batterij (bijv. 10000 voor 10 kWh)","grid_threshold_label":"Netdrempel (W)","grid_threshold_helper":"Onder deze waarde wordt ‘Neutraal’ weergegeven","card_visibility":"Kaartzichtbaarheid","cards_order":"Kaartvolgorde","cards_order_helper":"Wijzig de volgorde en zichtbaarheid van de vier kaarten","card_house":"Huis","card_grid":"Net","show_pv_card":"Toon zonnekaart","show_battery_card":"Toon batterijkaart","show_house_card":"Toon huiskaart","show_grid_card":"Toon netkaart","infobar_settings":"Instellingen infobalk","enable_infobar":"Infobalk inschakelen","infobar_position":"Positie infobalk","position_top":"Boven (boven de kaarten)","calculation_mode":"Berekening voor item 1","calculation_mode_helper":"Kies: Zelfvoorziening of Eigen verbruik","mode_autarky":"Zelfvoorziening","mode_self_consumption":"Eigen verbruik","calculate_battery_times":"Batterijtijden berekenen","calculate_battery_times_helper":"Automatische berekening voor item 2 (resterende looptijd) en 3 (resterende laadtijd)","item":"Item","entity":"Entiteit","icon_label":"Pictogram","label":"Label","unit":"Eenheid","default_autarky":"Zelfvoorziening","default_runtime":"Resterende looptijd","default_chargetime":"Resterende laadtijd","pv_system":"Zonne-energiesysteem","pv_entity":"PV-entiteit","pv_entity_helper":"Entiteit voor zonne-energievermogen","enable_animation":"Animatie inschakelen","animation_style":"Animatiestijl","animation_style_helper":"Kies het animatie-effect","animation_rotating_dots":"Draaiende punten","animation_particle_field":"Deeltjesveld","animation_electric_arc":"Elektrische bogen","icon_rotation":"Pictogramrotatie","icon_rotation_helper":"Het pictogram draait afhankelijk van het vermogen","max_power":"Max. vermogen (W)","max_power_helper":"Maximaal PV-vermogen voor animatie en rotatie","battery":"Batterij","battery_entity":"Batterij-entiteit","battery_entity_helper":"Entiteit voor batterijniveau (%)","charge_entity":"Laad-entiteit","charge_entity_helper":"Entiteit voor laadvermogen","discharge_entity":"Ontlaad-entiteit","discharge_entity_helper":"Entiteit voor ontlaadvermogen","battery_capacity":"Batterijcapaciteit (Wh)","battery_capacity_helper":"Batterijcapaciteit voor animatie (bijv. 10000 voor 10 kWh)","calculate_runtime":"Looptijd/laadtijd berekenen","calculate_runtime_helper":"Automatische berekening voor infobalk item 2 en 3","icon_auto_helper":"Laat leeg voor automatisch pictogram","house_consumption":"Huishoudverbruik","house_entity":"Huis-entiteit","house_entity_helper":"Entiteit voor huishoudverbruik","grid":"Net","grid_entity":"Net-entiteit","grid_entity_helper":"Entiteit voor netimport/-export","threshold":"Drempel (W)","threshold_helper":"Onder deze waarde wordt ‘Neutraal’ weergegeven","status_texts":"Statusteksten","text_feed_in":"Tekst voor teruglevering","text_feed_in_placeholder":"Teruglevering","text_neutral":"Tekst voor neutraal","text_neutral_placeholder":"Neutraal","text_consumption":"Tekst voor verbruik","text_consumption_placeholder":"Netverbruik","additional_texts":"Aanvullende teksten","secondary_entity":"Secundaire entiteit","secondary_entity_helper":"Optioneel: entiteit voor tweede regel","secondary_text":"Secundaire tekst","secondary_text_helper":"Optioneel: vaste tekst voor tweede regel","tertiary_entity":"Tertiaire entiteit","tertiary_text":"Tertiaire tekst","styling":"Stijl","background_color":"Achtergrondkleur","border_color":"Randkleur","primary_color":"Primaire kleur","secondary_color":"Secundaire kleur","icon_color":"Pictogramkleur","card_styling":"Kaartstijl","header_background":"Kopachtergrond","enable_header_background":"Kopachtergrond inschakelen","enable_header_background_helper":"Schakel achtergrond in voor titel/subtitelgebied","header_background_color":"Achtergrondkleur kop","header_border_color":"Randkleur kop","header_border_radius":"Randradius kop","header_padding":"Opvulling kop","header_width":"Breedte kop","header_width_helper":"Auto = gecentreerd, Volledig = volle breedte","header_width_auto":"Auto (inhoudsbreedte)","header_width_full":"Volledig (100% breedte)","header_box_shadow":"Schaduw kop","border_radius":"Randradius","text_color":"Tekstkleur","padding":"Opvulling","cursor":"Cursor","title_subtitle":"Titel & subtitel","title_size":"Titelgrootte","title_color":"Titelkleur","title_alignment":"Titeluitlijning","title_alignment_helper":"links, midden, rechts","title_font_weight":"Letterdikte titel","subtitle_size":"Subtitelgrootte","subtitle_color":"Subtitelkleur","subtitle_alignment":"Subtiteluitlijning","subtitle_font_weight":"Letterdikte subtitel","icons":"Pictogrammen","icon_size":"Pictogramgrootte","icon_opacity":"Pictogramdoorzichtigheid","icon_margin":"Pictogrammarge","primary_text_styling":"Primaire tekst (hoofdwaarde)","primary_size":"Primaire grootte","primary_color_label":"Primaire kleur","primary_opacity":"Primaire doorzichtigheid","primary_font_weight":"Primaire letterdikte","secondary_text_styling":"Secundaire tekst (2e regel)","secondary_size":"Secundaire grootte","secondary_color_label":"Secundaire kleur","secondary_opacity":"Secundaire doorzichtigheid","secondary_font_weight":"Secundaire letterdikte","tertiary_text_styling":"Tertiaire tekst (3e regel)","tertiary_size":"Tertiaire grootte","tertiary_color_label":"Tertiaire kleur","tertiary_opacity":"Tertiaire doorzichtigheid","tertiary_font_weight":"Tertiaire letterdikte","select_entity":"Selecteer entiteit","select_icon":"Selecteer pictogram","action_none":"Geen","action_more_info":"Meer info","action_navigate":"Navigeren","action_url":"URL","action_call_service":"Service aanroepen","theme":"Thema","theme_helper":"Kies een vooraf ingesteld kleurthema","select_theme":"Selecteer thema","consumers_settings":"Instellingen verbruikers","enable_consumers":"Verbruikersbalk inschakelen","consumers_position":"Positie","consumers_sort_mode":"Sortering","sort_highest_first":"Hoogste eerst","sort_lowest_first":"Laagste eerst","sort_none":"Geen sortering (invoer volgorde)","sort_alpha_asc":"Alfabetisch (A–Z)","sort_alpha_desc":"Alfabetisch (Z–A)","consumers_threshold":"Globale drempel (W)","consumers_threshold_helper":"Verbruikers onder deze waarde worden niet weergegeven","add_consumer":"Verbruiker toevoegen","remove_consumer":"Verbruiker verwijderen","consumer_entity":"Nr.","consumer_icon":"Pictogram","consumer_label":"Label","consumer_threshold":"Individuele drempel (W)","consumer_auto_color":"Automatische kleur","consumer_auto_color_helper":"Kleur gebaseerd op verbruik (groen tot paars)","consumer_item_styling":"Verbruikerstijl","consumer_primary_entity":"Primaire entiteit (waarde)","consumer_primary_text":"Primaire tekst (overschrijft waarde)","consumer_show_primary":"Primaire regel tonen","consumer_secondary_entity":"Secundaire entiteit (label)","consumer_secondary_text":"Secundaire tekst (overschrijft label)","consumer_show_secondary":"Secundaire regel tonen","consumer_switch_entity":"Schakel-entiteit (voor togglen)","consumer_switch_entity_helper":"Optioneel: schakelaar om aan/uit te zetten","consumer_tap_actions":"Tik-acties","tap_action_target":"Tik-actie doel","double_tap_action_target":"Dubbel tik-actie doel","hold_action_target":"Ingedrukt houden actie","action_target_none":"Geen actie","action_target_entity":"Entiteit togglen","action_target_custom_entity":"Aangepaste entiteit togglen","action_target_custom_action":"Aangepaste actie","custom_entity_toggle":"Aangepaste entiteit (togglen)","custom_entity_toggle_helper":"Entiteit die moet worden getoggeld","show_consumer_total_in_house":"Toon totaalverbruik als secundaire tekst","show_consumer_total_helper":"Toont de som van alle verbruikers onder Huishoudverbruik","show_title":"Titel tonen","show_subtitle":"Subtitel tonen","show_icon":"Pictogram tonen","title_line_height":"Regelhoogte titel","subtitle_line_height":"Regelhoogte subtitel","primary_line_height":"Regelhoogte primair","secondary_line_height":"Regelhoogte secundair","tertiary_line_height":"Regelhoogte tertiair","label_line_height":"Regelhoogte label","value_line_height":"Regelhoogte waarde","item_calc_type":"Berekeningstype","calc_type_entity":"Handmatige entiteit","calc_type_autarky":"Zelfvoorziening","calc_type_self_consumption":"Eigen verbruik","calc_type_runtime":"Resterende looptijd","calc_type_chargetime":"Resterende laadtijd","header_section":"Kopgedeelte","header_visibility":"Zichtbaarheid","header_content":"Inhoud","header_title_styling":"Titelstijl","header_subtitle_styling":"Ondertitelstijl","header_icon_styling":"Pictogramstijl","infobar_styling":"Stijl infobalk","card_styling_section":"Kaartstijl","theme_editor_cards":"Thema-editor (kaarten)","theme_editor_cards_note":"Wijzigt alleen kaartkleuren, niet de kop.","header_background_subsection":"Kopachtergrond","icon_subsection":"Pictogram","primary_text_subsection":"Primaire tekst (hoofdwaarde)","secondary_text_subsection":"Secundaire tekst (2e regel)","tertiary_text_subsection":"Tertiaire tekst (3e regel)","action_navigation_path":"Navigatiepad","action_url_label":"URL","action_service":"Service","layout_order":"Indelingsvolgorde","layout_order_helper":"Bepaal de volgorde van elementen","pv_bar_settings":"Instellingen PV-balk","battery_bar_settings":"Instellingen batterijbalk","enable_pv_bar":"PV-balk inschakelen","enable_battery_bar":"Batterijbalk inschakelen","bar_position":"Positie","bar_align":"Uitlijning","align_left":"Links","align_center":"Midden","align_right":"Rechts","bar_entities":"Systemen/Batterijen","add_pv_entity":"PV-systeem toevoegen","add_battery_entity":"Batterij toevoegen","remove_entity":"Verwijderen","entity_name":"Naam","entity_name_helper":"Weergavenaam in de balk","pv_max_5":"Max. 5 PV-systemen","battery_max_5":"Max. 5 batterijen","bar_styling":"Balkstijl","bar_separator":"Scheidingsteken","bar_separator_helper":"Teken tussen items (bijv. | of •)","bar_item_gap":"Afstand tussen items","bar_item_gap_helper":"Afstand tussen items","position_above_cards":"Boven de kaarten","position_below_cards":"Onder de kaarten","position_above_consumers":"Boven de verbruikers","position_below_consumers":"Onder de verbruikers","position_bottom":"Onderaan","pv_bar_gap":"Afstand PV-balk","pv_bar_gap_helper":"Afstand tussen PV-balk en andere elementen","battery_bar_gap":"Afstand batterijbalk","battery_bar_gap_helper":"Afstand tussen batterijbalk en andere elementen","move_up":"Omhoog","move_down":"Omlaag","duplicate":"Dupliceren","delete":"Verwijderen","tap_action":"Tik-actie","double_tap":"Dubbel tikken","hold_action":"Ingedrukt houden"}');
const status$5 = { "feed_in": "Teruglevering", "neutral": "Neutraal", "grid_consumption": "Netverbruik", "inactive": "Inactief" };
const nl = {
  general: general$5,
  editor: editor$6,
  status: status$5
};
const nl$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: nl,
  editor: editor$6,
  general: general$5,
  status: status$5
}, Symbol.toStringTag, { value: "Module" }));
const general$4 = { "missing_entity": "faltando", "inactive": "Inativo" };
const editor$5 = /* @__PURE__ */ JSON.parse('{"tab_general":"Geral","tab_elements":"Elementos","tab_cards":"Cartões","tab_layout":"Layout","tab_language":"Idioma","tab_header":"Header","tab_theme":"Tema","tab_infobar":"Barra de informações","tab_pv":"Sistema solar","tab_battery":"Bateria","tab_house":"Casa","tab_grid":"Rede elétrica","tab_consumers":"Consumidores","tab_pv_bar":"Barra solar","tab_battery_bar":"Barra da bateria","card_header":"Cabeçalho do cartão","title":"Título","title_placeholder":"Monitor Solar","title_helper":"Deixe em branco para ocultar.","subtitle":"Subtítulo","subtitle_placeholder":"Resumo de energia","subtitle_helper":"Deixe em branco para ocultar.","title_subtitle_gap":"Espaço entre título e subtítulo","title_subtitle_gap_helper":"Distância entre o título e o subtítulo","header_icon_size":"Tamanho do ícone do cabeçalho","header_icon_size_helper":"Tamanho do ícone ao lado do título","header_icon_color":"Cor do ícone do cabeçalho","header_icon_margin":"Margem do ícone do cabeçalho","icon":"Ícone","icon_helper":"Exibido apenas se houver um título. Deixe em branco para ocultar.","layout":"Layout","grid_gap":"Espaçamento da grade","grid_gap_placeholder":"6px","grid_gap_helper":"Espaço entre os cartões.","header_margin_bottom":"Espaço entre cabeçalho e cartões/barra de informações","header_margin_bottom_helper":"Espaço entre o título/subtítulo e a barra de informações/cartões","infobar_gap":"Espaço entre barra de informações e cartões","infobar_gap_helper":"Espaço entre a barra de informações e os quatro cartões","language":"Idioma","language_helper":"Selecione o idioma de exibição","central_entities":"Entidades centrais","central_entities_helper":"Defina as entidades principais usadas para cálculos","entity_pv_production":"Entidade de produção solar","entity_pv_production_helper":"Entidade para potência solar (usada em cálculos)","entity_battery_soc":"Entidade de carga da bateria","entity_battery_soc_helper":"Entidade para nível de carga da bateria em % (para cálculos)","entity_battery_charge":"Entidade de carregamento da bateria","entity_battery_charge_helper":"Entidade para potência de carregamento (para cálculos)","entity_battery_discharge":"Entidade de descarga da bateria","entity_battery_discharge_helper":"Entidade para potência de descarga (para cálculos)","entity_house_consumption":"Entidade de consumo doméstico","entity_house_consumption_helper":"Entidade para consumo da casa (para cálculo de autossuficiência, opcional)","entity_grid_power":"Entidade da rede","entity_grid_power_helper":"Entidade para importação/exportação da rede (para cálculos)","central_config":"Configuração central","central_config_helper":"Esses valores se aplicam a todos os cartões","pv_max_power_label":"Potência máxima solar (W)","pv_max_power_helper":"Potência máxima usada em animações","battery_capacity_label":"Capacidade da bateria (Wh)","battery_capacity_label_helper":"Capacidade da bateria (ex: 10000 para 10 kWh)","grid_threshold_label":"Limite da rede (W)","grid_threshold_helper":"Abaixo desse valor, é exibido \\"Neutro\\"","card_visibility":"Visibilidade dos cartões","cards_order":"Ordem dos cartões","cards_order_helper":"Altere a ordem e a visibilidade dos quatro cartões","card_house":"Casa","card_grid":"Rede","show_pv_card":"Mostrar cartão solar","show_battery_card":"Mostrar cartão da bateria","show_house_card":"Mostrar cartão da casa","show_grid_card":"Mostrar cartão da rede","infobar_settings":"Configurações da barra de informações","enable_infobar":"Ativar barra de informações","infobar_position":"Posição da barra de informações","position_top":"Topo (acima dos cartões)","calculation_mode":"Modo de cálculo para o item 1","calculation_mode_helper":"Escolha: Autossuficiência ou Autoconsumo","mode_autarky":"Autossuficiência","mode_self_consumption":"Autoconsumo","calculate_battery_times":"Calcular tempos da bateria","calculate_battery_times_helper":"Cálculo automático para item 2 (tempo restante) e 3 (tempo de carga restante)","item":"Item","entity":"Entidade","icon_label":"Ícone","label":"Rótulo","unit":"Unidade","default_autarky":"Autossuficiência","default_runtime":"Tempo restante","default_chargetime":"Tempo de carga restante","pv_system":"Sistema solar","pv_entity":"Entidade solar","pv_entity_helper":"Entidade para potência solar","enable_animation":"Ativar animação","animation_style":"Estilo de animação","animation_style_helper":"Selecione o tipo de animação","animation_rotating_dots":"Pontos giratórios","animation_particle_field":"Campo de partículas","animation_electric_arc":"Arcos elétricos","icon_rotation":"Rotação do ícone","icon_rotation_helper":"O ícone gira conforme a potência","max_power":"Potência máxima (W)","max_power_helper":"Potência máxima solar para animação e rotação","battery":"Bateria","battery_entity":"Entidade da bateria","battery_entity_helper":"Entidade do nível da bateria (%)","charge_entity":"Entidade de carga","charge_entity_helper":"Entidade para potência de carga","discharge_entity":"Entidade de descarga","discharge_entity_helper":"Entidade para potência de descarga","battery_capacity":"Capacidade da bateria (Wh)","battery_capacity_helper":"Capacidade usada em animações (ex: 10000 para 10 kWh)","calculate_runtime":"Calcular tempo de carga/descarga","calculate_runtime_helper":"Cálculo automático para os itens 2 e 3 da barra de informações","icon_auto_helper":"Deixe em branco para ícone automático","house_consumption":"Consumo da casa","house_entity":"Entidade da casa","house_entity_helper":"Entidade para consumo da casa","grid":"Rede elétrica","grid_entity":"Entidade da rede","grid_entity_helper":"Entidade para importação/exportação da rede","threshold":"Limite (W)","threshold_helper":"Abaixo desse valor, é exibido \\"Neutro\\"","status_texts":"Textos de status","text_feed_in":"Texto para injeção","text_feed_in_placeholder":"Injeção","text_neutral":"Texto neutro","text_neutral_placeholder":"Neutro","text_consumption":"Texto para consumo","text_consumption_placeholder":"Consumo da rede","additional_texts":"Textos adicionais","secondary_entity":"Entidade secundária","secondary_entity_helper":"Opcional: entidade para a segunda linha","secondary_text":"Texto secundário","secondary_text_helper":"Opcional: texto fixo para a segunda linha","tertiary_entity":"Entidade terciária","tertiary_text":"Texto terciário","styling":"Estilo","background_color":"Cor de fundo","border_color":"Cor da borda","primary_color":"Cor primária","secondary_color":"Cor secundária","icon_color":"Cor do ícone","card_styling":"Estilo do cartão","header_background":"Fundo do cabeçalho","enable_header_background":"Ativar fundo do cabeçalho","enable_header_background_helper":"Ativa o fundo para a área de título/subtítulo","header_background_color":"Cor do fundo do cabeçalho","header_border_color":"Cor da borda do cabeçalho","header_border_radius":"Raio da borda do cabeçalho","header_padding":"Preenchimento do cabeçalho","header_width":"Largura do cabeçalho","header_width_helper":"Auto = centralizado, Completo = largura total","header_width_auto":"Automático (tamanho do conteúdo)","header_width_full":"Completo (100% da largura)","header_box_shadow":"Sombra do cabeçalho","border_radius":"Raio da borda","text_color":"Cor do texto","padding":"Preenchimento","cursor":"Cursor","title_subtitle":"Título e subtítulo","title_size":"Tamanho do título","title_color":"Cor do título","title_alignment":"Alinhamento do título","title_alignment_helper":"esquerda, centro, direita","title_font_weight":"Peso da fonte do título","subtitle_size":"Tamanho do subtítulo","subtitle_color":"Cor do subtítulo","subtitle_alignment":"Alinhamento do subtítulo","subtitle_font_weight":"Peso da fonte do subtítulo","icons":"Ícones","icon_size":"Tamanho do ícone","icon_opacity":"Opacidade do ícone","icon_margin":"Margem do ícone","primary_text_styling":"Texto principal (valor)","primary_size":"Tamanho principal","primary_color_label":"Cor principal","primary_opacity":"Opacidade principal","primary_font_weight":"Peso da fonte principal","secondary_text_styling":"Texto secundário (segunda linha)","secondary_size":"Tamanho secundário","secondary_color_label":"Cor secundária","secondary_opacity":"Opacidade secundária","secondary_font_weight":"Peso da fonte secundária","tertiary_text_styling":"Texto terciário (terceira linha)","tertiary_size":"Tamanho terciário","tertiary_color_label":"Cor terciária","tertiary_opacity":"Opacidade terciária","tertiary_font_weight":"Peso da fonte terciária","select_entity":"Selecionar entidade","select_icon":"Selecionar ícone","action_none":"Nenhuma","action_more_info":"Mais informações","action_navigate":"Navegar","action_url":"URL","action_call_service":"Chamar serviço","theme":"Tema","theme_helper":"Escolha um tema de cores predefinido","select_theme":"Selecionar tema","consumers_settings":"Configurações dos consumidores","enable_consumers":"Ativar barra de consumidores","consumers_position":"Posição","consumers_sort_mode":"Ordenação","sort_highest_first":"Maior primeiro","sort_lowest_first":"Menor primeiro","sort_none":"Sem ordenação (ordem de entrada)","sort_alpha_asc":"Alfabética (A–Z)","sort_alpha_desc":"Alfabética (Z–A)","consumers_threshold":"Limite global (W)","consumers_threshold_helper":"Consumidores abaixo deste valor não são exibidos","add_consumer":"Adicionar consumidor","remove_consumer":"Remover consumidor","consumer_entity":"Nº","consumer_icon":"Ícone","consumer_label":"Rótulo","consumer_threshold":"Limite individual (W)","consumer_auto_color":"Cor automática","consumer_auto_color_helper":"Cor baseada no consumo (verde a roxo)","consumer_item_styling":"Estilo do consumidor","consumer_primary_entity":"Entidade primária (para valor)","consumer_primary_text":"Texto primário (substitui valor)","consumer_show_primary":"Mostrar linha primária","consumer_secondary_entity":"Entidade secundária (para rótulo)","consumer_secondary_text":"Texto secundário (substitui rótulo)","consumer_show_secondary":"Mostrar linha secundária","consumer_switch_entity":"Entidade de interruptor (para alternar)","consumer_switch_entity_helper":"Opcional: interruptor para ligar/desligar","consumer_tap_actions":"Ações de toque","tap_action_target":"Ação de toque","double_tap_action_target":"Ação de toque duplo","hold_action_target":"Ação de pressionar e segurar","action_target_none":"Nenhuma ação","action_target_entity":"Alternar entidade","action_target_custom_entity":"Alternar entidade personalizada","action_target_custom_action":"Ação personalizada","custom_entity_toggle":"Entidade personalizada (alternar)","custom_entity_toggle_helper":"Entidade a ser alternada","show_consumer_total_in_house":"Mostrar consumo total como texto secundário","show_consumer_total_helper":"Mostra a soma de todos os consumidores sob Consumo da casa","show_title":"Mostrar título","show_subtitle":"Mostrar subtítulo","show_icon":"Mostrar ícone","title_line_height":"Altura da linha do título","subtitle_line_height":"Altura da linha do subtítulo","primary_line_height":"Altura da linha primária","secondary_line_height":"Altura da linha secundária","tertiary_line_height":"Altura da linha terciária","label_line_height":"Altura da linha do rótulo","value_line_height":"Altura da linha do valor","item_calc_type":"Tipo de cálculo","calc_type_entity":"Entidade manual","calc_type_autarky":"Autossuficiência","calc_type_self_consumption":"Autoconsumo","calc_type_runtime":"Tempo restante","calc_type_chargetime":"Tempo de carga restante","header_section":"Cabeçalho","header_visibility":"Visibilidade","header_content":"Conteúdo","header_title_styling":"Estilo do título","header_subtitle_styling":"Estilo do subtítulo","header_icon_styling":"Estilo do ícone","infobar_styling":"Estilo da barra de informações","card_styling_section":"Estilo dos cartões","theme_editor_cards":"Editor de tema (cartões)","theme_editor_cards_note":"Altera apenas as cores dos cartões, não o cabeçalho.","header_background_subsection":"Fundo do cabeçalho","icon_subsection":"Ícone","primary_text_subsection":"Texto principal (valor)","secondary_text_subsection":"Texto secundário (segunda linha)","tertiary_text_subsection":"Texto terciário (terceira linha)","action_navigation_path":"Caminho de navegação","action_url_label":"URL","action_service":"Serviço","layout_order":"Ordem de layout","layout_order_helper":"Defina a ordem dos elementos","pv_bar_settings":"Configurações da barra solar","battery_bar_settings":"Configurações da barra da bateria","enable_pv_bar":"Ativar barra solar","enable_battery_bar":"Ativar barra da bateria","bar_position":"Posição","bar_align":"Alinhamento","align_left":"Esquerda","align_center":"Centro","align_right":"Direita","bar_entities":"Sistemas/Baterias","add_pv_entity":"Adicionar sistema solar","add_battery_entity":"Adicionar bateria","remove_entity":"Remover","entity_name":"Nome","entity_name_helper":"Nome exibido na barra","pv_max_5":"Máx. 5 sistemas solares","battery_max_5":"Máx. 5 baterias","bar_styling":"Estilo da barra","bar_separator":"Separador","bar_separator_helper":"Caractere entre itens (ex: | ou •)","bar_item_gap":"Espaço entre itens","bar_item_gap_helper":"Espaço entre itens","position_above_cards":"Acima dos cartões","position_below_cards":"Abaixo dos cartões","position_above_consumers":"Acima dos consumidores","position_below_consumers":"Abaixo dos consumidores","position_bottom":"Inferior","pv_bar_gap":"Espaço da barra solar","pv_bar_gap_helper":"Espaço entre a barra solar e outros elementos","battery_bar_gap":"Espaço da barra da bateria","battery_bar_gap_helper":"Espaço entre a barra da bateria e outros elementos","move_up":"Mover para cima","move_down":"Mover para baixo","duplicate":"Duplicar","delete":"Excluir","tap_action":"Ação de toque","double_tap":"Toque duplo","hold_action":"Pressionar e segurar"}');
const status$4 = { "feed_in": "Injeção", "neutral": "Neutro", "grid_consumption": "Consumo da rede", "inactive": "Inativo" };
const pt = {
  general: general$4,
  editor: editor$5,
  status: status$4
};
const pt$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pt,
  editor: editor$5,
  general: general$4,
  status: status$4
}, Symbol.toStringTag, { value: "Module" }));
const general$3 = { "missing_entity": "chýba", "inactive": "Neaktívne" };
const editor$4 = /* @__PURE__ */ JSON.parse('{"tab_general":"Všeobecné","tab_elements":"Prvky","tab_cards":"Karty","tab_layout":"Rozloženie","tab_language":"Jazyk","tab_header":"Header","tab_theme":"Motív","tab_infobar":"Informačný panel","tab_pv":"Solárny systém","tab_battery":"Batéria","tab_house":"Dom","tab_grid":"Sieť","tab_consumers":"Spotrebiče","tab_pv_bar":"Solárny panel","tab_battery_bar":"Panel batérie","card_header":"Hlavička karty","title":"Názov","title_placeholder":"Solárny monitor","title_helper":"Ponechajte prázdne, ak chcete skryť.","subtitle":"Podnadpis","subtitle_placeholder":"Energetický prehľad","subtitle_helper":"Ponechajte prázdne, ak chcete skryť.","title_subtitle_gap":"Odstup medzi názvom a podnadpisom","title_subtitle_gap_helper":"Vzdialenosť medzi názvom a podnadpisom","header_icon_size":"Veľkosť ikony v hlavičke","header_icon_size_helper":"Veľkosť ikony vedľa názvu","header_icon_color":"Farba ikony v hlavičke","header_icon_margin":"Odsadenie ikony v hlavičke","icon":"Ikona","icon_helper":"Zobrazí sa iba ak je nastavený názov. Ponechajte prázdne pre skrytie.","layout":"Rozloženie","grid_gap":"Medzera mriežky","grid_gap_placeholder":"6px","grid_gap_helper":"Vzdialenosť medzi kartami.","header_margin_bottom":"Odstup medzi hlavičkou a kartami/informačnou lištou","header_margin_bottom_helper":"Vzdialenosť medzi názvom/podnadpisom a informačnou lištou/kartami","infobar_gap":"Medzera medzi informačnou lištou a kartami","infobar_gap_helper":"Vzdialenosť medzi informačnou lištou a štyrmi kartami","language":"Jazyk","language_helper":"Vyberte jazyk používateľského rozhrania","central_entities":"Centrálne entity","central_entities_helper":"Definujte hlavné entity používané pre výpočty","entity_pv_production":"Entita solárnej výroby","entity_pv_production_helper":"Entita pre výkon solárneho systému (pre výpočty)","entity_battery_soc":"Stav nabitia batérie (SoC)","entity_battery_soc_helper":"Entita pre stav nabitia batérie v % (pre výpočty)","entity_battery_charge":"Entita nabíjania batérie","entity_battery_charge_helper":"Entita pre výkon nabíjania (pre výpočty)","entity_battery_discharge":"Entita vybíjania batérie","entity_battery_discharge_helper":"Entita pre výkon vybíjania (pre výpočty)","entity_house_consumption":"Spotreba domu","entity_house_consumption_helper":"Entita pre spotrebu domácnosti (pre výpočet sebestačnosti, voliteľné)","entity_grid_power":"Sieťový výkon","entity_grid_power_helper":"Entita pre import/export do siete (pre výpočty)","central_config":"Centrálna konfigurácia","central_config_helper":"Tieto hodnoty sa uplatnia pre všetky karty","pv_max_power_label":"Maximálny solárny výkon (W)","pv_max_power_helper":"Maximálny solárny výkon pre animácie","battery_capacity_label":"Kapacita batérie (Wh)","battery_capacity_label_helper":"Kapacita batérie (napr. 10000 pre 10 kWh)","grid_threshold_label":"Prahová hodnota siete (W)","grid_threshold_helper":"Pod touto hodnotou sa zobrazí „Neutrálne“","card_visibility":"Viditeľnosť kariet","cards_order":"Poradie kariet","cards_order_helper":"Zmeňte poradie a viditeľnosť štyroch kariet","card_house":"Dom","card_grid":"Sieť","show_pv_card":"Zobraziť kartu solárneho systému","show_battery_card":"Zobraziť kartu batérie","show_house_card":"Zobraziť kartu domu","show_grid_card":"Zobraziť kartu siete","infobar_settings":"Nastavenia informačnej lišty","enable_infobar":"Povoliť informačnú lištu","infobar_position":"Pozícia informačnej lišty","position_top":"Hore (nad kartami)","calculation_mode":"Režim výpočtu pre položku 1","calculation_mode_helper":"Vyberte: Sebestačnosť alebo Vlastná spotreba","mode_autarky":"Sebestačnosť","mode_self_consumption":"Vlastná spotreba","calculate_battery_times":"Vypočítať časy batérie","calculate_battery_times_helper":"Automatický výpočet pre položky 2 (zostávajúci čas prevádzky) a 3 (zostávajúci čas nabíjania)","item":"Položka","entity":"Entita","icon_label":"Ikona","label":"Označenie","unit":"Jednotka","default_autarky":"Sebestačnosť","default_runtime":"Zostávajúci čas prevádzky","default_chargetime":"Zostávajúci čas nabíjania","pv_system":"Solárny systém","pv_entity":"Solárna entita","pv_entity_helper":"Entita pre výkon solárneho systému","enable_animation":"Povoliť animáciu","animation_style":"Štýl animácie","animation_style_helper":"Vyberte štýl animácie","animation_rotating_dots":"Otáčajúce sa body","animation_particle_field":"Pole častíc","animation_electric_arc":"Elektrické oblúky","icon_rotation":"Otočenie ikony","icon_rotation_helper":"Ikona sa otáča podľa výkonu","max_power":"Maximálny výkon (W)","max_power_helper":"Maximálny solárny výkon pre animácie a otáčanie","battery":"Batéria","battery_entity":"Entita batérie","battery_entity_helper":"Entita pre úroveň nabitia batérie (%)","charge_entity":"Entita nabíjania","charge_entity_helper":"Entita pre nabíjací výkon","discharge_entity":"Entita vybíjania","discharge_entity_helper":"Entita pre vybíjací výkon","battery_capacity":"Kapacita batérie (Wh)","battery_capacity_helper":"Kapacita pre animácie (napr. 10000 pre 10 kWh)","calculate_runtime":"Vypočítať časy nabíjania/vybíjania","calculate_runtime_helper":"Automatický výpočet pre položky 2 a 3 informačnej lišty","icon_auto_helper":"Ponechajte prázdne pre automatickú ikonu","house_consumption":"Spotreba domu","house_entity":"Entita domu","house_entity_helper":"Entita pre spotrebu domu","grid":"Sieť","grid_entity":"Sieťová entita","grid_entity_helper":"Entita pre import/export do siete","threshold":"Prahová hodnota (W)","threshold_helper":"Pod touto hodnotou sa zobrazí „Neutrálne“","status_texts":"Texty stavu","text_feed_in":"Text pre dodávku do siete","text_feed_in_placeholder":"Dodávka","text_neutral":"Text pre neutrálny stav","text_neutral_placeholder":"Neutrálne","text_consumption":"Text pre spotrebu","text_consumption_placeholder":"Spotreba zo siete","additional_texts":"Ďalšie texty","secondary_entity":"Sekundárna entita","secondary_entity_helper":"Voliteľné: entita pre druhý riadok","secondary_text":"Sekundárny text","secondary_text_helper":"Voliteľné: statický text pre druhý riadok","tertiary_entity":"Tretia entita","tertiary_text":"Tretí text","styling":"Štýl","background_color":"Farba pozadia","border_color":"Farba okraja","primary_color":"Primárna farba","secondary_color":"Sekundárna farba","icon_color":"Farba ikony","card_styling":"Štýl karty","header_background":"Pozadie hlavičky","enable_header_background":"Povoliť pozadie hlavičky","enable_header_background_helper":"Aktivuje pozadie pre oblasť názvu/podnadpisu","header_background_color":"Farba pozadia hlavičky","header_border_color":"Farba okraja hlavičky","header_border_radius":"Zaoblenie hlavičky","header_padding":"Vnútorné odsadenie hlavičky","header_width":"Šírka hlavičky","header_width_helper":"Automaticky = podľa obsahu, Plné = celá šírka","header_width_auto":"Automaticky (veľkosť obsahu)","header_width_full":"Plné (100 % šírka)","header_box_shadow":"Tieň hlavičky","border_radius":"Zaoblenie rohov","text_color":"Farba textu","padding":"Vnútorné odsadenie","cursor":"Kurzor","title_subtitle":"Názov a podnadpis","title_size":"Veľkosť názvu","title_color":"Farba názvu","title_alignment":"Zarovnanie názvu","title_alignment_helper":"vľavo, stred, vpravo","title_font_weight":"Hrúbka písma názvu","subtitle_size":"Veľkosť podnadpisu","subtitle_color":"Farba podnadpisu","subtitle_alignment":"Zarovnanie podnadpisu","subtitle_font_weight":"Hrúbka písma podnadpisu","icons":"Ikony","icon_size":"Veľkosť ikony","icon_opacity":"Priehľadnosť ikony","icon_margin":"Odsadenie ikony","primary_text_styling":"Primárny text (hodnota)","primary_size":"Veľkosť primárneho textu","primary_color_label":"Farba primárneho textu","primary_opacity":"Priehľadnosť primárneho textu","primary_font_weight":"Hrúbka písma primárneho textu","secondary_text_styling":"Sekundárny text (druhý riadok)","secondary_size":"Veľkosť sekundárneho textu","secondary_color_label":"Farba sekundárneho textu","secondary_opacity":"Priehľadnosť sekundárneho textu","secondary_font_weight":"Hrúbka písma sekundárneho textu","tertiary_text_styling":"Tretí text (tretí riadok)","tertiary_size":"Veľkosť tretieho textu","tertiary_color_label":"Farba tretieho textu","tertiary_opacity":"Priehľadnosť tretieho textu","tertiary_font_weight":"Hrúbka písma tretieho textu","select_entity":"Vyberte entitu","select_icon":"Vyberte ikonu","action_none":"Žiadne","action_more_info":"Viac informácií","action_navigate":"Navigácia","action_url":"URL","action_call_service":"Volanie služby","theme":"Téma","theme_helper":"Vyberte prednastavenú farebnú tému","select_theme":"Vyberte tému","consumers_settings":"Nastavenia spotrebičov","enable_consumers":"Povoliť lištu spotrebičov","consumers_position":"Pozícia","consumers_sort_mode":"Režim triedenia","sort_highest_first":"Najvyššie ako prvé","sort_lowest_first":"Najnižšie ako prvé","sort_none":"Bez triedenia","sort_alpha_asc":"Abecedne (A–Z)","sort_alpha_desc":"Abecedne (Z–A)","consumers_threshold":"Globálny prah (W)","consumers_threshold_helper":"Spotrebiče pod touto hodnotou sa nezobrazia","add_consumer":"Pridať spotrebič","remove_consumer":"Odstrániť spotrebič","consumer_entity":"Číslo","consumer_icon":"Ikona","consumer_label":"Označenie","consumer_threshold":"Individuálny prah (W)","consumer_auto_color":"Automatická farba","consumer_auto_color_helper":"Farba podľa spotreby (zelená až fialová)","consumer_item_styling":"Štýl spotrebiča","consumer_primary_entity":"Primárna entita (hodnota)","consumer_primary_text":"Primárny text (nahrádza hodnotu)","consumer_show_primary":"Zobraziť primárny riadok","consumer_secondary_entity":"Sekundárna entita (označenie)","consumer_secondary_text":"Sekundárny text (nahrádza označenie)","consumer_show_secondary":"Zobraziť sekundárny riadok","consumer_switch_entity":"Prepínač (zap./vyp.)","consumer_switch_entity_helper":"Voliteľné: prepínač pre zapnutie/vypnutie","consumer_tap_actions":"Akcie dotyku","tap_action_target":"Cieľ akcie pri dotyku","double_tap_action_target":"Cieľ akcie pri dvojitom dotyku","hold_action_target":"Cieľ akcie pri podržaní","action_target_none":"Žiadna akcia","action_target_entity":"Prepínať entitu","action_target_custom_entity":"Prepínať vlastnú entitu","action_target_custom_action":"Vlastná akcia","custom_entity_toggle":"Vlastná entita (prepínanie)","custom_entity_toggle_helper":"Entita, ktorú chcete prepínať","show_consumer_total_in_house":"Zobraziť celkovú spotrebu ako sekundárny text","show_consumer_total_helper":"Zobrazí súčet všetkých spotrebičov pod spotrebou domu","show_title":"Zobraziť názov","show_subtitle":"Zobraziť podnadpis","show_icon":"Zobraziť ikonu","title_line_height":"Výška riadku názvu","subtitle_line_height":"Výška riadku podnadpisu","primary_line_height":"Výška riadku primárneho textu","secondary_line_height":"Výška riadku sekundárneho textu","tertiary_line_height":"Výška riadku tretieho textu","label_line_height":"Výška riadku označenia","value_line_height":"Výška riadku hodnoty","item_calc_type":"Typ výpočtu","calc_type_entity":"Manuálna entita","calc_type_autarky":"Sebestačnosť","calc_type_self_consumption":"Vlastná spotreba","calc_type_runtime":"Zostávajúci čas prevádzky","calc_type_chargetime":"Zostávajúci čas nabíjania","header_section":"Hlavička","header_visibility":"Viditeľnosť","header_content":"Obsah","header_title_styling":"Štýl nadpisu","header_subtitle_styling":"Štýl podnadpisu","header_icon_styling":"Štýl ikony","infobar_styling":"Štýl informačnej lišty","card_styling_section":"Štýl kariet","theme_editor_cards":"Editor témy (karty)","theme_editor_cards_note":"Mení iba farby kariet, nie hlavičky.","header_background_subsection":"Pozadie hlavičky","icon_subsection":"Ikona","primary_text_subsection":"Primárny text (hodnota)","secondary_text_subsection":"Sekundárny text (druhý riadok)","tertiary_text_subsection":"Tretí text (tretí riadok)","action_navigation_path":"Navigačná cesta","action_url_label":"URL","action_service":"Služba","layout_order":"Poradie rozloženia","layout_order_helper":"Určte poradie prvkov","pv_bar_settings":"Nastavenia solárneho panela","battery_bar_settings":"Nastavenia panela batérie","enable_pv_bar":"Povoliť solárny panel","enable_battery_bar":"Povoliť panel batérie","bar_position":"Pozícia","bar_align":"Zarovnanie","align_left":"Vľavo","align_center":"V strede","align_right":"Vpravo","bar_entities":"Systémy/Batérie","add_pv_entity":"Pridať solárny systém","add_battery_entity":"Pridať batériu","remove_entity":"Odstrániť","entity_name":"Názov","entity_name_helper":"Názov zobrazený na paneli","pv_max_5":"Max. 5 solárnych systémov","battery_max_5":"Max. 5 batérií","bar_styling":"Štýl panela","bar_separator":"Oddeľovač","bar_separator_helper":"Znak medzi položkami (napr. | alebo •)","bar_item_gap":"Medzera medzi položkami","bar_item_gap_helper":"Vzdialenosť medzi položkami","position_above_cards":"Nad kartami","position_below_cards":"Pod kartami","position_above_consumers":"Nad spotrebičmi","position_below_consumers":"Pod spotrebičmi","position_bottom":"Dole","pv_bar_gap":"Medzera solárneho panela","pv_bar_gap_helper":"Vzdialenosť medzi solárnym panelom a ostatnými prvkami","battery_bar_gap":"Medzera panela batérie","battery_bar_gap_helper":"Vzdialenosť medzi panelom batérie a ostatnými prvkami","move_up":"Posunúť hore","move_down":"Posunúť dolu","duplicate":"Duplikovať","delete":"Vymazať","tap_action":"Akcia pri dotyku","double_tap":"Dvojitý dotyk","hold_action":"Podržanie"}');
const status$3 = { "feed_in": "Dodávka", "neutral": "Neutrálne", "grid_consumption": "Spotreba siete", "inactive": "Neaktívne" };
const sk = {
  general: general$3,
  editor: editor$4,
  status: status$3
};
const sk$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sk,
  editor: editor$4,
  general: general$3,
  status: status$3
}, Symbol.toStringTag, { value: "Module" }));
const general$2 = { "missing_entity": "manjka", "inactive": "Neaktivno" };
const editor$3 = /* @__PURE__ */ JSON.parse('{"tab_general":"Splošno","tab_elements":"Elementi","tab_cards":"Kartice","tab_layout":"Postavitev","tab_language":"Jezik","tab_header":"Header","tab_theme":"Tema","tab_infobar":"Informacijska vrstica","tab_pv":"Sončni sistem","tab_battery":"Baterija","tab_house":"Hiša","tab_grid":"Omrežje","tab_consumers":"Porabniki","tab_pv_bar":"Sončna vrstica","tab_battery_bar":"Vrstica baterije","card_header":"Glava kartice","title":"Naslov","title_placeholder":"Spremljevalnik sončne energije","title_helper":"Pustite prazno, da skrijete.","subtitle":"Podnaslov","subtitle_placeholder":"Povzetek energije","subtitle_helper":"Pustite prazno, da skrijete.","title_subtitle_gap":"Razmik med naslovom in podnaslovom","title_subtitle_gap_helper":"Razdalja med naslovom in podnaslovom","header_icon_size":"Velikost ikone v glavi","header_icon_size_helper":"Velikost ikone poleg naslova","header_icon_color":"Barva ikone v glavi","header_icon_margin":"Odmik ikone v glavi","icon":"Ikona","icon_helper":"Prikaže se samo, če je naslov nastavljen. Pustite prazno za skritje.","layout":"Postavitev","grid_gap":"Razmik mreže","grid_gap_placeholder":"6px","grid_gap_helper":"Razdalja med karticami.","header_margin_bottom":"Razmik med glavo in karticami/informacijsko vrstico","header_margin_bottom_helper":"Razdalja med naslovom/podnaslovom in informacijsko vrstico/karticami","infobar_gap":"Razmik med informacijsko vrstico in karticami","infobar_gap_helper":"Razdalja med informacijsko vrstico in štirimi karticami","language":"Jezik","language_helper":"Izberite jezik uporabniškega vmesnika","central_entities":"Centralne entitete","central_entities_helper":"Določite glavne entitete, uporabljene pri izračunih","entity_pv_production":"Entiteta sončne proizvodnje","entity_pv_production_helper":"Entiteta za moč sončne energije (uporabljena pri izračunih)","entity_battery_soc":"Stanje napolnjenosti baterije (SoC)","entity_battery_soc_helper":"Entiteta za stanje napolnjenosti baterije v % (za izračune)","entity_battery_charge":"Entiteta polnjenja baterije","entity_battery_charge_helper":"Entiteta za moč polnjenja (za izračune)","entity_battery_discharge":"Entiteta praznjenja baterije","entity_battery_discharge_helper":"Entiteta za moč praznjenja (za izračune)","entity_house_consumption":"Poraba hiše","entity_house_consumption_helper":"Entiteta za porabo hiše (za izračun samozadostnosti, neobvezno)","entity_grid_power":"Moč omrežja","entity_grid_power_helper":"Entiteta za uvoz/izvoz iz omrežja (za izračune)","central_config":"Centralna konfiguracija","central_config_helper":"Te vrednosti veljajo za vse kartice","pv_max_power_label":"Največja sončna moč (W)","pv_max_power_helper":"Največja moč sončne energije za animacije","battery_capacity_label":"Kapaciteta baterije (Wh)","battery_capacity_label_helper":"Kapaciteta baterije (npr. 10000 za 10 kWh)","grid_threshold_label":"Prag omrežja (W)","grid_threshold_helper":"Pod to vrednostjo se prikaže »Nevtralno«","card_visibility":"Vidnost kartic","cards_order":"Vrstni red kartic","cards_order_helper":"Spremenite vrstni red in vidnost štirih kartic","card_house":"Hiša","card_grid":"Omrežje","show_pv_card":"Prikaži kartico sončnega sistema","show_battery_card":"Prikaži kartico baterije","show_house_card":"Prikaži kartico hiše","show_grid_card":"Prikaži kartico omrežja","infobar_settings":"Nastavitve informacijske vrstice","enable_infobar":"Omogoči informacijsko vrstico","infobar_position":"Položaj informacijske vrstice","position_top":"Zgoraj (nad karticami)","calculation_mode":"Način izračuna za element 1","calculation_mode_helper":"Izberite: Samozadostnost ali Samoporabo","mode_autarky":"Samozadostnost","mode_self_consumption":"Samoporaba","calculate_battery_times":"Izračunaj čase baterije","calculate_battery_times_helper":"Samodejni izračun za elemente 2 (preostali čas delovanja) in 3 (preostali čas polnjenja)","item":"Element","entity":"Entiteta","icon_label":"Ikona","label":"Oznaka","unit":"Enota","default_autarky":"Samozadostnost","default_runtime":"Preostali čas delovanja","default_chargetime":"Preostali čas polnjenja","pv_system":"Sončni sistem","pv_entity":"Sončna entiteta","pv_entity_helper":"Entiteta za moč sončne energije","enable_animation":"Omogoči animacijo","animation_style":"Slog animacije","animation_style_helper":"Izberite slog animacije","animation_rotating_dots":"Vrteče pike","animation_particle_field":"Polje delcev","animation_electric_arc":"Električni loki","icon_rotation":"Vrtenje ikone","icon_rotation_helper":"Ikona se vrti glede na moč","max_power":"Največja moč (W)","max_power_helper":"Največja moč sončne energije za animacijo in vrtenje","battery":"Baterija","battery_entity":"Entiteta baterije","battery_entity_helper":"Entiteta za raven napolnjenosti baterije (%)","charge_entity":"Entiteta polnjenja","charge_entity_helper":"Entiteta za moč polnjenja","discharge_entity":"Entiteta praznjenja","discharge_entity_helper":"Entiteta za moč praznjenja","battery_capacity":"Kapaciteta baterije (Wh)","battery_capacity_helper":"Kapaciteta za animacije (npr. 10000 za 10 kWh)","calculate_runtime":"Izračunaj čas polnjenja/praznjenja","calculate_runtime_helper":"Samodejni izračun za elemente 2 in 3 informacijske vrstice","icon_auto_helper":"Pustite prazno za samodejno ikono","house_consumption":"Poraba hiše","house_entity":"Entiteta hiše","house_entity_helper":"Entiteta za porabo hiše","grid":"Omrežje","grid_entity":"Entiteta omrežja","grid_entity_helper":"Entiteta za uvoz/izvoz iz omrežja","threshold":"Prag (W)","threshold_helper":"Pod to vrednostjo se prikaže »Nevtralno«","status_texts":"Besedila stanja","text_feed_in":"Besedilo za oddajo v omrežje","text_feed_in_placeholder":"Oddaja","text_neutral":"Nevtralno besedilo","text_neutral_placeholder":"Nevtralno","text_consumption":"Besedilo za porabo","text_consumption_placeholder":"Poraba iz omrežja","additional_texts":"Dodatna besedila","secondary_entity":"Sekundarna entiteta","secondary_entity_helper":"Neobvezno: entiteta za drugo vrstico","secondary_text":"Sekundarno besedilo","secondary_text_helper":"Neobvezno: statično besedilo za drugo vrstico","tertiary_entity":"Tretja entiteta","tertiary_text":"Tretje besedilo","styling":"Slog","background_color":"Barva ozadja","border_color":"Barva roba","primary_color":"Primarna barva","secondary_color":"Sekundarna barva","icon_color":"Barva ikone","card_styling":"Slog kartice","header_background":"Ozadje glave","enable_header_background":"Omogoči ozadje glave","enable_header_background_helper":"Omogoči ozadje za območje naslova/podnaslova","header_background_color":"Barva ozadja glave","header_border_color":"Barva roba glave","header_border_radius":"Zaobljenost roba glave","header_padding":"Notranji odmik glave","header_width":"Širina glave","header_width_helper":"Samodejno = poravnano po vsebini, Polno = polna širina","header_width_auto":"Samodejno (velikost vsebine)","header_width_full":"Polno (100 % širina)","header_box_shadow":"Senca glave","border_radius":"Zaobljenost robov","text_color":"Barva besedila","padding":"Notranji odmik","cursor":"Kazalec","title_subtitle":"Naslov in podnaslov","title_size":"Velikost naslova","title_color":"Barva naslova","title_alignment":"Poravnava naslova","title_alignment_helper":"levo, sredina, desno","title_font_weight":"Debelina pisave naslova","subtitle_size":"Velikost podnaslova","subtitle_color":"Barva podnaslova","subtitle_alignment":"Poravnava podnaslova","subtitle_font_weight":"Debelina pisave podnaslova","icons":"Ikone","icon_size":"Velikost ikone","icon_opacity":"Prosojnost ikone","icon_margin":"Odmik ikone","primary_text_styling":"Primarno besedilo (vrednost)","primary_size":"Velikost primarnega besedila","primary_color_label":"Barva primarnega besedila","primary_opacity":"Prosojnost primarnega besedila","primary_font_weight":"Debelina pisave primarnega besedila","secondary_text_styling":"Sekundarno besedilo (druga vrstica)","secondary_size":"Velikost sekundarnega besedila","secondary_color_label":"Barva sekundarnega besedila","secondary_opacity":"Prosojnost sekundarnega besedila","secondary_font_weight":"Debelina pisave sekundarnega besedila","tertiary_text_styling":"Tretje besedilo (tretja vrstica)","tertiary_size":"Velikost tretjega besedila","tertiary_color_label":"Barva tretjega besedila","tertiary_opacity":"Prosojnost tretjega besedila","tertiary_font_weight":"Debelina pisave tretjega besedila","select_entity":"Izberite entiteto","select_icon":"Izberite ikono","action_none":"Brez","action_more_info":"Več informacij","action_navigate":"Navigacija","action_url":"URL","action_call_service":"Kliči storitev","theme":"Tema","theme_helper":"Izberite vnaprej določeno barvno temo","select_theme":"Izberite temo","consumers_settings":"Nastavitve porabnikov","enable_consumers":"Omogoči vrstico porabnikov","consumers_position":"Položaj","consumers_sort_mode":"Razvrstitev","sort_highest_first":"Največji najprej","sort_lowest_first":"Najmanjši najprej","sort_none":"Brez razvrstitve","sort_alpha_asc":"Po abecedi (A–Ž)","sort_alpha_desc":"Po abecedi (Ž–A)","consumers_threshold":"Globalni prag (W)","consumers_threshold_helper":"Porabniki pod to vrednostjo se ne prikažejo","add_consumer":"Dodaj porabnika","remove_consumer":"Odstrani porabnika","consumer_entity":"Št.","consumer_icon":"Ikona","consumer_label":"Oznaka","consumer_threshold":"Posamezni prag (W)","consumer_auto_color":"Samodejna barva","consumer_auto_color_helper":"Barva glede na porabo (zelena do vijolična)","consumer_item_styling":"Slog porabnika","consumer_primary_entity":"Primarna entiteta (vrednost)","consumer_primary_text":"Primarno besedilo (zamenja vrednost)","consumer_show_primary":"Pokaži primarno vrstico","consumer_secondary_entity":"Sekundarna entiteta (oznaka)","consumer_secondary_text":"Sekundarno besedilo (zamenja oznako)","consumer_show_secondary":"Pokaži sekundarno vrstico","consumer_switch_entity":"Entiteta stikala (za vklop/izklop)","consumer_switch_entity_helper":"Neobvezno: stikalo za vklop/izklop","consumer_tap_actions":"Dejanja ob dotiku","tap_action_target":"Cilj dejanja ob dotiku","double_tap_action_target":"Cilj dejanja ob dvojnem dotiku","hold_action_target":"Cilj dejanja ob držanju","action_target_none":"Brez dejanja","action_target_entity":"Preklopi entiteto","action_target_custom_entity":"Preklopi prilagojeno entiteto","action_target_custom_action":"Prilagojeno dejanje","custom_entity_toggle":"Prilagojena entiteta (preklop)","custom_entity_toggle_helper":"Entiteta, ki jo želite preklopiti","show_consumer_total_in_house":"Pokaži skupno porabo kot sekundarno besedilo","show_consumer_total_helper":"Prikaže vsoto vseh porabnikov pod Poraba hiše","show_title":"Prikaži naslov","show_subtitle":"Prikaži podnaslov","show_icon":"Prikaži ikono","title_line_height":"Višina vrstice naslova","subtitle_line_height":"Višina vrstice podnaslova","primary_line_height":"Višina vrstice primarnega besedila","secondary_line_height":"Višina vrstice sekundarnega besedila","tertiary_line_height":"Višina vrstice tretjega besedila","label_line_height":"Višina vrstice oznake","value_line_height":"Višina vrstice vrednosti","item_calc_type":"Vrsta izračuna","calc_type_entity":"Ročna entiteta","calc_type_autarky":"Samozadostnost","calc_type_self_consumption":"Samoporaba","calc_type_runtime":"Preostali čas delovanja","calc_type_chargetime":"Preostali čas polnjenja","header_section":"Glava","header_visibility":"Vidnost","header_content":"Vsebina","header_title_styling":"Slog naslova","header_subtitle_styling":"Slog podnaslova","header_icon_styling":"Slog ikone","infobar_styling":"Slog informacijske vrstice","card_styling_section":"Slog kartic","theme_editor_cards":"Urejevalnik tem (kartice)","theme_editor_cards_note":"Spreminja le barve kartic, ne glave.","header_background_subsection":"Ozadje glave","icon_subsection":"Ikona","primary_text_subsection":"Primarno besedilo (vrednost)","secondary_text_subsection":"Sekundarno besedilo (druga vrstica)","tertiary_text_subsection":"Tretje besedilo (tretja vrstica)","action_navigation_path":"Navigacijska pot","action_url_label":"URL","action_service":"Storitev","layout_order":"Vrstni red postavitve","layout_order_helper":"Določite vrstni red elementov","pv_bar_settings":"Nastavitve sončne vrstice","battery_bar_settings":"Nastavitve vrstice baterije","enable_pv_bar":"Omogoči sončno vrstico","enable_battery_bar":"Omogoči vrstico baterije","bar_position":"Položaj","bar_align":"Poravnava","align_left":"Levo","align_center":"Na sredini","align_right":"Desno","bar_entities":"Sistemi/Baterije","add_pv_entity":"Dodaj sončni sistem","add_battery_entity":"Dodaj baterijo","remove_entity":"Odstrani","entity_name":"Ime","entity_name_helper":"Ime, prikazano v vrstici","pv_max_5":"Največ 5 sončnih sistemov","battery_max_5":"Največ 5 baterij","bar_styling":"Slog vrstice","bar_separator":"Ločilo","bar_separator_helper":"Znak med elementi (npr. | ali •)","bar_item_gap":"Razmik med elementi","bar_item_gap_helper":"Razdalja med elementi","position_above_cards":"Nad karticami","position_below_cards":"Pod karticami","position_above_consumers":"Nad porabniki","position_below_consumers":"Pod porabniki","position_bottom":"Spodaj","pv_bar_gap":"Razmik sončne vrstice","pv_bar_gap_helper":"Razdalja med sončno vrstico in drugimi elementi","battery_bar_gap":"Razmik vrstice baterije","battery_bar_gap_helper":"Razdalja med vrstico baterije in drugimi elementi","move_up":"Premakni gor","move_down":"Premakni dol","duplicate":"Podvoji","delete":"Izbriši","tap_action":"Dejanje ob dotiku","double_tap":"Dvojni dotik","hold_action":"Drži"}');
const status$2 = { "feed_in": "Oddaja", "neutral": "Nevtralno", "grid_consumption": "Poraba omrežja", "inactive": "Neaktivno" };
const sl = {
  general: general$2,
  editor: editor$3,
  status: status$2
};
const sl$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sl,
  editor: editor$3,
  general: general$2,
  status: status$2
}, Symbol.toStringTag, { value: "Module" }));
const general$1 = { "missing_entity": "nedostaje", "inactive": "Neaktivno" };
const editor$2 = /* @__PURE__ */ JSON.parse(`{"tab_general":"Opšte","tab_elements":"Elementi","tab_cards":"Kartice","tab_layout":"Raspored","tab_language":"Jezik","tab_header":"Header","tab_theme":"Tema","tab_infobar":"Informaciona traka","tab_pv":"Solarni sistem","tab_battery":"Baterija","tab_house":"Kuća","tab_grid":"Mreža","tab_consumers":"Potrošači","tab_pv_bar":"Solarna traka","tab_battery_bar":"Traka baterije","card_header":"Zaglavlje kartice","title":"Naslov","title_placeholder":"Solarni monitor","title_helper":"Ostavite prazno da biste sakrili.","subtitle":"Podnaslov","subtitle_placeholder":"Pregled energije","subtitle_helper":"Ostavite prazno da biste sakrili.","title_subtitle_gap":"Razmak između naslova i podnaslova","title_subtitle_gap_helper":"Udaljenost između naslova i podnaslova","header_icon_size":"Veličina ikone u zaglavlju","header_icon_size_helper":"Veličina ikone pored naslova","header_icon_color":"Boja ikone u zaglavlju","header_icon_margin":"Margina ikone u zaglavlju","icon":"Ikona","icon_helper":"Prikazuje se samo ako je naslov postavljen. Ostavite prazno za skrivanje.","layout":"Raspored","grid_gap":"Razmak mreže","grid_gap_placeholder":"6px","grid_gap_helper":"Udaljenost između kartica.","header_margin_bottom":"Razmak između zaglavlja i kartica/informacione trake","header_margin_bottom_helper":"Udaljenost između naslova/podnaslova i informacione trake/kartica","infobar_gap":"Razmak između informacione trake i kartica","infobar_gap_helper":"Udaljenost između informacione trake i četiri kartice","language":"Jezik","language_helper":"Izaberite jezik interfejsa","central_entities":"Centralne entitete","central_entities_helper":"Definišite glavne entitete koji se koriste za proračune","entity_pv_production":"Entitet solarne proizvodnje","entity_pv_production_helper":"Entitet za snagu solarnog sistema (koristi se za proračune)","entity_battery_soc":"Stanje napunjenosti baterije (SoC)","entity_battery_soc_helper":"Entitet za nivo napunjenosti baterije u % (za proračune)","entity_battery_charge":"Entitet punjenja baterije","entity_battery_charge_helper":"Entitet za snagu punjenja (za proračune)","entity_battery_discharge":"Entitet pražnjenja baterije","entity_battery_discharge_helper":"Entitet za snagu pražnjenja (za proračune)","entity_house_consumption":"Potrošnja kuće","entity_house_consumption_helper":"Entitet za potrošnju kuće (za proračun samostalnosti, opciono)","entity_grid_power":"Snaga mreže","entity_grid_power_helper":"Entitet za uvoz/izvoz u mrežu (za proračune)","central_config":"Centralna konfiguracija","central_config_helper":"Ove vrednosti važe za sve kartice","pv_max_power_label":"Maksimalna solarna snaga (W)","pv_max_power_helper":"Maksimalna solarna snaga za animacije","battery_capacity_label":"Kapacitet baterije (Wh)","battery_capacity_label_helper":"Kapacitet baterije (npr. 10000 za 10 kWh)","grid_threshold_label":"Prag mreže (W)","grid_threshold_helper":"Ispod ove vrednosti prikazuje se 'Neutralno'","card_visibility":"Vidljivost kartica","cards_order":"Redosled kartica","cards_order_helper":"Promenite redosled i vidljivost četiri kartice","card_house":"Kuća","card_grid":"Mreža","show_pv_card":"Prikaži karticu solarnog sistema","show_battery_card":"Prikaži karticu baterije","show_house_card":"Prikaži karticu kuće","show_grid_card":"Prikaži karticu mreže","infobar_settings":"Podešavanja informacione trake","enable_infobar":"Omogući informacionu traku","infobar_position":"Pozicija informacione trake","position_top":"Na vrhu (iznad kartica)","calculation_mode":"Režim proračuna za stavku 1","calculation_mode_helper":"Izaberite: Samostalnost ili Samopotrošnju","mode_autarky":"Samostalnost","mode_self_consumption":"Samopotrošnja","calculate_battery_times":"Izračunaj vreme baterije","calculate_battery_times_helper":"Automatski proračun za stavke 2 (preostalo vreme rada) i 3 (preostalo vreme punjenja)","item":"Stavka","entity":"Entitet","icon_label":"Ikona","label":"Oznaka","unit":"Jedinica","default_autarky":"Samostalnost","default_runtime":"Preostalo vreme rada","default_chargetime":"Preostalo vreme punjenja","pv_system":"Solarni sistem","pv_entity":"Solarni entitet","pv_entity_helper":"Entitet za snagu solarnog sistema","enable_animation":"Omogući animaciju","animation_style":"Stil animacije","animation_style_helper":"Izaberite stil animacije","animation_rotating_dots":"Rotirajuće tačke","animation_particle_field":"Polje čestica","animation_electric_arc":"Električni lukovi","icon_rotation":"Rotacija ikone","icon_rotation_helper":"Ikona se rotira prema snazi","max_power":"Maksimalna snaga (W)","max_power_helper":"Maksimalna solarna snaga za animacije i rotaciju","battery":"Baterija","battery_entity":"Entitet baterije","battery_entity_helper":"Entitet za nivo napunjenosti baterije (%)","charge_entity":"Entitet punjenja","charge_entity_helper":"Entitet za snagu punjenja","discharge_entity":"Entitet pražnjenja","discharge_entity_helper":"Entitet za snagu pražnjenja","battery_capacity":"Kapacitet baterije (Wh)","battery_capacity_helper":"Kapacitet za animacije (npr. 10000 za 10 kWh)","calculate_runtime":"Izračunaj vreme punjenja/pražnjenja","calculate_runtime_helper":"Automatski proračun za stavke 2 i 3 informacione trake","icon_auto_helper":"Ostavite prazno za automatsku ikonu","house_consumption":"Potrošnja kuće","house_entity":"Entitet kuće","house_entity_helper":"Entitet za potrošnju kuće","grid":"Mreža","grid_entity":"Entitet mreže","grid_entity_helper":"Entitet za uvoz/izvoz u mrežu","threshold":"Prag (W)","threshold_helper":"Ispod ove vrednosti prikazuje se 'Neutralno'","status_texts":"Tekstovi statusa","text_feed_in":"Tekst za predaju u mrežu","text_feed_in_placeholder":"Predaja","text_neutral":"Tekst za neutralno","text_neutral_placeholder":"Neutralno","text_consumption":"Tekst za potrošnju","text_consumption_placeholder":"Potrošnja iz mreže","additional_texts":"Dodatni tekstovi","secondary_entity":"Sekundarni entitet","secondary_entity_helper":"Opciono: entitet za drugi red","secondary_text":"Sekundarni tekst","secondary_text_helper":"Opciono: statični tekst za drugi red","tertiary_entity":"Treći entitet","tertiary_text":"Treći tekst","styling":"Stil","background_color":"Boja pozadine","border_color":"Boja ivice","primary_color":"Primarna boja","secondary_color":"Sekundarna boja","icon_color":"Boja ikone","card_styling":"Stil kartice","header_background":"Pozadina zaglavlja","enable_header_background":"Omogući pozadinu zaglavlja","enable_header_background_helper":"Aktivira pozadinu za područje naslova/podnaslova","header_background_color":"Boja pozadine zaglavlja","header_border_color":"Boja ivice zaglavlja","header_border_radius":"Zaobljenje zaglavlja","header_padding":"Unutrašnji razmak zaglavlja","header_width":"Širina zaglavlja","header_width_helper":"Automatski = prema sadržaju, Puno = puna širina","header_width_auto":"Automatski (veličina sadržaja)","header_width_full":"Puno (100% širina)","header_box_shadow":"Senka zaglavlja","border_radius":"Zaobljenje ivica","text_color":"Boja teksta","padding":"Unutrašnji razmak","cursor":"Kursor","title_subtitle":"Naslov i podnaslov","title_size":"Veličina naslova","title_color":"Boja naslova","title_alignment":"Poravnanje naslova","title_alignment_helper":"levo, centar, desno","title_font_weight":"Debljina fonta naslova","subtitle_size":"Veličina podnaslova","subtitle_color":"Boja podnaslova","subtitle_alignment":"Poravnanje podnaslova","subtitle_font_weight":"Debljina fonta podnaslova","icons":"Ikone","icon_size":"Veličina ikone","icon_opacity":"Prozirnost ikone","icon_margin":"Margina ikone","primary_text_styling":"Primarni tekst (vrednost)","primary_size":"Veličina primarnog teksta","primary_color_label":"Boja primarnog teksta","primary_opacity":"Prozirnost primarnog teksta","primary_font_weight":"Debljina fonta primarnog teksta","secondary_text_styling":"Sekundarni tekst (drugi red)","secondary_size":"Veličina sekundarnog teksta","secondary_color_label":"Boja sekundarnog teksta","secondary_opacity":"Prozirnost sekundarnog teksta","secondary_font_weight":"Debljina fonta sekundarnog teksta","tertiary_text_styling":"Treći tekst (treći red)","tertiary_size":"Veličina trećeg teksta","tertiary_color_label":"Boja trećeg teksta","tertiary_opacity":"Prozirnost trećeg teksta","tertiary_font_weight":"Debljina fonta trećeg teksta","select_entity":"Izaberite entitet","select_icon":"Izaberite ikonu","action_none":"Nijedna","action_more_info":"Više informacija","action_navigate":"Navigacija","action_url":"URL","action_call_service":"Poziv usluge","theme":"Tema","theme_helper":"Izaberite unapred definisanu temu boja","select_theme":"Izaberite temu","consumers_settings":"Podešavanja potrošača","enable_consumers":"Omogući traku potrošača","consumers_position":"Pozicija","consumers_sort_mode":"Režim sortiranja","sort_highest_first":"Najveći prvo","sort_lowest_first":"Najmanji prvo","sort_none":"Bez sortiranja","sort_alpha_asc":"Po abecedi (A–Š)","sort_alpha_desc":"Po abecedi (Š–A)","consumers_threshold":"Globalni prag (W)","consumers_threshold_helper":"Potrošači ispod ove vrednosti se ne prikazuju","add_consumer":"Dodaj potrošača","remove_consumer":"Ukloni potrošača","consumer_entity":"Entitet","consumer_icon":"Ikona","consumer_label":"Oznaka","consumer_threshold":"Pojedinačni prag (W)","consumer_auto_color":"Automatska boja","consumer_auto_color_helper":"Boja prema potrošnji (zelena do ljubičasta)","consumer_item_styling":"Stil potrošača","consumer_primary_entity":"Primarni entitet (vrednost)","consumer_primary_text":"Primarni tekst (zamenjuje vrednost)","consumer_show_primary":"Prikaži primarni red","consumer_secondary_entity":"Sekundarni entitet (oznaka)","consumer_secondary_text":"Sekundarni tekst (zamenjuje oznaku)","consumer_show_secondary":"Prikaži sekundarni red","consumer_switch_entity":"Prekidač (uključivanje/isključivanje)","consumer_switch_entity_helper":"Opciono: prekidač za uključivanje/isključivanje","consumer_tap_actions":"Akcije na dodir","tap_action_target":"Cilj akcije na dodir","double_tap_action_target":"Cilj akcije na dvostruki dodir","hold_action_target":"Cilj akcije pri držanju","action_target_none":"Bez akcije","action_target_entity":"Prebaci entitet","action_target_custom_entity":"Prebaci prilagođeni entitet","action_target_custom_action":"Prilagođena akcija","custom_entity_toggle":"Prilagođeni entitet (prebacivanje)","custom_entity_toggle_helper":"Entitet koji želite prebaciti","show_consumer_total_in_house":"Prikaži ukupnu potrošnju kao sekundarni tekst","show_consumer_total_helper":"Prikazuje zbir svih potrošača ispod potrošnje kuće","show_title":"Prikaži naslov","show_subtitle":"Prikaži podnaslov","show_icon":"Prikaži ikonu","title_line_height":"Visina linije naslova","subtitle_line_height":"Visina linije podnaslova","primary_line_height":"Visina linije primarnog teksta","secondary_line_height":"Visina linije sekundarnog teksta","tertiary_line_height":"Visina linije trećeg teksta","label_line_height":"Visina linije oznake","value_line_height":"Visina linije vrednosti","item_calc_type":"Tip proračuna","calc_type_entity":"Ručno definisan entitet","calc_type_autarky":"Samostalnost","calc_type_self_consumption":"Samopotrošnja","calc_type_runtime":"Preostalo vreme rada","calc_type_chargetime":"Preostalo vreme punjenja","header_section":"Zaglavlje","header_visibility":"Vidljivost","header_content":"Sadržaj","header_title_styling":"Stil naslova","header_subtitle_styling":"Stil podnaslova","header_icon_styling":"Stil ikone","infobar_styling":"Stil informacione trake","card_styling_section":"Stil kartica","theme_editor_cards":"Uređivač tema (kartice)","theme_editor_cards_note":"Menja samo boje kartica, ne zaglavlje.","header_background_subsection":"Pozadina zaglavlja","icon_subsection":"Ikona","primary_text_subsection":"Primarni tekst (vrednost)","secondary_text_subsection":"Sekundarni tekst (drugi red)","tertiary_text_subsection":"Treći tekst (treći red)","action_navigation_path":"Navigaciona putanja","action_url_label":"URL","action_service":"Usluga","layout_order":"Redosled rasporeda","layout_order_helper":"Odredite redosled elemenata","pv_bar_settings":"Podešavanja solarne trake","battery_bar_settings":"Podešavanja trake baterije","enable_pv_bar":"Omogući solarnu traku","enable_battery_bar":"Omogući traku baterije","bar_position":"Pozicija","bar_align":"Poravnanje","align_left":"Levo","align_center":"Centar","align_right":"Desno","bar_entities":"Sistemi/Baterije","add_pv_entity":"Dodaj solarni sistem","add_battery_entity":"Dodaj bateriju","remove_entity":"Ukloni","entity_name":"Ime","entity_name_helper":"Ime prikazano na traci","pv_max_5":"Maks. 5 solarnih sistema","battery_max_5":"Maks. 5 baterija","bar_styling":"Stil trake","bar_separator":"Razdvajanje","bar_separator_helper":"Znak između stavki (npr. | ili •)","bar_item_gap":"Razmak između stavki","bar_item_gap_helper":"Udaljenost između stavki","position_above_cards":"Iznad kartica","position_below_cards":"Ispod kartica","position_above_consumers":"Iznad potrošača","position_below_consumers":"Ispod potrošača","position_bottom":"Dno","pv_bar_gap":"Razmak solarne trake","pv_bar_gap_helper":"Udaljenost između solarne trake i drugih elemenata","battery_bar_gap":"Razmak trake baterije","battery_bar_gap_helper":"Udaljenost između trake baterije i drugih elemenata","move_up":"Pomeri gore","move_down":"Pomeri dole","duplicate":"Dupliraj","delete":"Obriši","tap_action":"Akcija na dodir","double_tap":"Dvostruki dodir","hold_action":"Zadržavanje"}`);
const status$1 = { "feed_in": "Predaja", "neutral": "Neutralno", "grid_consumption": "Potrošnja mreže", "inactive": "Neaktivno" };
const sr = {
  general: general$1,
  editor: editor$2,
  status: status$1
};
const sr$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sr,
  editor: editor$2,
  general: general$1,
  status: status$1
}, Symbol.toStringTag, { value: "Module" }));
const general = { "missing_entity": "saknas", "inactive": "Inaktiv" };
const editor$1 = /* @__PURE__ */ JSON.parse('{"tab_general":"Allmänt","tab_elements":"Element","tab_cards":"Kort","tab_layout":"Layout","tab_language":"Språk","tab_header":"Header","tab_theme":"Tema","tab_infobar":"Informationsfält","tab_pv":"Solcellssystem","tab_battery":"Batteri","tab_house":"Hus","tab_grid":"El-nät","tab_consumers":"Förbrukare","tab_pv_bar":"Solcellsfält","tab_battery_bar":"Batterifält","card_header":"Korthuvud","title":"Titel","title_placeholder":"Solcellsmonitor","title_helper":"Lämna tomt för att dölja.","subtitle":"Undertitel","subtitle_placeholder":"Energisammanfattning","subtitle_helper":"Lämna tomt för att dölja.","title_subtitle_gap":"Avstånd mellan titel och undertitel","title_subtitle_gap_helper":"Avstånd mellan titel och undertitel","header_icon_size":"Ikonstorlek i huvud","header_icon_size_helper":"Storlek på ikonen bredvid titeln","header_icon_color":"Ikonfärg i huvud","header_icon_margin":"Marginal för ikon i huvud","icon":"Ikon","icon_helper":"Visas endast om en titel finns. Lämna tomt för att dölja.","layout":"Layout","grid_gap":"Rutnätsavstånd","grid_gap_placeholder":"6px","grid_gap_helper":"Avstånd mellan korten.","header_margin_bottom":"Avstånd mellan huvud och kort/informationsfält","header_margin_bottom_helper":"Avstånd mellan titel/undertitel och informationsfält/kort","infobar_gap":"Avstånd informationsfält–kort","infobar_gap_helper":"Avstånd mellan informationsfältet och de fyra korten","language":"Språk","language_helper":"Välj gränssnittsspråk","central_entities":"Centrala entiteter","central_entities_helper":"Definiera huvudentiteter som används för beräkningar","entity_pv_production":"Solcellsproduktion","entity_pv_production_helper":"Entitet för solcellseffekt (används i beräkningar)","entity_battery_soc":"Batteriladdning (SoC)","entity_battery_soc_helper":"Entitet för batteriladdning i % (för beräkningar)","entity_battery_charge":"Batteriladdning","entity_battery_charge_helper":"Entitet för laddningseffekt (för beräkningar)","entity_battery_discharge":"Batteriurladdning","entity_battery_discharge_helper":"Entitet för urladdningseffekt (för beräkningar)","entity_house_consumption":"Husförbrukning","entity_house_consumption_helper":"Entitet för hushållsförbrukning (för beräkning av självförsörjning, valfritt)","entity_grid_power":"Nätström","entity_grid_power_helper":"Entitet för nätimport/export (för beräkningar)","central_config":"Central konfiguration","central_config_helper":"Dessa värden gäller för alla kort","pv_max_power_label":"Maximal soleffekt (W)","pv_max_power_helper":"Maximal solcellseffekt för animationer","battery_capacity_label":"Batterikapacitet (Wh)","battery_capacity_label_helper":"Batteriets kapacitet (t.ex. 10000 för 10 kWh)","grid_threshold_label":"Nätgräns (W)","grid_threshold_helper":"Under detta värde visas \\"Neutral\\"","card_visibility":"Kortens synlighet","cards_order":"Ordning på kort","cards_order_helper":"Ändra ordning och synlighet för de fyra korten","card_house":"Hus","card_grid":"Nät","show_pv_card":"Visa solkort","show_battery_card":"Visa batterikort","show_house_card":"Visa huskort","show_grid_card":"Visa nätkort","infobar_settings":"Inställningar för informationsfält","enable_infobar":"Aktivera informationsfält","infobar_position":"Position för informationsfält","position_top":"Överst (ovanför kort)","calculation_mode":"Beräkning för objekt 1","calculation_mode_helper":"Välj: Självförsörjning eller Självförbrukning","mode_autarky":"Självförsörjning","mode_self_consumption":"Självförbrukning","calculate_battery_times":"Beräkna batteritider","calculate_battery_times_helper":"Automatisk beräkning för objekt 2 (återstående driftstid) och 3 (återstående laddtid)","item":"Objekt","entity":"Entitet","icon_label":"Ikon","label":"Etikett","unit":"Enhet","default_autarky":"Självförsörjning","default_runtime":"Återstående driftstid","default_chargetime":"Återstående laddtid","pv_system":"Solcellssystem","pv_entity":"Solcellsenhet","pv_entity_helper":"Entitet för solcellseffekt","enable_animation":"Aktivera animation","animation_style":"Animationsstil","animation_style_helper":"Välj animationseffekt","animation_rotating_dots":"Roterande punkter","animation_particle_field":"Partikelfält","animation_electric_arc":"Elektriska bågar","icon_rotation":"Ikonrotation","icon_rotation_helper":"Ikonen roterar baserat på effekt","max_power":"Maximal effekt (W)","max_power_helper":"Maximal solcellseffekt för animation och rotation","battery":"Batteri","battery_entity":"Batterientitet","battery_entity_helper":"Entitet för batterinivå (%)","charge_entity":"Laddningsentitet","charge_entity_helper":"Entitet för laddningseffekt","discharge_entity":"Urladdningsentitet","discharge_entity_helper":"Entitet för urladdningseffekt","battery_capacity":"Batterikapacitet (Wh)","battery_capacity_helper":"Kapacitet för batterianimation (t.ex. 10000 för 10 kWh)","calculate_runtime":"Beräkna laddning/urladdningstider","calculate_runtime_helper":"Automatisk beräkning för objekt 2 och 3 i informationsfältet","icon_auto_helper":"Lämna tomt för automatisk ikon","house_consumption":"Husförbrukning","house_entity":"Husentitet","house_entity_helper":"Entitet för hushållsförbrukning","grid":"Nät","grid_entity":"Nätentitet","grid_entity_helper":"Entitet för nätimport/export","threshold":"Gränsvärde (W)","threshold_helper":"Under detta värde visas \\"Neutral\\"","status_texts":"Statustexter","text_feed_in":"Text för inmatning","text_feed_in_placeholder":"Inmatning","text_neutral":"Text för neutral","text_neutral_placeholder":"Neutral","text_consumption":"Text för förbrukning","text_consumption_placeholder":"Nätförbrukning","additional_texts":"Ytterligare texter","secondary_entity":"Sekundär entitet","secondary_entity_helper":"Valfritt: entitet för andra raden","secondary_text":"Sekundär text","secondary_text_helper":"Valfritt: statisk text för andra raden","tertiary_entity":"Tertiär entitet","tertiary_text":"Tertiär text","styling":"Stil","background_color":"Bakgrundsfärg","border_color":"Ramfärg","primary_color":"Primär färg","secondary_color":"Sekundär färg","icon_color":"Ikonfärg","card_styling":"Kortstil","header_background":"Huvudbakgrund","enable_header_background":"Aktivera huvudbakgrund","enable_header_background_helper":"Aktiverar bakgrund för titel/undertitelyta","header_background_color":"Bakgrundsfärg för huvud","header_border_color":"Ramfärg för huvud","header_border_radius":"Ramradie för huvud","header_padding":"Utfyllnad för huvud","header_width":"Bredd på huvud","header_width_helper":"Auto = centrerad, Full = full bredd","header_width_auto":"Auto (innehållsstorlek)","header_width_full":"Full (100 % bredd)","header_box_shadow":"Skugga för huvud","border_radius":"Ramradie","text_color":"Textfärg","padding":"Utfyllnad","cursor":"Pekare","title_subtitle":"Titel och undertitel","title_size":"Titelstorlek","title_color":"Titelfärg","title_alignment":"Titeljustering","title_alignment_helper":"vänster, mitten, höger","title_font_weight":"Titeltyngd","subtitle_size":"Undertitelstorlek","subtitle_color":"Undertitelfärg","subtitle_alignment":"Undertiteljustering","subtitle_font_weight":"Undertiteltyngd","icons":"Ikoner","icon_size":"Ikonstorlek","icon_opacity":"Ikonopacitet","icon_margin":"Ikonmarginal","primary_text_styling":"Primär text (värde)","primary_size":"Primär storlek","primary_color_label":"Primär färg","primary_opacity":"Primär opacitet","primary_font_weight":"Primär tyngd","secondary_text_styling":"Sekundär text (andra raden)","secondary_size":"Sekundär storlek","secondary_color_label":"Sekundär färg","secondary_opacity":"Sekundär opacitet","secondary_font_weight":"Sekundär tyngd","tertiary_text_styling":"Tertiär text (tredje raden)","tertiary_size":"Tertiär storlek","tertiary_color_label":"Tertiär färg","tertiary_opacity":"Tertiär opacitet","tertiary_font_weight":"Tertiär tyngd","select_entity":"Välj entitet","select_icon":"Välj ikon","action_none":"Ingen","action_more_info":"Mer information","action_navigate":"Navigera","action_url":"URL","action_call_service":"Anropa tjänst","theme":"Tema","theme_helper":"Välj ett fördefinierat färgtema","select_theme":"Välj tema","consumers_settings":"Förbrukarinställningar","enable_consumers":"Aktivera förbrukarfält","consumers_position":"Position","consumers_sort_mode":"Sortering","sort_highest_first":"Högsta först","sort_lowest_first":"Lägsta först","sort_none":"Ingen sortering","sort_alpha_asc":"Alfabetisk (A–Ö)","sort_alpha_desc":"Alfabetisk (Ö–A)","consumers_threshold":"Global gräns (W)","consumers_threshold_helper":"Förbrukare under detta värde visas inte","add_consumer":"Lägg till förbrukare","remove_consumer":"Ta bort förbrukare","consumer_entity":"Nr.","consumer_icon":"Ikon","consumer_label":"Etikett","consumer_threshold":"Individuell gräns (W)","consumer_auto_color":"Automatisk färg","consumer_auto_color_helper":"Färg baserad på förbrukning (grön till lila)","consumer_item_styling":"Förbrukarstil","consumer_primary_entity":"Primär entitet (värde)","consumer_primary_text":"Primär text (ersätter värde)","consumer_show_primary":"Visa primär rad","consumer_secondary_entity":"Sekundär entitet (etikett)","consumer_secondary_text":"Sekundär text (ersätter etikett)","consumer_show_secondary":"Visa sekundär rad","consumer_switch_entity":"Strömbrytare (för växling)","consumer_switch_entity_helper":"Valfritt: brytare för att slå på/av","consumer_tap_actions":"Tryckåtgärder","tap_action_target":"Tryckmål","double_tap_action_target":"Dubbeltryckmål","hold_action_target":"Hållåtgärd","action_target_none":"Ingen åtgärd","action_target_entity":"Växla entitet","action_target_custom_entity":"Växla anpassad entitet","action_target_custom_action":"Anpassad åtgärd","custom_entity_toggle":"Anpassad entitet (växla)","custom_entity_toggle_helper":"Entitet som ska växlas","show_consumer_total_in_house":"Visa total förbrukning som sekundär text","show_consumer_total_helper":"Visar summan av alla förbrukare under husförbrukning","show_title":"Visa titel","show_subtitle":"Visa undertitel","show_icon":"Visa ikon","title_line_height":"Radhöjd titel","subtitle_line_height":"Radhöjd undertitel","primary_line_height":"Radhöjd primär","secondary_line_height":"Radhöjd sekundär","tertiary_line_height":"Radhöjd tertiär","label_line_height":"Radhöjd etikett","value_line_height":"Radhöjd värde","item_calc_type":"Beräkningstyp","calc_type_entity":"Manuell entitet","calc_type_autarky":"Självförsörjning","calc_type_self_consumption":"Självförbrukning","calc_type_runtime":"Återstående driftstid","calc_type_chargetime":"Återstående laddtid","header_section":"Huvud","header_visibility":"Synlighet","header_content":"Innehåll","header_title_styling":"Titelstil","header_subtitle_styling":"Undertitelstil","header_icon_styling":"Ikonstil","infobar_styling":"Stil för informationsfält","card_styling_section":"Kortstil","theme_editor_cards":"Temaredigerare (kort)","theme_editor_cards_note":"Ändrar endast kortfärger, inte huvudet.","header_background_subsection":"Bakgrund för huvud","icon_subsection":"Ikon","primary_text_subsection":"Primär text (värde)","secondary_text_subsection":"Sekundär text (andra raden)","tertiary_text_subsection":"Tertiär text (tredje raden)","action_navigation_path":"Navigeringsväg","action_url_label":"URL","action_service":"Tjänst","layout_order":"Layoutordning","layout_order_helper":"Ange ordning på element","pv_bar_settings":"Inställningar för solcellsfält","battery_bar_settings":"Inställningar för batterifält","enable_pv_bar":"Aktivera solcellsfält","enable_battery_bar":"Aktivera batterifält","bar_position":"Position","bar_align":"Justering","align_left":"Vänster","align_center":"Mitten","align_right":"Höger","bar_entities":"System/Batterier","add_pv_entity":"Lägg till solcellssystem","add_battery_entity":"Lägg till batteri","remove_entity":"Ta bort","entity_name":"Namn","entity_name_helper":"Namn som visas i fältet","pv_max_5":"Max. 5 solcellssystem","battery_max_5":"Max. 5 batterier","bar_styling":"Fältstil","bar_separator":"Avgränsare","bar_separator_helper":"Tecken mellan element (t.ex. | eller •)","bar_item_gap":"Avstånd mellan element","bar_item_gap_helper":"Avstånd mellan element","position_above_cards":"Ovanför korten","position_below_cards":"Under korten","position_above_consumers":"Ovanför förbrukare","position_below_consumers":"Under förbrukare","position_bottom":"Nederst","pv_bar_gap":"Avstånd för solcellsfält","pv_bar_gap_helper":"Avstånd mellan solcellsfält och andra element","battery_bar_gap":"Avstånd för batterifält","battery_bar_gap_helper":"Avstånd mellan batterifält och andra element","move_up":"Flytta upp","move_down":"Flytta ner","duplicate":"Duplicera","delete":"Ta bort","tap_action":"Tryckåtgärd","double_tap":"Dubbeltryck","hold_action":"Håll"}');
const status = { "feed_in": "Inmatning", "neutral": "Neutral", "grid_consumption": "Nätförbrukning", "inactive": "Inaktiv" };
const sv = {
  general,
  editor: editor$1,
  status
};
const sv$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sv,
  editor: editor$1,
  general,
  status
}, Symbol.toStringTag, { value: "Module" }));
const id$W = "avatar";
const name$W = "Avatar";
const colors$W = { "card_background_color": "rgba(0, 25, 40, 1)", "card_border_color": "rgba(0, 191, 255, 0.3)", "card_text_color": "rgba(255, 255, 255, 1)", "primary_color": "rgba(0, 191, 255, 1)", "secondary_color": "rgba(127, 255, 212, 0.8)", "title_color": "rgba(0, 191, 255, 1)", "subtitle_color": "rgba(127, 255, 212, 0.7)", "header_background_color": "rgba(10, 35, 50, 1)", "header_border_color": "rgba(0, 191, 255, 0.3)", "infobar_background_color": "rgba(10, 35, 50, 1)", "infobar_border_color": "rgba(0, 191, 255, 0.3)", "infobar_icon_color": "rgba(0, 191, 255, 1)", "infobar_label_color": "rgba(127, 255, 212, 0.7)", "infobar_value_color": "rgba(255, 255, 255, 1)", "consumer_background_color": "rgba(0, 20, 35, 1)", "consumer_border_color": "rgba(0, 191, 255, 0.3)", "consumer_primary_color": "rgba(0, 191, 255, 1)", "consumer_secondary_color": "rgba(127, 255, 212, 0.7)" };
const avatar = {
  id: id$W,
  name: name$W,
  colors: colors$W
};
const avatar$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$W,
  default: avatar,
  id: id$W,
  name: name$W
}, Symbol.toStringTag, { value: "Module" }));
const id$V = "batman";
const name$V = "Batman";
const colors$V = { "card_background_color": "#0B0B0C", "card_border_color": "#FACC15", "card_text_color": "#E5E5E5", "primary_color": "#FACC15", "secondary_color": "#1E40AF", "title_color": "#FACC15", "subtitle_color": "#1E40AF", "header_background_color": "#111112", "header_border_color": "#FACC15", "infobar_background_color": "#111112", "infobar_border_color": "#FACC15", "infobar_icon_color": "#FACC15", "infobar_label_color": "#A3A3A3", "infobar_value_color": "#E5E5E5", "consumer_background_color": "#161617", "consumer_border_color": "#FACC15", "consumer_primary_color": "#FACC15", "consumer_secondary_color": "#1E40AF" };
const batman = {
  id: id$V,
  name: name$V,
  colors: colors$V
};
const batman$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$V,
  default: batman,
  id: id$V,
  name: name$V
}, Symbol.toStringTag, { value: "Module" }));
const id$U = "blade_runner";
const name$U = "Blade Runner";
const colors$U = { "card_background_color": "#0A0C0F", "card_border_color": "#FF2400", "card_text_color": "#CFCFCF", "primary_color": "#FF2400", "secondary_color": "#00E5FF", "title_color": "#FF2400", "subtitle_color": "#00E5FF", "header_background_color": "#121418", "header_border_color": "#FF2400", "infobar_background_color": "#121418", "infobar_border_color": "#FF2400", "infobar_icon_color": "#FF2400", "infobar_label_color": "#A0FFFF", "infobar_value_color": "#CFCFCF", "consumer_background_color": "#16181C", "consumer_border_color": "#FF2400", "consumer_primary_color": "#FF2400", "consumer_secondary_color": "#00E5FF" };
const blade_runner = {
  id: id$U,
  name: name$U,
  colors: colors$U
};
const blade_runner$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$U,
  default: blade_runner,
  id: id$U,
  name: name$U
}, Symbol.toStringTag, { value: "Module" }));
const id$T = "blue";
const name$T = "Blue";
const colors$T = { "card_background_color": "rgba(15, 23, 42, 1)", "card_border_color": "rgba(59, 130, 246, 0.3)", "card_text_color": "rgba(226, 232, 240, 1)", "primary_color": "rgba(96, 165, 250, 1)", "secondary_color": "rgba(147, 197, 253, 0.8)", "title_color": "rgba(96, 165, 250, 1)", "subtitle_color": "rgba(148, 163, 184, 1)", "header_background_color": "rgba(30, 41, 59, 1)", "header_border_color": "rgba(59, 130, 246, 0.3)", "infobar_background_color": "rgba(30, 41, 59, 1)", "infobar_border_color": "rgba(59, 130, 246, 0.3)", "infobar_icon_color": "rgba(96, 165, 250, 1)", "infobar_label_color": "rgba(148, 163, 184, 1)", "infobar_value_color": "rgba(226, 232, 240, 1)", "consumer_background_color": "rgba(30, 41, 59, 1)", "consumer_border_color": "rgba(59, 130, 246, 0.3)", "consumer_primary_color": "rgba(96, 165, 250, 1)", "consumer_secondary_color": "rgba(148, 163, 184, 1)" };
const blue = {
  id: id$T,
  name: name$T,
  colors: colors$T
};
const blue$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$T,
  default: blue,
  id: id$T,
  name: name$T
}, Symbol.toStringTag, { value: "Module" }));
const id$S = "bobs_burgers";
const name$S = "Bob's Burgers";
const colors$S = { "card_background_color": "rgba(235, 231, 213, 1)", "card_border_color": "rgba(206, 48, 45, 0.4)", "card_text_color": "rgba(42, 54, 59, 1)", "primary_color": "rgba(206, 48, 45, 1)", "secondary_color": "rgba(42, 54, 59, 0.8)", "title_color": "rgba(206, 48, 45, 1)", "subtitle_color": "rgba(249, 176, 58, 1)", "header_background_color": "rgba(249, 241, 230, 1)", "header_border_color": "rgba(206, 48, 45, 0.3)", "infobar_background_color": "rgba(249, 241, 230, 1)", "infobar_border_color": "rgba(206, 48, 45, 0.3)", "infobar_icon_color": "rgba(206, 48, 45, 1)", "infobar_label_color": "rgba(42, 54, 59, 0.7)", "infobar_value_color": "rgba(42, 54, 59, 1)", "consumer_background_color": "rgba(249, 241, 230, 1)", "consumer_border_color": "rgba(206, 48, 45, 0.3)", "consumer_primary_color": "rgba(206, 48, 45, 1)", "consumer_secondary_color": "rgba(42, 54, 59, 0.7)" };
const bobs_burgers = {
  id: id$S,
  name: name$S,
  colors: colors$S
};
const bobs_burgers$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$S,
  default: bobs_burgers,
  id: id$S,
  name: name$S
}, Symbol.toStringTag, { value: "Module" }));
const id$R = "breaking_bad";
const name$R = "Breaking Bad";
const colors$R = { "card_background_color": "#1A1A1A", "card_border_color": "#065F46", "card_text_color": "#E5E5E5", "primary_color": "#10B981", "secondary_color": "#EAB308", "title_color": "#10B981", "subtitle_color": "#9CA3AF", "header_background_color": "#0F0F0F", "header_border_color": "#047857", "infobar_background_color": "#0F0F0F", "infobar_border_color": "#047857", "infobar_icon_color": "#10B981", "infobar_label_color": "#D1D5DB", "infobar_value_color": "#9CA3AF", "consumer_background_color": "#050505", "consumer_border_color": "#065F46", "consumer_primary_color": "#10B981", "consumer_secondary_color": "#EAB308" };
const breaking_bad = {
  id: id$R,
  name: name$R,
  colors: colors$R
};
const breaking_bad$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$R,
  default: breaking_bad,
  id: id$R,
  name: name$R
}, Symbol.toStringTag, { value: "Module" }));
const id$Q = "brown";
const name$Q = "Brown";
const colors$Q = { "card_background_color": "rgba(35, 25, 15, 1)", "card_border_color": "rgba(139, 92, 60, 0.3)", "card_text_color": "rgba(245, 235, 220, 1)", "primary_color": "rgba(168, 113, 80, 1)", "secondary_color": "rgba(214, 162, 116, 0.8)", "title_color": "rgba(168, 113, 80, 1)", "subtitle_color": "rgba(214, 178, 125, 0.7)", "header_background_color": "rgba(45, 30, 20, 1)", "header_border_color": "rgba(139, 92, 60, 0.3)", "infobar_background_color": "rgba(45, 30, 20, 1)", "infobar_border_color": "rgba(139, 92, 60, 0.3)", "infobar_icon_color": "rgba(168, 113, 80, 1)", "infobar_label_color": "rgba(214, 178, 125, 0.7)", "infobar_value_color": "rgba(245, 235, 220, 1)", "consumer_background_color": "rgba(45, 30, 20, 1)", "consumer_border_color": "rgba(139, 92, 60, 0.3)", "consumer_primary_color": "rgba(168, 113, 80, 1)", "consumer_secondary_color": "rgba(214, 178, 125, 0.7)" };
const brown = {
  id: id$Q,
  name: name$Q,
  colors: colors$Q
};
const brown$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$Q,
  default: brown,
  id: id$Q,
  name: name$Q
}, Symbol.toStringTag, { value: "Module" }));
const id$P = "catppuccin";
const name$P = "Catppuccin Mocha";
const colors$P = { "card_background_color": "rgba(30, 30, 46, 1)", "card_border_color": "rgba(137, 180, 250, 0.3)", "card_text_color": "rgba(205, 214, 244, 1)", "primary_color": "rgba(137, 180, 250, 1)", "secondary_color": "rgba(205, 214, 244, 0.8)", "title_color": "rgba(203, 166, 247, 1)", "subtitle_color": "rgba(186, 194, 222, 1)", "header_background_color": "rgba(49, 50, 68, 1)", "header_border_color": "rgba(137, 180, 250, 0.3)", "infobar_background_color": "rgba(49, 50, 68, 1)", "infobar_border_color": "rgba(137, 180, 250, 0.3)", "infobar_icon_color": "rgba(148, 226, 213, 1)", "infobar_label_color": "rgba(186, 194, 222, 1)", "infobar_value_color": "rgba(205, 214, 244, 1)", "consumer_background_color": "rgba(49, 50, 68, 1)", "consumer_border_color": "rgba(137, 180, 250, 0.3)", "consumer_primary_color": "rgba(137, 180, 250, 1)", "consumer_secondary_color": "rgba(186, 194, 222, 1)" };
const catppuccin = {
  id: id$P,
  name: name$P,
  colors: colors$P
};
const catppuccin$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$P,
  default: catppuccin,
  id: id$P,
  name: name$P
}, Symbol.toStringTag, { value: "Module" }));
const id$O = "cyan";
const name$O = "Cyan";
const colors$O = { "card_background_color": "rgba(10, 25, 30, 1)", "card_border_color": "rgba(6, 182, 212, 0.3)", "card_text_color": "rgba(255, 255, 255, 1)", "primary_color": "rgba(6, 182, 212, 1)", "secondary_color": "rgba(153, 246, 228, 0.8)", "title_color": "rgba(6, 182, 212, 1)", "subtitle_color": "rgba(153, 246, 228, 0.7)", "header_background_color": "rgba(20, 35, 40, 1)", "header_border_color": "rgba(6, 182, 212, 0.3)", "infobar_background_color": "rgba(20, 35, 40, 1)", "infobar_border_color": "rgba(6, 182, 212, 0.3)", "infobar_icon_color": "rgba(6, 182, 212, 1)", "infobar_label_color": "rgba(153, 246, 228, 0.7)", "infobar_value_color": "rgba(255, 255, 255, 1)", "consumer_background_color": "rgba(5, 20, 25, 1)", "consumer_border_color": "rgba(6, 182, 212, 0.3)", "consumer_primary_color": "rgba(6, 182, 212, 1)", "consumer_secondary_color": "rgba(153, 246, 228, 0.7)" };
const cyan = {
  id: id$O,
  name: name$O,
  colors: colors$O
};
const cyan$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$O,
  default: cyan,
  id: id$O,
  name: name$O
}, Symbol.toStringTag, { value: "Module" }));
const id$N = "dark";
const name$N = "Dark";
const colors$N = { "card_background_color": "rgba(21, 20, 27, 1)", "card_border_color": "rgba(255, 255, 255, 0.1)", "card_text_color": "white", "primary_color": "white", "secondary_color": "white", "title_color": "white", "subtitle_color": "rgba(255, 255, 255, 0.7)", "header_background_color": "rgba(21, 20, 27, 1)", "header_border_color": "rgba(255, 255, 255, 0.1)", "infobar_background_color": "rgba(21, 20, 27, 1)", "infobar_border_color": "rgba(255, 255, 255, 0.1)", "infobar_icon_color": "white", "infobar_label_color": "rgba(255, 255, 255, 0.7)", "infobar_value_color": "white", "consumer_background_color": "rgba(21, 20, 27, 1)", "consumer_border_color": "rgba(255, 255, 255, 0.1)", "consumer_primary_color": "white", "consumer_secondary_color": "rgba(255, 255, 255, 0.7)" };
const dark = {
  id: id$N,
  name: name$N,
  colors: colors$N
};
const dark$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$N,
  default: dark,
  id: id$N,
  name: name$N
}, Symbol.toStringTag, { value: "Module" }));
const id$M = "dr_who";
const name$M = "Doctor Who";
const colors$M = { "card_background_color": "#003B6F", "card_border_color": "#1E40AF", "card_text_color": "#FFFFFF", "primary_color": "#0EA5E9", "secondary_color": "#F59E0B", "title_color": "#38BDF8", "subtitle_color": "#93C5FD", "header_background_color": "#002347", "header_border_color": "#1E3A8A", "infobar_background_color": "#002347", "infobar_border_color": "#1E3A8A", "infobar_icon_color": "#38BDF8", "infobar_label_color": "#DBEAFE", "infobar_value_color": "#93C5FD", "consumer_background_color": "#001529", "consumer_border_color": "#1E40AF", "consumer_primary_color": "#0EA5E9", "consumer_secondary_color": "#F59E0B" };
const dr_who = {
  id: id$M,
  name: name$M,
  colors: colors$M
};
const dr_who$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$M,
  default: dr_who,
  id: id$M,
  name: name$M
}, Symbol.toStringTag, { value: "Module" }));
const id$L = "dracula";
const name$L = "Dracula";
const colors$L = { "card_background_color": "rgba(40, 42, 54, 1)", "card_border_color": "rgba(189, 147, 249, 0.3)", "card_text_color": "rgba(248, 248, 242, 1)", "primary_color": "rgba(139, 233, 253, 1)", "secondary_color": "rgba(248, 248, 242, 0.8)", "title_color": "rgba(189, 147, 249, 1)", "subtitle_color": "rgba(248, 248, 242, 0.7)", "header_background_color": "rgba(68, 71, 90, 1)", "header_border_color": "rgba(189, 147, 249, 0.3)", "infobar_background_color": "rgba(68, 71, 90, 1)", "infobar_border_color": "rgba(189, 147, 249, 0.3)", "infobar_icon_color": "rgba(255, 121, 198, 1)", "infobar_label_color": "rgba(248, 248, 242, 0.7)", "infobar_value_color": "rgba(248, 248, 242, 1)", "consumer_background_color": "rgba(68, 71, 90, 1)", "consumer_border_color": "rgba(189, 147, 249, 0.3)", "consumer_primary_color": "rgba(139, 233, 253, 1)", "consumer_secondary_color": "rgba(248, 248, 242, 0.7)" };
const dracula = {
  id: id$L,
  name: name$L,
  colors: colors$L
};
const dracula$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$L,
  default: dracula,
  id: id$L,
  name: name$L
}, Symbol.toStringTag, { value: "Module" }));
const id$K = "dune";
const name$K = "Dune";
const colors$K = { "card_background_color": "rgba(35, 25, 15, 1)", "card_border_color": "rgba(212, 163, 115, 0.3)", "card_text_color": "rgba(255, 255, 255, 1)", "primary_color": "rgba(212, 163, 115, 1)", "secondary_color": "rgba(166, 132, 88, 0.8)", "title_color": "rgba(212, 163, 115, 1)", "subtitle_color": "rgba(166, 132, 88, 0.7)", "header_background_color": "rgba(45, 35, 25, 1)", "header_border_color": "rgba(212, 163, 115, 0.3)", "infobar_background_color": "rgba(45, 35, 25, 1)", "infobar_border_color": "rgba(212, 163, 115, 0.3)", "infobar_icon_color": "rgba(212, 163, 115, 1)", "infobar_label_color": "rgba(166, 132, 88, 0.7)", "infobar_value_color": "rgba(255, 255, 255, 1)", "consumer_background_color": "rgba(30, 20, 10, 1)", "consumer_border_color": "rgba(212, 163, 115, 0.3)", "consumer_primary_color": "rgba(212, 163, 115, 1)", "consumer_secondary_color": "rgba(166, 132, 88, 0.7)" };
const dune = {
  id: id$K,
  name: name$K,
  colors: colors$K
};
const dune$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$K,
  default: dune,
  id: id$K,
  name: name$K
}, Symbol.toStringTag, { value: "Module" }));
const id$J = "family_guy";
const name$J = "Family Guy";
const colors$J = { "card_background_color": "#FFFFFF", "card_border_color": "#1E3A8A", "card_text_color": "#1A1A1A", "primary_color": "#DC2626", "secondary_color": "#FBBF24", "title_color": "#1E3A8A", "subtitle_color": "#4A5568", "header_background_color": "#F0F4FF", "header_border_color": "#1E3A8A", "infobar_background_color": "#F0F4FF", "infobar_border_color": "#1E3A8A", "infobar_icon_color": "#DC2626", "infobar_label_color": "#1E3A8A", "infobar_value_color": "#4A5568", "consumer_background_color": "#E0E7FF", "consumer_border_color": "#1E3A8A", "consumer_primary_color": "#DC2626", "consumer_secondary_color": "#FBBF24" };
const family_guy = {
  id: id$J,
  name: name$J,
  colors: colors$J
};
const family_guy$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$J,
  default: family_guy,
  id: id$J,
  name: name$J
}, Symbol.toStringTag, { value: "Module" }));
const id$I = "frankenstein";
const name$I = "Frankenstein";
const colors$I = { "card_background_color": "#1C1C1C", "card_border_color": "#4A5D23", "card_text_color": "#D4D4D4", "primary_color": "#84CC16", "secondary_color": "#A78BFA", "title_color": "#84CC16", "subtitle_color": "#94A3B8", "header_background_color": "#262626", "header_border_color": "#3F5120", "infobar_background_color": "#262626", "infobar_border_color": "#3F5120", "infobar_icon_color": "#A3E635", "infobar_label_color": "#D4D4D4", "infobar_value_color": "#94A3B8", "consumer_background_color": "#0F0F0F", "consumer_border_color": "#365314", "consumer_primary_color": "#84CC16", "consumer_secondary_color": "#A78BFA" };
const frankenstein = {
  id: id$I,
  name: name$I,
  colors: colors$I
};
const frankenstein$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$I,
  default: frankenstein,
  id: id$I,
  name: name$I
}, Symbol.toStringTag, { value: "Module" }));
const id$H = "frozen";
const name$H = "Frozen";
const colors$H = { "card_background_color": "#E0F7FA", "card_border_color": "#81D4FA", "card_text_color": "#01579B", "primary_color": "#00B0FF", "secondary_color": "#4FC3F7", "title_color": "#0288D1", "subtitle_color": "#81D4FA", "header_background_color": "#B3E5FC", "header_border_color": "#81D4FA", "infobar_background_color": "#B3E5FC", "infobar_border_color": "#81D4FA", "infobar_icon_color": "#0288D1", "infobar_label_color": "#0277BD", "infobar_value_color": "#01579B", "consumer_background_color": "#E1F5FE", "consumer_border_color": "#81D4FA", "consumer_primary_color": "#00B0FF", "consumer_secondary_color": "#4FC3F7" };
const frozen = {
  id: id$H,
  name: name$H,
  colors: colors$H
};
const frozen$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$H,
  default: frozen,
  id: id$H,
  name: name$H
}, Symbol.toStringTag, { value: "Module" }));
const id$G = "game_of_thrones";
const name$G = "Game Of Thrones";
const colors$G = { "card_background_color": "rgba(25, 35, 50, 1)", "card_border_color": "rgba(56, 189, 248, 0.3)", "card_text_color": "rgba(255, 255, 255, 1)", "primary_color": "rgba(56, 189, 248, 1)", "secondary_color": "rgba(234, 179, 8, 0.8)", "title_color": "rgba(56, 189, 248, 1)", "subtitle_color": "rgba(234, 179, 8, 0.7)", "header_background_color": "rgba(35, 45, 60, 1)", "header_border_color": "rgba(56, 189, 248, 0.3)", "infobar_background_color": "rgba(35, 45, 60, 1)", "infobar_border_color": "rgba(56, 189, 248, 0.3)", "infobar_icon_color": "rgba(56, 189, 248, 1)", "infobar_label_color": "rgba(234, 179, 8, 0.7)", "infobar_value_color": "rgba(255, 255, 255, 1)", "consumer_background_color": "rgba(20, 30, 45, 1)", "consumer_border_color": "rgba(56, 189, 248, 0.3)", "consumer_primary_color": "rgba(56, 189, 248, 1)", "consumer_secondary_color": "rgba(234, 179, 8, 0.7)" };
const game_of_thrones = {
  id: id$G,
  name: name$G,
  colors: colors$G
};
const game_of_thrones$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$G,
  default: game_of_thrones,
  id: id$G,
  name: name$G
}, Symbol.toStringTag, { value: "Module" }));
const id$F = "ghostbusters";
const name$F = "Ghostbusters";
const colors$F = { "card_background_color": "rgba(20, 20, 20, 1)", "card_border_color": "rgba(255, 0, 0, 0.3)", "card_text_color": "rgba(255, 255, 255, 1)", "primary_color": "rgba(255, 0, 0, 1)", "secondary_color": "rgba(0, 255, 0, 0.8)", "title_color": "rgba(255, 0, 0, 1)", "subtitle_color": "rgba(0, 255, 0, 0.7)", "header_background_color": "rgba(30, 30, 30, 1)", "header_border_color": "rgba(255, 0, 0, 0.3)", "infobar_background_color": "rgba(30, 30, 30, 1)", "infobar_border_color": "rgba(255, 0, 0, 0.3)", "infobar_icon_color": "rgba(255, 0, 0, 1)", "infobar_label_color": "rgba(0, 255, 0, 0.7)", "infobar_value_color": "rgba(255, 255, 255, 1)", "consumer_background_color": "rgba(15, 15, 15, 1)", "consumer_border_color": "rgba(255, 0, 0, 0.3)", "consumer_primary_color": "rgba(255, 0, 0, 1)", "consumer_secondary_color": "rgba(0, 255, 0, 0.7)" };
const ghostbusters = {
  id: id$F,
  name: name$F,
  colors: colors$F
};
const ghostbusters$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$F,
  default: ghostbusters,
  id: id$F,
  name: name$F
}, Symbol.toStringTag, { value: "Module" }));
const id$E = "gold";
const name$E = "Gold";
const colors$E = { "card_background_color": "rgba(35, 30, 15, 1)", "card_border_color": "rgba(212, 175, 55, 0.3)", "card_text_color": "rgba(255, 255, 255, 1)", "primary_color": "rgba(212, 175, 55, 1)", "secondary_color": "rgba(255, 236, 179, 0.8)", "title_color": "rgba(212, 175, 55, 1)", "subtitle_color": "rgba(255, 236, 179, 0.7)", "header_background_color": "rgba(45, 40, 25, 1)", "header_border_color": "rgba(212, 175, 55, 0.3)", "infobar_background_color": "rgba(45, 40, 25, 1)", "infobar_border_color": "rgba(212, 175, 55, 0.3)", "infobar_icon_color": "rgba(212, 175, 55, 1)", "infobar_label_color": "rgba(255, 236, 179, 0.7)", "infobar_value_color": "rgba(255, 255, 255, 1)", "consumer_background_color": "rgba(30, 25, 10, 1)", "consumer_border_color": "rgba(212, 175, 55, 0.3)", "consumer_primary_color": "rgba(212, 175, 55, 1)", "consumer_secondary_color": "rgba(255, 236, 179, 0.7)" };
const gold = {
  id: id$E,
  name: name$E,
  colors: colors$E
};
const gold$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$E,
  default: gold,
  id: id$E,
  name: name$E
}, Symbol.toStringTag, { value: "Module" }));
const id$D = "green";
const name$D = "Green";
const colors$D = { "card_background_color": "rgba(20, 30, 20, 1)", "card_border_color": "rgba(34, 197, 94, 0.3)", "card_text_color": "rgba(240, 253, 244, 1)", "primary_color": "rgba(74, 222, 128, 1)", "secondary_color": "rgba(134, 239, 172, 0.8)", "title_color": "rgba(74, 222, 128, 1)", "subtitle_color": "rgba(187, 247, 208, 0.7)", "header_background_color": "rgba(22, 40, 25, 1)", "header_border_color": "rgba(34, 197, 94, 0.3)", "infobar_background_color": "rgba(22, 40, 25, 1)", "infobar_border_color": "rgba(34, 197, 94, 0.3)", "infobar_icon_color": "rgba(74, 222, 128, 1)", "infobar_label_color": "rgba(187, 247, 208, 0.7)", "infobar_value_color": "rgba(240, 253, 244, 1)", "consumer_background_color": "rgba(22, 40, 25, 1)", "consumer_border_color": "rgba(34, 197, 94, 0.3)", "consumer_primary_color": "rgba(74, 222, 128, 1)", "consumer_secondary_color": "rgba(187, 247, 208, 0.7)" };
const green = {
  id: id$D,
  name: name$D,
  colors: colors$D
};
const green$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$D,
  default: green,
  id: id$D,
  name: name$D
}, Symbol.toStringTag, { value: "Module" }));
const id$C = "guardians";
const name$C = "Guardians of the Galaxy";
const colors$C = { "card_background_color": "#120024", "card_border_color": "#FF00A6", "card_text_color": "#E6E6FA", "primary_color": "#FF00A6", "secondary_color": "#00FFFF", "title_color": "#FF00A6", "subtitle_color": "#00FFFF", "header_background_color": "#1A0030", "header_border_color": "#FF00A6", "infobar_background_color": "#1A0030", "infobar_border_color": "#FF00A6", "infobar_icon_color": "#FF00A6", "infobar_label_color": "#A0FFFF", "infobar_value_color": "#E6E6FA", "consumer_background_color": "#1A0030", "consumer_border_color": "#FF00A6", "consumer_primary_color": "#FF00A6", "consumer_secondary_color": "#00FFFF" };
const guardians = {
  id: id$C,
  name: name$C,
  colors: colors$C
};
const guardians$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$C,
  default: guardians,
  id: id$C,
  name: name$C
}, Symbol.toStringTag, { value: "Module" }));
const id$B = "hal9000";
const name$B = "HAL 9000";
const colors$B = { "card_background_color": "#0A0A0A", "card_border_color": "#CC0000", "card_text_color": "#E0E0E0", "primary_color": "#FF0000", "secondary_color": "#CC0000", "title_color": "#FF0000", "subtitle_color": "#CC0000", "header_background_color": "#1A1A1A", "header_border_color": "#CC0000", "infobar_background_color": "#1A1A1A", "infobar_border_color": "#CC0000", "infobar_icon_color": "#FF0000", "infobar_label_color": "#E0E0E0", "infobar_value_color": "#CC0000", "consumer_background_color": "#0F0F0F", "consumer_border_color": "#990000", "consumer_primary_color": "#FF0000", "consumer_secondary_color": "#CC0000" };
const hal9000 = {
  id: id$B,
  name: name$B,
  colors: colors$B
};
const hal9000$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$B,
  default: hal9000,
  id: id$B,
  name: name$B
}, Symbol.toStringTag, { value: "Module" }));
const id$A = "inception";
const name$A = "Inception";
const colors$A = { "card_background_color": "#0B1218", "card_border_color": "#00838F", "card_text_color": "#E0F7FA", "primary_color": "#00BCD4", "secondary_color": "#0097A7", "title_color": "#00BCD4", "subtitle_color": "#0097A7", "header_background_color": "#0E1B22", "header_border_color": "#00838F", "infobar_background_color": "#0E1B22", "infobar_border_color": "#00838F", "infobar_icon_color": "#00BCD4", "infobar_label_color": "#4DD0E1", "infobar_value_color": "#E0F7FA", "consumer_background_color": "#112029", "consumer_border_color": "#00838F", "consumer_primary_color": "#00BCD4", "consumer_secondary_color": "#0097A7" };
const inception = {
  id: id$A,
  name: name$A,
  colors: colors$A
};
const inception$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$A,
  default: inception,
  id: id$A,
  name: name$A
}, Symbol.toStringTag, { value: "Module" }));
const id$z = "indigo";
const name$z = "Indigo";
const colors$z = { "card_background_color": "rgba(25, 25, 50, 1)", "card_border_color": "rgba(99, 102, 241, 0.3)", "card_text_color": "rgba(255, 255, 255, 1)", "primary_color": "rgba(99, 102, 241, 1)", "secondary_color": "rgba(165, 180, 252, 0.8)", "title_color": "rgba(99, 102, 241, 1)", "subtitle_color": "rgba(165, 180, 252, 0.7)", "header_background_color": "rgba(35, 35, 60, 1)", "header_border_color": "rgba(99, 102, 241, 0.3)", "infobar_background_color": "rgba(35, 35, 60, 1)", "infobar_border_color": "rgba(99, 102, 241, 0.3)", "infobar_icon_color": "rgba(99, 102, 241, 1)", "infobar_label_color": "rgba(165, 180, 252, 0.7)", "infobar_value_color": "rgba(255, 255, 255, 1)", "consumer_background_color": "rgba(20, 20, 45, 1)", "consumer_border_color": "rgba(99, 102, 241, 0.3)", "consumer_primary_color": "rgba(99, 102, 241, 1)", "consumer_secondary_color": "rgba(165, 180, 252, 0.7)" };
const indigo = {
  id: id$z,
  name: name$z,
  colors: colors$z
};
const indigo$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$z,
  default: indigo,
  id: id$z,
  name: name$z
}, Symbol.toStringTag, { value: "Module" }));
const id$y = "jurassic_park";
const name$y = "Jurassic Park";
const colors$y = { "card_background_color": "#1A0A0A", "card_border_color": "#B91C1C", "card_text_color": "#FEE2E2", "primary_color": "#DC2626", "secondary_color": "#FACC15", "title_color": "#DC2626", "subtitle_color": "#FACC15", "header_background_color": "#220C0C", "header_border_color": "#B91C1C", "infobar_background_color": "#220C0C", "infobar_border_color": "#B91C1C", "infobar_icon_color": "#DC2626", "infobar_label_color": "#FBBF24", "infobar_value_color": "#FEE2E2", "consumer_background_color": "#250D0D", "consumer_border_color": "#B91C1C", "consumer_primary_color": "#DC2626", "consumer_secondary_color": "#FACC15" };
const jurassic_park = {
  id: id$y,
  name: name$y,
  colors: colors$y
};
const jurassic_park$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$y,
  default: jurassic_park,
  id: id$y,
  name: name$y
}, Symbol.toStringTag, { value: "Module" }));
const id$x = "light";
const name$x = "Light";
const colors$x = { "card_background_color": "rgba(255, 255, 255, 1)", "card_border_color": "rgba(0, 0, 0, 0.1)", "card_text_color": "rgba(0, 0, 0, 0.87)", "primary_color": "rgba(0, 0, 0, 0.87)", "secondary_color": "rgba(0, 0, 0, 0.6)", "title_color": "rgba(0, 0, 0, 0.87)", "subtitle_color": "rgba(0, 0, 0, 0.6)", "header_background_color": "rgba(250, 250, 250, 1)", "header_border_color": "rgba(0, 0, 0, 0.1)", "infobar_background_color": "rgba(250, 250, 250, 1)", "infobar_border_color": "rgba(0, 0, 0, 0.1)", "infobar_icon_color": "rgba(0, 0, 0, 0.6)", "infobar_label_color": "rgba(0, 0, 0, 0.6)", "infobar_value_color": "rgba(0, 0, 0, 0.87)", "consumer_background_color": "rgba(250, 250, 250, 1)", "consumer_border_color": "rgba(0, 0, 0, 0.1)", "consumer_primary_color": "rgba(0, 0, 0, 0.87)", "consumer_secondary_color": "rgba(0, 0, 0, 0.6)" };
const light = {
  id: id$x,
  name: name$x,
  colors: colors$x
};
const light$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$x,
  default: light,
  id: id$x,
  name: name$x
}, Symbol.toStringTag, { value: "Module" }));
const id$w = "lime";
const name$w = "Lime";
const colors$w = { "card_background_color": "rgba(20, 30, 15, 1)", "card_border_color": "rgba(163, 230, 53, 0.3)", "card_text_color": "rgba(255, 255, 255, 1)", "primary_color": "rgba(163, 230, 53, 1)", "secondary_color": "rgba(217, 249, 157, 0.8)", "title_color": "rgba(163, 230, 53, 1)", "subtitle_color": "rgba(217, 249, 157, 0.7)", "header_background_color": "rgba(30, 40, 25, 1)", "header_border_color": "rgba(163, 230, 53, 0.3)", "infobar_background_color": "rgba(30, 40, 25, 1)", "infobar_border_color": "rgba(163, 230, 53, 0.3)", "infobar_icon_color": "rgba(163, 230, 53, 1)", "infobar_label_color": "rgba(217, 249, 157, 0.7)", "infobar_value_color": "rgba(255, 255, 255, 1)", "consumer_background_color": "rgba(15, 25, 10, 1)", "consumer_border_color": "rgba(163, 230, 53, 0.3)", "consumer_primary_color": "rgba(163, 230, 53, 1)", "consumer_secondary_color": "rgba(217, 249, 157, 0.7)" };
const lime = {
  id: id$w,
  name: name$w,
  colors: colors$w
};
const lime$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$w,
  default: lime,
  id: id$w,
  name: name$w
}, Symbol.toStringTag, { value: "Module" }));
const id$v = "lotr";
const name$v = "Lord of the Rings";
const colors$v = { "card_background_color": "#121A12", "card_border_color": "#D4AF37", "card_text_color": "#F9F6E6", "primary_color": "#D4AF37", "secondary_color": "#556B2F", "title_color": "#D4AF37", "subtitle_color": "#A0C080", "header_background_color": "#1A241A", "header_border_color": "#D4AF37", "infobar_background_color": "#1A241A", "infobar_border_color": "#D4AF37", "infobar_icon_color": "#D4AF37", "infobar_label_color": "#A0C080", "infobar_value_color": "#F9F6E6", "consumer_background_color": "#202C20", "consumer_border_color": "#D4AF37", "consumer_primary_color": "#D4AF37", "consumer_secondary_color": "#556B2F" };
const lotr = {
  id: id$v,
  name: name$v,
  colors: colors$v
};
const lotr$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$v,
  default: lotr,
  id: id$v,
  name: name$v
}, Symbol.toStringTag, { value: "Module" }));
const id$u = "mad_max";
const name$u = "Mad Max";
const colors$u = { "card_background_color": "rgba(40, 20, 10, 1)", "card_border_color": "rgba(255, 127, 50, 0.3)", "card_text_color": "rgba(255, 255, 255, 1)", "primary_color": "rgba(255, 127, 50, 1)", "secondary_color": "rgba(255, 179, 71, 0.8)", "title_color": "rgba(255, 127, 50, 1)", "subtitle_color": "rgba(255, 179, 71, 0.7)", "header_background_color": "rgba(50, 30, 20, 1)", "header_border_color": "rgba(255, 127, 50, 0.3)", "infobar_background_color": "rgba(50, 30, 20, 1)", "infobar_border_color": "rgba(255, 127, 50, 0.3)", "infobar_icon_color": "rgba(255, 127, 50, 1)", "infobar_label_color": "rgba(255, 179, 71, 0.7)", "infobar_value_color": "rgba(255, 255, 255, 1)", "consumer_background_color": "rgba(35, 15, 5, 1)", "consumer_border_color": "rgba(255, 127, 50, 0.3)", "consumer_primary_color": "rgba(255, 127, 50, 1)", "consumer_secondary_color": "rgba(255, 179, 71, 0.7)" };
const mad_max = {
  id: id$u,
  name: name$u,
  colors: colors$u
};
const mad_max$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$u,
  default: mad_max,
  id: id$u,
  name: name$u
}, Symbol.toStringTag, { value: "Module" }));
const id$t = "magenta";
const name$t = "Magenta";
const colors$t = { "card_background_color": "rgba(35, 15, 35, 1)", "card_border_color": "rgba(217, 70, 239, 0.3)", "card_text_color": "rgba(253, 244, 255, 1)", "primary_color": "rgba(232, 121, 249, 1)", "secondary_color": "rgba(240, 171, 252, 0.8)", "title_color": "rgba(217, 70, 239, 1)", "subtitle_color": "rgba(243, 197, 255, 0.7)", "header_background_color": "rgba(45, 20, 45, 1)", "header_border_color": "rgba(217, 70, 239, 0.3)", "infobar_background_color": "rgba(45, 20, 45, 1)", "infobar_border_color": "rgba(217, 70, 239, 0.3)", "infobar_icon_color": "rgba(232, 121, 249, 1)", "infobar_label_color": "rgba(243, 197, 255, 0.7)", "infobar_value_color": "rgba(253, 244, 255, 1)", "consumer_background_color": "rgba(45, 20, 45, 1)", "consumer_border_color": "rgba(217, 70, 239, 0.3)", "consumer_primary_color": "rgba(232, 121, 249, 1)", "consumer_secondary_color": "rgba(243, 197, 255, 0.7)" };
const magenta = {
  id: id$t,
  name: name$t,
  colors: colors$t
};
const magenta$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$t,
  default: magenta,
  id: id$t,
  name: name$t
}, Symbol.toStringTag, { value: "Module" }));
const id$s = "material";
const name$s = "Material Design";
const colors$s = { "card_background_color": "rgba(18, 18, 18, 1)", "card_border_color": "rgba(3, 218, 198, 0.3)", "card_text_color": "rgba(255, 255, 255, 0.87)", "primary_color": "rgba(3, 218, 198, 1)", "secondary_color": "rgba(255, 255, 255, 0.6)", "title_color": "rgba(3, 218, 198, 1)", "subtitle_color": "rgba(255, 255, 255, 0.6)", "header_background_color": "rgba(33, 33, 33, 1)", "header_border_color": "rgba(3, 218, 198, 0.3)", "infobar_background_color": "rgba(33, 33, 33, 1)", "infobar_border_color": "rgba(3, 218, 198, 0.3)", "infobar_icon_color": "rgba(3, 218, 198, 1)", "infobar_label_color": "rgba(255, 255, 255, 0.6)", "infobar_value_color": "rgba(255, 255, 255, 0.87)", "consumer_background_color": "rgba(33, 33, 33, 1)", "consumer_border_color": "rgba(3, 218, 198, 0.3)", "consumer_primary_color": "rgba(3, 218, 198, 1)", "consumer_secondary_color": "rgba(255, 255, 255, 0.6)" };
const material = {
  id: id$s,
  name: name$s,
  colors: colors$s
};
const material$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$s,
  default: material,
  id: id$s,
  name: name$s
}, Symbol.toStringTag, { value: "Module" }));
const id$r = "matrix";
const name$r = "Matrix";
const colors$r = { "card_background_color": "rgba(0, 0, 0, 1)", "card_border_color": "rgba(0, 255, 65, 0.3)", "card_text_color": "rgba(0, 255, 65, 1)", "primary_color": "rgba(0, 255, 65, 1)", "secondary_color": "rgba(0, 200, 50, 0.8)", "title_color": "rgba(0, 255, 65, 1)", "subtitle_color": "rgba(0, 200, 50, 0.7)", "header_background_color": "rgba(0, 10, 0, 1)", "header_border_color": "rgba(0, 255, 65, 0.3)", "infobar_background_color": "rgba(0, 10, 0, 1)", "infobar_border_color": "rgba(0, 255, 65, 0.3)", "infobar_icon_color": "rgba(0, 255, 65, 1)", "infobar_label_color": "rgba(0, 200, 50, 0.7)", "infobar_value_color": "rgba(0, 255, 65, 1)", "consumer_background_color": "rgba(0, 10, 0, 1)", "consumer_border_color": "rgba(0, 255, 65, 0.3)", "consumer_primary_color": "rgba(0, 255, 65, 1)", "consumer_secondary_color": "rgba(0, 200, 50, 0.7)" };
const matrix = {
  id: id$r,
  name: name$r,
  colors: colors$r
};
const matrix$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$r,
  default: matrix,
  id: id$r,
  name: name$r
}, Symbol.toStringTag, { value: "Module" }));
const id$q = "minimalist";
const name$q = "Minimalist";
const colors$q = { "card_background_color": "rgba(242, 242, 242, 1)", "card_border_color": "rgba(0, 0, 0, 0.1)", "card_text_color": "rgba(33, 33, 33, 1)", "primary_color": "rgba(33, 33, 33, 1)", "secondary_color": "rgba(117, 117, 117, 1)", "title_color": "rgba(33, 33, 33, 1)", "subtitle_color": "rgba(117, 117, 117, 1)", "header_background_color": "rgba(255, 255, 255, 1)", "header_border_color": "rgba(0, 0, 0, 0.1)", "infobar_background_color": "rgba(255, 255, 255, 1)", "infobar_border_color": "rgba(0, 0, 0, 0.1)", "infobar_icon_color": "rgba(66, 66, 66, 1)", "infobar_label_color": "rgba(117, 117, 117, 1)", "infobar_value_color": "rgba(33, 33, 33, 1)", "consumer_background_color": "rgba(255, 255, 255, 1)", "consumer_border_color": "rgba(0, 0, 0, 0.1)", "consumer_primary_color": "rgba(33, 33, 33, 1)", "consumer_secondary_color": "rgba(117, 117, 117, 1)" };
const minimalist = {
  id: id$q,
  name: name$q,
  colors: colors$q
};
const minimalist$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$q,
  default: minimalist,
  id: id$q,
  name: name$q
}, Symbol.toStringTag, { value: "Module" }));
const id$p = "monochrome";
const name$p = "Monochrome";
const colors$p = { "card_background_color": "rgba(30, 30, 30, 1)", "card_border_color": "rgba(128, 128, 128, 0.3)", "card_text_color": "rgba(220, 220, 220, 1)", "primary_color": "rgba(240, 240, 240, 1)", "secondary_color": "rgba(180, 180, 180, 1)", "title_color": "rgba(255, 255, 255, 1)", "subtitle_color": "rgba(160, 160, 160, 1)", "header_background_color": "rgba(40, 40, 40, 1)", "header_border_color": "rgba(128, 128, 128, 0.3)", "infobar_background_color": "rgba(40, 40, 40, 1)", "infobar_border_color": "rgba(128, 128, 128, 0.3)", "infobar_icon_color": "rgba(200, 200, 200, 1)", "infobar_label_color": "rgba(160, 160, 160, 1)", "infobar_value_color": "rgba(220, 220, 220, 1)", "consumer_background_color": "rgba(40, 40, 40, 1)", "consumer_border_color": "rgba(128, 128, 128, 0.3)", "consumer_primary_color": "rgba(240, 240, 240, 1)", "consumer_secondary_color": "rgba(180, 180, 180, 1)" };
const monochrome = {
  id: id$p,
  name: name$p,
  colors: colors$p
};
const monochrome$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$p,
  default: monochrome,
  id: id$p,
  name: name$p
}, Symbol.toStringTag, { value: "Module" }));
const id$o = "mr_robot";
const name$o = "Mr. Robot";
const colors$o = { "card_background_color": "#0A0A0A", "card_border_color": "#1F1F1F", "card_text_color": "#00FF00", "primary_color": "#00FF00", "secondary_color": "#FF0000", "title_color": "#00FF00", "subtitle_color": "#00AA00", "header_background_color": "#000000", "header_border_color": "#1A1A1A", "infobar_background_color": "#000000", "infobar_border_color": "#1A1A1A", "infobar_icon_color": "#00FF00", "infobar_label_color": "#00DD00", "infobar_value_color": "#00AA00", "consumer_background_color": "#050505", "consumer_border_color": "#0F0F0F", "consumer_primary_color": "#00FF00", "consumer_secondary_color": "#FF0000" };
const mr_robot = {
  id: id$o,
  name: name$o,
  colors: colors$o
};
const mr_robot$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$o,
  default: mr_robot,
  id: id$o,
  name: name$o
}, Symbol.toStringTag, { value: "Module" }));
const id$n = "nord";
const name$n = "Nord";
const colors$n = { "card_background_color": "rgba(46, 52, 64, 1)", "card_border_color": "rgba(136, 192, 208, 0.3)", "card_text_color": "rgba(236, 239, 244, 1)", "primary_color": "rgba(216, 222, 233, 1)", "secondary_color": "rgba(229, 233, 240, 0.8)", "title_color": "rgba(136, 192, 208, 1)", "subtitle_color": "rgba(216, 222, 233, 0.7)", "header_background_color": "rgba(59, 66, 82, 1)", "header_border_color": "rgba(136, 192, 208, 0.3)", "infobar_background_color": "rgba(59, 66, 82, 1)", "infobar_border_color": "rgba(136, 192, 208, 0.3)", "infobar_icon_color": "rgba(143, 188, 187, 1)", "infobar_label_color": "rgba(216, 222, 233, 0.7)", "infobar_value_color": "rgba(236, 239, 244, 1)", "consumer_background_color": "rgba(59, 66, 82, 1)", "consumer_border_color": "rgba(136, 192, 208, 0.3)", "consumer_primary_color": "rgba(216, 222, 233, 1)", "consumer_secondary_color": "rgba(216, 222, 233, 0.7)" };
const nord = {
  id: id$n,
  name: name$n,
  colors: colors$n
};
const nord$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$n,
  default: nord,
  id: id$n,
  name: name$n
}, Symbol.toStringTag, { value: "Module" }));
const id$m = "ocean";
const name$m = "Ocean";
const colors$m = { "card_background_color": "rgba(10, 25, 47, 1)", "card_border_color": "rgba(0, 180, 216, 0.3)", "card_text_color": "rgba(224, 242, 254, 1)", "primary_color": "rgba(56, 189, 248, 1)", "secondary_color": "rgba(125, 211, 252, 0.8)", "title_color": "rgba(14, 165, 233, 1)", "subtitle_color": "rgba(125, 211, 252, 0.7)", "header_background_color": "rgba(15, 35, 60, 1)", "header_border_color": "rgba(0, 180, 216, 0.3)", "infobar_background_color": "rgba(15, 35, 60, 1)", "infobar_border_color": "rgba(0, 180, 216, 0.3)", "infobar_icon_color": "rgba(56, 189, 248, 1)", "infobar_label_color": "rgba(125, 211, 252, 0.7)", "infobar_value_color": "rgba(224, 242, 254, 1)", "consumer_background_color": "rgba(15, 35, 60, 1)", "consumer_border_color": "rgba(0, 180, 216, 0.3)", "consumer_primary_color": "rgba(56, 189, 248, 1)", "consumer_secondary_color": "rgba(125, 211, 252, 0.7)" };
const ocean = {
  id: id$m,
  name: name$m,
  colors: colors$m
};
const ocean$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$m,
  default: ocean,
  id: id$m,
  name: name$m
}, Symbol.toStringTag, { value: "Module" }));
const id$l = "orange";
const name$l = "Orange";
const colors$l = { "card_background_color": "rgba(35, 20, 10, 1)", "card_border_color": "rgba(249, 115, 22, 0.3)", "card_text_color": "rgba(255, 247, 237, 1)", "primary_color": "rgba(251, 146, 60, 1)", "secondary_color": "rgba(253, 186, 116, 0.8)", "title_color": "rgba(249, 115, 22, 1)", "subtitle_color": "rgba(254, 215, 170, 0.7)", "header_background_color": "rgba(50, 30, 15, 1)", "header_border_color": "rgba(249, 115, 22, 0.3)", "infobar_background_color": "rgba(50, 30, 15, 1)", "infobar_border_color": "rgba(249, 115, 22, 0.3)", "infobar_icon_color": "rgba(251, 146, 60, 1)", "infobar_label_color": "rgba(254, 215, 170, 0.7)", "infobar_value_color": "rgba(255, 247, 237, 1)", "consumer_background_color": "rgba(50, 30, 15, 1)", "consumer_border_color": "rgba(249, 115, 22, 0.3)", "consumer_primary_color": "rgba(251, 146, 60, 1)", "consumer_secondary_color": "rgba(254, 215, 170, 0.7)" };
const orange = {
  id: id$l,
  name: name$l,
  colors: colors$l
};
const orange$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$l,
  default: orange,
  id: id$l,
  name: name$l
}, Symbol.toStringTag, { value: "Module" }));
const id$k = "pink";
const name$k = "Pink";
const colors$k = { "card_background_color": "rgba(35, 20, 25, 1)", "card_border_color": "rgba(236, 72, 153, 0.3)", "card_text_color": "rgba(255, 240, 245, 1)", "primary_color": "rgba(244, 114, 182, 1)", "secondary_color": "rgba(251, 182, 219, 0.8)", "title_color": "rgba(236, 72, 153, 1)", "subtitle_color": "rgba(253, 207, 232, 0.7)", "header_background_color": "rgba(45, 25, 30, 1)", "header_border_color": "rgba(236, 72, 153, 0.3)", "infobar_background_color": "rgba(45, 25, 30, 1)", "infobar_border_color": "rgba(236, 72, 153, 0.3)", "infobar_icon_color": "rgba(244, 114, 182, 1)", "infobar_label_color": "rgba(253, 207, 232, 0.7)", "infobar_value_color": "rgba(255, 240, 245, 1)", "consumer_background_color": "rgba(45, 25, 30, 1)", "consumer_border_color": "rgba(236, 72, 153, 0.3)", "consumer_primary_color": "rgba(244, 114, 182, 1)", "consumer_secondary_color": "rgba(253, 207, 232, 0.7)" };
const pink = {
  id: id$k,
  name: name$k,
  colors: colors$k
};
const pink$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$k,
  default: pink,
  id: id$k,
  name: name$k
}, Symbol.toStringTag, { value: "Module" }));
const id$j = "pirates";
const name$j = "Pirates of the Caribbean";
const colors$j = { "card_background_color": "#1A1208", "card_border_color": "#C19A6B", "card_text_color": "#F0E6D2", "primary_color": "#C19A6B", "secondary_color": "#FFD700", "title_color": "#C19A6B", "subtitle_color": "#FFD700", "header_background_color": "#20150A", "header_border_color": "#C19A6B", "infobar_background_color": "#20150A", "infobar_border_color": "#C19A6B", "infobar_icon_color": "#FFD700", "infobar_label_color": "#F0E6D2", "infobar_value_color": "#F0E6D2", "consumer_background_color": "#24180A", "consumer_border_color": "#C19A6B", "consumer_primary_color": "#C19A6B", "consumer_secondary_color": "#FFD700" };
const pirates = {
  id: id$j,
  name: name$j,
  colors: colors$j
};
const pirates$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$j,
  default: pirates,
  id: id$j,
  name: name$j
}, Symbol.toStringTag, { value: "Module" }));
const id$i = "purple";
const name$i = "Purple";
const colors$i = { "card_background_color": "rgba(24, 24, 40, 1)", "card_border_color": "rgba(168, 85, 247, 0.3)", "card_text_color": "rgba(250, 245, 255, 1)", "primary_color": "rgba(192, 132, 252, 1)", "secondary_color": "rgba(216, 180, 254, 0.8)", "title_color": "rgba(168, 85, 247, 1)", "subtitle_color": "rgba(216, 180, 254, 0.7)", "header_background_color": "rgba(30, 30, 50, 1)", "header_border_color": "rgba(168, 85, 247, 0.3)", "infobar_background_color": "rgba(30, 30, 50, 1)", "infobar_border_color": "rgba(168, 85, 247, 0.3)", "infobar_icon_color": "rgba(192, 132, 252, 1)", "infobar_label_color": "rgba(216, 180, 254, 0.7)", "infobar_value_color": "rgba(250, 245, 255, 1)", "consumer_background_color": "rgba(30, 30, 50, 1)", "consumer_border_color": "rgba(168, 85, 247, 0.3)", "consumer_primary_color": "rgba(192, 132, 252, 1)", "consumer_secondary_color": "rgba(216, 180, 254, 0.7)" };
const purple = {
  id: id$i,
  name: name$i,
  colors: colors$i
};
const purple$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$i,
  default: purple,
  id: id$i,
  name: name$i
}, Symbol.toStringTag, { value: "Module" }));
const id$h = "red";
const name$h = "Red";
const colors$h = { "card_background_color": "rgba(30, 15, 15, 1)", "card_border_color": "rgba(239, 68, 68, 0.3)", "card_text_color": "rgba(254, 242, 242, 1)", "primary_color": "rgba(239, 68, 68, 1)", "secondary_color": "rgba(252, 165, 165, 0.8)", "title_color": "rgba(239, 68, 68, 1)", "subtitle_color": "rgba(254, 202, 202, 0.7)", "header_background_color": "rgba(45, 20, 20, 1)", "header_border_color": "rgba(239, 68, 68, 0.3)", "infobar_background_color": "rgba(45, 20, 20, 1)", "infobar_border_color": "rgba(239, 68, 68, 0.3)", "infobar_icon_color": "rgba(239, 68, 68, 1)", "infobar_label_color": "rgba(254, 202, 202, 0.7)", "infobar_value_color": "rgba(254, 242, 242, 1)", "consumer_background_color": "rgba(45, 20, 20, 1)", "consumer_border_color": "rgba(239, 68, 68, 0.3)", "consumer_primary_color": "rgba(239, 68, 68, 1)", "consumer_secondary_color": "rgba(254, 202, 202, 0.7)" };
const red = {
  id: id$h,
  name: name$h,
  colors: colors$h
};
const red$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$h,
  default: red,
  id: id$h,
  name: name$h
}, Symbol.toStringTag, { value: "Module" }));
const id$g = "rick_morty";
const name$g = "Rick & Morty";
const colors$g = { "card_background_color": "#1A3A52", "card_border_color": "#22C55E", "card_text_color": "#F0F0F0", "primary_color": "#22C55E", "secondary_color": "#FACC15", "title_color": "#10B981", "subtitle_color": "#94A3B8", "header_background_color": "#0F2537", "header_border_color": "#16A34A", "infobar_background_color": "#0F2537", "infobar_border_color": "#16A34A", "infobar_icon_color": "#22C55E", "infobar_label_color": "#E0E0E0", "infobar_value_color": "#94A3B8", "consumer_background_color": "#0A1A28", "consumer_border_color": "#15803D", "consumer_primary_color": "#22C55E", "consumer_secondary_color": "#FACC15" };
const rick_morty = {
  id: id$g,
  name: name$g,
  colors: colors$g
};
const rick_morty$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$g,
  default: rick_morty,
  id: id$g,
  name: name$g
}, Symbol.toStringTag, { value: "Module" }));
const id$f = "silver";
const name$f = "Silver";
const colors$f = { "card_background_color": "rgba(30, 30, 35, 1)", "card_border_color": "rgba(200, 200, 200, 0.3)", "card_text_color": "rgba(255, 255, 255, 1)", "primary_color": "rgba(200, 200, 200, 1)", "secondary_color": "rgba(240, 240, 240, 0.8)", "title_color": "rgba(200, 200, 200, 1)", "subtitle_color": "rgba(240, 240, 240, 0.7)", "header_background_color": "rgba(40, 40, 45, 1)", "header_border_color": "rgba(200, 200, 200, 0.3)", "infobar_background_color": "rgba(40, 40, 45, 1)", "infobar_border_color": "rgba(200, 200, 200, 0.3)", "infobar_icon_color": "rgba(200, 200, 200, 1)", "infobar_label_color": "rgba(240, 240, 240, 0.7)", "infobar_value_color": "rgba(255, 255, 255, 1)", "consumer_background_color": "rgba(25, 25, 30, 1)", "consumer_border_color": "rgba(200, 200, 200, 0.3)", "consumer_primary_color": "rgba(200, 200, 200, 1)", "consumer_secondary_color": "rgba(240, 240, 240, 0.7)" };
const silver = {
  id: id$f,
  name: name$f,
  colors: colors$f
};
const silver$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$f,
  default: silver,
  id: id$f,
  name: name$f
}, Symbol.toStringTag, { value: "Module" }));
const id$e = "simpsons";
const name$e = "The Simpsons";
const colors$e = { "card_background_color": "#FFD90F", "card_border_color": "#FED41D", "card_text_color": "#1A1A1A", "primary_color": "#00A8E1", "secondary_color": "#FF6B35", "title_color": "#1A1A1A", "subtitle_color": "#4A4A4A", "header_background_color": "#FED41D", "header_border_color": "#FFB300", "infobar_background_color": "#FED41D", "infobar_border_color": "#FFB300", "infobar_icon_color": "#00A8E1", "infobar_label_color": "#1A1A1A", "infobar_value_color": "#4A4A4A", "consumer_background_color": "#FFE55C", "consumer_border_color": "#FFB300", "consumer_primary_color": "#00A8E1", "consumer_secondary_color": "#FF6B35" };
const simpsons = {
  id: id$e,
  name: name$e,
  colors: colors$e
};
const simpsons$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$e,
  default: simpsons,
  id: id$e,
  name: name$e
}, Symbol.toStringTag, { value: "Module" }));
const id$d = "slate";
const name$d = "Slate";
const colors$d = { "card_background_color": "rgba(30, 41, 59, 1)", "card_border_color": "rgba(148, 163, 184, 0.3)", "card_text_color": "rgba(226, 232, 240, 1)", "primary_color": "rgba(100, 116, 139, 1)", "secondary_color": "rgba(148, 163, 184, 1)", "title_color": "rgba(148, 163, 184, 1)", "subtitle_color": "rgba(148, 163, 184, 0.8)", "header_background_color": "rgba(51, 65, 85, 1)", "header_border_color": "rgba(148, 163, 184, 0.3)", "infobar_background_color": "rgba(51, 65, 85, 1)", "infobar_border_color": "rgba(148, 163, 184, 0.3)", "infobar_icon_color": "rgba(148, 163, 184, 1)", "infobar_label_color": "rgba(148, 163, 184, 0.8)", "infobar_value_color": "rgba(226, 232, 240, 1)", "consumer_background_color": "rgba(51, 65, 85, 1)", "consumer_border_color": "rgba(148, 163, 184, 0.3)", "consumer_primary_color": "rgba(148, 163, 184, 1)", "consumer_secondary_color": "rgba(148, 163, 184, 0.8)" };
const slate = {
  id: id$d,
  name: name$d,
  colors: colors$d
};
const slate$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$d,
  default: slate,
  id: id$d,
  name: name$d
}, Symbol.toStringTag, { value: "Module" }));
const id$c = "solarized";
const name$c = "Solarized Dark";
const colors$c = { "card_background_color": "rgba(0, 43, 54, 1)", "card_border_color": "rgba(88, 110, 117, 0.3)", "card_text_color": "rgba(131, 148, 150, 1)", "primary_color": "rgba(147, 161, 161, 1)", "secondary_color": "rgba(131, 148, 150, 0.8)", "title_color": "rgba(38, 139, 210, 1)", "subtitle_color": "rgba(101, 123, 131, 1)", "header_background_color": "rgba(7, 54, 66, 1)", "header_border_color": "rgba(88, 110, 117, 0.3)", "infobar_background_color": "rgba(7, 54, 66, 1)", "infobar_border_color": "rgba(88, 110, 117, 0.3)", "infobar_icon_color": "rgba(42, 161, 152, 1)", "infobar_label_color": "rgba(101, 123, 131, 1)", "infobar_value_color": "rgba(147, 161, 161, 1)", "consumer_background_color": "rgba(7, 54, 66, 1)", "consumer_border_color": "rgba(88, 110, 117, 0.3)", "consumer_primary_color": "rgba(147, 161, 161, 1)", "consumer_secondary_color": "rgba(101, 123, 131, 1)" };
const solarized = {
  id: id$c,
  name: name$c,
  colors: colors$c
};
const solarized$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$c,
  default: solarized,
  id: id$c,
  name: name$c
}, Symbol.toStringTag, { value: "Module" }));
const id$b = "spiderverse";
const name$b = "Spider-Verse";
const colors$b = { "card_background_color": "#0A0015", "card_border_color": "#FF004D", "card_text_color": "#EAEAEA", "primary_color": "#FF004D", "secondary_color": "#00FFFF", "title_color": "#FF004D", "subtitle_color": "#00FFFF", "header_background_color": "#15002A", "header_border_color": "#FF004D", "infobar_background_color": "#15002A", "infobar_border_color": "#FF004D", "infobar_icon_color": "#FF004D", "infobar_label_color": "#A0FFFF", "infobar_value_color": "#EAEAEA", "consumer_background_color": "#15002A", "consumer_border_color": "#FF004D", "consumer_primary_color": "#FF004D", "consumer_secondary_color": "#00FFFF" };
const spiderverse = {
  id: id$b,
  name: name$b,
  colors: colors$b
};
const spiderverse$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$b,
  default: spiderverse,
  id: id$b,
  name: name$b
}, Symbol.toStringTag, { value: "Module" }));
const id$a = "star_trek";
const name$a = "Star Trek";
const colors$a = { "card_background_color": "#02040A", "card_border_color": "#FFD700", "card_text_color": "#C0C0C0", "primary_color": "#40C0FF", "secondary_color": "#FFD700", "title_color": "#40C0FF", "subtitle_color": "#FFD700", "header_background_color": "#0A0D1A", "header_border_color": "#FFD700", "infobar_background_color": "#0A0D1A", "infobar_border_color": "#FFD700", "infobar_icon_color": "#40C0FF", "infobar_label_color": "#B0B0B0", "infobar_value_color": "#FFFFFF", "consumer_background_color": "#0C101C", "consumer_border_color": "#FFD700", "consumer_primary_color": "#40C0FF", "consumer_secondary_color": "#FFD700" };
const star_trek = {
  id: id$a,
  name: name$a,
  colors: colors$a
};
const star_trek$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$a,
  default: star_trek,
  id: id$a,
  name: name$a
}, Symbol.toStringTag, { value: "Module" }));
const id$9 = "star_wars";
const name$9 = "Star Wars";
const colors$9 = { "card_background_color": "#000000", "card_border_color": "#FFE81F", "card_text_color": "#FFFFFF", "primary_color": "#FFE81F", "secondary_color": "#FF3C00", "title_color": "#FFE81F", "subtitle_color": "#FF3C00", "header_background_color": "#0A0A0A", "header_border_color": "#FFE81F", "infobar_background_color": "#0A0A0A", "infobar_border_color": "#FFE81F", "infobar_icon_color": "#FFE81F", "infobar_label_color": "#FFB700", "infobar_value_color": "#FFFFFF", "consumer_background_color": "#0F0F0F", "consumer_border_color": "#FFE81F", "consumer_primary_color": "#FFE81F", "consumer_secondary_color": "#FF3C00" };
const star_wars = {
  id: id$9,
  name: name$9,
  colors: colors$9
};
const star_wars$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$9,
  default: star_wars,
  id: id$9,
  name: name$9
}, Symbol.toStringTag, { value: "Module" }));
const id$8 = "stranger_things";
const name$8 = "Stranger Things";
const colors$8 = { "card_background_color": "rgba(10, 0, 0, 1)", "card_border_color": "rgba(255, 0, 0, 0.3)", "card_text_color": "rgba(255, 255, 255, 1)", "primary_color": "rgba(255, 0, 0, 1)", "secondary_color": "rgba(139, 0, 0, 0.8)", "title_color": "rgba(255, 0, 0, 1)", "subtitle_color": "rgba(139, 0, 0, 0.7)", "header_background_color": "rgba(20, 10, 10, 1)", "header_border_color": "rgba(255, 0, 0, 0.3)", "infobar_background_color": "rgba(20, 10, 10, 1)", "infobar_border_color": "rgba(255, 0, 0, 0.3)", "infobar_icon_color": "rgba(255, 0, 0, 1)", "infobar_label_color": "rgba(139, 0, 0, 0.7)", "infobar_value_color": "rgba(255, 255, 255, 1)", "consumer_background_color": "rgba(5, 0, 0, 1)", "consumer_border_color": "rgba(255, 0, 0, 0.3)", "consumer_primary_color": "rgba(255, 0, 0, 1)", "consumer_secondary_color": "rgba(139, 0, 0, 0.7)" };
const stranger_things = {
  id: id$8,
  name: name$8,
  colors: colors$8
};
const stranger_things$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$8,
  default: stranger_things,
  id: id$8,
  name: name$8
}, Symbol.toStringTag, { value: "Module" }));
const id$7 = "sunset";
const name$7 = "Sunset";
const colors$7 = { "card_background_color": "rgba(30, 20, 40, 1)", "card_border_color": "rgba(255, 120, 80, 0.3)", "card_text_color": "rgba(255, 230, 200, 1)", "primary_color": "rgba(255, 170, 100, 1)", "secondary_color": "rgba(255, 200, 150, 0.8)", "title_color": "rgba(255, 140, 80, 1)", "subtitle_color": "rgba(255, 180, 120, 0.7)", "header_background_color": "rgba(40, 30, 50, 1)", "header_border_color": "rgba(255, 120, 80, 0.3)", "infobar_background_color": "rgba(40, 30, 50, 1)", "infobar_border_color": "rgba(255, 120, 80, 0.3)", "infobar_icon_color": "rgba(255, 170, 100, 1)", "infobar_label_color": "rgba(255, 180, 120, 0.7)", "infobar_value_color": "rgba(255, 230, 200, 1)", "consumer_background_color": "rgba(40, 30, 50, 1)", "consumer_border_color": "rgba(255, 120, 80, 0.3)", "consumer_primary_color": "rgba(255, 170, 100, 1)", "consumer_secondary_color": "rgba(255, 180, 120, 0.7)" };
const sunset = {
  id: id$7,
  name: name$7,
  colors: colors$7
};
const sunset$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$7,
  default: sunset,
  id: id$7,
  name: name$7
}, Symbol.toStringTag, { value: "Module" }));
const id$6 = "terminator";
const name$6 = "Terminator";
const colors$6 = { "card_background_color": "#1A1A1A", "card_border_color": "#B91C1C", "card_text_color": "#E0E0E0", "primary_color": "#DC2626", "secondary_color": "#7C3AED", "title_color": "#DC2626", "subtitle_color": "#9CA3AF", "header_background_color": "#262626", "header_border_color": "#991B1B", "infobar_background_color": "#262626", "infobar_border_color": "#991B1B", "infobar_icon_color": "#EF4444", "infobar_label_color": "#D1D5DB", "infobar_value_color": "#9CA3AF", "consumer_background_color": "#0F0F0F", "consumer_border_color": "#7C2D12", "consumer_primary_color": "#DC2626", "consumer_secondary_color": "#7C3AED" };
const terminator = {
  id: id$6,
  name: name$6,
  colors: colors$6
};
const terminator$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$6,
  default: terminator,
  id: id$6,
  name: name$6
}, Symbol.toStringTag, { value: "Module" }));
const id$5 = "the_expanse";
const name$5 = "The Expanse";
const colors$5 = { "card_background_color": "rgba(10, 16, 24, 1)", "card_border_color": "rgba(56, 189, 248, 0.3)", "card_text_color": "rgba(255, 255, 255, 1)", "primary_color": "rgba(56, 189, 248, 1)", "secondary_color": "rgba(14, 165, 233, 0.8)", "title_color": "rgba(56, 189, 248, 1)", "subtitle_color": "rgba(14, 165, 233, 0.7)", "header_background_color": "rgba(20, 26, 34, 1)", "header_border_color": "rgba(56, 189, 248, 0.3)", "infobar_background_color": "rgba(20, 26, 34, 1)", "infobar_border_color": "rgba(56, 189, 248, 0.3)", "infobar_icon_color": "rgba(56, 189, 248, 1)", "infobar_label_color": "rgba(14, 165, 233, 0.7)", "infobar_value_color": "rgba(255, 255, 255, 1)", "consumer_background_color": "rgba(5, 11, 19, 1)", "consumer_border_color": "rgba(56, 189, 248, 0.3)", "consumer_primary_color": "rgba(56, 189, 248, 1)", "consumer_secondary_color": "rgba(14, 165, 233, 0.7)" };
const the_expanse = {
  id: id$5,
  name: name$5,
  colors: colors$5
};
const the_expanse$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$5,
  default: the_expanse,
  id: id$5,
  name: name$5
}, Symbol.toStringTag, { value: "Module" }));
const id$4 = "the_office";
const name$4 = "The Office";
const colors$4 = { "card_background_color": "rgba(240, 242, 245, 1)", "card_border_color": "rgba(59, 130, 246, 0.3)", "card_text_color": "rgba(30, 30, 30, 1)", "primary_color": "rgba(59, 130, 246, 1)", "secondary_color": "rgba(96, 165, 250, 0.8)", "title_color": "rgba(59, 130, 246, 1)", "subtitle_color": "rgba(96, 165, 250, 0.7)", "header_background_color": "rgba(250, 252, 255, 1)", "header_border_color": "rgba(59, 130, 246, 0.3)", "infobar_background_color": "rgba(250, 252, 255, 1)", "infobar_border_color": "rgba(59, 130, 246, 0.3)", "infobar_icon_color": "rgba(59, 130, 246, 1)", "infobar_label_color": "rgba(96, 165, 250, 0.7)", "infobar_value_color": "rgba(30, 30, 30, 1)", "consumer_background_color": "rgba(235, 237, 240, 1)", "consumer_border_color": "rgba(59, 130, 246, 0.3)", "consumer_primary_color": "rgba(59, 130, 246, 1)", "consumer_secondary_color": "rgba(96, 165, 250, 0.7)" };
const the_office = {
  id: id$4,
  name: name$4,
  colors: colors$4
};
const the_office$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$4,
  default: the_office,
  id: id$4,
  name: name$4
}, Symbol.toStringTag, { value: "Module" }));
const id$3 = "tron";
const name$3 = "Tron";
const colors$3 = { "card_background_color": "rgba(5, 10, 15, 1)", "card_border_color": "rgba(0, 255, 255, 0.3)", "card_text_color": "rgba(255, 255, 255, 1)", "primary_color": "rgba(0, 255, 255, 1)", "secondary_color": "rgba(0, 180, 200, 0.8)", "title_color": "rgba(0, 255, 255, 1)", "subtitle_color": "rgba(0, 180, 200, 0.7)", "header_background_color": "rgba(15, 20, 25, 1)", "header_border_color": "rgba(0, 255, 255, 0.3)", "infobar_background_color": "rgba(15, 20, 25, 1)", "infobar_border_color": "rgba(0, 255, 255, 0.3)", "infobar_icon_color": "rgba(0, 255, 255, 1)", "infobar_label_color": "rgba(0, 180, 200, 0.7)", "infobar_value_color": "rgba(255, 255, 255, 1)", "consumer_background_color": "rgba(0, 5, 10, 1)", "consumer_border_color": "rgba(0, 255, 255, 0.3)", "consumer_primary_color": "rgba(0, 255, 255, 1)", "consumer_secondary_color": "rgba(0, 180, 200, 0.7)" };
const tron = {
  id: id$3,
  name: name$3,
  colors: colors$3
};
const tron$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$3,
  default: tron,
  id: id$3,
  name: name$3
}, Symbol.toStringTag, { value: "Module" }));
const id$2 = "turkis";
const name$2 = "Turkis";
const colors$2 = { "card_background_color": "rgba(10, 25, 30, 1)", "card_border_color": "rgba(20, 184, 166, 0.3)", "card_text_color": "rgba(240, 253, 250, 1)", "primary_color": "rgba(45, 212, 191, 1)", "secondary_color": "rgba(153, 246, 228, 0.8)", "title_color": "rgba(20, 184, 166, 1)", "subtitle_color": "rgba(153, 246, 228, 0.7)", "header_background_color": "rgba(15, 35, 40, 1)", "header_border_color": "rgba(20, 184, 166, 0.3)", "infobar_background_color": "rgba(15, 35, 40, 1)", "infobar_border_color": "rgba(20, 184, 166, 0.3)", "infobar_icon_color": "rgba(45, 212, 191, 1)", "infobar_label_color": "rgba(153, 246, 228, 0.7)", "infobar_value_color": "rgba(240, 253, 250, 1)", "consumer_background_color": "rgba(15, 35, 40, 1)", "consumer_border_color": "rgba(20, 184, 166, 0.3)", "consumer_primary_color": "rgba(45, 212, 191, 1)", "consumer_secondary_color": "rgba(153, 246, 228, 0.7)" };
const turkis = {
  id: id$2,
  name: name$2,
  colors: colors$2
};
const turkis$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$2,
  default: turkis,
  id: id$2,
  name: name$2
}, Symbol.toStringTag, { value: "Module" }));
const id$1 = "x_files";
const name$1 = "X Files";
const colors$1 = { "card_background_color": "rgba(10, 20, 10, 1)", "card_border_color": "rgba(34, 197, 94, 0.3)", "card_text_color": "rgba(255, 255, 255, 1)", "primary_color": "rgba(34, 197, 94, 1)", "secondary_color": "rgba(134, 239, 172, 0.8)", "title_color": "rgba(34, 197, 94, 1)", "subtitle_color": "rgba(134, 239, 172, 0.7)", "header_background_color": "rgba(20, 30, 20, 1)", "header_border_color": "rgba(34, 197, 94, 0.3)", "infobar_background_color": "rgba(20, 30, 20, 1)", "infobar_border_color": "rgba(34, 197, 94, 0.3)", "infobar_icon_color": "rgba(34, 197, 94, 1)", "infobar_label_color": "rgba(134, 239, 172, 0.7)", "infobar_value_color": "rgba(255, 255, 255, 1)", "consumer_background_color": "rgba(5, 15, 5, 1)", "consumer_border_color": "rgba(34, 197, 94, 0.3)", "consumer_primary_color": "rgba(34, 197, 94, 1)", "consumer_secondary_color": "rgba(134, 239, 172, 0.7)" };
const x_files = {
  id: id$1,
  name: name$1,
  colors: colors$1
};
const x_files$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors: colors$1,
  default: x_files,
  id: id$1,
  name: name$1
}, Symbol.toStringTag, { value: "Module" }));
const id = "yellow";
const name = "Yellow";
const colors = { "card_background_color": "rgba(35, 30, 10, 1)", "card_border_color": "rgba(234, 179, 8, 0.3)", "card_text_color": "rgba(254, 252, 232, 1)", "primary_color": "rgba(250, 204, 21, 1)", "secondary_color": "rgba(253, 224, 71, 0.8)", "title_color": "rgba(250, 204, 21, 1)", "subtitle_color": "rgba(254, 249, 195, 0.7)", "header_background_color": "rgba(50, 40, 10, 1)", "header_border_color": "rgba(234, 179, 8, 0.3)", "infobar_background_color": "rgba(50, 40, 10, 1)", "infobar_border_color": "rgba(234, 179, 8, 0.3)", "infobar_icon_color": "rgba(250, 204, 21, 1)", "infobar_label_color": "rgba(254, 249, 195, 0.7)", "infobar_value_color": "rgba(254, 252, 232, 1)", "consumer_background_color": "rgba(50, 40, 10, 1)", "consumer_border_color": "rgba(234, 179, 8, 0.3)", "consumer_primary_color": "rgba(250, 204, 21, 1)", "consumer_secondary_color": "rgba(254, 249, 195, 0.7)" };
const yellow = {
  id,
  name,
  colors
};
const yellow$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  colors,
  default: yellow,
  id,
  name
}, Symbol.toStringTag, { value: "Module" }));
const editorStyles = i$3`
    :host {
        display: block;
        position: relative;
        z-index: 1;
    }

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
        cursor: pointer;
        user-select: none;
        padding: 8px;
        margin: -8px;
        border-radius: 8px;
        transition: background 0.2s;
    }

    .section-header:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    .section-header ha-icon {
        --mdc-icon-size: 20px;
    }

    .section-header .expand-icon {
        margin-left: auto;
        transition: transform 0.2s;
    }

    .section-header .expand-icon.expanded {
        transform: rotate(180deg);
    }

    .section-content {
        margin-top: 12px;
        overflow: hidden;
    }

    .section-content.collapsed {
        display: none;
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

    .option-label.required::before {
        content: "* ";
        color: #ff5252;
        font-weight: bold;
    }

    .option-control {
        flex: 0 0 auto;
        min-width: 200px;
        position: relative;
    }

    ha-entity-picker,
    ha-selector-entity {
        position: relative;
        z-index: 100;
    }

    ha-entity-picker[opened],
    ha-selector-entity[opened] {
        z-index: 1000;
    }

    ha-combo-box {
        position: relative;
        color: #e1e1e1 !important;
    }

    ha-combo-box mwc-list-item {
        color: #e1e1e1 !important;
        background-color: #2c2c2c !important;
    }

    ha-combo-box mwc-menu {
        background-color: #2c2c2c !important;
    }

    ha-textfield, ha-select {
        width: 100%;
    }

    .autocomplete-wrapper {
        position: relative;
        width: 100%;
        z-index: 100;
    }

    .autocomplete-dropdown {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        right: 0;
        min-width: 100%;
        max-height: 200px;
        overflow-y: auto;
        background: #1c1c1c;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 4px;
        z-index: 99999;
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

    .consumer-section {
        position: relative;
        margin-bottom: 16px;
        border: 1px solid rgba(127, 127, 127, 0.3);
        border-radius: 8px;
        background: rgba(0, 0, 0, 0.1);
        padding: 12px;
    }

    .consumer-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        padding: 8px;
        margin: -8px;
        border-radius: 8px;
        user-select: none;
    }

    .consumer-header:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    .consumer-title {
        font-weight: bold;
        font-size: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
        min-width: 0;
    }

    .consumer-title-text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .consumer-header-actions {
        display: flex;
        align-items: center;
        gap: 4px;
        flex-shrink: 0;
    }

    .consumer-header-actions ha-icon-button {
        --mdc-icon-button-size: 32px;
        --mdc-icon-size: 18px;
    }

    .consumer-content {
        margin-top: 12px;
        overflow: hidden;
    }

    .consumer-content.collapsed {
        display: none;
    }

    .consumer-subsection {
        margin-top: 16px;
        padding-top: 12px;
        border-top: 1px solid rgba(127, 127, 127, 0.2);
    }

    .consumer-subsection-header {
        font-weight: 500;
        margin-bottom: 12px;
        cursor: pointer;
        padding: 8px;
        margin: -8px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
        user-select: none;
    }

    .consumer-subsection-header:hover {
        background: rgba(255, 255, 255, 0.05);
    }

    .consumer-subsection-content {
        margin-top: 12px;
    }

    .consumer-subsection-content.collapsed {
        display: none;
    }

    .expand-icon {
        transition: transform 0.2s;
    }

    .expand-icon.expanded {
        transform: rotate(180deg);
    }

    /* Nested Tabs Styles */
    .sub-tabs {
        display: flex;
        gap: 4px;
        border-bottom: 2px solid rgba(127, 127, 127, 0.2);
        margin: -4px 0 12px 0;
        flex-wrap: wrap;
    }

    .sub-tab {
        padding: 8px 16px;
        cursor: pointer;
        border: none;
        background: rgba(127, 127, 127, 0.08);
        color: rgba(255, 255, 255, 0.7);
        border-bottom: 2px solid transparent;
        margin-bottom: -2px;
        font-size: 14px;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        gap: 8px;
        border-radius: 6px 6px 0 0;
    }

    .sub-tab:hover {
        background: rgba(127, 127, 127, 0.18);
        color: rgba(255, 255, 255, 0.9);
    }

    .sub-tab.active {
        border-bottom-color: #3b82f6;
        background: rgba(59, 130, 246, 0.15);
        color: #60a5fa;
        font-weight: 500;
    }

    .sub-tab ha-icon {
        --mdc-icon-size: 18px;
    }

    .context-tabs {
        display: flex;
        gap: 4px;
        border-bottom: 1px solid rgba(127, 127, 127, 0.15);
        margin: -4px 0 12px 0;
        flex-wrap: wrap;
        padding-left: 16px;
    }

    .context-tab {
        padding: 4px 10px;
        cursor: pointer;
        border: none;
        background: none;
        color: rgba(255, 255, 255, 0.5);
        border-bottom: 2px solid transparent;
        margin-bottom: -1px;
        font-size: 12px;
        transition: all 0.2s;
        border-radius: 2px 2px 0 0;
    }

    .context-tab:hover {
        background: rgba(127, 127, 127, 0.1);
        color: rgba(255, 255, 255, 0.8);
    }

    .context-tab.active {
        border-bottom-color: #10b981;
        color: #34d399;
        font-weight: 500;
    }

    .sub-tab-content {
        margin-top: 4px;
    }
`;
class EventManager {
  constructor(dispatchEvent) {
    this.dispatchEvent = dispatchEvent;
  }
  fireEvent(config) {
    const event = new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }
  debouncedFireEvent(config, delay = 1e3) {
    if (this.debounceTimer) {
      window.clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = window.setTimeout(() => {
      this.fireEvent(config);
      this.debounceTimer = void 0;
    }, delay);
  }
  cleanup() {
    if (this.debounceTimer) {
      window.clearTimeout(this.debounceTimer);
    }
  }
}
function updateConfigValue(config, path, value) {
  const newConfig = JSON.parse(JSON.stringify(config));
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
  return newConfig;
}
function updateTapAction(config, path, key, value) {
  const newConfig = JSON.parse(JSON.stringify(config));
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
  return newConfig;
}
function renderCollapsibleSection(sectionId, icon, title, content, isExpanded, onToggle, infoText) {
  return x`
        <div class="section">
            <div class="section-header" @click=${onToggle}>
                <ha-icon icon="${icon}"></ha-icon>
                ${title}
                <ha-icon
                    class="expand-icon ${isExpanded ? "expanded" : ""}"
                    icon="mdi:chevron-down"
                ></ha-icon>
            </div>
            <div class="section-content ${isExpanded ? "" : "collapsed"}">
                ${""}
                ${content}
            </div>
        </div>
    `;
}
function renderTextfield(label, value, onChange, options = {}) {
  return x`
        <div class="option">
            <div class="option-label ${options.required ? "required" : ""}">
                ${label}
                ${options.helper ? x`<div class="info-text">${options.helper}</div>` : ""}
            </div>
            <div class="option-control">
                <ha-textfield
                    .value=${value || ""}
                    .placeholder=${options.placeholder || ""}
                    @input=${(ev) => {
    const target = ev.target;
    onChange(target.value);
  }}
                ></ha-textfield>
            </div>
        </div>
    `;
}
const LAYOUT_ELEMENTS = ["header", "pv_bar", "cards", "info_bar", "battery_bar", "consumers"];
const LAYOUT_ICONS = {
  header: "mdi:card-text",
  pv_bar: "mdi:solar-panel-large",
  cards: "mdi:view-grid",
  info_bar: "mdi:information",
  battery_bar: "mdi:battery-charging",
  consumers: "mdi:flash"
};
function renderLayoutOrderSelector(order, onChange, t2) {
  const currentOrder = order.length > 0 ? order : LAYOUT_ELEMENTS;
  const moveUp = (index) => {
    if (index === 0) return;
    const newOrder = [...currentOrder];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    onChange(newOrder);
  };
  const moveDown = (index) => {
    if (index === currentOrder.length - 1) return;
    const newOrder = [...currentOrder];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    onChange(newOrder);
  };
  const getLabel = (element) => {
    const labels = {
      header: t2.editor.layout_header || "Header",
      pv_bar: t2.editor.layout_pv_bar || "PV Bar",
      cards: t2.editor.layout_cards || "Cards",
      info_bar: t2.editor.layout_info_bar || "Info Bar",
      battery_bar: t2.editor.layout_battery_bar || "Battery Bar",
      consumers: t2.editor.layout_consumers || "Consumers"
    };
    return labels[element];
  };
  return x`
        <div class="layout-order-selector">
            ${currentOrder.map((element, index) => x`
                <div class="layout-order-item">
                    <div class="layout-order-info">
                        <ha-icon .icon=${LAYOUT_ICONS[element]}></ha-icon>
                        <span>${getLabel(element)}</span>
                    </div>
                    <div class="layout-order-controls">
                        <ha-icon-button
                            .disabled=${index === 0}
                            @click=${() => moveUp(index)}
                        >
                            <ha-icon icon="mdi:arrow-up"></ha-icon>
                        </ha-icon-button>
                        <ha-icon-button
                            .disabled=${index === currentOrder.length - 1}
                            @click=${() => moveDown(index)}
                        >
                            <ha-icon icon="mdi:arrow-down"></ha-icon>
                        </ha-icon-button>
                    </div>
                </div>
            `)}
        </div>
        <style>
            .layout-order-selector {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .layout-order-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 12px;
                background: var(--card-background-color, #1c1c1c);
                border-radius: 8px;
                border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
            }
            .layout-order-info {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .layout-order-info ha-icon {
                color: var(--primary-text-color, #ffffff);
            }
            .layout-order-info span {
                font-size: 14px;
                color: var(--primary-text-color, #ffffff);
            }
            .layout-order-controls {
                display: flex;
                gap: 4px;
            }
            .layout-order-controls ha-icon-button[disabled] {
                opacity: 0.3;
            }
        </style>
    `;
}
function renderCardOrderSelector(label, config, onChange, t2) {
  const defaultOrder = ["pv", "battery", "house", "grid"];
  const currentOrder = config.layout?.cards_order || defaultOrder;
  const visibility = config.layout?.cards_visibility || {
    pv: config.pv?.show !== false,
    battery: config.batterie?.show !== false,
    house: config.haus?.show !== false,
    grid: config.netz?.show !== false
  };
  const cardLabels = {
    pv: t2.editor.card_pv || "PV",
    battery: t2.editor.card_battery || "Battery",
    house: t2.editor.card_house || "House",
    grid: t2.editor.card_grid || "Grid"
  };
  const cardIcons = {
    pv: "mdi:solar-power",
    battery: "mdi:battery",
    house: "mdi:home",
    grid: "mdi:transmission-tower"
  };
  const moveUp = (index) => {
    if (index === 0) return;
    const newOrder = [...currentOrder];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    console.log("Card Order Selector - moveUp:", { from: index, to: index - 1, newOrder });
    onChange(["layout", "cards_order"], newOrder);
  };
  const moveDown = (index) => {
    if (index === currentOrder.length - 1) return;
    const newOrder = [...currentOrder];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    console.log("Card Order Selector - moveDown:", { from: index, to: index + 1, newOrder });
    onChange(["layout", "cards_order"], newOrder);
  };
  const toggleVisibility = (card) => {
    const newVisibility = { ...visibility, [card]: !visibility[card] };
    console.log("Card Order Selector - toggleVisibility:", { card, newVisibility });
    onChange(["layout", "cards_visibility"], newVisibility);
    const showPaths = {
      pv: ["pv", "show"],
      battery: ["batterie", "show"],
      house: ["haus", "show"],
      grid: ["netz", "show"]
    };
    if (showPaths[card]) {
      onChange(showPaths[card], newVisibility[card]);
    }
  };
  return x`
        <div class="card-order-selector">
            ${currentOrder.map((card, index) => x`
                <div class="card-order-item">
                    <div class="card-order-info">
                        <ha-icon
                            .icon="${visibility[card] ? "mdi:eye" : "mdi:eye-off"}"
                            @click="${() => toggleVisibility(card)}"
                            style="cursor: pointer; color: ${visibility[card] ? "#4caf50" : "#999"};"
                        ></ha-icon>
                        <ha-icon .icon="${cardIcons[card]}"></ha-icon>
                        <span style="${!visibility[card] ? "opacity: 0.5;" : ""}">${cardLabels[card]}</span>
                    </div>
                    <div class="card-order-controls">
                        <ha-icon-button
                            .disabled=${index === 0}
                            @click=${() => moveUp(index)}
                        >
                            <ha-icon icon="mdi:arrow-up"></ha-icon>
                        </ha-icon-button>
                        <ha-icon-button
                            .disabled=${index === currentOrder.length - 1}
                            @click=${() => moveDown(index)}
                        >
                            <ha-icon icon="mdi:arrow-down"></ha-icon>
                        </ha-icon-button>
                    </div>
                </div>
            `)}
        </div>
        <style>
            .card-order-selector {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .card-order-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 12px;
                background: var(--card-background-color, #1c1c1c);
                border-radius: 8px;
                border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
            }
            .card-order-info {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .card-order-info ha-icon {
                color: var(--primary-text-color, #ffffff);
            }
            .card-order-info span {
                font-size: 14px;
                color: var(--primary-text-color, #ffffff);
            }
            .card-order-controls {
                display: flex;
                gap: 4px;
            }
            .card-order-controls ha-icon-button[disabled] {
                opacity: 0.3;
            }
        </style>
    `;
}
function renderLayoutSubTab(config, expandedSections, onToggleSection, onChange, t2) {
  return x`
        ${renderCollapsibleSection(
    "layout_order",
    "mdi:order-bool-ascending",
    t2.editor.layout_order,
    x`
                <div style="padding: 8px 0;">
                    <p style="margin: 0 0 12px; font-size: 0.9em; opacity: 0.7;">${t2.editor.layout_order_helper}</p>
                    ${renderLayoutOrderSelector(
      config.layout?.order || ["header", "pv_bar", "cards", "info_bar", "battery_bar", "consumers"],
      (value) => onChange(["layout", "order"], value),
      t2
    )}
                </div>
            `,
    expandedSections.has("layout_order"),
    () => onToggleSection("layout_order")
  )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
    "cards_order",
    "mdi:card-multiple",
    t2.editor.cards_order,
    x`
                <div style="padding: 8px 0;">
                    <p style="margin: 0 0 12px; font-size: 0.9em; opacity: 0.7;">${t2.editor.cards_order_helper}</p>
                    ${renderCardOrderSelector(
      t2.editor.cards_order,
      config,
      onChange,
      t2
    )}
                </div>
            `,
    expandedSections.has("cards_order"),
    () => onToggleSection("cards_order")
  )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
    "layout",
    "mdi:grid",
    t2.editor.layout,
    x`
                ${renderTextfield(
      t2.editor.grid_gap,
      config.grid_gap,
      (value) => onChange(["grid_gap"], value),
      { placeholder: t2.editor.grid_gap_placeholder, helper: t2.editor.grid_gap_helper }
    )}
                ${renderTextfield(
      t2.editor.header_margin_bottom,
      config.style?.header_margin_bottom,
      (value) => onChange(["style", "header_margin_bottom"], value),
      { placeholder: "12px", helper: t2.editor.header_margin_bottom_helper }
    )}
                ${renderTextfield(
      t2.editor.infobar_gap,
      config.style?.infobar_gap,
      (value) => onChange(["style", "infobar_gap"], value),
      { placeholder: "6px", helper: t2.editor.infobar_gap_helper }
    )}
                ${renderTextfield(
      t2.editor.pv_bar_gap,
      config.style?.pv_bar_gap,
      (value) => onChange(["style", "pv_bar_gap"], value),
      { placeholder: "6px", helper: t2.editor.pv_bar_gap_helper }
    )}
                ${renderTextfield(
      t2.editor.battery_bar_gap,
      config.style?.battery_bar_gap,
      (value) => onChange(["style", "battery_bar_gap"], value),
      { placeholder: "6px", helper: t2.editor.battery_bar_gap_helper }
    )}
                ${renderTextfield(
      t2.editor.cursor,
      config.style?.card_cursor,
      (value) => onChange(["style", "card_cursor"], value),
      { placeholder: "pointer" }
    )}
            `,
    expandedSections.has("layout"),
    () => onToggleSection("layout")
  )}
    `;
}
function renderLanguageSelector(currentLang, onChange, options = {}) {
  const lang = currentLang || detectLanguage();
  const t2 = options.translations;
  return x`
        <div class="option">
            <div class="option-label">
                ${t2?.editor?.language || "Language"}
                <div class="info-text">${t2?.editor?.language_helper || "Select interface language"}</div>
            </div>
            <div class="option-control">
                <ha-combo-box
                    .value=${lang}
                    .items=${[
    { value: "de", label: "Deutsch" },
    { value: "en", label: "English" },
    { value: "fr", label: "Français" },
    { value: "it", label: "Italiano" },
    { value: "es", label: "Español" },
    { value: "nl", label: "Nederlands" },
    { value: "pt", label: "Português" },
    { value: "sv", label: "Svenska" },
    { value: "fi", label: "Suomi" },
    { value: "cs", label: "Čeština" },
    { value: "sl", label: "Slovenščina" },
    { value: "sk", label: "Slovenčina" },
    { value: "bs", label: "Bosanski" },
    { value: "sr", label: "Српски" }
  ]}
                    item-value-path="value"
                    item-label-path="label"
                    @value-changed=${(ev) => {
    const newValue = ev.detail?.value;
    if (newValue && newValue !== lang) {
      onChange(newValue);
    }
  }}
                ></ha-combo-box>
            </div>
        </div>
    `;
}
function renderLanguageSubTab(config, expandedSections, onToggleSection, onChange, t2) {
  return x`
        ${renderCollapsibleSection(
    "language",
    "mdi:translate",
    t2.editor.language,
    x`
                ${renderLanguageSelector(
      config.language,
      (value) => onChange(["language"], value),
      { translations: t2 }
    )}
            `,
    expandedSections.has("language"),
    () => onToggleSection("language")
  )}
    `;
}
function renderThemeSelector(currentTheme, config, onChange, options = {}) {
  const t2 = options.translations;
  const allThemes = getAllThemes();
  const themeItems = allThemes.map((theme) => ({
    value: theme.id,
    label: theme.name
  }));
  return x`
        <div class="option">
            <div class="option-label">
                ${t2?.editor?.theme || "Theme"}
                <div class="info-text">${t2?.editor?.theme_helper || "Select a predefined theme"}</div>
            </div>
            <div class="option-control">
                <ha-combo-box
                    .value=${currentTheme || ""}
                    .items=${themeItems}
                    item-value-path="value"
                    item-label-path="label"
                    allow-custom-value
                    @value-changed=${async (ev) => {
    const newValue = ev.detail?.value;
    const newConfig = { ...config };
    if (!newValue || newValue === "") {
      delete newConfig.theme;
      onChange(newConfig);
    } else {
      newConfig.theme = newValue;
      const themedConfig = await applyThemeToConfig(newConfig, newValue);
      onChange(themedConfig);
    }
  }}
                ></ha-combo-box>
            </div>
        </div>
    `;
}
function convertToHex(color) {
  if (!color) return "#ffffff";
  if (color.startsWith("#")) {
    return color.length === 7 ? color : "#ffffff";
  }
  if (color.startsWith("rgba") || color.startsWith("rgb")) {
    const match = color.match(/\d+/g);
    if (match && match.length >= 3) {
      const r2 = parseInt(match[0]);
      const g2 = parseInt(match[1]);
      const b2 = parseInt(match[2]);
      return "#" + [r2, g2, b2].map((x2) => {
        const hex = x2.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      }).join("");
    }
  }
  return "#ffffff";
}
function renderColorPicker(label, value, onChange, options = {}) {
  return x`
        <div class="option">
            <div class="option-label">
                ${label}
                ${options.helper ? x`<div class="info-text">${options.helper}</div>` : ""}
            </div>
            <div class="option-control">
                <div style="display: flex; gap: 8px; align-items: center;">
                    <input
                        type="color"
                        .value=${convertToHex(value || "")}
                        @input=${(ev) => {
    const target = ev.target;
    onChange(target.value);
  }}
                        style="width: 50px; height: 36px; cursor: pointer; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 4px;"
                    />
                    <ha-textfield
                        .value=${value || ""}
                        .placeholder=${options.placeholder || "rgba(255, 255, 255, 1) or #ffffff"}
                        @input=${(ev) => {
    const target = ev.target;
    onChange(target.value);
  }}
                        style="flex: 1;"
                    ></ha-textfield>
                </div>
            </div>
        </div>
    `;
}
function renderThemeTab(config, hass, expandedSections, onToggleSection, onChange, onConfigChange, t2) {
  return x`
        ${renderCollapsibleSection(
    "theme_selector",
    "mdi:palette",
    t2.editor.theme,
    x`
                ${renderThemeSelector(
      config.theme,
      config,
      (newConfig) => onConfigChange(newConfig),
      { translations: t2 }
    )}
            `,
    expandedSections.has("theme_selector"),
    () => onToggleSection("theme_selector")
  )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
    "theme_cards_basic",
    "mdi:card-multiple",
    t2.editor.theme_cards_basic || "Cards - Basic",
    x`
                <div class="info-text" style="margin-bottom: 12px;">${t2.editor.theme_editor_cards_note}</div>

                ${renderColorPicker(
      t2.editor.background_color,
      config.style?.card_background_color,
      (value) => onChange(["style", "card_background_color"], value),
      { placeholder: "rgba(21, 20, 27, 1)" }
    )}
                ${renderColorPicker(
      t2.editor.border_color,
      config.style?.card_border_color,
      (value) => onChange(["style", "card_border_color"], value),
      { placeholder: "rgba(255, 255, 255, 0.1)" }
    )}
                ${renderColorPicker(
      t2.editor.text_color,
      config.style?.card_text_color,
      (value) => onChange(["style", "card_text_color"], value),
      { placeholder: "white" }
    )}
                ${renderTextfield(
      t2.editor.border_radius,
      config.style?.card_border_radius,
      (value) => onChange(["style", "card_border_radius"], value),
      { placeholder: "16px" }
    )}
                ${renderTextfield(
      t2.editor.padding,
      config.style?.card_padding,
      (value) => onChange(["style", "card_padding"], value),
      { placeholder: "12px" }
    )}
            `,
    expandedSections.has("theme_cards_basic"),
    () => onToggleSection("theme_cards_basic")
  )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
    "theme_icons",
    "mdi:image-outline",
    t2.editor.icon_subsection || "Icons",
    x`
                ${renderTextfield(
      t2.editor.icon_size,
      config.style?.icon_size,
      (value) => onChange(["style", "icon_size"], value),
      { placeholder: "2em" }
    )}
                ${renderTextfield(
      t2.editor.icon_opacity,
      config.style?.icon_opacity,
      (value) => onChange(["style", "icon_opacity"], value),
      { placeholder: "1" }
    )}
                ${renderTextfield(
      t2.editor.icon_margin,
      config.style?.icon_margin,
      (value) => onChange(["style", "icon_margin"], value),
      { placeholder: "6px" }
    )}
            `,
    expandedSections.has("theme_icons"),
    () => onToggleSection("theme_icons")
  )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
    "theme_primary_text",
    "mdi:format-text",
    t2.editor.primary_text_subsection || "Primary Text",
    x`
                ${renderTextfield(
      t2.editor.primary_size,
      config.style?.primary_size,
      (value) => onChange(["style", "primary_size"], value),
      { placeholder: "1.2em" }
    )}
                ${renderTextfield(
      t2.editor.primary_line_height,
      config.style?.primary_line_height,
      (value) => onChange(["style", "primary_line_height"], value),
      { placeholder: "1.2" }
    )}
                ${renderColorPicker(
      t2.editor.primary_color_label,
      config.style?.primary_color,
      (value) => onChange(["style", "primary_color"], value),
      { placeholder: "white" }
    )}
                ${renderTextfield(
      t2.editor.primary_opacity,
      config.style?.primary_font_opacity,
      (value) => onChange(["style", "primary_font_opacity"], value),
      { placeholder: "1" }
    )}
                ${renderTextfield(
      t2.editor.primary_font_weight,
      config.style?.primary_font_weight,
      (value) => onChange(["style", "primary_font_weight"], value),
      { placeholder: "normal" }
    )}
            `,
    expandedSections.has("theme_primary_text"),
    () => onToggleSection("theme_primary_text")
  )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
    "theme_secondary_text",
    "mdi:format-text-variant",
    t2.editor.secondary_text_subsection || "Secondary Text",
    x`
                ${renderTextfield(
      t2.editor.secondary_size,
      config.style?.secondary_size,
      (value) => onChange(["style", "secondary_size"], value),
      { placeholder: "0.9em" }
    )}
                ${renderTextfield(
      t2.editor.secondary_line_height,
      config.style?.secondary_line_height,
      (value) => onChange(["style", "secondary_line_height"], value),
      { placeholder: "1.4" }
    )}
                ${renderColorPicker(
      t2.editor.secondary_color_label,
      config.style?.secondary_color,
      (value) => onChange(["style", "secondary_color"], value),
      { placeholder: "white" }
    )}
                ${renderTextfield(
      t2.editor.secondary_opacity,
      config.style?.secondary_font_opacity,
      (value) => onChange(["style", "secondary_font_opacity"], value),
      { placeholder: "0.7" }
    )}
                ${renderTextfield(
      t2.editor.secondary_font_weight,
      config.style?.secondary_font_weight,
      (value) => onChange(["style", "secondary_font_weight"], value),
      { placeholder: "normal" }
    )}
            `,
    expandedSections.has("theme_secondary_text"),
    () => onToggleSection("theme_secondary_text")
  )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
    "theme_tertiary_text",
    "mdi:format-text-variant-outline",
    t2.editor.tertiary_text_subsection || "Tertiary Text",
    x`
                ${renderTextfield(
      t2.editor.tertiary_size,
      config.style?.tertiary_size,
      (value) => onChange(["style", "tertiary_size"], value),
      { placeholder: "0.9em" }
    )}
                ${renderTextfield(
      t2.editor.tertiary_line_height,
      config.style?.tertiary_line_height,
      (value) => onChange(["style", "tertiary_line_height"], value),
      { placeholder: "1.4" }
    )}
                ${renderColorPicker(
      t2.editor.tertiary_color_label,
      config.style?.tertiary_color,
      (value) => onChange(["style", "tertiary_color"], value),
      { placeholder: "white" }
    )}
                ${renderTextfield(
      t2.editor.tertiary_opacity,
      config.style?.tertiary_font_opacity,
      (value) => onChange(["style", "tertiary_font_opacity"], value),
      { placeholder: "0.7" }
    )}
                ${renderTextfield(
      t2.editor.tertiary_font_weight,
      config.style?.tertiary_font_weight,
      (value) => onChange(["style", "tertiary_font_weight"], value),
      { placeholder: "normal" }
    )}
            `,
    expandedSections.has("theme_tertiary_text"),
    () => onToggleSection("theme_tertiary_text")
  )}
    `;
}
function renderGeneralMainTab(config, hass, expandedSections, activeSubTab, entityPickerStates, onToggleSection, onSubTabChange, onEntityPickerStateChange, onChange, onConfigChange, t2) {
  const subTabs = [
    { id: "layout", label: t2.editor.tab_layout || "Layout", icon: "mdi:grid" },
    { id: "language", label: t2.editor.tab_language || "Language", icon: "mdi:translate" },
    { id: "theme", label: t2.editor.tab_theme || "Theme", icon: "mdi:palette-outline" }
  ];
  return x`
        <div class="sub-tabs">
            ${subTabs.map((tab) => x`
                <button
                    class="sub-tab ${activeSubTab === tab.id ? "active" : ""}"
                    @click=${() => onSubTabChange(tab.id)}
                >
                    <ha-icon icon="${tab.icon}"></ha-icon>
                    <span>${tab.label}</span>
                </button>
            `)}
        </div>

        <div class="sub-tab-content">
            ${activeSubTab === "layout" ? renderLayoutSubTab(
    config,
    expandedSections,
    onToggleSection,
    onChange,
    t2
  ) : ""}

            ${activeSubTab === "language" ? renderLanguageSubTab(
    config,
    expandedSections,
    onToggleSection,
    onChange,
    t2
  ) : ""}

            ${activeSubTab === "theme" ? renderThemeTab(
    config,
    hass,
    expandedSections,
    onToggleSection,
    onChange,
    onConfigChange,
    t2
  ) : ""}
        </div>
    `;
}
function renderSwitch(label, value, onChange, options = {}) {
  return x`
        <div class="option">
            <div class="option-label">
                ${label}
                ${options.helper ? x`<div class="info-text">${options.helper}</div>` : ""}
            </div>
            <div class="option-control">
                <ha-switch
                    .checked=${value === true}
                    @change=${(ev) => {
    const target = ev.target;
    onChange(target.checked);
  }}
                ></ha-switch>
            </div>
        </div>
    `;
}
function renderHeaderTab(config, hass, expandedSections, onToggleSection, onChange, t2) {
  return x`
        ${renderCollapsibleSection(
    "header_visibility",
    "mdi:eye",
    t2.editor.header_visibility || "Visibility",
    x`
                ${renderSwitch(
      t2.editor.show_title,
      config.show_title,
      (value) => onChange(["show_title"], value)
    )}
                ${renderSwitch(
      t2.editor.show_subtitle,
      config.show_subtitle,
      (value) => onChange(["show_subtitle"], value)
    )}
                ${renderSwitch(
      t2.editor.show_icon,
      config.show_icon,
      (value) => onChange(["show_icon"], value)
    )}
            `,
    expandedSections.has("header_visibility"),
    () => onToggleSection("header_visibility")
  )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
    "header_content",
    "mdi:text",
    t2.editor.header_content || "Content",
    x`
                ${renderTextfield(
      t2.editor.title,
      config.title,
      (value) => onChange(["title"], value),
      { placeholder: t2.editor.title_placeholder, helper: t2.editor.title_helper }
    )}
                ${renderTextfield(
      t2.editor.subtitle,
      config.subtitle,
      (value) => onChange(["subtitle"], value),
      { placeholder: t2.editor.subtitle_placeholder, helper: t2.editor.subtitle_helper }
    )}
                ${renderTextfield(
      t2.editor.icon,
      config.icon,
      (value) => onChange(["icon"], value),
      { placeholder: t2.editor.icon_placeholder, helper: t2.editor.icon_helper }
    )}
            `,
    expandedSections.has("header_content"),
    () => onToggleSection("header_content")
  )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
    "header_title_styling",
    "mdi:format-title",
    t2.editor.header_title_styling || "Title Styling",
    x`
                ${renderTextfield(
      t2.editor.title_size,
      config.style?.title_size,
      (value) => onChange(["style", "title_size"], value),
      { placeholder: "1.5em" }
    )}
                ${renderTextfield(
      t2.editor.title_line_height,
      config.style?.title_line_height,
      (value) => onChange(["style", "title_line_height"], value),
      { placeholder: "1.2" }
    )}
                ${renderColorPicker(
      t2.editor.title_color,
      config.style?.title_color,
      (value) => onChange(["style", "title_color"], value),
      { placeholder: "white" }
    )}
                ${renderTextfield(
      t2.editor.title_font_weight,
      config.style?.title_font_weight,
      (value) => onChange(["style", "title_font_weight"], value),
      { placeholder: "bold" }
    )}
                ${renderTextfield(
      t2.editor.title_alignment,
      config.style?.title_align,
      (value) => onChange(["style", "title_align"], value),
      { placeholder: "center", helper: t2.editor.title_alignment_helper }
    )}
            `,
    expandedSections.has("header_title_styling"),
    () => onToggleSection("header_title_styling")
  )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
    "header_subtitle_styling",
    "mdi:format-title",
    t2.editor.header_subtitle_styling || "Subtitle Styling",
    x`
                ${renderTextfield(
      t2.editor.subtitle_size,
      config.style?.subtitle_size,
      (value) => onChange(["style", "subtitle_size"], value),
      { placeholder: "1em" }
    )}
                ${renderTextfield(
      t2.editor.subtitle_line_height,
      config.style?.subtitle_line_height,
      (value) => onChange(["style", "subtitle_line_height"], value),
      { placeholder: "1.4" }
    )}
                ${renderColorPicker(
      t2.editor.subtitle_color,
      config.style?.subtitle_color,
      (value) => onChange(["style", "subtitle_color"], value),
      { placeholder: "rgba(255,255,255,0.7)" }
    )}
                ${renderTextfield(
      t2.editor.subtitle_font_weight,
      config.style?.subtitle_font_weight,
      (value) => onChange(["style", "subtitle_font_weight"], value),
      { placeholder: "normal" }
    )}
                ${renderTextfield(
      t2.editor.subtitle_alignment,
      config.style?.subtitle_align,
      (value) => onChange(["style", "subtitle_align"], value),
      { placeholder: "center" }
    )}
                ${renderTextfield(
      t2.editor.title_subtitle_gap,
      config.style?.title_subtitle_gap,
      (value) => onChange(["style", "title_subtitle_gap"], value),
      { placeholder: "4px" }
    )}
            `,
    expandedSections.has("header_subtitle_styling"),
    () => onToggleSection("header_subtitle_styling")
  )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
    "header_icon_styling",
    "mdi:image",
    t2.editor.header_icon_styling || "Icon Styling",
    x`
                ${renderTextfield(
      t2.editor.header_icon_size,
      config.style?.header_icon_size,
      (value) => onChange(["style", "header_icon_size"], value),
      { placeholder: "1.5em" }
    )}
                ${renderColorPicker(
      t2.editor.header_icon_color,
      config.style?.header_icon_color,
      (value) => onChange(["style", "header_icon_color"], value),
      { placeholder: "white" }
    )}
                ${renderTextfield(
      t2.editor.header_icon_margin,
      config.style?.header_icon_margin,
      (value) => onChange(["style", "header_icon_margin"], value),
      { placeholder: "8px" }
    )}
            `,
    expandedSections.has("header_icon_styling"),
    () => onToggleSection("header_icon_styling")
  )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
    "header_background",
    "mdi:palette",
    t2.editor.header_background_subsection || "Header Background",
    x`
                ${renderSwitch(
      t2.editor.enable_header_background,
      config.style?.header_background_enabled,
      (value) => onChange(["style", "header_background_enabled"], value)
    )}

                ${config.style?.header_background_enabled ? x`
                    <div class="option">
                        <div class="option-label">${t2.editor.header_width}</div>
                        <div class="option-control">
                            <ha-combo-box
                                .value=${config.style?.header_width || "auto"}
                                .items=${[
      { value: "auto", label: t2.editor.header_width_auto },
      { value: "full", label: t2.editor.header_width_full }
    ]}
                                item-value-path="value"
                                item-label-path="label"
                                @value-changed=${(ev) => {
      const newValue = ev.detail?.value;
      if (newValue) onChange(["style", "header_width"], newValue);
    }}
                            ></ha-combo-box>
                        </div>
                    </div>

                    ${renderColorPicker(
      t2.editor.header_background_color,
      config.style?.header_background_color,
      (value) => onChange(["style", "header_background_color"], value),
      { placeholder: "rgba(21, 20, 27, 1)" }
    )}
                    ${renderColorPicker(
      t2.editor.header_border_color,
      config.style?.header_border_color,
      (value) => onChange(["style", "header_border_color"], value),
      { placeholder: "rgba(255, 255, 255, 0.1)" }
    )}
                    ${renderTextfield(
      t2.editor.header_border_radius,
      config.style?.header_border_radius,
      (value) => onChange(["style", "header_border_radius"], value),
      { placeholder: "16px" }
    )}
                    ${renderTextfield(
      t2.editor.header_padding,
      config.style?.header_padding,
      (value) => onChange(["style", "header_padding"], value),
      { placeholder: "12px" }
    )}
                    ${renderTextfield(
      t2.editor.header_box_shadow,
      config.style?.header_box_shadow,
      (value) => onChange(["style", "header_box_shadow"], value),
      { placeholder: "0 2px 8px 0 rgba(0, 0, 0, 0.15)" }
    )}
                ` : ""}
            `,
    expandedSections.has("header_background"),
    () => onToggleSection("header_background")
  )}
    `;
}
function renderEntityPicker(label, value, hass, state, onChange, onStateChange, options = {}) {
  if (!hass) return x``;
  let entities = Object.keys(hass.states).sort();
  if (options.include_domains && options.include_domains.length > 0) {
    entities = entities.filter((entityId) => {
      const domain = entityId.split(".")[0];
      return options.include_domains.includes(domain);
    });
  }
  const showDropdown = state.show;
  return x`
        <div class="option" style="${showDropdown ? "z-index: 1000; position: relative;" : ""}">
            <div class="option-label ${options.required ? "required" : ""}">
                ${label}
                ${options.helper ? x`<div class="info-text">${options.helper}</div>` : ""}
            </div>
            <div class="option-control">
                <div class="autocomplete-wrapper">
                    <ha-textfield
                        .value=${value || ""}
                        .placeholder=${options.translations?.editor?.select_entity || "Select Entity"}
                        @input=${(ev) => {
    const target = ev.target;
    const inputValue = target.value;
    let filtered = inputValue ? entities.filter((e2) => e2.toLowerCase().includes(inputValue.toLowerCase())) : entities;
    filtered = filtered.slice(0, 50);
    onStateChange({
      results: filtered,
      show: filtered.length > 0
    });
    onChange(inputValue || "");
  }}
                        @focus=${(ev) => {
    const currentValue = value || "";
    if (!currentValue) {
      onStateChange({
        results: entities.slice(0, 50),
        show: true
      });
    }
  }}
                        @blur=${() => {
    setTimeout(() => {
      onStateChange({ ...state, show: false });
    }, 200);
  }}
                    ></ha-textfield>

                    ${showDropdown ? x`
                        <div class="autocomplete-dropdown" @mousedown=${(ev) => ev.preventDefault()}>
                            ${state.results.map((entity) => x`
                                <div
                                    class="autocomplete-item"
                                    @click=${() => {
    onChange(entity);
    onStateChange({ ...state, show: false });
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
function renderIconPicker(label, value, hass, onChange, options = {}) {
  return x`
        <div class="option">
            <div class="option-label">
                ${label}
                ${options.helper ? x`<div class="info-text">${options.helper}</div>` : ""}
            </div>
            <div class="option-control">
                <ha-icon-picker
                    .hass=${hass}
                    .value=${value || ""}
                    .label=${options.translations?.editor?.select_icon || "Select Icon"}
                    @value-changed=${(ev) => {
    ev.stopPropagation();
    const newValue = ev.detail?.value || "";
    onChange(newValue);
  }}
                ></ha-icon-picker>
            </div>
        </div>
    `;
}
function renderActionSelector(label, action, onChange, options = {}) {
  const t2 = options.translations;
  const actions = [
    { value: "none", label: t2?.editor?.action_none || "None" },
    { value: "more-info", label: t2?.editor?.action_more_info || "More Info" },
    { value: "navigate", label: t2?.editor?.action_navigate || "Navigate" },
    { value: "url", label: t2?.editor?.action_url || "URL" },
    { value: "call-service", label: t2?.editor?.action_call_service || "Call Service" }
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
                    @value-changed=${(ev) => onChange("action", ev.detail.value)}
                ></ha-combo-box>
            </div>
        </div>

        ${action?.action === "navigate" ? x`
            <div class="option">
                <div class="option-label">${t2?.editor?.action_navigation_path || "Navigation Path"}</div>
                <div class="option-control">
                    <ha-textfield
                        .value=${action.navigation_path || ""}
                        placeholder="/lovelace/view"
                        @input=${(ev) => onChange("navigation_path", ev.target.value)}
                    ></ha-textfield>
                </div>
            </div>
        ` : ""}

        ${action?.action === "url" ? x`
            <div class="option">
                <div class="option-label">${t2?.editor?.action_url_label || "URL"}</div>
                <div class="option-control">
                    <ha-textfield
                        .value=${action.url_path || ""}
                        placeholder="https://example.com"
                        @input=${(ev) => onChange("url_path", ev.target.value)}
                    ></ha-textfield>
                </div>
            </div>
        ` : ""}

        ${action?.action === "call-service" ? x`
            <div class="option">
                <div class="option-label">${t2?.editor?.action_service || "Service"}</div>
                <div class="option-control">
                    <ha-textfield
                        .value=${action.service || ""}
                        placeholder="light.turn_on"
                        @input=${(ev) => onChange("service", ev.target.value)}
                    ></ha-textfield>
                </div>
            </div>
        ` : ""}
    `;
}
function renderInfoBarTab(config, hass, expandedSections, entityPickerStates, onToggleSection, onEntityPickerStateChange, onChange, onTapActionChange, t2) {
  const renderTapActions = (cardType) => {
    const actionConfig = config.info_bar;
    return renderCollapsibleSection(
      `${cardType}_tap_actions`,
      "mdi:gesture-tap",
      "Tap Actions",
      x`
                ${renderActionSelector(
        "Tap Action",
        actionConfig?.tap_action,
        (key, value) => onTapActionChange([cardType, "tap_action"], key, value),
        { translations: t2 }
      )}
                ${renderActionSelector(
        "Double Tap",
        actionConfig?.double_tap_action,
        (key, value) => onTapActionChange([cardType, "double_tap_action"], key, value),
        { translations: t2 }
      )}
                ${renderActionSelector(
        "Hold Action",
        actionConfig?.hold_action,
        (key, value) => onTapActionChange([cardType, "hold_action"], key, value),
        { translations: t2 }
      )}
            `,
      expandedSections.has(`${cardType}_tap_actions`),
      () => onToggleSection(`${cardType}_tap_actions`)
    );
  };
  return x`
        ${renderCollapsibleSection(
    "infobar_main",
    "mdi:information",
    t2.editor.infobar_settings,
    x`
                ${renderSwitch(
      t2.editor.enable_infobar,
      config.info_bar?.show,
      (value) => onChange(["info_bar", "show"], value)
    )}
            `,
    expandedSections.has("infobar_main"),
    () => onToggleSection("infobar_main")
  )}

        ${config.info_bar?.show ? x`
            <div class="divider"></div>

            ${renderTapActions("info_bar")}

            <div class="divider"></div>

            ${renderCollapsibleSection(
    "infobar_item1",
    "mdi:numeric-1-box",
    `${t2.editor.item} 1`,
    x`
                    <div class="option">
                        <div class="option-label">${t2.editor.item_calc_type}</div>
                        <div class="option-control">
                            <ha-combo-box
                                .value=${config.info_bar?.item1_calc_type || config.info_bar?.calculation_mode || "autarky"}
                                .items=${[
      { value: "entity", label: t2.editor.calc_type_entity },
      { value: "autarky", label: t2.editor.calc_type_autarky },
      { value: "self_consumption", label: t2.editor.calc_type_self_consumption },
      { value: "runtime", label: t2.editor.calc_type_runtime },
      { value: "chargetime", label: t2.editor.calc_type_chargetime }
    ]}
                                item-value-path="value"
                                item-label-path="label"
                                @value-changed=${(ev) => {
      const newValue = ev.detail?.value;
      if (newValue) onChange(["info_bar", "item1_calc_type"], newValue);
    }}
                            ></ha-combo-box>
                        </div>
                    </div>
                    ${renderEntityPicker(
      t2.editor.entity,
      config.info_bar?.item1?.entity,
      hass,
      entityPickerStates.get("info_bar.item1.entity") || { results: [], show: false },
      (value) => onChange(["info_bar", "item1", "entity"], value),
      (state) => onEntityPickerStateChange("info_bar.item1.entity", state),
      { translations: { editor: t2.editor } }
    )}
                    ${renderIconPicker(
      t2.editor.icon_label,
      config.info_bar?.item1?.icon,
      hass,
      (value) => onChange(["info_bar", "item1", "icon"], value),
      { translations: { editor: t2.editor } }
    )}
                    ${renderTextfield(
      t2.editor.label,
      config.info_bar?.item1?.label,
      (value) => onChange(["info_bar", "item1", "label"], value),
      { placeholder: t2.editor.default_autarky }
    )}
                    ${renderTextfield(
      t2.editor.unit,
      config.info_bar?.item1?.unit,
      (value) => onChange(["info_bar", "item1", "unit"], value),
      { placeholder: "%" }
    )}
                `,
    expandedSections.has("infobar_item1"),
    () => onToggleSection("infobar_item1")
  )}

            <div class="divider"></div>

            ${renderCollapsibleSection(
    "infobar_item2",
    "mdi:numeric-2-box",
    `${t2.editor.item} 2`,
    x`
                    <div class="option">
                        <div class="option-label">${t2.editor.item_calc_type}</div>
                        <div class="option-control">
                            <ha-combo-box
                                .value=${config.info_bar?.item2_calc_type || "runtime"}
                                .items=${[
      { value: "entity", label: t2.editor.calc_type_entity },
      { value: "autarky", label: t2.editor.calc_type_autarky },
      { value: "self_consumption", label: t2.editor.calc_type_self_consumption },
      { value: "runtime", label: t2.editor.calc_type_runtime },
      { value: "chargetime", label: t2.editor.calc_type_chargetime }
    ]}
                                item-value-path="value"
                                item-label-path="label"
                                @value-changed=${(ev) => {
      const newValue = ev.detail?.value;
      if (newValue) onChange(["info_bar", "item2_calc_type"], newValue);
    }}
                            ></ha-combo-box>
                        </div>
                    </div>
                    ${renderEntityPicker(
      t2.editor.entity,
      config.info_bar?.item2?.entity,
      hass,
      entityPickerStates.get("info_bar.item2.entity") || { results: [], show: false },
      (value) => onChange(["info_bar", "item2", "entity"], value),
      (state) => onEntityPickerStateChange("info_bar.item2.entity", state),
      { translations: { editor: t2.editor } }
    )}
                    ${renderIconPicker(
      t2.editor.icon_label,
      config.info_bar?.item2?.icon,
      hass,
      (value) => onChange(["info_bar", "item2", "icon"], value),
      { translations: { editor: t2.editor } }
    )}
                    ${renderTextfield(
      t2.editor.label,
      config.info_bar?.item2?.label,
      (value) => onChange(["info_bar", "item2", "label"], value),
      { placeholder: t2.editor.default_runtime }
    )}
                    ${renderTextfield(
      t2.editor.unit,
      config.info_bar?.item2?.unit,
      (value) => onChange(["info_bar", "item2", "unit"], value)
    )}
                `,
    expandedSections.has("infobar_item2"),
    () => onToggleSection("infobar_item2")
  )}

            <div class="divider"></div>

            ${renderCollapsibleSection(
    "infobar_item3",
    "mdi:numeric-3-box",
    `${t2.editor.item} 3`,
    x`
                    <div class="option">
                        <div class="option-label">${t2.editor.item_calc_type}</div>
                        <div class="option-control">
                            <ha-combo-box
                                .value=${config.info_bar?.item3_calc_type || "chargetime"}
                                .items=${[
      { value: "entity", label: t2.editor.calc_type_entity },
      { value: "autarky", label: t2.editor.calc_type_autarky },
      { value: "self_consumption", label: t2.editor.calc_type_self_consumption },
      { value: "runtime", label: t2.editor.calc_type_runtime },
      { value: "chargetime", label: t2.editor.calc_type_chargetime }
    ]}
                                item-value-path="value"
                                item-label-path="label"
                                @value-changed=${(ev) => {
      const newValue = ev.detail?.value;
      if (newValue) onChange(["info_bar", "item3_calc_type"], newValue);
    }}
                            ></ha-combo-box>
                        </div>
                    </div>
                    ${renderEntityPicker(
      t2.editor.entity,
      config.info_bar?.item3?.entity,
      hass,
      entityPickerStates.get("info_bar.item3.entity") || { results: [], show: false },
      (value) => onChange(["info_bar", "item3", "entity"], value),
      (state) => onEntityPickerStateChange("info_bar.item3.entity", state),
      { translations: { editor: t2.editor } }
    )}
                    ${renderIconPicker(
      t2.editor.icon_label,
      config.info_bar?.item3?.icon,
      hass,
      (value) => onChange(["info_bar", "item3", "icon"], value),
      { translations: { editor: t2.editor } }
    )}
                    ${renderTextfield(
      t2.editor.label,
      config.info_bar?.item3?.label,
      (value) => onChange(["info_bar", "item3", "label"], value),
      { placeholder: t2.editor.default_chargetime }
    )}
                    ${renderTextfield(
      t2.editor.unit,
      config.info_bar?.item3?.unit,
      (value) => onChange(["info_bar", "item3", "unit"], value)
    )}
                `,
    expandedSections.has("infobar_item3"),
    () => onToggleSection("infobar_item3")
  )}

            <div class="divider"></div>

            ${renderCollapsibleSection(
    "infobar_styling",
    "mdi:palette",
    "Info Bar Styling",
    x`
                    ${renderColorPicker(
      t2.editor.background_color,
      config.info_bar?.style?.background_color,
      (value) => onChange(["info_bar", "style", "background_color"], value)
    )}
                    ${renderColorPicker(
      t2.editor.border_color,
      config.info_bar?.style?.border_color,
      (value) => onChange(["info_bar", "style", "border_color"], value)
    )}
                    ${renderTextfield(
      t2.editor.border_radius,
      config.info_bar?.style?.border_radius,
      (value) => onChange(["info_bar", "style", "border_radius"], value),
      { placeholder: "16px" }
    )}
                    ${renderTextfield(
      t2.editor.padding,
      config.info_bar?.style?.padding,
      (value) => onChange(["info_bar", "style", "padding"], value),
      { placeholder: "12px" }
    )}
                    ${renderTextfield(
      "Gap",
      config.info_bar?.style?.gap,
      (value) => onChange(["info_bar", "style", "gap"], value),
      { placeholder: "8px" }
    )}
                    ${renderTextfield(
      "Icon Size",
      config.info_bar?.style?.icon_size,
      (value) => onChange(["info_bar", "style", "icon_size"], value),
      { placeholder: "1.5em" }
    )}
                    ${renderColorPicker(
      "Icon Color",
      config.info_bar?.style?.icon_color,
      (value) => onChange(["info_bar", "style", "icon_color"], value)
    )}
                    ${renderTextfield(
      "Label Size",
      config.info_bar?.style?.label_size,
      (value) => onChange(["info_bar", "style", "label_size"], value),
      { placeholder: "0.8em" }
    )}
                    ${renderTextfield(
      t2.editor.label_line_height,
      config.info_bar?.style?.label_line_height,
      (value) => onChange(["info_bar", "style", "label_line_height"], value),
      { placeholder: "1.2" }
    )}
                    ${renderColorPicker(
      "Label Color",
      config.info_bar?.style?.label_color,
      (value) => onChange(["info_bar", "style", "label_color"], value)
    )}
                    ${renderTextfield(
      "Label Font Weight",
      config.info_bar?.style?.label_font_weight,
      (value) => onChange(["info_bar", "style", "label_font_weight"], value),
      { placeholder: "normal" }
    )}
                    ${renderTextfield(
      "Value Size",
      config.info_bar?.style?.value_size,
      (value) => onChange(["info_bar", "style", "value_size"], value),
      { placeholder: "1em" }
    )}
                    ${renderTextfield(
      t2.editor.value_line_height,
      config.info_bar?.style?.value_line_height,
      (value) => onChange(["info_bar", "style", "value_line_height"], value),
      { placeholder: "1.4" }
    )}
                    ${renderColorPicker(
      "Value Color",
      config.info_bar?.style?.value_color,
      (value) => onChange(["info_bar", "style", "value_color"], value)
    )}
                    ${renderTextfield(
      "Value Font Weight",
      config.info_bar?.style?.value_font_weight,
      (value) => onChange(["info_bar", "style", "value_font_weight"], value),
      { placeholder: "bold" }
    )}
                `,
    expandedSections.has("infobar_styling"),
    () => onToggleSection("infobar_styling")
  )}
        ` : ""}
    `;
}
function renderNumberfield(label, value, onChange, options = {}) {
  return x`
        <div class="option">
            <div class="option-label">
                ${label}
                ${options.helper ? x`<div class="info-text">${options.helper}</div>` : ""}
            </div>
            <div class="option-control">
                <ha-textfield
                    type="number"
                    .value=${value?.toString() || ""}
                    .min=${options.min?.toString()}
                    .max=${options.max?.toString()}
                    .step=${options.step?.toString() || "1"}
                    @input=${(ev) => {
    const target = ev.target;
    const newValue = target.value ? Number(target.value) : void 0;
    onChange(newValue);
  }}
                ></ha-textfield>
            </div>
        </div>
    `;
}
function renderActionTargetSelector(label, value, onChange, options) {
  const t2 = options?.translations?.editor || {};
  const items = [
    { value: "none", label: t2.action_target_none || "Keine Aktion" },
    { value: "entity", label: t2.action_target_entity || "Entity Toggle" },
    { value: "custom_entity", label: t2.action_target_custom_entity || "Custom Entity Toggle" },
    { value: "custom_action", label: t2.action_target_custom_action || "Custom Action" }
  ];
  return x`
        <div class="option">
            <div class="option-label">
                ${label}
                ${options?.helper ? x`<div class="info-text">${options.helper}</div>` : ""}
            </div>
            <div class="option-control">
                <ha-combo-box
                    .value=${value || "none"}
                    .items=${items}
                    item-value-path="value"
                    item-label-path="label"
                    @value-changed=${(ev) => {
    const newValue = ev.detail?.value;
    if (newValue) onChange(newValue);
  }}
                ></ha-combo-box>
            </div>
        </div>
    `;
}
function renderConsumerItem(item, index, isExpanded, expandedSubsections, hass, entityPickerStates, onToggle, onToggleSubsection, onEntityPickerStateChange, onChange, onTapActionChange, onMoveUp, onMoveDown, onDuplicate, onRemove, isFirst, isLast, t2) {
  const entityLabel = item.entity || t2.editor.consumer_entity;
  const basePath = ["consumers", "items", index.toString()];
  return x`
        <div class="consumer-section">
            <div class="consumer-header" @click=${onToggle}>
                <div class="consumer-title">
                    <ha-icon
                        class="expand-icon ${isExpanded ? "expanded" : ""}"
                        icon="mdi:chevron-down"
                    ></ha-icon>
                    <span class="consumer-title-text">
                        ${t2.editor.consumer_entity} ${index + 1}
                        ${item.entity ? x` <span style="opacity: 0.6; font-weight: normal; font-size: 0.9em;">(${entityLabel})</span>` : ""}
                    </span>
                </div>
                <div class="consumer-header-actions" @click=${(e2) => e2.stopPropagation()}>
                    ${!isFirst ? x`
                        <ha-icon-button
                            .path=${"M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"}
                            @click=${onMoveUp}
                            title="${t2.editor.move_up}"
                        ></ha-icon-button>
                    ` : ""}
                    ${!isLast ? x`
                        <ha-icon-button
                            .path=${"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"}
                            @click=${onMoveDown}
                            title="${t2.editor.move_down}"
                        ></ha-icon-button>
                    ` : ""}
                    <ha-icon-button
                        .path=${"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"}
                        @click=${onDuplicate}
                        title="${t2.editor.duplicate}"
                        style="color: rgba(33, 150, 243, 1);"
                    ></ha-icon-button>
                    <ha-icon-button
                        .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}
                        @click=${onRemove}
                        title="${t2.editor.delete}"
                        style="color: rgba(244,67,54,1);"
                    ></ha-icon-button>
                </div>
            </div>

            <div class="consumer-content ${isExpanded ? "" : "collapsed"}">
                ${renderEntityPicker(
    t2.editor.consumer_entity,
    item.entity,
    hass,
    entityPickerStates.get(`${basePath.join(".")}.entity`) || { results: [], show: false },
    (value) => onChange([...basePath, "entity"], value),
    (state) => onEntityPickerStateChange(`${basePath.join(".")}.entity`, state),
    { required: true, translations: { editor: t2.editor } }
  )}
                ${renderIconPicker(
    t2.editor.consumer_icon,
    item.icon,
    hass,
    (value) => onChange([...basePath, "icon"], value),
    { translations: { editor: t2.editor } }
  )}
                ${renderTextfield(
    t2.editor.consumer_label,
    item.label,
    (value) => onChange([...basePath, "label"], value)
  )}
                ${renderNumberfield(
    t2.editor.consumer_threshold,
    item.threshold,
    (value) => onChange([...basePath, "threshold"], value),
    { min: 0, max: 1e4, step: 1 }
  )}
                ${renderSwitch(
    t2.editor.consumer_auto_color,
    item.auto_color !== false,
    (value) => onChange([...basePath, "auto_color"], value),
    { helper: t2.editor.consumer_auto_color_helper }
  )}

                <div class="consumer-subsection">
                    <div class="consumer-subsection-header" @click=${() => onToggleSubsection("texts")}>
                        <ha-icon icon="mdi:text"></ha-icon>
                        ${t2.editor.additional_texts}
                        <ha-icon
                            class="expand-icon ${expandedSubsections.has("texts") ? "expanded" : ""}"
                            icon="mdi:chevron-down"
                            style="margin-left: auto;"
                        ></ha-icon>
                    </div>
                    <div class="consumer-subsection-content ${expandedSubsections.has("texts") ? "" : "collapsed"}">
                        ${renderSwitch(
    t2.editor.consumer_show_primary,
    item.show_primary !== false,
    (value) => onChange([...basePath, "show_primary"], value)
  )}
                        ${renderEntityPicker(
    t2.editor.consumer_primary_entity,
    item.primary_entity,
    hass,
    entityPickerStates.get(`${basePath.join(".")}.primary_entity`) || { results: [], show: false },
    (value) => onChange([...basePath, "primary_entity"], value),
    (state) => onEntityPickerStateChange(`${basePath.join(".")}.primary_entity`, state),
    { translations: { editor: t2.editor } }
  )}
                        ${renderTextfield(
    t2.editor.consumer_primary_text,
    item.primary_text,
    (value) => onChange([...basePath, "primary_text"], value)
  )}

                        ${renderSwitch(
    t2.editor.consumer_show_secondary,
    item.show_secondary !== false,
    (value) => onChange([...basePath, "show_secondary"], value)
  )}
                        ${renderEntityPicker(
    t2.editor.consumer_secondary_entity,
    item.secondary_entity,
    hass,
    entityPickerStates.get(`${basePath.join(".")}.secondary_entity`) || { results: [], show: false },
    (value) => onChange([...basePath, "secondary_entity"], value),
    (state) => onEntityPickerStateChange(`${basePath.join(".")}.secondary_entity`, state),
    { translations: { editor: t2.editor } }
  )}
                        ${renderTextfield(
    t2.editor.consumer_secondary_text,
    item.secondary_text,
    (value) => onChange([...basePath, "secondary_text"], value)
  )}
                    </div>
                </div>

                <div class="consumer-subsection">
                    <div class="consumer-subsection-header" @click=${() => onToggleSubsection("actions")}>
                        <ha-icon icon="mdi:gesture-tap"></ha-icon>
                        ${t2.editor.consumer_tap_actions}
                        <ha-icon
                            class="expand-icon ${expandedSubsections.has("actions") ? "expanded" : ""}"
                            icon="mdi:chevron-down"
                            style="margin-left: auto;"
                        ></ha-icon>
                    </div>
                    <div class="consumer-subsection-content ${expandedSubsections.has("actions") ? "" : "collapsed"}">
                        ${renderActionTargetSelector(
    t2.editor.tap_action_target,
    item.tap_action_target,
    (value) => onChange([...basePath, "tap_action_target"], value),
    { helper: t2.editor.consumer_tap_actions, translations: t2 }
  )}
                        ${item.tap_action_target === "custom_entity" ? renderEntityPicker(
    t2.editor.custom_entity_toggle,
    item.tap_action_custom_entity,
    hass,
    entityPickerStates.get(`${basePath.join(".")}.tap_action_custom_entity`) || { results: [], show: false },
    (value) => onChange([...basePath, "tap_action_custom_entity"], value),
    (state) => onEntityPickerStateChange(`${basePath.join(".")}.tap_action_custom_entity`, state),
    {
      helper: t2.editor.custom_entity_toggle_helper,
      translations: { editor: t2.editor },
      include_domains: ["switch", "input_boolean", "light", "fan", "cover"]
    }
  ) : ""}
                        ${item.tap_action_target === "custom_action" ? renderActionSelector(
    t2.editor.tap_action,
    item.tap_action,
    (key, value) => onTapActionChange([...basePath, "tap_action"], key, value),
    { translations: t2 }
  ) : ""}
                        
                        ${renderActionTargetSelector(
    t2.editor.double_tap_action_target,
    item.double_tap_action_target,
    (value) => onChange([...basePath, "double_tap_action_target"], value),
    { translations: t2 }
  )}
                        ${item.double_tap_action_target === "custom_entity" ? renderEntityPicker(
    t2.editor.custom_entity_toggle,
    item.double_tap_action_custom_entity,
    hass,
    entityPickerStates.get(`${basePath.join(".")}.double_tap_action_custom_entity`) || { results: [], show: false },
    (value) => onChange([...basePath, "double_tap_action_custom_entity"], value),
    (state) => onEntityPickerStateChange(`${basePath.join(".")}.double_tap_action_custom_entity`, state),
    {
      helper: t2.editor.custom_entity_toggle_helper,
      translations: { editor: t2.editor },
      include_domains: ["switch", "input_boolean", "light", "fan", "cover"]
    }
  ) : ""}
                        ${item.double_tap_action_target === "custom_action" ? renderActionSelector(
    t2.editor.double_tap,
    item.double_tap_action,
    (key, value) => onTapActionChange([...basePath, "double_tap_action"], key, value),
    { translations: t2 }
  ) : ""}
                        
                        ${renderActionTargetSelector(
    t2.editor.hold_action_target,
    item.hold_action_target,
    (value) => onChange([...basePath, "hold_action_target"], value),
    { translations: t2 }
  )}
                        ${item.hold_action_target === "custom_entity" ? renderEntityPicker(
    t2.editor.custom_entity_toggle,
    item.hold_action_custom_entity,
    hass,
    entityPickerStates.get(`${basePath.join(".")}.hold_action_custom_entity`) || { results: [], show: false },
    (value) => onChange([...basePath, "hold_action_custom_entity"], value),
    (state) => onEntityPickerStateChange(`${basePath.join(".")}.hold_action_custom_entity`, state),
    {
      helper: t2.editor.custom_entity_toggle_helper,
      translations: { editor: t2.editor },
      include_domains: ["switch", "input_boolean", "light", "fan", "cover"]
    }
  ) : ""}
                        ${item.hold_action_target === "custom_action" ? renderActionSelector(
    t2.editor.hold_action,
    item.hold_action,
    (key, value) => onTapActionChange([...basePath, "hold_action"], key, value),
    { translations: t2 }
  ) : ""}
                    </div>
                </div>

                <div class="consumer-subsection">
                    <div class="consumer-subsection-header" @click=${() => onToggleSubsection("styling")}>
                        <ha-icon icon="mdi:palette"></ha-icon>
                        ${t2.editor.consumer_item_styling}
                        <ha-icon
                            class="expand-icon ${expandedSubsections.has("styling") ? "expanded" : ""}"
                            icon="mdi:chevron-down"
                            style="margin-left: auto;"
                        ></ha-icon>
                    </div>
                    <div class="consumer-subsection-content ${expandedSubsections.has("styling") ? "" : "collapsed"}">
                        ${renderTextfield(
    t2.editor.icon_size,
    item.style?.icon_size,
    (value) => onChange([...basePath, "style", "icon_size"], value),
    { placeholder: "1.5em" }
  )}
                        ${renderColorPicker(
    t2.editor.icon_color,
    item.style?.icon_color,
    (value) => onChange([...basePath, "style", "icon_color"], value)
  )}
                        ${renderTextfield(
    t2.editor.icon_opacity,
    item.style?.icon_opacity,
    (value) => onChange([...basePath, "style", "icon_opacity"], value),
    { placeholder: "1" }
  )}
                        ${renderTextfield(
    t2.editor.primary_size,
    item.style?.primary_size,
    (value) => onChange([...basePath, "style", "primary_size"], value),
    { placeholder: "1em" }
  )}
                        ${renderColorPicker(
    t2.editor.primary_color_label,
    item.style?.primary_color,
    (value) => onChange([...basePath, "style", "primary_color"], value),
    { placeholder: "white" }
  )}
                        ${renderTextfield(
    t2.editor.primary_opacity,
    item.style?.primary_opacity,
    (value) => onChange([...basePath, "style", "primary_opacity"], value),
    { placeholder: "1" }
  )}
                        ${renderTextfield(
    t2.editor.primary_font_weight,
    item.style?.primary_font_weight,
    (value) => onChange([...basePath, "style", "primary_font_weight"], value),
    { placeholder: "bold" }
  )}
                        ${renderTextfield(
    t2.editor.secondary_size,
    item.style?.secondary_size,
    (value) => onChange([...basePath, "style", "secondary_size"], value),
    { placeholder: "0.8em" }
  )}
                        ${renderColorPicker(
    t2.editor.secondary_color_label,
    item.style?.secondary_color,
    (value) => onChange([...basePath, "style", "secondary_color"], value),
    { placeholder: "white" }
  )}
                        ${renderTextfield(
    t2.editor.secondary_opacity,
    item.style?.secondary_opacity,
    (value) => onChange([...basePath, "style", "secondary_opacity"], value),
    { placeholder: "0.7" }
  )}
                        ${renderTextfield(
    t2.editor.secondary_font_weight,
    item.style?.secondary_font_weight,
    (value) => onChange([...basePath, "style", "secondary_font_weight"], value),
    { placeholder: "normal" }
  )}
                        ${renderColorPicker(
    t2.editor.background_color,
    item.style?.background_color,
    (value) => onChange([...basePath, "style", "background_color"], value)
  )}
                        ${renderColorPicker(
    t2.editor.border_color,
    item.style?.border_color,
    (value) => onChange([...basePath, "style", "border_color"], value)
  )}
                        ${renderTextfield(
    t2.editor.border_radius,
    item.style?.border_radius,
    (value) => onChange([...basePath, "style", "border_radius"], value),
    { placeholder: "12px" }
  )}
                        ${renderTextfield(
    t2.editor.padding,
    item.style?.padding,
    (value) => onChange([...basePath, "style", "padding"], value),
    { placeholder: "8px" }
  )}
                    </div>
                </div>
            </div>
        </div>
    `;
}
function renderConsumersTab(config, hass, expandedSections, expandedConsumerIndex, expandedConsumerSubsections, entityPickerStates, onToggleSection, onToggleConsumer, onToggleConsumerSubsection, onEntityPickerStateChange, onChange, onTapActionChange, onAddConsumer, onDuplicateConsumer, onMoveConsumerUp, onMoveConsumerDown, onRemoveConsumer, t2) {
  return x`
        ${renderCollapsibleSection(
    "consumers_main",
    "mdi:flash",
    t2.editor.consumers_settings,
    x`
                ${renderSwitch(
      t2.editor.enable_consumers,
      config.consumers?.show,
      (value) => onChange(["consumers", "show"], value)
    )}

                ${config.consumers?.show ? x`
                    <div class="option">
                        <div class="option-label">${t2.editor.consumers_position}</div>
                        <div class="option-control">
                            <ha-combo-box
                                .value=${config.consumers?.position || "bottom"}
                                .items=${[
      { value: "bottom", label: t2.editor.position_bottom }
    ]}
                                item-value-path="value"
                                item-label-path="label"
                                @value-changed=${(ev) => {
      const newValue = ev.detail?.value;
      if (newValue) onChange(["consumers", "position"], newValue);
    }}
                            ></ha-combo-box>
                        </div>
                    </div>

                    <div class="option">
                        <div class="option-label">${t2.editor.consumers_sort_mode}</div>
                        <div class="option-control">
                            <ha-combo-box
                                .value=${config.consumers?.sort_mode || "highest_first"}
                                .items=${[
      { value: "highest_first", label: t2.editor.sort_highest_first },
      { value: "lowest_first", label: t2.editor.sort_lowest_first },
      { value: "none", label: t2.editor.sort_none },
      { value: "alpha_asc", label: t2.editor.sort_alpha_asc },
      { value: "alpha_desc", label: t2.editor.sort_alpha_desc }
    ]}
                                item-value-path="value"
                                item-label-path="label"
                                @value-changed=${(ev) => {
      const newValue = ev.detail?.value;
      if (newValue) onChange(["consumers", "sort_mode"], newValue);
    }}
                            ></ha-combo-box>
                        </div>
                    </div>

                    ${renderNumberfield(
      t2.editor.consumers_threshold,
      config.consumers?.threshold,
      (value) => onChange(["consumers", "threshold"], value),
      { min: 0, max: 1e4, step: 1, helper: t2.editor.consumers_threshold_helper }
    )}
                ` : ""}
            `,
    expandedSections.has("consumers_main"),
    () => onToggleSection("consumers_main")
  )}

        ${config.consumers?.show ? x`
            <div class="divider"></div>

            ${renderCollapsibleSection(
    "consumers_items",
    "mdi:format-list-bulleted",
    t2.editor.add_consumer,
    x`
                    ${(config.consumers?.items || []).map((item, index) => {
      const isExpanded = expandedConsumerIndex === index;
      const consumerKey = `consumer-${index}`;
      const expandedSubsections = expandedConsumerSubsections.get(consumerKey) || /* @__PURE__ */ new Set();
      return renderConsumerItem(
        item,
        index,
        isExpanded,
        expandedSubsections,
        hass,
        entityPickerStates,
        () => onToggleConsumer(index),
        (subsectionId) => onToggleConsumerSubsection(index, subsectionId),
        onEntityPickerStateChange,
        onChange,
        onTapActionChange,
        () => onMoveConsumerUp(index),
        () => onMoveConsumerDown(index),
        () => onDuplicateConsumer(index),
        () => onRemoveConsumer(index),
        index === 0,
        index === (config.consumers?.items?.length || 0) - 1,
        t2
      );
    })}

                    <ha-button @click=${onAddConsumer}>
                        <ha-icon icon="mdi:plus"></ha-icon>
                        ${t2.editor.add_consumer}
                    </ha-button>
                `,
    expandedSections.has("consumers_items"),
    () => onToggleSection("consumers_items")
  )}

            <div class="divider"></div>

            ${renderCollapsibleSection(
    "consumers_styling",
    "mdi:palette",
    `${t2.editor.styling} (Global)`,
    x`
                    ${renderTextfield(
      t2.editor.grid_gap,
      config.consumers?.style?.gap,
      (value) => onChange(["consumers", "style", "gap"], value),
      { placeholder: "6px" }
    )}
                    ${renderColorPicker(
      t2.editor.background_color,
      config.consumers?.style?.item_background_color,
      (value) => onChange(["consumers", "style", "item_background_color"], value),
      { placeholder: "rgba(21, 20, 27, 1)" }
    )}
                    ${renderColorPicker(
      t2.editor.border_color,
      config.consumers?.style?.item_border_color,
      (value) => onChange(["consumers", "style", "item_border_color"], value),
      { placeholder: "rgba(255, 255, 255, 0.1)" }
    )}
                    ${renderTextfield(
      t2.editor.border_radius,
      config.consumers?.style?.item_border_radius,
      (value) => onChange(["consumers", "style", "item_border_radius"], value),
      { placeholder: "12px" }
    )}
                    ${renderTextfield(
      t2.editor.padding,
      config.consumers?.style?.item_padding,
      (value) => onChange(["consumers", "style", "item_padding"], value),
      { placeholder: "8px" }
    )}
                    ${renderTextfield(
      t2.editor.icon_size,
      config.consumers?.style?.icon_size,
      (value) => onChange(["consumers", "style", "icon_size"], value),
      { placeholder: "1.5em" }
    )}
                    ${renderTextfield(
      t2.editor.icon_opacity,
      config.consumers?.style?.icon_opacity,
      (value) => onChange(["consumers", "style", "icon_opacity"], value),
      { placeholder: "1" }
    )}
                    ${renderTextfield(
      t2.editor.primary_size,
      config.consumers?.style?.primary_size,
      (value) => onChange(["consumers", "style", "primary_size"], value),
      { placeholder: "1em" }
    )}
                    ${renderTextfield(
      t2.editor.primary_font_weight,
      config.consumers?.style?.primary_font_weight,
      (value) => onChange(["consumers", "style", "primary_font_weight"], value),
      { placeholder: "bold" }
    )}
                    ${renderTextfield(
      t2.editor.primary_opacity,
      config.consumers?.style?.primary_opacity,
      (value) => onChange(["consumers", "style", "primary_opacity"], value),
      { placeholder: "1" }
    )}
                    ${renderTextfield(
      t2.editor.secondary_size,
      config.consumers?.style?.secondary_size,
      (value) => onChange(["consumers", "style", "secondary_size"], value),
      { placeholder: "0.8em" }
    )}
                    ${renderTextfield(
      t2.editor.secondary_font_weight,
      config.consumers?.style?.secondary_font_weight,
      (value) => onChange(["consumers", "style", "secondary_font_weight"], value),
      { placeholder: "normal" }
    )}
                    ${renderTextfield(
      t2.editor.secondary_opacity,
      config.consumers?.style?.secondary_opacity,
      (value) => onChange(["consumers", "style", "secondary_opacity"], value),
      { placeholder: "0.7" }
    )}
                `,
    expandedSections.has("consumers_styling"),
    () => onToggleSection("consumers_styling")
  )}
        ` : ""}
    `;
}
function renderElementsMainTab(config, hass, expandedSections, activeSubTab, expandedConsumerIndex, expandedConsumerSubsections, entityPickerStates, onToggleSection, onSubTabChange, onToggleConsumer, onToggleConsumerSubsection, onEntityPickerStateChange, onChange, onTapActionChange, onAddConsumer, onDuplicateConsumer, onMoveConsumerUp, onMoveConsumerDown, onRemoveConsumer, t2) {
  const subTabs = [
    { id: "header", label: t2.editor.tab_header || "Header", icon: "mdi:page-layout-header" },
    { id: "infobar", label: t2.editor.tab_infobar || "Info Bar", icon: "mdi:information" },
    { id: "consumers", label: t2.editor.tab_consumers || "Consumers", icon: "mdi:flash" }
  ];
  return x`
        <div class="sub-tabs">
            ${subTabs.map((tab) => x`
                <button
                    class="sub-tab ${activeSubTab === tab.id ? "active" : ""}"
                    @click=${() => onSubTabChange(tab.id)}
                >
                    <ha-icon icon="${tab.icon}"></ha-icon>
                    <span>${tab.label}</span>
                </button>
            `)}
        </div>

        <div class="sub-tab-content">
            ${activeSubTab === "header" ? renderHeaderTab(
    config,
    hass,
    expandedSections,
    onToggleSection,
    onChange,
    t2
  ) : ""}

            ${activeSubTab === "infobar" ? renderInfoBarTab(
    config,
    hass,
    expandedSections,
    entityPickerStates,
    onToggleSection,
    onEntityPickerStateChange,
    onChange,
    t2
  ) : ""}

            ${activeSubTab === "consumers" ? renderConsumersTab(
    config,
    hass,
    expandedSections,
    expandedConsumerIndex,
    expandedConsumerSubsections,
    entityPickerStates,
    onToggleSection,
    onToggleConsumer,
    onToggleConsumerSubsection,
    onEntityPickerStateChange,
    onChange,
    onTapActionChange,
    onAddConsumer,
    onDuplicateConsumer,
    onMoveConsumerUp,
    onMoveConsumerDown,
    onRemoveConsumer,
    t2
  ) : ""}
        </div>
    `;
}
function renderCardsMainTab(config, hass, expandedSections, activeSubTab, activeContextTab, expandedPVBarIndex, expandedBatteryIndex, entityPickerStates, onToggleSection, onSubTabChange, onContextTabChange, onTogglePVBarItem, onToggleBatteryBarItem, onEntityPickerStateChange, onChange, onTapActionChange, onAddPVBarItem, onDuplicatePVBarItem, onMovePVBarItemUp, onMovePVBarItemDown, onRemovePVBarItem, onAddBatteryBarItem, onDuplicateBatteryBarItem, onMoveBatteryBarItemUp, onMoveBatteryBarItemDown, onRemoveBatteryBarItem, renderPVTab2, renderPVBarTab2, renderBatteryTab2, renderBatteryBarTab2, renderHouseTab2, renderGridTab2, t2) {
  const subTabs = [
    { id: "pv", label: t2.editor.tab_pv || "PV System", icon: "mdi:solar-panel" },
    { id: "battery", label: t2.editor.tab_battery || "Battery", icon: "mdi:battery" },
    { id: "house", label: t2.editor.tab_house || "House", icon: "mdi:home" },
    { id: "grid", label: t2.editor.tab_grid || "Grid", icon: "mdi:transmission-tower" }
  ];
  return x`
        <div class="sub-tabs">
            ${subTabs.map((tab) => x`
                <button
                    class="sub-tab ${activeSubTab === tab.id ? "active" : ""}"
                    @click=${() => onSubTabChange(tab.id)}
                >
                    <ha-icon icon="${tab.icon}"></ha-icon>
                    <span>${tab.label}</span>
                </button>
            `)}
        </div>

        ${activeSubTab === "pv" || activeSubTab === "battery" ? x`
            <div class="context-tabs">
                ${activeSubTab === "pv" ? x`
                    <button
                        class="context-tab ${activeContextTab === "card" ? "active" : ""}"
                        @click=${() => onContextTabChange("card")}
                    >
                        ${t2.editor.card_pv || "PV Card"}
                    </button>
                    <button
                        class="context-tab ${activeContextTab === "bar" ? "active" : ""}"
                        @click=${() => onContextTabChange("bar")}
                    >
                        ${t2.editor.tab_pv_bar || "PV Bar"}
                    </button>
                ` : ""}
                ${activeSubTab === "battery" ? x`
                    <button
                        class="context-tab ${activeContextTab === "card" ? "active" : ""}"
                        @click=${() => onContextTabChange("card")}
                    >
                        ${t2.editor.card_battery || "Battery Card"}
                    </button>
                    <button
                        class="context-tab ${activeContextTab === "bar" ? "active" : ""}"
                        @click=${() => onContextTabChange("bar")}
                    >
                        ${t2.editor.tab_battery_bar || "Battery Bar"}
                    </button>
                ` : ""}
            </div>
        ` : ""}

        <div class="sub-tab-content">
            ${activeSubTab === "pv" && activeContextTab === "card" ? renderPVTab2(
    config,
    hass,
    expandedSections,
    expandedPVBarIndex,
    entityPickerStates,
    onToggleSection,
    onTogglePVBarItem,
    onEntityPickerStateChange,
    onChange,
    onTapActionChange,
    onAddPVBarItem,
    onDuplicatePVBarItem,
    onMovePVBarItemUp,
    onMovePVBarItemDown,
    onRemovePVBarItem,
    t2
  ) : ""}

            ${activeSubTab === "pv" && activeContextTab === "bar" ? renderPVBarTab2(
    config,
    hass,
    expandedSections,
    expandedPVBarIndex,
    entityPickerStates,
    onToggleSection,
    onTogglePVBarItem,
    onEntityPickerStateChange,
    onChange,
    onAddPVBarItem,
    onDuplicatePVBarItem,
    onMovePVBarItemUp,
    onMovePVBarItemDown,
    onRemovePVBarItem,
    t2
  ) : ""}

            ${activeSubTab === "battery" && activeContextTab === "card" ? renderBatteryTab2(
    config,
    hass,
    expandedSections,
    expandedBatteryIndex,
    entityPickerStates,
    onToggleSection,
    onToggleBatteryBarItem,
    onEntityPickerStateChange,
    onChange,
    onTapActionChange,
    onAddBatteryBarItem,
    onDuplicateBatteryBarItem,
    onMoveBatteryBarItemUp,
    onMoveBatteryBarItemDown,
    onRemoveBatteryBarItem,
    t2
  ) : ""}

            ${activeSubTab === "battery" && activeContextTab === "bar" ? renderBatteryBarTab2(
    config,
    hass,
    expandedSections,
    expandedBatteryIndex,
    entityPickerStates,
    onToggleSection,
    onToggleBatteryBarItem,
    onEntityPickerStateChange,
    onChange,
    onAddBatteryBarItem,
    onDuplicateBatteryBarItem,
    onMoveBatteryBarItemUp,
    onMoveBatteryBarItemDown,
    onRemoveBatteryBarItem,
    t2
  ) : ""}

            ${activeSubTab === "house" ? renderHouseTab2(
    config,
    hass,
    expandedSections,
    entityPickerStates,
    onToggleSection,
    onEntityPickerStateChange,
    onChange,
    onTapActionChange,
    t2
  ) : ""}

            ${activeSubTab === "grid" ? renderGridTab2(
    config,
    hass,
    expandedSections,
    entityPickerStates,
    onToggleSection,
    onEntityPickerStateChange,
    onChange,
    onTapActionChange,
    t2
  ) : ""}
        </div>
    `;
}
function renderPVBarItem(item, index, isExpanded, hass, entityPickerStates, onToggle, onEntityPickerStateChange, onChange, onMoveUp, onMoveDown, onDuplicate, onRemove, isFirst, isLast, t2) {
  const entityLabel = item.name || item.entity || `PV ${index + 1}`;
  const basePath = ["pv", "entities", index.toString()];
  return x`
        <div class="consumer-section">
            <div class="consumer-header" @click=${onToggle}>
                <div class="consumer-title">
                    <ha-icon
                        class="expand-icon ${isExpanded ? "expanded" : ""}"
                        icon="mdi:chevron-down"
                    ></ha-icon>
                    <span class="consumer-title-text">
                        PV ${index + 1}
                        ${item.name ? x` <span style="opacity: 0.6; font-weight: normal; font-size: 0.9em;">(${entityLabel})</span>` : ""}
                    </span>
                </div>
                <div class="consumer-header-actions" @click=${(e2) => e2.stopPropagation()}>
                    ${!isFirst ? x`
                        <ha-icon-button
                            .path=${"M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"}
                            @click=${onMoveUp}
                            title="${t2.editor.move_up}"
                        ></ha-icon-button>
                    ` : ""}
                    ${!isLast ? x`
                        <ha-icon-button
                            .path=${"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"}
                            @click=${onMoveDown}
                            title="${t2.editor.move_down}"
                        ></ha-icon-button>
                    ` : ""}
                    <ha-icon-button
                        .path=${"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"}
                        @click=${onDuplicate}
                        title="${t2.editor.duplicate}"
                        style="color: rgba(33, 150, 243, 1);"
                    ></ha-icon-button>
                    <ha-icon-button
                        .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}
                        @click=${onRemove}
                        title="${t2.editor.delete}"
                        style="color: rgba(244,67,54,1);"
                    ></ha-icon-button>
                </div>
            </div>

            <div class="consumer-content ${isExpanded ? "" : "collapsed"}">
                ${renderEntityPicker(
    "Entity",
    item.entity,
    hass,
    entityPickerStates.get(`${basePath.join(".")}.entity`) || { results: [], show: false },
    (value) => onChange([...basePath, "entity"], value),
    (state) => onEntityPickerStateChange(`${basePath.join(".")}.entity`, state),
    { required: true, translations: { editor: t2.editor } }
  )}
                ${renderTextfield(
    t2.editor.entity_name,
    item.name,
    (value) => onChange([...basePath, "name"], value),
    { helper: t2.editor.entity_name_helper }
  )}
                ${renderNumberfield(
    t2.editor.max_power,
    item.max_power,
    (value) => onChange([...basePath, "max_power"], value),
    { min: 0, max: 5e4, step: 100, helper: t2.editor.max_power_helper }
  )}
                ${renderIconPicker(
    t2.editor.icon_label,
    item.icon,
    hass,
    (value) => onChange([...basePath, "icon"], value),
    { translations: { editor: t2.editor } }
  )}
            </div>
        </div>
    `;
}
function renderAnimationSelector(cardType, config, onChange, t2) {
  if (!config?.animation) return x``;
  const animationOptions = [
    { value: "rotating-dots", label: t2.editor.animation_rotating_dots || "Rotating Dots" },
    { value: "particle-field", label: t2.editor.animation_particle_field || "Particle Field" },
    { value: "electric-arc", label: t2.editor.animation_electric_arc || "Electric Arc" }
  ];
  return x`
        <div class="option">
            <div class="option-label">
                ${t2.editor.animation_style || "Animation Style"}
                <div class="info-text">${t2.editor.animation_style_helper || "Choose the animation effect"}</div>
            </div>
            <div class="option-control">
                <ha-combo-box
                    .value=${config.animation_style || "rotating-dots"}
                    .items=${animationOptions}
                    item-value-path="value"
                    item-label-path="label"
                    @value-changed=${(ev) => {
    const newValue = ev.detail?.value;
    if (newValue) onChange([cardType, "animation_style"], newValue);
  }}
                ></ha-combo-box>
            </div>
        </div>
    `;
}
function renderCardTapActions(cardType, config, expandedSections, onToggleSection, onTapActionChange, t2) {
  return renderCollapsibleSection(
    `${cardType}_tap_actions`,
    "mdi:gesture-tap",
    "Tap Actions",
    x`
            ${renderActionSelector(
      "Tap Action",
      config?.tap_action,
      (key, value) => onTapActionChange([cardType, "tap_action"], key, value),
      { translations: t2 }
    )}
            ${renderActionSelector(
      "Double Tap",
      config?.double_tap_action,
      (key, value) => onTapActionChange([cardType, "double_tap_action"], key, value),
      { translations: t2 }
    )}
            ${renderActionSelector(
      "Hold Action",
      config?.hold_action,
      (key, value) => onTapActionChange([cardType, "hold_action"], key, value),
      { translations: t2 }
    )}
        `,
    expandedSections.has(`${cardType}_tap_actions`),
    () => onToggleSection(`${cardType}_tap_actions`)
  );
}
function renderCardTexts(cardType, config, hass, expandedSections, entityPickerStates, onToggleSection, onEntityPickerStateChange, onChange, t2, additionalContent) {
  return renderCollapsibleSection(
    `${cardType}_texts`,
    "mdi:text",
    t2.editor.additional_texts,
    x`
            ${additionalContent || ""}
            ${renderEntityPicker(
      t2.editor.secondary_entity,
      config?.secondary_entity,
      hass,
      entityPickerStates.get(`${cardType}.secondary_entity`) || { results: [], show: false },
      (value) => onChange([cardType, "secondary_entity"], value),
      (state) => onEntityPickerStateChange(`${cardType}.secondary_entity`, state),
      { helper: t2.editor.secondary_entity_helper, translations: { editor: t2.editor } }
    )}
            ${renderTextfield(
      t2.editor.secondary_text,
      config?.secondary_text,
      (value) => onChange([cardType, "secondary_text"], value),
      { helper: t2.editor.secondary_text_helper }
    )}
            ${renderEntityPicker(
      t2.editor.tertiary_entity,
      config?.tertiary_entity,
      hass,
      entityPickerStates.get(`${cardType}.tertiary_entity`) || { results: [], show: false },
      (value) => onChange([cardType, "tertiary_entity"], value),
      (state) => onEntityPickerStateChange(`${cardType}.tertiary_entity`, state),
      { translations: { editor: t2.editor } }
    )}
            ${renderTextfield(
      t2.editor.tertiary_text,
      config?.tertiary_text,
      (value) => onChange([cardType, "tertiary_text"], value)
    )}
        `,
    expandedSections.has(`${cardType}_texts`),
    () => onToggleSection(`${cardType}_texts`)
  );
}
function renderCardStyling(cardType, config, expandedSections, onToggleSection, onChange, t2) {
  return renderCollapsibleSection(
    `${cardType}_styling`,
    "mdi:palette",
    t2.editor.styling,
    x`
            ${renderColorPicker(
      t2.editor.background_color,
      config?.style?.background_color,
      (value) => onChange([cardType, "style", "background_color"], value),
      { placeholder: "rgba(21, 20, 27, 1)" }
    )}
            ${renderColorPicker(
      t2.editor.border_color,
      config?.style?.border_color,
      (value) => onChange([cardType, "style", "border_color"], value),
      { placeholder: "rgba(255, 255, 255, 0.1)" }
    )}
            ${renderColorPicker(
      t2.editor.primary_color,
      config?.style?.primary_color,
      (value) => onChange([cardType, "style", "primary_color"], value)
    )}
            ${renderColorPicker(
      t2.editor.secondary_color,
      config?.style?.secondary_color,
      (value) => onChange([cardType, "style", "secondary_color"], value)
    )}
            ${renderColorPicker(
      t2.editor.icon_color,
      config?.style?.icon_color,
      (value) => onChange([cardType, "style", "icon_color"], value)
    )}
        `,
    expandedSections.has(`${cardType}_styling`),
    () => onToggleSection(`${cardType}_styling`)
  );
}
function renderPVTab(config, hass, expandedSections, expandedPVBarIndex, entityPickerStates, onToggleSection, onTogglePVBarItem, onEntityPickerStateChange, onChange, onTapActionChange, onAddPVBarItem, onDuplicatePVBarItem, onMovePVBarItemUp, onMovePVBarItemDown, onRemovePVBarItem, t2) {
  const pvEntities = config.pv?.entities || [];
  const canAddMore = pvEntities.length < 5;
  return x`
        ${renderCollapsibleSection(
    "pv_entities",
    "mdi:solar-panel-large",
    t2.editor.bar_entities,
    x`
                ${pvEntities.map((item, index) => {
      const isExpanded = expandedPVBarIndex === index;
      return renderPVBarItem(
        item,
        index,
        isExpanded,
        hass,
        entityPickerStates,
        () => onTogglePVBarItem(index),
        onEntityPickerStateChange,
        onChange,
        () => onMovePVBarItemUp(index),
        () => onMovePVBarItemDown(index),
        () => onDuplicatePVBarItem(index),
        () => onRemovePVBarItem(index),
        index === 0,
        index === pvEntities.length - 1,
        t2
      );
    })}

                ${canAddMore ? x`
                    <ha-button @click=${onAddPVBarItem}>
                        <ha-icon icon="mdi:plus"></ha-icon>
                        ${t2.editor.add_pv_entity}
                    </ha-button>
                ` : x`
                    <div class="info-text" style="padding: 8px; opacity: 0.7;">
                        ${t2.editor.pv_max_5}
                    </div>
                `}
            `,
    expandedSections.has("pv_entities"),
    () => onToggleSection("pv_entities")
  )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
    "pv_main",
    "mdi:cog",
    t2.editor.pv_system,
    x`
                ${renderIconPicker(
      t2.editor.icon_label,
      config.pv?.icon,
      hass,
      (value) => onChange(["pv", "icon"], value),
      { translations: { editor: t2.editor } }
    )}
                ${renderSwitch(
      t2.editor.enable_animation,
      config.pv?.animation,
      (value) => onChange(["pv", "animation"], value)
    )}
                ${renderAnimationSelector("pv", config.pv, onChange, t2)}
                ${renderSwitch(
      t2.editor.icon_rotation,
      config.pv?.icon_rotation,
      (value) => onChange(["pv", "icon_rotation"], value),
      { helper: t2.editor.icon_rotation_helper }
    )}
            `,
    expandedSections.has("pv_main"),
    () => onToggleSection("pv_main")
  )}

        <div class="divider"></div>

        ${renderCardTexts(
    "pv",
    config.pv,
    hass,
    expandedSections,
    entityPickerStates,
    onToggleSection,
    onEntityPickerStateChange,
    onChange,
    t2
  )}

        <div class="divider"></div>

        ${renderCardTapActions(
    "pv",
    config.pv,
    expandedSections,
    onToggleSection,
    onTapActionChange,
    t2
  )}

        <div class="divider"></div>

        ${renderCardStyling("pv", config.pv, expandedSections, onToggleSection, onChange, t2)}
    `;
}
function renderPVBarTab(config, hass, expandedSections, expandedPVBarIndex, entityPickerStates, onToggleSection, onTogglePVBarItem, onEntityPickerStateChange, onChange, onAddPVBarItem, onDuplicatePVBarItem, onMovePVBarItemUp, onMovePVBarItemDown, onRemovePVBarItem, t2) {
  const pvBar = config.pv_bar || { show: false };
  return x`
        ${renderCollapsibleSection(
    "pv_bar_settings",
    "mdi:chart-bar",
    t2.editor.pv_bar_settings,
    x`
                ${renderSwitch(
      t2.editor.enable_pv_bar,
      pvBar.show,
      (value) => onChange(["pv_bar", "show"], value)
    )}
            `,
    expandedSections.has("pv_bar_settings"),
    () => onToggleSection("pv_bar_settings")
  )}

        ${pvBar.show ? x`
            <div class="divider"></div>

            ${renderCollapsibleSection(
    "pv_bar_styling",
    "mdi:palette",
    t2.editor.bar_styling,
    x`
                    ${renderColorPicker(
      t2.editor.background_color,
      pvBar.style?.background_color,
      (value) => onChange(["pv_bar", "style", "background_color"], value)
    )}
                    ${renderColorPicker(
      t2.editor.border_color,
      pvBar.style?.border_color,
      (value) => onChange(["pv_bar", "style", "border_color"], value)
    )}
                    ${renderTextfield(
      t2.editor.border_radius,
      pvBar.style?.border_radius,
      (value) => onChange(["pv_bar", "style", "border_radius"], value),
      { placeholder: "16px" }
    )}
                    ${renderTextfield(
      t2.editor.padding,
      pvBar.style?.padding,
      (value) => onChange(["pv_bar", "style", "padding"], value),
      { placeholder: "12px" }
    )}
                    ${renderTextfield(
      t2.editor.bar_separator,
      pvBar.style?.separator,
      (value) => onChange(["pv_bar", "style", "separator"], value),
      { placeholder: "|", helper: t2.editor.bar_separator_helper }
    )}
                    ${renderTextfield(
      t2.editor.bar_item_gap,
      pvBar.style?.item_gap,
      (value) => onChange(["pv_bar", "style", "item_gap"], value),
      { placeholder: "0.5rem", helper: t2.editor.bar_item_gap_helper }
    )}
                    ${renderTextfield(
      t2.editor.icon_size,
      pvBar.style?.icon_size,
      (value) => onChange(["pv_bar", "style", "icon_size"], value),
      { placeholder: "1.5em" }
    )}
                    ${renderColorPicker(
      t2.editor.icon_color,
      pvBar.style?.icon_color,
      (value) => onChange(["pv_bar", "style", "icon_color"], value)
    )}
                    ${renderTextfield(
      "Label Size",
      pvBar.style?.label_size,
      (value) => onChange(["pv_bar", "style", "label_size"], value),
      { placeholder: "0.9em" }
    )}
                    ${renderTextfield(
      t2.editor.label_line_height,
      pvBar.style?.label_line_height,
      (value) => onChange(["pv_bar", "style", "label_line_height"], value),
      { placeholder: "1.4" }
    )}
                    ${renderColorPicker(
      "Label Color",
      pvBar.style?.label_color,
      (value) => onChange(["pv_bar", "style", "label_color"], value)
    )}
                    ${renderTextfield(
      "Label Font Weight",
      pvBar.style?.label_font_weight,
      (value) => onChange(["pv_bar", "style", "label_font_weight"], value),
      { placeholder: "normal" }
    )}
                    ${renderTextfield(
      "Value Size",
      pvBar.style?.value_size,
      (value) => onChange(["pv_bar", "style", "value_size"], value),
      { placeholder: "1em" }
    )}
                    ${renderTextfield(
      t2.editor.value_line_height,
      pvBar.style?.value_line_height,
      (value) => onChange(["pv_bar", "style", "value_line_height"], value),
      { placeholder: "1.4" }
    )}
                    ${renderColorPicker(
      "Value Color",
      pvBar.style?.value_color,
      (value) => onChange(["pv_bar", "style", "value_color"], value)
    )}
                    ${renderTextfield(
      "Value Font Weight",
      pvBar.style?.value_font_weight,
      (value) => onChange(["pv_bar", "style", "value_font_weight"], value),
      { placeholder: "bold" }
    )}
                `,
    expandedSections.has("pv_bar_styling"),
    () => onToggleSection("pv_bar_styling")
  )}
        ` : ""}
    `;
}
function renderBatteryBarItem(item, index, isExpanded, hass, entityPickerStates, onToggle, onEntityPickerStateChange, onChange, onMoveUp, onMoveDown, onDuplicate, onRemove, isFirst, isLast, t2) {
  const entityLabel = item.name || item.entity || `Battery ${index + 1}`;
  const basePath = ["battery_bar", "entities", index.toString()];
  return x`
        <div class="consumer-section">
            <div class="consumer-header" @click=${onToggle}>
                <div class="consumer-title">
                    <ha-icon
                        class="expand-icon ${isExpanded ? "expanded" : ""}"
                        icon="mdi:chevron-down"
                    ></ha-icon>
                    <span class="consumer-title-text">
                        Battery ${index + 1}
                        ${item.name ? x` <span style="opacity: 0.6; font-weight: normal; font-size: 0.9em;">(${entityLabel})</span>` : ""}
                    </span>
                </div>
                <div class="consumer-header-actions" @click=${(e2) => e2.stopPropagation()}>
                    ${!isFirst ? x`
                        <ha-icon-button
                            .path=${"M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"}
                            @click=${onMoveUp}
                            title="${t2.editor.move_up}"
                        ></ha-icon-button>
                    ` : ""}
                    ${!isLast ? x`
                        <ha-icon-button
                            .path=${"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"}
                            @click=${onMoveDown}
                            title="${t2.editor.move_down}"
                        ></ha-icon-button>
                    ` : ""}
                    <ha-icon-button
                        .path=${"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"}
                        @click=${onDuplicate}
                        title="${t2.editor.duplicate}"
                        style="color: rgba(33, 150, 243, 1);"
                    ></ha-icon-button>
                    <ha-icon-button
                        .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}
                        @click=${onRemove}
                        title="${t2.editor.delete}"
                        style="color: rgba(244,67,54,1);"
                    ></ha-icon-button>
                </div>
            </div>

            <div class="consumer-content ${isExpanded ? "" : "collapsed"}">
                ${renderEntityPicker(
    "Entity (SOC %)",
    item.entity,
    hass,
    entityPickerStates.get(`${basePath.join(".")}.entity`) || { results: [], show: false },
    (value) => onChange([...basePath, "entity"], value),
    (state) => onEntityPickerStateChange(`${basePath.join(".")}.entity`, state),
    { required: true, translations: { editor: t2.editor } }
  )}
                ${renderTextfield(
    t2.editor.entity_name,
    item.name,
    (value) => onChange([...basePath, "name"], value),
    { helper: t2.editor.entity_name_helper }
  )}
                ${renderNumberfield(
    t2.editor.battery_capacity,
    item.capacity,
    (value) => onChange([...basePath, "capacity"], value),
    { min: 0, max: 1e5, step: 100, helper: t2.editor.battery_capacity_helper }
  )}
                ${renderEntityPicker(
    t2.editor.charge_entity,
    item.charge_entity,
    hass,
    entityPickerStates.get(`${basePath.join(".")}.charge_entity`) || { results: [], show: false },
    (value) => onChange([...basePath, "charge_entity"], value),
    (state) => onEntityPickerStateChange(`${basePath.join(".")}.charge_entity`, state),
    { helper: t2.editor.charge_entity_helper, translations: { editor: t2.editor } }
  )}
                ${renderEntityPicker(
    t2.editor.discharge_entity,
    item.discharge_entity,
    hass,
    entityPickerStates.get(`${basePath.join(".")}.discharge_entity`) || { results: [], show: false },
    (value) => onChange([...basePath, "discharge_entity"], value),
    (state) => onEntityPickerStateChange(`${basePath.join(".")}.discharge_entity`, state),
    { helper: t2.editor.discharge_entity_helper, translations: { editor: t2.editor } }
  )}
                ${renderIconPicker(
    t2.editor.icon_label,
    item.icon,
    hass,
    (value) => onChange([...basePath, "icon"], value),
    { translations: { editor: t2.editor } }
  )}
            </div>
        </div>
    `;
}
function renderBatteryTab(config, hass, expandedSections, expandedBatteryBarIndex, entityPickerStates, onToggleSection, onToggleBatteryBarItem, onEntityPickerStateChange, onChange, onTapActionChange, onAddBatteryBarItem, onDuplicateBatteryBarItem, onMoveBatteryBarItemUp, onMoveBatteryBarItemDown, onRemoveBatteryBarItem, t2) {
  const batteryEntities = config.batterie?.entities || [];
  const canAddMore = batteryEntities.length < 5;
  return x`
        ${renderCollapsibleSection(
    "battery_entities",
    "mdi:battery-high",
    t2.editor.bar_entities,
    x`
                ${batteryEntities.map((item, index) => {
      const isExpanded = expandedBatteryBarIndex === index;
      return renderBatteryBarItem(
        item,
        index,
        isExpanded,
        hass,
        entityPickerStates,
        () => onToggleBatteryBarItem(index),
        onEntityPickerStateChange,
        onChange,
        () => onMoveBatteryBarItemUp(index),
        () => onMoveBatteryBarItemDown(index),
        () => onDuplicateBatteryBarItem(index),
        () => onRemoveBatteryBarItem(index),
        index === 0,
        index === batteryEntities.length - 1,
        t2
      );
    })}

                ${canAddMore ? x`
                    <ha-button @click=${onAddBatteryBarItem}>
                        <ha-icon icon="mdi:plus"></ha-icon>
                        ${t2.editor.add_battery_entity}
                    </ha-button>
                ` : x`
                    <div class="info-text" style="padding: 8px; opacity: 0.7;">
                        ${t2.editor.battery_max_5}
                    </div>
                `}
            `,
    expandedSections.has("battery_entities"),
    () => onToggleSection("battery_entities")
  )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
    "battery_main",
    "mdi:cog",
    t2.editor.battery,
    x`
                ${renderIconPicker(
      t2.editor.icon_label,
      config.batterie?.icon,
      hass,
      (value) => onChange(["batterie", "icon"], value),
      { helper: t2.editor.icon_auto_helper, translations: { editor: t2.editor } }
    )}
                ${renderSwitch(
      t2.editor.enable_animation,
      config.batterie?.animation,
      (value) => onChange(["batterie", "animation"], value)
    )}
                ${renderAnimationSelector("batterie", config.batterie, onChange, t2)}
            `,
    expandedSections.has("battery_main"),
    () => onToggleSection("battery_main")
  )}

        <div class="divider"></div>

        ${renderCardTexts(
    "batterie",
    config.batterie,
    hass,
    expandedSections,
    entityPickerStates,
    onToggleSection,
    onEntityPickerStateChange,
    onChange,
    t2
  )}

        <div class="divider"></div>

        ${renderCardTapActions(
    "batterie",
    config.batterie,
    expandedSections,
    onToggleSection,
    onTapActionChange,
    t2
  )}

        <div class="divider"></div>

        ${renderCardStyling("batterie", config.batterie, expandedSections, onToggleSection, onChange, t2)}
    `;
}
function renderBatteryBarTab(config, hass, expandedSections, expandedBatteryBarIndex, entityPickerStates, onToggleSection, onToggleBatteryBarItem, onEntityPickerStateChange, onChange, onAddBatteryBarItem, onDuplicateBatteryBarItem, onMoveBatteryBarItemUp, onMoveBatteryBarItemDown, onRemoveBatteryBarItem, t2) {
  const batteryBar = config.battery_bar || { show: false };
  return x`
        ${renderCollapsibleSection(
    "battery_bar_settings",
    "mdi:battery-charging",
    t2.editor.battery_bar_settings,
    x`
                ${renderSwitch(
      t2.editor.enable_battery_bar,
      batteryBar.show,
      (value) => onChange(["battery_bar", "show"], value)
    )}
            `,
    expandedSections.has("battery_bar_settings"),
    () => onToggleSection("battery_bar_settings")
  )}

        ${batteryBar.show ? x`
            <div class="divider"></div>

            ${renderCollapsibleSection(
    "battery_bar_styling",
    "mdi:palette",
    t2.editor.bar_styling,
    x`
                    ${renderColorPicker(
      t2.editor.background_color,
      batteryBar.style?.background_color,
      (value) => onChange(["battery_bar", "style", "background_color"], value)
    )}
                    ${renderColorPicker(
      t2.editor.border_color,
      batteryBar.style?.border_color,
      (value) => onChange(["battery_bar", "style", "border_color"], value)
    )}
                    ${renderTextfield(
      t2.editor.border_radius,
      batteryBar.style?.border_radius,
      (value) => onChange(["battery_bar", "style", "border_radius"], value),
      { placeholder: "16px" }
    )}
                    ${renderTextfield(
      t2.editor.padding,
      batteryBar.style?.padding,
      (value) => onChange(["battery_bar", "style", "padding"], value),
      { placeholder: "12px" }
    )}
                    ${renderTextfield(
      t2.editor.bar_separator,
      batteryBar.style?.separator,
      (value) => onChange(["battery_bar", "style", "separator"], value),
      { placeholder: "|", helper: t2.editor.bar_separator_helper }
    )}
                    ${renderTextfield(
      t2.editor.bar_item_gap,
      batteryBar.style?.item_gap,
      (value) => onChange(["battery_bar", "style", "item_gap"], value),
      { placeholder: "0.5rem", helper: t2.editor.bar_item_gap_helper }
    )}
                    ${renderTextfield(
      t2.editor.icon_size,
      batteryBar.style?.icon_size,
      (value) => onChange(["battery_bar", "style", "icon_size"], value),
      { placeholder: "1.5em" }
    )}
                    ${renderColorPicker(
      t2.editor.icon_color,
      batteryBar.style?.icon_color,
      (value) => onChange(["battery_bar", "style", "icon_color"], value)
    )}
                    ${renderTextfield(
      "Label Size",
      batteryBar.style?.label_size,
      (value) => onChange(["battery_bar", "style", "label_size"], value),
      { placeholder: "0.9em" }
    )}
                    ${renderTextfield(
      t2.editor.label_line_height,
      batteryBar.style?.label_line_height,
      (value) => onChange(["battery_bar", "style", "label_line_height"], value),
      { placeholder: "1.4" }
    )}
                    ${renderColorPicker(
      "Label Color",
      batteryBar.style?.label_color,
      (value) => onChange(["battery_bar", "style", "label_color"], value)
    )}
                    ${renderTextfield(
      "Label Font Weight",
      batteryBar.style?.label_font_weight,
      (value) => onChange(["battery_bar", "style", "label_font_weight"], value),
      { placeholder: "normal" }
    )}
                    ${renderTextfield(
      "Value Size",
      batteryBar.style?.value_size,
      (value) => onChange(["battery_bar", "style", "value_size"], value),
      { placeholder: "1em" }
    )}
                    ${renderTextfield(
      t2.editor.value_line_height,
      batteryBar.style?.value_line_height,
      (value) => onChange(["battery_bar", "style", "value_line_height"], value),
      { placeholder: "1.4" }
    )}
                    ${renderColorPicker(
      "Value Color",
      batteryBar.style?.value_color,
      (value) => onChange(["battery_bar", "style", "value_color"], value)
    )}
                    ${renderTextfield(
      "Value Font Weight",
      batteryBar.style?.value_font_weight,
      (value) => onChange(["battery_bar", "style", "value_font_weight"], value),
      { placeholder: "bold" }
    )}
                `,
    expandedSections.has("battery_bar_styling"),
    () => onToggleSection("battery_bar_styling")
  )}
        ` : ""}
    `;
}
function renderHouseTab(config, hass, expandedSections, entityPickerStates, onToggleSection, onEntityPickerStateChange, onChange, onTapActionChange, t2) {
  return x`
        ${renderCollapsibleSection(
    "house_main",
    "mdi:home",
    t2.editor.house_consumption,
    x`
                ${renderEntityPicker(
      t2.editor.entity,
      config.haus?.entity,
      hass,
      entityPickerStates.get("haus.entity") || { results: [], show: false },
      (value) => onChange(["haus", "entity"], value),
      (state) => onEntityPickerStateChange("haus.entity", state),
      { helper: t2.editor.house_entity_helper, translations: { editor: t2.editor } }
    )}
                ${renderIconPicker(
      t2.editor.icon_label,
      config.haus?.icon,
      hass,
      (value) => onChange(["haus", "icon"], value),
      { translations: { editor: t2.editor } }
    )}
                ${renderSwitch(
      t2.editor.enable_animation,
      config.haus?.animation,
      (value) => onChange(["haus", "animation"], value)
    )}
                ${renderAnimationSelector("haus", config.haus, onChange, t2)}
            `,
    expandedSections.has("house_main"),
    () => onToggleSection("house_main")
  )}

        <div class="divider"></div>

        ${renderCardTexts(
    "haus",
    config.haus,
    hass,
    expandedSections,
    entityPickerStates,
    onToggleSection,
    onEntityPickerStateChange,
    onChange,
    t2,
    renderSwitch(
      t2.editor.show_consumer_total_in_house,
      config.haus?.show_consumer_total,
      (value) => onChange(["haus", "show_consumer_total"], value),
      { helper: t2.editor.show_consumer_total_helper }
    )
  )}

        <div class="divider"></div>

        ${renderCardTapActions(
    "haus",
    config.haus,
    expandedSections,
    onToggleSection,
    onTapActionChange,
    t2
  )}

        <div class="divider"></div>

        ${renderCardStyling("haus", config.haus, expandedSections, onToggleSection, onChange, t2)}
    `;
}
function renderGridTab(config, hass, expandedSections, entityPickerStates, onToggleSection, onEntityPickerStateChange, onChange, onTapActionChange, t2) {
  return x`
        ${renderCollapsibleSection(
    "grid_main",
    "mdi:transmission-tower",
    t2.editor.grid,
    x`
                ${renderEntityPicker(
      t2.editor.entity,
      config.netz?.entity,
      hass,
      entityPickerStates.get("netz.entity") || { results: [], show: false },
      (value) => onChange(["netz", "entity"], value),
      (state) => onEntityPickerStateChange("netz.entity", state),
      { helper: t2.editor.grid_entity_helper, translations: { editor: t2.editor } }
    )}
                ${renderNumberfield(
      t2.editor.threshold,
      config.netz?.threshold ?? 10,
      (value) => onChange(["netz", "threshold"], value),
      {
        min: 0,
        max: 100,
        step: 1,
        helper: t2.editor.grid_threshold_helper || "Schwellwert für Neutral-Status (-threshold bis +threshold Watt)"
      }
    )}
                ${renderIconPicker(
      t2.editor.icon_label,
      config.netz?.icon,
      hass,
      (value) => onChange(["netz", "icon"], value),
      { translations: { editor: t2.editor } }
    )}
                ${renderSwitch(
      t2.editor.enable_animation,
      config.netz?.animation,
      (value) => onChange(["netz", "animation"], value)
    )}
                ${renderAnimationSelector("netz", config.netz, onChange, t2)}
            `,
    expandedSections.has("grid_main"),
    () => onToggleSection("grid_main")
  )}

        <div class="divider"></div>

        ${renderCollapsibleSection(
    "grid_status",
    "mdi:text-box",
    t2.editor.status_texts,
    x`
                ${renderTextfield(
      t2.editor.text_feed_in,
      config.netz?.text_einspeisen,
      (value) => onChange(["netz", "text_einspeisen"], value),
      { placeholder: t2.editor.text_feed_in_placeholder }
    )}
                ${renderTextfield(
      t2.editor.text_neutral,
      config.netz?.text_neutral,
      (value) => onChange(["netz", "text_neutral"], value),
      { placeholder: t2.editor.text_neutral_placeholder }
    )}
                ${renderTextfield(
      t2.editor.text_consumption,
      config.netz?.text_bezug,
      (value) => onChange(["netz", "text_bezug"], value),
      { placeholder: t2.editor.text_consumption_placeholder }
    )}
            `,
    expandedSections.has("grid_status"),
    () => onToggleSection("grid_status")
  )}

        <div class="divider"></div>

        ${renderCardTexts(
    "netz",
    config.netz,
    hass,
    expandedSections,
    entityPickerStates,
    onToggleSection,
    onEntityPickerStateChange,
    onChange,
    t2
  )}

        <div class="divider"></div>

        ${renderCardTapActions(
    "netz",
    config.netz,
    expandedSections,
    onToggleSection,
    onTapActionChange,
    t2
  )}

        <div class="divider"></div>

        ${renderCardStyling("netz", config.netz, expandedSections, onToggleSection, onChange, t2)}
    `;
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
const EDITOR_TAG = `${"pv-monitor-card"}-editor`;
const _PVMonitorCardEditor = class _PVMonitorCardEditor extends i {
  constructor() {
    super(...arguments);
    this._activeTab = "general";
    this._activeSubTab = /* @__PURE__ */ new Map([
      ["general", "layout"],
      ["elements", "header"],
      ["cards", "pv"]
    ]);
    this._activeContextTab = /* @__PURE__ */ new Map([
      ["pv", "card"],
      ["battery", "card"]
    ]);
    this._expandedSections = /* @__PURE__ */ new Set(["entities"]);
    this._expandedConsumerIndex = null;
    this._expandedConsumerSubsections = /* @__PURE__ */ new Map();
    this._expandedPVBarIndex = null;
    this._expandedBatteryBarIndex = null;
    this._entityPickerStates = /* @__PURE__ */ new Map();
  }
  setConfig(config) {
    this._config = config;
    this._eventManager = new EventManager(this.dispatchEvent.bind(this));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._eventManager?.cleanup();
  }
  _getT() {
    return getTranslations(this._config?.language);
  }
  _onChange(path, value) {
    if (!this._config || !this._eventManager) return;
    this._config = updateConfigValue(this._config, path, value);
    this._eventManager.fireEvent(this._config);
    this.requestUpdate();
  }
  _onConfigChange(config) {
    if (!this._eventManager) return;
    this._config = config;
    this._eventManager.fireEvent(this._config);
    this.requestUpdate();
  }
  _onTapActionChange(path, key, value) {
    if (!this._config || !this._eventManager) return;
    this._config = updateTapAction(this._config, path, key, value);
    this._eventManager.fireEvent(this._config);
    this.requestUpdate();
  }
  _onSubTabChange(mainTab, subTab) {
    this._activeSubTab.set(mainTab, subTab);
    this.requestUpdate();
  }
  _onContextTabChange(subTab, contextTab) {
    this._activeContextTab.set(subTab, contextTab);
    this.requestUpdate();
  }
  _toggleSection(sectionId) {
    if (this._expandedSections.has(sectionId)) {
      this._expandedSections.delete(sectionId);
    } else {
      this._expandedSections.add(sectionId);
    }
    this.requestUpdate();
  }
  _onEntityPickerStateChange(key, state2) {
    this._entityPickerStates.set(key, state2);
    this.requestUpdate();
  }
  _toggleConsumer(index) {
    this._expandedConsumerIndex = this._expandedConsumerIndex === index ? null : index;
    this.requestUpdate();
  }
  _toggleConsumerSubsection(consumerIndex, subsectionId) {
    const key = `consumer-${consumerIndex}`;
    if (!this._expandedConsumerSubsections.has(key)) {
      this._expandedConsumerSubsections.set(key, /* @__PURE__ */ new Set());
    }
    const subsections = this._expandedConsumerSubsections.get(key);
    if (subsections.has(subsectionId)) {
      subsections.delete(subsectionId);
    } else {
      subsections.add(subsectionId);
    }
    this.requestUpdate();
  }
  _addConsumer() {
    if (!this._config || !this._eventManager) return;
    const newConfig = JSON.parse(JSON.stringify(this._config));
    if (!newConfig.consumers) newConfig.consumers = { items: [] };
    if (!newConfig.consumers.items) newConfig.consumers.items = [];
    newConfig.consumers.items.push({ entity: "", auto_color: true });
    this._config = newConfig;
    this._expandedConsumerIndex = newConfig.consumers.items.length - 1;
    this._eventManager.fireEvent(this._config);
    this.requestUpdate();
  }
  _duplicateConsumer(index) {
    if (!this._config?.consumers?.items || !this._eventManager) return;
    const newConfig = JSON.parse(JSON.stringify(this._config));
    const itemToDuplicate = JSON.parse(JSON.stringify(newConfig.consumers.items[index]));
    newConfig.consumers.items.splice(index + 1, 0, itemToDuplicate);
    this._config = newConfig;
    this._expandedConsumerIndex = index + 1;
    this._eventManager.fireEvent(this._config);
    this.requestUpdate();
  }
  _moveConsumerUp(index) {
    if (!this._config?.consumers?.items || index === 0 || !this._eventManager) return;
    const newConfig = JSON.parse(JSON.stringify(this._config));
    const items = newConfig.consumers.items;
    [items[index - 1], items[index]] = [items[index], items[index - 1]];
    this._config = newConfig;
    if (this._expandedConsumerIndex === index) {
      this._expandedConsumerIndex = index - 1;
    } else if (this._expandedConsumerIndex === index - 1) {
      this._expandedConsumerIndex = index;
    }
    this._eventManager.fireEvent(this._config);
    this.requestUpdate();
  }
  _moveConsumerDown(index) {
    if (!this._config?.consumers?.items || index === this._config.consumers.items.length - 1 || !this._eventManager) return;
    const newConfig = JSON.parse(JSON.stringify(this._config));
    const items = newConfig.consumers.items;
    [items[index], items[index + 1]] = [items[index + 1], items[index]];
    this._config = newConfig;
    if (this._expandedConsumerIndex === index) {
      this._expandedConsumerIndex = index + 1;
    } else if (this._expandedConsumerIndex === index + 1) {
      this._expandedConsumerIndex = index;
    }
    this._eventManager.fireEvent(this._config);
    this.requestUpdate();
  }
  _removeConsumer(index) {
    if (!this._config?.consumers?.items || !this._eventManager) return;
    const newConfig = JSON.parse(JSON.stringify(this._config));
    newConfig.consumers.items.splice(index, 1);
    this._config = newConfig;
    if (this._expandedConsumerIndex === index) {
      this._expandedConsumerIndex = null;
    } else if (this._expandedConsumerIndex !== null && this._expandedConsumerIndex > index) {
      this._expandedConsumerIndex--;
    }
    this._eventManager.fireEvent(this._config);
    this.requestUpdate();
  }
  // PV Bar Item Handlers
  _togglePVBarItem(index) {
    this._expandedPVBarIndex = this._expandedPVBarIndex === index ? null : index;
    this.requestUpdate();
  }
  _addPVBarItem() {
    if (!this._config || !this._eventManager) return;
    const newConfig = JSON.parse(JSON.stringify(this._config));
    if (!newConfig.pv) newConfig.pv = {};
    if (!newConfig.pv.entities) newConfig.pv.entities = [];
    if (newConfig.pv.entities.length >= 5) return;
    newConfig.pv.entities.push({ entity: "", name: "", max_power: 0 });
    this._config = newConfig;
    this._expandedPVBarIndex = newConfig.pv.entities.length - 1;
    this._eventManager.fireEvent(this._config);
    this.requestUpdate();
  }
  _duplicatePVBarItem(index) {
    const pvEntities = this._config?.pv?.entities;
    if (!pvEntities || !this._eventManager) return;
    if (pvEntities.length >= 5) return;
    const newConfig = JSON.parse(JSON.stringify(this._config));
    const itemToDuplicate = JSON.parse(JSON.stringify(newConfig.pv.entities[index]));
    newConfig.pv.entities.splice(index + 1, 0, itemToDuplicate);
    this._config = newConfig;
    this._expandedPVBarIndex = index + 1;
    this._eventManager.fireEvent(this._config);
    this.requestUpdate();
  }
  _movePVBarItemUp(index) {
    const pvEntities = this._config?.pv?.entities;
    if (!pvEntities || index === 0 || !this._eventManager) return;
    const newConfig = JSON.parse(JSON.stringify(this._config));
    const items = newConfig.pv.entities;
    [items[index - 1], items[index]] = [items[index], items[index - 1]];
    this._config = newConfig;
    if (this._expandedPVBarIndex === index) {
      this._expandedPVBarIndex = index - 1;
    } else if (this._expandedPVBarIndex === index - 1) {
      this._expandedPVBarIndex = index;
    }
    this._eventManager.fireEvent(this._config);
    this.requestUpdate();
  }
  _movePVBarItemDown(index) {
    const pvEntities = this._config?.pv?.entities;
    if (!pvEntities || index === pvEntities.length - 1 || !this._eventManager) return;
    const newConfig = JSON.parse(JSON.stringify(this._config));
    const items = newConfig.pv.entities;
    [items[index], items[index + 1]] = [items[index + 1], items[index]];
    this._config = newConfig;
    if (this._expandedPVBarIndex === index) {
      this._expandedPVBarIndex = index + 1;
    } else if (this._expandedPVBarIndex === index + 1) {
      this._expandedPVBarIndex = index;
    }
    this._eventManager.fireEvent(this._config);
    this.requestUpdate();
  }
  _removePVBarItem(index) {
    const pvEntities = this._config?.pv?.entities;
    if (!pvEntities || !this._eventManager) return;
    const newConfig = JSON.parse(JSON.stringify(this._config));
    newConfig.pv.entities.splice(index, 1);
    this._config = newConfig;
    if (this._expandedPVBarIndex === index) {
      this._expandedPVBarIndex = null;
    } else if (this._expandedPVBarIndex !== null && this._expandedPVBarIndex > index) {
      this._expandedPVBarIndex--;
    }
    this._eventManager.fireEvent(this._config);
    this.requestUpdate();
  }
  // Battery Bar Item Handlers
  _toggleBatteryBarItem(index) {
    this._expandedBatteryBarIndex = this._expandedBatteryBarIndex === index ? null : index;
    this.requestUpdate();
  }
  _addBatteryBarItem() {
    if (!this._config || !this._eventManager) return;
    const newConfig = JSON.parse(JSON.stringify(this._config));
    if (!newConfig.batterie) newConfig.batterie = {};
    if (!newConfig.batterie.entities) newConfig.batterie.entities = [];
    if (newConfig.batterie.entities.length >= 5) return;
    newConfig.batterie.entities.push({ entity: "", name: "", capacity: 0 });
    this._config = newConfig;
    this._expandedBatteryBarIndex = newConfig.batterie.entities.length - 1;
    this._eventManager.fireEvent(this._config);
    this.requestUpdate();
  }
  _duplicateBatteryBarItem(index) {
    const batteryEntities = this._config?.batterie?.entities;
    if (!batteryEntities || !this._eventManager) return;
    if (batteryEntities.length >= 5) return;
    const newConfig = JSON.parse(JSON.stringify(this._config));
    const itemToDuplicate = JSON.parse(JSON.stringify(newConfig.batterie.entities[index]));
    newConfig.batterie.entities.splice(index + 1, 0, itemToDuplicate);
    this._config = newConfig;
    this._expandedBatteryBarIndex = index + 1;
    this._eventManager.fireEvent(this._config);
    this.requestUpdate();
  }
  _moveBatteryBarItemUp(index) {
    const batteryEntities = this._config?.batterie?.entities;
    if (!batteryEntities || index === 0 || !this._eventManager) return;
    const newConfig = JSON.parse(JSON.stringify(this._config));
    const items = newConfig.batterie.entities;
    [items[index - 1], items[index]] = [items[index], items[index - 1]];
    this._config = newConfig;
    if (this._expandedBatteryBarIndex === index) {
      this._expandedBatteryBarIndex = index - 1;
    } else if (this._expandedBatteryBarIndex === index - 1) {
      this._expandedBatteryBarIndex = index;
    }
    this._eventManager.fireEvent(this._config);
    this.requestUpdate();
  }
  _moveBatteryBarItemDown(index) {
    const batteryEntities = this._config?.batterie?.entities;
    if (!batteryEntities || index === batteryEntities.length - 1 || !this._eventManager) return;
    const newConfig = JSON.parse(JSON.stringify(this._config));
    const items = newConfig.batterie.entities;
    [items[index], items[index + 1]] = [items[index + 1], items[index]];
    this._config = newConfig;
    if (this._expandedBatteryBarIndex === index) {
      this._expandedBatteryBarIndex = index + 1;
    } else if (this._expandedBatteryBarIndex === index + 1) {
      this._expandedBatteryBarIndex = index;
    }
    this._eventManager.fireEvent(this._config);
    this.requestUpdate();
  }
  _removeBatteryBarItem(index) {
    const batteryEntities = this._config?.batterie?.entities;
    if (!batteryEntities || !this._eventManager) return;
    const newConfig = JSON.parse(JSON.stringify(this._config));
    newConfig.batterie.entities.splice(index, 1);
    this._config = newConfig;
    if (this._expandedBatteryBarIndex === index) {
      this._expandedBatteryBarIndex = null;
    } else if (this._expandedBatteryBarIndex !== null && this._expandedBatteryBarIndex > index) {
      this._expandedBatteryBarIndex--;
    }
    this._eventManager.fireEvent(this._config);
    this.requestUpdate();
  }
  _renderTab(id2, label, icon) {
    return x`
            <button
                class="tab ${this._activeTab === id2 ? "active" : ""}"
                @click=${() => this._activeTab = id2}
            >
                <ha-icon .icon=${icon}></ha-icon>
                ${label}
            </button>
        `;
  }
  render() {
    if (!this._config) return x``;
    const t2 = this._getT();
    return x`
            <div class="card-config">
                <div class="tabs">
                    ${this._renderTab("general", t2.editor.tab_general, "mdi:cog")}
                    ${this._renderTab("elements", t2.editor.tab_elements || "Elements", "mdi:view-dashboard")}
                    ${this._renderTab("cards", t2.editor.tab_cards || "Cards", "mdi:card-multiple")}
                </div>

                <div class="tab-content ${this._activeTab === "general" ? "active" : ""}">
                    ${renderGeneralMainTab(
      this._config,
      this.hass,
      this._expandedSections,
      this._activeSubTab.get("general") || "layout",
      this._entityPickerStates,
      (id2) => this._toggleSection(id2),
      (subTab) => this._onSubTabChange("general", subTab),
      (key, state2) => this._onEntityPickerStateChange(key, state2),
      (path, value) => this._onChange(path, value),
      (config) => this._onConfigChange(config),
      t2
    )}
                </div>

                <div class="tab-content ${this._activeTab === "elements" ? "active" : ""}">
                    ${renderElementsMainTab(
      this._config,
      this.hass,
      this._expandedSections,
      this._activeSubTab.get("elements") || "header",
      this._expandedConsumerIndex,
      this._expandedConsumerSubsections,
      this._entityPickerStates,
      (id2) => this._toggleSection(id2),
      (subTab) => this._onSubTabChange("elements", subTab),
      (index) => this._toggleConsumer(index),
      (index, subsectionId) => this._toggleConsumerSubsection(index, subsectionId),
      (key, state2) => this._onEntityPickerStateChange(key, state2),
      (path, value) => this._onChange(path, value),
      (path, key, value) => this._onTapActionChange(path, key, value),
      () => this._addConsumer(),
      (index) => this._duplicateConsumer(index),
      (index) => this._moveConsumerUp(index),
      (index) => this._moveConsumerDown(index),
      (index) => this._removeConsumer(index),
      t2
    )}
                </div>

                <div class="tab-content ${this._activeTab === "cards" ? "active" : ""}">
                    ${renderCardsMainTab(
      this._config,
      this.hass,
      this._expandedSections,
      this._activeSubTab.get("cards") || "pv",
      this._activeContextTab.get(this._activeSubTab.get("cards") || "pv") || "card",
      this._expandedPVBarIndex,
      this._expandedBatteryBarIndex,
      this._entityPickerStates,
      (id2) => this._toggleSection(id2),
      (subTab) => this._onSubTabChange("cards", subTab),
      (contextTab) => this._onContextTabChange(this._activeSubTab.get("cards") || "pv", contextTab),
      (index) => this._togglePVBarItem(index),
      (index) => this._toggleBatteryBarItem(index),
      (key, state2) => this._onEntityPickerStateChange(key, state2),
      (path, value) => this._onChange(path, value),
      (path, key, value) => this._onTapActionChange(path, key, value),
      () => this._addPVBarItem(),
      (index) => this._duplicatePVBarItem(index),
      (index) => this._movePVBarItemUp(index),
      (index) => this._movePVBarItemDown(index),
      (index) => this._removePVBarItem(index),
      () => this._addBatteryBarItem(),
      (index) => this._duplicateBatteryBarItem(index),
      (index) => this._moveBatteryBarItemUp(index),
      (index) => this._moveBatteryBarItemDown(index),
      (index) => this._removeBatteryBarItem(index),
      renderPVTab,
      renderPVBarTab,
      renderBatteryTab,
      renderBatteryBarTab,
      renderHouseTab,
      renderGridTab,
      t2
    )}
                </div>
            </div>
        `;
  }
};
_PVMonitorCardEditor.styles = editorStyles;
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
], PVMonitorCardEditor.prototype, "_activeSubTab");
__decorateClass([
  r()
], PVMonitorCardEditor.prototype, "_activeContextTab");
__decorateClass([
  r()
], PVMonitorCardEditor.prototype, "_expandedSections");
__decorateClass([
  r()
], PVMonitorCardEditor.prototype, "_expandedConsumerIndex");
__decorateClass([
  r()
], PVMonitorCardEditor.prototype, "_expandedConsumerSubsections");
__decorateClass([
  r()
], PVMonitorCardEditor.prototype, "_expandedPVBarIndex");
__decorateClass([
  r()
], PVMonitorCardEditor.prototype, "_expandedBatteryBarIndex");
__decorateClass([
  r()
], PVMonitorCardEditor.prototype, "_entityPickerStates");
if (!customElements.get(EDITOR_TAG)) {
  customElements.define(EDITOR_TAG, PVMonitorCardEditor);
}
const editor = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PVMonitorCardEditor
}, Symbol.toStringTag, { value: "Module" }));
export {
  PVMonitorCard
};
