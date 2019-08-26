(function () {
    var groupID = current.assignment_group.toString();
    var grMembers = [];
    var gr = new GlideRecord('sys_user_grmember');
    gr.addQuery('group', groupID);
    gr.query(); 
    while (gr.next()){
        grMembers.push(gr.user);
    }
    return grMembers.join();
}());
var gr = new GlideRecord('sys_user'); 
    gr.addEncodedQuery('manager=NULL');
    gr.query();
    gr.setValue('manager', '93d2b5b5dbc33300fee12eda4896192c'); 
    gr.updateMultiple();