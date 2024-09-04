export function Overlay({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) {
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
