const Redacted = (props) => {
  const { text } = props;

  return (
    <div>
      <h3>Redacted Document</h3>
      <p>{text}</p>
      <button className='button' onClick={() => window.location.reload(false)}>Process another document</button>
    </div>
  );
};

export default Redacted;
