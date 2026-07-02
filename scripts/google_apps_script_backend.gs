/**
 * Google Apps Script Backend REST API Server
 * 
 * Instructions to Deploy:
 * 1. Open Extensions > Apps Script in your Google Sheets.
 * 2. Create a file named 'Code.gs' and paste this script.
 * 3. Save the script.
 * 4. Click 'Deploy' > 'New deployment'.
 * 5. Under 'Select type', choose 'Web app'.
 * 6. Set:
 *    - Description: "IDN IoT Robotics REST API"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 7. Click 'Deploy', authorize the permissions, and copy the Web App URL (the deployment link ending in '/exec').
 * 8. Paste this URL into the Admin > Settings panel in your web frontend to synchronize the system.
 */

function doGet(e) {
  var route = e.parameter.route || "";
  
  // Add CORS headers by returning content output with specific configurations
  var responseData = {};
  
  try {
    if (route === "/api/config") {
      var configRows = getSheetData("Setting");
      var configObj = {};
      configRows.forEach(function(row) {
        if (row.key) {
          configObj[row.key] = row.value;
        }
      });
      responseData = { status: "success", data: configObj };
      
    } else if (route === "/api/teachers") {
      responseData = { status: "success", data: getSheetData("Guru") };
      
    } else if (route === "/api/technicians") {
      responseData = { status: "success", data: getSheetData("Teknisi") };
      
    } else if (route === "/api/materials") {
      var rawLessons = getSheetData("Materi");
      // Parse driveLinks JSON column
      rawLessons.forEach(function(l) {
        if (l.driveLinks) {
          try { l.driveLinks = JSON.parse(l.driveLinks); } catch(err) { l.driveLinks = []; }
        }
      });
      responseData = { status: "success", data: rawLessons };
      
    } else if (route === "/api/curriculum") {
      var rawCurriculum = getSheetData("Kurikulum");
      // Parse subMateri and outputs JSON columns
      rawCurriculum.forEach(function(c) {
        if (c.subMateri) {
          try { c.subMateri = JSON.parse(c.subMateri); } catch(err) { c.subMateri = []; }
        }
        if (c.outputs) {
          try { c.outputs = JSON.parse(c.outputs); } catch(err) { c.outputs = []; }
        }
      });
      responseData = { status: "success", data: rawCurriculum };
      
    } else if (route === "/api/projects") {
      var rawProjects = getSheetData("Project");
      // Parse hardware and software JSON columns
      rawProjects.forEach(function(p) {
        if (p.hardware) {
          try { p.hardware = JSON.parse(p.hardware); } catch(err) { p.hardware = []; }
        }
        if (p.software) {
          try { p.software = JSON.parse(p.software); } catch(err) { p.software = []; }
        }
      });
      responseData = { status: "success", data: rawProjects };
      
    } else if (route === "/api/sops") {
      var rawSops = getSheetData("SOP");
      // Parse steps JSON column
      rawSops.forEach(function(s) {
        if (s.steps) {
          try { s.steps = JSON.parse(s.steps); } catch(err) { s.steps = []; }
        }
      });
      responseData = { status: "success", data: rawSops };
      
    } else if (route === "/api/inventory") {
      responseData = { status: "success", data: getSheetData("Inventaris") };
      
    } else {
      responseData = {
        status: "error",
        message: "Route not found: " + route
      };
    }
  } catch (error) {
    responseData = {
      status: "error",
      message: error.toString()
    };
  }
  
  return ContentService.createTextOutput(JSON.stringify(responseData))
    .setMimeType(ContentService.MimeType.JSON);
}

// Handle pre-flight CORS requests or write updates
function doPost(e) {
  var responseData = { status: "success", message: "POST request received" };
  
  // Add audit log for any writing operations if needed
  try {
    var postData = JSON.parse(e.postData.contents);
    var route = e.parameter.route || "";
    
    if (route === "/api/log") {
      var logSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("AuditLog");
      if (logSheet) {
        logSheet.appendRow([
          new Date().toLocaleString(),
          postData.user || "Unknown",
          postData.action || "",
          postData.module || ""
        ]);
        responseData = { status: "success", message: "Audit log successfully updated" };
      }
    }
  } catch (error) {
    responseData = { status: "error", message: error.toString() };
  }
  
  return ContentService.createTextOutput(JSON.stringify(responseData))
    .setMimeType(ContentService.MimeType.JSON);
}

// Utility function to get table data with headers as object keys
function getSheetData(sheetName) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];
  
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  if (lastRow < 2) return [];
  
  var headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  var rows = sheet.getRange(2, 1, lastRow - 1, lastColumn).getValues();
  
  var data = [];
  for (var i = 0; i < rows.length; i++) {
    var item = {};
    for (var j = 0; j < headers.length; j++) {
      item[headers[j]] = rows[i][j];
    }
    data.push(item);
  }
  return data;
}
