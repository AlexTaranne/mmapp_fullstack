import "../styles/login.css";

export default function Login() {
  return (
    <div className="form-login">
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
    </div>
  );
}
