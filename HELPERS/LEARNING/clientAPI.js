(function () {
    "use strict";

    var ValueStatus, LogCalculationMethod, LogCalculationPeriod, AlarmState, ReadFileResponseType, AlarmAction, ObjectType;

    function getObjectPath() {
        return objectPath;
    }

    function readValues(propertyPaths, timeout = 60000) {
        validateArray(propertyPaths, "propertyPaths");
        return new Promise((resolve) => {
            setTimeout(resolve, timeout);
        });
    }

    function validateArray(array, name) {
        if (!Array.isArray(array)) {
            throw new Error(`${name} is not an array`);
        }
    }

    function subscribeValues(propertyPaths) {
        validateArray(propertyPaths, "propertyPaths");
        return new Promise((resolve) => resolve("Subscribed"));
    }

    function unsubscribeValues(subscriptionId) {
        return new Promise((resolve) => resolve("Unsubscribed"));
    }

    function invoke(objectPath, action, pageX, pageY) {
        return new Promise((resolve) => resolve("Action Invoked"));
    }

    function setValue(propertyPath, value) {
        return new Promise((resolve) => resolve("Value Set"));
    }

    function setForce(propertyPath, force, forcedUntil) {
        return new Promise((resolve) => resolve("Force Set"));
    }

    function editProperties(propertyPaths, dialogConfiguration) {
        validateArray(propertyPaths, "propertyPaths");
        return new Promise((resolve) => resolve("Properties Edited"));
    }

    function showMenu(propertyPaths, objectPaths, pageX, pageY) {
        validateArray(propertyPaths, "propertyPaths");
        validateArray(objectPaths, "objectPaths");
        return new Promise((resolve) => resolve("Menu Shown"));
    }

    function showLinksMenu(propertyPaths, objectPaths, pageX, pageY) {
        validateArray(propertyPaths, "propertyPaths");
        validateArray(objectPaths, "objectPaths");
        return new Promise((resolve) => resolve("Links Menu Shown"));
    }

    function showList(propertyPaths, objectPaths, title, action, pageX, pageY) {
        validateArray(propertyPaths, "propertyPaths");
        validateArray(objectPaths, "objectPaths");
        return new Promise((resolve) => resolve("List Shown"));
    }

    function subscribeLog(logPath, callback, startAt = new Date(0), endAt, calculation) {
        return new Promise((resolve) => resolve("Log Subscribed"));
    }

    function unsubscribeLog(subscriptionId) {
        return new Promise((resolve) => resolve("Log Unsubscribed"));
    }

    function getChildren(objectPath, includePropertyNames = false) {
        return new Promise((resolve) => resolve([]));
    }

    function getObject(objectPath) {
        return new Promise((resolve) => resolve({}));
    }

    function getObjects(objectPaths) {
        return new Promise((resolve) => resolve([]));
    }

    function getUserSettings() {
        return new Promise((resolve) => resolve({ language: "en", locale: "US" }));
    }

    function subscribeAlarmView(callback, presentationValue = false, alarmViewPath = "~/System/Alarms/Alarm View", favorite = "") {
        return new Promise((resolve) => resolve("Alarm View Subscribed"));
    }

    function subscribeEventView(callback, presentationValue = false, eventViewPath = "~/System/Events/Event View", favorite = "") {
        return new Promise((resolve) => resolve("Event View Subscribed"));
    }

    function unsubscribeAlarmView(subscriptionId) {
        return new Promise((resolve) => resolve("Alarm View Unsubscribed"));
    }

    function unsubscribeEventView(subscriptionId) {
        return new Promise((resolve) => resolve("Event View Unsubscribed"));
    }

    function readFile(filePath) {
        return new Promise((resolve) => resolve("File Read"));
    }

    function performAlarmAction(action, record, subscriptionId) {
        return new Promise((resolve) => resolve("Alarm Action Performed"));
    }

    function getReferences(propertyPaths, objectPaths) {
        validateArray(propertyPaths, "propertyPaths");
        validateArray(objectPaths, "objectPaths");
        return new Promise((resolve) => resolve("References Retrieved"));
    }

    function clearLog(logPath) {
        return new Promise((resolve) => resolve("Log Cleared"));
    }

    function importToLog(logPath, logValues) {
        return new Promise((resolve) => resolve("Log Imported"));
    }

    function editLogValue(logPath, logValue, edit) {
        return new Promise((resolve) => resolve("Log Value Edited"));
    }

    function resolveRelativePath(path) {
        return new Promise((resolve) => resolve(path));
    }

    function subscribeSegments(paths, callback, includePoints = false) {
        return new Promise((resolve) => resolve("Segments Subscribed"));
    }

    function unsubscribeSegments(subscriptionId) {
        return new Promise((resolve) => resolve("Segments Unsubscribed"));
    }

    function createGroup(subscriptionId, members, masterSegment) {
        return new Promise((resolve) => resolve("Group Created"));
    }

    function addToGroup(subscriptionId, existingMember, members) {
        return new Promise((resolve) => resolve("Added to Group"));
    }

    function removeFromGroup(subscriptionId, members) {
        return new Promise((resolve) => resolve("Removed from Group"));
    }

    function removeGroup(subscriptionId, existingMember) {
        return new Promise((resolve) => resolve("Group Removed"));
    }

    function importScript(scriptPath) {
        return new Promise((resolve) => resolve("Script Imported"));
    }

    function sparqlQuery(query) {
        return new Promise((resolve) => resolve("SPARQL Query Executed"));
    }

    function resolveNspGuids(nspGuids) {
        return new Promise((resolve) => resolve("NSP GUIDs Resolved"));
    }

    function alert(message, header) {
        return new Promise((resolve) => resolve("Alert Displayed"));
    }

    self.client = { invoke, setValue, readValues };
})();
