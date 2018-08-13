
// KAK-TEST-2018HT

var FIRSTNAME_COL = 0;
var LASTNAME_COL = 1;
var EMAIL_COL = 2;
var PASSWORD_COL = 3;
var ACCESS_COL = 4;
var DOMAINS_COL = 5;
var INCLUDE_COL = 6;
var FEEDBACK_COL = 7;
var FIREBASE_SECRET = '6FbapwlrOZRyndhCtwS7M4t4vx0dYtt50oirhBh7';
var FIREBASE_URL = 'https://fb-stack.firebaseio.com/';

function myFunction() {

}

function syncAll() {
    var sheet = SpreadsheetApp.getActiveSheet();
    var data = sheet.getDataRange().getValues();

    var obj = new Object();

    for (var i = 1; i < data.length; i++) {
        var firstname = data[i][FIRSTNAME_COL];
        var lastname = data[i][LASTNAME_COL];
        var email = data[i][EMAIL_COL];
        var pass = data[i][PASSWORD_COL];
        var access = data[i][ACCESS_COL] != '' ? data[i][ACCESS_COL] : 1;
      var domains = data[i][DOMAINS_COL] != '' ? ('' + data[i][DOMAINS_COL]).split(',') : ['kak'];
        var include = data[i][INCLUDE_COL] == 'x';
        var key = email.replace('@', '||').replace('.', '|');

        if (!validFirstname(firstname)) {
            sheet.getRange(i + 1, FEEDBACK_COL + 1).setValue('Invalid firstname: ' + firstname);
            sheet.getRange(i + 1, FEEDBACK_COL + 1).setBackgroundRGB(255, 255, 255);
            continue;
        }

        if (!validLastname(lastname)) {
            sheet.getRange(i + 1, FEEDBACK_COL + 1).setValue('Invalid lastname: ' + lastname);
            sheet.getRange(i + 1, FEEDBACK_COL + 1).setBackgroundRGB(255, 255, 255);
            continue;
        }

        if (!validEmail(email)) {
            sheet.getRange(i + 1, FEEDBACK_COL + 1).setValue('Invalid email: ' + email);
            sheet.getRange(i + 1, FEEDBACK_COL + 1).setBackgroundRGB(255, 255, 255);
            continue;
        }

        if (!validPassword(pass)) {
            sheet.getRange(i + 1, FEEDBACK_COL + 1).setValue('Invalid password: ' + pass);
            sheet.getRange(i + 1, FEEDBACK_COL + 1).setBackgroundRGB(255, 255, 255);
            continue;
        }

        if (!include) {
            sheet.getRange(i + 1, FEEDBACK_COL + 1).setValue('Row not included');
            sheet.getRange(i + 1, FEEDBACK_COL + 1).setBackgroundRGB(255, 255, 255);
            continue;
        }

        Logger.log(firstname + ' ' + lastname + ' ' + email + ' ' + pass + ' ' + include);
        obj[key] = { firstname: firstname, lastname: lastname, email: email, pass: pass, access:access, domains:domains };

        sheet.getRange(i + 1, FEEDBACK_COL + 1).setValue('Save to firebase');
        sheet.getRange(i + 1, FEEDBACK_COL + 1).setBackgroundRGB(200, 200, 255);
    }

    var db = FirebaseApp.getDatabaseByUrl(FIREBASE_URL, FIREBASE_SECRET);
    db.setData('user', obj);
  
}

function triggerOnEdit(e) {
    try {
        Logger.log('triggerOnEdit');

        var sheet = SpreadsheetApp.getActiveSheet();
        var cell = sheet.getActiveCell();
        var rowNr = cell.getRow();
        var colNr = cell.getColumn();
        var data = sheet.getDataRange().getValues();

        Logger.log('row ' + rowNr + ' col ' + colNr);
        var rowData = data[rowNr - 1];
        Logger.log('rowData ' + rowData);

        var firstname = rowData[FIRSTNAME_COL];
        var lastname = rowData[LASTNAME_COL];
        var email = rowData[EMAIL_COL];
        var pass = rowData[PASSWORD_COL];
        var include = rowData[INCLUDE_COL] == 'x';
        //var key = email.replace('@', '||').replace('.', '|');      

        Logger.log(firstname);
        Logger.log(lastname);
        Logger.log(email);
        Logger.log(pass);
        Logger.log(include);

        if (!validFirstname(firstname)) {
            sheet.getRange(rowNr, FEEDBACK_COL + 1).setValue('Invalid firstname: ' + firstname);
            sheet.getRange(rowNr, FEEDBACK_COL + 1).setBackgroundRGB(255, 200, 200);
        }

        if (!validLastname(lastname)) {
            sheet.getRange(rowNr, FEEDBACK_COL + 1).setValue('Invalid lastname: ' + lastname);
            sheet.getRange(rowNr, FEEDBACK_COL + 1).setBackgroundRGB(255, 200, 200);
        }

        if (!validEmail(email)) {
            sheet.getRange(rowNr, FEEDBACK_COL + 1).setValue('Invalid email: ' + email);
            sheet.getRange(rowNr, FEEDBACK_COL + 1).setBackgroundRGB(255, 200, 200);
        }

        if (!validPassword(pass)) {
            sheet.getRange(rowNr, FEEDBACK_COL + 1).setValue('Invalid password: ' + pass);
            sheet.getRange(rowNr, FEEDBACK_COL + 1).setBackgroundRGB(255, 200, 200);
        }

        if (!include) {
            sheet.getRange(rowNr, FEEDBACK_COL + 1).setValue('Row not included');
            sheet.getRange(rowNr, FEEDBACK_COL + 1).setBackgroundRGB(255, 200, 200);
        }

        sheet.getRange(rowNr, FEEDBACK_COL + 1).setValue('Valid');
        sheet.getRange(rowNr, FEEDBACK_COL + 1).setBackgroundRGB(200, 255, 200);

        syncAll();

        Logger.log('after sync');
    } catch (e) {
        Logger.log('error' + e);
    }
}

function validFirstname(v) {
    return v.length > 1;
}

function validLastname(v) {
    return v.length > 1;
}

function validEmail(v) {

    return (v.length > 1) && (v.indexOf('@') > 0) && (v.indexOf('.') > 0);
}

function validPassword(v) {
    return v.length > 5;
}

