this.ChangeCheckbox_1114 = function (itemId) {
    const get = (id) => id ? document.getElementById(id) : null;

    // Known IDs
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

    // Try to discover rind 2 (if present in DOM)
    let ID2 = null;
    const maybe2 = document.querySelector('input[type="checkbox"][id^="61_1114_"][id$="_2_1"]');
    if (maybe2) ID2 = maybe2.id;

    const group = [ID0, IDTIP2, IDTIP3, ID1, ID2, ID3, ID4, ID5, ID6, ID7, ID8, ID9].filter(Boolean);
    const target = get(itemId);
    if (!target) return;

    const isChecked = target.checked;
    if (!isChecked) return; // only act when a box becomes checked

    // Helper: uncheck a list of ids (skip nulls)
    const uncheck = (...ids) => ids.forEach(id => { const el = get(id); if (el) el.checked = false; });

    // Case A: rind 0 checked -> uncheck all 1..9 (TIP2/TIP3 remain as-is, but exclusivity is enforced below)
    if (itemId === ID0) {
        uncheck(ID1, ID2, ID3, ID4, ID5, ID6, ID7, ID8, ID9);
        return;
    }

    // Case B: TIP2 clicked -> if rind 0 is on, make TIP2/TIP3 mutually exclusive (uncheck TIP3)
    if (itemId === IDTIP2) {
        if (get(ID0)?.checked) uncheck(IDTIP3);
        return;
    }

    // Case C: TIP3 clicked -> if rind 0 is on, make TIP2/TIP3 mutually exclusive (uncheck TIP2)
    if (itemId === IDTIP3) {
        if (get(ID0)?.checked) uncheck(IDTIP2);
        return;
    }

    // Case D: any of rind 1..9 clicked -> uncheck everything else (0, TIP2, TIP3, and the other rows)
    // This enforces single-selection among 1..9 and removes 0/TIPs per rules.
    group.forEach(id => {
        if (id !== itemId) {
            const el = get(id);
            if (el) el.checked = false;
        }
    });
};
