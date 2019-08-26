var source = new GlideRecord('u_digi_error_ws');
source.get('f6790f381ba73b00a6c1a64f2e4bcb17');

answer = (function transformEntry(source) {
    var projectName = source.u_project_name;
    var result;
    if (!source.u_project_number.nil()) 
      result = getProjectByNumber(source.u_project_number, projectName);
gs.print(result);

})(source);
 function getProjectByNumber(projectNumber,projectName){
     var digiProject = new GlideRecord('u_digi_project');
     digiProject.addQuery('u_digi_project_number', projectNumber);
     digiProject.addQuery('u_active', true)
     digiProject.setLimit(1)
     digiProject.query();
     gs.print('wooo')
     if(digiProject.next()) 
        return digiProject.sys_id 
    return getProjectByName(projectName);              
 }
 function getProjectByName(projectName){
     var digiProject = new GlideRecord('u_digi_project');
     digiProject.addQuery('u_name', projectName);
     digiProject.addQuery('u_active', true)
     digiProject.setLimit(1)
     digiProject.query();
     if (digiProject.next())
         return digiProject.sys_id
    return false;

 }