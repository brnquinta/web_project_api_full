function InfoTooltip({ icon, message }) {
  return (
    <div className="info-tooltip">
      <img src={icon} alt="status icon" className="info-tooltip__icon" />
      <p className="info-tooltip__message">{message}</p>
    </div>
  );
}

export default InfoTooltip;