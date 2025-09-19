this.ChangeCheckbox_1114 = function (itemId) {
    const get = (id) => id ? document.getElementById(id) : null;

    // IDs cunoscute
    const ID0 = "61_1114_61770_0_1";     // rind 0
    const IDTIP2 = "61_1114_61769_TIP2_1";  // TIP2
    const IDTIP3 = "61_1114_61773_TIP3_1";  // TIP3
    const ID1 = "61_1114_61763_1_1";     // rind 1
    const ID3 = "61_1114_61771_3_1";     // rind 3
    const ID4 = "61_1114_61776_4_1";     // rind 4
    const ID5 = "61_1114_61777_5_1";     // rind 5
    const ID6 = "61_1114_61774_6_1";     // rind 6
    const ID7 = "61_1114_61767_7_1";     // rind 7
    const ID8 = "61_1114_61761_8_1";     // rind 8
    const ID9 = "61_1114_61762_9_1";     // rind 9

    // Detectăm (opțional) rind 2 dacă există
    let ID2 = null;
    const maybe2 = document.querySelector('input[type="checkbox"][id^="61_1114_"][id$="_2_1"]');
    if (maybe2) ID2 = maybe2.id;

    // Grupuri utile
    const rows19 = [ID1, ID2, ID3, ID4, ID5, ID6, ID7, ID8, ID9].filter(Boolean);
    const fullGroup = [ID0, IDTIP2, IDTIP3, ...rows19];

    const target = get(itemId);
    if (!target) return;

    // acționăm doar când se bifează ceva (nu pe debifare)
    if (!target.checked) {
        // la debifare, doar reevaluăm starea TIP2/TIP3 (enable/disable) la final
        syncTipsDisabled();
        return;
    }

    const uncheck = (...ids) => ids.forEach(id => { const el = get(id); if (el) el.checked = false; });
    const disable = (el, v) => { if (el) el.disabled = v; };

    // Regula 1: dacă 0 e bifat -> debifează 1..9
    if (itemId === ID0) {
        uncheck(...rows19);
        // re-activează TIP2/TIP3 când 0 e selectat
        disable(get(IDTIP2), false);
        disable(get(IDTIP3), false);
        return syncTipsExclusivity();
    }

    // Regula 2 & 3: când 0 e bifat, TIP2/TIP3 sunt mutual exclusive
    if (itemId === IDTIP2) {
        if (get(ID0)?.checked) uncheck(IDTIP3);
        return;
    }
    if (itemId === IDTIP3) {
        if (get(ID0)?.checked) uncheck(IDTIP2);
        return;
    }

    // Regula 4..10: dacă oricare din 1..9 e bifat -> debifează 0, TIP2, TIP3 și TOATE celelalte rânduri 1..9
    if (rows19.includes(itemId)) {
        fullGroup.forEach(id => {
            if (id !== itemId) {
                const el = get(id);
                if (el) el.checked = false;
            }
        });
        // Regula 11: dacă 1..9 e bifat -> TIP2/TIP3 devin dezactivate
        disable(get(IDTIP2), true);
        disable(get(IDTIP3), true);
        return;
    }

    // sincronizează starea TIP2/TIP3 în orice alt caz
    syncTipsDisabled();
    syncTipsExclusivity();

    // --- helpers interne ---
    function syncTipsDisabled() {
        // dacă există vreo bifă în 1..9 -> disable TIP2/TIP3, altfel enable
        const any19 = rows19.some(id => get(id)?.checked);
        disable(get(IDTIP2), any19);
        disable(get(IDTIP3), any19);
        if (any19) {
            uncheck(IDTIP2, IDTIP3);
        }
    }
    function syncTipsExclusivity() {
        // când 0 e bifat, păstrează TIP2/TIP3 mutual exclusive (dacă cumva ambele au ajuns bifate)
        const zeroOn = get(ID0)?.checked;
        if (zeroOn && get(IDTIP2)?.checked && get(IDTIP3)?.checked) {
            // dacă ambele sunt bifate accidental, păstrează ultimul itemId, debifează celălalt
            if (itemId === IDTIP2) uncheck(IDTIP3);
            else uncheck(IDTIP2);
        }
    }
};
