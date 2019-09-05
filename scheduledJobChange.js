getOverdueChange();
function getOverdueChange() {
    var change = new GlideRecord('change_request');
    change.addEncodedQuery('stateIN-4,-3^end_date<javascript:gs.beginningOfToday()^type=normal');
    change.query();
    while (change.next()) {
        change.on_hold = true;
        change.on_hold_reason = 'Change End Date has passed before being approved, Change has been placed on hold';
        change.update();
        gs.eventQueue('change_request.overdue.change', change);
    }
}
