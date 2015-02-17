<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
          "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">

<head>
  <title>Riddarrundan 2009</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="author" content="Patrik Berglund" />
  <meta name="robots" content="all" />
  <link rel="shortcut icon" type="image/x-icon"
        href="../img/slottskorgen.png" />
  <link rel="stylesheet" type="text/css" media="screen"
        href="../style/screen.css" />
  <link rel="stylesheet" type="text/css" media="print"
        href="../style/print.css" />
  <link rel="stylesheet" type="text/css" media="handheld"
        href="../style/handheld.css" />
  <script type="text/javascript"
          src="../js/jquery.js">
  </script>
  <script type="text/javascript"
          src="js/jquery.autocomplete.js">
  </script>
  <link rel="stylesheet"
        type="text/css"
        href="style/jquery.autocomplete.css" />

  <script type="text/javascript"
          src="js/jquery.validate.js">
  </script>

  <link rel="stylesheet"
        type="text/css"
        href="style/jquery-ui.css" />
  <script type="text/javascript"
          src="js/jquery-ui.js">
  </script>

  <script type="text/javascript"
          src="js/rr.js">
  </script>

  <script type="text/javascript">
var players = [
    {name: "Patrik Berglund", cls: "Riddare"},
    {name: "Dan Johansson", cls: "Riddare"},
    {name: "Josef Alexandersson", cls: "Riddare"},
    {name: "Erik Jogensjö", cls: "Knekt"},
    {name: "Johan Rosén", cls: "Knekt"},
    {name: "Lydie Lykke-Hellgren", cls: "Dam"},
    {name: "Camilla Jernberg", cls: "Dam"},
    {name: "Mats Hulth", cls: "Laglös"}
];

$().ready(function() {
    // Datepicker
    $('#inputDate').datepicker({
        inline: false,
        dateFormat: 'yy-mm-dd',
        firstDay: 1
    });

    // Autocomplete
    $("#playerInputField").autocomplete(players, {
        autoFill: false,
        cacheLength: 1,
        formatItem: function(row, i, max) {
          return row.name + " [" + row.cls + "]";
        },
        formatMatch: function(row, i, max) {
          return row.name + " " + row.cls;
        },
        formatResult: function(row) {
          return row.name;
        },
        matchCase: false,
        matchContains: true,
        minChars: 0,
        selectFirst: false
    });

    // Validate
    $("#selectDateForm").validate();
    $("#selectPlayerForm").validate();
    $("#addResultForm").validate();

});

  </script>
  <style type="text/css" media="screen">
<!--

fieldset.category {
  border: 1px solid #aaa;
  padding: 1em;
}

fieldset.category legend {
  padding: 0.2em 0.5em;
}

input {
  border: 2px solid #aaa;
  background: white;
  padding: 3px;
}

input:focus {
  border: 2px solid #b5d5ff;
}

input.submit {
  color: white;
  background: #286ea0;
  border-style: outset;
  border-collapse: collapse;
  border-width: 2px;
  border-color: grey;
  //-moz-border-radius: 6px;
}

input:focus.submit {
  background: #b5d5ff;
  color: black;
}

-->
  </style>
</head>

<body>
