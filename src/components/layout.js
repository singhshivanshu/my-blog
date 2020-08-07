import React from "react"
import { Link } from "gatsby"
import sun from "../../content/assets/sun.png"
import moon from "../../content/assets/moon.png"
import Toggle from "./Toggle"

import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  state = {
    theme: null,
  }
  componentDidMount() {
    this.setState({ theme: window.__theme })
    window.__onThemeChange = () => {
      this.setState({ theme: window.__theme })
    }
  }
  renderHeader() {
    const { location, title } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    if (location.pathname === rootPath) {
      return (
        <h1
          style={{
            ...scale(0.75),
            marginBottom: 0,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: "none",
              textDecoration: "none",
              color: "var(--textTitle)",
            }}
            to={"/"}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      return (
        <h3
          style={{
            fontFamily: "Montserrat, sans-serif",
            marginTop: 0,
            marginBottom: 0,
            height: 42, // because
            lineHeight: "2.625rem",
          }}
        >
          <Link
            className="heading-link"
            style={{
              boxShadow: "none",
              textDecoration: "none",
            }}
            to={"/"}
          >
            {title}
          </Link>
        </h3>
      )
    }
  }
  render() {
    const { children } = this.props

    return (
      <div
        style={{
          color: "var(--textNormal)",
          background: "var(--bg)",
          transition: "color 0.2s ease-out, background 0.2s ease-out",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: rhythm(24),
            padding: `2.625rem ${rhythm(3 / 4)}`,
          }}
        >
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2.625rem",
            }}
          >
            {this.renderHeader()}
            {this.state.theme !== null ? (
              <Toggle
                icons={{
                  checked: (
                    <img
                      src={moon}
                      width="16"
                      height="16"
                      role="presentation"
                      style={{ pointerEvents: "none" }}
                    />
                  ),
                  unchecked: (
                    <img
                      src={sun}
                      width="16"
                      height="16"
                      role="presentation"
                      style={{ pointerEvents: "none" }}
                    />
                  ),
                }}
                checked={this.state.theme === "dark"}
                onChange={e =>
                  window.__setPreferredTheme(
                    e.target.checked ? "dark" : "light"
                  )
                }
              />
            ) : (
              <div style={{ height: "24px" }} />
            )}
          </header>

          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}&nbsp;
            <a
              target="_blank"
              rel="noreferrer"
              href="https://shivanshu.netlify.app"
            >
              <i>Shivanshu</i>
            </a>
          </footer>
        </div>
      </div>
    )
  }
}

export default Layout
