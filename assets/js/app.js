/* Internship Opportunities site — reads data/internships.js and builds the page.
   You normally never need to edit this file. */
(function () {
  "use strict";

  var SITE = window.SITE || {};
  var STATUS = window.STATUS || {};
  var AUTO = Object.assign({ hideDeadLinks: true, readDeadlines: true, closedPages: "label" }, SITE.auto || {});
  var DOMAINS = window.DOMAINS || [];
  var CATEGORY_ORDER = ["Department tie-up", "Research", "Government", "PSU", "Company", "Open source"];
  var CATEGORY_CLASS = {
    "Department tie-up": "cat-tieup", "Government": "cat-government", "PSU": "cat-psu",
    "Research": "cat-research", "Company": "cat-company", "Open source": "cat-open"
  };
  var MODES = ["Remote", "On-site", "Hybrid"];
  var STIPENDS = [
    { value: "Stipend", label: "Stipend", cls: "badge-stipend" },
    { value: "Unpaid", label: "Unpaid", cls: "badge-unpaid" },
    { value: "Fee-based", label: "Fee-based", cls: "badge-fee" },
    { value: "Varies", label: "Stipend: check page", cls: "badge-varies" }
  ];
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var SAVE_KEY = "etc-internships-saved";
  var NOT_STATED = "See the official page";
  var FILTER_KEYS = ["domain", "category", "mode", "stipend", "year"];
  var SELECTS = [["fDomain", "domain"], ["fCategory", "category"], ["fMode", "mode"], ["fStipend", "stipend"], ["fYear", "year"]];

  /* ---------- small helpers ---------- */
  function $(id) { return document.getElementById(id); }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === null || v === undefined || v === false) return;
        if (k === "class") node.className = v;
        else if (k === "text") node.textContent = v;
        else node.setAttribute(k, v === true ? "" : v);
      });
    }
    (children || []).forEach(function (c) {
      if (c === null || c === undefined) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  var ICONS = {
    external: '<path d="M14 5h5v5"/><path d="M19 5l-8 8"/><path d="M18 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4"/>',
    save: '<path d="M7 4h10a1 1 0 0 1 1 1v15l-6-4-6 4V5a1 1 0 0 1 1-1z"/>',
    share: '<circle cx="6" cy="12" r="2.5"/><circle cx="17" cy="6" r="2.5"/><circle cx="17" cy="18" r="2.5"/><path d="M8.2 10.8l6.6-3.6M8.2 13.2l6.6 3.6"/>',
    mode: '<rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2.5 19.5h19"/>',
    pin: '<path d="M12 21s-6.5-5.6-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.3"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    cap: '<path d="M2.5 9.5L12 5l9.5 4.5L12 14z"/><path d="M6.5 11.8V16c1.6 1.4 3.4 2 5.5 2s3.9-.6 5.5-2v-4.2"/>',
    calendar: '<rect x="4" y="5.5" width="16" height="14.5" rx="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>',
    check: '<circle cx="12" cy="12" r="8.5"/><path d="M8.3 12.3l2.5 2.5 5-5.3"/>'
  };

  function icon(name, small) {
    var span = document.createElement("span");
    span.innerHTML = '<svg class="ico' + (small ? " ico-sm" : "") + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + ICONS[name] + "</svg>";
    return span.firstChild;
  }

  function safeUrl(u) {
    u = String(u || "").trim();
    if (/^https?:\/\//i.test(u)) return u;
    if (/^#/.test(u)) return u;
    return "";
  }

  function parseDate(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || "").trim());
    return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
  }

  function fmtDate(d) {
    return d.getDate() + " " + MONTHS[d.getMonth()] + " " + d.getFullYear();
  }

  function today() {
    var n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate());
  }

  /* What to show for a listing's deadline.
     Returns {kind:"date", date, days} | {kind:"rolling"} | {kind:"text", text} | {kind:"expired"} */
  function deadlineOf(item) {
    var raw = item.deadline;
    var list = Array.isArray(raw) ? raw : [raw];
    var dates = list.map(parseDate).filter(Boolean);
    var t = today();
    var upcoming = dates.filter(function (d) { return d >= t; }).sort(function (a, b) { return a - b; });
    if (upcoming.length) return { kind: "date", date: upcoming[0], days: Math.round((upcoming[0] - t) / 86400000) };

    /* No usable hand-typed date: use one the daily robot read from the official page, if any. */
    var s = robotInfo(item);
    var read = s && AUTO.readDeadlines ? parseDate(s.deadline) : null;
    if (read && read >= t) return { kind: "date", date: read, days: Math.round((read - t) / 86400000), auto: true };

    if (dates.length) return { kind: "expired" };
    var closedNow = !!(s && s.closed);
    var text = String(list[0] || "").trim();
    if (/^rolling$/i.test(text)) return { kind: "rolling", closedNow: closedNow };
    return { kind: "text", text: text || NOT_STATED, closedNow: closedNow };
  }

  /* What the daily robot recorded for a listing (data/status.js). Null if nothing, or if the listing says auto: false. */
  function robotInfo(item) {
    if (item.auto === false) return null;
    return (STATUS.items || {})[item.id] || null;
  }

  function linkIsDead(entry) {
    return !!(AUTO.hideDeadLinks && entry && entry.link === "dead" && entry.fails >= (STATUS.hideAfter || 2));
  }

  function isHidden(item) {
    if (linkIsDead((STATUS.items || {})[item.id])) return true;
    var d = deadlineOf(item);
    if (d.kind === "expired") return true;
    return AUTO.closedPages === "hide" && d.closedNow === true;
  }

  function daysText(n) {
    if (n === 0) return "Closes today";
    if (n === 1) return "1 day left";
    return n + " days left";
  }

  function yearsText(years) {
    if (!years || !years.length) return NOT_STATED;
    var names = { 1: "First", 2: "Second", 3: "Third", 4: "Final" };
    var ys = years.slice().sort();
    if (ys.length === 4) return "All years";
    if (ys.length === 1) return names[ys[0]] + " year";
    return ys.map(function (y) { return names[y]; }).join(", ") + " year";
  }

  function badgeText(item) {
    if (item.badge) return String(item.badge).slice(0, 6);
    return String(item.org || item.title || "?").split(/[\s,()\/&-]+/).filter(Boolean).slice(0, 3)
      .map(function (w) { return w.charAt(0).toUpperCase(); }).join("");
  }

  function toast(msg) {
    var t = $("toast");
    t.textContent = msg;
    t.classList.add("is-on");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(function () { t.classList.remove("is-on"); }, 2400);
  }

  /* ---------- saved listings (kept on this device only) ---------- */
  var saved = (function () {
    try {
      var v = JSON.parse(localStorage.getItem(SAVE_KEY) || "[]");
      return Array.isArray(v) ? v : [];
    } catch (e) { return []; }
  })();

  function persistSaved() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(saved)); } catch (e) { /* private mode: keep in memory */ }
  }

  /* ---------- data ---------- */
  var soonLimit = SITE.closingSoonDays || 14;
  var tieups = (window.TIEUPS || []).map(function (t) {
    var copy = Object.assign({}, t);
    copy.category = "Department tie-up";
    return copy;
  });
  var all = tieups.concat(window.INTERNSHIPS || []).filter(function (i) {
    return i && i.id && i.title && !isHidden(i);
  });
  /* Listings with a closing date come first, soonest first; the rest keep the order of the data file. */
  all = all.map(function (item, index) { return { item: item, index: index, d: deadlineOf(item) }; })
    .sort(function (a, b) {
      var ad = a.d.kind === "date", bd = b.d.kind === "date";
      if (ad && bd) return a.d.days - b.d.days || a.index - b.index;
      if (ad !== bd) return ad ? -1 : 1;
      return a.index - b.index;
    })
    .map(function (x) { return x.item; });
  var liveTieups = all.filter(function (i) { return i.category === "Department tie-up"; });

  var PAGE = 12;   /* cards shown before the "Show more" button */
  var state = { q: "", domain: "", category: "", mode: "", stipend: "", year: "", view: "all" };
  var shown = PAGE;
  var lastKey = "";

  /* A listing that does not state its year is never hidden by the year filter. */
  function matches(i, st) {
    if (st.view === "saved" && saved.indexOf(i.id) < 0) return false;
    if (st.domain && (i.domains || []).indexOf(st.domain) < 0) return false;
    if (st.category && i.category !== st.category) return false;
    if (st.mode && (i.mode || []).indexOf(st.mode) < 0) return false;
    if (st.stipend && i.stipend !== st.stipend) return false;
    if (st.year && (i.years || []).length && i.years.indexOf(+st.year) < 0) return false;
    var q = (st.q || "").trim().toLowerCase();
    if (q) {
      var hay = [i.title, i.org, i.badge, i.category, i.location, i.note, (i.domains || []).join(" "), (i.mode || []).join(" ")]
        .join(" ").toLowerCase();
      var words = q.split(/\s+/);
      for (var w = 0; w < words.length; w++) if (hay.indexOf(words[w]) < 0) return false;
    }
    return true;
  }

  function countWith(partial) {
    var st = Object.assign({ q: "", domain: "", category: "", mode: "", stipend: "", year: "", view: "all" }, partial);
    return all.filter(function (i) { return matches(i, st); }).length;
  }

  /* ---------- page furniture ---------- */
  function setupSite() {
    var name = SITE.shortName || "Internships";
    $("brandName").textContent = name;
    $("brandSub").textContent = SITE.college || "";
    var mark = $("brandMark");
    if (SITE.logo) mark.appendChild(el("img", { src: SITE.logo, alt: "" }));
    else mark.textContent = SITE.logoInitials || name.slice(0, 2);

    var a = SITE.announcement;
    if (a && a.show && a.text) {
      var bar = $("announce");
      var href = safeUrl(a.link);
      bar.appendChild(href ? el("a", { href: href, text: a.text }) : document.createTextNode(a.text));
      bar.hidden = false;
    }

    var updated = parseDate(SITE.lastUpdated);
    $("heroCount").textContent = all.length + (all.length === 1 ? " internship listed" : " internships listed") +
      (updated ? ", last updated " + fmtDate(updated) + "." : ".");
    $("footOrg").textContent = [SITE.department, SITE.college].filter(Boolean).join(", ");
    $("footUpdated").textContent = updated ? "Last updated " + fmtDate(updated) + "." : "";
  }

  function reportHref(item) {
    var c = SITE.coordinator || {};
    if (SITE.reportUrl && safeUrl(SITE.reportUrl)) return safeUrl(SITE.reportUrl);
    if (!c.email) return "";
    var subject = "Broken link: " + item.title + " (" + item.org + ")";
    var body = "This link is not working:\n" + item.url + "\n\nWhat happened: ";
    return "mailto:" + c.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  /* ---------- hero quick picks ---------- */
  function pick(partial) {
    FILTER_KEYS.forEach(function (k) { state[k] = ""; });
    state.q = "";
    Object.assign(state, partial);
    if (state.view !== "all") setView("all");
    syncControls();
    render();
    $("listings").scrollIntoView();
  }

  function setupTiles() {
    var box = $("tiles");
    function tile(count, label, partial) {
      if (!count) return;
      var b = el("button", { type: "button", class: "tile" }, [el("b", { text: String(count) }), el("span", { text: label })]);
      b.addEventListener("click", function () { pick(partial); });
      box.appendChild(b);
    }
    var next = all.map(function (i) { return { item: i, d: deadlineOf(i) }; })
      .filter(function (x) { return x.d.kind === "date"; })[0];
    if (next) {
      box.appendChild(el("a", { class: "tile tile-hot", href: "#i-" + next.item.id }, [
        el("b", { text: String(next.d.days) }),
        el("span", { text: (next.d.days === 1 ? "day" : "days") + " left to apply: " + (next.item.badge || next.item.title) })
      ]));
    }
    tile(countWith({ stipend: "Stipend" }), "pay a stipend", { stipend: "Stipend" });
    tile(countWith({ mode: "Remote" }), "can be done from home", { mode: "Remote" });
    tile(countWith({ q: "Maharashtra" }), "are in Maharashtra", { q: "Maharashtra" });
    if (!box.children.length) box.hidden = true;
  }

  /* ---------- filters ---------- */
  function fillSelect(id, values, labelOf) {
    var sel = $(id);
    values.forEach(function (v) {
      sel.appendChild(el("option", { value: v, text: labelOf ? labelOf(v) : v }));
    });
  }

  function setupFilters() {
    var present = {};
    all.forEach(function (i) { present[i.category] = (present[i.category] || 0) + 1; });
    var cats = CATEGORY_ORDER.filter(function (c) { return present[c]; });
    Object.keys(present).forEach(function (c) { if (cats.indexOf(c) < 0) cats.push(c); });

    fillSelect("fDomain", DOMAINS);
    fillSelect("fCategory", cats);
    fillSelect("fMode", MODES);
    fillSelect("fStipend", STIPENDS.map(function (s) { return s.value; }), function (v) {
      return v === "Varies" ? "Not stated, check page" : v;
    });

    var tabs = $("catTabs");
    function tab(label, value, count) {
      var b = el("button", {
        type: "button", "aria-pressed": "false", "data-cat": value,
        class: "cat-tab " + (value ? (CATEGORY_CLASS[value] || "") : "cat-all")
      }, [label + " ", el("small", { text: String(count) })]);
      b.addEventListener("click", function () {
        state.category = value;
        syncControls();
        render();
      });
      tabs.appendChild(b);
    }
    tab("All", "", all.length);
    cats.forEach(function (c) { tab(c, c, present[c]); });

    var quick = $("quickDomains");
    DOMAINS.forEach(function (d) {
      var b = el("button", { type: "button", class: "chip", "aria-pressed": "false", text: d });
      b.addEventListener("click", function () {
        state.domain = state.domain === d ? "" : d;
        syncControls();
        render();
        if (state.domain) $("listings").scrollIntoView();
      });
      quick.appendChild(b);
    });

    SELECTS.forEach(function (pair) {
      $(pair[0]).addEventListener("change", function (e) {
        state[pair[1]] = e.target.value;
        syncControls();
        render();
      });
    });

    $("q").addEventListener("input", function (e) { state.q = e.target.value; render(); });
    $("searchForm").addEventListener("submit", function (e) {
      e.preventDefault();
      $("q").blur();
      $("listings").scrollIntoView();
    });

    $("clear").addEventListener("click", clearFilters);
    $("sheetClear").addEventListener("click", clearFilters);
    $("viewAll").addEventListener("click", function () { setView("all"); });
    $("viewSaved").addEventListener("click", function () { setView("saved"); });

    $("showMore").addEventListener("click", function () {
      var before = $("grid").children.length;
      shown = Infinity;
      render();
      var firstNew = $("grid").children[before];
      if (firstNew) { firstNew.setAttribute("tabindex", "-1"); firstNew.focus({ preventScroll: true }); }
    });

    $("filterOpen").addEventListener("click", openSheet);
    $("filterClose").addEventListener("click", closeSheet);
    $("sheetDone").addEventListener("click", closeSheet);
    $("backdrop").addEventListener("click", closeSheet);
    document.addEventListener("keydown", function (e) {
      if (!$("filters").classList.contains("is-open")) return;
      if (e.key === "Escape") { closeSheet(); return; }
      if (e.key !== "Tab") return;
      var f = $("filters").querySelectorAll("button, select");
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  function openSheet() {
    var f = $("filters");
    f.classList.add("is-open");
    f.setAttribute("role", "dialog");
    f.setAttribute("aria-modal", "true");
    f.setAttribute("aria-labelledby", "filtersTitle");
    $("backdrop").hidden = false;
    document.body.style.overflow = "hidden";
    $("fDomain").focus();
  }

  function closeSheet() {
    var f = $("filters");
    if (!f.classList.contains("is-open")) return;
    f.classList.remove("is-open");
    f.removeAttribute("role");
    f.removeAttribute("aria-modal");
    $("backdrop").hidden = true;
    document.body.style.overflow = "";
    $("filterOpen").focus();
  }

  function clearFilters() {
    state.q = "";
    FILTER_KEYS.forEach(function (k) { state[k] = ""; });
    syncControls();
    render();
  }

  function setView(v) {
    state.view = v;
    $("viewAll").classList.toggle("is-on", v === "all");
    $("viewSaved").classList.toggle("is-on", v === "saved");
    $("viewAll").setAttribute("aria-pressed", String(v === "all"));
    $("viewSaved").setAttribute("aria-pressed", String(v === "saved"));
    $("listTitle").textContent = v === "saved" ? "Saved internships" : "All internships";
    render();
  }

  function activeFilterCount() {
    return FILTER_KEYS.filter(function (k) { return state[k]; }).length;
  }

  function syncControls() {
    $("q").value = state.q;
    SELECTS.forEach(function (pair) {
      var s = $(pair[0]);
      s.value = state[pair[1]];
      s.classList.toggle("is-set", !!state[pair[1]]);
    });
    Array.prototype.forEach.call($("quickDomains").children, function (b) {
      b.setAttribute("aria-pressed", String(b.textContent === state.domain));
    });
    Array.prototype.forEach.call($("catTabs").children, function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-cat") === state.category));
    });
  }

  /* ---------- cards ---------- */
  function pageUrl(id) {
    return location.href.split("#")[0] + "#i-" + id;
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = el("textarea", { class: "vh" });
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      ta.remove();
      if (ok) resolve(); else reject();
    });
  }

  function fact(iconName, label, value) {
    return el("li", null, [icon(iconName, true), el("span", null, [el("span", { class: "vh", text: label + ": " }), value])]);
  }

  function card(item, prefix) {
    var d = deadlineOf(item);
    var st = STIPENDS.filter(function (s) { return s.value === item.stipend; })[0] || STIPENDS[3];
    var domId = prefix + item.id;
    var href = safeUrl(item.url);
    var isSoon = d.kind === "date" && d.days <= soonLimit;

    var mayBeClosed = d.closedNow === true && AUTO.closedPages === "label";
    var status = null;
    if (d.kind === "date") status = el("span", { class: "status" + (isSoon ? " status-hot" : ""), text: daysText(d.days) });
    else if (mayBeClosed) status = el("span", { class: "status status-closed", text: "May be closed" });
    else if (d.kind === "rolling") status = el("span", { class: "status status-open", text: "Open all year" });

    var deadline = el("p", { class: "deadline" + (isSoon ? " is-soon" : "") }, [icon("calendar", true)]);
    if (d.kind === "date") deadline.appendChild(el("span", null, ["Apply by ", el("b", { text: fmtDate(d.date) })]));
    else if (d.kind === "rolling") deadline.appendChild(el("span", null, [el("b", { text: "No closing date." }), " Apply any time."]));
    else deadline.appendChild(el("span", null, [el("span", { class: "vh", text: "Deadline: " }), el("b", { text: d.text })]));
    var robotNote = null;
    if (d.auto) robotNote = "This date was read automatically from the official page. Confirm it there.";
    else if (mayBeClosed) robotNote = "The official page says applications are closed at the moment. Check it before you plan.";

    var isSaved = saved.indexOf(item.id) >= 0;
    var saveBtn = el("button", {
      type: "button", class: "icon-btn", "aria-pressed": String(isSaved),
      "aria-label": (isSaved ? "Remove from saved: " : "Save: ") + item.title, title: isSaved ? "Saved" : "Save"
    }, [icon("save")]);
    saveBtn.addEventListener("click", function () {
      var at = saved.indexOf(item.id);
      if (at >= 0) { saved.splice(at, 1); toast("Removed from saved"); }
      else { saved.push(item.id); toast("Saved on this device"); }
      persistSaved();
      render();
    });

    var menuId = "share-" + domId;
    var shareBtn = el("button", {
      type: "button", class: "icon-btn", "aria-expanded": "false", "aria-controls": menuId,
      "aria-label": "Share: " + item.title, title: "Share"
    }, [icon("share")]);
    var shareText = item.title + " (" + item.org + ")\n" + pageUrl(item.id);
    var menu = el("div", { class: "share-menu", id: menuId, hidden: true }, [
      el("a", {
        class: "btn btn-quiet", target: "_blank", rel: "noopener noreferrer",
        href: "https://wa.me/?text=" + encodeURIComponent(shareText), text: "Share on WhatsApp"
      })
    ]);
    var copyBtn = el("button", { type: "button", class: "btn btn-quiet", text: "Copy link" });
    copyBtn.addEventListener("click", function () {
      copyText(pageUrl(item.id)).then(function () { toast("Link copied"); }, function () { toast("Could not copy. Long-press the Apply button to copy its link."); });
    });
    menu.appendChild(copyBtn);
    var rep = reportHref(item);
    if (rep) menu.appendChild(el("a", { class: "btn btn-quiet", href: rep, text: "Report a broken link" }));
    shareBtn.addEventListener("click", function () {
      menu.hidden = !menu.hidden;
      shareBtn.setAttribute("aria-expanded", String(!menu.hidden));
    });

    var apply = href
      ? el("a", {
          class: "btn btn-primary", href: href, target: "_blank", rel: "noopener noreferrer",
          "aria-label": "Apply: " + item.title + ", " + item.org + ". Opens the official site in a new tab."
        }, ["Apply", icon("external")])
      : el("span", { class: "btn btn-quiet", text: "Link not available" });

    var verified = parseDate(item.verified);
    var robot = (STATUS.items || {})[item.id];
    var robotDay = robot && robot.link === "ok" ? parseDate(STATUS.checked) : null;
    if (robotDay && (!verified || robotDay > verified)) verified = robotDay;   /* the robot opened the page more recently */

    return el("article", { class: "card " + (CATEGORY_CLASS[item.category] || ""), id: domId }, [
      el("div", { class: "card-head" }, [
        el("span", { class: "ic", "aria-hidden": "true", text: badgeText(item) }),
        el("div", { class: "card-kind" }, [el("span", { class: "cat", text: item.category || "" }), status])
      ]),
      el("div", { class: "card-body" }, [
        el("h3", { class: "card-title", text: item.title }),
        el("p", { class: "card-org", text: item.org || "" }),
        (item.domains || []).length
          ? el("ul", { class: "tags", "aria-label": "Domains" }, item.domains.map(function (t) { return el("li", { text: t }); }))
          : null,
        el("ul", { class: "facts" }, [
          fact("mode", "Mode", (item.mode || []).length ? item.mode.join(", ") : NOT_STATED),
          fact("pin", "Where", item.location || NOT_STATED),
          fact("clock", "Duration", item.duration || NOT_STATED),
          fact("cap", "Open to", yearsText(item.years))
        ]),
        item.note ? el("p", { class: "card-note", text: item.note }) : null,
        el("p", { class: "money" }, [el("span", { class: "badge " + st.cls, text: st.label }), item.stipendNote ? el("span", { text: item.stipendNote }) : null]),
        deadline,
        robotNote ? el("p", { class: "robot-note", text: robotNote }) : null,
        el("div", { class: "card-actions" }, [apply, saveBtn, shareBtn]),
        menu,
        verified ? el("p", { class: "verified" }, [icon("check", true), "Link checked on " + fmtDate(verified)]) : null
      ])
    ]);
  }

  /* ---------- render ---------- */
  function render() {
    var list = all.filter(function (i) { return matches(i, state); });
    var key = JSON.stringify(state);
    if (key !== lastKey) { if (lastKey) shown = PAGE; lastKey = key; }   /* a new search or filter starts from the first 12 again */
    var grid = $("grid");
    grid.textContent = "";
    list.slice(0, shown).forEach(function (i) { grid.appendChild(card(i, "i-")); });
    var rest = Math.max(0, list.length - shown);
    $("moreWrap").hidden = rest === 0;
    $("showMore").textContent = "Show " + rest + " more internship" + (rest === 1 ? "" : "s");

    var filtersOn = activeFilterCount() > 0 || state.q.trim() !== "";
    var pool = state.view === "saved" ? all.filter(function (i) { return saved.indexOf(i.id) >= 0; }).length : all.length;
    var noun = state.view === "saved" ? "saved internship" : "internship";
    $("count").textContent = filtersOn
      ? list.length + " of " + pool + " " + noun + (pool === 1 ? "" : "s") + (list.length === 1 ? " matches" : " match")
      : pool + " " + noun + (pool === 1 ? "" : "s");
    $("clear").hidden = !filtersOn;
    $("sheetDone").textContent = "Show " + list.length + (list.length === 1 ? " result" : " results");

    var fc = activeFilterCount();
    $("filterCount").textContent = fc;
    $("filterCount").hidden = fc === 0;

    var liveSaved = saved.filter(function (id) { return all.some(function (i) { return i.id === id; }); });
    $("savedCount").textContent = liveSaved.length;

    var empty = $("empty");
    empty.textContent = "";
    empty.hidden = list.length > 0;
    if (!list.length) {
      if (state.view === "saved" && !liveSaved.length) {
        empty.appendChild(el("p", { text: "Nothing saved yet. Tap the bookmark on any internship to keep it here. Saved items stay on this phone or computer only." }));
        var back = el("button", { type: "button", class: "btn btn-quiet", text: "Show all internships" });
        back.addEventListener("click", function () { setView("all"); });
        empty.appendChild(back);
      } else {
        empty.appendChild(el("p", { text: "No internship matches these filters. Remove a filter or try a shorter search." }));
        var reset = el("button", { type: "button", class: "btn btn-quiet", text: "Clear filters" });
        reset.addEventListener("click", clearFilters);
        empty.appendChild(reset);
      }
    }
  }

  function renderSoon() {
    var soon = all.map(function (i) { return { item: i, d: deadlineOf(i) }; })
      .filter(function (x) { return x.d.kind === "date" && x.d.days <= soonLimit; });
    if (!soon.length) return;
    var ul = $("soonList");
    soon.forEach(function (x) {
      ul.appendChild(el("li", null, [
        el("a", { href: "#i-" + x.item.id }, [
          el("span", { class: "soon-days" }, [
            el("b", { text: x.d.days === 0 ? "0" : String(x.d.days) }),
            el("small", { text: x.d.days === 1 ? "day left" : "days left" })
          ]),
          el("span", { class: "soon-text" }, [
            el("strong", { text: x.item.title }),
            el("span", { text: (x.item.badge ? x.item.badge + ", closes " : "Closes ") + fmtDate(x.d.date) })
          ])
        ])
      ]));
    });
    $("soon").hidden = false;
  }

  function renderTieups() {
    if (!liveTieups.length) return;
    var grid = $("tieupGrid");
    liveTieups.forEach(function (i) { grid.appendChild(card(i, "t-")); });
    $("tieups").hidden = false;
    $("navTieups").hidden = false;
  }

  function renderPortals() {
    var box = $("portals");
    var groups = [];
    var loose = [];
    (window.PORTALS || []).forEach(function (p) {
      if (p && Array.isArray(p.links)) groups.push(p);
      else if (p && p.url) loose.push(p);
    });
    if (loose.length) groups.unshift({ group: "Internship and job portals", source: "", links: loose });
    groups.forEach(function (g) {
      var links = (g.links || []).filter(function (l) { return safeUrl(l.url) && !linkIsDead((STATUS.links || {})[l.url]); });
      if (!links.length) return;
      box.appendChild(el("div", { class: "portal-group" }, [
        el("h3", { text: g.group || "More places to look" }),
        g.source ? el("p", { class: "portal-src", text: g.source }) : null,
        el("ul", { class: "portal-links" }, links.map(function (l) {
          return el("li", null, [
            el("a", { href: safeUrl(l.url), target: "_blank", rel: "noopener noreferrer" }, [
              el("strong", { text: l.name }),
              icon("external", true),
              l.note ? el("span", { text: l.note }) : null
            ])
          ]);
        }))
      ]));
    });
    if (!box.children.length) $("more").hidden = true;
  }

  /* ---------- links that point at one listing, e.g. page.html#i-nptel-internship ---------- */
  function goToHash() {
    var m = /^#i-(.+)$/.exec(location.hash);
    if (!m) return;
    var id = decodeURIComponent(m[1]);
    if (!all.some(function (i) { return i.id === id; })) {
      toast("That internship is no longer listed");
      return;
    }
    if (!document.getElementById("i-" + id)) {
      state.view = "all";
      clearFilters();
      setView("all");
      shown = Infinity;
      render();
    }
    var node = document.getElementById("i-" + id);
    if (!node) return;
    node.scrollIntoView({ block: "center" });
    node.classList.add("is-target");
    setTimeout(function () { node.classList.remove("is-target"); }, 3500);
  }

  /* ---------- start ---------- */
  setupSite();
  setupTiles();
  setupFilters();
  renderSoon();
  renderTieups();
  renderPortals();
  syncControls();
  render();
  goToHash();
  window.addEventListener("hashchange", goToHash);
})();
