this.ChangeCheckbox_1114 = function (itemId) {
    //alert("Test");
    var isChecked = document.getElementById(itemId).checked;
    //$.messager.alert("Warning", itemId, "warning");

    // RIND = 0 ID  = 61_1114_61770_0_1
    // RIND = TIP2 ID  = 61_1114_61769_TIP2_1
    // RIND = TIP3 ID  = 61_1114_61773_TIP3_1
    // RIND 1 = 61_1114_61763_1_1
    // RIND 3 = 61_1114_61771_3_1
    // RIND 4 = 61_1114_61776_4_1   
    // RIND 5 = 61_1114_61777_5_1
    // RIND 6 = 61_1114_61774_6_1
    // RIND 7 = 61_1114_61767_7_1
    // RIND 8 = 61_1114_61761_8_1
    // RIND 9 = 61_1114_61762_9_1

   
    // A little modification
    //Add - when row 0 is uncheck - uncheck TIP2 and TIP3
    // If rind 0   is cheched TIP2 check becose if rind is rind 0 is check obligatory must be check TIP2 or TIP3 
    // 1 rule IF rind = 0 is checked, all other rind options are unchecked (1,2,3,4,5,6,7,8,9)
    // 2 rule if rind = 0 is checked  and  TIP2 is checked   unchecked   TIP3
    // 3 rule if rind = 0 is checked  and  TIP3 is checked   unchecked   TIP2
    // 4 rule if rind 1 is checked, rind 0, TIP2, TIP3, 2,3,4,5,6,7,8,9 are unchecked 
    // 5 rule if rind 3 is checked, rind 0, TIP2, TIP3, 1,2,4,5,6,7,8,9 are unchecked
    // 6 rule if rind 4 is checked, rind 0, TIP2, TIP3, 1,2,3,5,6,7,8,9 are unchecked
    // 7 rule if rind 5 is checked, rind 0, TIP2, TIP3, 1,2,3,4,6,7,8,9 are unchecked
    // 8 rule if rind 6 is checked, rind 0, TIP2, TIP3, 1,2,3,4,5,7,8,9 are unchecked
    // 9 rule if rind 7 is checked, rind 0, TIP2, TIP3, 1,2,3,4,5,6,8,9 are unchecked
    // 10 rule if rind 8 is checked, rind 0, TIP2, TIP3, 1,2,3,4,5,6.7,9 are unchecked
    // 10 rule if rind 9 is checked, rind 0, TIP2, TIP3, 1,2,3,4,5,6.7,8 are unchecked 
    // 11 rule if rind 1,2,3,4,5,6.7,8,9 is checked, rind TIP2, TIP3 disable for echecked

    if (itemId == "61_1114_61770_0_1" && isChecked == true) {

        document.getElementById("61_1114_61763_1_1").checked = false;
        document.getElementById("61_1114_61771_3_1").checked = false;
        document.getElementById("61_1114_61776_4_1").checked = false;
        document.getElementById("61_1114_61777_5_1").checked = false;
        document.getElementById("61_1114_61774_6_1").checked = false;
        document.getElementById("61_1114_61767_7_1").checked = false;
        document.getElementById("61_1114_61761_8_1").checked = false;
        document.getElementById("61_1114_61762_9_1").checked = false;
       
    }





}