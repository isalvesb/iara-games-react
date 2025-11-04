import { useState } from "react";
import {
  faEye,
  faEyeSlash,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import Logo from "../assets/logo.svg";
import "./cadastro.css";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";


function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState({ mensagem: "", tipo: "" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mostrarToast = (mensagem, tipo) => {
    setToast({ mensagem, tipo });
    setTimeout(() => setToast({ mensagem: "", tipo: "" }), 3000);
  };

  // Função para toggle do menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fechar menu quando clicar em um link
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (senha !== confirmSenha) {
      mostrarToast("As senhas não conferem.", "erro");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      mostrarToast("Cadastro realizado com sucesso!", "sucesso");
      setNome("");
      setEmail("");
      setSenha("");
      setConfirmSenha("");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        mostrarToast("Este e-mail já está em uso.", "erro");
      } else {
        mostrarToast("Erro ao criar conta.", "erro");
      }
    }
  };

  return (
    <div className="page-container">
      <header>
        <nav>
          <Link className="logo" to="/" onClick={closeMenu}>
            <img src={Logo} alt="Logo" />
          </Link>

          {/* BOTÃO HAMBURGUER COM ÍCONE FONTAWESOME */}
          <button
            className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Abrir menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <FontAwesomeIcon icon={faTimes} className="menu-icon" /> // ❌ QUANDO ABERTO
            ) : (
              <FontAwesomeIcon icon={faBars} className="menu-icon" /> // ☰ QUANDO FECHADO
            )}
          </button>

          {/* Overlay para fechar menu */}
          <div
            className={`mobile-overlay ${isMenuOpen ? "active" : ""}`}
            onClick={closeMenu}
          ></div>

          {/* MENU PRINCIPAL */}
          <ul className={`menu ${isMenuOpen ? "mobile-open" : ""}`}>
            <li className="inativo">
              <Link to="#" onClick={closeMenu}>
                Loja
              </Link>
            </li>
            <li className="inativo">
              <Link to="#" onClick={closeMenu}>
                Biblioteca
              </Link>
            </li>
            <li className="inativo">
              <Link to="#" onClick={closeMenu}>
                Fórum
              </Link>
            </li>
            <li className="inativo">
              <Link to="#" onClick={closeMenu}>
                Suporte
              </Link>
            </li>
          </ul>
          {/* ÍCONE PERFIL - DIREITA */}
         <Link className="perfil" to="/login" onClick={closeMenu}>
          <FontAwesomeIcon icon={faUserCircle} className="icone-perfil" />
          </Link>

        </nav>
      </header>

      <main>
        <div className="container">
          <h2>CADASTRE-SE</h2>
          <form onSubmit={handleCadastro}>
            <input
              type="text"
              className="form-control"
              placeholder="Nome de usuário"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </span>
            </div>
            <div className="input-group">
              <input
                type={showConfirm ? "text" : "password"}
                className="form-control"
                placeholder="Confirmar senha"
                value={confirmSenha}
                onChange={(e) => setConfirmSenha(e.target.value)}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                <FontAwesomeIcon icon={showConfirm ? faEyeSlash : faEye} />
              </span>
            </div>
            <button type="submit" className="botao">
              Criar conta
            </button>
          </form>

          {/* POPUP TOAST */}
          {toast.mensagem && (
            <div className={`popup ${toast.tipo}`}>{toast.mensagem}</div>
          )}
        </div>
      </main>

      <footer>
        <div className="decoracao"></div>
        <div className="footer d-flex flex-column gap-3">
          <ul className="icones d-flex list-unstyled justify-content-end gap-3">
            <li>
              <a href="https://www.facebook.com" target="_blank">
                <i className="fa-brands fa-facebook icon"></i>
              </a>
            </li>
            <li>
              <a href="https://x.com" target="_blank">
                <i className="fa-brands fa-x-twitter icon"></i>
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com.br" target="_blank">
                <i className="fa-brands fa-youtube icon"></i>
              </a>
            </li>
          </ul>

          <div className="linha"></div>

          <ul className="links list-unstyled d-flex justify-content-around text-center mb-3">
            <li>
              <a href="#">Trabalhe conosco</a>
            </li>
            <li>
              <a href="#">Sobre nós</a>
            </li>
            <li>
              <a href="#">Parceiros</a>
            </li>
            <li>
              <a href="#">Termos de uso</a>
            </li>
            <li>
              <a href="#">Política de privacidade</a>
            </li>
          </ul>

          <div className="linha"></div>

          <div className="informacoes row d-flex justify-content-between">
            <p className="legal">
              © 2025, Iara Games. Todos os direitos reservados. Iara Games e o
              logotipo da Iara Games são marcas comerciais ou registradas da
              Iara Games no Brasil e em outros países.
            </p>
            <div className="contato-botao col-md-4 text-end d-flex flex-column justify-content-between align-items-center">
              <p className="contato">
                Entre em contato: <a href="#">iaragamesoficial@gmail.com</a>
              </p>
              <a
                className="botao text-uppercase text-decoration-none text-center"
                href="#top"
              >
                Voltar ao topo
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Cadastro;
