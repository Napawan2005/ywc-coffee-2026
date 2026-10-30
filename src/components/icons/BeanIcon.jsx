const icons = {
  1: (
    <>
      <ellipse cx="32" cy="32" rx="18" ry="25" fill="#A4B077" />
      <path d="M28 10 C 38 24, 26 40, 36 54" stroke="#6E7D45" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </>
  ),
  2: (
    <>
      <ellipse cx="32" cy="32" rx="18" ry="25" fill="#2F2620" />
      <path d="M28 10 C 38 24, 26 40, 36 54" stroke="#120D0A" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </>
  ),
  3: (
    <>
      <path d="M14 46 C 8 26, 24 6, 44 10 C 56 14, 56 30, 46 34 C 38 37, 40 46, 32 52 C 24 57, 16 54, 14 46 Z" fill="#A4B077" />
      <path d="M24 40 C 26 28, 34 22, 44 20" stroke="#6E7D45" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </>
  ),
  4: (
    <>
      <ellipse cx="32" cy="32" rx="17" ry="23" fill="#D9D3A6" />
      <path d="M24 18 q4 4 0 8 M36 22 q4 4 0 8 M28 36 q4 4 0 8 M40 38 q-4 4 0 8" stroke="#ABA373" strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  ),
  5: (
    <>
      <path d="M14 30 C 14 14, 26 7, 34 7 L 30 20 L 38 26 L 31 36 L 36 50 C 22 54, 14 44, 14 30 Z" fill="#A4B077" />
      <path d="M44 14 L 52 22 L 46 30 Z" fill="#A4B077" />
    </>
  ),
  6: (
    <>
      <ellipse cx="32" cy="32" rx="22" ry="28" fill="#D6B98A" />
      <ellipse cx="32" cy="32" rx="15" ry="21" fill="#A4B077" />
      <path d="M14 18 C 18 26, 46 26, 50 18" stroke="#B89A6A" strokeWidth="2" fill="none" />
    </>
  ),
  7: (
    <>
      <path d="M10 34 L 22 18 L 34 24 L 30 36 Z" fill="#C9A26B" />
      <path d="M36 30 L 54 26 L 50 42 L 38 44 Z" fill="#7B3F2A" />
      <path d="M18 46 L 30 42 L 28 54 Z" fill="#B48C58" />
    </>
  ),
};

export default function BeanIcon({ id, size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      {icons[id]}
    </svg>
  );
}
