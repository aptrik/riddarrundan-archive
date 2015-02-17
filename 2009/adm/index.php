<?
session_start();
include("preamble.inc");
$CLASSES = array("Riddare", "Knekt", "Dam", "Lärling", "Laglös");
$CTP_HOLES = array(1, 2, 3, 8, 18);
?>
<h1>Riddarrundan</h1>

<?
if (! isset($_SESSION['logged_in'])) {
  echo '<META HTTP-EQUIV="refresh" content="1; URL=login.php">';
}
// elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
//   # TODO
// }
else {
?>

<fieldset class="category">
  <legend>1. Skapa ny runda</legend>
  <form id="selectDateForm" action="<?= $_SERVER['PHP_SELF'] ?>" method="post">
    <input id="inputDate" class="required text" name="date" type="text" size="10"
           value="<?= date("Y-m-d") ?>" />
    <img src="img/calendar.png" />
    <p>
      <input class="submit" name="submit" type="submit" value="Välj spelare..." />
    </p>
  </form>
</fieldset>


<form id="selectPlayerForm" action="<?= $_SERVER['PHP_SELF'] ?>" method="post">
  <input name="level" type="hidden" value="2" />
  <input name="date" type="hidden" value="<?= $_POST['date'] ?>" />
  <fieldset class="category">
    <legend>2. Välj spelare</legend>
    <label>Namn
      <input id="playerInputField" class="required text" name="player" type="text"
             size="30" minlength="4" value="<?= $_POST['player'] ?>" />
    </label>
    <fieldset>
      <legend>Klass</legend>
<?
$checked = $_POST['class'] ? $_POST['class'] : $CLASSES[count($CLASSES) - 1];
foreach ($CLASSES as &$cls) {
  $str = ''; //$cls == $checked ? 'checked="1" ' : '';
?>
      <label>
        <input type="radio" name="class" value="<?= $cls ?>" <?= $str ?>/>
        <?= $cls ?>
      </label>
<?
}
?>
    </fieldset>
    <p>
      <input class="submit" name="submit" type="submit" value="Mata in resultat..." />
    </p>
  </fieldset>
</form>


<form id="addResultForm" action="<?= $_SERVER['PHP_SELF'] ?>" method="post">
  <input name="level" type="hidden" value="3" />
  <input name="date" type="hidden" value="<?= $_POST['date'] ?>" />
  <input name="player" type="hidden" value="<?= $_POST['player'] ?>" />
  <input name="class" type="hidden" value="<?= $_POST['class'] ?>" />
  <fieldset class="category">
    <legend>3. Lägg till resultat</legend>
    <fieldset>
      <legend>Hål</legend>
      <table>
        <tr>
<? for ($hole = 1; $hole <= 9; $hole++) { ?>
          <td class="right"><?= $hole ?></td>
          <td>
            <input class="text" type="text" name="hole_<?= $hole ?>" size="5"
                   onChange="calculateTotal(this.form)"
                   value="<?= $_POST["hole_$hole"] ?>" />
          </td>
<? } ?>
          <th class="right">Ut</th>
          <td id="result_out" class="right">DNF</td>
        </tr>
        <tr>
<? for ($hole = 10; $hole <= 18; $hole++) { ?>
          <td class="right"><?= $hole ?></td>
          <td>
            <input class="text" type="text" name="hole_<?= $hole ?>" size="5"
                   onChange="calculateTotal(this.form)"
                   value="<?= $_POST["hole_$hole"] ?>" />
          </td>
<? } ?>
          <th class="right">In</th>
          <td id="result_in" class="right">DNF</td>
        </tr>
        <tr>
          <td colspan="18"></td>
          <th class="right">Totalt</th>
          <td id="result_total" class="right">DNF</td>
        </tr>
      </table>
    </fieldset>
    <fieldset>
      <legend>CTP</legend>
      <table>
        <tr>
<? foreach ($CTP_HOLES as &$hole) { ?>
          <td class="right"><?= $hole ?></td>
          <td>
            <input type="checkbox" name="ctp_hole_<?= $hole ?>" value="<?= $_POST["ctp_hole_$hole"] ?>" />
          </td>
<? } ?>
        </tr>
      </table>
    </fieldset>
    <p>
      <input class="submit" name="submit" type="submit" value="Spara resultat..." />
    </p>
  </fieldset>
</form>

<?
}
include("postamble.inc");
?>
