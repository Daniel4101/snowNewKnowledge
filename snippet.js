answer = getOmit();
function getOmit(){
    var hasCorrelation = isAssociated(parent.sys_id);
    var isNormalOREmergency = parent.type == 'normal' || parent.type == 'emergency';
    if (!parent.active)
        return true;
    else if (isNormalOREmergency && (parent.state == '-5' || parent.state == '-4') && (hasCorrelation || gs.hasRole('change_manager'))) //state new or assess
        return false;
    else if (isNormalOREmergency  && gs.hasRole('change_manager')) //state new or assess
        return false;
    else 
        return true;
    
}
function isAssociated (change, userID){
    var myUserObj = gs.getUserID();
    var changeReq = new GlideRecord('change_request');
    changeReq.get(change);
    if (changeReq.requested_by == myUserObj)
        return true;
    else if (changeReq.opened_by == myUserObj)
        return true;
    else if (changeReq.assigned_to == myUserObj)
        return true; 
    else if (myUserObj.isMemberOf(changeReq.assignment_group))
        return true; 
    else 
        return false;
}

function isAssociated(change, userID) {
    var myUserObj = new GlideRecord('sys_user'); 
    myUserObj.get(userID); 
    var changeReq = new GlideRecord('change_request');
    changeReq.get(change);        
    if (!changeReq || !myUserObj)
        return false
    if (changeReq.requested_by == myUserObj.sys_id || changeReq.opened_by == myUserObj.sys_id || changeReq.assigned_to == myUserObj.sys_id)
        return true;
    else if (myUserObj.isMemberOf(changeReq.assignment_group))
        return true;
    else
        return false;
}