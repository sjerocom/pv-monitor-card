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
      animation_style: "Animationsstil",
      animation_style_helper: "Wählen Sie den Animationseffekt",
      animation_rotating_dots: "Rotierende Punkte",
      animation_particle_field: "Partikelfeld",
      animation_electric_arc: "Elektrische Bögen",
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
      header_background: "Header-Hintergrund",
      enable_header_background: "Header-Hintergrund aktivieren",
      enable_header_background_helper: "Hintergrund für Titel/Untertitel-Bereich aktivieren",
      header_background_color: "Header Hintergrundfarbe",
      header_border_color: "Header Rahmenfarbe",
      header_border_radius: "Header Border Radius",
      header_padding: "Header Padding",
      header_width: "Header Breite",
      header_width_helper: "Auto = zentriert mit Inhaltsgröße, Full = volle Breite",
      header_width_auto: "Auto (Inhaltsgröße)",
      header_width_full: "Full (100% Breite)",
      header_box_shadow: "Header Box Shadow",
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
      select_theme: "Theme auswählen",
      tab_consumers: "Verbraucher",
      consumers_settings: "Verbraucher-Einstellungen",
      enable_consumers: "Verbraucher-Leiste aktivieren",
      consumers_position: "Position",
      consumers_sort_mode: "Sortierung",
      sort_highest_first: "Höchster zuerst",
      sort_lowest_first: "Niedrigster zuerst",
      sort_none: "Keine Sortierung (Eingabe-Reihenfolge)",
      sort_alpha_asc: "Alphabetisch aufsteigend",
      sort_alpha_desc: "Alphabetisch absteigend",
      consumers_threshold: "Globaler Schwellwert (W)",
      consumers_threshold_helper: "Verbraucher unter diesem Wert werden nicht angezeigt",
      add_consumer: "Verbraucher hinzufügen",
      remove_consumer: "Verbraucher entfernen",
      consumer_entity: "Nr:",
      consumer_icon: "Icon",
      consumer_label: "Bezeichnung",
      consumer_threshold: "Individueller Schwellwert (W)",
      consumer_auto_color: "Automatische Farbanpassung",
      consumer_auto_color_helper: "Farbe basierend auf Verbrauch (grün bis purple)",
      consumer_item_styling: "Verbraucher Styling",
      consumer_primary_entity: "Primär Entity (für Wert)",
      consumer_primary_text: "Primär Text (überschreibt Wert)",
      consumer_show_primary: "Primär-Zeile anzeigen",
      consumer_secondary_entity: "Sekundär Entity (für Label)",
      consumer_secondary_text: "Sekundär Text (überschreibt Label)",
      consumer_show_secondary: "Sekundär-Zeile anzeigen",
      consumer_switch_entity: "Switch Entity (für Toggle)",
      consumer_switch_entity_helper: "Optional: Switch zum Ein-/Ausschalten",
      consumer_tap_actions: "Tap Actions",
      show_consumer_total_in_house: "Gesamtverbrauch als Sekundär-Text",
      show_consumer_total_helper: "Zeigt Summe aller Consumer unter Hausverbrauch"
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
      animation_style: "Animation Style",
      animation_style_helper: "Choose the animation effect",
      animation_rotating_dots: "Rotating Dots",
      animation_particle_field: "Particle Field",
      animation_electric_arc: "Electric Arc",
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
      header_background: "Header Background",
      enable_header_background: "Enable Header Background",
      enable_header_background_helper: "Enable background for title/subtitle area",
      header_background_color: "Header Background Color",
      header_border_color: "Header Border Color",
      header_border_radius: "Header Border Radius",
      header_padding: "Header Padding",
      header_width: "Header Width",
      header_width_helper: "Auto = centered with content size, Full = full width",
      header_width_auto: "Auto (Content Size)",
      header_width_full: "Full (100% Width)",
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
      select_theme: "Select Theme",
      tab_consumers: "Consumers",
      consumers_settings: "Consumer Settings",
      enable_consumers: "Enable Consumer Bar",
      consumers_position: "Position",
      consumers_sort_mode: "Sort Mode",
      sort_highest_first: "Highest First",
      sort_lowest_first: "Lowest First",
      sort_none: "No Sorting (Input Order)",
      sort_alpha_asc: "Alphabetical Ascending",
      sort_alpha_desc: "Alphabetical Descending",
      consumers_threshold: "Global Threshold (W)",
      consumers_threshold_helper: "Consumers below this value won't be displayed",
      add_consumer: "Add Consumer",
      remove_consumer: "Remove Consumer",
      consumer_entity: "Nr:",
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
      show_consumer_total_in_house: "Show Total as Secondary Text",
      show_consumer_total_helper: "Shows sum of all consumers under house consumption"
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
      animation_style: "Style d'Animation",
      animation_style_helper: "Choisir l'effet d'animation",
      animation_rotating_dots: "Points Rotatifs",
      animation_particle_field: "Champ de Particules",
      animation_electric_arc: "Arc Électrique",
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
      header_background: "Arrière-plan En-tête",
      enable_header_background: "Activer Arrière-plan En-tête",
      enable_header_background_helper: "Activer l'arrière-plan pour la zone titre/sous-titre",
      header_background_color: "Couleur Arrière-plan En-tête",
      header_border_color: "Couleur Bordure En-tête",
      header_border_radius: "Rayon Bordure En-tête",
      header_padding: "Espacement En-tête",
      header_width: "Largeur En-tête",
      header_width_helper: "Auto = centré avec taille du contenu, Full = pleine largeur",
      header_width_auto: "Auto (Taille Contenu)",
      header_width_full: "Full (100% Largeur)",
      header_box_shadow: "Ombre En-tête",
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
      select_theme: "Sélectionner Thème",
      tab_consumers: "Consommateurs",
      consumers_settings: "Paramètres Consommateurs",
      enable_consumers: "Activer Barre Consommateurs",
      consumers_position: "Position",
      consumers_sort_mode: "Mode de Tri",
      sort_highest_first: "Plus Élevé en Premier",
      sort_lowest_first: "Plus Faible en Premier",
      sort_none: "Pas de Tri (Ordre de Saisie)",
      sort_alpha_asc: "Alphabétique Croissant",
      sort_alpha_desc: "Alphabétique Décroissant",
      consumers_threshold: "Seuil Global (W)",
      consumers_threshold_helper: "Les consommateurs en dessous ne seront pas affichés",
      add_consumer: "Ajouter Consommateur",
      remove_consumer: "Supprimer Consommateur",
      consumer_entity: "Nr:",
      consumer_icon: "Icône",
      consumer_label: "Libellé",
      consumer_threshold: "Seuil Individuel (W)",
      consumer_auto_color: "Couleur Automatique",
      consumer_auto_color_helper: "Couleur basée sur la consommation (vert à violet)",
      consumer_item_styling: "Style Consommateur",
      consumer_primary_entity: "Entité Primaire (pour valeur)",
      consumer_primary_text: "Texte Primaire (remplace valeur)",
      consumer_show_primary: "Afficher Ligne Primaire",
      consumer_secondary_entity: "Entité Secondaire (pour libellé)",
      consumer_secondary_text: "Texte Secondaire (remplace libellé)",
      consumer_show_secondary: "Afficher Ligne Secondaire",
      consumer_switch_entity: "Entité Switch (pour basculer)",
      consumer_switch_entity_helper: "Optionnel: Switch pour activer/désactiver",
      consumer_tap_actions: "Actions Tactiles",
      show_consumer_total_in_house: "Afficher Total comme Texte Secondaire",
      show_consumer_total_helper: "Affiche la somme de tous les consommateurs sous la consommation maison"
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
      animation_style: "Stile Animazione",
      animation_style_helper: "Scegli l'effetto di animazione",
      animation_rotating_dots: "Punti Rotanti",
      animation_particle_field: "Campo di Particelle",
      animation_electric_arc: "Arco Elettrico",
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
      header_background: "Sfondo Intestazione",
      enable_header_background: "Attiva Sfondo Intestazione",
      enable_header_background_helper: "Attiva sfondo per l'area titolo/sottotitolo",
      header_background_color: "Colore Sfondo Intestazione",
      header_border_color: "Colore Bordo Intestazione",
      header_border_radius: "Raggio Bordo Intestazione",
      header_padding: "Spaziatura Intestazione",
      header_width: "Larghezza Intestazione",
      header_width_helper: "Auto = centrato con dimensione contenuto, Full = larghezza completa",
      header_width_auto: "Auto (Dimensione Contenuto)",
      header_width_full: "Full (100% Larghezza)",
      header_box_shadow: "Ombra Intestazione",
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
      select_theme: "Seleziona Tema",
      tab_consumers: "Consumatori",
      consumers_settings: "Impostazioni Consumatori",
      enable_consumers: "Attiva Barra Consumatori",
      consumers_position: "Posizione",
      consumers_sort_mode: "Modalità Ordinamento",
      sort_highest_first: "Più Alto per Primo",
      sort_lowest_first: "Più Basso per Primo",
      sort_none: "Nessun Ordinamento (Ordine di Inserimento)",
      sort_alpha_asc: "Alfabetico Crescente",
      sort_alpha_desc: "Alfabetico Decrescente",
      consumers_threshold: "Soglia Globale (W)",
      consumers_threshold_helper: "I consumatori sotto questo valore non verranno visualizzati",
      add_consumer: "Aggiungi Consumatore",
      remove_consumer: "Rimuovi Consumatore",
      consumer_entity: "Nr:",
      consumer_icon: "Icona",
      consumer_label: "Etichetta",
      consumer_threshold: "Soglia Individuale (W)",
      consumer_auto_color: "Colore Automatico",
      consumer_auto_color_helper: "Colore basato sul consumo (verde a viola)",
      consumer_item_styling: "Stile Consumatore",
      consumer_primary_entity: "Entità Primaria (per valore)",
      consumer_primary_text: "Testo Primario (sostituisce valore)",
      consumer_show_primary: "Mostra Riga Primaria",
      consumer_secondary_entity: "Entità Secondaria (per etichetta)",
      consumer_secondary_text: "Testo Secondario (sostituisce etichetta)",
      consumer_show_secondary: "Mostra Riga Secondaria",
      consumer_switch_entity: "Entità Switch (per commutare)",
      consumer_switch_entity_helper: "Opzionale: Switch per accendere/spegnere",
      consumer_tap_actions: "Azioni Tocco",
      show_consumer_total_in_house: "Mostra Totale come Testo Secondario",
      show_consumer_total_helper: "Mostra la somma di tutti i consumatori sotto il consumo casa"
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
      animation_style: "Estilo de Animación",
      animation_style_helper: "Elige el efecto de animación",
      animation_rotating_dots: "Puntos Rotatorios",
      animation_particle_field: "Campo de Partículas",
      animation_electric_arc: "Arco Eléctrico",
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
      header_background: "Fondo Encabezado",
      enable_header_background: "Activar Fondo Encabezado",
      enable_header_background_helper: "Activar fondo para el área título/subtítulo",
      header_background_color: "Color Fondo Encabezado",
      header_border_color: "Color Borde Encabezado",
      header_border_radius: "Radio Borde Encabezado",
      header_padding: "Espaciado Encabezado",
      header_width: "Ancho Encabezado",
      header_width_helper: "Auto = centrado con tamaño del contenido, Full = ancho completo",
      header_width_auto: "Auto (Tamaño Contenido)",
      header_width_full: "Full (100% Ancho)",
      header_box_shadow: "Sombra Encabezado",
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
      select_theme: "Seleccionar Tema",
      tab_consumers: "Consumidores",
      consumers_settings: "Configuración Consumidores",
      enable_consumers: "Activar Barra Consumidores",
      consumers_position: "Posición",
      consumers_sort_mode: "Modo de Ordenación",
      sort_highest_first: "Más Alto Primero",
      sort_lowest_first: "Más Bajo Primero",
      sort_none: "Sin Ordenación (Orden de Entrada)",
      sort_alpha_asc: "Alfabético Ascendente",
      sort_alpha_desc: "Alfabético Descendente",
      consumers_threshold: "Umbral Global (W)",
      consumers_threshold_helper: "Los consumidores por debajo no se mostrarán",
      add_consumer: "Añadir Consumidor",
      remove_consumer: "Eliminar Consumidor",
      consumer_entity: "Nr:",
      consumer_icon: "Icono",
      consumer_label: "Etiqueta",
      consumer_threshold: "Umbral Individual (W)",
      consumer_auto_color: "Color Automático",
      consumer_auto_color_helper: "Color basado en consumo (verde a púrpura)",
      consumer_item_styling: "Estilo Consumidor",
      consumer_primary_entity: "Entidad Primaria (para valor)",
      consumer_primary_text: "Texto Primario (sobrescribe valor)",
      consumer_show_primary: "Mostrar Línea Primaria",
      consumer_secondary_entity: "Entidad Secundaria (para etiqueta)",
      consumer_secondary_text: "Texto Secundario (sobrescribe etiqueta)",
      consumer_show_secondary: "Mostrar Línea Secundaria",
      consumer_switch_entity: "Entidad Switch (para conmutar)",
      consumer_switch_entity_helper: "Opcional: Switch para encender/apagar",
      consumer_tap_actions: "Acciones Táctiles",
      show_consumer_total_in_house: "Mostrar Total como Texto Secundario",
      show_consumer_total_helper: "Muestra la suma de todos los consumidores bajo el consumo casa"
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
      infobar_value_color: "white",
      consumer_background_color: "rgba(21, 20, 27, 1)",
      consumer_border_color: "rgba(255, 255, 255, 0.1)",
      consumer_primary_color: "white",
      consumer_secondary_color: "rgba(255, 255, 255, 0.7)"
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
      infobar_value_color: "rgba(0, 0, 0, 0.87)",
      consumer_background_color: "rgba(250, 250, 250, 1)",
      consumer_border_color: "rgba(0, 0, 0, 0.1)",
      consumer_primary_color: "rgba(0, 0, 0, 0.87)",
      consumer_secondary_color: "rgba(0, 0, 0, 0.6)"
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
      infobar_value_color: "rgba(226, 232, 240, 1)",
      consumer_background_color: "rgba(30, 41, 59, 1)",
      consumer_border_color: "rgba(59, 130, 246, 0.3)",
      consumer_primary_color: "rgba(96, 165, 250, 1)",
      consumer_secondary_color: "rgba(148, 163, 184, 1)"
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
      infobar_value_color: "rgba(240, 253, 244, 1)",
      consumer_background_color: "rgba(22, 40, 25, 1)",
      consumer_border_color: "rgba(34, 197, 94, 0.3)",
      consumer_primary_color: "rgba(74, 222, 128, 1)",
      consumer_secondary_color: "rgba(187, 247, 208, 0.7)"
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
      infobar_value_color: "rgba(220, 220, 220, 1)",
      consumer_background_color: "rgba(40, 40, 40, 1)",
      consumer_border_color: "rgba(128, 128, 128, 0.3)",
      consumer_primary_color: "rgba(240, 240, 240, 1)",
      consumer_secondary_color: "rgba(180, 180, 180, 1)"
    }
  },
  solarized: {
    id: "solarized",
    name: "Solarized Dark",
    colors: {
      card_background_color: "rgba(0, 43, 54, 1)",
      card_border_color: "rgba(88, 110, 117, 0.3)",
      card_text_color: "rgba(131, 148, 150, 1)",
      primary_color: "rgba(147, 161, 161, 1)",
      secondary_color: "rgba(131, 148, 150, 0.8)",
      title_color: "rgba(38, 139, 210, 1)",
      subtitle_color: "rgba(101, 123, 131, 1)",
      infobar_background_color: "rgba(7, 54, 66, 1)",
      infobar_border_color: "rgba(88, 110, 117, 0.3)",
      infobar_icon_color: "rgba(42, 161, 152, 1)",
      infobar_label_color: "rgba(101, 123, 131, 1)",
      infobar_value_color: "rgba(147, 161, 161, 1)",
      consumer_background_color: "rgba(7, 54, 66, 1)",
      consumer_border_color: "rgba(88, 110, 117, 0.3)",
      consumer_primary_color: "rgba(147, 161, 161, 1)",
      consumer_secondary_color: "rgba(101, 123, 131, 1)"
    }
  },
  nord: {
    id: "nord",
    name: "Nord",
    colors: {
      card_background_color: "rgba(46, 52, 64, 1)",
      card_border_color: "rgba(136, 192, 208, 0.3)",
      card_text_color: "rgba(236, 239, 244, 1)",
      primary_color: "rgba(216, 222, 233, 1)",
      secondary_color: "rgba(229, 233, 240, 0.8)",
      title_color: "rgba(136, 192, 208, 1)",
      subtitle_color: "rgba(216, 222, 233, 0.7)",
      infobar_background_color: "rgba(59, 66, 82, 1)",
      infobar_border_color: "rgba(136, 192, 208, 0.3)",
      infobar_icon_color: "rgba(143, 188, 187, 1)",
      infobar_label_color: "rgba(216, 222, 233, 0.7)",
      infobar_value_color: "rgba(236, 239, 244, 1)",
      consumer_background_color: "rgba(59, 66, 82, 1)",
      consumer_border_color: "rgba(136, 192, 208, 0.3)",
      consumer_primary_color: "rgba(216, 222, 233, 1)",
      consumer_secondary_color: "rgba(216, 222, 233, 0.7)"
    }
  },
  dracula: {
    id: "dracula",
    name: "Dracula",
    colors: {
      card_background_color: "rgba(40, 42, 54, 1)",
      card_border_color: "rgba(189, 147, 249, 0.3)",
      card_text_color: "rgba(248, 248, 242, 1)",
      primary_color: "rgba(139, 233, 253, 1)",
      secondary_color: "rgba(248, 248, 242, 0.8)",
      title_color: "rgba(189, 147, 249, 1)",
      subtitle_color: "rgba(248, 248, 242, 0.7)",
      infobar_background_color: "rgba(68, 71, 90, 1)",
      infobar_border_color: "rgba(189, 147, 249, 0.3)",
      infobar_icon_color: "rgba(255, 121, 198, 1)",
      infobar_label_color: "rgba(248, 248, 242, 0.7)",
      infobar_value_color: "rgba(248, 248, 242, 1)",
      consumer_background_color: "rgba(68, 71, 90, 1)",
      consumer_border_color: "rgba(189, 147, 249, 0.3)",
      consumer_primary_color: "rgba(139, 233, 253, 1)",
      consumer_secondary_color: "rgba(248, 248, 242, 0.7)"
    }
  },
  catppuccin: {
    id: "catppuccin",
    name: "Catppuccin Mocha",
    colors: {
      card_background_color: "rgba(30, 30, 46, 1)",
      card_border_color: "rgba(137, 180, 250, 0.3)",
      card_text_color: "rgba(205, 214, 244, 1)",
      primary_color: "rgba(137, 180, 250, 1)",
      secondary_color: "rgba(205, 214, 244, 0.8)",
      title_color: "rgba(203, 166, 247, 1)",
      subtitle_color: "rgba(186, 194, 222, 1)",
      infobar_background_color: "rgba(49, 50, 68, 1)",
      infobar_border_color: "rgba(137, 180, 250, 0.3)",
      infobar_icon_color: "rgba(148, 226, 213, 1)",
      infobar_label_color: "rgba(186, 194, 222, 1)",
      infobar_value_color: "rgba(205, 214, 244, 1)",
      consumer_background_color: "rgba(49, 50, 68, 1)",
      consumer_border_color: "rgba(137, 180, 250, 0.3)",
      consumer_primary_color: "rgba(137, 180, 250, 1)",
      consumer_secondary_color: "rgba(186, 194, 222, 1)"
    }
  },
  material: {
    id: "material",
    name: "Material Design",
    colors: {
      card_background_color: "rgba(18, 18, 18, 1)",
      card_border_color: "rgba(3, 218, 198, 0.3)",
      card_text_color: "rgba(255, 255, 255, 0.87)",
      primary_color: "rgba(3, 218, 198, 1)",
      secondary_color: "rgba(255, 255, 255, 0.6)",
      title_color: "rgba(3, 218, 198, 1)",
      subtitle_color: "rgba(255, 255, 255, 0.6)",
      infobar_background_color: "rgba(33, 33, 33, 1)",
      infobar_border_color: "rgba(3, 218, 198, 0.3)",
      infobar_icon_color: "rgba(3, 218, 198, 1)",
      infobar_label_color: "rgba(255, 255, 255, 0.6)",
      infobar_value_color: "rgba(255, 255, 255, 0.87)",
      consumer_background_color: "rgba(33, 33, 33, 1)",
      consumer_border_color: "rgba(3, 218, 198, 0.3)",
      consumer_primary_color: "rgba(3, 218, 198, 1)",
      consumer_secondary_color: "rgba(255, 255, 255, 0.6)"
    }
  },
  minimalist: {
    id: "minimalist",
    name: "Minimalist",
    colors: {
      card_background_color: "rgba(242, 242, 242, 1)",
      card_border_color: "rgba(0, 0, 0, 0.1)",
      card_text_color: "rgba(33, 33, 33, 1)",
      primary_color: "rgba(33, 33, 33, 1)",
      secondary_color: "rgba(117, 117, 117, 1)",
      title_color: "rgba(33, 33, 33, 1)",
      subtitle_color: "rgba(117, 117, 117, 1)",
      infobar_background_color: "rgba(255, 255, 255, 1)",
      infobar_border_color: "rgba(0, 0, 0, 0.1)",
      infobar_icon_color: "rgba(66, 66, 66, 1)",
      infobar_label_color: "rgba(117, 117, 117, 1)",
      infobar_value_color: "rgba(33, 33, 33, 1)",
      consumer_background_color: "rgba(255, 255, 255, 1)",
      consumer_border_color: "rgba(0, 0, 0, 0.1)",
      consumer_primary_color: "rgba(33, 33, 33, 1)",
      consumer_secondary_color: "rgba(117, 117, 117, 1)"
    }
  },
  slate: {
    id: "slate",
    name: "Slate",
    colors: {
      card_background_color: "rgba(30, 41, 59, 1)",
      card_border_color: "rgba(148, 163, 184, 0.3)",
      card_text_color: "rgba(226, 232, 240, 1)",
      primary_color: "rgba(100, 116, 139, 1)",
      secondary_color: "rgba(148, 163, 184, 1)",
      title_color: "rgba(148, 163, 184, 1)",
      subtitle_color: "rgba(148, 163, 184, 0.8)",
      infobar_background_color: "rgba(51, 65, 85, 1)",
      infobar_border_color: "rgba(148, 163, 184, 0.3)",
      infobar_icon_color: "rgba(148, 163, 184, 1)",
      infobar_label_color: "rgba(148, 163, 184, 0.8)",
      infobar_value_color: "rgba(226, 232, 240, 1)",
      consumer_background_color: "rgba(51, 65, 85, 1)",
      consumer_border_color: "rgba(148, 163, 184, 0.3)",
      consumer_primary_color: "rgba(148, 163, 184, 1)",
      consumer_secondary_color: "rgba(148, 163, 184, 0.8)"
    }
  },
  sunset: {
    id: "sunset",
    name: "Sunset",
    colors: {
      card_background_color: "rgba(30, 20, 40, 1)",
      card_border_color: "rgba(255, 120, 80, 0.3)",
      card_text_color: "rgba(255, 230, 200, 1)",
      primary_color: "rgba(255, 170, 100, 1)",
      secondary_color: "rgba(255, 200, 150, 0.8)",
      title_color: "rgba(255, 140, 80, 1)",
      subtitle_color: "rgba(255, 180, 120, 0.7)",
      infobar_background_color: "rgba(40, 30, 50, 1)",
      infobar_border_color: "rgba(255, 120, 80, 0.3)",
      infobar_icon_color: "rgba(255, 170, 100, 1)",
      infobar_label_color: "rgba(255, 180, 120, 0.7)",
      infobar_value_color: "rgba(255, 230, 200, 1)",
      consumer_background_color: "rgba(40, 30, 50, 1)",
      consumer_border_color: "rgba(255, 120, 80, 0.3)",
      consumer_primary_color: "rgba(255, 170, 100, 1)",
      consumer_secondary_color: "rgba(255, 180, 120, 0.7)"
    }
  },
  ocean: {
    id: "ocean",
    name: "Ocean",
    colors: {
      card_background_color: "rgba(10, 25, 47, 1)",
      card_border_color: "rgba(0, 180, 216, 0.3)",
      card_text_color: "rgba(224, 242, 254, 1)",
      primary_color: "rgba(56, 189, 248, 1)",
      secondary_color: "rgba(125, 211, 252, 0.8)",
      title_color: "rgba(14, 165, 233, 1)",
      subtitle_color: "rgba(125, 211, 252, 0.7)",
      infobar_background_color: "rgba(15, 35, 60, 1)",
      infobar_border_color: "rgba(0, 180, 216, 0.3)",
      infobar_icon_color: "rgba(56, 189, 248, 1)",
      infobar_label_color: "rgba(125, 211, 252, 0.7)",
      infobar_value_color: "rgba(224, 242, 254, 1)",
      consumer_background_color: "rgba(15, 35, 60, 1)",
      consumer_border_color: "rgba(0, 180, 216, 0.3)",
      consumer_primary_color: "rgba(56, 189, 248, 1)",
      consumer_secondary_color: "rgba(125, 211, 252, 0.7)"
    }
  },
  purple: {
    id: "purple",
    name: "Purple",
    colors: {
      card_background_color: "rgba(24, 24, 40, 1)",
      card_border_color: "rgba(168, 85, 247, 0.3)",
      card_text_color: "rgba(250, 245, 255, 1)",
      primary_color: "rgba(192, 132, 252, 1)",
      secondary_color: "rgba(216, 180, 254, 0.8)",
      title_color: "rgba(168, 85, 247, 1)",
      subtitle_color: "rgba(216, 180, 254, 0.7)",
      infobar_background_color: "rgba(30, 30, 50, 1)",
      infobar_border_color: "rgba(168, 85, 247, 0.3)",
      infobar_icon_color: "rgba(192, 132, 252, 1)",
      infobar_label_color: "rgba(216, 180, 254, 0.7)",
      infobar_value_color: "rgba(250, 245, 255, 1)",
      consumer_background_color: "rgba(30, 30, 50, 1)",
      consumer_border_color: "rgba(168, 85, 247, 0.3)",
      consumer_primary_color: "rgba(192, 132, 252, 1)",
      consumer_secondary_color: "rgba(216, 180, 254, 0.7)"
    }
  },
  matrix: {
    id: "matrix",
    name: "Matrix",
    colors: {
      card_background_color: "rgba(0, 0, 0, 1)",
      card_border_color: "rgba(0, 255, 65, 0.3)",
      card_text_color: "rgba(0, 255, 65, 1)",
      primary_color: "rgba(0, 255, 65, 1)",
      secondary_color: "rgba(0, 200, 50, 0.8)",
      title_color: "rgba(0, 255, 65, 1)",
      subtitle_color: "rgba(0, 200, 50, 0.7)",
      infobar_background_color: "rgba(0, 10, 0, 1)",
      infobar_border_color: "rgba(0, 255, 65, 0.3)",
      infobar_icon_color: "rgba(0, 255, 65, 1)",
      infobar_label_color: "rgba(0, 200, 50, 0.7)",
      infobar_value_color: "rgba(0, 255, 65, 1)",
      consumer_background_color: "rgba(0, 10, 0, 1)",
      consumer_border_color: "rgba(0, 255, 65, 0.3)",
      consumer_primary_color: "rgba(0, 255, 65, 1)",
      consumer_secondary_color: "rgba(0, 200, 50, 0.7)"
    }
  },
  bobs_burgers: {
    id: "bobs_burgers",
    name: "Bob's Burgers",
    colors: {
      card_background_color: "rgba(235, 231, 213, 1)",
      card_border_color: "rgba(206, 48, 45, 0.4)",
      card_text_color: "rgba(42, 54, 59, 1)",
      primary_color: "rgba(206, 48, 45, 1)",
      secondary_color: "rgba(42, 54, 59, 0.8)",
      title_color: "rgba(206, 48, 45, 1)",
      subtitle_color: "rgba(249, 176, 58, 1)",
      infobar_background_color: "rgba(249, 241, 230, 1)",
      infobar_border_color: "rgba(206, 48, 45, 0.3)",
      infobar_icon_color: "rgba(206, 48, 45, 1)",
      infobar_label_color: "rgba(42, 54, 59, 0.7)",
      infobar_value_color: "rgba(42, 54, 59, 1)",
      consumer_background_color: "rgba(249, 241, 230, 1)",
      consumer_border_color: "rgba(206, 48, 45, 0.3)",
      consumer_primary_color: "rgba(206, 48, 45, 1)",
      consumer_secondary_color: "rgba(42, 54, 59, 0.7)"
    }
  },
  simpsons: {
    id: "simpsons",
    name: "The Simpsons",
    colors: {
      card_background_color: "#FFD90F",
      card_border_color: "#FED41D",
      card_text_color: "#1A1A1A",
      primary_color: "#00A8E1",
      secondary_color: "#FF6B35",
      title_color: "#1A1A1A",
      subtitle_color: "#4A4A4A",
      infobar_background_color: "#FED41D",
      infobar_border_color: "#FFB300",
      infobar_icon_color: "#00A8E1",
      infobar_label_color: "#1A1A1A",
      infobar_value_color: "#4A4A4A",
      consumer_background_color: "#FFE55C",
      consumer_border_color: "#FFB300",
      consumer_primary_color: "#00A8E1",
      consumer_secondary_color: "#FF6B35"
    }
  },
  family_guy: {
    id: "family_guy",
    name: "Family Guy",
    colors: {
      card_background_color: "#FFFFFF",
      card_border_color: "#1E3A8A",
      card_text_color: "#1A1A1A",
      primary_color: "#DC2626",
      secondary_color: "#FBBF24",
      title_color: "#1E3A8A",
      subtitle_color: "#4A5568",
      infobar_background_color: "#F0F4FF",
      infobar_border_color: "#1E3A8A",
      infobar_icon_color: "#DC2626",
      infobar_label_color: "#1E3A8A",
      infobar_value_color: "#4A5568",
      consumer_background_color: "#E0E7FF",
      consumer_border_color: "#1E3A8A",
      consumer_primary_color: "#DC2626",
      consumer_secondary_color: "#FBBF24"
    }
  },
  hal9000: {
    id: "hal9000",
    name: "HAL 9000",
    colors: {
      card_background_color: "#0A0A0A",
      card_border_color: "#CC0000",
      card_text_color: "#E0E0E0",
      primary_color: "#FF0000",
      secondary_color: "#CC0000",
      title_color: "#FF0000",
      subtitle_color: "#CC0000",
      infobar_background_color: "#1A1A1A",
      infobar_border_color: "#CC0000",
      infobar_icon_color: "#FF0000",
      infobar_label_color: "#E0E0E0",
      infobar_value_color: "#CC0000",
      consumer_background_color: "#0F0F0F",
      consumer_border_color: "#990000",
      consumer_primary_color: "#FF0000",
      consumer_secondary_color: "#CC0000"
    }
  },
  terminator: {
    id: "terminator",
    name: "Terminator",
    colors: {
      card_background_color: "#1A1A1A",
      card_border_color: "#B91C1C",
      card_text_color: "#E0E0E0",
      primary_color: "#DC2626",
      secondary_color: "#7C3AED",
      title_color: "#DC2626",
      subtitle_color: "#9CA3AF",
      infobar_background_color: "#262626",
      infobar_border_color: "#991B1B",
      infobar_icon_color: "#EF4444",
      infobar_label_color: "#D1D5DB",
      infobar_value_color: "#9CA3AF",
      consumer_background_color: "#0F0F0F",
      consumer_border_color: "#7C2D12",
      consumer_primary_color: "#DC2626",
      consumer_secondary_color: "#7C3AED"
    }
  },
  dr_who: {
    id: "dr_who",
    name: "Doctor Who",
    colors: {
      card_background_color: "#003B6F",
      card_border_color: "#1E40AF",
      card_text_color: "#FFFFFF",
      primary_color: "#0EA5E9",
      secondary_color: "#F59E0B",
      title_color: "#38BDF8",
      subtitle_color: "#93C5FD",
      infobar_background_color: "#002347",
      infobar_border_color: "#1E3A8A",
      infobar_icon_color: "#38BDF8",
      infobar_label_color: "#DBEAFE",
      infobar_value_color: "#93C5FD",
      consumer_background_color: "#001529",
      consumer_border_color: "#1E40AF",
      consumer_primary_color: "#0EA5E9",
      consumer_secondary_color: "#F59E0B"
    }
  },
  rick_morty: {
    id: "rick_morty",
    name: "Rick & Morty",
    colors: {
      card_background_color: "#1A3A52",
      card_border_color: "#22C55E",
      card_text_color: "#F0F0F0",
      primary_color: "#22C55E",
      secondary_color: "#FACC15",
      title_color: "#10B981",
      subtitle_color: "#94A3B8",
      infobar_background_color: "#0F2537",
      infobar_border_color: "#16A34A",
      infobar_icon_color: "#22C55E",
      infobar_label_color: "#E0E0E0",
      infobar_value_color: "#94A3B8",
      consumer_background_color: "#0A1A28",
      consumer_border_color: "#15803D",
      consumer_primary_color: "#22C55E",
      consumer_secondary_color: "#FACC15"
    }
  },
  frankenstein: {
    id: "frankenstein",
    name: "Frankenstein",
    colors: {
      card_background_color: "#1C1C1C",
      card_border_color: "#4A5D23",
      card_text_color: "#D4D4D4",
      primary_color: "#84CC16",
      secondary_color: "#A78BFA",
      title_color: "#84CC16",
      subtitle_color: "#94A3B8",
      infobar_background_color: "#262626",
      infobar_border_color: "#3F5120",
      infobar_icon_color: "#A3E635",
      infobar_label_color: "#D4D4D4",
      infobar_value_color: "#94A3B8",
      consumer_background_color: "#0F0F0F",
      consumer_border_color: "#365314",
      consumer_primary_color: "#84CC16",
      consumer_secondary_color: "#A78BFA"
    }
  },
  mr_robot: {
    id: "mr_robot",
    name: "Mr. Robot",
    colors: {
      card_background_color: "#0A0A0A",
      card_border_color: "#1F1F1F",
      card_text_color: "#00FF00",
      primary_color: "#00FF00",
      secondary_color: "#FF0000",
      title_color: "#00FF00",
      subtitle_color: "#00AA00",
      infobar_background_color: "#000000",
      infobar_border_color: "#1A1A1A",
      infobar_icon_color: "#00FF00",
      infobar_label_color: "#00DD00",
      infobar_value_color: "#00AA00",
      consumer_background_color: "#050505",
      consumer_border_color: "#0F0F0F",
      consumer_primary_color: "#00FF00",
      consumer_secondary_color: "#FF0000"
    }
  },
  breaking_bad: {
    id: "breaking_bad",
    name: "Breaking Bad",
    colors: {
      card_background_color: "#1A1A1A",
      card_border_color: "#065F46",
      card_text_color: "#E5E5E5",
      primary_color: "#10B981",
      secondary_color: "#EAB308",
      title_color: "#10B981",
      subtitle_color: "#9CA3AF",
      infobar_background_color: "#0F0F0F",
      infobar_border_color: "#047857",
      infobar_icon_color: "#10B981",
      infobar_label_color: "#D1D5DB",
      infobar_value_color: "#9CA3AF",
      consumer_background_color: "#050505",
      consumer_border_color: "#065F46",
      consumer_primary_color: "#10B981",
      consumer_secondary_color: "#EAB308"
    }
  },
  squid_game: {
    id: "squid_game",
    name: "Squid Game",
    colors: {
      card_background_color: "#1A1A1A",
      card_border_color: "#DC2626",
      card_text_color: "#F9FAFB",
      primary_color: "#EF4444",
      secondary_color: "#059669",
      title_color: "#DC2626",
      subtitle_color: "#F87171",
      infobar_background_color: "#0F0F0F",
      infobar_border_color: "#B91C1C",
      infobar_icon_color: "#EF4444",
      infobar_label_color: "#F3F4F6",
      infobar_value_color: "#FCA5A5",
      consumer_background_color: "#050505",
      consumer_border_color: "#991B1B",
      consumer_primary_color: "#DC2626",
      consumer_secondary_color: "#059669"
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
      card_background_color: theme.colors.card_background_color,
      card_border_color: theme.colors.card_border_color,
      card_text_color: theme.colors.card_text_color,
      primary_color: theme.colors.primary_color,
      secondary_color: theme.colors.secondary_color,
      title_color: theme.colors.title_color,
      subtitle_color: theme.colors.subtitle_color,
      ...config.style
    },
    info_bar: {
      ...config.info_bar,
      style: {
        background_color: theme.colors.infobar_background_color,
        border_color: theme.colors.infobar_border_color,
        icon_color: theme.colors.infobar_icon_color,
        label_color: theme.colors.infobar_label_color,
        value_color: theme.colors.infobar_value_color,
        ...config.info_bar?.style
      }
    },
    consumers: {
      ...config.consumers,
      style: {
        item_background_color: theme.colors.consumer_background_color,
        item_border_color: theme.colors.consumer_border_color,
        ...config.consumers?.style
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
    entities: themedConfig.entities,
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
function getPVRotationSpeed(power, maxPower = 1e4) {
  const abs_w = Math.abs(power);
  if (abs_w < 10) return 60;
  const ratio = abs_w / maxPower;
  const speed = Math.max(2, 30 - ratio * 28);
  return speed;
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
      return getAnimationStyle(color, duration);
  }
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
  }
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
  _handleAction(event, actions, isHausCard = false) {
    if (isHausCard && this.config.consumers?.show && (this.config.consumers?.items?.length ?? 0) > 0) {
      if (event.type === "click") {
        this._consumersVisible = !this._consumersVisible;
        this.requestUpdate();
        return;
      }
    }
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
      const serviceData = { ...tapAction.service_data || {} };
      if (tapAction.target) {
        Object.assign(serviceData, tapAction.target);
      }
      if (this.hass.callService) {
        this.hass.callService(domain, service, serviceData);
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
    const animationType = config.cardConfig?.animation_style || "rotating-dots";
    const isHaus = config.isHausCard || false;
    return x`
            <div class="card"
                 style="${this._getCardStyle(cardStyle)}"
                 @click=${(e2) => this._handleAction(e2, { tap: config.cardConfig?.tap_action }, isHaus)}
                 @dblclick=${(e2) => this._handleAction(e2, { double_tap: config.cardConfig?.double_tap_action }, isHaus)}
                 @contextmenu=${(e2) => this._handleAction(e2, { hold: config.cardConfig?.hold_action }, isHaus)}>
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
    let customIconStyle = "";
    if (shouldRotate) {
      const rotationSpeed = getPVRotationSpeed(value, maxPower);
      customIconStyle = `animation: continuousRotation ${rotationSpeed}s linear infinite;`;
    }
    return this._renderCard({
      cardConfig: this.config.pv,
      icon: this.config.pv.icon || "mdi:white-balance-sunny",
      primaryValue: formatPower(value),
      secondaryText: this._getTextFromEntityOrConfig(this.config.pv.secondary_entity, this.config.pv.secondary_text),
      tertiaryText: this._getTextFromEntityOrConfig(this.config.pv.tertiary_entity, this.config.pv.tertiary_text),
      animStyle: this.config.pv.animation ? getPVColor(value, maxPower) : { color: "", duration: 0, show: false },
      customIconStyle
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
    let secondaryText = this._getTextFromEntityOrConfig(this.config.haus.secondary_entity, this.config.haus.secondary_text);
    if (this.config.haus.show_consumer_total && this.config.consumers?.show && this.config.consumers.items) {
      const totalConsumerPower = this._calculateTotalConsumerPower();
      if (totalConsumerPower > 0) {
        secondaryText = formatPower(totalConsumerPower);
      }
    }
    return this._renderCard({
      cardConfig: this.config.haus,
      icon: this.config.haus.icon || "mdi:home",
      primaryValue: formatPower(value),
      secondaryText,
      tertiaryText: this._getTextFromEntityOrConfig(this.config.haus.tertiary_entity, this.config.haus.tertiary_text),
      animStyle: this.config.haus.animation ? getHausColor(value) : { color: "", duration: 0, show: false },
      isHausCard: true
    });
  }
  _calculateTotalConsumerPower() {
    if (!this.config.consumers?.items || !this.hass) return 0;
    const items = this.config.consumers.items;
    const globalThreshold = this.config.consumers.threshold ?? 0;
    let total = 0;
    for (const item of items) {
      const entity = this.hass.states[item.entity];
      if (!entity) continue;
      const value = parseFloat(entity.state) || 0;
      const threshold = item.threshold !== void 0 ? item.threshold : globalThreshold;
      if (value > threshold) {
        total += value;
      }
    }
    return total;
  }
  _renderConsumers() {
    if (!this.config.consumers?.show || !this.hass || !this._consumersVisible) return x``;
    const items = this.config.consumers.items || [];
    if (items.length === 0) return x``;
    const globalThreshold = this.config.consumers.threshold ?? 0;
    const globalStyle = this.config.consumers.style;
    const consumerData = items.map((item) => {
      const entity = this.hass.states[item.entity];
      if (!entity) return null;
      const value = parseFloat(entity.state) || 0;
      const threshold = item.threshold !== void 0 ? item.threshold : globalThreshold;
      if (value <= threshold) return null;
      return {
        item,
        entity,
        value,
        label: item.label || entity.attributes.friendly_name || item.entity
      };
    }).filter((d2) => d2 !== null);
    if (consumerData.length === 0) return x``;
    const sortMode = this.config.consumers.sort_mode || "highest_first";
    if (sortMode === "highest_first") {
      consumerData.sort((a2, b2) => b2.value - a2.value);
    } else if (sortMode === "lowest_first") {
      consumerData.sort((a2, b2) => a2.value - b2.value);
    } else if (sortMode === "alpha_asc") {
      consumerData.sort((a2, b2) => a2.label.localeCompare(b2.label));
    } else if (sortMode === "alpha_desc") {
      consumerData.sort((a2, b2) => b2.label.localeCompare(a2.label));
    }
    return x`
            <div class="consumers-bar" style="gap: ${globalStyle.gap};">
                ${consumerData.map((data) => this._renderConsumerItem(data))}
            </div>
        `;
  }
  _renderConsumerItem(data) {
    const { item, entity, value, label } = data;
    const globalStyle = this.config.consumers.style;
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
      } else if (item.primary_entity && this.hass) {
        const primaryEntity = this.hass.states[item.primary_entity];
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
      } else if (item.secondary_entity && this.hass) {
        const secondaryEntity = this.hass.states[item.secondary_entity];
        if (secondaryEntity) {
          secondaryText = `${secondaryEntity.state} ${secondaryEntity.attributes.unit_of_measurement || ""}`;
        } else {
          secondaryText = label;
        }
      } else {
        secondaryText = label;
      }
    }
    const hasSwitchEntity = !!item.switch_entity;
    const tapAction = item.tap_action || (hasSwitchEntity ? { action: "call-service", service: "switch.toggle", target: { entity_id: item.switch_entity } } : { action: "none" });
    const doubleTapAction = item.double_tap_action || { action: "none" };
    const holdAction = item.hold_action || { action: "none" };
    return x`
            <div class="consumer-item"
                 style="${containerStyle}"
                 @click=${(e2) => this._handleConsumerAction(e2, tapAction)}
                 @dblclick=${(e2) => this._handleConsumerAction(e2, doubleTapAction)}
                 @contextmenu=${(e2) => {
      e2.preventDefault();
      this._handleConsumerAction(e2, holdAction);
    }}>
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
  _handleConsumerAction(event, action) {
    if (!action || action.action === "none") return;
    this._handleTap(action);
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
    const headerBackgroundEnabled = s2.header_background_enabled ?? false;
    const headerWidth = s2.header_width ?? "auto";
    let headerStyle = `margin-bottom: ${s2.header_margin_bottom || "12px"};`;
    if (headerBackgroundEnabled) {
      headerStyle += `
                background: ${s2.header_background_color};
                border: 1px solid ${s2.header_border_color};
                border-radius: ${s2.header_border_radius};
                padding: ${s2.header_padding};
                box-shadow: ${s2.header_box_shadow};
                width: ${headerWidth === "full" ? "100%" : "fit-content"};
                ${headerWidth === "auto" ? "margin-left: auto; margin-right: auto;" : ""}
            `;
    }
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
            ${this._renderConsumers()}
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
__decorateClass$1([
  n2()
], PVMonitorCard.prototype, "_consumersVisible");
if (!customElements.get(CARD_TAG)) {
  customElements.define(CARD_TAG, PVMonitorCard);
}
window.customCards = window.customCards || [];
window.customCards.push({
  type: "pv-monitor-card",
  name: "PV Monitor Card",
  description: "Monitor your PV-System with Battery-Info, Calculations, Grid status and Devices Power Consumtion",
  preview: true,
  documentationURL: "https://github.com/sjerocom/pv-monitor-card"
});
console.info(
  "%c PV-MONITOR-CARD %c Version: 0.0.104 ",
  "color: orange; font-weight: bold; background: black",
  "color: white; font-weight: bold; background: dimgray"
);
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
    this._expandedConsumerIndex = null;
    this._expandedSections = /* @__PURE__ */ new Set(["entities"]);
    this._expandedConsumerSubsections = /* @__PURE__ */ new Map();
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
  _renderAnimationSelector(cardType, animationEnabled, currentStyle) {
    const t2 = this._getT();
    if (!animationEnabled) return x``;
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
                            .value=${currentStyle || "rotating-dots"}
                            .items=${animationOptions}
                            item-value-path="value"
                            item-label-path="label"
                            @value-changed=${(ev) => {
      if (!this._config) return;
      const newValue = ev.detail?.value;
      if (!newValue) return;
      const newConfig = { ...this._config };
      if (!newConfig[cardType]) newConfig[cardType] = {};
      newConfig[cardType].animation_style = newValue;
      this._config = newConfig;
      this._fireEvent();
    }}
                    ></ha-combo-box>
                </div>
            </div>
        `;
  }
  _renderTapActions(cardType) {
    this._getT();
    const config = cardType === "info_bar" ? this._config?.info_bar : this._config?.[cardType];
    return this._renderCollapsibleSection(
      `${cardType}_tap_actions`,
      "mdi:gesture-tap",
      "Tap Actions",
      x`
                ${this._renderActionSelector("Tap Action", [cardType, "tap_action"], config?.tap_action)}
                ${this._renderActionSelector("Double Tap", [cardType, "double_tap_action"], config?.double_tap_action)}
                ${this._renderActionSelector("Hold Action", [cardType, "hold_action"], config?.hold_action)}
            `
    );
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
  _renderColorPicker(label, path, value, placeholder, helper) {
    return x`
            <div class="option">
                <div class="option-label">
                    ${label}
                    ${helper ? x`<div class="info-text">${helper}</div>` : ""}
                </div>
                <div class="option-control">
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <input
                                type="color"
                                .value=${this._convertToHex(value || "")}
                                @input=${(ev) => {
      const target = ev.target;
      const hexColor = target.value;
      if (!this._config) return;
      const newConfig = JSON.parse(JSON.stringify(this._config));
      let current = newConfig;
      for (let i2 = 0; i2 < path.length - 1; i2++) {
        if (!current[path[i2]]) current[path[i2]] = {};
        current = current[path[i2]];
      }
      current[path[path.length - 1]] = hexColor;
      this._config = newConfig;
      this._fireEvent();
    }}
                                style="width: 50px; height: 36px; cursor: pointer; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 4px;"
                        />
                        <ha-textfield
                                .value=${value || ""}
                                .placeholder=${placeholder || "rgba(255, 255, 255, 1) or #ffffff"}
                                @input=${(ev) => this._valueChanged(ev, path)}
                                style="flex: 1;"
                        ></ha-textfield>
                    </div>
                </div>
            </div>
        `;
  }
  _convertToHex(color) {
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
  _renderEntityPicker(label, path, value, helper, required = false) {
    if (!this.hass) return x``;
    const entities = Object.keys(this.hass.states).sort();
    const t2 = this._getT();
    const pathKey = path.join(".");
    const filteredEntities = this._autocompleteResults.get(pathKey) || [];
    const showDropdown = this._showAutocomplete.get(pathKey) || false;
    return x`
            <div class="option" style="${showDropdown ? "z-index: 1000; position: relative;" : ""}">
                <div class="option-label ${required ? "required" : ""}">
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
                                @focus=${(ev) => {
      const currentValue = value || "";
      if (!currentValue) {
        this._autocompleteResults.set(pathKey, entities.slice(0, 50));
        this._showAutocomplete.set(pathKey, true);
        this.requestUpdate();
      }
      setTimeout(() => {
        const target = ev.target;
        const dropdown = target.parentElement?.querySelector(".autocomplete-dropdown");
        if (dropdown) {
          const rect = target.getBoundingClientRect();
          dropdown.style.top = `${rect.bottom + 4}px`;
          dropdown.style.left = `${rect.left}px`;
          dropdown.style.width = `${Math.max(rect.width, 400)}px`;
        }
      }, 10);
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
            ${this._renderCollapsibleSection(
      "entities",
      "mdi:link-variant",
      t2.editor.central_entities,
      x`
                        ${this._renderEntityPicker(t2.editor.entity_pv_production, ["entities", "pv_production"], this._config?.entities?.pv_production, t2.editor.entity_pv_production_helper, true)}
                        ${this._renderEntityPicker(t2.editor.entity_battery_soc, ["entities", "battery_soc"], this._config?.entities?.battery_soc, t2.editor.entity_battery_soc_helper)}
                        ${this._renderEntityPicker(t2.editor.entity_battery_charge, ["entities", "battery_charge"], this._config?.entities?.battery_charge, t2.editor.entity_battery_charge_helper)}
                        ${this._renderEntityPicker(t2.editor.entity_battery_discharge, ["entities", "battery_discharge"], this._config?.entities?.battery_discharge, t2.editor.entity_battery_discharge_helper)}
                        ${this._renderEntityPicker(t2.editor.entity_house_consumption, ["entities", "house_consumption"], this._config?.entities?.house_consumption, t2.editor.entity_house_consumption_helper, true)}
                        ${this._renderEntityPicker(t2.editor.entity_grid_power, ["entities", "grid_power"], this._config?.entities?.grid_power, t2.editor.entity_grid_power_helper, true)}
                    `,
      t2.editor.central_entities_helper
    )}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
      "config",
      "mdi:cog",
      t2.editor.central_config,
      x`
                        ${this._renderNumberfield(t2.editor.pv_max_power_label, ["pv_max_power"], this._config?.pv_max_power, 0, 1e5, 100, t2.editor.pv_max_power_helper)}
                        ${this._renderNumberfield(t2.editor.battery_capacity_label, ["battery_capacity"], this._config?.battery_capacity, 0, 1e5, 100, t2.editor.battery_capacity_label_helper)}
                        ${this._renderNumberfield(t2.editor.grid_threshold_label, ["grid_threshold"], this._config?.grid_threshold, 0, 1e3, 10, t2.editor.grid_threshold_helper)}
                    `,
      t2.editor.central_config_helper
    )}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
      "visibility",
      "mdi:eye",
      t2.editor.card_visibility,
      x`
                        ${this._renderSwitch(t2.editor.show_pv_card, ["pv", "show"], this._config?.pv?.show !== false)}
                        ${this._renderSwitch(t2.editor.show_battery_card, ["batterie", "show"], this._config?.batterie?.show !== false)}
                        ${this._renderSwitch(t2.editor.show_house_card, ["haus", "show"], this._config?.haus?.show !== false)}
                        ${this._renderSwitch(t2.editor.show_grid_card, ["netz", "show"], this._config?.netz?.show !== false)}
                    `
    )}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
      "header",
      "mdi:card-text",
      t2.editor.card_header,
      x`
                        ${this._renderTextfield(t2.editor.title, ["title"], this._config?.title, t2.editor.title_placeholder, t2.editor.title_helper)}
                        ${this._renderTextfield(t2.editor.subtitle, ["subtitle"], this._config?.subtitle, t2.editor.subtitle_placeholder, t2.editor.subtitle_helper)}
                        ${this._renderIconPicker(t2.editor.icon, ["icon"], this._config?.icon, t2.editor.icon_helper)}
                    `
    )}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
      "language",
      "mdi:translate",
      t2.editor.language,
      x`${this._renderLanguageSelector()}`
    )}
        `;
  }
  _renderInfoBarTab() {
    const t2 = this._getT();
    return x`
            ${this._renderCollapsibleSection(
      "infobar_main",
      "mdi:information",
      t2.editor.infobar_settings,
      x`
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
                    `
    )}

            ${this._config?.info_bar?.show ? x`
                <div class="divider"></div>

                ${this._renderTapActions("info_bar")}

                <div class="divider"></div>

                ${this._renderCollapsibleSection(
      "infobar_calculation",
      "mdi:calculator",
      t2.editor.calculation_mode,
      x`
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
                        `,
      t2.editor.calculation_mode_helper
    )}

                <div class="divider"></div>

                ${this._renderCollapsibleSection(
      "infobar_item1",
      "mdi:numeric-1-box",
      `${t2.editor.item} 1`,
      x`
                            ${this._renderEntityPicker(t2.editor.entity, ["info_bar", "item1", "entity"], this._config?.info_bar?.item1?.entity)}
                            ${this._renderIconPicker(t2.editor.icon_label, ["info_bar", "item1", "icon"], this._config?.info_bar?.item1?.icon)}
                            ${this._renderTextfield(t2.editor.label, ["info_bar", "item1", "label"], this._config?.info_bar?.item1?.label, t2.editor.default_autarky)}
                            ${this._renderTextfield(t2.editor.unit, ["info_bar", "item1", "unit"], this._config?.info_bar?.item1?.unit, "%")}
                        `
    )}

                <div class="divider"></div>

                ${this._renderCollapsibleSection(
      "infobar_item2",
      "mdi:numeric-2-box",
      `${t2.editor.item} 2`,
      x`
                            ${this._renderEntityPicker(t2.editor.entity, ["info_bar", "item2", "entity"], this._config?.info_bar?.item2?.entity)}
                            ${this._renderIconPicker(t2.editor.icon_label, ["info_bar", "item2", "icon"], this._config?.info_bar?.item2?.icon)}
                            ${this._renderTextfield(t2.editor.label, ["info_bar", "item2", "label"], this._config?.info_bar?.item2?.label, t2.editor.default_runtime)}
                            ${this._renderTextfield(t2.editor.unit, ["info_bar", "item2", "unit"], this._config?.info_bar?.item2?.unit)}
                        `
    )}

                <div class="divider"></div>

                ${this._renderCollapsibleSection(
      "infobar_item3",
      "mdi:numeric-3-box",
      `${t2.editor.item} 3`,
      x`
                            ${this._renderEntityPicker(t2.editor.entity, ["info_bar", "item3", "entity"], this._config?.info_bar?.item3?.entity)}
                            ${this._renderIconPicker(t2.editor.icon_label, ["info_bar", "item3", "icon"], this._config?.info_bar?.item3?.icon)}
                            ${this._renderTextfield(t2.editor.label, ["info_bar", "item3", "label"], this._config?.info_bar?.item3?.label, t2.editor.default_chargetime)}
                            ${this._renderTextfield(t2.editor.unit, ["info_bar", "item3", "unit"], this._config?.info_bar?.item3?.unit)}
                        `
    )}
            ` : ""}
        `;
  }
  _renderPVTab() {
    const t2 = this._getT();
    return x`
            ${this._renderCollapsibleSection(
      "pv_main",
      "mdi:solar-panel",
      t2.editor.pv_system,
      x`
                        ${this._renderIconPicker(t2.editor.icon_label, ["pv", "icon"], this._config?.pv?.icon)}
                        ${this._renderSwitch(t2.editor.enable_animation, ["pv", "animation"], this._config?.pv?.animation)}
                        ${this._renderAnimationSelector("pv", this._config?.pv?.animation, this._config?.pv?.animation_style)}
                        ${this._renderSwitch(t2.editor.icon_rotation, ["pv", "icon_rotation"], this._config?.pv?.icon_rotation, t2.editor.icon_rotation_helper)}
                    `
    )}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
      "pv_texts",
      "mdi:text",
      t2.editor.additional_texts,
      x`
                        ${this._renderEntityPicker(t2.editor.secondary_entity, ["pv", "secondary_entity"], this._config?.pv?.secondary_entity, t2.editor.secondary_entity_helper)}
                        ${this._renderTextfield(t2.editor.secondary_text, ["pv", "secondary_text"], this._config?.pv?.secondary_text, "", t2.editor.secondary_text_helper)}
                        ${this._renderEntityPicker(t2.editor.tertiary_entity, ["pv", "tertiary_entity"], this._config?.pv?.tertiary_entity)}
                        ${this._renderTextfield(t2.editor.tertiary_text, ["pv", "tertiary_text"], this._config?.pv?.tertiary_text)}
                    `
    )}

            <div class="divider"></div>

            ${this._renderTapActions("pv")}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
      "pv_styling",
      "mdi:palette",
      t2.editor.styling,
      x`
                        ${this._renderColorPicker(t2.editor.background_color, ["pv", "style", "background_color"], this._config?.pv?.style?.background_color, "rgba(21, 20, 27, 1)")}
                        ${this._renderColorPicker(t2.editor.border_color, ["pv", "style", "border_color"], this._config?.pv?.style?.border_color, "rgba(255, 255, 255, 0.1)")}
                        ${this._renderColorPicker(t2.editor.primary_color, ["pv", "style", "primary_color"], this._config?.pv?.style?.primary_color)}
                        ${this._renderColorPicker(t2.editor.secondary_color, ["pv", "style", "secondary_color"], this._config?.pv?.style?.secondary_color)}
                        ${this._renderColorPicker(t2.editor.icon_color, ["pv", "style", "icon_color"], this._config?.pv?.style?.icon_color)}
                    `
    )}
        `;
  }
  _renderBatteryTab() {
    const t2 = this._getT();
    return x`
            ${this._renderCollapsibleSection(
      "battery_main",
      "mdi:battery",
      t2.editor.battery,
      x`
                        ${this._renderIconPicker(t2.editor.icon_label, ["batterie", "icon"], this._config?.batterie?.icon, t2.editor.icon_auto_helper)}
                        ${this._renderSwitch(t2.editor.enable_animation, ["batterie", "animation"], this._config?.batterie?.animation)}
                        ${this._renderAnimationSelector("batterie", this._config?.batterie?.animation, this._config?.batterie?.animation_style)}
                    `
    )}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
      "battery_texts",
      "mdi:text",
      t2.editor.additional_texts,
      x`
                        ${this._renderEntityPicker(t2.editor.secondary_entity, ["batterie", "secondary_entity"], this._config?.batterie?.secondary_entity)}
                        ${this._renderTextfield(t2.editor.secondary_text, ["batterie", "secondary_text"], this._config?.batterie?.secondary_text)}
                        ${this._renderEntityPicker(t2.editor.tertiary_entity, ["batterie", "tertiary_entity"], this._config?.batterie?.tertiary_entity)}
                        ${this._renderTextfield(t2.editor.tertiary_text, ["batterie", "tertiary_text"], this._config?.batterie?.tertiary_text)}
                    `
    )}

            <div class="divider"></div>

            ${this._renderTapActions("batterie")}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
      "battery_styling",
      "mdi:palette",
      t2.editor.styling,
      x`
                        ${this._renderColorPicker(t2.editor.background_color, ["batterie", "style", "background_color"], this._config?.batterie?.style?.background_color)}
                        ${this._renderColorPicker(t2.editor.border_color, ["batterie", "style", "border_color"], this._config?.batterie?.style?.border_color)}
                        ${this._renderColorPicker(t2.editor.primary_color, ["batterie", "style", "primary_color"], this._config?.batterie?.style?.primary_color)}
                        ${this._renderColorPicker(t2.editor.secondary_color, ["batterie", "style", "secondary_color"], this._config?.batterie?.style?.secondary_color)}
                        ${this._renderColorPicker(t2.editor.icon_color, ["batterie", "style", "icon_color"], this._config?.batterie?.style?.icon_color)}
                    `
    )}
        `;
  }
  _renderHouseTab() {
    const t2 = this._getT();
    return x`
            ${this._renderCollapsibleSection(
      "house_main",
      "mdi:home",
      t2.editor.house_consumption,
      x`
                        ${this._renderIconPicker(t2.editor.icon_label, ["haus", "icon"], this._config?.haus?.icon)}
                        ${this._renderSwitch(t2.editor.enable_animation, ["haus", "animation"], this._config?.haus?.animation)}
                        ${this._renderAnimationSelector("haus", this._config?.haus?.animation, this._config?.haus?.animation_style)}
                    `
    )}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
      "house_texts",
      "mdi:text",
      t2.editor.additional_texts,
      x`
                        ${this._renderSwitch(t2.editor.show_consumer_total_in_house, ["haus", "show_consumer_total"], this._config?.haus?.show_consumer_total, t2.editor.show_consumer_total_helper)}
                        ${this._renderEntityPicker(t2.editor.secondary_entity, ["haus", "secondary_entity"], this._config?.haus?.secondary_entity)}
                        ${this._renderTextfield(t2.editor.secondary_text, ["haus", "secondary_text"], this._config?.haus?.secondary_text)}
                        ${this._renderEntityPicker(t2.editor.tertiary_entity, ["haus", "tertiary_entity"], this._config?.haus?.tertiary_entity)}
                        ${this._renderTextfield(t2.editor.tertiary_text, ["haus", "tertiary_text"], this._config?.haus?.tertiary_text)}
                    `
    )}

            <div class="divider"></div>

            ${this._renderTapActions("haus")}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
      "house_styling",
      "mdi:palette",
      t2.editor.styling,
      x`
                        ${this._renderColorPicker(t2.editor.background_color, ["haus", "style", "background_color"], this._config?.haus?.style?.background_color)}
                        ${this._renderColorPicker(t2.editor.border_color, ["haus", "style", "border_color"], this._config?.haus?.style?.border_color)}
                        ${this._renderColorPicker(t2.editor.primary_color, ["haus", "style", "primary_color"], this._config?.haus?.style?.primary_color)}
                        ${this._renderColorPicker(t2.editor.secondary_color, ["haus", "style", "secondary_color"], this._config?.haus?.style?.secondary_color)}
                        ${this._renderColorPicker(t2.editor.icon_color, ["haus", "style", "icon_color"], this._config?.haus?.style?.icon_color)}
                    `
    )}
        `;
  }
  _renderGridTab() {
    const t2 = this._getT();
    return x`
            ${this._renderCollapsibleSection(
      "grid_main",
      "mdi:transmission-tower",
      t2.editor.grid,
      x`
                        ${this._renderIconPicker(t2.editor.icon_label, ["netz", "icon"], this._config?.netz?.icon)}
                        ${this._renderSwitch(t2.editor.enable_animation, ["netz", "animation"], this._config?.netz?.animation)}
                        ${this._renderAnimationSelector("netz", this._config?.netz?.animation, this._config?.netz?.animation_style)}
                    `
    )}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
      "grid_status",
      "mdi:text-box",
      t2.editor.status_texts,
      x`
                        ${this._renderTextfield(t2.editor.text_feed_in, ["netz", "text_einspeisen"], this._config?.netz?.text_einspeisen, t2.editor.text_feed_in_placeholder)}
                        ${this._renderTextfield(t2.editor.text_neutral, ["netz", "text_neutral"], this._config?.netz?.text_neutral, t2.editor.text_neutral_placeholder)}
                        ${this._renderTextfield(t2.editor.text_consumption, ["netz", "text_bezug"], this._config?.netz?.text_bezug, t2.editor.text_consumption_placeholder)}
                    `
    )}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
      "grid_texts",
      "mdi:text",
      t2.editor.additional_texts,
      x`
                        ${this._renderEntityPicker(t2.editor.secondary_entity, ["netz", "secondary_entity"], this._config?.netz?.secondary_entity)}
                        ${this._renderTextfield(t2.editor.secondary_text, ["netz", "secondary_text"], this._config?.netz?.secondary_text)}
                        ${this._renderEntityPicker(t2.editor.tertiary_entity, ["netz", "tertiary_entity"], this._config?.netz?.tertiary_entity)}
                        ${this._renderTextfield(t2.editor.tertiary_text, ["netz", "tertiary_text"], this._config?.netz?.tertiary_text)}
                    `
    )}

            <div class="divider"></div>

            ${this._renderTapActions("netz")}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
      "grid_styling",
      "mdi:palette",
      t2.editor.styling,
      x`
                        ${this._renderColorPicker(t2.editor.background_color, ["netz", "style", "background_color"], this._config?.netz?.style?.background_color)}
                        ${this._renderColorPicker(t2.editor.border_color, ["netz", "style", "border_color"], this._config?.netz?.style?.border_color)}
                        ${this._renderColorPicker(t2.editor.primary_color, ["netz", "style", "primary_color"], this._config?.netz?.style?.primary_color)}
                        ${this._renderColorPicker(t2.editor.secondary_color, ["netz", "style", "secondary_color"], this._config?.netz?.style?.secondary_color)}
                        ${this._renderColorPicker(t2.editor.icon_color, ["netz", "style", "icon_color"], this._config?.netz?.style?.icon_color)}
                    `
    )}
        `;
  }
  _renderConsumersTab() {
    const t2 = this._getT();
    return x`
            ${this._renderCollapsibleSection(
      "consumers_main",
      "mdi:flash",
      t2.editor.consumers_settings,
      x`
                        ${this._renderSwitch(t2.editor.enable_consumers, ["consumers", "show"], this._config?.consumers?.show)}

                        ${this._config?.consumers?.show ? x`
                            <div class="option">
                                <div class="option-label">${t2.editor.consumers_position}</div>
                                <div class="option-control">
                                    <ha-combo-box
                                            .value=${this._config?.consumers?.position || "bottom"}
                                            .items=${[
        { value: "bottom", label: t2.editor.position_bottom }
      ]}
                                            item-value-path="value"
                                            item-label-path="label"
                                            @value-changed=${(ev) => {
        if (!this._config) return;
        const newValue = ev.detail?.value;
        if (!newValue) return;
        const newConfig = { ...this._config };
        if (!newConfig.consumers) newConfig.consumers = {};
        newConfig.consumers.position = newValue;
        this._config = newConfig;
        this._fireEvent();
      }}
                                    ></ha-combo-box>
                                </div>
                            </div>

                            <div class="option">
                                <div class="option-label">${t2.editor.consumers_sort_mode}</div>
                                <div class="option-control">
                                    <ha-combo-box
                                            .value=${this._config?.consumers?.sort_mode || "highest_first"}
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
        if (!this._config) return;
        const newValue = ev.detail?.value;
        if (!newValue) return;
        const newConfig = { ...this._config };
        if (!newConfig.consumers) newConfig.consumers = {};
        newConfig.consumers.sort_mode = newValue;
        this._config = newConfig;
        this._fireEvent();
      }}
                                    ></ha-combo-box>
                                </div>
                            </div>

                            ${this._renderNumberfield(t2.editor.consumers_threshold, ["consumers", "threshold"], this._config?.consumers?.threshold, 0, 1e4, 1, t2.editor.consumers_threshold_helper)}
                        ` : ""}
                    `
    )}

            ${this._config?.consumers?.show ? x`
                <div class="divider"></div>

                ${this._renderCollapsibleSection(
      "consumers_items",
      "mdi:format-list-bulleted",
      t2.editor.add_consumer,
      x`
                            ${(this._config?.consumers?.items || []).map((item, index) => {
        const isExpanded = this._expandedConsumerIndex === index;
        const entityLabel = item.entity || t2.editor.consumer_entity;
        return x`
                                    <div class="consumer-section">
                                        <div class="consumer-header" @click=${() => this._toggleConsumer(index)}>
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
                                                ${index > 0 ? x`
                                                    <ha-icon-button
                                                            .path=${"M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"}
                                                            @click=${() => this._moveConsumerUp(index)}
                                                            title="Nach oben"
                                                    ></ha-icon-button>
                                                ` : ""}
                                                ${index < (this._config?.consumers?.items?.length || 0) - 1 ? x`
                                                    <ha-icon-button
                                                            .path=${"M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"}
                                                            @click=${() => this._moveConsumerDown(index)}
                                                            title="Nach unten"
                                                    ></ha-icon-button>
                                                ` : ""}
                                                <ha-icon-button
                                                        .path=${"M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"}
                                                        @click=${() => this._duplicateConsumer(index)}
                                                        title="Duplizieren"
                                                        style="color: rgba(33, 150, 243, 1);"
                                                ></ha-icon-button>
                                                <ha-icon-button
                                                        .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}
                                                        @click=${() => this._removeConsumer(index)}
                                                        title="Löschen"
                                                        style="color: rgba(244,67,54,1);"
                                                ></ha-icon-button>
                                            </div>
                                        </div>

                                        <div class="consumer-content ${isExpanded ? "" : "collapsed"}">
                                            ${this._renderEntityPicker(t2.editor.consumer_entity, ["consumers", "items", index.toString(), "entity"], item.entity, void 0, true)}
                                            ${this._renderIconPicker(t2.editor.consumer_icon, ["consumers", "items", index.toString(), "icon"], item.icon)}
                                            ${this._renderTextfield(t2.editor.consumer_label, ["consumers", "items", index.toString(), "label"], item.label)}
                                            ${this._renderNumberfield(t2.editor.consumer_threshold, ["consumers", "items", index.toString(), "threshold"], item.threshold, 0, 1e4, 1)}
                                            ${this._renderSwitch(t2.editor.consumer_auto_color, ["consumers", "items", index.toString(), "auto_color"], item.auto_color !== false, t2.editor.consumer_auto_color_helper)}

                                            <!-- Additional Texts Subsection -->
                                            <div class="consumer-subsection">
                                                <div class="consumer-subsection-header" @click=${() => this._toggleConsumerSubsection(index, "texts")}>
                                                    <ha-icon icon="mdi:text"></ha-icon>
                                                    ${t2.editor.additional_texts}
                                                    <ha-icon
                                                            class="expand-icon ${this._isConsumerSubsectionExpanded(index, "texts") ? "expanded" : ""}"
                                                            icon="mdi:chevron-down"
                                                            style="margin-left: auto;"
                                                    ></ha-icon>
                                                </div>
                                                <div class="consumer-subsection-content ${this._isConsumerSubsectionExpanded(index, "texts") ? "" : "collapsed"}">
                                                    ${this._renderSwitch(t2.editor.consumer_show_primary, ["consumers", "items", index.toString(), "show_primary"], item.show_primary !== false)}
                                                    ${this._renderEntityPicker(t2.editor.consumer_primary_entity, ["consumers", "items", index.toString(), "primary_entity"], item.primary_entity)}
                                                    ${this._renderTextfield(t2.editor.consumer_primary_text, ["consumers", "items", index.toString(), "primary_text"], item.primary_text)}

                                                    ${this._renderSwitch(t2.editor.consumer_show_secondary, ["consumers", "items", index.toString(), "show_secondary"], item.show_secondary !== false)}
                                                    ${this._renderEntityPicker(t2.editor.consumer_secondary_entity, ["consumers", "items", index.toString(), "secondary_entity"], item.secondary_entity)}
                                                    ${this._renderTextfield(t2.editor.consumer_secondary_text, ["consumers", "items", index.toString(), "secondary_text"], item.secondary_text)}
                                                </div>
                                            </div>

                                            <!-- Tap Actions Subsection -->
                                            <div class="consumer-subsection">
                                                <div class="consumer-subsection-header" @click=${() => this._toggleConsumerSubsection(index, "actions")}>
                                                    <ha-icon icon="mdi:gesture-tap"></ha-icon>
                                                    ${t2.editor.consumer_tap_actions}
                                                    <ha-icon
                                                            class="expand-icon ${this._isConsumerSubsectionExpanded(index, "actions") ? "expanded" : ""}"
                                                            icon="mdi:chevron-down"
                                                            style="margin-left: auto;"
                                                    ></ha-icon>
                                                </div>
                                                <div class="consumer-subsection-content ${this._isConsumerSubsectionExpanded(index, "actions") ? "" : "collapsed"}">
                                                    ${this._renderEntityPicker(t2.editor.consumer_switch_entity, ["consumers", "items", index.toString(), "switch_entity"], item.switch_entity, t2.editor.consumer_switch_entity_helper)}
                                                    ${this._renderActionSelector("Tap Action", ["consumers", "items", index.toString(), "tap_action"], item.tap_action)}
                                                    ${this._renderActionSelector("Double Tap", ["consumers", "items", index.toString(), "double_tap_action"], item.double_tap_action)}
                                                    ${this._renderActionSelector("Hold Action", ["consumers", "items", index.toString(), "hold_action"], item.hold_action)}
                                                </div>
                                            </div>

                                            <!-- Styling Subsection -->
                                            <div class="consumer-subsection">
                                                <div class="consumer-subsection-header" @click=${() => this._toggleConsumerSubsection(index, "styling")}>
                                                    <ha-icon icon="mdi:palette"></ha-icon>
                                                    ${t2.editor.consumer_item_styling}
                                                    <ha-icon
                                                            class="expand-icon ${this._isConsumerSubsectionExpanded(index, "styling") ? "expanded" : ""}"
                                                            icon="mdi:chevron-down"
                                                            style="margin-left: auto;"
                                                    ></ha-icon>
                                                </div>
                                                <div class="consumer-subsection-content ${this._isConsumerSubsectionExpanded(index, "styling") ? "" : "collapsed"}">
                                                    ${this._renderTextfield(t2.editor.icon_size, ["consumers", "items", index.toString(), "style", "icon_size"], item.style?.icon_size, "1.5em")}
                                                    ${this._renderColorPicker(t2.editor.icon_color, ["consumers", "items", index.toString(), "style", "icon_color"], item.style?.icon_color)}
                                                    ${this._renderTextfield(t2.editor.icon_opacity, ["consumers", "items", index.toString(), "style", "icon_opacity"], item.style?.icon_opacity, "1")}
                                                    ${this._renderTextfield(t2.editor.primary_size, ["consumers", "items", index.toString(), "style", "primary_size"], item.style?.primary_size, "1em")}
                                                    ${this._renderColorPicker(t2.editor.primary_color_label, ["consumers", "items", index.toString(), "style", "primary_color"], item.style?.primary_color, "white")}
                                                    ${this._renderTextfield(t2.editor.primary_opacity, ["consumers", "items", index.toString(), "style", "primary_opacity"], item.style?.primary_opacity, "1")}
                                                    ${this._renderTextfield(t2.editor.primary_font_weight, ["consumers", "items", index.toString(), "style", "primary_font_weight"], item.style?.primary_font_weight, "bold")}
                                                    ${this._renderTextfield(t2.editor.secondary_size, ["consumers", "items", index.toString(), "style", "secondary_size"], item.style?.secondary_size, "0.8em")}
                                                    ${this._renderColorPicker(t2.editor.secondary_color_label, ["consumers", "items", index.toString(), "style", "secondary_color"], item.style?.secondary_color, "white")}
                                                    ${this._renderTextfield(t2.editor.secondary_opacity, ["consumers", "items", index.toString(), "style", "secondary_opacity"], item.style?.secondary_opacity, "0.7")}
                                                    ${this._renderTextfield(t2.editor.secondary_font_weight, ["consumers", "items", index.toString(), "style", "secondary_font_weight"], item.style?.secondary_font_weight, "normal")}
                                                    ${this._renderColorPicker(t2.editor.background_color, ["consumers", "items", index.toString(), "style", "background_color"], item.style?.background_color)}
                                                    ${this._renderColorPicker(t2.editor.border_color, ["consumers", "items", index.toString(), "style", "border_color"], item.style?.border_color)}
                                                    ${this._renderTextfield(t2.editor.border_radius, ["consumers", "items", index.toString(), "style", "border_radius"], item.style?.border_radius, "12px")}
                                                    ${this._renderTextfield(t2.editor.padding, ["consumers", "items", index.toString(), "style", "padding"], item.style?.padding, "8px")}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                `;
      })}

                            <ha-button @click=${this._addConsumer}>
                                <ha-icon icon="mdi:plus"></ha-icon>
                                ${t2.editor.add_consumer}
                            </ha-button>
                        `
    )}

                <div class="divider"></div>

                ${this._renderCollapsibleSection(
      "consumers_styling",
      "mdi:palette",
      `${t2.editor.styling} (Global)`,
      x`
                            ${this._renderTextfield(t2.editor.grid_gap, ["consumers", "style", "gap"], this._config?.consumers?.style?.gap, "6px")}
                            ${this._renderColorPicker(t2.editor.background_color, ["consumers", "style", "item_background_color"], this._config?.consumers?.style?.item_background_color, "rgba(21, 20, 27, 1)")}
                            ${this._renderColorPicker(t2.editor.border_color, ["consumers", "style", "item_border_color"], this._config?.consumers?.style?.item_border_color, "rgba(255, 255, 255, 0.1)")}
                            ${this._renderTextfield(t2.editor.border_radius, ["consumers", "style", "item_border_radius"], this._config?.consumers?.style?.item_border_radius, "12px")}
                            ${this._renderTextfield(t2.editor.padding, ["consumers", "style", "item_padding"], this._config?.consumers?.style?.item_padding, "8px")}
                            ${this._renderTextfield(t2.editor.icon_size, ["consumers", "style", "icon_size"], this._config?.consumers?.style?.icon_size, "1.5em")}
                            ${this._renderTextfield(t2.editor.icon_opacity, ["consumers", "style", "icon_opacity"], this._config?.consumers?.style?.icon_opacity, "1")}
                            ${this._renderTextfield(t2.editor.primary_size, ["consumers", "style", "primary_size"], this._config?.consumers?.style?.primary_size, "1em")}
                            ${this._renderTextfield(t2.editor.primary_font_weight, ["consumers", "style", "primary_font_weight"], this._config?.consumers?.style?.primary_font_weight, "bold")}
                            ${this._renderTextfield(t2.editor.primary_opacity, ["consumers", "style", "primary_opacity"], this._config?.consumers?.style?.primary_opacity, "1")}
                            ${this._renderTextfield(t2.editor.secondary_size, ["consumers", "style", "secondary_size"], this._config?.consumers?.style?.secondary_size, "0.8em")}
                            ${this._renderTextfield(t2.editor.secondary_font_weight, ["consumers", "style", "secondary_font_weight"], this._config?.consumers?.style?.secondary_font_weight, "normal")}
                            ${this._renderTextfield(t2.editor.secondary_opacity, ["consumers", "style", "secondary_opacity"], this._config?.consumers?.style?.secondary_opacity, "0.7")}
                        `
    )}
            ` : ""}
        `;
  }
  _addConsumer() {
    if (!this._config) return;
    const newConfig = JSON.parse(JSON.stringify(this._config));
    if (!newConfig.consumers) newConfig.consumers = { items: [] };
    if (!newConfig.consumers.items) newConfig.consumers.items = [];
    newConfig.consumers.items.push({
      entity: "",
      auto_color: true
    });
    this._config = newConfig;
    this._expandedConsumerIndex = newConfig.consumers.items.length - 1;
    this._fireEvent();
  }
  _duplicateConsumer(index) {
    if (!this._config || !this._config.consumers?.items) return;
    const newConfig = JSON.parse(JSON.stringify(this._config));
    const itemToDuplicate = JSON.parse(JSON.stringify(newConfig.consumers.items[index]));
    newConfig.consumers.items.splice(index + 1, 0, itemToDuplicate);
    this._config = newConfig;
    this._expandedConsumerIndex = index + 1;
    this._fireEvent();
  }
  _moveConsumerUp(index) {
    if (!this._config || !this._config.consumers?.items || index === 0) return;
    const newConfig = JSON.parse(JSON.stringify(this._config));
    const items = newConfig.consumers.items;
    [items[index - 1], items[index]] = [items[index], items[index - 1]];
    this._config = newConfig;
    if (this._expandedConsumerIndex === index) {
      this._expandedConsumerIndex = index - 1;
    } else if (this._expandedConsumerIndex === index - 1) {
      this._expandedConsumerIndex = index;
    }
    this._fireEvent();
  }
  _moveConsumerDown(index) {
    if (!this._config || !this._config.consumers?.items || index === this._config.consumers.items.length - 1) return;
    const newConfig = JSON.parse(JSON.stringify(this._config));
    const items = newConfig.consumers.items;
    [items[index], items[index + 1]] = [items[index + 1], items[index]];
    this._config = newConfig;
    if (this._expandedConsumerIndex === index) {
      this._expandedConsumerIndex = index + 1;
    } else if (this._expandedConsumerIndex === index + 1) {
      this._expandedConsumerIndex = index;
    }
    this._fireEvent();
  }
  _removeConsumer(index) {
    if (!this._config) return;
    const newConfig = JSON.parse(JSON.stringify(this._config));
    if (!newConfig.consumers?.items) return;
    newConfig.consumers.items.splice(index, 1);
    this._config = newConfig;
    if (this._expandedConsumerIndex === index) {
      this._expandedConsumerIndex = null;
    } else if (this._expandedConsumerIndex !== null && this._expandedConsumerIndex > index) {
      this._expandedConsumerIndex--;
    }
    this._fireEvent();
  }
  _toggleConsumer(index) {
    if (this._expandedConsumerIndex === index) {
      this._expandedConsumerIndex = null;
    } else {
      this._expandedConsumerIndex = index;
    }
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
  _isConsumerSubsectionExpanded(consumerIndex, subsectionId) {
    const key = `consumer-${consumerIndex}`;
    return this._expandedConsumerSubsections.get(key)?.has(subsectionId) || false;
  }
  _toggleSection(sectionId) {
    if (this._expandedSections.has(sectionId)) {
      this._expandedSections.delete(sectionId);
    } else {
      this._expandedSections.add(sectionId);
    }
    this.requestUpdate();
  }
  _renderCollapsibleSection(sectionId, icon, title, content, infoText) {
    const isExpanded = this._expandedSections.has(sectionId);
    return x`
            <div class="section">
                <div class="section-header" @click=${() => this._toggleSection(sectionId)}>
                    <ha-icon icon="${icon}"></ha-icon>
                    ${title}
                    <ha-icon
                            class="expand-icon ${isExpanded ? "expanded" : ""}"
                            icon="mdi:chevron-down"
                    ></ha-icon>
                </div>
                <div class="section-content ${isExpanded ? "" : "collapsed"}">
                    ${infoText ? x`<div class="info-text" style="margin-bottom: 12px;">${infoText}</div>` : ""}
                    ${content}
                </div>
            </div>
        `;
  }
  _renderStylingTab() {
    const t2 = this._getT();
    return x`
            ${this._renderCollapsibleSection(
      "styling_theme",
      "mdi:palette",
      t2.editor.theme,
      x`
                        ${this._renderThemeSelector()}

                        <div class="divider" style="margin: 16px 0;"></div>

                        <div style="font-weight: 500; margin-bottom: 8px;">Theme Editor</div>
                        <div class="info-text" style="margin-bottom: 12px;">Passe alle Farben des Themes an. Ändert nicht die Karten-spezifischen Styles.</div>

                        ${this._renderColorPicker(t2.editor.background_color, ["style", "card_background_color"], this._config?.style?.card_background_color, "rgba(21, 20, 27, 1)")}
                        ${this._renderColorPicker(t2.editor.border_color, ["style", "card_border_color"], this._config?.style?.card_border_color, "rgba(255, 255, 255, 0.1)")}
                        ${this._renderColorPicker(t2.editor.text_color, ["style", "card_text_color"], this._config?.style?.card_text_color, "white")}
                        ${this._renderTextfield(t2.editor.border_radius, ["style", "card_border_radius"], this._config?.style?.card_border_radius, "16px")}
                        ${this._renderTextfield(t2.editor.padding, ["style", "card_padding"], this._config?.style?.card_padding, "12px")}

                        <div class="divider" style="margin: 16px 0;"></div>

                        ${this._renderColorPicker(t2.editor.title_color, ["style", "title_color"], this._config?.style?.title_color, "white")}
                        ${this._renderTextfield(t2.editor.title_size, ["style", "title_size"], this._config?.style?.title_size, "1.5em")}
                        ${this._renderTextfield(t2.editor.title_font_weight, ["style", "title_font_weight"], this._config?.style?.title_font_weight, "bold")}

                        <div class="divider" style="margin: 16px 0;"></div>

                        ${this._renderColorPicker(t2.editor.subtitle_color, ["style", "subtitle_color"], this._config?.style?.subtitle_color)}
                        ${this._renderTextfield(t2.editor.subtitle_size, ["style", "subtitle_size"], this._config?.style?.subtitle_size, "1em")}
                        ${this._renderTextfield(t2.editor.subtitle_font_weight, ["style", "subtitle_font_weight"], this._config?.style?.subtitle_font_weight, "normal")}

                        <div class="divider" style="margin: 16px 0;"></div>

                        ${this._renderTextfield(t2.editor.icon_size, ["style", "icon_size"], this._config?.style?.icon_size, "2em")}
                        ${this._renderTextfield(t2.editor.icon_opacity, ["style", "icon_opacity"], this._config?.style?.icon_opacity, "1")}
                        ${this._renderTextfield(t2.editor.icon_margin, ["style", "icon_margin"], this._config?.style?.icon_margin, "6px")}

                        <div class="divider" style="margin: 16px 0;"></div>

                        ${this._renderColorPicker(t2.editor.primary_color_label, ["style", "primary_color"], this._config?.style?.primary_color, "white")}
                        ${this._renderTextfield(t2.editor.primary_size, ["style", "primary_size"], this._config?.style?.primary_size, "1.2em")}
                        ${this._renderTextfield(t2.editor.primary_opacity, ["style", "primary_font_opacity"], this._config?.style?.primary_font_opacity, "1")}
                        ${this._renderTextfield(t2.editor.primary_font_weight, ["style", "primary_font_weight"], this._config?.style?.primary_font_weight, "normal")}

                        <div class="divider" style="margin: 16px 0;"></div>

                        ${this._renderColorPicker(t2.editor.secondary_color_label, ["style", "secondary_color"], this._config?.style?.secondary_color, "white")}
                        ${this._renderTextfield(t2.editor.secondary_size, ["style", "secondary_size"], this._config?.style?.secondary_size, "0.9em")}
                        ${this._renderTextfield(t2.editor.secondary_opacity, ["style", "secondary_font_opacity"], this._config?.style?.secondary_font_opacity, "0.7")}
                        ${this._renderTextfield(t2.editor.secondary_font_weight, ["style", "secondary_font_weight"], this._config?.style?.secondary_font_weight, "normal")}

                        <div class="divider" style="margin: 16px 0;"></div>

                        ${this._renderColorPicker(t2.editor.tertiary_color_label, ["style", "tertiary_color"], this._config?.style?.tertiary_color, "white")}
                        ${this._renderTextfield(t2.editor.tertiary_size, ["style", "tertiary_size"], this._config?.style?.tertiary_size, "0.9em")}
                        ${this._renderTextfield(t2.editor.tertiary_opacity, ["style", "tertiary_font_opacity"], this._config?.style?.tertiary_font_opacity, "0.7")}
                        ${this._renderTextfield(t2.editor.tertiary_font_weight, ["style", "tertiary_font_weight"], this._config?.style?.tertiary_font_weight, "normal")}
                    `
    )}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
      "styling_header_background",
      "mdi:rectangle",
      t2.editor.header_background,
      x`
                        ${this._renderSwitch(t2.editor.enable_header_background, ["style", "header_background_enabled"], this._config?.style?.header_background_enabled, t2.editor.enable_header_background_helper)}

                        ${this._config?.style?.header_background_enabled ? x`
                        <div class="option">
                            <div class="option-label">${t2.editor.header_width}</div>
                            <div class="option-control">
                                <ha-combo-box
                                        .value=${this._config?.style?.header_width || "auto"}
                                        .items=${[
        { value: "auto", label: t2.editor.header_width_auto },
        { value: "full", label: t2.editor.header_width_full }
      ]}
                                        item-value-path="value"
                                        item-label-path="label"
                                        @value-changed=${(ev) => {
        if (!this._config) return;
        const newValue = ev.detail?.value;
        if (!newValue) return;
        const newConfig = { ...this._config };
        if (!newConfig.style) newConfig.style = {};
        newConfig.style.header_width = newValue;
        this._config = newConfig;
        this._fireEvent();
      }}
                                ></ha-combo-box>
                            </div>
                        </div>
                        
                        ${this._renderColorPicker(t2.editor.header_background_color, ["style", "header_background_color"], this._config?.style?.header_background_color, "rgba(21, 20, 27, 1)")}
                        ${this._renderColorPicker(t2.editor.header_border_color, ["style", "header_border_color"], this._config?.style?.header_border_color, "rgba(255, 255, 255, 0.1)")}
                        ${this._renderTextfield(t2.editor.header_border_radius, ["style", "header_border_radius"], this._config?.style?.header_border_radius, "16px")}
                        ${this._renderTextfield(t2.editor.header_padding, ["style", "header_padding"], this._config?.style?.header_padding, "12px")}
                        ${this._renderTextfield(t2.editor.header_box_shadow, ["style", "header_box_shadow"], this._config?.style?.header_box_shadow, "0 2px 8px 0 rgba(0, 0, 0, 0.15)")}
                    ` : ""}
                    `
    )}

            <div class="divider"></div>

            ${this._renderCollapsibleSection(
      "styling_layout",
      "mdi:grid",
      t2.editor.layout,
      x`
                    ${this._renderTextfield(t2.editor.grid_gap, ["grid_gap"], this._config?.grid_gap, t2.editor.grid_gap_placeholder, t2.editor.grid_gap_helper)}
                    ${this._renderTextfield(t2.editor.header_margin_bottom, ["style", "header_margin_bottom"], this._config?.style?.header_margin_bottom, "12px", t2.editor.header_margin_bottom_helper)}
                    ${this._renderTextfield(t2.editor.infobar_gap, ["style", "infobar_gap"], this._config?.style?.infobar_gap, "6px", t2.editor.infobar_gap_helper)}
                    ${this._renderTextfield(t2.editor.title_alignment, ["style", "title_align"], this._config?.style?.title_align, "center", t2.editor.title_alignment_helper)}
                    ${this._renderTextfield(t2.editor.subtitle_alignment, ["style", "subtitle_align"], this._config?.style?.subtitle_align, "center")}
                    ${this._renderTextfield(t2.editor.cursor, ["style", "card_cursor"], this._config?.style?.card_cursor, "pointer")}
                `
    )}
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
                    ${this._renderTab("consumers", t2.editor.tab_consumers, "mdi:flash")}
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

                <div class="tab-content ${this._activeTab === "consumers" ? "active" : ""}">
                    ${this._renderConsumersTab()}
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
        .option-label.required::after {
            content: " *";
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
        }

        ha-textfield, ha-select {
            width: 100%;
        }

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

        .autocomplete-wrapper {
            position: relative;
            width: 100%;
            z-index: 100;
        }

        .autocomplete-dropdown {
            position: fixed;
            top: auto;
            left: auto;
            min-width: 400px;
            max-height: 200px;
            overflow-y: auto;
            background: #1c1c1c;
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 4px;
            margin-top: 4px;
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
__decorateClass([
  r()
], PVMonitorCardEditor.prototype, "_expandedConsumerIndex");
__decorateClass([
  r()
], PVMonitorCardEditor.prototype, "_expandedSections");
__decorateClass([
  r()
], PVMonitorCardEditor.prototype, "_expandedConsumerSubsections");
customElements.define("pv-monitor-card-editor", PVMonitorCardEditor);
const pvMonitorCardEditor = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PVMonitorCardEditor
}, Symbol.toStringTag, { value: "Module" }));
export {
  PVMonitorCard
};
