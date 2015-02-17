function showResult(x) {
    return "<td>" + (x ? x : 'DNF') + "</td>";
}

function calculateTotal(frm) {
//     var result_out = 0;
//     var hole;
//     for (hole = 1; hole <= 9; hole++) {
//         var e = $("#hole_" + hole);
//         var value = parseInt(e.value);
//         if (!value) {
//             result_out = undefined;
//             break;
//         }
//         result_out += value;
//     }
//     var result_in = 0;
//     for (hole = 10; hole <= 18; hole++) {
//         var value = parseInt($("#hole_" + hole).value);
//         if (!value) {
//             result_in = undefined;
//             break;
//         }
//         result_in += value;
//     }
//     var result = (result_out && result_in)
//         ? result_out + result_in : undefined;

//     $("#result_out").after(showResult(result_out)).remove();
//     $("#result_in").after(showResult(result_in)).remove();
//     $("#result_total").after(showResult(result)).remove();
}
