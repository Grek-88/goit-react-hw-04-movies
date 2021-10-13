import s from "../Footer/Footer.module.css";
export default function Footer() {
  return (
    <>
      <footer className={s.footer}>
        <hr />
        <small className={s.text}>
          &copy; 2021 Developed with{" "}
          <span role="img" aria-label="heart" className={s.heart}>
            🖤
          </span>
          by
          <a
            href="https://github.com/Grek-88"
            target="_blank"
            rel="noopener noreferrer"
            title="Github profile"
            aria-label="Link to Github profile"
            className={s.link}
          >
            <span className={s.name}>Georgy</span>
          </a>
        </small>
      </footer>
    </>
  );
}
