// Global variables
var HE = SpreadsheetApp.openById('1qBIxiDJutAvauj_ydfNpR9Vq2u4CbPRAXJSITmNs58k');
const rutaGlobal = "https://script.google.com/a/macros/umariana.edu.co/s/AKfycbyU7WnsiRNccBL25NqJ8HN_pO0SqTwvIzJOwaNeE7aw/dev";


function doGet(e) {
  //-----------------------------------------------------
  const permitirAcceso = searchUser();
  if (permitirAcceso === true) {

    let params = e.parameter;
    let pantalla = params.p;
    //console.log('Que es esto doGet : ' + params.p + '\n params d: ' + params.d);

    switch (params.p) {
       case "1": //Pagina Index - Introduccion
        var template1 = HtmlService.createTemplateFromFile("introduccion")
        //template1.pubUrl = rutaGlobal+"";
        var output = template1.evaluate();
        break;	
      case "2": //Pagina Fundamentos de la programacion
        var template1 = HtmlService.createTemplateFromFile("Fundamentos_1")
        template1.pubUrl = rutaGlobal;
        var output = template1.evaluate();
        break;
      case "3": //Pagina estructuras de control
        var template1 = HtmlService.createTemplateFromFile("Fundamentos_2")
        template1.pubUrl = rutaGlobal;
        var output = template1.evaluate();
        break;
      case "50": //Pagina estructuras de control
        var template1 = HtmlService.createTemplateFromFile("Construccion")
        template1.pubUrl = rutaGlobal;
        var output = template1.evaluate();
        break;        
      default: //Pagina Index si es usuario registrado
        var template1 = HtmlService.createTemplateFromFile("index");
        var output = template1.evaluate();
        break;
    }

    return output;
  } else {
    const output = HtmlService.createHtmlOutput("<h2>Acceso no permitido</h2><br/><h3>Asegúrate de loggearte con tu cuenta o si crees que es un error contacta al administrador de la aplicación</h3>");
    return output;
  }
}

function searchUser() {
  //Obteniendo la sesion activa del correo institucional del usuario de la unviersidad Mariana
  const activeUser = Session.getActiveUser().getEmail();
  //Metodo que nos permite conectarnos a una hoja de un archivo de excel
  const SS = SpreadsheetApp.getActiveSpreadsheet();
  //Usuarios corresponde al nombre de la hoja de excel
  const sheetUsers = SS.getSheetByName('Usuarios');
  const activeUserList = sheetUsers.getRange(2, 1, sheetUsers.getLastRow() - 1, 1).getValues().map(user => user[0]);
  //Permite realizar la busquedad del correo activo en la lista de usuarios habilitados para acceder al aplicativo
  if (activeUserList.indexOf(activeUser) !== -1) {
    //console.log('Dar acceso');
    return true;
  } else {
    //console.log('No dar acceso');
    return false;
  }
}


function remove_accents(strAccents) {
  var strAccents = strAccents.split('');
  var strAccentsOut = new Array();
  var strAccentsLen = strAccents.length;
  var accents = "ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëÇçðÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž";
  var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeCcdDIIIIiiiiUUUUuuuuNnSsYyyZz";
  for (var y = 0; y < strAccentsLen; y++) {
    if (accents.indexOf(strAccents[y]) != -1) {
      strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
    } else
      strAccentsOut[y] = strAccents[y];
  }
  strAccentsOut = strAccentsOut.join('');

  return strAccentsOut;
}


function include(fileName) {
  return HtmlService.createHtmlOutputFromFile(fileName)
    .getContent()
}