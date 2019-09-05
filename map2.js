var source = new GlideRecord('u_digi_error_ws');
source.get('f6790f381ba73b00a6c1a64f2e4bcb17');

var answer = function transformEntry(source) {
    var projectName = source.u_project_name;
    var projectNumber = source.u_project_number || false;
    var digiProject = new GlideRecord('u_digi_project');
    var gc = digiProject.addQuery('u_digi_project_number', projectNumber);
    gc.addOrCondition('u_name', projectName);
    digiProject.addQuery('u_active', true);
    digiProject.query();
    if (digiProject.next()) {
        gs.print(digiProject.getEncodedQuery());
        if (projectNumber && digiProject.u_digi_project_number.nil()) {
            digiProject.u_digi_project_number = projectNumber;
            digiProject.update();
        }
        gs.print('Exists:' + digiProject.u_digi_project_number + digiProject.sys_id);
        // return digiProject.sys_id;
    } else {
        var newDigiProject = new GlideRecord('u_digi_project');
        newDigiProject.initialize();
        newDigiProject.u_name = projectName;
        newDigiProject.u_active = true;
        if (projectNumber) {
            newDigiProject.u_digi_project_number = projectNumber;
        }
    }
};
answer();
