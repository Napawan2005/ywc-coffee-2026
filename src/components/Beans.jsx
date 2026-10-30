export default  function Beans({ fill = "#A4B077", stacked = false }) {
  const spots = stacked
    ? [[28, 18], [34, 16], [38, 22], [31, 25], [42, 17]]   // กองทับกัน
    : [[12, 12], [34, 12], [56, 12], [23, 30], [45, 30]];  // เกลี่ยห่างกัน
  return (
    <svg viewBox="0 0 70 40" width="80" height="46" aria-hidden="true">
      <g fill={fill} stroke={stacked ? "#7E8B55" : "none"}>
        {spots.map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="6" ry="8" />
        ))}
      </g>
    </svg>
  );
}
