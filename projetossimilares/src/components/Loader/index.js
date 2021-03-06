import './styles.css';

function Loader() {
  return (
    <div id="loader" className="loader invisible">
      <div className="loader__panel loader__panel--left">
        <div className="loader__line loader__line--left"></div>
      </div>
      <div className="loader__panel loader__panel--right">
        <div className="loader__line loader__line--right"></div>
      </div>
    </div>
  );
}

export default Loader;