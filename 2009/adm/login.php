<?php
session_start();
$where='anmalan';
include("preamble.inc");

$username = 'adm';
$pw = '042da83c79282520fd183ebdfc7995ea'; # MD5

function mklogin() {
?>
<form action="<?= $_SERVER['PHP_SELF'] ?>" method="post" name="login">
  <table summary="">
    <tr>
      <td>Anv&auml;ndare</td>
      <td>
        <input name="user" type="text" value="<?= $_POST['user'] ?>" />
      </td>
    </tr>
    <tr>
      <td>L&ouml;senord</td>
      <td>
        <input name="password" type="password" value="" />
      </td>
    </tr>
    <tr>
      <td></td>
      <td><input class="submit" type="submit" name="submit" value="login" /></td>
    </tr>
  </table>
</form>
<?php
}
?>

<h2>Inloggning f&ouml;r administrat&ouml;rer</h2>

<?php

if (isset($_SESSION['logged_in'])) {
  echo("<p>Du &auml;r redan inloggad som '" . $_SESSION['logged_in'] . "'!</p>");
  echo '<META HTTP-EQUIV="refresh" content="3; URL=.">';
}
elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
  if ($_POST['user'] == $username && md5($_POST['password']) == $pw){
    echo("<p>V&auml;lkommen, du &auml;r nu inloggad som '" . $_POST['user'] . "'!</p>");
    $_SESSION['logged_in'] = $username;
    echo '<META HTTP-EQUIV="refresh" content="1; URL=.">';
  }
  else {
    echo("<p>Fel l&ouml;senord!</p>");
    mklogin();
  }
}
else {
  mklogin();
}

include("postamble.inc");
?>
