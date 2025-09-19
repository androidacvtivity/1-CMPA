this.ChangeCheckbox_1114 = function (itemId) {
    const get = (id) => id ? document.getElementById(id) : null;

    // IDs
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

    // Optional: detect rind 2 if present
    let ID2 = null;
    const maybe2 = document.querySelector('input[type="checkbox"][id^="61_1114_"][id$="_2_1"]');
    if (maybe2) ID2 = maybe2.id;

    const rows19 = [ID1, ID2, ID3, ID4, ID5, ID6, ID7, ID8, ID9].filter(Boolean);
    const fullPool = [ID0, IDTIP2, IDTIP3, ...rows19];

    const target = get(itemId);
    if (!target) return;

    const uncheck = (...ids) => ids.forEach(id => { const el = get(id); if (el) el.checked = false; });
    const disable = (el, v) => { if (el) el.disabled = v; };
    const isOn = (id) => !!get(id)?.checked;

    // ========== Primary actions based on the clicked item ==========
    if (itemId === ID0) {
        // Rule 1: 0 unchecks 1..9
        uncheck(...rows19);

        // Rule 11 (off): with 0 selected, TIPs are enabled
        disable(get(IDTIP2), false);
        disable(get(IDTIP3), false);

        // NEW: with 0 selected, TIP2 or TIP3 is mandatory.
        // If both are checked, keep mutual exclusivity => prefer last change later, default to unchecking TIP3 here.
        // If neither is checked, auto-check TIP2.
        if (isOn(IDTIP2) && isOn(IDTIP3)) {
            // fall-back: prefer TIP2
            get(IDTIP3).checked = false;
        } else if (!isOn(IDTIP2) && !isOn(IDTIP3)) {
            get(IDTIP2).checked = true; // auto-check TIP2
        }
        // Done, then sync constraints and return.
        return sync();
    }

    if (itemId === IDTIP2) {
        // Rule 2: with 0 on, TIP2 and TIP3 are mutually exclusive
        if (isOn(ID0)) uncheck(IDTIP3);
        // If 0 is NOT on and a row 1..9 is on, TIP2 should be disabled by sync() anyway.
        return sync();
    }

    if (itemId === IDTIP3) {
        // Rule 3: with 0 on, TIP3 and TIP2 are mutually exclusive
        if (isOn(ID0)) uncheck(IDTIP2);
        return sync();
    }

    if (rows19.includes(itemId)) {
        // Rule 4..10: selecting any of 1..9 clears others + 0 + TIPs
        fullPool.forEach(id => {
            if (id !== itemId) {
                const el = get(id);
                if (el) el.checked = false;
            }
        });
        // Rule 11: TIPs disabled when any 1..9 is checked
        disable(get(IDTIP2), true);
        disable(get(IDTIP3), true);
        return sync();
    }

    // If some other state change happened (including unchecking), just sync constraints.
    return sync();

    // ========== Consistency enforcement ==========
    function sync() {
        const anyRow19 = rows19.some(id => isOn(id));
        const zeroOn = isOn(ID0);

        // Rule 11: if any 1..9 checked => TIPs disabled + unchecked
        if (anyRow19) {
            disable(get(IDTIP2), true);
            disable(get(IDTIP3), true);
            uncheck(IDTIP2, IDTIP3);
            // also ensure 0 is off (redundant if already done above)
            uncheck(ID0);
            return;
        }

        // No row 1..9 on
        disable(get(IDTIP2), false);
        disable(get(IDTIP3), false);

        if (zeroOn) {
            // Must have exactly one of TIP2/TIP3 checked
            const tip2On = isOn(IDTIP2);
            const tip3On = isOn(IDTIP3);

            if (tip2On && tip3On) {
                // If both are on (e.g., programmatic/DOM quirk), prefer the one just clicked
                if (itemId === IDTIP2) get(IDTIP3).checked = false;
                else if (itemId === IDTIP3) get(IDTIP2).checked = false;
                else get(IDTIP3).checked = false; // default
            } else if (!tip2On && !tip3On) {
                // Neither on -> auto-check TIP2
                get(IDTIP2).checked = true;
            }
        } else {
            // 0 is not selected; TIPs are allowed but should not both be on
            if (isOn(IDTIP2) && isOn(IDTIP3)) {
                // keep last change; default prefer the clicked one
                if (itemId === IDTIP2) get(IDTIP3).checked = false;
                else if (itemId === IDTIP3) get(IDTIP2).checked = false;
                else get(IDTIP3).checked = false;
            }
        }
    }
};
