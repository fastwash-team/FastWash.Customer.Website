export function Overlay({ loading = false, children = null }) {
  return (
    <div className='global-overlay'>
      {loading ? (
        <div className='global-overlay-container'>
          <div className='loader'></div>
        </div>
      ) : null}
      {children}
    </div>
  );
}
