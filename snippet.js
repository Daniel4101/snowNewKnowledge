answer = getOmit();
function getOmit() {
    var hasCorrelation = isAssociated(parent.sys_id);
    var isNormalOREmergency = parent.type == 'normal' || parent.type == 'emergency';
    if (!parent.active) return true;
    if (
        isNormalOREmergency &&
        (parent.state == '-5' || parent.state == '-4') &&
        (hasCorrelation || gs.hasRole('change_manager'))
    )
        // state new or assess
        return false;
    if (isNormalOREmergency && gs.hasRole('change_manager'))
        // state new or assess
        return false;
    return true;
}
function isAssociated(change, userID) {
    var myUserObj = gs.getUserID();
    var changeReq = new GlideRecord('change_request');
    changeReq.get(change);
    if (changeReq.requested_by == myUserObj) return true;
    if (changeReq.opened_by == myUserObj) {
        return true;
    }
    if (changeReq.assigned_to == myUserObj) return true;
    if (myUserObj.isMemberOf(changeReq.assignment_group)) return true;
    return false;
}
var a;
