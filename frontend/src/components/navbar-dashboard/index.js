import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function NavbarDashboard(props) {
  return (
    <header>
      <Link to="/" className="logo-nav">
        Estude.io
      </Link>
      <div className="div__nav">
        <nav className="header__nav">
          <ul className="nav__links">
            <li>
              <Link
                to="/home"
                style={
                  props.paginaSelecionada === "home"
                    ? { color: "#2c7aed" }
                    : null
                }
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="anotacoes"
                style={
                  props.paginaSelecionada === "anotacoes"
                    ? { color: "#2c7aed" }
                    : null
                }
              >
                Anotações
              </Link>
            </li>
            <li>
              <Link
                to="tarefas"
                style={
                  props.paginaSelecionada === "tarefas"
                    ? { color: "#2c7aed" }
                    : null
                }
              >
                Tarefas
              </Link>
            </li>
          </ul>
        </nav>
        <a>
          {props.btnTexto ? (
            <button
              className="btn__criar"
              id="botaoCriarAnotacao"
              onClick={props.criar}
            >
              {props.paginaSelecionada === "livros"
                ? `Adicionar ${props.btnTexto}`
                : `Criar ${props.btnTexto}`}
            </button>
          ) : null}
          {props.sair ? (
            <button
              className="btn__criar"
              id="botaoCriarAnotacao"
              onClick={props.sair}
            >
              Logout
            </button>
          ) : null}
        </a>
      </div>
    </header>
  );
}

export default NavbarDashboard;
