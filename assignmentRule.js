if (!current.service_offering.nil()) 
    current.assignment_group = current.service_offering.u_tier_1_support_group;
 else if (!current.cmdb_ci.nil())
    current.assignment_group = current.cmdb_ci.u_tier_1_support_group;
else
    current.assignment_group = gs.getProperty('oc.default.group.incident');