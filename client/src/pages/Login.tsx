export default function Login() {
  return (
    <form>
      <label>
        Nom :
        <input type="text" name="lastname" />
      </label>
      <label>
        Prénom:
        <input type="text" name="firstname" />
      </label>
      <input type="submit" value="Envoyer" />
    </form>
  );
}
